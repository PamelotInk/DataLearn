'use strict';

/* =========================================================
   lessons-dbt.js
   DataLearn — dbt (Data Build Tool) for Data Analysts
   12 lessons: 4 Basic | 4 Intermediate | 4 Advanced
   Language key: 'dbt'   Level keys: basic / intermediate / advanced
   Code mode:   text/x-sql  (SQL + Jinja - closest CM mode)
   ========================================================= */

const DBT_LESSONS = [

/* ═══════════════════════════════════════════════
   BASIC – Lessons 1-4
   ═══════════════════════════════════════════════ */
{
  id:'dbt-basic-1', language:'dbt', level:'basic', order:1,
  title:'What is dbt? — Project Structure & First Run',
  duration:'20 min', xp:100,
  scenario:{
    company:'Meridian Analytics', role:'Junior Data Analyst',
    description:`You just joined Meridian Analytics. On your first day the senior analyst points at a folder called "dbt/" in the repo and says: "All our production data models live here. Everything analysts consume goes through dbt first — no more raw SQL scripts on people's laptops." You've heard the term before but never used it. Today you understand what dbt is, what it creates, and how to run it.`
  },
  objectives:[
    'Explain what dbt does and where it sits in a modern data stack',
    'Understand the structure of a dbt project',
    'Read and interpret dbt_project.yml and profiles.yml',
    'Run dbt run and understand what happens'
  ],
  terminology:[
    {term:'dbt (Data Build Tool)', lang:'dbt', definition:'An open-source command-line tool that compiles SQL SELECT statements into database objects (views, tables) and manages their dependencies. "dbt handles the T in ELT."', example:'dbt run  # compiles models and runs them against your warehouse'},
    {term:'Model', lang:'dbt', definition:'A single .sql file in the models/ directory containing a SELECT statement. dbt wraps it in CREATE VIEW AS or CREATE TABLE AS automatically based on your materialization config.', example:'-- models/staging/stg_orders.sql\nSELECT id, customer_id, amount FROM raw.orders'},
    {term:'Materialization', lang:'dbt', definition:'How dbt persists a model in the warehouse. Options: view (default), table, incremental, ephemeral. Set globally in dbt_project.yml or per-model with {{ config() }}.', example:'{{ config(materialized="table") }}\nSELECT ...'},
    {term:'dbt_project.yml', lang:'dbt', definition:'The root configuration file of every dbt project. Defines the project name, model paths, default materializations, and variable defaults.', example:'name: meridian\nmodels:\n  meridian:\n    staging:\n      +materialized: view'},
    {term:'profiles.yml', lang:'dbt', definition:'Stored in ~/.dbt/ (not in the repo — keeps credentials out of version control). Defines connection details: warehouse type, host, database, schema, credentials.', example:'meridian:\n  target: dev\n  outputs:\n    dev:\n      type: snowflake\n      account: xy12345'},
    {term:'Target Schema', lang:'dbt', definition:'The database schema where dbt writes its output objects. In dev each analyst writes to their own schema (e.g., dbt_alice) to avoid overwriting shared tables.', example:'schema: dbt_alice  # in profiles.yml dev target'},
    {term:'Lineage Graph (DAG)', lang:'dbt', definition:'A Directed Acyclic Graph showing how models depend on each other. dbt builds the graph from {{ ref() }} and {{ source() }} calls, then runs models in the correct order.', example:'raw_orders → stg_orders → int_orders → fct_orders'}
  ],
  theory:`<h3>Where dbt Lives in the Data Stack</h3>
<p>Modern analytics engineering follows the <strong>ELT</strong> pattern: Extract from source, Load into the warehouse, then Transform inside the warehouse using SQL. dbt handles the T.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Source Systems → Fivetran / Airbyte → Raw Warehouse Layer<br>                                           ↓<br>                                         dbt (Transform)<br>                                           ↓<br>                                    mart / reporting layer<br>                                           ↓<br>                               BI Tool (Tableau, Looker, Power BI)</code></div></div>
<h3>What dbt Actually Does</h3>
<p>You write <em>SELECT</em> statements. dbt generates the <code>CREATE VIEW AS</code> or <code>CREATE TABLE AS</code> wrapper, runs it in your warehouse, manages the dependency order, and records what ran. That's it — but that simple idea removes an enormous amount of manual work.</p>
<h3>Standard Project Structure</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>my_project/<br>├── dbt_project.yml     ← project config<br>├── packages.yml        ← external packages<br>├── models/<br>│   ├── staging/        ← 1:1 with sources, light cleaning<br>│   ├── intermediate/   ← joins, business logic<br>│   └── marts/          ← final analytics tables<br>│       ├── finance/<br>│       └── marketing/<br>├── tests/              ← singular SQL tests<br>├── macros/             ← reusable Jinja functions<br>├── snapshots/          ← SCD Type 2 history tracking<br>└── seeds/              ← small CSV lookup files</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>The staging layer convention:</strong> One staging model per source table. Rename columns to your company's standard, cast data types, and do nothing else. All business logic belongs in intermediate or mart models.</div></div>`,
  steps:[
    {step:1, title:'Read dbt_project.yml',
     explanation:`Every dbt project starts with <code>dbt_project.yml</code>. It tells dbt the project name, where to find models, and default configurations.`,
     code:`# dbt_project.yml
name: 'meridian'
version: '1.0.0'

profile: 'meridian'           # links to ~/.dbt/profiles.yml

model-paths: ["models"]
test-paths:  ["tests"]
macro-paths: ["macros"]

models:
  meridian:
    # All staging models → views (cheap, always fresh)
    staging:
      +materialized: view
      +schema: staging

    # Mart models → tables (fast for BI tools)
    marts:
      +materialized: table`,
     simulatedOutput:{type:'text', content:`✓ dbt_project.yml is valid\nProject:  meridian\nProfile:  meridian\nModels:   models/\nTargets:\n  staging → VIEW  (schema override: staging)\n  marts   → TABLE`},
     note:'The + prefix on +materialized means "apply to all models in this folder and subfolders". It\'s inherited — child folders can override it.',
     after:'dbt now knows where everything lives and what materializations to use as defaults.'},
    {step:2, title:'Read profiles.yml (dev and prod targets)',
     explanation:`<code>profiles.yml</code> lives in <code>~/.dbt/</code>, never in the repo. It stores warehouse credentials and defines <em>targets</em> — named connection profiles you switch between.`,
     code:`# ~/.dbt/profiles.yml
meridian:
  target: dev    # which target is active by default

  outputs:
    dev:
      type:      snowflake
      account:   xy12345.us-east-1
      user:      alice@meridian.com
      password:  "{{ env_var('DBT_PASSWORD') }}"   # never hardcode!
      database:  ANALYTICS
      warehouse: COMPUTE_WH
      schema:    dbt_alice    # personal dev schema
      role:      TRANSFORMER

    prod:
      type:      snowflake
      account:   xy12345.us-east-1
      user:      dbt_service_account
      password:  "{{ env_var('DBT_PROD_PASSWORD') }}"
      database:  ANALYTICS
      warehouse: COMPUTE_WH_LARGE
      schema:    dbt_prod     # shared production schema
      role:      TRANSFORMER`,
     simulatedOutput:{type:'text', content:`$ dbt debug\nRunning with dbt=1.8.0\n\nConfiguration:\n  profiles.yml file [OK found and valid]\n  dbt_project.yml file [OK found and valid]\n\nRequired dependencies:\n  - git [OK found]\n\nConnection:\n  account: xy12345.us-east-1\n  database: ANALYTICS\n  schema: dbt_alice\n  warehouse: COMPUTE_WH\n  role: TRANSFORMER\n  Connection test: [OK connection ok]`},
     note:'env_var() reads credentials from environment variables. This keeps passwords out of version control entirely.',
     after:'dbt debug confirmed the connection works. You\'re always in your personal dev schema — you can\'t break production.'},
    {step:3, title:'Write your first model',
     explanation:`Create a staging model that reads from the raw orders table. The file name becomes the object name in the warehouse.`,
     code:`-- models/staging/stg_orders.sql
-- dbt will run: CREATE VIEW dbt_alice.stg_orders AS (...)

SELECT
    id                                   AS order_id,
    customer_id,
    created_at::DATE                     AS order_date,
    UPPER(status)                        AS status,
    amount / 100.0                       AS amount_dollars,  -- source stores cents
    _loaded_at                           AS loaded_at

FROM raw.orders     -- reading from the raw layer Fivetran wrote to

WHERE _loaded_at >= '2020-01-01'  -- exclude test data from before launch`,
     simulatedOutput:{type:'text', content:`$ dbt run --select stg_orders\nRunning with dbt=1.8.0\nFound 1 model, 0 tests, 0 snapshots\n\n  Concurrency: 4 threads\n\n1 of 1 START sql view model dbt_alice.stg_orders .................. [RUN]\n1 of 1 OK created sql view model dbt_alice.stg_orders ............. [CREATE VIEW in 0.84s]\n\nFinished running 1 view model in 0 hours 0 minutes and 1.32 seconds.\nCompleted successfully.\n\nDone. PASS=1 WARN=0 ERROR=0 SKIP=0 TOTAL=1`},
     note:'dbt wraps your SELECT in CREATE OR REPLACE VIEW automatically. You never write DDL.',
     after:'The view dbt_alice.stg_orders now exists in Snowflake. Anyone querying it gets the cleaned, renamed version of raw.orders.'},
    {step:4, title:'Run dbt run and understand the output',
     explanation:`Run all models in the project. dbt resolves dependencies, compiles SQL, and runs everything in the correct order.`,
     code:`# Run every model in the project
$ dbt run

# Run only models in the marts/ folder
$ dbt run --select marts

# Run a model and everything upstream of it (its dependencies)
$ dbt run --select +fct_orders

# Run a model and everything downstream of it (things that depend on it)
$ dbt run --select stg_orders+

# Run only models that have changed since the last production run
$ dbt run --select state:modified+`,
     simulatedOutput:{type:'text', content:`Running with dbt=1.8.0\nFound 14 models, 38 tests, 2 snapshots\n\n  Concurrency: 4 threads\n\n 1 of 14 START sql view model dbt_alice.stg_orders ................ [RUN]\n 2 of 14 START sql view model dbt_alice.stg_customers ............. [RUN]\n 3 of 14 START sql view model dbt_alice.stg_products .............. [RUN]\n 4 of 14 OK created sql view model dbt_alice.stg_orders ........... [CREATE VIEW in 0.81s]\n 5 of 14 START sql table model dbt_alice.int_order_items .......... [RUN]\n...\n14 of 14 OK created sql table model dbt_alice.fct_orders .......... [CREATE TABLE in 4.23s]\n\nFinished running 11 view models, 3 table models in 0h 0m 23s.\nCompleted successfully.\n\nDone. PASS=14 WARN=0 ERROR=0 SKIP=0 TOTAL=14`},
     note:'dbt runs staging models in parallel (threads: 4) then waits for dependencies. fct_orders ran last because stg_orders fed into it.',
     after:'14 models compiled and created. The entire transformation layer is reproducible with one command.'}
  ],
  challenge:{
    prompt:`You're onboarding to a new dbt project. You run \`dbt debug\` and see:\n\n  profiles.yml file [OK found and valid]\n  dbt_project.yml file [OK found and valid]\n  Connection test: [ERROR] FATAL: password authentication failed\n\nThen you run \`dbt run\` and get:\n  ERROR: Runtime Error\n  could not connect to server: Connection refused\n\nList three things you should check and explain what you'd look for in each.`,
    hint:'Think about the three layers between your terminal and the warehouse: the profiles.yml config, the environment variable holding the password, and the network/VPN layer.',
    solution:`1. **profiles.yml credentials** — Verify the password field uses env_var('DBT_PASSWORD') and that the environment variable is actually set in your shell: echo $DBT_PASSWORD (Linux/Mac) or $env:DBT_PASSWORD (PowerShell). If it prints blank, the variable isn't set.

2. **dbt target** — Check which target is active: dbt debug shows "Using profile meridian, target dev". Make sure you're not accidentally pointing at prod. Run: dbt run --target dev to force the dev target.

3. **Network / VPN** — "Connection refused" on the database port (Snowflake: 443, Postgres: 5432) usually means the warehouse host is unreachable. Check: (a) VPN is connected if required, (b) the account identifier in profiles.yml is correct (Snowflake format: orgname-accountname or legacy xy12345.region), (c) firewall rules allow outbound traffic on that port.`,
    explanation:`dbt authentication errors almost always come from one of three layers: bad credentials (wrong password or env var not set), wrong target selected (pointing to a profile that has different credentials), or a network layer blocking the connection. dbt debug is your first diagnostic tool — it checks each layer in sequence and reports exactly where the failure is.`
  },
  successMessage:`dbt basics unlocked! You now understand where dbt sits in the modern data stack, what a project looks like on disk, and how dbt run compiles and executes your models.`,
  insight:`dbt was created at RJMetrics in 2016 and open-sourced by Fishtown Analytics (now dbt Labs). It became the standard analytics engineering tool because it applied software engineering practices — version control, testing, documentation, modularity — to SQL transformations that previously lived in undocumented scripts scattered across analysts' laptops. Today Airbnb, Spotify, GitLab, JetBlue, and thousands of other companies run dbt in production.`
},

{
  id:'dbt-basic-2', language:'dbt', level:'basic', order:2,
  title:'Your First Model — SELECT, ref() & Materializations',
  duration:'22 min', xp:105,
  scenario:{
    company:'Meridian Analytics', role:'Junior Data Analyst',
    description:`The raw orders table in your warehouse was loaded by Fivetran. Column names are snake_case loaded directly from the source system: "Ord_Amt", "Cust_ID", "Stat_Cd". Your BI tool connects to mart tables, not raw tables. Your job: write a staging model that cleans and standardises the raw data, then write a mart model that references it using dbt's ref() function so dbt knows the dependency.`
  },
  objectives:[
    'Write a staging model that renames, casts, and cleans a raw table',
    'Use {{ ref() }} to reference one model from another',
    'Understand why ref() is required instead of hard-coding schema.table',
    'Switch a model from view to table materialization using {{ config() }}'
  ],
  terminology:[
    {term:'{{ ref() }}', lang:'dbt', definition:'The dbt function for referencing another model. Resolves to the correct schema.table_name for the active target. Tells dbt about the dependency so it builds the DAG correctly.', example:'SELECT * FROM {{ ref("stg_orders") }}'},
    {term:'{{ config() }}', lang:'dbt', definition:'Sets model-level configuration inside the model file itself, overriding dbt_project.yml defaults. Most common use: setting materialization.', example:'{{ config(materialized="table") }}'},
    {term:'Staging model', lang:'dbt', definition:'A model that reads directly from a source table and does only light, non-destructive transformations: rename columns, cast types, basic filters. One staging model per source table.', example:'stg_orders.sql reads from raw.orders'},
    {term:'Mart model', lang:'dbt', definition:'A wide, analytics-ready table designed for a specific business domain or BI use case. Reads from staging or intermediate models via ref().', example:'fct_orders.sql reads from {{ ref("stg_orders") }}'},
    {term:'Ephemeral', lang:'dbt', definition:'A materialization that creates no object in the warehouse. The model\'s SQL is inlined as a CTE wherever it is ref()\'d. Good for small helper transformations.', example:'{{ config(materialized="ephemeral") }}'},
    {term:'compiled SQL', lang:'dbt', definition:'The SQL dbt generates after resolving {{ ref() }}, {{ source() }}, and Jinja. Stored in target/compiled/. Useful for debugging.', example:'dbt compile --select stg_orders  # writes to target/compiled/'}
  ],
  theory:`<h3>The Three-Layer Model Architecture</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Raw Layer  (loaded by EL tool, never modified)<br>    ↓  {{ source() }}<br>Staging Layer  (stg_*.sql — rename, cast, filter)<br>    ↓  {{ ref() }}<br>Intermediate Layer  (int_*.sql — joins, aggregations)<br>    ↓  {{ ref() }}<br>Mart Layer  (fct_*.sql, dim_*.sql — BI-ready tables)</code></div></div>
<h3>Why {{ ref() }} Instead of raw.orders?</h3>
<p>Hard-coding <code>schema.table</code> in SQL creates an invisible dependency. dbt can't see it, so it can't build the correct execution order. <code>{{ ref("stg_orders") }}</code> does two things: (1) resolves to the correct <code>dbt_alice.stg_orders</code> or <code>dbt_prod.stg_orders</code> depending on your target, and (2) registers the dependency so dbt knows to build <code>stg_orders</code> before anything that ref()s it.</p>
<h3>Materialization Tradeoffs</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>view        → always fresh, zero storage, slow at query time (re-runs SQL every time)\ntable       → fast queries, uses storage, stale until next dbt run\nincremental → fast & storage-efficient for large tables (appends only new rows)\nephemeral   → no warehouse object, inlined as CTE — good for helpers</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Rule of thumb:</strong> staging = view, intermediate = view or ephemeral, mart = table. Analysts query marts constantly, so the storage cost of a table is worth the query speed.</div></div>`,
  steps:[
    {step:1, title:'Write a clean staging model',
     explanation:`Read from the raw table and apply only cosmetic transformations. No joins, no aggregations — just rename, cast, and filter.`,
     code:`-- models/staging/stg_orders.sql
-- Reads from: raw.orders (loaded by Fivetran)
-- Outputs:    a VIEW named stg_orders in the active target schema

SELECT
    -- Rename messy source column names to our standard
    "Ord_ID"            AS order_id,
    "Cust_ID"           AS customer_id,
    "Prod_ID"           AS product_id,

    -- Cast and clean
    "Ord_Dt"::DATE      AS order_date,
    TRIM(UPPER("Stat_Cd"))  AS status,       -- 'shipped', 'PENDING ', etc → 'PENDING'
    "Ord_Amt" / 100.0   AS order_amount,    -- source stores integer cents

    -- Metadata
    _fivetran_synced    AS loaded_at

FROM raw.orders

-- Exclude pre-launch test records
WHERE "Ord_Dt" >= '2023-01-01'`,
     simulatedOutput:{type:'text', content:`$ dbt run --select stg_orders\n\n1 of 1 START sql view model dbt_alice.stg_orders .................. [RUN]\n1 of 1 OK created sql view model dbt_alice.stg_orders ............. [CREATE VIEW in 0.92s]\n\nDone. PASS=1 WARN=0 ERROR=0 SKIP=0 TOTAL=1`},
     note:'No {{ ref() }} here — stg_orders reads from a source table, not another model. We\'ll use {{ source() }} in lesson 3 to make this explicit.',
     after:'The view dbt_alice.stg_orders is created. Column names are clean, types are correct, and test records are excluded.'},
    {step:2, title:'Reference it from a mart model with {{ ref() }}',
     explanation:`Write a mart model that builds on stg_orders. Use <code>{{ ref("stg_orders") }}</code> — never hard-code the schema.`,
     code:`-- models/marts/finance/fct_orders.sql
{{ config(materialized='table') }}   -- override: create TABLE, not VIEW

WITH orders AS (
    -- ✅ Use ref() — dbt resolves to the correct schema automatically
    SELECT * FROM {{ ref('stg_orders') }}

    -- ❌ Never do this — dbt can't see the dependency:
    -- SELECT * FROM dbt_alice.stg_orders
),

order_metrics AS (
    SELECT
        order_id,
        customer_id,
        order_date,
        status,
        order_amount,

        -- Derived columns
        DATE_TRUNC('month', order_date)          AS order_month,
        CASE
            WHEN order_amount >= 500 THEN 'high'
            WHEN order_amount >= 100 THEN 'medium'
            ELSE 'low'
        END                                       AS order_tier,
        order_amount * 0.08                       AS estimated_tax

    FROM orders
)

SELECT * FROM order_metrics`,
     simulatedOutput:{type:'text', content:`$ dbt run --select fct_orders\n\n  Concurrency: 4 threads\n\n1 of 2 START sql view model dbt_alice.stg_orders .................. [RUN]\n1 of 2 OK created sql view model dbt_alice.stg_orders ............. [CREATE VIEW in 0.89s]\n2 of 2 START sql table model dbt_alice.fct_orders ................. [RUN]\n2 of 2 OK created sql table model dbt_alice.fct_orders ............ [CREATE TABLE in 3.41s]\n\nDone. PASS=2 WARN=0 ERROR=0 SKIP=0 TOTAL=2`},
     note:'dbt automatically ran stg_orders first because fct_orders ref()\'d it. You only asked to run fct_orders — dbt figured out the dependency.',
     after:'fct_orders is now a TABLE in the warehouse. The BI tool can query it instantly without re-running any SQL.'},
    {step:3, title:'Inspect the compiled SQL',
     explanation:`After <code>dbt run</code>, dbt writes the compiled SQL — with all Jinja resolved — to <code>target/compiled/</code>. This is what actually ran.`,
     code:`$ dbt compile --select fct_orders

# Then open: target/compiled/meridian/models/marts/finance/fct_orders.sql`,
     simulatedOutput:{type:'text', content:`-- target/compiled/meridian/models/marts/finance/fct_orders.sql\n-- (Jinja resolved, ready to paste into a SQL client for debugging)\n\nCREATE OR REPLACE TABLE dbt_alice.fct_orders AS (\n\n  WITH orders AS (\n    SELECT * FROM dbt_alice.stg_orders   -- ← ref() resolved to this\n  ),\n\n  order_metrics AS (\n    SELECT\n      order_id, customer_id, order_date, status, order_amount,\n      DATE_TRUNC('month', order_date) AS order_month,\n      CASE\n        WHEN order_amount >= 500 THEN 'high'\n        WHEN order_amount >= 100 THEN 'medium'\n        ELSE 'low'\n      END AS order_tier,\n      order_amount * 0.08 AS estimated_tax\n    FROM orders\n  )\n\n  SELECT * FROM order_metrics\n)\n`},
     note:'Compiled SQL is your best debugging tool. When a model fails, open the compiled file and paste it directly into your SQL client to see the exact error.',
     after:'You can now see exactly what dbt submitted to the warehouse. The Jinja resolved and the schema matched your dev target.'},
    {step:4, title:'Run the full DAG and check the lineage',
     explanation:`Run all models and confirm the dependency chain executed in the correct order.`,
     code:`# Run all models
$ dbt run

# Generate lineage docs
$ dbt docs generate
$ dbt docs serve    # opens browser at localhost:8080`,
     simulatedOutput:{type:'text', content:`$ dbt run\nFound 14 models, 38 tests\n\n 1 of 14 START view model dbt_alice.stg_orders    ................. [RUN]\n 2 of 14 START view model dbt_alice.stg_customers  ................ [RUN]\n 3 of 14 START view model dbt_alice.stg_products   ................ [RUN]\n [3 models run in parallel — no dependencies between them]\n 4 of 14 OK  view model dbt_alice.stg_orders    ................... [CREATE VIEW in 0.89s]\n...\n14 of 14 OK  table model dbt_alice.fct_orders   ................... [CREATE TABLE in 3.87s]\n\nDone. PASS=14 WARN=0 ERROR=0 SKIP=0 TOTAL=14\n\n$ dbt docs generate\nCatalog written to target/catalog.json\n\n$ dbt docs serve\nServing docs at http://localhost:8080`},
     note:'dbt docs serve opens an interactive lineage graph. You can click any model and see its SQL, documentation, test results, and upstream/downstream dependencies.',
     after:'The full DAG ran in dependency order. The lineage graph is live at localhost:8080.'}
  ],
  challenge:{
    prompt:`You have three models: \`stg_customers\`, \`stg_orders\`, and \`fct_customer_orders\`. The mart model joins customers and orders and adds a "days_since_first_order" column. Write the complete \`fct_customer_orders.sql\` model using {{ ref() }} for both upstream models, configure it as a table, and include the derived column.`,
    hint:'Use a CTE for each staging model, then JOIN them on customer_id. CURRENT_DATE - MIN(order_date) gives days since first order. Configure materialization at the top with {{ config() }}.',
    solution:`-- models/marts/finance/fct_customer_orders.sql
{{ config(materialized='table') }}

WITH customers AS (
    SELECT * FROM {{ ref('stg_customers') }}
),

orders AS (
    SELECT * FROM {{ ref('stg_orders') }}
),

customer_orders AS (
    SELECT
        c.customer_id,
        c.customer_name,
        c.email,
        c.country,
        COUNT(o.order_id)              AS total_orders,
        SUM(o.order_amount)            AS lifetime_value,
        MIN(o.order_date)              AS first_order_date,
        MAX(o.order_date)              AS most_recent_order_date,
        CURRENT_DATE - MIN(o.order_date) AS days_since_first_order
    FROM customers c
    LEFT JOIN orders o USING (customer_id)
    GROUP BY 1, 2, 3, 4
)

SELECT * FROM customer_orders`,
    explanation:`Two ref() calls create two edges in the DAG: fct_customer_orders depends on both stg_customers and stg_orders. dbt will ensure both staging views exist before running this model. The LEFT JOIN preserves customers who have no orders yet (days_since_first_order would be null for them). USING (customer_id) is cleaner than ON c.customer_id = o.customer_id when the key name is the same in both tables.`
  },
  successMessage:`Model architecture understood! You can now write clean staging and mart models, use {{ ref() }} correctly, and choose the right materialization for each layer.`,
  insight:`The "one staging model per source table" convention came from the dbt team's experience at analytics companies. Without it, raw column names leak into mart models and become impossible to rename later — you'd have to update every downstream query. The staging layer acts as a stable interface: change the source system, update one staging model, and everything downstream keeps working.`
},

{
  id:'dbt-basic-3', language:'dbt', level:'basic', order:3,
  title:'Sources — Declaring Raw Tables & Freshness Checks',
  duration:'20 min', xp:100,
  scenario:{
    company:'Meridian Analytics', role:'Junior Data Analyst',
    description:`You have 12 staging models all doing "SELECT ... FROM raw.orders", "SELECT ... FROM raw.customers", etc. Then Fivetran changes the orders schema from raw.orders to raw_fivetran.orders_v2. You now have to hunt through 12 files to update the table name. A senior analyst sees you doing this and says: "You should be using sources. Declare raw tables once — reference them everywhere."` 
  },
  objectives:[
    'Declare raw source tables in a sources.yml file',
    'Replace hard-coded raw.table references with {{ source() }}',
    'Add freshness checks to alert when source data is stale',
    'Run dbt source freshness to inspect source health'
  ],
  terminology:[
    {term:'Source', lang:'dbt', definition:'A raw table loaded by an EL tool (Fivetran, Airbyte, Stitch), declared in a sources.yml file. Gives dbt visibility into where your data originates.', example:'source("fivetran_raw", "orders")'},
    {term:'{{ source() }}', lang:'dbt', definition:'References a declared source table. Resolves to database.schema.table based on the source definition. Used only in staging models — never in intermediate or mart models.', example:'SELECT * FROM {{ source("fivetran_raw", "orders") }}'},
    {term:'sources.yml', lang:'dbt', definition:'A YAML file (usually in models/staging/) that declares source databases, schemas, tables, and their metadata including freshness expectations.', example:'sources:\n  - name: fivetran_raw\n    tables:\n      - name: orders'},
    {term:'Freshness', lang:'dbt', definition:'A source-level check that alerts when the latest record in a source table is older than expected. Defined with loaded_at_field, warn_after, and error_after.', example:'freshness:\n  warn_after: {count: 12, period: hour}\n  error_after: {count: 24, period: hour}'},
    {term:'loaded_at_field', lang:'dbt', definition:'The column in the source table that records when each row was loaded. Used by dbt source freshness to find the MAX() timestamp and compare it to now.', example:'loaded_at_field: _fivetran_synced'},
    {term:'dbt source freshness', lang:'dbt', definition:'A dbt command that queries the loaded_at_field for each source and reports whether it is fresh, stale (warn), or errored (too stale).', example:'dbt source freshness'}
  ],
  theory:`<h3>The Problem with Hard-coded Source References</h3>
<p>Without sources, every staging model hard-codes the raw schema: <code>FROM raw.orders</code>. When that changes — and it always does — you grep-and-replace across dozens of files, miss one, and wake up to a broken pipeline at 2am.</p>
<h3>Sources Centralise Raw Table Declarations</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code># Before sources (fragile):\nSELECT * FROM raw.orders           -- in stg_orders.sql\nSELECT * FROM raw.orders           -- in stg_order_items.sql\nSELECT * FROM raw.orders           -- in stg_returns.sql\n...(12 files)\n\n# After sources (one change = everything fixed):\nSELECT * FROM {{ source("raw", "orders") }}</code></div></div>
<h3>Sources Also Give You Freshness Monitoring</h3>
<p>EL tools sometimes fail silently. Your Fivetran job errors at midnight but no alert fires. By 9am analysts are working with 12-hour-old data. <code>dbt source freshness</code> checks the <code>MAX(_fivetran_synced)</code> of every source table and compares it to your freshness expectations — catching stale data before analysts do.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Run dbt source freshness as the first step in your production job.</strong> If sources are stale, fail fast before wasting compute running hundreds of model builds on bad data.</div></div>`,
  steps:[
    {step:1, title:'Declare sources in sources.yml',
     explanation:`Create a <code>sources.yml</code> file in the staging folder. Declare every raw table your staging models read from.`,
     code:`# models/staging/sources.yml
version: 2

sources:
  - name: fivetran_raw          # logical name — use this in {{ source() }}
    database: ANALYTICS         # optional — overrides profiles.yml database
    schema: raw                 # the actual schema in the warehouse
    description: "Raw tables loaded by Fivetran from our Postgres transactional DB"

    # Default freshness for all tables in this source
    freshness:
      warn_after:  { count: 12, period: hour }
      error_after: { count: 24, period: hour }
    loaded_at_field: _fivetran_synced   # the load-timestamp column

    tables:
      - name: orders
        description: "One row per order placed on the platform"
        columns:
          - name: Ord_ID
            description: "Primary key — unique order identifier"

      - name: customers
        description: "One row per registered customer account"

      - name: products
        description: "Product catalogue — one row per SKU"
        # Override freshness for this table (updated daily, not hourly)
        freshness:
          warn_after:  { count: 25, period: hour }
          error_after: { count: 49, period: hour }`,
     simulatedOutput:{type:'text', content:`$ dbt parse\n✓ sources.yml parsed successfully\n  Source: fivetran_raw\n    Table: orders     (warn >12h, error >24h)\n    Table: customers  (warn >12h, error >24h)\n    Table: products   (warn >25h, error >49h)`},
     note:'The source name ("fivetran_raw") is your logical alias — it doesn\'t have to match the actual schema name. The schema: raw tells dbt where it really lives.',
     after:'Three source tables declared. dbt now knows about them and can check their freshness.'},
    {step:2, title:'Replace hard-coded references with {{ source() }}',
     explanation:`Update each staging model to use <code>{{ source("name", "table") }}</code> instead of <code>raw.table</code>.`,
     code:`-- models/staging/stg_orders.sql
-- BEFORE (fragile hard-code):
-- SELECT ... FROM raw.orders

-- AFTER (source reference):
SELECT
    "Ord_ID"            AS order_id,
    "Cust_ID"           AS customer_id,
    "Ord_Dt"::DATE      AS order_date,
    TRIM(UPPER("Stat_Cd"))  AS status,
    "Ord_Amt" / 100.0   AS order_amount,
    _fivetran_synced    AS loaded_at

FROM {{ source('fivetran_raw', 'orders') }}
--   ↑ dbt resolves this to ANALYTICS.raw.orders at compile time

WHERE "Ord_Dt" >= '2023-01-01'`,
     simulatedOutput:{type:'text', content:`$ dbt compile --select stg_orders\n\nCompiled SQL written to:\ntarget/compiled/meridian/models/staging/stg_orders.sql\n\n-- Preview of compiled output:\nSELECT\n    "Ord_ID" AS order_id,\n    ...\nFROM ANALYTICS.raw.orders   -- ← source() resolved\nWHERE "Ord_Dt" >= '2023-01-01'`},
     note:'Now if Fivetran moves orders to raw_v2.orders_v2, you change one line in sources.yml — not 12 model files.',
     after:'stg_orders now uses the source reference. The compiled SQL still resolves to the correct warehouse table.'},
    {step:3, title:'Run dbt source freshness',
     explanation:`Check whether every declared source table has been loaded within its freshness window.`,
     code:`# Check all sources
$ dbt source freshness

# Check only the fivetran_raw source
$ dbt source freshness --select source:fivetran_raw

# Check a specific table
$ dbt source freshness --select source:fivetran_raw.orders`,
     simulatedOutput:{type:'text', content:`Running with dbt=1.8.0\nFound 3 sources\n\nSelecting sources to check freshness of:\n  fivetran_raw.orders\n  fivetran_raw.customers\n  fivetran_raw.products\n\n1 of 3 START freshness of fivetran_raw.orders ..................... [RUN]\n1 of 3 PASS freshness of fivetran_raw.orders  ..................... [pass]\n       max loaded_at: 2026-05-03 07:42:16 UTC (3h 18m ago)\n       warn threshold: 12h | error threshold: 24h → PASS\n\n2 of 3 START freshness of fivetran_raw.customers .................. [RUN]\n2 of 3 WARN freshness of fivetran_raw.customers ................... [warn]\n       max loaded_at: 2026-05-03 00:11:02 UTC (10h 49m ago)\n       warn threshold: 12h → approaching, WARN\n\n3 of 3 START freshness of fivetran_raw.products ................... [RUN]\n3 of 3 PASS freshness of fivetran_raw.products .................... [pass]\n       max loaded_at: 2026-05-02 22:06:44 UTC (12h 54m ago)\n       warn threshold: 25h → PASS\n\nDone. PASS=2 WARN=1 ERROR=0`},
     note:'WARN means the data is getting stale but hasn\'t crossed the error threshold yet. ERROR means the data is too old and you should investigate the EL pipeline immediately.',
     after:'customers is approaching its freshness threshold. You\'d page the data engineering team to check the Fivetran connector.'},
    {step:4, title:'View source lineage in dbt docs',
     explanation:`After generating docs, sources appear in the lineage graph — showing the full path from raw table to mart.`,
     code:`$ dbt docs generate
$ dbt docs serve

# In the browser lineage graph you now see:
#
#  [source: fivetran_raw.orders]
#           ↓  {{ source() }}
#      [stg_orders]
#           ↓  {{ ref() }}
#      [int_order_items]
#           ↓  {{ ref() }}
#      [fct_orders]
#
# Click any node to see:
#   - SQL for that model
#   - Column descriptions
#   - Test results
#   - Freshness status (for sources)`,
     simulatedOutput:{type:'text', content:`$ dbt docs generate\nBuilding catalog...\n  Found 14 models, 3 sources, 38 tests\n  Catalog written to target/catalog.json\n  Manifest written to target/manifest.json\n\n$ dbt docs serve\nServing docs at http://localhost:8080\nPress Ctrl+C to exit.\n\n[Lineage graph visible in browser]\n  3 source nodes (green)\n  14 model nodes (blue)\n  Full DAG rendered — click any node to inspect`},
     note:'Source nodes appear in green in the lineage graph; model nodes in blue. This full-stack lineage is what makes dbt projects auditable.',
     after:'The complete data lineage is documented and visualised — from raw Fivetran tables all the way to BI mart tables.'}
  ],
  challenge:{
    prompt:`Your team adds a fourth source: a Stripe payments table at schema: stripe_raw, table: charges. It loads every 6 hours. Add it to sources.yml with an appropriate freshness check (warn at 8h, error at 16h). Then write the first two lines of a stg_charges.sql model that uses {{ source() }} to read from it.`,
    hint:'Add a new entry under the sources list (not under fivetran_raw — it\'s a different source). Use a separate - name: stripe_raw block. The stg_charges.sql only needs the SELECT ... FROM {{ source() }} line.',
    solution:`# In models/staging/sources.yml — add after fivetran_raw block:

  - name: stripe_raw
    schema: stripe_raw
    description: "Payment event data loaded from Stripe via Fivetran"
    loaded_at_field: _fivetran_synced
    freshness:
      warn_after:  { count: 8,  period: hour }
      error_after: { count: 16, period: hour }
    tables:
      - name: charges
        description: "One row per payment charge attempt from Stripe"

# models/staging/stg_charges.sql
SELECT
    id                  AS charge_id,
    customer_id,
    amount / 100.0      AS amount_dollars,
    currency,
    status,
    created::TIMESTAMP  AS charged_at,
    _fivetran_synced    AS loaded_at
FROM {{ source('stripe_raw', 'charges') }}`,
    explanation:`Each distinct data source (Fivetran Postgres feed, Stripe, Salesforce, etc.) gets its own top-level source block with its own schema. This allows per-source freshness defaults since different tools load at different frequencies. The stg_charges model reads from the stripe_raw source using source() — if Stripe ever changes the table name, you update sources.yml and stg_charges is automatically fixed.`
  },
  successMessage:`Sources mastered! Raw table references are now centralised and monitored. One YAML change fixes every model that reads from a renamed source.`,
  insight:`Before sources were added to dbt (v0.13.0, 2019), analysts documented raw tables in spreadsheets or Confluence pages that were always out of date. Sources brought that documentation into the code itself — queryable, testable, and version-controlled. The freshness check feature was inspired by Airflow's "sensor" pattern but implemented at the layer closest to the data, where it matters most.`
},

{
  id:'dbt-basic-4', language:'dbt', level:'basic', order:4,
  title:'Generic Tests — unique, not_null, accepted_values & relationships',
  duration:'22 min', xp:110,
  scenario:{
    company:'Meridian Analytics', role:'Junior Data Analyst',
    description:`A BI report showed 12% of orders had a NULL customer_id last week. Nobody caught it until the CMO noticed the customer segment breakdown didn't add up to 100%. Your manager says: "We need tests. Every column critical to a report should be tested. If data is bad, fail the job before it reaches the BI tool." You're about to write your first dbt tests.`
  },
  objectives:[
    'Write column-level generic tests in schema.yml',
    'Apply unique, not_null, accepted_values, and relationships tests',
    'Run dbt test and interpret pass/fail output',
    'Understand the SQL dbt generates for each test type'
  ],
  terminology:[
    {term:'Generic test', lang:'dbt', definition:'A reusable test template built into dbt (or installed via packages). Applied to columns in schema.yml. The four built-in ones are: unique, not_null, accepted_values, relationships.', example:'- name: order_id\n  tests:\n    - unique\n    - not_null'},
    {term:'schema.yml', lang:'dbt', definition:'A YAML file that documents models and applies tests to their columns. Can live in any models/ subdirectory. Usually one per folder.', example:'models:\n  - name: stg_orders\n    columns:\n      - name: order_id\n        tests: [unique, not_null]'},
    {term:'unique', lang:'dbt', definition:'Asserts that no two rows have the same value in the column. Fails if any duplicates exist (NULLs are excluded by default).', example:'SELECT order_id, COUNT(*) FROM stg_orders GROUP BY 1 HAVING COUNT(*) > 1'},
    {term:'not_null', lang:'dbt', definition:'Asserts that no value in the column is NULL. Fails if any NULL exists.', example:'SELECT * FROM stg_orders WHERE order_id IS NULL'},
    {term:'accepted_values', lang:'dbt', definition:'Asserts that every value in the column is in a specified list. Fails if any value falls outside the list.', example:'tests:\n  - accepted_values:\n      values: [pending, shipped, delivered, cancelled]'},
    {term:'relationships', lang:'dbt', definition:'A referential integrity test. Asserts that every value in a column exists in a specified column of another model. Like a foreign key check.', example:'tests:\n  - relationships:\n      to: ref("stg_customers")\n      field: customer_id'},
    {term:'dbt test', lang:'dbt', definition:'The command that runs all (or selected) tests. Compiles each test into a SQL query, runs it, and fails if any rows are returned.', example:'dbt test --select stg_orders'}
  ],
  theory:`<h3>How dbt Tests Work</h3>
<p>Every generic test compiles to a SQL query that returns rows <em>only when the test fails</em>. dbt runs the query — if it returns 0 rows, the test passes; if it returns any rows, the test fails and reports how many bad rows were found.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>-- What dbt runs for the "not_null" test on order_id:\nSELECT COUNT(*)\nFROM stg_orders\nWHERE order_id IS NULL\n\n-- What dbt runs for "unique" on order_id:\nSELECT order_id, COUNT(*) AS n\nFROM stg_orders\nGROUP BY order_id\nHAVING COUNT(*) > 1</code></div></div>
<h3>Four Built-in Generic Tests</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>unique          → no duplicate values\nnot_null        → no NULL values\naccepted_values → all values in an allowed list\nrelationships   → every FK value exists in the PK table</code></div></div>
<h3>Where Tests Live</h3>
<p>Generic tests are declared in <code>schema.yml</code> files alongside model documentation. This keeps tests and documentation together, versioned in git, and visible in dbt docs.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Minimum test standard:</strong> Every model's primary key should have both <code>unique</code> and <code>not_null</code>. Every foreign key should have <code>relationships</code>. Every status/type column should have <code>accepted_values</code>. Start there — it catches 80% of real data quality issues.</div></div>`,
  steps:[
    {step:1, title:'Write schema.yml with column tests',
     explanation:`Create (or update) <code>schema.yml</code> in the staging folder. Define model descriptions and column-level tests.`,
     code:`# models/staging/schema.yml
version: 2

models:
  - name: stg_orders
    description: "Cleaned and standardised orders from the raw Fivetran load"

    columns:
      - name: order_id
        description: "Primary key — unique per order"
        tests:
          - unique
          - not_null

      - name: customer_id
        description: "FK to stg_customers — every order must link to a customer"
        tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id

      - name: status
        description: "Current order status"
        tests:
          - not_null
          - accepted_values:
              values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

      - name: order_amount
        description: "Order total in USD (converted from cents)"
        tests:
          - not_null`,
     simulatedOutput:{type:'text', content:`$ dbt parse\n✓ schema.yml parsed successfully\n  8 tests declared across 4 columns in stg_orders`},
     note:'Tests are declared at the column level — they apply to every row in the model. You can also apply tests at the model level (e.g., testing row count), but column-level covers most cases.',
     after:'8 tests are registered. Run dbt test to execute them.'},
    {step:2, title:'Run the tests',
     explanation:`Execute all declared tests with <code>dbt test</code>. Each test compiles to SQL, runs against the warehouse, and reports pass or fail.`,
     code:`# Test a specific model
$ dbt test --select stg_orders

# Test all models
$ dbt test

# Test only a specific test type across all models
$ dbt test --select test_type:not_null`,
     simulatedOutput:{type:'text', content:`Running with dbt=1.8.0\nFound 14 models, 38 tests\n\nRunning 8 tests for model stg_orders:\n\n1 of 8 START test unique_stg_orders_order_id ...................... [RUN]\n1 of 8 PASS unique_stg_orders_order_id ........................... [PASS in 0.41s]\n\n2 of 8 START test not_null_stg_orders_order_id ................... [RUN]\n2 of 8 PASS not_null_stg_orders_order_id ......................... [PASS in 0.38s]\n\n3 of 8 START test not_null_stg_orders_customer_id ................ [RUN]\n3 of 8 FAIL not_null_stg_orders_customer_id ...................... [FAIL 47 in 0.52s]\n  Failure in test not_null_stg_orders_customer_id\n  Got 47 results, configured to fail if != 0\n\n4 of 8 START test relationships_stg_orders_customer_id............ [RUN]\n4 of 8 FAIL relationships_stg_orders_customer_id ................. [FAIL 12 in 0.61s]\n  Got 12 results — 12 orders reference customer_ids not in stg_customers\n\n5 of 8 PASS test not_null_stg_orders_status ...................... [PASS in 0.36s]\n\n6 of 8 FAIL test accepted_values_stg_orders_status ............... [FAIL 3 in 0.44s]\n  Got 3 results — values found: ['REFUNDED'] not in accepted list\n\n7 of 8 PASS test not_null_stg_orders_order_amount ................ [PASS in 0.39s]\n8 of 8 PASS test unique_stg_orders_order_id ...................... [PASS in 0.41s]\n\nDone. PASS=5 WARN=0 ERROR=0 FAIL=3 SKIP=0 TOTAL=8`},
     note:'Three real data quality problems found — 47 NULL customer_ids, 12 orphaned orders, 3 orders with status "REFUNDED" not in our accepted list. Without tests these would silently corrupt the BI report.',
     after:'Tests surfaced real problems before they reached the BI tool. Now you can fix the source data or update the model logic.'},
    {step:3, title:'Inspect the failing test SQL',
     explanation:`Use <code>dbt compile</code> to see the exact SQL a test will run. Helps you understand failures and write fixes.`,
     code:`$ dbt compile --select test_type:accepted_values,stg_orders

# Open: target/compiled/meridian/tests/
# accepted_values_stg_orders_status__pending__processing__...sql`,
     simulatedOutput:{type:'text', content:`-- Compiled SQL for accepted_values test on stg_orders.status:\n\nSELECT\n    status AS value_field,\n    COUNT(*) AS n\nFROM dbt_alice.stg_orders\nWHERE status IS NOT NULL\n  AND status NOT IN (\n      'pending',\n      'processing',\n      'shipped',\n      'delivered',\n      'cancelled'\n  )\nGROUP BY status\n\n-- Run this in your SQL client:\n-- Returns: REFUNDED | 3\n-- → "REFUNDED" is in the source but not in our accepted list`},
     note:'The test SQL tells you exactly what\'s wrong. "REFUNDED" is a valid status that wasn\'t in the accepted list — you add it to values: in schema.yml.',
     after:'Root cause identified. Either add "refunded" to the accepted_values list, or normalise "REFUNDED" to "cancelled" in the staging model.'},
    {step:4, title:'Fix the test failure and add severity: warn',
     explanation:`Update the accepted_values list and set tests you want to warn rather than error — useful during backfill periods.`,
     code:`# models/staging/schema.yml — updated
      - name: status
        description: "Current order status"
        tests:
          - not_null
          - accepted_values:
              values:
                - pending
                - processing
                - shipped
                - delivered
                - cancelled
                - refunded     # ← added after investigation

      - name: customer_id
        description: "FK to stg_customers"
        tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id
              # During a backfill, some old orders pre-date the customer table.
              # Warn instead of error until backfill is complete.
              config:
                severity: warn`,
     simulatedOutput:{type:'text', content:`$ dbt test --select stg_orders\n\n1 of 8 PASS unique_stg_orders_order_id ........................... [PASS in 0.41s]\n2 of 8 PASS not_null_stg_orders_order_id ......................... [PASS in 0.38s]\n3 of 8 PASS not_null_stg_orders_customer_id ...................... [PASS in 0.52s]\n4 of 8 WARN relationships_stg_orders_customer_id ................. [WARN 12 in 0.61s]\n  Got 12 results — configured to warn (not error) during backfill\n5 of 8 PASS not_null_stg_orders_status ........................... [PASS in 0.36s]\n6 of 8 PASS accepted_values_stg_orders_status .................... [PASS in 0.44s]\n7 of 8 PASS not_null_stg_orders_order_amount ...................... [PASS in 0.39s]\n8 of 8 PASS unique_stg_orders_order_id ........................... [PASS in 0.41s]\n\nDone. PASS=7 WARN=1 ERROR=0 FAIL=0 SKIP=0 TOTAL=8`},
     note:'severity: warn means the job continues even if the test finds failures. Use this temporarily during data migrations, not permanently — failing silently defeats the purpose of tests.',
     after:'7 tests pass, 1 warns about the backfill period. The pipeline continues running and you have a documented, tracked exception.'}
  ],
  challenge:{
    prompt:`Write the schema.yml tests for a \`stg_customers\` model with these columns: \`customer_id\` (PK), \`email\` (must be unique and not null), \`country_code\` (must be one of: US, CA, GB, AU, DE), \`account_status\` (must be: active, inactive, suspended). Also add a model-level description.`,
    hint:'Primary keys need both unique and not_null. Unique emails also need both. Use accepted_values for the two enum columns. Put the description at the model level (indented under name: stg_customers, not under a column).',
    solution:`# models/staging/schema.yml
version: 2

models:
  - name: stg_customers
    description: >
      Cleaned customer accounts from the raw Fivetran load.
      One row per registered customer. Excludes deleted accounts.

    columns:
      - name: customer_id
        description: "Primary key — unique per customer"
        tests:
          - unique
          - not_null

      - name: email
        description: "Customer email address — used as login identifier"
        tests:
          - unique
          - not_null

      - name: country_code
        description: "ISO 3166-1 alpha-2 country code of the customer"
        tests:
          - not_null
          - accepted_values:
              values: ['US', 'CA', 'GB', 'AU', 'DE']

      - name: account_status
        description: "Current status of the customer account"
        tests:
          - not_null
          - accepted_values:
              values: ['active', 'inactive', 'suspended']`,
    explanation:`email gets both unique and not_null because it serves as a natural key — two customers sharing an email would indicate a data quality issue. Country codes and account statuses use accepted_values because these are controlled enumerations: if a new value appears ("FR" for France, "banned" for a new status), you want to know immediately rather than have it silently slip into reports.`
  },
  successMessage:`Data testing mastered! You can now declare guardrails on every model so that bad data fails loudly before it reaches analysts and executives.`,
  insight:`The four built-in generic tests were inspired by database constraint patterns (PRIMARY KEY → unique+not_null; FOREIGN KEY → relationships; CHECK constraint → accepted_values), but implemented at the transformation layer where they can be version-controlled, run in CI, and produce readable failure reports. Before dbt tests, data quality checks were either ad-hoc SQL scripts that someone ran manually, or expensive third-party tools. Making tests first-class citizens of the transformation layer shifted data quality validation from an afterthought to an automated gate.`
}

,

/* ── BASIC 5 ─────────────────────────────────────────── */
{
  id:'dbt-basic-5', language:'dbt', level:'basic', order:5,
  title:'dbt Docs — Generate, Serve & Navigate Documentation',
  duration:'18 min', xp:115,
  scenario:{
    company:'Meridian Analytics', role:'Analytics Engineer',
    description:`Your team just onboarded three new analysts. They have no idea what your 40 dbt models do, which ones are safe to query, or how tables relate. dbt's built-in documentation system solves this in minutes: you write descriptions in YAML, run two commands, and get a searchable interactive data catalog with lineage graphs — no external tooling required.`
  },
  objectives:[
    'Add model and column descriptions to schema.yml',
    'Generate the docs site with dbt docs generate',
    'Serve and navigate the docs site with dbt docs serve',
    'Use the DAG lineage view to understand model dependencies'
  ],
  terminology:[
    {term:'dbt docs generate',lang:'dbt',definition:'Compiles all model metadata, schema.yml descriptions, and test results into a static JSON catalog file (catalog.json).',example:'dbt docs generate'},
    {term:'dbt docs serve',lang:'dbt',definition:'Launches a local web server (default port 8080) to view the generated documentation site interactively.',example:'dbt docs serve --port 8080'},
    {term:'description:',lang:'dbt',definition:'A YAML field on models and columns that populates the documentation site. Supports Markdown formatting.',example:"models:\n  - name: fct_orders\n    description: 'One row per order, grain = order_id'"},
    {term:'catalog.json',lang:'dbt',definition:'The output of dbt docs generate. Contains column-level metadata from the database, model descriptions, and test results merged into one file.',example:'target/catalog.json  # auto-generated, do not edit manually'},
    {term:'DAG (Directed Acyclic Graph)',lang:'dbt',definition:'The lineage graph of all models, sources, and exposures. Every dbt project has one. The docs site renders it interactively.',example:'-- Each arrow = one {{ ref() }} or {{ source() }} dependency'}
  ],
  theory:`<h3>Documentation as Code</h3>
<p>dbt docs treats documentation the same way it treats tests: defined in version-controlled YAML files, generated automatically, always in sync with the actual models. The result is a living data catalog that updates every time you run <code>dbt docs generate</code>.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code># Two-command documentation workflow:\ndbt docs generate   # compile catalog\ndbt docs serve      # open browser → localhost:8080</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Write descriptions for every model and every column that analysts will query. A single sentence is enough: what does this table contain, what is the grain (one row per what?), and any caveats. This description appears in the docs site AND in the database as a column comment if your warehouse supports it.</div></div>`,
  steps:[
    {step:1, title:'Add Descriptions to schema.yml',
     explanation:`Populate your schema.yml with model-level and column-level descriptions. These appear verbatim in the docs site.`,
     code:`# models/schema.yml

version: 2

models:
  - name: stg_orders
    description: >
      Staged orders from the production orders table.
      One row per order. Includes all statuses including cancelled.
      Grain: order_id
    columns:
      - name: order_id
        description: "Unique identifier for each order. Primary key."
        tests:
          - unique
          - not_null
      - name: customer_id
        description: "FK to stg_customers. The customer who placed the order."
      - name: order_date
        description: "UTC date when the order was created."
      - name: status
        description: >
          Order lifecycle status. Values: placed, shipped, completed,
          return_pending, returned.

  - name: fct_orders
    description: >
      Core orders fact table. One row per order, joined to customer
      and product dimensions. Used for all revenue reporting.
      Excludes cancelled and test orders (order_id starting with 'TEST').
    columns:
      - name: order_id
        description: "Primary key. References stg_orders.order_id."
        tests:
          - unique
          - not_null
      - name: revenue
        description: "Gross revenue in USD. Excludes tax and shipping."`,
     simulatedOutput:{type:'text', content:`schema.yml updated with full descriptions.\n\nDescriptions appear in:\n  1. dbt docs site (searchable, with lineage)\n  2. Database column comments (BigQuery, Snowflake, Redshift)\n  3. dbt test output context messages\n\nYAML tip — use > for multi-line descriptions:\n  description: >    # folded block — newlines become spaces\n    Line one.\n    Line two.        # renders as "Line one. Line two."\n\n  description: |    # literal block — preserves newlines\n    Line one.\n    Line two.`},
     note:'Use > (folded) for prose descriptions that flow as a paragraph. Use | (literal) if you want line breaks preserved — useful for lists inside descriptions.',
     after:'Descriptions are optional but invaluable. Even a single sentence per model dramatically reduces the support burden on the analytics engineering team.'},
    {step:2, title:'Generate and Serve the Docs',
     explanation:`Run dbt docs generate to compile the catalog, then dbt docs serve to open the interactive site. The site shows descriptions, column types, row counts (if configured), and the full DAG.`,
     code:`# Terminal — run from project root

# Step 1: Ensure models are built
dbt run

# Step 2: Run tests (results appear in docs)
dbt test

# Step 3: Generate documentation catalog
dbt docs generate

# Output:
# Running with dbt=1.8.0
# Found 12 models, 4 sources, 38 tests
# Catalog written to target/catalog.json ✓
# Documentation generated ✓

# Step 4: Serve on localhost
dbt docs serve

# Output:
# Serving docs at http://localhost:8080
# Press Ctrl+C to stop the server`,
     simulatedOutput:{type:'text', content:`$ dbt docs generate\nRunning with dbt=1.8.0\nFound 12 models, 4 sources, 38 tests\n\nConcurrency: 4 threads\n\nDone.\nCatalog written to /project/target/catalog.json\n\n$ dbt docs serve\nServing docs at 8080\nTo access from your browser, navigate to: http://localhost:8080\n\nPress Ctrl+C to stop the server\n\n--- What you see in the browser ---\n\nLeft panel:\n  ● Project tree (all models grouped by folder)\n  ● Sources (raw tables with freshness status)\n  ● Exposures (downstream dashboards/APIs)\n\nCenter panel:\n  ● Model description (from schema.yml)\n  ● Column table: name, type, description, tests\n  ● Model SQL (compiled, with refs resolved)\n\nBottom panel:\n  ● Interactive DAG — click any model to highlight\n    its upstream dependencies and downstream consumers`},
     after:'The docs site is self-contained static HTML/JS — you can copy target/docs/ to any web host (S3, GitHub Pages) to share with the full company without running a server.'},
    {step:3, title:'Navigate the DAG Lineage View',
     explanation:`The lineage graph shows every model's upstream parents and downstream consumers. It is the single most useful tool for understanding data flow and impact analysis.`,
     code:`# Impact analysis — "If I change stg_orders, what breaks?"

# In the docs site lineage view:
# 1. Click stg_orders in the left panel
# 2. The DAG centers on stg_orders
# 3. Green nodes = upstream (sources / staging models)
# 4. Blue nodes = downstream (models that ref() stg_orders)

# From the command line — same information:
dbt ls --select stg_orders+          # stg_orders and all downstream
dbt ls --select +fct_orders          # fct_orders and all upstream

# Run only the affected models:
dbt run --select stg_orders+         # re-run stg_orders and children
dbt run --select 1+fct_orders        # fct_orders + 1 level of parents

# Selector syntax cheat sheet:
# model+        → model and all downstream descendants
# +model        → model and all upstream ancestors
# 1+model       → model + 1 upstream level only
# model+1       → model + 1 downstream level only
# tag:finance   → all models with tag: finance`,
     simulatedOutput:{type:'text', content:`$ dbt ls --select stg_orders+\n\nmeridian.stg_orders\nmeridian.int_orders_enriched\nmeridian.fct_orders\nmeridian.fct_order_items\nmeridian.rpt_revenue_daily\nmeridian.rpt_customer_ltv\n\n6 models selected\n\n--- Lineage summary ---\n\nraw.orders (source)\n  └─► stg_orders\n        └─► int_orders_enriched\n              ├─► fct_orders\n              │     ├─► rpt_revenue_daily\n              │     └─► rpt_customer_ltv\n              └─► fct_order_items\n                    └─► rpt_revenue_daily`},
     after:'The DAG is the heart of every dbt project. Before changing any model, run dbt ls --select model+ to enumerate all downstream impacts. This prevents breaking downstream reports silently.'}
  ],
  challenge:{
    title:'Document a New Model',
    description:`Write a schema.yml entry for a hypothetical model called fct_subscriptions with: a model description (one row per active subscription, grain = subscription_id), and column descriptions for subscription_id (PK, unique+not_null tests), customer_id (FK to dim_customers), plan_name (values: starter, pro, enterprise), monthly_revenue (MRR in USD, excludes trials), and start_date. Then write the dbt command to generate and serve the docs.`,
    hint:`Use the schema.yml structure from Step 1. Add tests: under each column that needs them. The two commands are dbt docs generate and dbt docs serve.`,
    starterCode:`# models/schema.yml — add fct_subscriptions entry

version: 2

models:
  - name: fct_subscriptions
    description: >
      # Add your model description here

    columns:
      - name: subscription_id
        description: ""
        tests:
          -
          -
      - name: customer_id
        description: ""
      - name: plan_name
        description: ""
      - name: monthly_revenue
        description: ""
      - name: start_date
        description: ""

# Commands to generate and view docs:
# $ _______________
# $ _______________`,
    solution:`version: 2

models:
  - name: fct_subscriptions
    description: >
      Core subscriptions fact table. One row per active subscription.
      Grain: subscription_id. Excludes trial subscriptions and
      cancelled accounts (status = 'cancelled').

    columns:
      - name: subscription_id
        description: "Unique identifier for each subscription. Primary key."
        tests:
          - unique
          - not_null
      - name: customer_id
        description: "FK to dim_customers. The account that owns this subscription."
      - name: plan_name
        description: "Subscription tier. Values: starter, pro, enterprise."
      - name: monthly_revenue
        description: >
          Monthly recurring revenue (MRR) in USD for this subscription.
          Excludes trial periods (charged_amount = 0).
      - name: start_date
        description: "UTC date when the subscription became active and billable."

# Commands:
# $ dbt docs generate
# $ dbt docs serve`,
    explanation:`Every model description should answer three questions: what does this table contain, what is the grain (one row per what?), and what is excluded. Column descriptions should state the business meaning, not just re-state the column name. Tests (unique, not_null) surface in the docs site alongside the column entries.`,
    successMessage:`dbt docs mastered! A documented dbt project is a self-service data catalog — analysts can answer their own questions about table structure, grain, and lineage without opening a Slack channel.`
  },
  insight:`dbt's documentation system is one of the highest-leverage features in the modern data stack. Teams that consistently write descriptions report a significant reduction in "what does this column mean?" questions, faster analyst onboarding, and cleaner data governance audit trails. The DAG lineage view — visible in the docs site — is also the feature most often demonstrated to data leadership when justifying dbt adoption. It makes the entire transformation layer visible in a way no SQL script folder ever could.`
},

/* ── INTERMEDIATE 1 ─────────────────────────────────── */
{
  id:'dbt-inter-1', language:'dbt', level:'intermediate', order:6,
  title:'Incremental Models — Only Process New Data',
  duration:'25 min', xp:165,
  scenario:{
    company:'Meridian Analytics', role:'Analytics Engineer',
    description:`Your events table has 500 million rows and grows by 2 million per day. A full refresh takes 45 minutes. The CEO wants the dashboard refreshed every 30 minutes. The solution: incremental materialization. dbt builds the model once as a full table, then on subsequent runs only processes rows newer than the last run — a 45-minute job becomes a 90-second job.`
  },
  objectives:[
    'Understand when and why to use incremental materialization',
    'Write an is_incremental() filtered model',
    'Configure unique_key for upsert behavior',
    'Choose between append, merge, and delete+insert strategies'
  ],
  terminology:[
    {term:'incremental',lang:'dbt',definition:'A dbt materialization that builds the model as a table on first run, then on subsequent runs only processes and merges new/changed rows.',example:"{{ config(materialized='incremental') }}"},
    {term:'is_incremental()',lang:'dbt',definition:'A Jinja macro that returns TRUE when the model is running in incremental mode (the table already exists). Use it to filter the source query to only new rows.',example:"{% if is_incremental() %}\n  WHERE event_ts > (SELECT MAX(event_ts) FROM {{ this }})\n{% endif %}"},
    {term:'{{ this }}',lang:'dbt',definition:'A Jinja variable referencing the current model\'s table in the warehouse. Use it inside is_incremental() to query the existing table.',example:'SELECT MAX(updated_at) FROM {{ this }}'},
    {term:'unique_key',lang:'dbt',definition:'A column (or list of columns) that identifies each row uniquely. When set, dbt performs an UPSERT — updating existing rows that match and inserting new ones.',example:"{{ config(unique_key='event_id') }}"},
    {term:'incremental_strategy',lang:'dbt',definition:'Controls how dbt merges new data: append (insert only), merge (upsert, default for most warehouses), delete+insert (delete matching rows then re-insert).',example:"{{ config(incremental_strategy='merge') }}"}
  ],
  theory:`<h3>How Incremental Works</h3>
<ol>
<li><strong>First run:</strong> dbt runs the full SELECT query and materializes the result as a table.</li>
<li><strong>Subsequent runs:</strong> <code>is_incremental()</code> evaluates to TRUE. The WHERE clause filters only new rows. dbt merges them into the existing table using the <code>unique_key</code>.</li>
<li><strong>Full refresh:</strong> <code>dbt run --full-refresh</code> drops the table and rebuilds from scratch — use when the model logic changes significantly.</li>
</ol>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>The is_incremental() filter is critical: without it, every run would process the full source table and you'd lose the performance benefit. The filter should select rows where source.updated_at > MAX(this.updated_at) — not just new rows, but also rows that were updated since the last run.</div></div>`,
  steps:[
    {step:1, title:'Write Your First Incremental Model',
     explanation:`Configure incremental materialization and add the is_incremental() filter. On first run the full table builds; on subsequent runs only new rows are processed.`,
     code:`-- models/fct_events.sql

{{
  config(
    materialized = 'incremental',
    unique_key   = 'event_id'
  )
}}

SELECT
    event_id,
    user_id,
    event_type,
    event_ts,
    session_id,
    page_url,
    properties,
    _loaded_at

FROM {{ source('raw', 'events') }}

{% if is_incremental() %}

  -- Only fetch rows newer than what we already have.
  -- Use MAX(event_ts) from the existing table as the cutoff.
  WHERE event_ts > (
    SELECT COALESCE(MAX(event_ts), '1900-01-01')
    FROM {{ this }}
  )

{% endif %}`,
     simulatedOutput:{type:'text', content:`$ dbt run --select fct_events\n\n--- First run (table does not exist yet) ---\nis_incremental() = FALSE → full SELECT runs\n\n18:03:01  Running model fct_events\n18:03:01  CREATE TABLE analytics.fct_events AS ...\n18:48:22  fct_events  [OK created in 45m 21s]  500,000,000 rows\n\n--- Second run (table exists) ---\nis_incremental() = TRUE → WHERE clause applied\n\n21:00:01  Running model fct_events\n21:00:01  SELECT WHERE event_ts > '2024-06-03 18:48:22'\n21:01:28  fct_events  [OK merged in 1m 27s]     2,100,000 rows`},
     note:'COALESCE(MAX(event_ts), \'1900-01-01\') handles the edge case where the target table exists but is empty — without COALESCE, MAX() returns NULL and the WHERE clause filters out everything.',
     after:'The model is now incremental. Production runs process ~2M rows in 90 seconds instead of 500M in 45 minutes. Full-refresh rebuilds are still available with --full-refresh when the logic changes.'},
    {step:2, title:'Configure unique_key for Upsert Behavior',
     explanation:`Setting unique_key tells dbt to UPSERT — update rows that already exist and insert genuinely new ones. Without it, dbt only appends and you get duplicate rows when source records are updated.`,
     code:`-- models/fct_orders.sql — orders can be updated (status changes)

{{
  config(
    materialized         = 'incremental',
    unique_key           = 'order_id',
    incremental_strategy = 'merge'   -- default on most warehouses
  )
}}

SELECT
    order_id,
    customer_id,
    status,            -- this changes: placed → shipped → completed
    order_total,
    updated_at

FROM {{ source('raw', 'orders') }}

{% if is_incremental() %}
  -- Fetch rows updated SINCE our last run (catches status changes too)
  WHERE updated_at > (
    SELECT COALESCE(MAX(updated_at), '1900-01-01')
    FROM {{ this }}
  )
{% endif %}

-- Without unique_key: a "completed" order would appear TWICE
--   row 1: order_id=101, status='placed'    (from first run)
--   row 2: order_id=101, status='completed' (from second run)
-- With unique_key='order_id': row 1 is UPDATED to status='completed'`,
     simulatedOutput:{type:'text', content:`Merge strategy behavior:\n\nSource brings in 50,000 rows this run:\n  - 48,200 rows: order_id matches existing → UPDATE (status changed)\n  -  1,800 rows: order_id is new → INSERT\n\nResult: table row count increases by only 1,800, not 50,000.\n\nWarehouse-specific strategies:\n\n  Snowflake  → merge (default)        ✓\n  BigQuery   → merge (default)        ✓\n  Redshift   → delete+insert          ✓ (no native MERGE)\n  DuckDB     → merge (default)        ✓\n  Postgres   → merge (dbt 1.6+)       ✓\n\nFor Redshift, use:\n{{ config(incremental_strategy='delete+insert') }}`},
     after:'The updated_at filter is the key: you want rows that were created OR updated since the last run. Event tables (append-only) just need event_ts; order tables (mutable) need updated_at.'},
    {step:3, title:'Full Refresh and Incremental Caveats',
     explanation:`Incremental models need a full refresh when you add columns, change logic significantly, or the watermark drifts. Know when to use --full-refresh.`,
     code:`# When to run full-refresh:

# 1. You added a new column to the SELECT
dbt run --select fct_events --full-refresh

# 2. You changed business logic (recalculated existing columns)
dbt run --select fct_events --full-refresh

# 3. Source data was backfilled (historical records inserted)
dbt run --select fct_events --full-refresh

# 4. The watermark (MAX updated_at) is wrong due to a failed run
dbt run --select fct_events --full-refresh

# Best practice: schedule daily or weekly full-refresh
# via Airflow/dbt Cloud to prevent watermark drift:
# dbt run --full-refresh --select tag:incremental

# Partitioned incremental (BigQuery) — better performance:
{{
  config(
    materialized            = 'incremental',
    unique_key              = 'event_id',
    partition_by            = {'field': 'event_date', 'data_type': 'date'},
    incremental_strategy    = 'merge',
    cluster_by              = ['event_type', 'user_id']
  )
}}`,
     simulatedOutput:{type:'text', content:`$ dbt run --select fct_events --full-refresh\n\n18:00:01  Detected --full-refresh flag\n18:00:01  Dropping table: analytics.fct_events\n18:00:02  Running full SELECT (is_incremental() = FALSE)\n18:46:10  fct_events  [OK recreated in 46m 8s]  502,100,000 rows\n\nCaveats checklist:\n  ✓  Add new columns          → needs --full-refresh\n  ✓  Change WHERE logic       → needs --full-refresh\n  ✓  Backfill source data     → needs --full-refresh\n  ✓  Broken watermark         → needs --full-refresh\n  ✓  New rows only (events)   → incremental is fine\n  ✓  Status updates (orders)  → incremental + unique_key`},
     after:'--full-refresh is safe — it just rebuilds the table from scratch. The cost is time and compute. Build it into your weekly maintenance schedule so incremental watermarks never drift too far.'
    }
  ],
  challenge:{
    title:'Incremental Session Aggregation',
    description:`Write an incremental dbt model called fct_daily_sessions that aggregates an events source into one row per (user_id, session_date): total events, distinct event types, and first/last event timestamps. Configure unique_key as a list ['user_id','session_date'] and use the merge strategy. Include the is_incremental() filter on event_ts.`,
    hint:`unique_key can be a list for composite keys. Use event_ts::date to derive session_date. The WHERE filter uses MAX(last_event_ts) from {{ this }}.`,
    starterCode:`-- models/fct_daily_sessions.sql

{{
  config(
    materialized = 'incremental',
    unique_key   = [         ,         ],   -- composite key
    incremental_strategy = 'merge'
  )
}}

SELECT
    user_id,
    event_ts::date          AS session_date,
    COUNT(*)                AS total_events,
    COUNT(DISTINCT event_type) AS distinct_event_types,
    MIN(event_ts)           AS first_event_ts,
    MAX(event_ts)           AS last_event_ts

FROM {{ source('raw', 'events') }}

{% if is_incremental() %}
  WHERE event_ts > (
    SELECT COALESCE(    (last_event_ts), '1900-01-01')
    FROM {{ this }}
  )
{% endif %}

GROUP BY
    user_id,
    event_ts::date`,
    solution:`-- models/fct_daily_sessions.sql

{{
  config(
    materialized         = 'incremental',
    unique_key           = ['user_id', 'session_date'],
    incremental_strategy = 'merge'
  )
}}

SELECT
    user_id,
    event_ts::date              AS session_date,
    COUNT(*)                    AS total_events,
    COUNT(DISTINCT event_type)  AS distinct_event_types,
    MIN(event_ts)               AS first_event_ts,
    MAX(event_ts)               AS last_event_ts

FROM {{ source('raw', 'events') }}

{% if is_incremental() %}
  WHERE event_ts > (
    SELECT COALESCE(MAX(last_event_ts), '1900-01-01')
    FROM {{ this }}
  )
{% endif %}

GROUP BY
    user_id,
    event_ts::date`,
    explanation:`A composite unique_key as a list tells dbt to MERGE on the combination of both columns — no single column is unique here. The watermark uses MAX(last_event_ts) from the already-aggregated table, not the source, which ensures all events in a partial day get reprocessed correctly on subsequent same-day runs.`,
    successMessage:`Incremental models mastered! This single pattern — is_incremental() + unique_key + merge — is responsible for making dbt workloads feasible at petabyte scale. Without it, every run would rebuild the entire history.`
  },
  insight:`Incremental materialization is the most impactful dbt feature for production performance. At companies with billions of rows in event tables, the difference between a full refresh (hours) and an incremental run (minutes) determines whether near-real-time dashboards are even feasible. The is_incremental() pattern is used at scale by companies like Airbnb, GitLab, and Shopify in their public dbt project examples — it is not an edge case, it is the standard approach for any table that grows continuously.`
},

/* ── INTERMEDIATE 2 ─────────────────────────────────── */
{
  id:'dbt-inter-2', language:'dbt', level:'intermediate', order:7,
  title:'Seeds — CSV Reference Tables as Version-Controlled Data',
  duration:'15 min', xp:125,
  scenario:{
    company:'Meridian Analytics', role:'Analytics Engineer',
    description:`Your revenue model needs a country-to-region mapping, cost center codes for finance, and a product category lookup. These small reference tables currently live in a shared Google Sheet that nobody owns, and analysts use different versions. dbt seeds store these as CSV files in your git repo — version-controlled, tested like any other model, and loaded into the warehouse with dbt seed.`
  },
  objectives:[
    'Create CSV seed files in the seeds/ directory',
    'Load seeds into the warehouse with dbt seed',
    'Reference seeds in models with ref()',
    'Configure seed column types and schema in dbt_project.yml'
  ],
  terminology:[
    {term:'dbt seed',lang:'dbt',definition:'A CSV file stored in the seeds/ directory that dbt loads into the warehouse as a table. Version-controlled reference data.',example:'dbt seed                   # load all seeds\ndbt seed --select country_map  # load one seed'},
    {term:'seeds/',lang:'dbt',definition:'The project directory where seed CSV files are stored. dbt discovers all .csv files here automatically.',example:'seeds/\n  country_region_map.csv\n  cost_center_codes.csv\n  product_categories.csv'},
    {term:'ref() for seeds',lang:'dbt',definition:'Seeds are referenced exactly like models — using {{ ref(\'seed_name\') }}. dbt knows to depend on the seed table.',example:"LEFT JOIN {{ ref('country_region_map') }} cr\n  ON orders.country = cr.country_code"},
    {term:'+column_types:',lang:'dbt',definition:'Seed configuration in dbt_project.yml that forces specific SQL types for columns (overrides automatic inference from the CSV).',example:"seeds:\n  myproject:\n    country_region_map:\n      +column_types:\n        country_code: varchar(3)"}
  ],
  theory:`<h3>When to Use Seeds</h3>
<p>Seeds are ideal for: mapping tables (country codes → regions), static classification lists (product category hierarchy), financial code lookups (cost centers, GL codes), and manually curated exclusion lists. They are <strong>not</strong> ideal for tables larger than a few thousand rows or data that changes frequently — use source tables for those.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Good seed candidates (small, stable, hand-maintained):\n  country_region_map.csv    ~250 rows\n  cost_center_codes.csv     ~80 rows\n  excluded_test_orders.csv  ~15 rows\n\nBad seed candidates (large or frequently changing):\n  all_customers.csv    → use a source table\n  daily_prices.csv     → use a source + incremental model</code></div></div>`,
  steps:[
    {step:1, title:'Create Seed CSV Files',
     explanation:`Drop CSV files into the seeds/ directory. dbt uses the filename as the table name. Column headers become column names.`,
     code:`# File: seeds/country_region_map.csv

country_code,country_name,region,sub_region
US,United States,Americas,North America
CA,Canada,Americas,North America
MX,Mexico,Americas,Latin America
GB,United Kingdom,EMEA,Western Europe
DE,Germany,EMEA,Western Europe
FR,France,EMEA,Western Europe
AU,Australia,APAC,Oceania
JP,Japan,APAC,East Asia
SG,Singapore,APAC,Southeast Asia
BR,Brazil,Americas,Latin America

---

# File: seeds/product_categories.csv

category_id,category_name,parent_category,margin_target_pct
1,Electronics,Hardware,0.22
2,Laptops,Electronics,0.25
3,Monitors,Electronics,0.28
4,Software,Digital,0.75
5,SaaS Licenses,Software,0.80
6,Accessories,Hardware,0.40
7,Cables,Accessories,0.35`,
     simulatedOutput:{type:'text', content:`seeds/ directory:\n  country_region_map.csv    10 rows\n  product_categories.csv     7 rows\n  cost_center_codes.csv     23 rows\n\ndbt will create tables:\n  analytics.country_region_map\n  analytics.product_categories\n  analytics.cost_center_codes\n\nColumn types are inferred automatically from CSV values:\n  country_code  → varchar\n  region        → varchar\n  margin_target → float   (contains decimals)\n  category_id   → integer (all whole numbers)`},
     note:'Commit seed CSV files to git just like SQL files. They are part of your data transformation codebase, not separate unversioned spreadsheets.',
     after:'Every CSV column header becomes a warehouse column. Column types are inferred from the data — override them in dbt_project.yml if the inference is wrong (e.g., leading-zero codes inferred as integer).'},
    {step:2, title:'Load Seeds and Configure Types',
     explanation:`Run dbt seed to load CSVs into the warehouse. Configure column types in dbt_project.yml to prevent type inference errors.`,
     code:`# dbt_project.yml — seed configuration

seeds:
  meridian:                     # your project name
    country_region_map:
      +column_types:
        country_code: varchar(3)    # prevent inference as 2-char string
        region: varchar(50)

    product_categories:
      +column_types:
        category_id: integer
        margin_target_pct: numeric(5,2)
      +schema: reference          # load to analytics.reference schema

# Terminal:
# $ dbt seed
# $ dbt seed --select country_region_map   # one seed only
# $ dbt seed --full-refresh                 # truncate and reload`,
     simulatedOutput:{type:'text', content:`$ dbt seed\n\nRunning with dbt=1.8.0\nFound 3 seeds\n\n11:02:15  Seed file loaded: country_region_map   10 rows\n11:02:16  Seed file loaded: product_categories     7 rows\n11:02:17  Seed file loaded: cost_center_codes     23 rows\n\nCompleted successfully\n\nTables created:\n  analytics.country_region_map\n  analytics.reference.product_categories   (schema override applied)\n  analytics.cost_center_codes\n\n$ dbt seed --full-refresh\n# Truncates existing seed tables and reloads from CSV\n# Use this when you change the CSV content`},
     after:'Seeds run in seconds — they are small tables. Run dbt seed as part of your CI pipeline so the reference tables are always current with whatever is committed in git.'},
    {step:3, title:'Reference Seeds in Models',
     explanation:`Use {{ ref() }} to join seeds in models, exactly like referencing another model. dbt tracks the dependency and ensures seeds are loaded before the model runs.`,
     code:`-- models/fct_orders.sql — join the country map seed

SELECT
    o.order_id,
    o.customer_id,
    o.order_total,
    o.order_date,
    c.country_code,
    cr.region,              -- from seed
    cr.sub_region,
    pc.category_name,       -- from seed
    pc.margin_target_pct

FROM {{ ref('stg_orders') }}          o
JOIN {{ ref('stg_customers') }}       c   USING (customer_id)

-- Join seeds with ref() — exactly the same as joining a model
LEFT JOIN {{ ref('country_region_map') }}  cr
    ON c.country_code = cr.country_code

LEFT JOIN {{ ref('product_categories') }}  pc
    ON o.category_id = pc.category_id`,
     simulatedOutput:{type:'text', content:`$ dbt run --select fct_orders\n\ndbt resolves the dependency graph:\n\n  country_region_map (seed)  ─┐\n                               ├─► fct_orders\n  product_categories (seed)  ─┤\n  stg_orders (model)          ─┤\n  stg_customers (model)       ─┘\n\nDbt ensures seeds are loaded before fct_orders runs.\n\nSample output (3 rows):\n  order_id  country  region    category      margin_target\n  10001     US       Americas  Laptops       0.25\n  10002     DE       EMEA      SaaS License  0.80\n  10003     JP       APAC      Cables        0.35`},
     after:'Seeds appear in the DAG just like models. You can add tests to seed columns in schema.yml (unique, not_null, accepted_values) — test your reference data the same way you test your models.'
    }
  ],
  challenge:{
    title:'Add a Seed with Tests',
    description:`Design a seed file called cost_center_codes.csv with columns: cc_code (4-digit string), cc_name, department, is_active (true/false). Write 5 sample rows. Then write the schema.yml entry for this seed with: a unique test on cc_code, a not_null test on cc_name, and an accepted_values test on department with values ['Engineering','Finance','Marketing','Operations','HR']. Then write the dbt seed command.`,
    hint:`Schema tests for seeds go in a schema.yml file inside the seeds/ directory. The structure is identical to model schema.yml but uses seeds: instead of models:.`,
    starterCode:`# seeds/cost_center_codes.csv
cc_code,cc_name,department,is_active
1001,Platform Engineering,Engineering,true
1002,Data & Analytics,Engineering,true
2001,FP&A,Finance,true
2002,Accounting,Finance,true
3001,Brand Marketing,Marketing,true

---

# seeds/schema.yml

version: 2

seeds:
  - name: cost_center_codes
    description: "Finance cost center reference table. One row per cost center."
    columns:
      - name: cc_code
        description: "4-digit cost center code. Primary key."
        tests:
          -
          -
      - name: cc_name
        description: "Human-readable cost center name."
        tests:
          -
      - name: department
        description: "Parent department."
        tests:
          - accepted_values:
              values: [              ]

# Command to load:
# $`,
    solution:`# seeds/cost_center_codes.csv
cc_code,cc_name,department,is_active
1001,Platform Engineering,Engineering,true
1002,Data & Analytics,Engineering,true
2001,FP&A,Finance,true
2002,Accounting,Finance,true
3001,Brand Marketing,Marketing,true

---

# seeds/schema.yml
version: 2

seeds:
  - name: cost_center_codes
    description: "Finance cost center reference. One row per cost center."
    columns:
      - name: cc_code
        description: "4-digit cost center code. Primary key."
        tests:
          - unique
          - not_null
      - name: cc_name
        description: "Human-readable cost center name."
        tests:
          - not_null
      - name: department
        description: "Parent department. See accepted values."
        tests:
          - accepted_values:
              values: ['Engineering','Finance','Marketing','Operations','HR']

# Load command:
# $ dbt seed --select cost_center_codes`,
    explanation:`Seeds support the same schema.yml test syntax as models. Running dbt test after dbt seed validates that the CSV data itself is correct — no duplicate cc_codes, no missing names, no rogue department values. This is the governance benefit of seeds over shared spreadsheets: the tests fail loudly in CI before anyone merges bad reference data.`,
    successMessage:`Seeds mastered! CSV reference tables + version control + schema tests is the pattern that eliminates the "which spreadsheet is the source of truth?" problem across every data team that adopts it.`
  },
  insight:`Seeds solve a specific but very common problem: small, hand-curated reference tables that every company has but nobody manages consistently. Before seeds, these lived in Confluence tables, shared Sheets, or worse — hard-coded CASE WHEN statements inside SQL models. With seeds, they are versioned, tested, and deployed identically to production code. This is one of the first dbt features senior engineers reach for when inheriting a messy data pipeline.`
},

/* ── INTERMEDIATE 3 ─────────────────────────────────── */
{
  id:'dbt-inter-3', language:'dbt', level:'intermediate', order:8,
  title:'Jinja & Macros — Reusable SQL Logic',
  duration:'28 min', xp:175,
  scenario:{
    company:'Meridian Analytics', role:'Analytics Engineer',
    description:`You have the same fiscal-quarter calculation copy-pasted into 12 different models. When your company changed its fiscal year start from January to February, someone had to update all 12 files — and missed two. Jinja macros eliminate this: write the logic once, call it everywhere, change it in one place. You will build macros for fiscal quarter logic, dynamic column generation, and conditional filtering.`
  },
  objectives:[
    'Write a Jinja macro in the macros/ directory',
    'Call macros with {{ macro_name() }} in models',
    'Use Jinja variables, loops, and conditionals in SQL',
    'Pass arguments to macros for reusable parameterized logic'
  ],
  terminology:[
    {term:'{% macro %}',lang:'dbt',definition:'Jinja syntax to define a reusable SQL fragment. Macros live in .sql files in the macros/ directory and are available to all models.',example:'{% macro fiscal_quarter(date_col) %}\n  CASE WHEN ...\n{% endmacro %}'},
    {term:'{{ macro_name() }}',lang:'dbt',definition:'Jinja expression syntax to call (render) a macro. The macro body is inserted at this point in the compiled SQL.',example:"{{ fiscal_quarter('order_date') }}"},
    {term:'{% set %}',lang:'dbt',definition:'Jinja statement to assign a value to a variable. Variables can be strings, numbers, lists, or dicts.',example:"{% set metrics = ['revenue','orders','aov'] %}"},
    {term:'{% for %}',lang:'dbt',definition:'Jinja loop that iterates over a list or dict. Used to generate repetitive SQL patterns (UNION ALL, column lists, CASE expressions).',example:'{% for m in metrics %}\n  SUM({{ m }}) AS total_{{ m }}\n{% endfor %}'},
    {term:'var()',lang:'dbt',definition:'Reads a project-level variable defined in dbt_project.yml vars: block. Makes models configurable without code changes.',example:"{{ var('fiscal_year_start_month', 1) }}"}
  ],
  theory:`<h3>Jinja Templates in dbt</h3>
<p>dbt compiles every .sql file through the Jinja2 template engine before sending it to the warehouse. This means you can use variables, loops, and functions to programmatically generate SQL. The compiled SQL is what actually runs — you can see it with <code>dbt compile</code>.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>{{ expression }}  → outputs the value (renders)\n{% statement %}   → executes logic (no output)\n{# comment #}     → Jinja comment (removed from compiled SQL)</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Run dbt compile --select my_model to see the final SQL that dbt sends to the warehouse after all Jinja is resolved. This is invaluable for debugging macros — you can verify the generated SQL before running it.</div></div>`,
  steps:[
    {step:1, title:'Write Your First Macro',
     explanation:`Create a macro in the macros/ directory. It is available project-wide once saved — no imports needed.`,
     code:`-- macros/fiscal_quarter.sql

{% macro fiscal_quarter(date_col, start_month=1) %}

  {# Compute fiscal quarter based on configurable fiscal year start #}
  CASE
    {% for q in range(1, 5) %}
      WHEN EXTRACT(MONTH FROM {{ date_col }})
           BETWEEN {{ (start_month + (q-1)*3 - 1) % 12 + 1 }}
               AND {{ (start_month + q*3 - 2) % 12 + 1 }}
      THEN 'Q' || {{ q }}
    {% endfor %}
  END

{% endmacro %}

-- Simpler, readable version for a Feb fiscal year start:
{% macro fiscal_quarter_feb(date_col) %}
  CASE
    WHEN EXTRACT(MONTH FROM {{ date_col }}) IN (2,3,4)  THEN 'Q1'
    WHEN EXTRACT(MONTH FROM {{ date_col }}) IN (5,6,7)  THEN 'Q2'
    WHEN EXTRACT(MONTH FROM {{ date_col }}) IN (8,9,10) THEN 'Q3'
    ELSE 'Q4'
  END
{% endmacro %}`,
     simulatedOutput:{type:'text', content:`-- Compiled output when called as {{ fiscal_quarter_feb('order_date') }}:\n\nCASE\n  WHEN EXTRACT(MONTH FROM order_date) IN (2,3,4)  THEN 'Q1'\n  WHEN EXTRACT(MONTH FROM order_date) IN (5,6,7)  THEN 'Q2'\n  WHEN EXTRACT(MONTH FROM order_date) IN (8,9,10) THEN 'Q3'\n  ELSE 'Q4'\nEND\n\n-- Usage in a model:\nSELECT\n    order_id,\n    order_date,\n    {{ fiscal_quarter_feb('order_date') }} AS fiscal_quarter,\n    order_total\nFROM {{ ref('stg_orders') }}`},
     note:'Macros are pure Jinja — they generate SQL text, not execute anything. Always run dbt compile to verify the generated SQL looks correct before running dbt run.',
     after:'The macro is now available to every model in the project. When the fiscal year start changes, update one file — all 12 models that call it automatically get the new logic on next compile.'},
    {step:2, title:'Jinja Variables and Loops',
     explanation:`Use {% set %} and {% for %} to generate repetitive SQL dynamically. A common use case: pivot a list of metrics into individual columns without writing each one manually.`,
     code:`-- models/rpt_revenue_summary.sql
-- Dynamically generate SUM() columns for a list of metrics

{% set metrics = ['gross_revenue', 'net_revenue', 'refunds', 'fees'] %}

SELECT
    order_date::date        AS report_date,
    region,

{% for metric in metrics %}
    SUM(CASE WHEN metric_name = '{{ metric }}'
             THEN amount ELSE 0 END)  AS {{ metric }}
    {%- if not loop.last %},{%- endif %}
{% endfor %}

FROM {{ ref('int_order_metrics') }}
GROUP BY 1, 2`,
     simulatedOutput:{type:'text', content:`-- Compiled SQL (after Jinja resolution):\n\nSELECT\n    order_date::date   AS report_date,\n    region,\n    SUM(CASE WHEN metric_name = 'gross_revenue'\n             THEN amount ELSE 0 END)  AS gross_revenue,\n    SUM(CASE WHEN metric_name = 'net_revenue'\n             THEN amount ELSE 0 END)  AS net_revenue,\n    SUM(CASE WHEN metric_name = 'refunds'\n             THEN amount ELSE 0 END)  AS refunds,\n    SUM(CASE WHEN metric_name = 'fees'\n             THEN amount ELSE 0 END)  AS fees\n\nFROM analytics.int_order_metrics\nGROUP BY 1, 2\n\n-- Add 'discounts' to the metrics list → 5th column generated automatically`},
     note:'loop.last is a Jinja built-in — it is True on the final iteration. Using -{%- if not loop.last %},-{%- endif %} strips the trailing comma correctly from the last column.',
     after:'Adding a new metric just means adding its name to the {% set metrics %} list. No SQL to write, no comma to manage, no column to add in 12 different places.'},
    {step:3, title:'Project Variables with var()',
     explanation:`Define project-level configuration in dbt_project.yml vars: and read it in models with var(). This makes the project configurable without touching SQL files.`,
     code:`# dbt_project.yml

vars:
  fiscal_year_start_month: 2    # February fiscal year
  reporting_currency: 'USD'
  lookback_days: 90
  exclude_test_accounts: true

---

-- models/fct_orders.sql — reads project vars

SELECT
    order_id,
    order_total,
    order_total / fx.rate               AS order_total_{{ var('reporting_currency') }},
    {{ fiscal_quarter_feb('order_date') }} AS fiscal_quarter

FROM {{ ref('stg_orders') }}

LEFT JOIN {{ ref('stg_fx_rates') }} fx
    ON fx.currency = 'USD'

WHERE 1=1
  AND order_date >= CURRENT_DATE - INTERVAL '{{ var("lookback_days") }} days'

  {% if var('exclude_test_accounts') %}
  AND customer_id NOT IN (
    SELECT customer_id FROM {{ ref('seed_test_accounts') }}
  )
  {% endif %}`,
     simulatedOutput:{type:'text', content:`-- Compiled SQL with var() resolved:\n\nSELECT\n    order_id,\n    order_total,\n    order_total / fx.rate  AS order_total_USD,\n    CASE\n      WHEN EXTRACT(MONTH FROM order_date) IN (2,3,4)  THEN 'Q1'\n      ...\n    END                    AS fiscal_quarter\nFROM analytics.stg_orders\nLEFT JOIN analytics.stg_fx_rates fx ON fx.currency = 'USD'\nWHERE 1=1\n  AND order_date >= CURRENT_DATE - INTERVAL '90 days'\n  AND customer_id NOT IN (\n    SELECT customer_id FROM analytics.seed_test_accounts\n  )\n\n-- Override at runtime:\n$ dbt run --vars '{lookback_days: 30}'\n$ dbt run --vars '{exclude_test_accounts: false}'`},
     after:'Runtime variable overrides (--vars) let you test models with different configurations without editing files. CI pipelines can pass --vars to run tests in a "strict" mode, production in a "normal" mode.'
    }
  ],
  challenge:{
    title:'Write a cents_to_dollars Macro',
    description:`Write a macro called cents_to_dollars(column_name, decimal_places=2) that converts an integer cents column to a decimal dollars value using ROUND(column_name / 100.0, decimal_places). Then write a model snippet that uses it to convert amount_cents, discount_cents, and tax_cents columns. Show the compiled SQL output.`,
    hint:`The macro body is just ROUND({{ column_name }} / 100.0, {{ decimal_places }}). Call it as {{ cents_to_dollars('amount_cents') }} and {{ cents_to_dollars('discount_cents', 4) }}.`,
    starterCode:`-- macros/cents_to_dollars.sql

{% macro cents_to_dollars(column_name, decimal_places=2) %}

  ROUND(         /         ,         )

{% endmacro %}

---

-- models/fct_payments.sql

SELECT
    payment_id,
    {{ cents_to_dollars('amount_cents') }}    AS amount_dollars,
    {{ cents_to_dollars('discount_cents') }}  AS discount_dollars,
    {{ cents_to_dollars('tax_cents', 4) }}    AS tax_dollars

FROM {{ ref('stg_payments') }}

-- Expected compiled output:
-- SELECT
--     payment_id,
--     ROUND(amount_cents   / 100.0, 2) AS amount_dollars,
--     ROUND(discount_cents / 100.0, 2) AS discount_dollars,
--     ROUND(tax_cents      / 100.0, 4) AS tax_dollars
-- FROM analytics.stg_payments`,
    solution:`-- macros/cents_to_dollars.sql

{% macro cents_to_dollars(column_name, decimal_places=2) %}

  ROUND({{ column_name }} / 100.0, {{ decimal_places }})

{% endmacro %}

---

-- models/fct_payments.sql

SELECT
    payment_id,
    {{ cents_to_dollars('amount_cents') }}    AS amount_dollars,
    {{ cents_to_dollars('discount_cents') }}  AS discount_dollars,
    {{ cents_to_dollars('tax_cents', 4) }}    AS tax_dollars

FROM {{ ref('stg_payments') }}

-- Compiled output:
-- SELECT
--     payment_id,
--     ROUND(amount_cents   / 100.0, 2) AS amount_dollars,
--     ROUND(discount_cents / 100.0, 2) AS discount_dollars,
--     ROUND(tax_cents      / 100.0, 4) AS tax_dollars
-- FROM analytics.stg_payments`,
    explanation:`Default argument values (decimal_places=2) mean the macro works without specifying that argument in the common case, but can be overridden when more precision is needed. This is the standard macro pattern: sensible defaults with optional overrides. The macro is 3 lines; its value compounds with every model that calls it.`,
    successMessage:`Jinja macros mastered! Write once, call everywhere — macros are the mechanism that makes a dbt project maintainable as it scales from 10 models to 200. Every repeated SQL pattern is a macro waiting to be written.`
  },
  insight:`Jinja macros are what separate dbt from a simple SQL runner. The dbt-utils package — downloaded over 3 million times — is entirely macros: surrogate_key(), date_spine(), generate_series(), pivot(), and dozens more. Rather than reinventing these, experienced analytics engineers install dbt-utils and leverage the community's battle-tested macros. The intermediate skill is knowing how to write your own; the advanced skill is knowing when to reach for a package instead.`
},

/* ── INTERMEDIATE 4 ─────────────────────────────────── */
{
  id:'dbt-inter-4', language:'dbt', level:'intermediate', order:9,
  title:'Snapshots — Slowly Changing Dimensions with dbt',
  duration:'25 min', xp:165,
  scenario:{
    company:'Meridian Analytics', role:'Analytics Engineer',
    description:`Your customers table has a plan column. When a customer upgrades from Starter to Pro, the warehouse simply overwrites the old value — historical plan data is lost. Finance needs to see plan revenue by what plan the customer was on at transaction time, not their current plan. dbt Snapshots solve this by capturing a full history of changes as a Type-2 SCD table: every change creates a new row with valid_from and valid_to timestamps.`
  },
  objectives:[
    'Understand Type-2 Slowly Changing Dimensions (SCD2)',
    'Write a snapshot file in the snapshots/ directory',
    'Configure timestamp and check strategies',
    'Query snapshot history to get point-in-time attribute values'
  ],
  terminology:[
    {term:'Snapshot',lang:'dbt',definition:'A dbt feature that builds a Type-2 SCD history table. Each time dbt snapshot runs, changed rows get a new history record with dbt_valid_from and dbt_valid_to timestamps.',example:'dbt snapshot'},
    {term:'dbt_valid_from',lang:'dbt',definition:'A column added by dbt snapshot indicating when a particular version of a row became the current record.',example:'WHERE dbt_valid_from <= order_date\n  AND (dbt_valid_to > order_date OR dbt_valid_to IS NULL)'},
    {term:'dbt_valid_to',lang:'dbt',definition:'A column added by dbt snapshot. NULL means the row is the current (latest) version. A non-null value means the row has since been superseded.',example:'WHERE dbt_valid_to IS NULL  -- current records only'},
    {term:'strategy: timestamp',lang:'dbt',definition:'Snapshot detects changes by comparing the updated_at timestamp. Only rows with a newer updated_at are considered changed.',example:"strategy='timestamp', updated_at='updated_at'"},
    {term:'strategy: check',lang:'dbt',definition:'Snapshot detects changes by comparing specific column values. Use when the source table has no updated_at column.',example:"strategy='check', check_cols=['plan_name','status']"}
  ],
  theory:`<h3>The SCD2 Problem</h3>
<p>Without snapshots, your warehouse is a current-state system — you can answer "what plan is this customer on NOW?" but not "what plan were they on when they made this purchase?" Revenue attribution, cohort analysis, and churn analysis all require historical attribute values. Snapshots give you both.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>-- Current records only:\nWHERE dbt_valid_to IS NULL\n\n-- Record as of a specific date:\nWHERE dbt_valid_from <= '2024-03-15'\n  AND (dbt_valid_to > '2024-03-15' OR dbt_valid_to IS NULL)</code></div></div>`,
  steps:[
    {step:1, title:'Write a Snapshot File',
     explanation:`Snapshot files live in the snapshots/ directory and use a unique config block. dbt takes care of building and maintaining the SCD2 history table.`,
     code:`-- snapshots/customers_snapshot.sql

{% snapshot customers_snapshot %}

  {{
    config(
      target_schema = 'snapshots',
      unique_key    = 'customer_id',
      strategy      = 'timestamp',
      updated_at    = 'updated_at'
    )
  }}

  SELECT
      customer_id,
      customer_name,
      email,
      plan_name,
      plan_price_monthly,
      country_code,
      status,
      updated_at

  FROM {{ source('raw', 'customers') }}

{% endsnapshot %}`,
     simulatedOutput:{type:'text', content:`$ dbt snapshot\n\nRunning with dbt=1.8.0\nFound 1 snapshot\n\n--- First run ---\n14:00:01  Creating snapshot table: snapshots.customers_snapshot\n14:00:03  Inserted 12,450 rows (all current records)\n\nAdded columns:\n  dbt_scd_id       varchar  -- unique row identifier for this version\n  dbt_updated_at   timestamp\n  dbt_valid_from   timestamp  -- when this version became active\n  dbt_valid_to     timestamp  -- NULL = current record\n\n--- Second run (after 3 customers upgraded plans) ---\n14:30:01  Checking for changes since last snapshot...\n14:30:02  Detected 3 changed rows (updated_at advanced)\n14:30:02  Closing previous versions (setting dbt_valid_to)\n14:30:02  Inserting 3 new current records\n14:30:03  customers_snapshot: 12,453 rows (+3 history rows)`},
     note:'Snapshot files use {% snapshot name %} / {% endsnapshot %} instead of the usual SELECT. The config() block goes inside the snapshot, not at the top like a model.',
     after:'After the first snapshot, the table has 12,450 rows — one per customer, all current. After three plan changes, it has 12,453 rows: 12,447 unchanged + 3 old versions (closed) + 3 new current versions.'},
    {step:2, title:'Query Snapshot History',
     explanation:`Use dbt_valid_from and dbt_valid_to to retrieve point-in-time attribute values, enabling accurate historical analysis.`,
     code:`-- What plan was each customer on when they made their purchase?
-- Join snapshot at purchase time, not current time.

SELECT
    o.order_id,
    o.customer_id,
    o.order_date,
    o.order_total,
    cs.plan_name        AS plan_at_purchase,    -- historical value
    cs.plan_price_monthly,
    c_now.plan_name     AS current_plan         -- current value

FROM {{ ref('fct_orders') }}                            o

-- Historical attribute: which plan at the moment of purchase?
JOIN {{ ref('customers_snapshot') }}                    cs
    ON  cs.customer_id  = o.customer_id
    AND cs.dbt_valid_from <= o.order_date
    AND (cs.dbt_valid_to  >  o.order_date
         OR cs.dbt_valid_to IS NULL)

-- Current attribute: what plan are they on today?
JOIN (
    SELECT customer_id, plan_name
    FROM {{ ref('customers_snapshot') }}
    WHERE dbt_valid_to IS NULL          -- current records only
) c_now ON c_now.customer_id = o.customer_id`,
     simulatedOutput:{type:'dataframe', headers:['order_id','order_date','order_total','plan_at_purchase','current_plan'], rows:[['1001','2023-11-15','$299','starter','pro'],['1002','2024-01-08','$899','pro','enterprise'],['1003','2024-03-22','$149','starter','starter'],['1004','2023-09-01','$449','pro','pro']]},
     note:'Customer 1001 was on the Starter plan when they placed order 1001 but has since upgraded to Pro. Without the snapshot, both orders would incorrectly show "pro" as the plan.',
     after:'Point-in-time joins using dbt_valid_from / dbt_valid_to are the correct way to analyze "what was true at the time of this event?" — essential for revenue attribution, cohort analysis, and churn modeling.'},
    {step:3, title:'Check Strategy and Scheduling',
     explanation:`When the source has no updated_at column, use the check strategy to detect changes by comparing column values directly. Also understand how snapshot scheduling works.`,
     code:`-- snapshots/accounts_snapshot.sql — no updated_at available

{% snapshot accounts_snapshot %}

  {{
    config(
      target_schema = 'snapshots',
      unique_key    = 'account_id',
      strategy      = 'check',
      check_cols    = ['status', 'tier', 'mrr']   -- watch these columns
    )
  }}

  SELECT
      account_id,
      account_name,
      status,
      tier,
      mrr
  FROM {{ source('raw', 'accounts') }}

{% endsnapshot %}

# Scheduling recommendations:

# In Airflow DAG:
#   dbt snapshot  → daily at midnight
#   dbt run       → every 30 minutes (incremental models)

# In dbt Cloud (Job UI):
#   Snapshot job: schedule = "0 0 * * *"   (midnight daily)
#   Transform job: schedule = "*/30 * * * *" (every 30 min)

# Snapshots are separate from dbt run — they do NOT run
# automatically when you run dbt run or dbt build.`,
     simulatedOutput:{type:'text', content:`Check strategy behavior:\n\n  dbt compares check_cols in source vs current snapshot:\n    status: 'active' → 'active'   ← no change\n    tier:   'growth' → 'scale'    ← CHANGED\n    mrr:    2400     → 3200       ← CHANGED\n\n  Action: close existing row (set dbt_valid_to = now())\n          insert new row with new values + dbt_valid_from = now()\n\nNote: check strategy is slower than timestamp — it compares\nevery check_col for every row in the source on every run.\nUse timestamp when updated_at is available.`},
     after:'Run snapshots on a dedicated schedule (typically nightly) separate from your dbt run pipeline. The more frequently snapshots run, the finer the temporal resolution of your history — but cost increases proportionally.'
    }
  ],
  challenge:{
    title:'Write a Product Pricing Snapshot',
    description:`Write a snapshot called product_prices_snapshot that tracks price changes in a products source table (columns: product_id, product_name, price, category, updated_at). Use the timestamp strategy. Then write a query that shows, for each order in fct_orders, the price of the product at the time the order was placed vs the current price.`,
    hint:`Join the snapshot on product_id AND dbt_valid_from <= order_date AND (dbt_valid_to > order_date OR dbt_valid_to IS NULL). Join it a second time WHERE dbt_valid_to IS NULL for current prices.`,
    starterCode:`-- snapshots/product_prices_snapshot.sql

{% snapshot product_prices_snapshot %}

  {{
    config(
      target_schema =       ,
      unique_key    =       ,
      strategy      =       ,
      updated_at    =       
    )
  }}

  SELECT product_id, product_name, price, category, updated_at
  FROM {{ source('raw', 'products') }}

{% endsnapshot %}

---

-- Query: price at order time vs current price

SELECT
    o.order_id,
    o.product_id,
    o.order_date,
    hist.price     AS price_at_order_time,
    curr.price     AS current_price,
    curr.price - hist.price AS price_change

FROM {{ ref('fct_orders') }} o

JOIN {{ ref('product_prices_snapshot') }} hist
    ON hist.product_id = o.product_id
    AND
    AND (                                    OR hist.dbt_valid_to IS NULL)

JOIN {{ ref('product_prices_snapshot') }} curr
    ON curr.product_id = o.product_id
    AND`,
    solution:`-- snapshots/product_prices_snapshot.sql

{% snapshot product_prices_snapshot %}

  {{
    config(
      target_schema = 'snapshots',
      unique_key    = 'product_id',
      strategy      = 'timestamp',
      updated_at    = 'updated_at'
    )
  }}

  SELECT product_id, product_name, price, category, updated_at
  FROM {{ source('raw', 'products') }}

{% endsnapshot %}

---

SELECT
    o.order_id,
    o.product_id,
    o.order_date,
    hist.price     AS price_at_order_time,
    curr.price     AS current_price,
    curr.price - hist.price AS price_change

FROM {{ ref('fct_orders') }} o

JOIN {{ ref('product_prices_snapshot') }} hist
    ON  hist.product_id   = o.product_id
    AND hist.dbt_valid_from <= o.order_date
    AND (hist.dbt_valid_to  >  o.order_date OR hist.dbt_valid_to IS NULL)

JOIN {{ ref('product_prices_snapshot') }} curr
    ON  curr.product_id   = o.product_id
    AND curr.dbt_valid_to IS NULL`,
    explanation:`Two joins to the same snapshot table — one for historical (point-in-time) and one for current (dbt_valid_to IS NULL) — is the canonical SCD2 query pattern. This reveals price changes between order time and now, enabling price elasticity analysis and customer communication about pricing differences.`,
    successMessage:`Snapshots mastered! The SCD2 pattern via dbt snapshot is used in every data warehouse that needs to answer historical "what was true then?" questions — the foundation of cohort analysis, revenue attribution, and churn modeling.`
  },
  insight:`Slowly changing dimensions are one of the oldest concepts in data warehousing (Ralph Kimball, 1996). Before dbt, implementing SCD2 required complex stored procedures or ETL tool configurations. dbt compress what once took a week to build into a 20-line snapshot file and one command. The dbt_valid_from / dbt_valid_to pattern is understood by every data engineer and analyst — making your snapshot tables immediately usable by anyone familiar with dimensional modeling.`
},

/* ── INTERMEDIATE 5 ─────────────────────────────────── */
{
  id:'dbt-inter-5', language:'dbt', level:'intermediate', order:10,
  title:'Packages — dbt-utils, dbt-expectations & Package Management',
  duration:'20 min', xp:145,
  scenario:{
    company:'Meridian Analytics', role:'Analytics Engineer',
    description:`You need a surrogate key hash, a date spine for gap-free time series, and column-level statistical tests (standard deviation, row count bounds). Building all of these from scratch would take days. The dbt package ecosystem has battle-tested implementations used by thousands of teams — install them in 5 minutes with packages.yml and hub.getdbt.com.`
  },
  objectives:[
    'Add packages to packages.yml and run dbt deps',
    'Use dbt-utils macros: generate_surrogate_key, date_spine, pivot',
    'Add dbt-expectations tests for advanced data quality checks',
    'Understand package versioning and dependency management'
  ],
  terminology:[
    {term:'packages.yml',lang:'dbt',definition:'Project-level file that declares package dependencies. Run dbt deps to install them into dbt_packages/ directory.',example:'packages:\n  - package: dbt-labs/dbt_utils\n    version: 1.3.0'},
    {term:'dbt deps',lang:'dbt',definition:'Downloads and installs all packages listed in packages.yml. Must re-run whenever packages.yml changes.',example:'dbt deps'},
    {term:'dbt-utils',lang:'dbt',definition:'The official dbt Labs utility package. Provides macros like generate_surrogate_key, date_spine, pivot, star, and many others.',example:"{{ dbt_utils.generate_surrogate_key(['order_id','line_id']) }}"},
    {term:'dbt-expectations',lang:'dbt',definition:'A port of the Great Expectations data quality library to dbt. Provides statistical and distribution-based schema tests.',example:'- dbt_expectations.expect_column_values_to_be_between:\n    min_value: 0\n    max_value: 1000000'},
    {term:'generate_surrogate_key()',lang:'dbt',definition:'A dbt-utils macro that hashes a list of columns into a consistent MD5/SHA surrogate key. Replaces manual CONCAT + MD5 patterns.',example:"{{ dbt_utils.generate_surrogate_key(['order_id','line_id']) }}"}
  ],
  theory:`<h3>The dbt Package Ecosystem</h3>
<p>dbt packages are collections of macros, models, and tests published to hub.getdbt.com (the official registry) or installable directly from GitHub. The most important packages:</p>
<ul>
<li><strong>dbt-utils</strong> — utility macros and generic tests (dbt Labs, official)</li>
<li><strong>dbt-expectations</strong> — statistical data quality tests</li>
<li><strong>dbt-date</strong> — date dimension and date math utilities</li>
<li><strong>dbt-audit-helper</strong> — compare model output before/after refactors</li>
</ul>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Add dbt_packages/ to your .gitignore — installed packages should not be committed to your repo, just like node_modules in JavaScript. Packages are re-installed from packages.yml in every CI environment.</div></div>`,
  steps:[
    {step:1, title:'Install Packages with packages.yml',
     explanation:`Create packages.yml at the project root, declare your dependencies, and run dbt deps to download them.`,
     code:`# packages.yml (project root, same level as dbt_project.yml)

packages:
  - package: dbt-labs/dbt_utils
    version: 1.3.0

  - package: calogica/dbt_expectations
    version: 0.10.4

  - package: calogica/dbt_date
    version: 0.10.1

  # Install from GitHub (for unreleased versions):
  # - git: "https://github.com/dbt-labs/dbt-utils.git"
  #   revision: main

# .gitignore — add these lines:
# dbt_packages/
# target/

# Install command:
# $ dbt deps`,
     simulatedOutput:{type:'text', content:`$ dbt deps\n\nInstalling dbt-labs/dbt_utils@1.3.0\n  Installed from version 1.3.0\n  Up to date!\n\nInstalling calogica/dbt_expectations@0.10.4\n  Installed from version 0.10.4\n  Up to date!\n\nInstalling calogica/dbt_date@0.10.1\n  Installed from version 0.10.1\n  Up to date!\n\nInstalled 3 packages in 4.2 seconds\n\ndbt_packages/\n  dbt_utils/          ← macros now available: {{ dbt_utils.* }}\n  dbt_expectations/   ← tests now available in schema.yml\n  dbt_date/           ← macros now available: {{ dbt_date.* }}`},
     note:'Pin exact versions (version: 1.3.0) not ranges — this prevents unexpected package upgrades from breaking your production pipeline during a routine dbt deps run.',
     after:'After dbt deps, all package macros are available immediately — no imports needed. Reference them with the package namespace: {{ dbt_utils.macro_name() }}.'},
    {step:2, title:'Use dbt-utils Macros',
     explanation:`Apply the most commonly used dbt-utils macros: generate_surrogate_key for primary keys and date_spine for gap-free time series.`,
     code:`-- models/fct_order_items.sql
-- generate_surrogate_key creates a consistent MD5 hash PK

SELECT

    -- Surrogate key from composite natural key
    {{ dbt_utils.generate_surrogate_key(['order_id', 'line_item_id']) }}
                                        AS order_item_sk,

    order_id,
    line_item_id,
    product_id,
    quantity,
    unit_price,
    quantity * unit_price               AS line_total

FROM {{ ref('stg_order_items') }}

---

-- models/dim_date_spine.sql
-- date_spine generates one row per day — no missing dates

{{
  dbt_utils.date_spine(
    datepart = "day",
    start_date = "cast('2020-01-01' as date)",
    end_date = "cast('2030-12-31' as date)"
  )
}}`,
     simulatedOutput:{type:'text', content:`-- generate_surrogate_key compiled output:\nMD5(CAST(order_id AS VARCHAR) || '-' || CAST(line_item_id AS VARCHAR))\n\n-- Result:\n  order_id=1001, line_item_id=1  →  sk='a1b2c3d4e5f6...'\n  order_id=1001, line_item_id=2  →  sk='f6e5d4c3b2a1...'\n\n-- date_spine output (3 sample rows):\n  date_day\n  2020-01-01\n  2020-01-02\n  2020-01-03\n  ... (3,652 rows through 2030-12-31)\n\n-- Use date_spine to ensure zero-gap revenue reports:\nSELECT\n    d.date_day,\n    COALESCE(SUM(o.order_total), 0) AS daily_revenue\nFROM dim_date_spine d\nLEFT JOIN fct_orders o ON o.order_date = d.date_day\nGROUP BY 1`},
     after:'generate_surrogate_key is the standard way to create surrogate PKs for fact tables in dbt. date_spine eliminates NULL-date gaps in time series reports — a LEFT JOIN from dates to facts ensures every day appears even with zero orders.'},
    {step:3, title:'Add dbt-expectations Statistical Tests',
     explanation:`dbt-expectations provides tests beyond the four built-in ones. Use them to validate distributions, ranges, and row counts — not just null/unique.`,
     code:`# models/schema.yml — dbt-expectations tests

models:
  - name: fct_orders
    columns:
      - name: order_total
        description: "Gross order revenue in USD."
        tests:
          - not_null
          # Value must be positive
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
              max_value: 100000
              strictly: true          # exclusive bounds

      - name: order_id
        tests:
          - unique
          - not_null

  - name: fct_orders
    tests:
      # Row count must be credible (no sudden data loss/explosion)
      - dbt_expectations.expect_table_row_count_to_be_between:
          min_value: 1000
          max_value: 10000000

      # Column count must not change unexpectedly
      - dbt_expectations.expect_table_column_count_to_equal:
          value: 12`,
     simulatedOutput:{type:'text', content:`$ dbt test --select fct_orders\n\n16:01:01  Running test expect_column_values_to_be_between (order_total)\n16:01:02  PASS: 0 rows where order_total <= 0 or > 100000\n\n16:01:03  Running test expect_table_row_count_to_be_between\n16:01:04  PASS: table has 284,392 rows (between 1,000 and 10,000,000)\n\n16:01:05  Running test expect_table_column_count_to_equal\n16:01:06  PASS: table has 12 columns\n\nAll 5 tests passed.\n\nOther useful dbt-expectations tests:\n  expect_column_mean_to_be_between     # average sanity check\n  expect_column_stdev_to_be_between    # variance sanity check\n  expect_column_proportion_of_unique_values_to_be_between\n  expect_column_most_common_value_in_set  # categorical sanity`},
     after:'Statistical tests catch data quality issues that null/unique tests miss: an order total of $0.01 passes not_null but fails a min_value: 1 test. Row count bounds catch silent upstream failures that delete data without raising errors.'
    }
  ],
  challenge:{
    title:'Configure a Full Package Stack',
    description:`Write a complete packages.yml with: dbt-labs/dbt_utils at version 1.3.0, calogica/dbt_expectations at 0.10.4. Then write a schema.yml test block for a model fct_revenue with tests: (1) expect_table_row_count_to_be_between with min 500 and max 5000000, (2) on column revenue expect_column_values_to_be_between with min_value 0 strictly true, (3) on column revenue a not_null test. List the two commands needed to install packages and run only tests on fct_revenue.`,
    hint:`packages.yml goes at the project root. Schema model-level tests go under tests: at the model level; column tests go under columns: then tests:. Commands: dbt deps, dbt test --select fct_revenue.`,
    starterCode:`# packages.yml

packages:
  - package:
    version:
  - package:
    version:

---

# models/schema.yml

version: 2

models:
  - name: fct_revenue
    tests:
      - dbt_expectations.expect_table_row_count_to_be_between:
          min_value:
          max_value:

    columns:
      - name: revenue
        tests:
          -
          - dbt_expectations.expect_column_values_to_be_between:
              min_value:
              strictly:

# Commands:
# $ ___
# $ ___`,
    solution:`# packages.yml

packages:
  - package: dbt-labs/dbt_utils
    version: 1.3.0
  - package: calogica/dbt_expectations
    version: 0.10.4

---

# models/schema.yml

version: 2

models:
  - name: fct_revenue
    tests:
      - dbt_expectations.expect_table_row_count_to_be_between:
          min_value: 500
          max_value: 5000000

    columns:
      - name: revenue
        tests:
          - not_null
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
              strictly: true

# Commands:
# $ dbt deps
# $ dbt test --select fct_revenue`,
    explanation:`Package installation (dbt deps) is a one-time setup step and must be re-run whenever packages.yml changes or in a fresh CI environment. Tests run separately from models — dbt test targets the already-materialized table. Combining row-count bounds with column-value bounds catches two different failure modes: silent upstream data loss and corrupted values.`,
    successMessage:`Package management mastered! dbt deps + packages.yml is the mechanism that lets your team stand on the shoulders of thousands of analytics engineers who built and tested these utilities before you.`
  },
  insight:`The dbt-utils package has been downloaded over 50 million times and is installed in the majority of production dbt projects worldwide. generate_surrogate_key alone replaces dozens of hand-written CONCAT(MD5(...)) patterns that teams historically maintained inconsistently. dbt-expectations brings the cultural norm of "test your data statistically, not just for nulls" — a practice borrowed from software engineering that data teams are only now widely adopting. Installing these two packages in a new dbt project is considered table stakes for senior analytics engineers.`
}
,

/* ── ADVANCED 1 ─────────────────────────────────────── */
{
  id:'dbt-adv-1', language:'dbt', level:'advanced', order:11,
  title:'Multi-Environment Deployments — vars, env_var & Targets',
  duration:'28 min', xp:190,
  scenario:{
    company:'Meridian Analytics', role:'Senior Analytics Engineer',
    description:`Your dbt project runs in three environments: dev (each engineer's personal schema), staging (shared QA validation), and production (the warehouse analysts query). Right now the same code runs everywhere but reads from the same source tables and writes to the same schema. You need isolation: dev runs should never touch prod data, CI should validate against a staging snapshot, and prod should read from the certified sources. You will build this with targets and environment variables.`
  },
  objectives:[
    'Define dev/staging/prod targets in profiles.yml',
    'Use env_var() to inject secrets and environment-specific values',
    'Use var() and target.name for environment-conditional logic',
    'Write environment-aware source and model configurations'
  ],
  terminology:[
    {term:'target',lang:'dbt',definition:'A named connection profile in profiles.yml. dbt run uses the default target; override with --target prod or --target staging.',example:'dbt run --target prod\ndbt run --target staging --select +fct_orders'},
    {term:'target.name',lang:'dbt',definition:'A Jinja variable that returns the current target name ("dev","staging","prod"). Use in config() blocks for environment-conditional behavior.',example:"{% if target.name == 'prod' %}\n  {{ config(materialized='table') }}\n{% else %}\n  {{ config(materialized='view') }}\n{% endif %}"},
    {term:'env_var()',lang:'dbt',definition:'Reads a value from an environment variable at compile time. Used for secrets (passwords, tokens) and environment-specific config that should not be in code.',example:"env_var('DBT_WAREHOUSE_SCHEMA', 'dev_analytics')"},
    {term:'profiles.yml',lang:'dbt',definition:'The local configuration file (in ~/.dbt/) that stores warehouse connection details for each target. Not committed to git — secrets live here.',example:'my_project:\n  target: dev\n  outputs:\n    dev: {schema: dev_alice, ...}\n    prod: {schema: analytics, ...}'},
    {term:'generate_schema_name',lang:'dbt',definition:'An overridable macro that controls how dbt generates schema names. Override it to enforce naming conventions (e.g., dev_username_modelschema).',example:'-- macros/generate_schema_name.sql\n{% macro generate_schema_name(custom_schema_name, node) %}'}
  ],
  theory:`<h3>The Three-Environment Pattern</h3>
<p>Every mature dbt project has three environments that match the software development lifecycle:</p>
<ul>
<li><code>dev</code> — Engineer's personal schema. Fast iteration, no impact on analysts.</li>
<li><code>staging</code> — Shared validation environment. CI runs here against a recent data snapshot.</li>
<li><code>prod</code> — The live warehouse all analysts query. Only merged/approved code runs here.</li>
</ul>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>The core rule: <strong>never hard-code schema names, database names, or credentials in model SQL</strong>. Everything environment-specific goes in profiles.yml (connection) or env_var() (secrets). This makes the same code deployable to any environment without modification.</div></div>`,
  steps:[
    {step:1, title:'Configure Multi-Target profiles.yml',
     explanation:`profiles.yml defines how dbt connects to each environment. It lives in ~/.dbt/ on every developer's machine and is populated by CI secrets in the pipeline.`,
     code:`# ~/.dbt/profiles.yml  (NEVER commit to git)

meridian:
  target: dev          # default target for local development

  outputs:

    dev:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: transformer_dev
      database: MERIDIAN_DEV
      warehouse: COMPUTE_WH_DEV
      schema: "dev_{{ env_var('DBT_USER', 'analyst') }}"
      threads: 4

    staging:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: ci_runner
      private_key_path: "{{ env_var('SNOWFLAKE_PRIVATE_KEY_PATH') }}"
      role: transformer_ci
      database: MERIDIAN_STAGING
      warehouse: COMPUTE_WH_CI
      schema: ci_staging
      threads: 8

    prod:
      type: snowflake
      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"
      user: dbt_prod
      private_key_path: "{{ env_var('SNOWFLAKE_PRIVATE_KEY_PATH') }}"
      role: transformer_prod
      database: MERIDIAN_PROD
      warehouse: COMPUTE_WH_PROD
      schema: analytics
      threads: 16`,
     simulatedOutput:{type:'text', content:`# Environment isolation result:\n\n  Target    Database         Schema\n  -------   --------------   --------------------------\n  dev       MERIDIAN_DEV     dev_alice (per engineer)\n  staging   MERIDIAN_STAGING ci_staging\n  prod      MERIDIAN_PROD    analytics\n\n# Each target writes to a completely different database.\n# A dev run cannot accidentally overwrite prod tables.\n\n# Run commands:\n$ dbt run                       # uses default: dev\n$ dbt run --target staging      # CI pipeline\n$ dbt run --target prod         # production deployment\n\n# Check active target in any model:\n$ dbt compile --select fct_orders  # shows resolved SQL`},
     note:'Using a per-engineer schema (dev_alice, dev_bob) gives each developer total isolation. Schema collisions between team members are impossible.',
     after:'Each target is a completely separate database — a broken dev run has zero impact on the analytics schema that business users query.'},
    {step:2, title:'Environment-Conditional Model Config',
     explanation:`Use target.name inside config() to change materialization, tags, or behavior per environment. Dev gets views (cheap, instant rebuild); prod gets tables (performant, scheduled).`,
     code:`-- models/fct_orders.sql — environment-aware config

{{
  config(
    -- Views in dev (fast iteration), tables in prod/staging (performance)
    materialized = 'table' if target.name in ('prod', 'staging') else 'view',

    -- Only tag for orchestration monitoring in prod
    tags         = ['core', 'daily'] if target.name == 'prod' else ['dev'],

    -- Larger cluster in prod
    snowflake_warehouse = 'COMPUTE_WH_PROD' if target.name == 'prod'
                          else 'COMPUTE_WH_DEV'
  )
}}

SELECT
    order_id,
    customer_id,
    order_total,
    order_date

FROM {{ source('raw', 'orders') }}

-- Limit rows in dev to avoid full-table scans:
{% if target.name == 'dev' %}
  WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
{% endif %}`,
     simulatedOutput:{type:'text', content:`-- Dev run (target=dev):\nCREATE OR REPLACE VIEW dev_alice.fct_orders AS\nSELECT ...\nFROM MERIDIAN_DEV.raw.orders\nWHERE order_date >= CURRENT_DATE - INTERVAL '30 days'\n\n-- Prod run (target=prod):\nCREATE OR REPLACE TABLE analytics.fct_orders AS\nSELECT ...\nFROM MERIDIAN_PROD.raw.orders\n-- (no date filter — full table)\n\nDev query: 12,000 rows   →  runs in 3 seconds\nProd query: 28,000,000 rows → runs in 40 seconds`},
     note:'The dev row limit (30 days) dramatically speeds up developer iteration — models build in seconds instead of minutes. The prod run still processes all history on its full-refresh schedule.',
     after:'Environment-conditional logic is compile-time, not runtime — the IF statements resolve during dbt compile and produce clean SQL. The warehouse never sees the Jinja conditionals.'},
    {step:3, title:'Environment Variables and Secrets Management',
     explanation:`Use env_var() for secrets and env-specific values. Provide defaults for development, require values in production.`,
     code:`# dbt_project.yml — project-level vars per environment

vars:
  # Accessible in all models with {{ var('reporting_schema') }}
  reporting_schema: "{{ env_var('DBT_REPORTING_SCHEMA', 'analytics') }}"
  data_freshness_hours: "{{ env_var('MAX_FRESHNESS_HOURS', '24') }}"

---

-- models/sources.yml — environment-aware source config

version: 2

sources:
  - name: raw
    database: "{{ env_var('RAW_DATABASE', 'MERIDIAN_DEV') }}"
    schema: raw
    freshness:
      warn_after:
        count: "{{ var('data_freshness_hours') | int }}"
        period: hour
      error_after:
        count: 48
        period: hour
    tables:
      - name: orders
      - name: customers
      - name: events

---

# CI pipeline (GitHub Actions / GitLab CI):
# env:
#   SNOWFLAKE_ACCOUNT: \${{ secrets.SNOWFLAKE_ACCOUNT }}
#   SNOWFLAKE_PASSWORD: \${{ secrets.SNOWFLAKE_PASSWORD }}
#   RAW_DATABASE: MERIDIAN_STAGING
#   DBT_REPORTING_SCHEMA: ci_reporting
#   MAX_FRESHNESS_HOURS: 48`,
     simulatedOutput:{type:'text', content:`Environment variable resolution:\n\n  Variable               Dev (local)      CI (staging)       Prod\n  ────────────────────   ──────────────   ────────────────   ──────────────\n  RAW_DATABASE           MERIDIAN_DEV     MERIDIAN_STAGING   MERIDIAN_PROD\n  DBT_REPORTING_SCHEMA   analytics        ci_reporting       analytics\n  MAX_FRESHNESS_HOURS    24               48                 24\n  SNOWFLAKE_ACCOUNT      (shared)         (shared)           (shared)\n\nIf env_var has no default and the variable is not set:\n  → CompilationError: 'Required env var not set: SNOWFLAKE_ACCOUNT'\n\nAlways provide defaults for development;\nnever provide defaults for secrets in production.`},
     after:'The pattern: env_var() with a default is safe for non-secret config (a dev engineer gets a sensible default). env_var() without a default fails loudly if the secret is missing — which is the correct behavior in CI/prod.'
    }
  ],
  challenge:{
    title:'Write an Environment-Switching Source Config',
    description:`Write a sources.yml that defines a source named raw_data with the database resolved from env_var('SOURCE_DATABASE', 'DEV_DB'), and two tables: transactions and customers. Then write a model fct_transactions that: uses view materialization in dev and table in prod, adds WHERE transaction_date >= CURRENT_DATE - INTERVAL '7 days' in dev only, and selects transaction_id, customer_id, amount, transaction_date from the source.`,
    hint:`database: "{{ env_var('SOURCE_DATABASE', 'DEV_DB') }}" in sources.yml. materialized = 'table' if target.name == 'prod' else 'view' in config().`,
    starterCode:`# models/sources.yml

version: 2

sources:
  - name: raw_data
    database: "{{    }}"
    schema: raw
    tables:
      - name: transactions
      - name: customers

---

-- models/fct_transactions.sql

{{
  config(
    materialized = '    ' if target.name == 'prod' else '    '
  )
}}

SELECT
    transaction_id,
    customer_id,
    amount,
    transaction_date
FROM {{ source('raw_data', 'transactions') }}

{% if target.name ==      %}
  WHERE transaction_date >= CURRENT_DATE - INTERVAL '7 days'
{% endif %}`,
    solution:`# models/sources.yml

version: 2

sources:
  - name: raw_data
    database: "{{ env_var('SOURCE_DATABASE', 'DEV_DB') }}"
    schema: raw
    tables:
      - name: transactions
      - name: customers

---

-- models/fct_transactions.sql

{{
  config(
    materialized = 'table' if target.name == 'prod' else 'view'
  )
}}

SELECT
    transaction_id,
    customer_id,
    amount,
    transaction_date
FROM {{ source('raw_data', 'transactions') }}

{% if target.name == 'dev' %}
  WHERE transaction_date >= CURRENT_DATE - INTERVAL '7 days'
{% endif %}`,
    explanation:`The source database resolves from an environment variable — the same SQL file queries DEV_DB locally and PROD_DB in production with zero code changes. The materialization conditional means dev engineers iterate against views (cheap, instant) while the prod scheduler builds a persistent table that analysts query. These two patterns together are standard boilerplate in every well-structured dbt project.`,
    successMessage:`Multi-environment deployments mastered! target.name + env_var() is the two-function toolkit that makes the same dbt codebase safely deployable to dev, staging, and production without a single code change between environments.`
  },
  insight:`Environment isolation is the practice that separates professional data engineering from one-off SQL scripts. When a company first adopts dbt, engineers often run everything against production tables in a shared schema. Within months, a dev run by one engineer breaks a dashboard for an analyst. Proper target configuration — isolated databases, per-engineer schemas, CI-specific credentials — prevents this class of incident entirely. The patterns in this lesson are considered baseline requirements in any analytics engineering role at a company with more than two dbt users.`
},

/* ── ADVANCED 2 ─────────────────────────────────────── */
{
  id:'dbt-adv-2', language:'dbt', level:'advanced', order:12,
  title:'Exposures & the Metrics Layer — Documenting Downstream Usage',
  duration:'22 min', xp:170,
  scenario:{
    company:'Meridian Analytics', role:'Senior Analytics Engineer',
    description:`Your fct_orders model feeds a Looker dashboard, a Tableau workbook, and an API endpoint that powers the CEO's mobile app. When you refactor fct_orders, you have no way to know what breaks downstream. dbt Exposures solve this: you declare downstream consumers in YAML, they appear in the DAG, and impact analysis becomes explicit. You will also set up dbt's Semantic Layer to define reusable metric definitions that BI tools can query consistently.`
  },
  objectives:[
    'Define exposures in YAML to document downstream dashboard and API consumers',
    'View exposures in the DAG and use them in selector syntax',
    'Understand the dbt Semantic Layer and MetricFlow concepts',
    'Write a basic metric definition in metrics.yml'
  ],
  terminology:[
    {term:'Exposure',lang:'dbt',definition:'A YAML declaration of a downstream consumer of dbt models: a BI dashboard, a data science model, an API, or a reverse ETL feed.',example:'exposures:\n  - name: revenue_dashboard\n    type: dashboard\n    depends_on:\n      - ref(fct_orders)'},
    {term:'exposures/',lang:'dbt',definition:'The recommended directory for exposure YAML files. dbt automatically discovers exposure files throughout the models/ directory.',example:'models/\n  exposures/\n    bi_dashboards.yml\n    operational_feeds.yml'},
    {term:'MetricFlow',lang:'dbt',definition:'The query engine behind the dbt Semantic Layer. Translates metric definitions into warehouse-specific SQL, enabling consistent metric calculation across all BI tools.',example:'dbt sl query --metrics revenue --group-by metric_time__month'},
    {term:'semantic_models:',lang:'dbt',definition:'A YAML block that declares the entities, dimensions, and measures available from a dbt model for Semantic Layer queries.',example:'semantic_models:\n  - name: orders\n    model: ref(fct_orders)\n    measures:\n      - name: revenue\n        agg: sum'},
    {term:'metrics:',lang:'dbt',definition:'A YAML definition of a business metric on top of a semantic model. Includes the measure, filters, and time dimension. The source of truth for KPI definitions.',example:"metrics:\n  - name: monthly_revenue\n    label: 'Monthly Revenue'\n    type: simple\n    type_params:\n      measure: revenue"}
  ],
  theory:`<h3>The Downstream Visibility Problem</h3>
<p>In most data teams, the analytics engineer has no record of what queries or dashboards depend on a given dbt model. Refactoring that model means manually searching Looker/Tableau/code repositories. Exposures make this dependency explicit and visible in the DAG — so "what breaks if I change fct_orders?" has a definitive answer.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code># Find all models feeding a specific exposure:\ndbt ls --select +exposure:revenue_dashboard\n\n# Run all models that feed exposures tagged 'executive':\ndbt run --select +exposure:*</code></div></div>`,
  steps:[
    {step:1, title:'Declare Exposures in YAML',
     explanation:`Create exposure definitions that link downstream consumers to the dbt models they depend on. These appear as leaf nodes in the DAG.`,
     code:`# models/exposures/bi_dashboards.yml

version: 2

exposures:
  - name: executive_revenue_dashboard
    label: "Executive Revenue Dashboard"
    type: dashboard           # dashboard | notebook | analysis | ml | application
    maturity: high            # low | medium | high
    url: https://bi.meridian.com/dashboards/42
    description: >
      CEO-facing daily revenue dashboard. Displays MRR, YoY growth,
      and top-10 customers. Refreshes nightly at 2am UTC.
    depends_on:
      - ref('fct_orders')
      - ref('dim_customers')
      - ref('rpt_revenue_daily')
    owner:
      name: Sarah Chen
      email: sarah@meridian.com

  - name: churn_prediction_api
    label: "Churn Prediction API"
    type: application
    maturity: medium
    description: >
      REST API serving churn scores to the CRM. Reads
      fct_customer_features every 4 hours.
    depends_on:
      - ref('fct_customer_features')
      - ref('ml_churn_scores')
    owner:
      name: ML Platform Team
      email: ml-platform@meridian.com`,
     simulatedOutput:{type:'text', content:`$ dbt docs generate\n\nExposures registered in DAG:\n  executive_revenue_dashboard  (dashboard)\n    depends on: fct_orders, dim_customers, rpt_revenue_daily\n  churn_prediction_api          (application)\n    depends on: fct_customer_features, ml_churn_scores\n\nIn the docs site DAG view:\n  Exposures appear as outlined nodes at the far right\n  of the lineage graph — the final consumers of your data.\n\n$ dbt ls --select +exposure:executive_revenue_dashboard\nmeridian.stg_orders\nmeridian.stg_customers\nmeridian.fct_orders\nmeridian.dim_customers\nmeridian.rpt_revenue_daily\n  → exposure:executive_revenue_dashboard`},
     note:'The url: field links directly to the dashboard in the docs site. Team members navigating the DAG can click through to the live dashboard — closing the loop between data layer and presentation layer.',
     after:'Exposures answer "who is downstream?" with a YAML file instead of a Slack thread. When you refactor fct_orders, you know immediately which dashboards and APIs depend on it.'},
    {step:2, title:'Define Semantic Models and Metrics',
     explanation:`The dbt Semantic Layer separates metric definitions from BI tool configurations. Define once in dbt, query consistently from any tool.`,
     code:`# models/metrics.yml

semantic_models:
  - name: orders
    description: "Semantic model on top of fct_orders"
    model: ref('fct_orders')

    entities:
      - name: order
        type: primary
        expr: order_id
      - name: customer
        type: foreign
        expr: customer_id

    dimensions:
      - name: metric_time
        type: time
        type_params:
          time_granularity: day
        expr: order_date
      - name: region
        type: categorical
        expr: region
      - name: plan_name
        type: categorical
        expr: plan_name

    measures:
      - name: revenue
        agg: sum
        expr: order_total
        description: "Gross revenue in USD"
      - name: order_count
        agg: count_distinct
        expr: order_id

metrics:
  - name: monthly_revenue
    label: "Monthly Revenue"
    description: "Total gross revenue, aggregated by month"
    type: simple
    type_params:
      measure: revenue

  - name: revenue_growth_mom
    label: "Revenue Growth MoM"
    type: derived
    type_params:
      expr: (revenue - lag_revenue) / lag_revenue
      metrics:
        - name: revenue
        - name: revenue
          offset_window: 1 month
          alias: lag_revenue`,
     simulatedOutput:{type:'text', content:`# Query metrics from the command line:\n$ dbt sl query --metrics monthly_revenue --group-by metric_time__month\n\nmonth        monthly_revenue\n2024-01-01   $265,893\n2024-02-01   $282,104\n2024-03-01   $301,447\n...\n\n$ dbt sl query --metrics monthly_revenue,revenue_growth_mom \\\n  --group-by metric_time__month,region\n\nmonth        region    monthly_revenue  mom_growth\n2024-01-01   East      $98,450          +12.3%\n2024-01-01   West      $82,310          +8.7%\n...\n\n# Same metric, queried from Looker, Tableau, or Mode:\n# → identical SQL, identical result.`},
     after:'The Semantic Layer is the single source of truth for metric definitions. "Monthly revenue" means the same thing in the CEO dashboard, the analyst notebook, and the ML feature pipeline — because all three query the same metric definition.'},
    {step:3, title:'Impact Analysis with Exposures',
     explanation:`Combine exposures with dbt selectors to scope CI runs and understand the blast radius of any change.`,
     code:`# Impact analysis workflows using exposures

# 1. Find what feeds a specific dashboard (upstream of exposure)
dbt ls --select +exposure:executive_revenue_dashboard

# 2. Run only the models that feed executive dashboards
dbt run --select +exposure:executive_revenue_dashboard

# 3. Test only models used by high-maturity exposures
dbt test --select +exposure:executive_revenue_dashboard

# 4. Find all exposures downstream of a changed model
dbt ls --select fct_orders+

# 5. CI: if PR only changes staging models, only test their downstream
# In GitHub Actions:
# dbt build --select state:modified+    ← only changed + children
# dbt build --select +exposure:*        ← everything feeding any exposure

# 6. List all exposures in the project
dbt ls --resource-type exposure

# 7. Document who owns what
# owners.email in exposure YAML → appears in docs site
# → Slack the owner before breaking their dashboard`,
     simulatedOutput:{type:'text', content:`$ dbt ls --resource-type exposure\n\nmeridian.exposure.executive_revenue_dashboard  (dashboard)\nmeridian.exposure.churn_prediction_api          (application)\nmeridian.exposure.finance_tableau_workbook       (dashboard)\nmeridian.exposure.marketing_attribution_notebook (notebook)\n\n$ dbt ls --select fct_orders+\n\nmeridian.int_orders_enriched\nmeridian.rpt_revenue_daily\nmeridian.rpt_customer_ltv\nmeridian.exposure.executive_revenue_dashboard\nmeridian.exposure.finance_tableau_workbook\n\n→ Changing fct_orders affects 2 exposures.\n  Notify owners: sarah@meridian.com, finance@meridian.com`},
     after:'The selector fct_orders+ resolves all the way through to exposures — you see not just downstream dbt models but the actual dashboards and applications at risk. This makes the impact of any refactor explicit and auditable.'
    }
  ],
  challenge:{
    title:'Define a Revenue Exposure and Metric',
    description:`Write: (1) an exposure called daily_ops_dashboard of type dashboard, maturity medium, depending on ref(fct_orders) and ref(dim_customers), owned by ops-team@company.com, (2) a simple metric called total_orders that counts distinct order_id from the orders semantic model (assume the semantic model and order_count measure already exist). Then write the CLI commands to list all upstream models feeding the exposure and to query total_orders grouped by metric_time__week.`,
    hint:`exposures: - name: daily_ops_dashboard ... depends_on: - ref('fct_orders'). Metric type: simple, type_params: measure: order_count. Commands: dbt ls --select +exposure:daily_ops_dashboard and dbt sl query --metrics total_orders --group-by metric_time__week.`,
    starterCode:`# models/exposures/ops.yml

version: 2

exposures:
  - name:
    type:
    maturity:
    description: "Daily operations dashboard for the ops team."
    depends_on:
      -
      -
    owner:
      email:

---

# models/metrics.yml (append to existing file)

metrics:
  - name: total_orders
    label: "Total Orders"
    type:
    type_params:
      measure:

---

# CLI commands:
# $ dbt ls --select
# $ dbt sl query --metrics           --group-by`,
    solution:`# models/exposures/ops.yml

version: 2

exposures:
  - name: daily_ops_dashboard
    type: dashboard
    maturity: medium
    description: "Daily operations dashboard for the ops team."
    depends_on:
      - ref('fct_orders')
      - ref('dim_customers')
    owner:
      email: ops-team@company.com

---

# models/metrics.yml

metrics:
  - name: total_orders
    label: "Total Orders"
    type: simple
    type_params:
      measure: order_count

---

# CLI commands:
# $ dbt ls --select +exposure:daily_ops_dashboard
# $ dbt sl query --metrics total_orders --group-by metric_time__week`,
    explanation:`Exposures require only a name, type, depends_on, and owner — everything else is optional metadata. A simple metric wraps exactly one measure from a semantic model. The CLI commands demonstrate two key workflows: impact analysis (what upstream models feed this dashboard?) and metric querying (what does this metric look like over time?). Both workflows are available only because the exposure and metric are declared in YAML.`,
    successMessage:`Exposures and metrics mastered! Declaring downstream consumers transforms dbt from a SQL runner into a complete data platform — with visible lineage from raw source to executive dashboard and a governed, consistent definition of every business metric.`
  },
  insight:`Exposures were introduced in dbt 0.18.0 (2021) and remain underused by most teams — yet they solve one of the most frustrating data engineering problems: "I broke a dashboard and didn't know anything depended on that model." The dbt Semantic Layer (powered by MetricFlow, acquired 2022) is the architectural response to the "metric proliferation" problem: when every BI tool calculates revenue differently, no single number is trusted. Centralizing metric definitions in dbt is the emerging standard for data-mature companies and is supported natively by Looker, Tableau, Mode, and Hex.`
},

/* ── ADVANCED 3 ─────────────────────────────────────── */
{
  id:'dbt-adv-3', language:'dbt', level:'advanced', order:13,
  title:'CI/CD with GitHub Actions — Automated dbt Pipelines',
  duration:'30 min', xp:195,
  scenario:{
    company:'Meridian Analytics', role:'Senior Analytics Engineer',
    description:`Currently, any engineer can merge a PR that breaks a dbt model and nobody finds out until the 6am dashboard fails. You need a CI pipeline that automatically runs dbt build on every PR — compiling, testing, and validating against real data before a single line of code is merged. You will write a production-grade GitHub Actions workflow using slim CI (only testing changed models and their children) to keep run times under 5 minutes.`
  },
  objectives:[
    'Write a GitHub Actions workflow that runs dbt on pull requests',
    'Use dbt state: selectors (slim CI) to test only changed models',
    'Configure secrets for warehouse credentials in GitHub Actions',
    'Set up a production deployment job that runs on merge to main'
  ],
  terminology:[
    {term:'GitHub Actions',lang:'dbt',definition:'GitHub\'s built-in CI/CD platform. Workflows are defined in .github/workflows/*.yml and trigger on events like push, pull_request, and schedule.',example:'on:\n  pull_request:\n    branches: [main]'},
    {term:'slim CI',lang:'dbt',definition:'A dbt CI pattern that runs only models changed in the PR (state:modified) and their downstream dependents (+). Reduces CI time from hours to minutes.',example:'dbt build --select state:modified+'},
    {term:'state:modified',lang:'dbt',definition:'A dbt selector that identifies models that differ from a baseline state (a previous successful run artifact). Requires --state pointing to prior run artifacts.',example:'dbt ls --select state:modified --state ./prod-artifacts'},
    {term:'dbt build',lang:'dbt',definition:'Runs run + test + snapshot + seed in dependency order. The recommended command for CI pipelines — a single command that validates everything.',example:'dbt build --select state:modified+'},
    {term:'artifacts',lang:'dbt',definition:'JSON files generated by dbt runs (manifest.json, run_results.json, catalog.json) stored in target/. Used by state: selectors to detect changes.',example:'# Download prod manifest before CI run:\naws s3 cp s3://bucket/prod/manifest.json ./prod-artifacts/'}
  ],
  theory:`<h3>Why CI for dbt?</h3>
<p>Without CI, broken models are discovered when analysts notice wrong numbers — hours or days after the bad code was merged. A CI pipeline catches this in minutes, before merge. The key insight: <strong>you don't need to run all 200 models in CI</strong>. Slim CI uses dbt's state comparison to run only the models that changed and their downstream dependents — typically 1–10 models per PR instead of the full project.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>The slim CI workflow: download the prod manifest.json artifact → run dbt build --select state:modified+ --state ./prod-artifacts → only changed models + their children are compiled, run, and tested. A PR touching 2 models might only trigger 5 models total.</div></div>`,
  steps:[
    {step:1, title:'Write the Pull Request CI Workflow',
     explanation:`Create a GitHub Actions workflow that installs dbt, configures the warehouse connection, and runs slim CI on every pull request.`,
     code:`# .github/workflows/dbt_ci.yml

name: dbt CI

on:
  pull_request:
    branches: [main]
    paths:
      - 'models/**'
      - 'macros/**'
      - 'seeds/**'
      - 'snapshots/**'
      - 'dbt_project.yml'
      - 'packages.yml'

jobs:
  dbt-ci:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dbt
        run: |
          pip install dbt-snowflake==1.8.0

      - name: Write profiles.yml
        run: |
          mkdir -p ~/.dbt
          cat > ~/.dbt/profiles.yml << EOF
          meridian:
            target: ci
            outputs:
              ci:
                type: snowflake
                account: "\${{ secrets.SNOWFLAKE_ACCOUNT }}"
                user: ci_runner
                private_key: "\${{ secrets.SNOWFLAKE_PRIVATE_KEY }}"
                role: transformer_ci
                database: MERIDIAN_STAGING
                warehouse: COMPUTE_WH_CI
                schema: ci_pr_\${{ github.event.pull_request.number }}
                threads: 8
          EOF

      - name: Install dbt packages
        run: dbt deps

      - name: Download prod manifest (for slim CI)
        run: |
          aws s3 cp s3://meridian-dbt-artifacts/prod/manifest.json \
            ./prod-artifacts/manifest.json
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Run dbt build (slim CI — changed models only)
        run: |
          dbt build \\
            --select state:modified+ \\
            --state ./prod-artifacts \\
            --target ci`,
     simulatedOutput:{type:'text', content:`PR #47: Modified fct_orders.sql and stg_orders.sql\n\n--- GitHub Actions run ---\n\n✓  Checkout code              3s\n✓  Set up Python              12s\n✓  Install dbt-snowflake      45s\n✓  Write profiles.yml         1s\n✓  Install dbt packages       8s\n✓  Download prod manifest     2s\n\nRunning: dbt build --select state:modified+ --state ./prod-artifacts\n\nFound 2 modified models → 5 total (including 3 downstream):\n  stg_orders         (modified)\n  fct_orders         (modified)\n  int_orders_enriched (downstream child)\n  rpt_revenue_daily   (downstream child)\n  rpt_customer_ltv    (downstream child)\n\nRun:   5 models    [4m 12s]\nTest:  18 tests    [0m 48s]\n\n✓  All checks passed — PR is safe to merge`},
     note:'The schema for CI runs uses the PR number (ci_pr_47) — each PR gets a completely isolated schema. After merge, GitHub Actions can optionally drop the schema to save warehouse space.',
     after:'Slim CI brings run time from 45+ minutes (full project) to under 5 minutes per PR. Engineers get fast feedback and blocked merges for broken models — without waiting for the 6am dashboard failure.'},
    {step:2, title:'Production Deployment Workflow on Merge',
     explanation:`A separate workflow runs dbt build on all models when code is merged to main — this is the production deployment step.`,
     code:`# .github/workflows/dbt_prod.yml

name: dbt Production Deploy

on:
  push:
    branches: [main]

jobs:
  dbt-prod:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    environment: production       # requires manual approval if configured

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dbt
        run: pip install dbt-snowflake==1.8.0

      - name: Write prod profiles.yml
        run: |
          mkdir -p ~/.dbt
          cat > ~/.dbt/profiles.yml << EOF
          meridian:
            target: prod
            outputs:
              prod:
                type: snowflake
                account: "\${{ secrets.SNOWFLAKE_ACCOUNT }}"
                user: dbt_prod
                private_key: "\${{ secrets.SNOWFLAKE_PRIVATE_KEY_PROD }}"
                role: transformer_prod
                database: MERIDIAN_PROD
                warehouse: COMPUTE_WH_PROD
                schema: analytics
                threads: 16
          EOF

      - name: dbt deps
        run: dbt deps

      - name: dbt build — full production run
        run: dbt build --target prod

      - name: Upload artifacts to S3
        run: |
          aws s3 cp target/manifest.json \
            s3://meridian-dbt-artifacts/prod/manifest.json
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}`,
     simulatedOutput:{type:'text', content:`Merge to main → production deployment triggered\n\nRunning: dbt build --target prod\n\nFound 42 models, 8 seeds, 3 snapshots, 156 tests\n\n06:02:01  dbt seed      8 seeds     [0m 12s]\n06:02:13  dbt snapshot  3 snapshots [0m 08s]\n06:02:21  dbt run       42 models   [8m 44s]\n06:11:05  dbt test      156 tests   [2m 31s]\n\n✓  All 156 tests passed\n✓  42 models built\n\nUploading manifest.json → s3://meridian-dbt-artifacts/prod/\n  (used as baseline for next PR's slim CI)\n\nTotal: 11m 35s`},
     after:'The manifest.json uploaded to S3 after every successful prod run is the baseline that the next PR\'s slim CI compares against. This is the critical link — without it, state:modified cannot detect changes.'},
    {step:3, title:'Scheduled Runs and Alerting',
     explanation:`Add a nightly scheduled job for snapshots and full-refresh models, and configure Slack alerts on failure.`,
     code:`# .github/workflows/dbt_nightly.yml

name: dbt Nightly

on:
  schedule:
    - cron: '0 2 * * *'      # 2:00am UTC daily

jobs:
  nightly:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: '3.12'}

      - run: pip install dbt-snowflake==1.8.0

      - name: Write profiles (same as prod workflow)
        run: |
          mkdir -p ~/.dbt
          # ... (same as prod workflow above) ...

      - name: dbt deps
        run: dbt deps

      - name: Run snapshots
        run: dbt snapshot --target prod

      - name: Full refresh incremental models (weekly, Sundays)
        if: github.event.schedule == '0 2 * * 0'
        run: dbt run --full-refresh --select tag:incremental --target prod

      - name: Slack alert on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": ":red_circle: dbt nightly FAILED: \${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}"
            }
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}`,
     simulatedOutput:{type:'text', content:`Nightly job schedule:\n  2:00am UTC  → dbt snapshot (captures SCD2 changes)\n  2:05am UTC  → dbt run --full-refresh (Sundays only)\n\nSlack alert example:\n  🔴 dbt nightly FAILED\n  https://github.com/meridian/dbt/actions/runs/9841234\n\nRecommended job structure:\n  Job 1 (every 30 min): dbt run --select tag:incremental\n  Job 2 (nightly 2am):  dbt snapshot\n  Job 3 (nightly 3am):  dbt run (full project, non-incremental)\n  Job 4 (nightly 4am):  dbt test + dbt docs generate\n  Job 5 (weekly Sun):   dbt run --full-refresh --select tag:incremental`},
     after:'The full CI/CD pattern: PR → slim CI (5 min) → merge → prod deploy (12 min) → nightly snapshot + full-refresh (scheduled). Each stage catches a different class of failure.'
    }
  ],
  challenge:{
    title:'Write a Basic dbt CI Workflow',
    description:`Write a minimal GitHub Actions workflow file (.github/workflows/ci.yml) that: triggers on pull requests to main, runs on ubuntu-latest, installs dbt-snowflake==1.8.0, writes a profiles.yml using a secret called SNOWFLAKE_PASSWORD for a target named ci pointing to a Snowflake database STAGING_DB schema ci_test, runs dbt deps, then runs dbt build --select state:modified+ --state ./prod-artifacts. List where the prod manifest.json must come from for the --state flag to work.`,
    hint:`The profiles.yml is written with an echo or heredoc in a shell run step. The --state ./prod-artifacts directory must contain manifest.json downloaded from the previous successful prod run's artifact store.`,
    starterCode:`# .github/workflows/ci.yml

name: dbt CI

on:
  pull_request:
    branches: [    ]

jobs:
  ci:
    runs-on:

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dbt
        run: pip install dbt-snowflake==

      - name: Write profiles.yml
        run: |
          mkdir -p ~/.dbt
          cat > ~/.dbt/profiles.yml << EOF
          my_project:
            target: ci
            outputs:
              ci:
                type: snowflake
                account: "my_account"
                user: ci_user
                password: "\${{          }}"
                database: STAGING_DB
                schema: ci_test
                warehouse: CI_WH
                threads: 4
          EOF

      - name: dbt deps
        run:

      - name: Download prod artifacts
        run: |
          # Download manifest.json from _________ to ./prod-artifacts/

      - name: dbt build
        run: dbt build --select             --state`,
    solution:`# .github/workflows/ci.yml

name: dbt CI

on:
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dbt
        run: pip install dbt-snowflake==1.8.0

      - name: Write profiles.yml
        run: |
          mkdir -p ~/.dbt
          cat > ~/.dbt/profiles.yml << EOF
          my_project:
            target: ci
            outputs:
              ci:
                type: snowflake
                account: "my_account"
                user: ci_user
                password: "\${{ secrets.SNOWFLAKE_PASSWORD }}"
                database: STAGING_DB
                schema: ci_test
                warehouse: CI_WH
                threads: 4
          EOF

      - name: dbt deps
        run: dbt deps

      - name: Download prod artifacts
        run: |
          # Download manifest.json from S3/GCS/artifact store
          # e.g.: aws s3 cp s3://my-bucket/prod/manifest.json ./prod-artifacts/manifest.json
          mkdir -p ./prod-artifacts

      - name: dbt build
        run: dbt build --select state:modified+ --state ./prod-artifacts`,
    explanation:`The manifest.json must come from the most recent successful production run — typically stored in S3, GCS, or Azure Blob Storage after each prod deployment. Without it, dbt has no baseline to compare against and state:modified selects nothing. The CI schema (ci_test) is completely isolated from the prod schema (analytics) — CI builds and tests run in a sandbox that cannot affect production data.`,
    successMessage:`dbt CI/CD pipeline complete! PR-time validation with slim CI is the practice that makes dbt projects safe to scale to large teams — no more "who merged the model that broke the dashboard" postmortems.`
  },
  insight:`CI/CD for analytics was considered advanced practice as recently as 2021 — most teams ran dbt manually or on a simple cron schedule with no PR validation. In 2024, a dbt CI pipeline is considered table stakes for any team with more than 3 engineers or 50+ models. GitHub Actions is the most common host (free for public repos, reasonable pricing for private), but the same patterns apply to GitLab CI, Bitbucket Pipelines, and Jenkins. The slim CI pattern (state:modified+) was pioneered by the GitLab data team and is now the standard recommendation in the official dbt documentation.`
},

/* ── ADVANCED 4 ─────────────────────────────────────── */
{
  id:'dbt-adv-4', language:'dbt', level:'advanced', order:14,
  title:'Performance Tuning — Partitioning, Clustering & Materializations',
  duration:'28 min', xp:185,
  scenario:{
    company:'Meridian Analytics', role:'Senior Analytics Engineer',
    description:`Your largest fact table (500M rows) scans 100% of data for every query because there is no partitioning. Analysts wait 45 seconds for date-filtered queries that should return in 2 seconds. You need to apply BigQuery/Snowflake partitioning and clustering strategies, choose the right materialization for each model type, and use dbt's configuration layer to implement these optimizations without touching the warehouse directly.`
  },
  objectives:[
    'Configure BigQuery partitioning and clustering in dbt config',
    'Configure Snowflake clustering keys in dbt config',
    'Choose the right materialization: table, view, incremental, ephemeral',
    'Use dbt post-hooks to add indexes or statistics after model build'
  ],
  terminology:[
    {term:'partition_by',lang:'dbt',definition:'BigQuery config that partitions a table by a date/timestamp/integer column. Queries filtered on the partition column only scan relevant partitions.',example:"{{ config(partition_by={'field':'event_date','data_type':'date'}) }}"},
    {term:'cluster_by',lang:'dbt',definition:'BigQuery (and Snowflake equivalent) config that co-locates similar values of specified columns. Improves query performance for equality filters and GROUP BY on those columns.',example:"{{ config(cluster_by=['region','product_id']) }}"},
    {term:'transient_table',lang:'dbt',definition:'Snowflake-specific table type with no Fail-safe storage (lower storage cost). Good for staging models that are rebuilt daily from source.',example:"{{ config(transient=true) }}"},
    {term:'ephemeral',lang:'dbt',definition:'A dbt materialization that is not written to the warehouse at all — it is inlined as a CTE wherever it is referenced. No table, no view, no storage cost.',example:"{{ config(materialized='ephemeral') }}"},
    {term:'post_hook',lang:'dbt',definition:'A SQL statement that dbt runs immediately after building a model. Used for adding indexes, granting permissions, or running ANALYZE.',example:"{{ config(post_hook='GRANT SELECT ON {{ this }} TO ROLE reporter') }}"}
  ],
  theory:`<h3>Materialization Decision Tree</h3>
<ul>
<li><strong>view</strong> — No storage cost. Always fresh. Slow if the underlying query is complex. Use for simple logic, dev environments.</li>
<li><strong>table</strong> — Fast queries. Rebuilt fully on every run. Use for final fact/dimension tables.</li>
<li><strong>incremental</strong> — Fast queries, fast builds. Some complexity. Use for large tables that grow continuously.</li>
<li><strong>ephemeral</strong> — Zero storage. Inlined as CTE. Use for simple intermediate transformations that are only referenced once.</li>
</ul>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Partitioning is the single highest-leverage performance optimization for large tables. A 500M-row table partitioned by day costs the same as before but queries filtered to a single day scan only 1/365th of the data — a 365x performance improvement on typical date-range queries.</div></div>`,
  steps:[
    {step:1, title:'Configure BigQuery Partitioning and Clustering',
     explanation:`Add partition_by and cluster_by to the model config. dbt translates these into the correct CREATE TABLE statement for your warehouse.`,
     code:`-- models/fct_events.sql — BigQuery optimized

{{
  config(
    materialized  = 'incremental',
    unique_key    = 'event_id',

    -- Partition by event date: each day is its own physical partition
    partition_by  = {
      'field'              : 'event_date',
      'data_type'          : 'date',
      'granularity'        : 'day'      -- day | month | year
    },

    -- Cluster within each partition for fast equality filters
    cluster_by    = ['event_type', 'user_id'],

    -- Require partition filter in queries (prevents full scans)
    require_partition_filter = false     -- set true in prod for cost control
  )
}}

SELECT
    event_id,
    user_id,
    event_type,
    event_ts,
    event_ts::date        AS event_date,   -- the partition column
    session_id,
    properties

FROM {{ source('raw', 'events') }}

{% if is_incremental() %}
  WHERE event_ts > (SELECT MAX(event_ts) FROM {{ this }})
{% endif %}`,
     simulatedOutput:{type:'text', content:`$ dbt run --select fct_events\n\nCompiled CREATE TABLE statement (BigQuery):\n\nCREATE OR REPLACE TABLE \`meridian.analytics.fct_events\`\nPARTITION BY DATE(event_date)\nCLUSTER BY event_type, user_id\nAS (\n  SELECT ... FROM ...\n)\n\n--- Query performance comparison ---\n\nBEFORE (no partition):\n  SELECT COUNT(*) FROM fct_events\n  WHERE event_date = '2024-06-01'\n  → Scanned: 500M rows  |  Cost: $2.50  |  Time: 48s\n\nAFTER (partitioned by date, clustered by event_type):\n  SELECT COUNT(*) FROM fct_events\n  WHERE event_date = '2024-06-01'\n  AND event_type = 'purchase'\n  → Scanned: 1.4M rows  |  Cost: $0.01  |  Time: 1.2s`},
     note:'The partition column (event_date) must be in the SELECT. For incremental models, the WHERE clause on the source should also filter on the partition column to avoid scanning old partitions during incremental runs.',
     after:'Date partitioning reduces BigQuery costs proportionally to the date range queried. A query for a single day on a 3-year table scans 1/1095 of the data. Clustering within partitions adds a second layer of optimization for equality filters.'},
    {step:2, title:'Snowflake Clustering and Materialization Costs',
     explanation:`Snowflake clustering keys and transient tables reduce compute cost and storage cost for staging models that are rebuilt frequently.`,
     code:`-- models/staging/stg_orders.sql — Snowflake optimized

{{
  config(
    materialized = 'table',
    transient    = true,          -- no Fail-safe = lower storage cost
    cluster_by   = ['order_date_day', 'status']
                                  -- reclustering happens automatically
  )
}}

SELECT
    order_id,
    customer_id,
    status,
    order_total,
    created_at,
    created_at::date    AS order_date_day,
    _etl_loaded_at

FROM {{ source('raw', 'orders') }}

---

-- Materialization cost guide for Snowflake:

-- EPHEMERAL (CTE inline):
--   Storage cost: $0    Query cost: same as parent    Use: simple transforms
{{ config(materialized='ephemeral') }}

-- VIEW:
--   Storage cost: $0    Query cost: full computation    Use: dev, ad-hoc
{{ config(materialized='view') }}

-- TABLE (transient):
--   Storage cost: low   Query cost: low    Use: staging models, rebuilt daily
{{ config(materialized='table', transient=true) }}

-- TABLE (permanent):
--   Storage cost: standard   Query cost: low    Use: fact/dim tables
{{ config(materialized='table') }}

-- INCREMENTAL:
--   Storage cost: standard   Query cost: low    Build cost: very low
{{ config(materialized='incremental') }}`,
     simulatedOutput:{type:'text', content:`Snowflake materialization cost comparison (monthly, 100GB table):\n\n  Type            Storage    Build Compute   Query Time\n  ─────────────   ────────   ─────────────   ──────────\n  view            $0         $0 per build    30s (recomputes)\n  table           $23/mo     $4.50 per run   2s\n  transient table $11/mo     $4.50 per run   2s  (no Fail-safe)\n  incremental     $23/mo     $0.15 per run   2s  (only new rows)\n\nRecommended pattern:\n  Staging models    → transient table (rebuilt nightly, no history needed)\n  Intermediate      → ephemeral (if used once) or view (if reused)\n  Fact tables       → incremental (large, grows daily)\n  Dimension tables  → table (small-medium, full refresh weekly)`},
     after:'transient=true saves ~50% on Snowflake storage for staging models because Fail-safe (7-day recovery) is disabled. This is safe for staging models since they are always rebuilt from source.'},
    {step:3, title:'post_hook for Permissions and Indexes',
     explanation:`Use post_hook to run SQL immediately after a model builds — granting permissions, adding Postgres indexes, or running ANALYZE for query planner statistics.`,
     code:`-- Grant permissions automatically after every build

{{
  config(
    materialized = 'table',
    post_hook    = [
      "GRANT SELECT ON {{ this }} TO ROLE reporter",
      "GRANT SELECT ON {{ this }} TO ROLE analyst"
    ]
  )
}}

---

-- PostgreSQL: add index for frequently filtered column

{{
  config(
    materialized = 'table',
    post_hook    = [
      "CREATE INDEX IF NOT EXISTS idx_fct_orders_date
       ON {{ this }} (order_date)",
      "ANALYZE {{ this }}"
    ]
  )
}}

---

-- Conditional post_hook (prod only)

{{
  config(
    materialized = 'table',
    post_hook    = (
      "GRANT SELECT ON {{ this }} TO ROLE reporter"
      if target.name == 'prod'
      else []
    )
  )
}}`,
     simulatedOutput:{type:'text', content:`$ dbt run --select fct_orders --target prod\n\n18:01:04  Running model fct_orders\n18:01:04  CREATE OR REPLACE TABLE analytics.fct_orders ...\n18:05:22  fct_orders [OK created in 4m 18s]\n\n--- Post-hooks running ---\n18:05:22  Running post-hook: GRANT SELECT ON analytics.fct_orders\n          TO ROLE reporter\n18:05:23  ✓ reporter granted\n18:05:23  Running post-hook: GRANT SELECT ON analytics.fct_orders\n          TO ROLE analyst\n18:05:24  ✓ analyst granted\n\nPost-hooks complete. Model fully deployed and permissioned.`},
     after:'post_hook eliminates manual permission grants after each deploy — a common source of access control drift. Every time fct_orders is rebuilt, reporters and analysts automatically get SELECT access without an engineer running a separate GRANT statement.'
    }
  ],
  challenge:{
    title:'Optimize a Slow Fact Table',
    description:`Write the dbt config block for a BigQuery model fct_transactions (500M rows) that: uses incremental materialization with unique_key='transaction_id', partitions by transaction_date (date column, daily granularity), clusters by merchant_id and transaction_type, and adds a post_hook that grants SELECT to ROLE bi_reader. Then write the is_incremental() filter comparing transaction_ts to MAX(transaction_ts) from {{ this }}.`,
    hint:`partition_by is a dict with 'field', 'data_type', 'granularity'. cluster_by is a list. post_hook is a string or list of strings.`,
    starterCode:`-- models/fct_transactions.sql

{{
  config(
    materialized =      ,
    unique_key   =      ,
    partition_by = {
      'field'      :    ,
      'data_type'  :    ,
      'granularity':    
    },
    cluster_by   = [    ,    ],
    post_hook    =  "GRANT SELECT ON {{ this }} TO ROLE    "
  )
}}

SELECT
    transaction_id,
    merchant_id,
    transaction_type,
    amount,
    transaction_ts,
    transaction_ts::date  AS transaction_date

FROM {{ source('raw', 'transactions') }}

{% if is_incremental() %}
  WHERE transaction_ts > (
    SELECT COALESCE(    (        ), '1900-01-01')
    FROM {{ this }}
  )
{% endif %}`,
    solution:`-- models/fct_transactions.sql

{{
  config(
    materialized = 'incremental',
    unique_key   = 'transaction_id',
    partition_by = {
      'field'      : 'transaction_date',
      'data_type'  : 'date',
      'granularity': 'day'
    },
    cluster_by   = ['merchant_id', 'transaction_type'],
    post_hook    = "GRANT SELECT ON {{ this }} TO ROLE bi_reader"
  )
}}

SELECT
    transaction_id,
    merchant_id,
    transaction_type,
    amount,
    transaction_ts,
    transaction_ts::date  AS transaction_date

FROM {{ source('raw', 'transactions') }}

{% if is_incremental() %}
  WHERE transaction_ts > (
    SELECT COALESCE(MAX(transaction_ts), '1900-01-01')
    FROM {{ this }}
  )
{% endif %}`,
    explanation:`Combining incremental + partitioning + clustering creates a three-layer optimization: (1) incremental builds only process new rows, (2) partitioning ensures queries filtered by date scan only relevant partitions, (3) clustering within partitions accelerates merchant_id and transaction_type equality filters. Together these three reduce both build cost and query cost by an order of magnitude on a 500M-row table.`,
    successMessage:`Performance tuning mastered! incremental + partition_by + cluster_by is the optimization triad used in every production dbt project at scale. A single well-configured fact table can reduce warehouse costs by 80% compared to an unoptimized full-refresh view.`
  },
  insight:`Performance optimization is where analytics engineering meets data engineering. The configurations in this lesson are the same ones used in production at companies like Stripe, Shopify, and HubSpot — all of which have published their dbt architectures publicly. Partitioning and clustering are warehouse-specific features (BigQuery, Snowflake, Redshift each have different syntax) but the concepts are identical, and dbt's config abstraction means the same dbt model code generates the correct DDL for each warehouse automatically.`
},

/* ── ADVANCED 5 ─────────────────────────────────────── */
{
  id:'dbt-adv-5', language:'dbt', level:'advanced', order:15,
  title:'dbt Semantic Layer & MetricFlow — Governed Business Metrics',
  duration:'30 min', xp:200,
  scenario:{
    company:'Meridian Analytics', role:'Senior Analytics Engineer',
    description:`Finance calculates MRR one way in their Tableau workbook. Marketing calculates it differently in their Looker dashboard. The CEO's BI tool shows a third number. This "metric proliferation" destroys trust in data. The dbt Semantic Layer with MetricFlow solves this: define MRR once in YAML, and every BI tool — Looker, Tableau, Mode, Hex — queries the same definition, producing identical numbers. You will build the full semantic layer for a SaaS revenue model.`
  },
  objectives:[
    'Design a semantic model with entities, dimensions, and measures',
    'Define simple, ratio, cumulative, and derived metrics',
    'Query metrics with dbt sl query from the command line',
    'Connect the Semantic Layer to a BI tool via the JDBC API'
  ],
  terminology:[
    {term:'Semantic Model',lang:'dbt',definition:'A YAML definition that maps a dbt model to reusable entities, dimensions, and measures. The foundation that metrics are built on top of.',example:'semantic_models:\n  - name: subscriptions\n    model: ref(fct_subscriptions)'},
    {term:'Measure',lang:'dbt',definition:'An aggregatable numeric fact defined in a semantic model. Aggregations: sum, count, count_distinct, average, min, max.',example:"measures:\n  - name: mrr\n    agg: sum\n    expr: monthly_revenue"},
    {term:'Metric type: ratio',lang:'dbt',definition:'A metric defined as the ratio of two measures. MetricFlow computes numerator and denominator separately before dividing.',example:"type: ratio\ntype_params:\n  numerator: churned_mrr\n  denominator: total_mrr"},
    {term:'Metric type: cumulative',lang:'dbt',definition:'A metric that accumulates over a rolling window: running totals, rolling averages, or period-to-date calculations.',example:"type: cumulative\ntype_params:\n  measure: new_mrr\n  window: unbounded  -- all time"},
    {term:'dbt sl query',lang:'dbt',definition:'CLI command to query the Semantic Layer directly without writing SQL. Returns consistent, pre-governed metric values.',example:'dbt sl query --metrics mrr --group-by metric_time__month'}
  ],
  theory:`<h3>Why the Semantic Layer?</h3>
<p>The Semantic Layer separates <em>metric definition</em> from <em>metric presentation</em>. Without it, every dashboard engineer writes their own MRR SQL — with their own date handling, churn treatment, trial exclusions, and rounding. With it, MetricFlow generates the SQL from a single source of truth and every tool queries the same definition.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code># One definition:\nmetrics:\n  - name: mrr\n    type: simple\n    type_params: {measure: monthly_revenue}\n\n# Used identically from:\n  Looker: connect via Semantic Layer API\n  Tableau: connect via JDBC\n  Mode: SQL query → dbt sl query\n  Python: dbt_sl_sdk client</code></div></div>`,
  steps:[
    {step:1, title:'Build a Semantic Model',
     explanation:`Define the semantic model on top of your fact table — the entities analysts group by, the dimensions they filter on, and the measures they aggregate.`,
     code:`# models/semantic/subscriptions_semantic.yml

semantic_models:
  - name: subscriptions
    description: "Semantic model for SaaS subscription metrics"
    model: ref('fct_subscriptions')

    # Entities: the "nouns" analysts join and group by
    entities:
      - name: subscription
        type: primary
        expr: subscription_id
      - name: customer
        type: foreign
        expr: customer_id
      - name: account
        type: foreign
        expr: account_id

    # Dimensions: the "by what" for grouping and filtering
    dimensions:
      - name: metric_time
        type: time
        type_params:
          time_granularity: day
        expr: subscription_date

      - name: plan
        type: categorical
        expr: plan_name
        description: "Subscription plan: starter, pro, enterprise"

      - name: region
        type: categorical
        expr: billing_region

      - name: is_annual
        type: categorical
        expr: "CASE WHEN billing_period = 'annual' THEN 'true' ELSE 'false' END"

    # Measures: the "what" to aggregate
    measures:
      - name: mrr
        label: "Monthly Recurring Revenue"
        agg: sum
        expr: monthly_revenue
        description: "MRR in USD. Excludes credits and trials."

      - name: subscription_count
        agg: count_distinct
        expr: subscription_id

      - name: churned_mrr
        agg: sum
        expr: "CASE WHEN status = 'churned' THEN monthly_revenue ELSE 0 END"

      - name: new_mrr
        agg: sum
        expr: "CASE WHEN is_new_subscriber THEN monthly_revenue ELSE 0 END"`,
     simulatedOutput:{type:'text', content:`Semantic model registered: subscriptions\n\nEntities (join keys):\n  subscription  → subscription_id  (primary)\n  customer      → customer_id      (foreign)\n  account       → account_id       (foreign)\n\nDimensions (grouping/filtering):\n  metric_time  → subscription_date (time, grain: day)\n  plan         → plan_name         (categorical)\n  region       → billing_region    (categorical)\n  is_annual    → derived CASE expr (categorical)\n\nMeasures (aggregatable):\n  mrr               sum(monthly_revenue)\n  subscription_count count_distinct(subscription_id)\n  churned_mrr        sum(monthly_revenue WHERE status=churned)\n  new_mrr            sum(monthly_revenue WHERE is_new_subscriber)`},
     note:'Measures are defined once. MetricFlow generates the correct aggregation SQL for any combination of dimensions — analysts never write SUM() with CASE WHEN filters manually again.',
     after:'The semantic model is the contract between the data layer and the business. Every subsequent metric is built on top of these measures — change the measure definition and all downstream metrics update automatically.'},
    {step:2, title:'Define a Full Metric Portfolio',
     explanation:`Build simple, ratio, cumulative, and derived metrics that cover the full SaaS revenue reporting surface — MRR, churn rate, net revenue retention, and ARR.`,
     code:`# models/semantic/metrics.yml

metrics:

  # --- Simple metrics (single measure) ---

  - name: mrr
    label: "MRR"
    description: "Monthly Recurring Revenue in USD"
    type: simple
    type_params:
      measure: mrr

  - name: total_subscriptions
    label: "Active Subscriptions"
    type: simple
    type_params:
      measure: subscription_count

  # --- Ratio metric (numerator / denominator) ---

  - name: churn_rate
    label: "MRR Churn Rate"
    description: "Churned MRR as % of total MRR"
    type: ratio
    type_params:
      numerator: churned_mrr
      denominator: mrr

  # --- Derived metric (formula on other metrics) ---

  - name: arr
    label: "ARR"
    description: "Annual Recurring Revenue (MRR × 12)"
    type: derived
    type_params:
      expr: "mrr * 12"
      metrics:
        - name: mrr

  - name: net_revenue_retention
    label: "NRR"
    description: "Net Revenue Retention %"
    type: derived
    type_params:
      expr: "(mrr - churned_mrr + expansion_mrr) / lag_mrr"
      metrics:
        - name: mrr
        - name: churned_mrr
        - name: mrr
          offset_window: 1 month
          alias: lag_mrr

  # --- Cumulative metric (running total) ---

  - name: cumulative_mrr
    label: "Cumulative MRR"
    type: cumulative
    type_params:
      measure: new_mrr
      window: unbounded`,
     simulatedOutput:{type:'text', content:`Metric registry:\n\n  Name                    Type        Label\n  ─────────────────────   ─────────   ──────────────────────\n  mrr                     simple      MRR\n  total_subscriptions     simple      Active Subscriptions\n  churn_rate              ratio       MRR Churn Rate\n  arr                     derived     ARR\n  net_revenue_retention   derived     NRR\n  cumulative_mrr          cumulative  Cumulative MRR\n\nAll metrics share the same underlying semantic model.\nSame definition used in:\n  → Looker dashboard\n  → Tableau Finance workbook\n  → CEO mobile app API\n  → Python ML features pipeline`},
     after:'The full SaaS metric portfolio: MRR, ARR, churn rate, NRR, and cumulative MRR — all defined in 50 lines of YAML, all queryable from any BI tool, all guaranteed to return identical numbers.'},
    {step:3, title:'Query Metrics with dbt sl query',
     explanation:`Use the dbt Semantic Layer CLI to test metric queries before connecting BI tools. MetricFlow generates and executes the warehouse SQL.`,
     code:`# Query MRR by month
$ dbt sl query --metrics mrr --group-by metric_time__month

# Query MRR and churn_rate by month and plan
$ dbt sl query \\
  --metrics mrr,churn_rate \\
  --group-by metric_time__month,plan

# Filter to a specific region
$ dbt sl query \\
  --metrics mrr,total_subscriptions \\
  --group-by metric_time__month \\
  --where "{{ Dimension('subscriptions__region') }} = 'EMEA'"

# Query ARR (derived: mrr*12) — MetricFlow computes the derivation
$ dbt sl query --metrics arr --group-by metric_time__quarter

# Preview the generated SQL without running it:
$ dbt sl compile --metrics mrr --group-by metric_time__month

# BI tool connection (dbt Cloud):
# Host: semantic-layer.cloud.getdbt.com
# Protocol: JDBC / ADBC
# Auth: service token from dbt Cloud UI
# Supported: Looker, Tableau, Mode, Hex, Excel (via connector)`,
     simulatedOutput:{type:'text', content:`$ dbt sl query --metrics mrr,churn_rate --group-by metric_time__month,plan\n\nGenerating SQL from metric definitions...\n\nresult:\n  metric_time__month  plan          mrr          churn_rate\n  ──────────────────  ──────────    ──────────   ──────────\n  2024-01-01          enterprise    $182,400     1.2%\n  2024-01-01          pro           $94,500      2.8%\n  2024-01-01          starter       $31,200      5.1%\n  2024-02-01          enterprise    $195,600     0.9%\n  2024-02-01          pro           $98,700      2.4%\n  2024-02-01          starter       $29,800      5.6%\n\nGenerated SQL (compiled by MetricFlow):\nSELECT\n    DATE_TRUNC('month', s.subscription_date) AS metric_time__month,\n    s.plan_name AS plan,\n    SUM(s.monthly_revenue) AS mrr,\n    SUM(CASE WHEN s.status = 'churned' THEN s.monthly_revenue END)\n      / NULLIF(SUM(s.monthly_revenue), 0) AS churn_rate\nFROM analytics.fct_subscriptions s\nGROUP BY 1, 2\nORDER BY 1, 2`},
     after:'MetricFlow generates the exact SQL needed for each query — date truncation, CASE WHEN aggregations, NULL handling, and GROUP BY — all from the metric definition. The BI tool developer never writes this SQL; they just select the metric name and dimension.'
    }
  ],
  challenge:{
    title:'Define an Expansion MRR Metric',
    description:`Write: (1) a measure in the subscriptions semantic model called expansion_mrr that sums monthly_revenue WHERE upgrade_flag = true, (2) a derived metric called net_new_mrr defined as new_mrr - churned_mrr + expansion_mrr, (3) the dbt sl query command to query net_new_mrr grouped by metric_time__month and plan, filtered to 2024. Show the expected column output structure.`,
    hint:`For derived metrics, list all component metrics under metrics: in type_params. The filter in dbt sl query uses --where with {{ Dimension() }} syntax or a simple SQL WHERE expression depending on your dbt version.`,
    starterCode:`# Add to semantic model measures:

    measures:
      # ... existing measures ...
      - name: expansion_mrr
        agg:
        expr: "CASE WHEN         THEN monthly_revenue ELSE 0 END"
        description: "Revenue added from plan upgrades."

---

# Add to metrics.yml:

  - name: net_new_mrr
    label: "Net New MRR"
    type: derived
    type_params:
      expr: "              -               +              "
      metrics:
        - name:
        - name:
        - name:

---

# CLI query command:
# $ dbt sl query \\
#     --metrics \\
#     --group-by     ,     \\
#     --where "metric_time__month >= '2024-01-01'"`,
    solution:`# Add to semantic model measures:

    measures:
      - name: expansion_mrr
        agg: sum
        expr: "CASE WHEN upgrade_flag = true THEN monthly_revenue ELSE 0 END"
        description: "Revenue from plan upgrades (expansion)."

---

# models/semantic/metrics.yml

  - name: net_new_mrr
    label: "Net New MRR"
    description: "New MRR minus churn plus expansion — net subscription revenue change"
    type: derived
    type_params:
      expr: "new_mrr - churned_mrr + expansion_mrr"
      metrics:
        - name: new_mrr
        - name: churned_mrr
        - name: expansion_mrr

---

# CLI query:
$ dbt sl query \\
    --metrics net_new_mrr \\
    --group-by metric_time__month,plan \\
    --where "metric_time__month >= '2024-01-01'"

# Expected output columns:
# metric_time__month | plan | net_new_mrr`,
    explanation:`The derived metric net_new_mrr references three component metrics by name — MetricFlow computes each separately in the generated SQL and combines them. This is more robust than writing new_mrr - churned_mrr + expansion_mrr in raw SQL in every dashboard, because the component definitions (filters, aggregations, NULL handling) are inherited from their measure definitions automatically.`,
    successMessage:`dbt Semantic Layer and MetricFlow mastered! You have completed the full dbt learning path — from project structure and sources through incremental models, Jinja macros, snapshots, packages, CI/CD, performance tuning, and the Semantic Layer. This is the complete toolkit of a professional analytics engineer.`
  },
  insight:`The dbt Semantic Layer with MetricFlow represents the current frontier of analytics engineering. The "metric proliferation" problem — where every team has a different definition of the same KPI — is one of the most damaging data trust problems in business. The Semantic Layer solves it architecturally rather than through policy. As of 2024, it is supported natively by Looker (via the LookML replacement), Tableau (via the JDBC connector), Mode, Hex, and Excel. The pattern will likely become the dominant metric-definition standard in the data industry over the next 3-5 years, making this lesson forward-looking as much as immediately practical.`
}

]; // end DBT_LESSONS (all 15 lessons)
