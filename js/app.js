/* =========================================================
   app.js — Main application controller
   DataLearn: SQL, Python & SAS for Data Analysts
   All element IDs are verified against index.html.
   ========================================================= */

'use strict';

/* ── State ─────────────────────────────────────────────── */
const STATE = {
  lang:      'sql',
  level:     'basic',
  lessonId:  null,
  stepIndex: 0,
  db:        null,
  pyodide:   null,
  pyodideReady: false,
  webR:      null,
  webRReady: false,
  webRInstalledPkgs: new Set(),
  editors:   { step: null, practice: null, challenge: null }
};

/* ── Lesson registry ────────────────────────────────────── */
const ALL_LESSONS = () => [
  ...(typeof SQL_LESSONS    !== 'undefined' ? SQL_LESSONS    : []),
  ...(typeof PYTHON_LESSONS !== 'undefined' ? PYTHON_LESSONS : []),
  ...(typeof SAS_LESSONS    !== 'undefined' ? SAS_LESSONS    : []),
  ...(typeof R_LESSONS      !== 'undefined' ? R_LESSONS      : []),
  ...(typeof EXCEL_LESSONS  !== 'undefined' ? EXCEL_LESSONS  : []),
  ...(typeof DBT_LESSONS    !== 'undefined' ? DBT_LESSONS    : [])
];

const getLessons   = (lang, lvl) =>
  ALL_LESSONS().filter(l => l.language === lang && l.level === lvl)
               .sort((a, b) => a.order - b.order);

const getLessonById = id => ALL_LESSONS().find(l => l.id === id);

/* ── Progress (localStorage) ────────────────────────────── */
const LS_KEY = 'datalearn_progress';

let progress = {};

function loadProgress() {
  try { progress = JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
  catch { progress = {}; }
}

function saveProgress() {
  localStorage.setItem(LS_KEY, JSON.stringify(progress));
}

function totalXP() {
  return Object.values(progress).reduce((s, v) => s + (v.xp || 0), 0);
}

/* ── Progress export / import ───────────────────────────── */
function exportProgress() {
  const payload = JSON.stringify({ v: 1, ts: Date.now(), progress }, null, 2);
  const blob    = new Blob([payload], { type: 'application/json' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href        = url;
  a.download    = `datalearn-progress-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Progress exported!');
}

function importProgress(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || typeof data.progress !== 'object') throw new Error('invalid');
      progress = data.progress;
      saveProgress();
      refreshXP();
      refreshTotalProgress();
      buildLessonNav();
      showToast('Progress imported!');
    } catch {
      showToast('Import failed — invalid file.');
    }
  };
  reader.readAsText(file);
}

/* ── Utility ────────────────────────────────────────────── */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function $ (id) { return document.getElementById(id); }
function $q(sel, ctx) { return (ctx || document).querySelector(sel); }
function $a(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

/* ── Boot ──────────────────────────────────────────────── */
function initApp() {
  loadProgress();

  // Boot the UI immediately — sidebar, listeners, nav — before any async work.
  try { initEditors(); } catch (err) {
    console.warn('Editor init failed (CodeMirror not loaded?):', err.message);
  }

  try {
    buildLessonNav();
    refreshXP();
    refreshTotalProgress();
    attachListeners();
    buildGlossary();
  } catch (err) {
    console.error('App init error:', err);
  }

  showWelcome();

  // Load engines in the background — neither blocks the UI.
  loadSqlEngine();
  loadPyodideEngine();
  loadWebREngine();
}

// Dynamically load sql-wasm.js then initialise the engine. A 6-second timeout
// guards both the script fetch and the WASM compile so a stalled CDN request
// never hangs the app. SQL execution will show an error until this completes.
async function loadSqlEngine() {
  try {
    if (typeof initSqlJs === 'undefined') {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js';
        s.onerror = () => reject(new Error('sql-wasm.js failed to load'));
        const t = setTimeout(() => reject(new Error('sql.js load timeout')), 6000);
        s.onload = () => { clearTimeout(t); resolve(); };
        document.head.appendChild(s);
      });
    }
    if (typeof initSqlJs === 'undefined') throw new Error('sql-wasm.js not loaded');
    const sqlPromise     = initSqlJs({
      locateFile: f =>
        `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}`
    });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('sql.js WASM load timeout')), 6000)
    );
    const SQL = await Promise.race([sqlPromise, timeoutPromise]);
    STATE.db = new SQL.Database();
    STATE.db.run(DB_SCHEMA);
  } catch (err) {
    console.warn('sql.js unavailable:', err.message);
  }
}

// Lazily load Pyodide (WebAssembly CPython) with pandas/numpy/matplotlib.
// Mirrors loadSqlEngine() — called once on boot, never blocks the UI.
async function loadPyodideEngine() {
  if (STATE.pyodideReady || STATE.pyodide !== null) return;
  try {
    if (typeof loadPyodide === 'undefined') {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js';
        s.onerror = () => reject(new Error('Pyodide script failed to load'));
        const t = setTimeout(() => reject(new Error('Pyodide script load timeout')), 60000);
        s.onload = () => { clearTimeout(t); resolve(); };
        document.head.appendChild(s);
      });
    }
    // loadPyodide is the global from pyodide.js — distinct from our function name
    STATE.pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/'
    });
    await STATE.pyodide.loadPackage(['pandas', 'numpy', 'matplotlib']);
    STATE.pyodideReady = true;
    console.log('Pyodide + pandas/numpy/matplotlib ready.');
  } catch (err) {
    console.warn('Pyodide unavailable:', err.message);
  }
}

/* ══════════════════════════════════════════════════════════
   PYTHON EXECUTION (Pyodide)
   ══════════════════════════════════════════════════════════ */

async function runPython(code, outputEl) {
  if (!STATE.pyodideReady) {
    showError(outputEl, STATE.pyodide !== null
      ? 'Python engine is still loading — please try again in a moment.'
      : 'Python engine failed to load. Check your connection and refresh.');
    return;
  }
  const py = STATE.pyodide;
  outputEl.innerHTML = '<div class="output-placeholder"><i class="fas fa-spinner fa-spin"></i><p>Running Python…</p></div>';
  try {
    // Capture stdout/stderr; set up matplotlib non-interactive backend
    py.runPython(
      'import sys, io, matplotlib\n' +
      'matplotlib.use("Agg")\n' +
      'import matplotlib.pyplot as _plt\n' +
      '_plt.close("all")\n' +
      'sys.stdout = io.StringIO()\n' +
      'sys.stderr = io.StringIO()'
    );

    // Auto-install any packages imported in user code (e.g. scipy, seaborn)
    try { await py.loadPackagesFromImports(code); } catch (_) { /* non-fatal */ }

    let pyErr = null;
    try {
      await py.runPythonAsync(code);
    } catch (err) {
      pyErr = err;
    }

    const stdout = py.runPython('sys.stdout.getvalue()');
    const stderr = py.runPython('sys.stderr.getvalue()');

    // Capture any matplotlib figure as an inline PNG
    let figHtml = '';
    try {
      const figCount = py.runPython('len(_plt.get_fignums())');
      if (figCount > 0) {
        const imgB64 = py.runPython(
          'import io as _io, base64 as _b64\n' +
          '_buf = _io.BytesIO()\n' +
          '_plt.savefig(_buf, format="png", bbox_inches="tight", dpi=120)\n' +
          '_buf.seek(0)\n' +
          '_b64.b64encode(_buf.read()).decode()'
        );
        py.runPython('_plt.close("all")');
        figHtml = `<img src="data:image/png;base64,${imgB64}" style="max-width:100%;border-radius:6px;margin-top:8px;display:block;">`;
      }
    } catch (_) { /* no matplotlib figure — that's fine */ }

    // Pure error with no output at all
    if (pyErr && !stdout && !figHtml) {
      showError(outputEl, stderr || pyErr.message);
      return;
    }

    let content = '';
    if (stdout)  content += `<pre class="sim-pre">${esc(stdout)}</pre>`;
    if (figHtml) content += figHtml;
    if (!content) content = '<pre class="sim-pre">✓ Executed successfully. No output.</pre>';
    // Append any error that occurred alongside partial output
    if (pyErr) content += `<pre class="sim-pre output-warning">${esc(stderr || pyErr.message)}</pre>`;

    outputEl.innerHTML =
      `<div class="sim-output python-output">` +
      `<div class="sim-header"><i class="fab fa-python"></i> Python 3 · Pyodide</div>` +
      content +
      `</div>`;
  } catch (err) {
    showError(outputEl, err.message || String(err));
  }
}

/* ══════════════════════════════════════════════════════════
   R EXECUTION (WebR)
   ══════════════════════════════════════════════════════════ */

// Lazily load WebR (WebAssembly R) via ESM dynamic import.
// PostMessage channel works without cross-origin isolation headers.
async function loadWebREngine() {
  if (STATE.webRReady || STATE.webR !== null) return;
  try {
    const { WebR, ChannelType } = await import('https://webr.r-wasm.org/latest/webr.mjs');
    const webr = new WebR({ channelType: ChannelType.PostMessage });
    await webr.init();
    STATE.webR = webr;
    STATE.webRReady = true;
    console.log('WebR ready.');
  } catch (err) {
    console.warn('WebR unavailable:', err.message);
  }
}

// Extract library()/require() package names from R code.
function extractRLibraries(code) {
  return [...code.matchAll(/(?:library|require)\s*\(\s*["']?([\w.]+)["']?\s*\)/g)]
    .map(m => m[1])
    .filter(p => p && !STATE.webRInstalledPkgs.has(p));
}

async function runR(code, outputEl) {
  if (!STATE.webRReady) {
    showError(outputEl, STATE.webR !== null
      ? 'R engine is still loading — please try again in a moment.'
      : 'R engine failed to load. Check your connection and refresh.');
    return;
  }

  // Detect and install missing packages (cached in OPFS after first install).
  const needed = extractRLibraries(code);
  if (needed.length) {
    outputEl.innerHTML =
      `<div class="output-placeholder"><i class="fas fa-spinner fa-spin"></i>` +
      `<p>Installing R packages: <strong>${esc(needed.join(', '))}</strong>` +
      `<br><small>This happens once — packages are cached for future runs.</small></p></div>`;
    try {
      await STATE.webR.installPackages(needed, { mount: true });
      needed.forEach(p => STATE.webRInstalledPkgs.add(p));
    } catch (err) {
      showError(outputEl, `Package install failed (${needed.join(', ')}): ${err.message}`);
      return;
    }
  }

  outputEl.innerHTML = '<div class="output-placeholder"><i class="fas fa-spinner fa-spin"></i><p>Running R…</p></div>';

  const shelter = await new STATE.webR.Shelter();
  try {
    const cap = await shelter.captureR(code, {
      withAutoprint: true,
      captureGraphics: { width: 504, height: 400, bg: 'white' }
    });

    const stdout = cap.output
      .filter(o => o.type === 'stdout' || o.type === 'message')
      .map(o => o.data).join('\n').trim();
    const stderr = cap.output
      .filter(o => o.type === 'stderr')
      .map(o => o.data).join('\n').trim();

    // Render any ggplot2 / base R graphics as inline PNG images.
    let figHtml = '';
    for (const img of (cap.images || [])) {
      const canvas = document.createElement('canvas');
      canvas.width  = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      figHtml += `<img src="${canvas.toDataURL('image/png')}" ` +
        `style="max-width:100%;border-radius:6px;margin-top:8px;display:block;">`;
    }

    let content = '';
    if (stdout)  content += `<pre class="sim-pre">${esc(stdout)}</pre>`;
    if (figHtml) content += figHtml;
    if (!content) content = '<pre class="sim-pre">✓ Executed successfully. No output.</pre>';
    if (stderr)  content += `<pre class="sim-pre output-warning">${esc(stderr)}</pre>`;

    outputEl.innerHTML =
      `<div class="sim-output r-output">` +
      `<div class="sim-header"><i class="fab fa-r-project"></i> R Console · WebR</div>` +
      content + `</div>`;
  } catch (err) {
    showError(outputEl, err.message || String(err));
  } finally {
    await shelter.purge();
  }
}

/* ══════════════════════════════════════════════════════════
   DBT EXECUTION (Jinja2 → SQL compilation + sql.js)
   ══════════════════════════════════════════════════════════ */

// Strip all dbt/Jinja2 template syntax, returning plain runnable SQL.
function compileDbtToSql(code) {
  return code
    // {# Jinja2 comments #}
    .replace(/\{#[\s\S]*?#\}/g, '')
    // {{ config(...) }} — top-of-file config blocks
    .replace(/\{\{-?\s*config\s*\([\s\S]*?\)\s*-?\}\}/g, '')
    // {% ... %} — all control-flow tags: set, for, if, macro, call, etc.
    .replace(/\{%-?[\s\S]*?-?%\}/g, '')
    // {{ ref('model') }} → model
    .replace(/\{\{-?\s*ref\s*\(\s*['"]([\w]+)['"]\s*\)\s*-?\}\}/g, '$1')
    // {{ source('schema', 'table') }} → schema_table
    .replace(/\{\{-?\s*source\s*\(\s*['"]([\w]+)['"]\s*,\s*['"]([\w]+)['"]\s*\)\s*-?\}\}/g, '$1_$2')
    // {{ this }} → this_model
    .replace(/\{\{-?\s*this\s*-?\}\}/g, 'this_model')
    // {{ dbt_utils.group_by(n) }} → 1, 2, ..., n
    .replace(/\{\{-?\s*dbt_utils\.group_by\s*\(\s*(\d+)\s*\)\s*-?\}\}/g,
      (_, n) => Array.from({length: +n}, (__, i) => i + 1).join(', '))
    // {{ dbt_utils.star(...) }} → *
    .replace(/\{\{-?\s*dbt_utils\.star\s*\([\s\S]*?\)\s*-?\}\}/g, '*')
    // Strip any remaining {{ ... }} expressions
    .replace(/\{\[[\s\S]*?\}\}/g, '')
    .replace(/\{\{[\s\S]*?\}\}/g, '')
    // Collapse excess blank lines left by stripping
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function runDbt(code, outputEl, validateKeywords, keywords, lesson) {
  const compiledSql = compileDbtToSql(code);
  if (!compiledSql) {
    showError(outputEl,
      'No SQL found after compiling dbt template. Make sure your model contains a SELECT statement.');
    return;
  }
  // Show a dbt-branded header + the compiled SQL so the user can see the output of compilation.
  outputEl.innerHTML =
    `<div class="sim-output dbt-output">` +
    `<div class="sim-header"><i class="fas fa-layer-group"></i> dbt → compiled SQL</div>` +
    `<pre class="sim-pre" style="opacity:.6;font-size:11.5px;` +
    `border-bottom:1px solid rgba(255,255,255,.07)">${esc(compiledSql)}</pre>` +
    `</div>`;
  // Append a result node so the header persists while sql.js writes its output below.
  const resultEl = document.createElement('div');
  outputEl.appendChild(resultEl);
  runSQL(compiledSql, resultEl, validateKeywords, keywords, lesson);
}

/* ══════════════════════════════════════════════════════════
   EXCEL EXECUTION (formula validation + simulated output)
   ══════════════════════════════════════════════════════════ */

// Extract Excel function names (e.g. XLOOKUP, SUMIFS) from any text string.
function extractExcelFunctions(text) {
  const m = (text || '').match(/\b([A-Z][A-Z0-9_.]{1,})\s*\(/g) || [];
  return [...new Set(m.map(fn => fn.replace(/[\s(]/g, '')))];
}

function runExcel(code, outputEl, validateKeywords, keywords, lesson) {
  const formulaLines = code.split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('='));

  if (!formulaLines.length) {
    showError(outputEl, 'Write at least one Excel formula starting with = to complete this challenge.');
    return;
  }

  // Derive expected function names from challenge hint when no explicit keywords given.
  const expectedFns = keywords.length
    ? keywords
    : extractExcelFunctions((lesson && lesson.challenge && lesson.challenge.hint) || '');
  const usedFns = extractExcelFunctions(formulaLines.join('\n').toUpperCase());
  const missing = expectedFns.filter(fn => !usedFns.includes(fn));

  if (validateKeywords && missing.length) {
    showError(outputEl,
      `Almost there! Make sure to use: ${missing.map(f => f + '()').join(', ')}`);
    return;
  }

  // Show excel-branded header + validated formula lines.
  outputEl.innerHTML =
    `<div class="sim-output excel-output">` +
    `<div class="sim-header"><i class="fas fa-file-excel"></i> Excel — formula validated</div>` +
    `<pre class="sim-pre">${formulaLines.map(l => esc(l)).join('\n')}</pre>` +
    `</div>`;

  const resultEl = document.createElement('div');
  outputEl.appendChild(resultEl);

  if (validateKeywords) {
    const ch = lesson && lesson.challenge;
    renderSimOutput(lesson, -1, resultEl, ch && ch.simulatedOutput);
    triggerChallengeSuccess(lesson);
  } else {
    renderSimOutput(lesson, STATE.stepIndex, resultEl);
  }
}

/* ══════════════════════════════════════════════════════════
   SIDEBAR / NAV
   ══════════════════════════════════════════════════════════ */

function buildLessonNav() {
  const container = $('lessonNav');
  if (!container) return;

  // Build a UL inside lessonNav
  let ul = container.querySelector('ul.lesson-list');
  if (!ul) {
    ul = document.createElement('ul');
    ul.className = 'lesson-list';
    container.appendChild(ul);
  }
  ul.innerHTML = '';

  const lessons = getLessons(STATE.lang, STATE.level);
  lessons.forEach((lesson, i) => {
    const done   = !!progress[lesson.id]?.completed;
    const active = lesson.id === STATE.lessonId;
    const li     = document.createElement('li');
    li.className = 'lesson-nav-item' + (done ? ' done' : '') + (active ? ' active' : '');
    li.dataset.id = lesson.id;
    li.innerHTML = `
      <span class="lesson-nav-num">${i + 1}</span>
      <div class="lesson-nav-info">
        <span class="lesson-nav-title">${esc(lesson.title)}</span>
        <span class="lesson-nav-meta">${esc(lesson.duration)} &middot; ${lesson.xp} XP</span>
      </div>
      ${done ? '<i class="fas fa-check-circle lesson-done-icon"></i>' : ''}`;
    li.addEventListener('click', () => loadLesson(lesson.id));
    ul.appendChild(li);
  });

  refreshLevelProgress();
}

function refreshLevelProgress() {
  const lessons  = getLessons(STATE.lang, STATE.level);
  const done     = lessons.filter(l => progress[l.id]?.completed).length;
  const pct      = lessons.length ? (done / lessons.length * 100) : 0;
  const fill     = $('levelProgressFill');
  const label    = $('levelProgressLabel');
  if (fill)  fill.style.width    = pct + '%';
  if (label) label.textContent   = `${done} / ${lessons.length}`;
}

function highlightNavItem(id) {
  $a('.lesson-nav-item').forEach(li =>
    li.classList.toggle('active', li.dataset.id === id));
}

/* ══════════════════════════════════════════════════════════
   HEADER PROGRESS & XP
   ══════════════════════════════════════════════════════════ */

function refreshXP() {
  const xp = totalXP();
  const el = $('totalXP');
  if (el) el.textContent = xp.toLocaleString() + ' XP';
}

function refreshTotalProgress() {
  const all    = ALL_LESSONS();
  const done   = all.filter(l => progress[l.id]?.completed).length;
  const pct    = all.length ? (done / all.length * 100) : 0;
  const label  = $('progressLabel');
  const fill   = $('miniProgressFill');
  if (label) label.textContent = `${done} / ${all.length}`;
  if (fill)  fill.style.width  = pct + '%';
}

/* ══════════════════════════════════════════════════════════
   WELCOME SCREEN
   ══════════════════════════════════════════════════════════ */

function showWelcome() {
  $('welcomeView').style.display = '';
  $('lessonView').style.display  = 'none';
  STATE.lessonId = null;
}

/* ══════════════════════════════════════════════════════════
   LESSON LOADING & RENDERING
   ══════════════════════════════════════════════════════════ */

function loadLesson(id) {
  const lesson = getLessonById(id);
  if (!lesson) return;

  STATE.lessonId  = id;
  STATE.stepIndex = 0;
  STATE.lang      = lesson.language;
  STATE.level     = lesson.level;

  $('welcomeView').style.display = 'none';
  $('lessonView').style.display  = '';

  highlightNavItem(id);
  renderLessonHeader(lesson);
  renderLearnTab(lesson);
  renderPracticeTab(lesson);
  renderChallengeTab(lesson);
  switchTab('learn');
  refreshXP();
  refreshTotalProgress();
  refreshLevelProgress();
}

/* Lesson header */
function renderLessonHeader(lesson) {
  const langName  = { sql:'SQL', python:'Python', sas:'SAS', r:'R', excel:'Excel', dbt:'dbt' }[lesson.language] || '';
  const lvlName   = { basic:'Basic', intermediate:'Intermediate', advanced:'Advanced' }[lesson.level] || '';
  const breadcrumb = `${langName} › ${lvlName}`;

  const bc = $('lessonBreadcrumb');
  if (bc) bc.textContent = breadcrumb;

  const lt = $('lessonTitle');
  if (lt) lt.textContent = lesson.title;

  // Duration and XP badges contain icons — update text nodes only
  const durEl = $('lessonDuration');
  if (durEl) durEl.innerHTML = `<i class="fas fa-clock"></i> ${esc(lesson.duration)}`;

  const xpEl = $('lessonXP');
  if (xpEl)  xpEl.innerHTML  = `<i class="fas fa-star"></i> ${lesson.xp} XP`;

  // Mark Complete button
  const cb = $('completeBtn');
  if (cb) {
    const done = !!progress[lesson.id]?.completed;
    cb.textContent = done ? '✓ Completed' : 'Mark Complete';
    cb.className   = done ? 'btn-complete done' : 'btn-complete';
    cb.onclick     = () => manualComplete(lesson);
  }
}

function manualComplete(lesson) {
  if (!progress[lesson.id]?.completed) {
    progress[lesson.id] = { completed: true, xp: lesson.xp };
    saveProgress();
    refreshXP();
    refreshTotalProgress();
    refreshLevelProgress();
    updateNavItemDone(lesson.id);
    showToast(`+${lesson.xp} XP earned!`);
  }
  renderLessonHeader(lesson);   // update button label
}

/* ══════════════════════════════════════════════════════════
   LEARN TAB
   ══════════════════════════════════════════════════════════ */

function renderLearnTab(lesson) {
  // Scenario
  const scRole    = $('scRole');
  const scCompany = $('scCompany');
  const scBody    = $('scBody');
  if (scRole)    scRole.textContent    = lesson.scenario.role;
  if (scCompany) scCompany.textContent = lesson.scenario.company;
  if (scBody)    scBody.textContent    = lesson.scenario.description;

  // Objectives
  const ol = $('objectivesList');
  if (ol) ol.innerHTML = lesson.objectives.map(o => `<li>${esc(o)}</li>`).join('');

  // Terminology pills
  const tp = $('termPills');
  if (tp) {
    tp.innerHTML = lesson.terminology.map(t =>
      `<button class="term-pill" data-term="${esc(JSON.stringify(t))}">${esc(t.term)}</button>`
    ).join('');
    tp.querySelectorAll('.term-pill').forEach(p =>
      p.addEventListener('click', e => showTermPopup(e.currentTarget)));
  }

  // Theory
  const th = $('theoryBody');
  if (th) th.innerHTML = lesson.theory;

  // Build step dots
  const dotsEl = $('stepDots');
  if (dotsEl) {
    dotsEl.innerHTML = lesson.steps.map((_, i) =>
      `<button class="step-dot${i === 0 ? ' active' : ''}" data-idx="${i}" title="Step ${i+1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.step-dot').forEach(dot =>
      dot.addEventListener('click', () => {
        const currentLesson = getLessonById(STATE.lessonId);
        if (currentLesson) renderStep(currentLesson, parseInt(dot.dataset.idx));
      }));
  }

  // Wire run/copy for step editor
  const runBtn  = $('runStepBtn');
  const copyBtn = $('copyStepBtn');
  if (runBtn) {
    runBtn.onclick = () => {
      const code = STATE.editors.step?.getValue() || '';
      const out  = $('stepOutput');
      if (!out) return;
      const cur = getLessonById(STATE.lessonId);
      if (cur?.language === 'sql') runSQL(code, out, false, []);
      else renderSimOutput(cur, STATE.stepIndex, out);
    };
  }
  if (copyBtn) {
    copyBtn.onclick = () => {
      const code = STATE.editors.step?.getValue() || '';
      navigator.clipboard.writeText(code).then(() => showToast('Code copied!'));
    };
  }

  // Go to Practice button
  const gtpBtn = $('gotoPracticeBtn');
  if (gtpBtn) gtpBtn.onclick = () => switchTab('practice');

  // Insight (starts hidden; shown on last step)
  const insightCard = $('insightCard');
  if (insightCard) insightCard.style.display = 'none';

  renderStep(lesson, 0);
}

function renderStep(lesson, idx) {
  if (idx < 0 || idx >= lesson.steps.length) return;
  const step = lesson.steps[idx];
  STATE.stepIndex = idx;

  // Badge and title
  const badge  = $('stepBadge');
  const title2 = $('stepTitle2');
  const counter = $('stepCounter');
  if (badge)   badge.textContent   = `Step ${step.step}`;
  if (title2)  title2.textContent  = step.title;
  if (counter) counter.textContent = `Step ${idx + 1} of ${lesson.steps.length}`;

  // Explanation
  const expl = $('stepExplanation');
  if (expl) expl.textContent = step.explanation;

  // Note
  const noteWrap = $('stepNote');
  const noteText = $('stepNoteText');
  if (noteWrap) noteWrap.style.display = step.note ? '' : 'none';
  if (noteText) noteText.textContent   = step.note || '';

  // After / what happened
  const afterEl = $('stepAfter');
  if (afterEl) {
    afterEl.style.display = step.after ? '' : 'none';
    afterEl.textContent   = step.after || '';
  }

  // Code editor
  if (STATE.editors.step) {
    STATE.editors.step.setValue(step.code || '');
    setEditorMode(STATE.editors.step, lesson.language);
    setTimeout(() => STATE.editors.step?.refresh(), 10);
  }

  // Clear step output when navigating
  const stepOut = $('stepOutput');
  if (stepOut) stepOut.innerHTML =
    '<div class="output-placeholder"><i class="fas fa-play-circle"></i><p>Click <strong>Run Code</strong> to see the result</p></div>';

  // Step dots
  $a('.step-dot').forEach((d, i) => d.classList.toggle('active', i === idx));

  // Prev/Next
  const prev = $('prevStepBtn');
  const next = $('nextStepBtn');
  if (prev) prev.disabled = idx === 0;
  if (next) next.disabled = idx >= lesson.steps.length - 1;

  // Insight card (show on last step)
  const insightCard = $('insightCard');
  const insightText = $('insightText');
  if (insightCard && insightText) {
    const isLast = idx === lesson.steps.length - 1;
    insightCard.style.display = (isLast && lesson.insight) ? '' : 'none';
    if (isLast && lesson.insight) insightText.textContent = lesson.insight;
  }
}

/* ══════════════════════════════════════════════════════════
   PRACTICE TAB
   ══════════════════════════════════════════════════════════ */

function renderPracticeTab(lesson) {
  // Load first step code into practice editor
  const firstCode = lesson.steps[0]?.code || '';
  if (STATE.editors.practice) {
    STATE.editors.practice.setValue(firstCode);
    setEditorMode(STATE.editors.practice, lesson.language);
    setTimeout(() => STATE.editors.practice?.refresh(), 10);
  }

  // Update editor badge
  const badge = $('practiceEditorBadge');
  if (badge) badge.textContent = { sql:'SQL', python:'Python', sas:'SAS', r:'R', excel:'Excel', dbt:'dbt' }[lesson.language] || '';

  // Show sandbox notice only for SQL
  const notice = $('sandboxNotice');
  if (notice) notice.style.display = lesson.language === 'sql' ? '' : 'none';

  clearOutputEl('practiceOutput');

  // Run
  $('runPracticeBtn').onclick = async () => {
    const code   = STATE.editors.practice?.getValue() || '';
    const out    = $('practiceOutput');
    const timing = $('practiceOutputTiming');
    const t0     = performance.now();
    if (lesson.language === 'sql') {
      runSQL(code, out, false, []);
    } else if (lesson.language === 'python') {
      await runPython(code, out);
    } else if (lesson.language === 'r') {
      await runR(code, out);
    } else if (lesson.language === 'dbt') {
      runDbt(code, out, false, []);
    } else {
      renderSimOutput(lesson, STATE.stepIndex, out);
    }
    if (timing) timing.textContent = `${(performance.now() - t0).toFixed(1)} ms`;
  };

  // Reset
  $('resetPracticeBtn').onclick = () => {
    if (STATE.editors.practice) STATE.editors.practice.setValue(firstCode);
    clearOutputEl('practiceOutput');
    const timing = $('practiceOutputTiming');
    if (timing) timing.textContent = '';
  };

  // Copy
  $('copyPracticeBtn').onclick = () => {
    navigator.clipboard.writeText(STATE.editors.practice?.getValue() || '')
      .then(() => showToast('Code copied!'));
  };
}

/* ══════════════════════════════════════════════════════════
   CHALLENGE TAB
   ══════════════════════════════════════════════════════════ */

function renderChallengeTab(lesson) {
  const ch = lesson.challenge;

  const titleEl  = $('challengeTitle');
  const scEl     = $('challengeScenario');
  if (titleEl) titleEl.textContent = ch.title;
  if (scEl)    scEl.textContent    = ch.description;

  // Update editor badge
  const badge = $('challengeEditorBadge');
  if (badge) badge.textContent = { sql:'SQL', python:'Python', sas:'SAS', r:'R', excel:'Excel', dbt:'dbt' }[lesson.language] || '';

  // Load starter code
  if (STATE.editors.challenge) {
    STATE.editors.challenge.setValue(ch.starterCode || '');
    setEditorMode(STATE.editors.challenge, lesson.language);
    setTimeout(() => STATE.editors.challenge?.refresh(), 10);
  }

  // Reset UI
  const hintBox     = $('hintBox');
  const solutionBox = $('solutionBox');
  const successBanner = $('successBanner');
  if (hintBox)      hintBox.style.display      = 'none';
  if (solutionBox)  solutionBox.style.display  = 'none';
  if (successBanner) successBanner.style.display = 'none';

  // Populate hint / solution
  const hintText  = $('hintText');
  const solCode   = $('solutionCode');
  const solExpl   = $('solutionExpl');
  if (hintText) hintText.textContent = ch.hint || '';
  if (solCode)  solCode.textContent  = ch.solution || '';
  if (solExpl)  solExpl.textContent  = ch.explanation || '';

  clearOutputEl('challengeOutput');

  // Success message
  const successMsg = $('successMessage');
  if (successMsg) successMsg.textContent = ch.successMessage || 'Challenge complete!';

  /* --- Run --- */
  $('runChallengeBtn').onclick = async () => {
    const code     = STATE.editors.challenge?.getValue() || '';
    const out      = $('challengeOutput');
    const keywords = ch.keywords || [];

    if (lesson.language === 'sql') {
      runSQL(code, out, true, keywords, lesson);
    } else if (lesson.language === 'python' || lesson.language === 'r') {
      // Real execution for Python and R; keyword check runs after.
      if (lesson.language === 'python') await runPython(code, out);
      else                              await runR(code, out);
      if (keywords.length) {
        const lower   = code.toLowerCase();
        const missing = keywords.filter(k => !lower.includes(k.toLowerCase()));
        if (missing.length) {
          showError(out, `Almost there! Make sure to use: ${missing.join(', ')}`, true);
        } else {
          triggerChallengeSuccess(lesson);
        }
      } else {
        triggerChallengeSuccess(lesson);
      }
    } else if (lesson.language === 'dbt') {
      runDbt(code, out, true, keywords, lesson);
    } else if (lesson.language === 'excel') {
      runExcel(code, out, true, keywords, lesson);
    } else {
      const lower   = code.toLowerCase();
      const missing = keywords.filter(k => !lower.includes(k.toLowerCase()));
      if (!missing.length) {
        renderSimOutput(lesson, -1, out, ch.simulatedOutput);
        triggerChallengeSuccess(lesson);
      } else {
        showError(out, `Almost there! Make sure to use: ${missing.join(', ')}`);
      }
    }
  };

  /* --- Hint toggle --- */
  $('hintBtn').onclick = () => {
    if (hintBox) hintBox.style.display = hintBox.style.display === 'none' ? '' : 'none';
  };

  /* --- Solution toggle --- */
  $('solutionBtn').onclick = () => {
    if (solutionBox) solutionBox.style.display = solutionBox.style.display === 'none' ? '' : 'none';
  };

  /* --- Copy solution --- */
  const copySolBtn = $('copySolutionBtn');
  if (copySolBtn) {
    copySolBtn.onclick = () => {
      navigator.clipboard.writeText(ch.solution || '').then(() => showToast('Solution copied!'));
    };
  }

  /* --- Next lesson --- */
  const nextBtn = $('nextLessonBtn');
  if (nextBtn) {
    nextBtn.onclick = () => {
      const lessons = getLessons(lesson.language, lesson.level);
      const idx     = lessons.findIndex(l => l.id === lesson.id);
      if (idx >= 0 && idx < lessons.length - 1) {
        loadLesson(lessons[idx + 1].id);
      } else {
        // Try next level
        const levels = ['basic', 'intermediate', 'advanced'];
        const li     = levels.indexOf(lesson.level);
        if (li < levels.length - 1) {
          STATE.level = levels[li + 1];
          $a('.level-btn').forEach(b =>
            b.classList.toggle('active', b.dataset.level === STATE.level));
          buildLessonNav();
          const first = getLessons(lesson.language, STATE.level)[0];
          if (first) loadLesson(first.id);
        } else {
          showToast('You\'ve completed all lessons in this section!');
        }
      }
    };
  }
}

/* ── Challenge success ──────────────────────────────────── */
function triggerChallengeSuccess(lesson) {
  const banner = $('successBanner');
  if (banner) banner.style.display = '';

  if (!progress[lesson.id]?.completed) {
    progress[lesson.id] = { completed: true, xp: lesson.xp };
    saveProgress();
    refreshXP();
    refreshTotalProgress();
    refreshLevelProgress();
    updateNavItemDone(lesson.id);
    renderLessonHeader(lesson);
    showToast(`+${lesson.xp} XP earned!`);
  }
}

function updateNavItemDone(id) {
  const li = $q(`.lesson-nav-item[data-id="${id}"]`);
  if (!li) return;
  li.classList.add('done');
  if (!li.querySelector('.lesson-done-icon')) {
    const icon = document.createElement('i');
    icon.className = 'fas fa-check-circle lesson-done-icon';
    li.appendChild(icon);
  }
}

/* ══════════════════════════════════════════════════════════
   TAB SWITCHING
   ══════════════════════════════════════════════════════════ */

function switchTab(tab) {
  $a('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  // tab-content divs via id
  ['learn', 'practice', 'challenge'].forEach(t => {
    const panel = $(`tab-${t}`);
    if (panel) panel.style.display = t === tab ? '' : 'none';
  });
  // Active class on panel
  $a('.tab-content').forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
  // Refresh CodeMirror after it was hidden
  setTimeout(() => {
    if (tab === 'practice')  STATE.editors.practice?.refresh();
    if (tab === 'challenge') STATE.editors.challenge?.refresh();
  }, 30);
}

/* ══════════════════════════════════════════════════════════
   CODEMIRROR EDITORS
   ══════════════════════════════════════════════════════════ */

function initEditors() {
  const common = {
    theme:       'dracula',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit:  4,
    tabSize:     4,
    lineWrapping: true,
    extraKeys:   { 'Tab': cm => cm.replaceSelection('    ', 'end') }
  };

  // Step editor (read-only)
  const stepTA = $('stepCodeEditor');
  if (stepTA) {
    STATE.editors.step = CodeMirror.fromTextArea(stepTA, {
      ...common, mode: 'text/x-sql', readOnly: true
    });
  }

  // Practice editor
  const practTA = $('practiceCodeEditor');
  if (practTA) {
    STATE.editors.practice = CodeMirror.fromTextArea(practTA, {
      ...common, mode: 'text/x-sql'
    });
  }

  // Challenge editor
  const challTA = $('challengeCodeEditor');
  if (challTA) {
    STATE.editors.challenge = CodeMirror.fromTextArea(challTA, {
      ...common, mode: 'text/x-sql'
    });
  }
}

function setEditorMode(editor, lang) {
  const map = { sql: 'text/x-sql', python: 'text/x-python', sas: 'text/plain', r: 'text/x-rsrc', excel: 'text/plain', dbt: 'text/x-sql' };
  editor.setOption('mode', map[lang] || 'text/plain');
}

/* ══════════════════════════════════════════════════════════
   SQL EXECUTION
   ══════════════════════════════════════════════════════════ */

function runSQL(code, outputEl, validateKeywords, keywords, lesson) {
  if (!STATE.db) {
    showError(outputEl, 'SQL engine not loaded. Please refresh the page.');
    return;
  }

  // Strip SAS/Python-style comments and non-SQL text gracefully
  const statements = code.split(';').map(s => s.trim()).filter(Boolean);
  let lastResult = null;

  try {
    for (const stmt of statements) {
      if (!stmt) continue;
      const res = STATE.db.exec(stmt + ';');
      if (res.length) lastResult = res[res.length - 1];
    }
  } catch (err) {
    showError(outputEl, err.message || String(err));
    return;
  }

  if (validateKeywords && keywords?.length) {
    const lower   = code.toLowerCase();
    const missing = keywords.filter(k => !lower.includes(k.toLowerCase()));
    if (missing.length) {
      if (lastResult) renderTable(outputEl, lastResult);
      showError(outputEl, `Got a result! But make sure to use: ${missing.join(', ')}`, true);
      return;
    }
    if (lastResult) renderTable(outputEl, lastResult);
    else outputEl.innerHTML = '<p class="output-ok"><i class="fas fa-check"></i> Query ran — no rows returned.</p>';
    if (lesson) triggerChallengeSuccess(lesson);
  } else {
    if (lastResult) renderTable(outputEl, lastResult);
    else outputEl.innerHTML = '<p class="output-ok"><i class="fas fa-check"></i> Query executed. No rows returned.</p>';
  }
}

function renderTable(container, result) {
  const { columns, values } = result;
  let html = '<div class="sql-table-wrap"><table class="sql-table"><thead><tr>';
  html += columns.map(c => `<th>${esc(c)}</th>`).join('');
  html += '</tr></thead><tbody>';
  for (const row of values) {
    html += '<tr>' + row.map(v =>
      `<td>${v === null ? '<span class="null-val">NULL</span>' : esc(String(v))}</td>`
    ).join('') + '</tr>';
  }
  html += `</tbody></table></div>`;
  html += `<div class="output-meta">${values.length} row${values.length !== 1 ? 's' : ''}</div>`;
  container.innerHTML = html;
}

/* ══════════════════════════════════════════════════════════
   SIMULATED OUTPUT (Python / SAS)
   ══════════════════════════════════════════════════════════ */

function renderSimOutput(lesson, stepIdx, outputEl, overrideHtml) {
  if (overrideHtml) { outputEl.innerHTML = overrideHtml; return; }

  const step = stepIdx >= 0 ? lesson?.steps[stepIdx] : null;
  if (step?.simulatedOutput) {
    const sim = step.simulatedOutput;
    // Handle structured output objects {type, headers, rows} or {type, content}
    if (sim && typeof sim === 'object') {
      const lang = lesson?.language || 'python';
      const headerMap = {
        python: `<div class="sim-header"><i class="fab fa-python"></i> Python 3 · pandas</div>`,
        sas:    `<div class="sim-header"><i class="fas fa-cogs"></i> SAS Output</div>`,
        r:      `<div class="sim-header"><i class="fab fa-r-project"></i> R Console</div>`,
        excel:  `<div class="sim-header"><i class="fas fa-file-excel"></i> Excel</div>`,
        dbt:    `<div class="sim-header"><i class="fas fa-layer-group"></i> dbt</div>`
      };
      const header = headerMap[lang] || headerMap.python;
      let body = '';
      if (sim.type === 'dataframe' && sim.headers && sim.rows) {
        let tbl = '<table class="sql-table"><thead><tr>';
        tbl += sim.headers.map(h => `<th>${esc(String(h))}</th>`).join('');
        tbl += '</tr></thead><tbody>';
        for (const row of sim.rows) {
          tbl += '<tr>' + row.map(v =>
            `<td>${v === null || v === undefined ? '<span class="null-val">NULL</span>' : esc(String(v))}</td>`
          ).join('') + '</tr>';
        }
        tbl += `</tbody></table><div class="output-meta">${sim.rows.length} row${sim.rows.length !== 1 ? 's' : ''}</div>`;
        body = `<div class="sql-table-wrap">${tbl}</div>`;
      } else if (sim.type === 'text' && sim.content) {
        body = `<pre class="sim-pre">${esc(sim.content)}</pre>`;
      } else {
        body = `<pre class="sim-pre">${esc(JSON.stringify(sim, null, 2))}</pre>`;
      }
      outputEl.innerHTML = `<div class="sim-output ${lang}-output">${header}${body}</div>`;
      return;
    }
    // Fallback: raw HTML string
    outputEl.innerHTML = sim;
    return;
  }

  const langIcons = {
    python: `<i class="fab fa-python"></i> Python 3 · pandas`,
    sas:    `<i class="fas fa-cogs"></i> SAS 9.4`,
    r:      `<i class="fab fa-r-project"></i> R Console`,
    excel:  `<i class="fas fa-file-excel"></i> Excel`,
    dbt:    `<i class="fas fa-layer-group"></i> dbt`
  };
  const lang = lesson?.language || 'python';
  const icon = langIcons[lang] || langIcons.python;
  const cls  = lang + '-output';

  if (lang === 'sas') {
    outputEl.innerHTML = `
      <div class="sim-output sas-output">
        <div class="sim-header"><i class="fas fa-cogs"></i> SAS Log</div>
        <pre class="sim-pre sas-log">NOTE: The SAS System.
NOTE: SAS Product: SAS/BASE 9.4
NOTE: ${esc(lesson?.title || 'Procedure')} completed successfully.
NOTE: DATA set WORK.OUTPUT has N observations and M variables.
      real time  0.02 seconds
      cpu time   0.01 seconds</pre>
      </div>`;
  } else {
    outputEl.innerHTML = `
      <div class="sim-output ${cls}">
        <div class="sim-header">${icon}</div>
        <pre class="sim-pre">✓ Executed successfully.\n\n[Simulated output — ${esc(lesson?.title || '')}]</pre>
      </div>`;
  }
}

/* ══════════════════════════════════════════════════════════
   GLOSSARY
   ══════════════════════════════════════════════════════════ */

let glossaryIndex = [];

function buildGlossary() {
  const seen = new Set();
  ALL_LESSONS().forEach(lesson => {
    lesson.terminology.forEach(t => {
      const key = `${t.term}__${t.lang || lesson.language}`;
      if (!seen.has(key)) {
        seen.add(key);
        glossaryIndex.push({ ...t, lang: t.lang || lesson.language, language: lesson.language });
      }
    });
  });
  glossaryIndex.sort((a, b) => a.term.localeCompare(b.term));
  renderGlossaryItems(glossaryIndex);
}

function renderGlossaryItems(items) {
  const body = $('glossaryBody');
  if (!body) return;
  body.innerHTML = items.length
    ? items.map(item => `
        <div class="glossary-item">
          <div class="glossary-term-row">
            <span class="glossary-term">${esc(item.term)}</span>
            <span class="glossary-lang-chip ${item.language}">${item.language.toUpperCase()}</span>
          </div>
          <p class="glossary-def">${esc(item.definition)}</p>
          ${item.example
            ? `<pre class="glossary-example">${esc(item.example)}</pre>`
            : ''}
        </div>`).join('')
    : '<p class="glossary-empty">No terms match your search.</p>';
}

function filterGlossary() {
  const query   = ($('glossarySearch')?.value || '').toLowerCase();
  const langSel = $q('#glossaryFilters .chip.active')?.dataset.glLang || 'all';
  let items = glossaryIndex;
  if (query)          items = items.filter(i =>
    i.term.toLowerCase().includes(query) || i.definition.toLowerCase().includes(query));
  if (langSel !== 'all') items = items.filter(i => i.language === langSel);
  renderGlossaryItems(items);
}

/* ══════════════════════════════════════════════════════════
   TERM POPUP
   ══════════════════════════════════════════════════════════ */

function showTermPopup(pillEl) {
  let data;
  try { data = JSON.parse(pillEl.dataset.term); }
  catch { return; }

  const popup   = $('termPopup');
  const nameEl  = $('termPopupTitle');
  const defEl   = $('termPopupDef');
  const exEl    = $('termPopupExample');
  if (!popup) return;

  if (nameEl)  nameEl.textContent  = data.term;
  if (defEl)   defEl.textContent   = data.definition;
  if (exEl) {
    if (data.example) {
      exEl.textContent    = data.example;
      exEl.style.display  = '';
    } else {
      exEl.style.display  = 'none';
    }
  }

  popup.style.display = 'block';
  const rect  = pillEl.getBoundingClientRect();
  const pw    = popup.offsetWidth  || 320;
  const ph    = popup.offsetHeight || 150;
  let top  = rect.bottom + 8 + window.scrollY;
  let left = rect.left + window.scrollX;
  top  = Math.min(top,  window.innerHeight  + window.scrollY - ph - 16);
  left = Math.min(left, window.innerWidth   + window.scrollX - pw - 16);
  popup.style.top  = Math.max(top,  8) + 'px';
  popup.style.left = Math.max(left, 8) + 'px';
}

/* ══════════════════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════════════════ */

let toastTimer = null;

function showToast(msg) {
  const toast = $('toast');
  const msgEl = $('toastMsg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.style.display = 'flex';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 2800);
}

/* ══════════════════════════════════════════════════════════
   OUTPUT HELPERS
   ══════════════════════════════════════════════════════════ */

function clearOutputEl(id) {
  const el = $(id);
  if (el) el.innerHTML =
    '<div class="output-placeholder"><i class="fas fa-terminal"></i><p>Write code above and click Run</p></div>';
}

function showError(el, msg, appendToExisting) {
  const html = `<div class="output-error"><i class="fas fa-exclamation-circle"></i> ${esc(msg)}</div>`;
  if (appendToExisting) el.insertAdjacentHTML('beforeend', html);
  else el.innerHTML = html;
}

/* ══════════════════════════════════════════════════════════
   EVENT LISTENERS
   ══════════════════════════════════════════════════════════ */

function attachListeners() {

  /* ── Language pills (header) ── */
  $a('.lang-pill').forEach(pill =>
    pill.addEventListener('click', () => {
      const lang = pill.dataset.lang;
      STATE.lang  = lang;
      STATE.level = 'basic';
      $a('.lang-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      $a('.level-btn').forEach(b => b.classList.toggle('active', b.dataset.level === 'basic'));
      buildLessonNav();
      const first = getLessons(lang, 'basic')[0];
      if (first) loadLesson(first.id);
      else showWelcome();
    }));

  /* ── Level buttons (sidebar) ── */
  $a('.level-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      STATE.level = btn.dataset.level;
      $a('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildLessonNav();
    }));

  /* ── Tab bar ── */
  $a('.tab-btn').forEach(btn =>
    btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

  /* ── Step navigation ── */
  $('prevStepBtn')?.addEventListener('click', () => {
    const l = getLessonById(STATE.lessonId);
    if (l && STATE.stepIndex > 0) renderStep(l, STATE.stepIndex - 1);
  });
  $('nextStepBtn')?.addEventListener('click', () => {
    const l = getLessonById(STATE.lessonId);
    if (l && STATE.stepIndex < l.steps.length - 1) renderStep(l, STATE.stepIndex + 1);
  });

  /* ── Sidebar toggle (desktop: collapsed, mobile: open overlay) ── */
  $('menuToggle')?.addEventListener('click', () => {
    const sidebar = $('sidebar');
    if (!sidebar) return;
    if (window.innerWidth <= 620) {
      sidebar.classList.toggle('open');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  });

  /* ── Welcome screen start buttons ── */
  $a('.btn-start').forEach(btn =>
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (!lang) return;
      STATE.lang  = lang;
      STATE.level = 'basic';
      $a('.lang-pill').forEach(p => p.classList.toggle('active', p.dataset.lang === lang));
      $a('.level-btn').forEach(b => b.classList.toggle('active', b.dataset.level === 'basic'));
      buildLessonNav();
      const first = getLessons(lang, 'basic')[0];
      if (first) loadLesson(first.id);
    }));

  /* ── Glossary ── */
  $('glossaryBtn')?.addEventListener('click', () => {
    $('glossaryBackdrop').style.display = 'flex';
    filterGlossary();
  });

  $('closeGlossary')?.addEventListener('click', () => {
    $('glossaryBackdrop').style.display = 'none';
  });

  $('glossaryBackdrop')?.addEventListener('click', e => {
    if (e.target === e.currentTarget)
      $('glossaryBackdrop').style.display = 'none';
  });

  $('glossarySearch')?.addEventListener('input', filterGlossary);

  // Filter chips
  $('glossaryFilters')?.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    $a('.chip', $('glossaryFilters')).forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    filterGlossary();
  });

  /* ── Term popup close ── */
  $('termPopupClose')?.addEventListener('click', () => {
    $('termPopup').style.display = 'none';
  });
  document.addEventListener('click', e => {
    const popup = $('termPopup');
    if (!popup || popup.style.display === 'none') return;
    if (!popup.contains(e.target) && !e.target.classList.contains('term-pill'))
      popup.style.display = 'none';
  });

  /* ── Reset progress ── */
  $('resetBtn')?.addEventListener('click', () => {
    $('confirmBackdrop').style.display = 'flex';
  });

  /* ── Export / Import progress ── */
  $('exportBtn')?.addEventListener('click', exportProgress);
  $('importBtn')?.addEventListener('click', () => $('importFileInput')?.click());
  $('importFileInput')?.addEventListener('change', e => {
    importProgress(e.target.files[0]);
    e.target.value = ''; // reset so same file can be re-selected
  });
  $('confirmCancel')?.addEventListener('click', () => {
    $('confirmBackdrop').style.display = 'none';
  });
  $('confirmReset')?.addEventListener('click', () => {
    localStorage.removeItem(LS_KEY);
    progress = {};
    refreshXP();
    refreshTotalProgress();
    buildLessonNav();
    $('confirmBackdrop').style.display = 'none';
    showToast('Progress reset.');
    showWelcome();
  });

  /* ── Close confirm on backdrop click ── */
  $('confirmBackdrop')?.addEventListener('click', e => {
    if (e.target === e.currentTarget)
      $('confirmBackdrop').style.display = 'none';
  });
}

/* ══════════════════════════════════════════════════════════
   BOOT
   ══════════════════════════════════════════════════════════ */
initApp();
