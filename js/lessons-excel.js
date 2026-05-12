'use strict';

/* =========================================================
   lessons-excel.js
   DataLearn — Excel for Data Analysts
   12 lessons: 4 Basic | 4 Intermediate | 4 Advanced
   Language key: 'excel'   Level keys: basic / intermediate / advanced
   ========================================================= */

const EXCEL_LESSONS = [

/* ═══════════════════════════════════════════════
   BASIC – Lessons 1-4
   ═══════════════════════════════════════════════ */
{
  id:'excel-basic-1', language:'excel', level:'basic', order:1,
  title:'XLOOKUP & VLOOKUP',
  duration:'20 min', xp:100,
  scenario:{
    company:'NovaTech Analytics', role:'Data Analyst',
    description:`Your manager hands you a sales transactions file and a separate product catalogue. "Can you add the product name and category to each transaction?" she asks. This is a lookup — the bread-and-butter of Excel analytics. XLOOKUP is the modern answer; VLOOKUP is what you'll encounter in every legacy workbook.`
  },
  objectives:[
    'Use XLOOKUP to retrieve a value from another table',
    'Understand how VLOOKUP works and why XLOOKUP improves on it',
    'Handle not-found errors with the if_not_found argument',
    'Perform a two-way lookup to retrieve a value at a row/column intersection'
  ],
  terminology:[
    {term:'XLOOKUP',lang:'excel',definition:'Searches a lookup array for a value and returns a corresponding result from a return array. Replaces VLOOKUP/HLOOKUP. Syntax: XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])',example:'=XLOOKUP(A2, Products[ProductID], Products[ProductName], "Not Found")'},
    {term:'VLOOKUP',lang:'excel',definition:'Looks up a value in the leftmost column of a table and returns a value in the same row from a specified column. The column index is positional — fragile if columns are inserted.',example:'=VLOOKUP(A2, Products, 2, FALSE)'},
    {term:'lookup_value',lang:'excel',definition:'The value you are searching for. Can be a cell reference, text string, or number.',example:'A2  (the transaction\'s ProductID)'},
    {term:'lookup_array / return_array',lang:'excel',definition:'XLOOKUP\'s two-array design: lookup_array is where to search; return_array is where to get the result. They must be the same size.',example:'Products[ProductID]  /  Products[Category]'},
    {term:'if_not_found',lang:'excel',definition:'Optional 4th argument in XLOOKUP. Returned when no match is found, replacing IFERROR wrapping.',example:'=XLOOKUP(A2, Products[ID], Products[Name], "Unknown")'},
    {term:'exact match (FALSE / 0)',lang:'excel',definition:'VLOOKUP\'s 4th argument FALSE (or XLOOKUP match_mode 0) requires an exact match. Always use this for data lookups.',example:'=VLOOKUP(A2, Products, 2, FALSE)'},
    {term:'Structured Table Reference',lang:'excel',definition:'When data is formatted as an Excel Table (Ctrl+T), columns can be referenced by name: Table[Column]. More readable and automatically expands.',example:'Products[ProductID]'}
  ],
  theory:`<h3>Why Lookups Matter</h3>
<p>Almost every analyst task involves combining data from two sources — a transactions table and a reference table, a headcount list and a rates table, a survey and a respondent master. Lookups are how you join them in Excel.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])<br><br>Reads as: "Find [lookup_value] in [lookup_array],<br>then return the matching value from [return_array]."</code></div></div>
<h3>XLOOKUP vs VLOOKUP</h3>
<ul>
<li><strong>XLOOKUP</strong> — works left, right, up, down; built-in error handling; returns arrays; no column number to break</li>
<li><strong>VLOOKUP</strong> — widely used in legacy files; breaks if columns are inserted; can only look right; requires IFERROR</li>
</ul>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Format your data as Excel Tables first (Ctrl+T).</strong> Named column references like <code>Products[ProductID]</code> make formulas readable and self-extending — no need to update ranges when data grows.</div></div>`,
  steps:[
    {step:1,title:'Basic XLOOKUP — Add Product Name',
     explanation:`Match each transaction's ProductID to the Products table and pull back the product name.`,
     code:`' Sheet: Transactions (A:C)
' A: TransactionID | B: ProductID | C: Amount

' Sheet: Products (E:G)
' E: ProductID | F: ProductName | G: Category

' In cell D2 (Transactions sheet) — add Product Name:
=XLOOKUP(B2, Products[ProductID], Products[ProductName], "Not Found")

' Drag or double-click fill handle to copy down all rows.
' Because Products is an Excel Table, the reference auto-expands.`,
     simulatedOutput:{type:'dataframe',
       headers:['TransactionID','ProductID','Amount','ProductName'],
       rows:[['T001','P004',250,'Analytics Pro'],['T002','P001',480,'DataViz Suite'],['T003','P004',130,'Analytics Pro'],['T004','P009',310,'Not Found']]},
     note:'P009 returns "Not Found" because it does not exist in the Products table. XLOOKUP\'s 4th argument handles this cleanly — no IFERROR wrapper needed.',
     after:'Column D is now populated with product names. Each row independently looked up its ProductID. "Not Found" flags the data quality issue in row T004.'},
    {step:2,title:'Pull Multiple Columns at Once',
     explanation:`XLOOKUP can return multiple columns in one formula by selecting a multi-column return_array. The result spills across adjacent cells automatically.`,
     code:`' Return BOTH ProductName and Category in one formula.
' Enter in D2 — it spills into D2:E2, then copy down.

=XLOOKUP(B2, Products[ProductID], Products[[ProductName]:[Category]], "Not Found")

' The double-bracket notation Products[[Col1]:[Col2]]
' selects a range of columns from the Table.

' Equivalent VLOOKUP (requires two separate formulas):
' ProductName: =VLOOKUP(B2, Products, 2, FALSE)
' Category:    =VLOOKUP(B2, Products, 3, FALSE)`,
     simulatedOutput:{type:'dataframe',
       headers:['TransactionID','ProductID','Amount','ProductName','Category'],
       rows:[['T001','P004',250,'Analytics Pro','Software'],['T002','P001',480,'DataViz Suite','Software'],['T003','P004',130,'Analytics Pro','Software'],['T004','P009',310,'Not Found','Not Found']]},
     note:'One XLOOKUP formula replaced two VLOOKUPs. The [[ProductName]:[Category]] syntax spans two adjacent Table columns and spills results automatically.',
     after:'Both ProductName and Category are filled in a single formula. This is a key XLOOKUP advantage — VLOOKUP would need a separate formula per column, each with a fragile column index number.'},
    {step:3,title:'Two-Way Lookup — Row and Column Intersection',
     explanation:`A nested XLOOKUP finds a value at the intersection of a row lookup and a column lookup — like looking up a quarterly target for a specific rep and quarter.`,
     code:`' Targets table (I1:M5):
'     | Q1     | Q2     | Q3     | Q4
' Alice | 50000  | 55000  | 60000  | 65000
' Bob   | 40000  | 42000  | 44000  | 46000
' Carol | 60000  | 65000  | 70000  | 75000
' David | 35000  | 37000  | 39000  | 41000

' Find Alice's Q3 target:
=XLOOKUP("Alice", Targets[Rep], XLOOKUP("Q3", Targets[#Headers], Targets))

' How it works:
' Inner XLOOKUP finds the Q3 column and returns ALL values in that column.
' Outer XLOOKUP finds Alice's row within those values.`,
     simulatedOutput:{type:'text',content:`Result: 60000\n\nAlice's Q3 target = $60,000`},
     note:'The inner XLOOKUP resolves to a column of values; the outer XLOOKUP searches that column for the row match. This replaces the classic INDEX/MATCH/MATCH pattern.',
     after:'Two-way lookups with nested XLOOKUP are cleaner and more readable than INDEX/MATCH/MATCH. Use them for rate tables, pricing grids, and target matrices.'}
  ],
  challenge:{
    title:'Employee Benefits Lookup',
    description:`You have a Headcount sheet (columns: EmployeeID, Name, Department, GradeLevel) and a BenefitsTable (GradeLevel, AnnualBonus, HealthContribution, ParkingAllowance). Use XLOOKUP to add AnnualBonus and HealthContribution to each employee row. For employees whose GradeLevel is not found in BenefitsTable, show "Check Grade".`,
    hint:`=XLOOKUP(D2, BenefitsTable[GradeLevel], BenefitsTable[[AnnualBonus]:[HealthContribution]], "Check Grade") — select both return columns in one formula`,
    starterCode:`' Headcount (A:D): EmployeeID | Name | Department | GradeLevel
' BenefitsTable (F:I): GradeLevel | AnnualBonus | HealthContribution | ParkingAllowance

' Sample data:
' A2: E001 | B2: Sarah | C2: Sales | D2: G3
' A3: E002 | B3: Mike  | C3: IT    | D3: G5
' A4: E003 | B4: Emily | C4: HR    | D4: G9   <- grade not in table

' Write XLOOKUP in E2 that:
' 1. Looks up GradeLevel (D2) in BenefitsTable[GradeLevel]
' 2. Returns both AnnualBonus AND HealthContribution
' 3. Shows "Check Grade" if not found

=XLOOKUP(  ,  ,  , "Check Grade")`,
    solution:`=XLOOKUP(D2, BenefitsTable[GradeLevel], BenefitsTable[[AnnualBonus]:[HealthContribution]], "Check Grade")

' Entered in E2 — spills into F2 automatically.
' Copy E2 down to E3:E4 to populate all employees.
' E4 will show "Check Grade" because G9 is not in BenefitsTable.`,
    explanation:`The multi-column return_array BenefitsTable[[AnnualBonus]:[HealthContribution]] returns two adjacent columns in one formula. The if_not_found argument "Check Grade" handles missing grades without a nested IFERROR. Copy down the column and every employee gets their benefits values in one step.`,
    successMessage:`Lookups mastered! XLOOKUP is the most-used analyst formula in modern Excel. You'll use this pattern dozens of times a week — matching employees to rates, products to categories, accounts to owners.`
  },
  insight:`XLOOKUP was released in 2019 and immediately became the most-used Excel function upgrade in a decade. Every major bank, consultancy, and corporate analytics team has tens of thousands of workbooks still using VLOOKUP — knowing both functions lets you work in any environment and modernise legacy files.`
},

{
  id:'excel-basic-2', language:'excel', level:'basic', order:2,
  title:'SUMIFS, COUNTIFS & AVERAGEIFS',
  duration:'20 min', xp:100,
  scenario:{
    company:'NovaTech Analytics', role:'Data Analyst',
    description:`"I need a quick summary — total revenue by region and product category, headcount by department and grade, average deal size by sales rep." These are conditional aggregations — the most common calculation in any Excel report. SUMIFS, COUNTIFS and AVERAGEIFS answer all of them.`
  },
  objectives:[
    'Use SUMIFS to sum values matching multiple conditions',
    'Use COUNTIFS to count rows matching multiple criteria',
    'Use AVERAGEIFS for conditional averages',
    'Build a summary table using structured criteria references'
  ],
  terminology:[
    {term:'SUMIFS',lang:'excel',definition:'Sums values where ALL specified criteria are met. Syntax: SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2, ...])',example:'=SUMIFS(D:D, B:B, "East", C:C, "Software")'},
    {term:'COUNTIFS',lang:'excel',definition:'Counts rows where ALL specified criteria are met. Same argument pattern as SUMIFS but no sum_range — it counts the matching rows themselves.',example:'=COUNTIFS(B:B, "East", C:C, "Software")'},
    {term:'AVERAGEIFS',lang:'excel',definition:'Averages values where ALL specified criteria are met. Useful for comparing performance across segments.',example:'=AVERAGEIFS(D:D, B:B, "East", C:C, "Software")'},
    {term:'Criteria wildcards',lang:'excel',definition:'Use * for any sequence of characters and ? for any single character in text criteria. Prefix with comparison operators for numeric criteria.',example:'"East*"  matches East, Eastern   |   ">100"  matches values over 100'},
    {term:'criteria_range',lang:'excel',definition:'The column to apply the condition to. Must be the same height as sum_range. Full column references like B:B are fine.',example:'B:B  (Region column)'},
    {term:'Array criteria',lang:'excel',definition:'Wrapping criteria in {} runs SUMIFS for each value and returns an array of results, enabling a single formula to fill multiple summary rows.',example:'=SUMIFS(D:D, B:B, {"East","West","Central"})'}
  ],
  theory:`<h3>SUMIFS is the Analyst's Swiss Army Knife</h3>
<p>Before pivot tables refresh, before you write a SQL query — SUMIFS lets you answer "how much / how many / what average for <em>this</em> segment?" in a single formula. The key insight is that you can chain as many criteria pairs as you need.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>=SUMIFS(sum_range,<br>        criteria_range1, criteria1,<br>        criteria_range2, criteria2, ...)<br><br>ALL criteria must be true for a row to be included.</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Use cell references for criteria, not hardcoded strings.</strong> =SUMIFS(D:D, B:B, G2) lets you change G2 to any region — the formula updates instantly. This is how you build dynamic summary tables.</div></div>`,
  steps:[
    {step:1,title:'SUMIFS — Revenue by Region and Category',
     explanation:`Sum revenue for a specific region AND product category using two criteria pairs.`,
     code:`' Transactions table (A:D):
' A: TransactionID | B: Region | C: Category | D: Revenue

' Single condition — total East revenue:
=SUMIFS(D:D, B:B, "East")

' Two conditions — East + Software revenue:
=SUMIFS(D:D, B:B, "East", C:C, "Software")

' With cell references (better for a summary table):
' G2 = "East"   H2 = "Software"
=SUMIFS(D:D, B:B, G2, C:C, H2)

' Numeric condition — revenue over $10,000 in East:
=SUMIFS(D:D, B:B, "East", D:D, ">10000")`,
     simulatedOutput:{type:'dataframe',
       headers:['Region','Category','Total Revenue'],
       rows:[['East','All','$487,500'],['East','Software','$312,000'],['East','Software (>$10k)','$289,000']]},
     note:'Each formula runs independently — changing G2 from "East" to "West" instantly recalculates without touching the formula.',
     after:'SUMIFS with cell references is the foundation of every Excel summary table and dashboard. The formula stays fixed; the criteria cells become input dropdowns.'},
    {step:2,title:'COUNTIFS — Headcount by Segment',
     explanation:`Count how many employees are in each department at each grade level. COUNTIFS has no sum_range — it counts matching rows directly.`,
     code:`' Employees table (A:D):
' A: EmployeeID | B: Department | C: GradeLevel | D: ContractType

' Count IT employees:
=COUNTIFS(B:B, "IT")

' Count IT employees at Grade G4 or above — not possible in one
' COUNTIFS (it uses AND logic). Split into two and subtract:
=COUNTIFS(B:B, "IT", C:C, "G4") + COUNTIFS(B:B, "IT", C:C, "G5")

' Count contractors in Sales:
=COUNTIFS(B:B, "Sales", D:D, "Contractor")

' Count any employee with "Manager" in their title (wildcard):
' (Assuming E column = JobTitle)
=COUNTIFS(E:E, "*Manager*")`,
     simulatedOutput:{type:'dataframe',
       headers:['Department','ContractType','Count'],
       rows:[['IT','All','47'],['Sales','Contractor','12'],['All','*Manager*','23']]},
     note:'COUNTIFS uses AND logic — all criteria must be true. For OR logic (IT or Marketing), use separate COUNTIFS and add them.',
     after:'Headcount splits by department, grade, and contract type — all without a pivot table or helper column. The wildcard "*Manager*" catches any title containing that word.'},
    {step:3,title:'Build a Summary Matrix',
     explanation:`Combine SUMIFS with an array of criteria to populate an entire summary table in one formula block.`,
     code:`' Set up a summary matrix:
' Rows: Regions (East, West, Central) in G2:G4
' Columns: Categories (Software, Services, Hardware) in H1:J1

' Enter in H2, copy across and down:
=SUMIFS($D:$D, $B:$B, $G2, $C:$C, H$1)

' Dollar signs lock the ranges ($D:$D, $B:$B, $C:$C)
' $G2  — column G locked, row moves as you copy down
' H$1  — row 1 locked, column moves as you copy right

' Result fills the entire matrix automatically.

' Add AVERAGEIFS alongside for average deal size:
=AVERAGEIFS($D:$D, $B:$B, $G2, $C:$C, H$1)`,
     simulatedOutput:{type:'dataframe',
       headers:['Region','Software','Services','Hardware'],
       rows:[['East',312000,98500,77000],['West',265000,112000,64500],['Central',189000,76000,43000]]},
     note:'The mixed references ($G2 and H$1) are the key. They let one formula fill the whole table when copied — a technique every analyst must have.',
     after:'A 3×3 revenue breakdown from a single copied formula. Add more regions or categories to the headers — copy the formula across and the matrix fills itself.'}
  ],
  challenge:{
    title:'Sales Rep Performance Summary',
    description:`Using a sales transactions table (columns: SalesRep, Region, Quarter, DealSize, Status), build a 4-row summary for each sales rep showing: total won revenue (Status="Won"), count of lost deals (Status="Lost"), average deal size for Q1 (Quarter="Q1"), and win rate (won deals / total deals as a percentage).`,
    hint:`SUMIFS(DealSize, Rep, G2, Status, "Won") for revenue. COUNTIFS(Rep, G2, Status, "Lost") for lost count. Win rate = COUNTIFS(Rep,G2,Status,"Won") / COUNTIFS(Rep,G2) — format as percentage.`,
    starterCode:`' Transactions (A:E): SalesRep | Region | Quarter | DealSize | Status

' Summary table — Rep names in G2:G5:
' H1: Won Revenue  I1: Lost Count  J1: Avg Q1 Deal  K1: Win Rate

' H2 — Total won revenue for rep in G2:
=SUMIFS(   )

' I2 — Count of lost deals for rep in G2:
=COUNTIFS(   )

' J2 — Average deal size in Q1 for rep in G2:
=AVERAGEIFS(   )

' K2 — Win rate (won deals / all deals):
=COUNTIFS(   ) / COUNTIFS(   )`,
    solution:`' H2 — Won revenue:
=SUMIFS($D:$D, $A:$A, $G2, $E:$E, "Won")

' I2 — Lost deal count:
=COUNTIFS($A:$A, $G2, $E:$E, "Lost")

' J2 — Average deal size in Q1:
=AVERAGEIFS($D:$D, $A:$A, $G2, $C:$C, "Q1")

' K2 — Win rate (format column K as Percentage):
=COUNTIFS($A:$A, $G2, $E:$E, "Won") / COUNTIFS($A:$A, $G2)

' Copy all formulas down rows 2-5 to fill all reps.`,
    explanation:`Mixed references ($A:$A with $G2) let you write the formula once and copy down. Win rate requires two COUNTIFS divided — won deals over total deals for that rep. Format K as % to display 0.72 as 72%. This is the exact pattern used in sales dashboards at every company.`,
    successMessage:`Conditional aggregations mastered! SUMIFS, COUNTIFS and AVERAGEIFS are in the top 5 most-used Excel functions in professional analytics. Every dashboard, every weekly report, every KPI tracker uses them.`
  },
  insight:`SUMIFS replaced SUMIF in 2007 and analysts never looked back. Every consultancy, investment bank, and corporate FP&A team runs on SUMIFS-based summary tables. Learning to build a matrix with mixed references ($G2 and H$1) is a genuine productivity multiplier — it turns a 2-hour manual task into a 10-minute formula setup.`
},

{
  id:'excel-basic-3', language:'excel', level:'basic', order:3,
  title:'Dynamic Arrays — FILTER, SORT & UNIQUE',
  duration:'20 min', xp:100,
  scenario:{
    company:'NovaTech Analytics', role:'Data Analyst',
    description:`"Can you give me a live list of just the Q2 deals over $50k, sorted by deal size?" In old Excel this meant manual filters or helper columns. Dynamic array functions — available in Excel 365 and Excel 2021 — return a range of results that spills automatically into neighbouring cells and updates whenever the source data changes.`
  },
  objectives:[
    'Use FILTER to return rows matching one or more conditions',
    'Use SORT and SORTBY to sort results dynamically',
    'Use UNIQUE to extract a deduplicated list',
    'Combine FILTER, SORT and UNIQUE to answer multi-step questions in one formula'
  ],
  terminology:[
    {term:'Dynamic Array',lang:'excel',definition:'A formula that returns multiple values which automatically spill into adjacent cells. Introduced in Excel 365 / 2021. Any formula that produces multiple results behaves this way.',example:'=UNIQUE(B:B)  spills a deduped list downward'},
    {term:'Spill range (#)',lang:'excel',definition:'The # operator references an entire spill range. If A1 contains a spill formula, A1# refers to all the spilled results.',example:'=SORT(A1#)  sorts whatever spills from A1'},
    {term:'FILTER',lang:'excel',definition:'Returns only the rows (or columns) where a condition is TRUE. Syntax: FILTER(array, include, [if_empty])',example:'=FILTER(A1:D100, C1:C100="East", "No results")'},
    {term:'SORT',lang:'excel',definition:'Sorts an array by a column. Syntax: SORT(array, [sort_index], [sort_order], [by_col]). sort_order: 1=ascending, -1=descending.',example:'=SORT(A1:D100, 4, -1)  — sort by column 4 descending'},
    {term:'SORTBY',lang:'excel',definition:'Sorts an array by one or more external arrays (not limited to columns within the array). More flexible than SORT.',example:'=SORTBY(A1:B10, B1:B10, -1)'},
    {term:'UNIQUE',lang:'excel',definition:'Returns distinct values from a list. By default returns unique rows; set the 3rd argument to TRUE for values that appear exactly once.',example:'=UNIQUE(B2:B100)  — deduplicated Region list'},
    {term:'COUNTA(range#)',lang:'excel',definition:'Using COUNTA with a spill range counts how many rows the dynamic formula returned — useful for summary counts alongside FILTER.',example:'=COUNTA(A2#)  counts spilled FILTER results'}
  ],
  theory:`<h3>Why Dynamic Arrays Changed Everything</h3>
<p>Before dynamic arrays, extracting a filtered list required CTRL+SHIFT+ENTER array formulas, helper columns, or VBA. Now one formula does it all and updates automatically when data changes.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>=FILTER(A:D, (B:B="East") * (D:D>50000), "No results")<br><br>Multiplying conditions = AND logic<br>Adding conditions  = OR logic</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Dynamic arrays require Excel 365 or Excel 2021.</strong> In Excel 2019 or earlier, FILTER/SORT/UNIQUE do not exist. If you need to support older versions, use SUMIFS/COUNTIFS for aggregations and Power Query for filtered extracts.</div></div>`,
  steps:[
    {step:1,title:'FILTER — Extract Matching Rows',
     explanation:`Return all transactions where Region is "East" AND Revenue is above $10,000. The result spills automatically — no dragging needed.`,
     code:`' Transactions table: A=ID, B=Region, C=Category, D=Revenue, E=Quarter

' All East transactions:
=FILTER(A2:E100, B2:B100="East", "No matching records")

' East AND Revenue > 10000 (AND = multiply conditions):
=FILTER(A2:E100, (B2:B100="East") * (D2:D100>10000), "No results")

' East OR West (OR = add conditions, then compare >0):
=FILTER(A2:E100, (B2:B100="East") + (B2:B100="West"), "No results")

' Count how many rows were returned:
=COUNTA(A2#)   ' Replace A2 with the cell containing your FILTER formula`,
     simulatedOutput:{type:'dataframe',
       headers:['ID','Region','Category','Revenue','Quarter'],
       rows:[['T001','East','Software',45200,'Q2'],['T005','East','Services',18700,'Q1'],['T009','East','Software',62100,'Q2'],['T014','East','Hardware',11300,'Q3']]},
     note:'The * between conditions acts as AND — both must be TRUE (1*1=1). Adding conditions with + acts as OR — either being TRUE suffices (1+0=1 → >0 is TRUE).',
     after:'4 rows returned, spilling automatically. Change "East" to "West" in the formula and it instantly recalculates. The COUNTA(A2#) count updates in real time too.'},
    {step:2,title:'SORT and SORTBY',
     explanation:`Sort filtered results by revenue descending, then combine FILTER and SORT in one formula.`,
     code:`' Sort a static table by column 4 (Revenue) descending:
=SORT(A2:E100, 4, -1)

' Sort the SAME table by two columns:
' First by Region (col 2) ascending, then Revenue (col 4) descending:
=SORT(A2:E100, {2,4}, {1,-1})

' Combine FILTER + SORT in one formula:
' East deals, sorted by Revenue descending:
=SORT(
  FILTER(A2:E100, B2:B100="East", "No results"),
  4, -1
)

' SORTBY using an external sort column:
' Sort the ID+Name table by a separately-calculated rank column:
=SORTBY(A2:B20, F2:F20, 1)`,
     simulatedOutput:{type:'dataframe',
       headers:['ID','Region','Category','Revenue','Quarter'],
       rows:[['T009','East','Software',62100,'Q2'],['T001','East','Software',45200,'Q2'],['T005','East','Services',18700,'Q1'],['T014','East','Hardware',11300,'Q3']]},
     note:'Nesting FILTER inside SORT is the standard pattern. SORT acts on whatever array FILTER returns — you never need intermediate helper columns.',
     after:'East transactions, highest revenue first, updated automatically. T009\'s $62,100 is at the top. Add a new East transaction to the source data and it appears in the correct sorted position instantly.'},
    {step:3,title:'UNIQUE — Deduplicated Lists',
     explanation:`Extract distinct values for dropdowns, summary tables, or as the input to other dynamic array formulas.`,
     code:`' Get unique list of Regions from column B:
=UNIQUE(B2:B100)

' Unique combinations of Region + Category (two columns):
=UNIQUE(B2:C100)

' Values that appear EXACTLY ONCE (occurs_once = TRUE):
=UNIQUE(B2:B100, FALSE, TRUE)

' Chain UNIQUE → SORT for a clean sorted dropdown list:
=SORT(UNIQUE(B2:B100))

' Use spill reference to count entries in each unique region:
' Put SORT(UNIQUE(B2:B100)) in G2, then in H2:
=COUNTIFS(B:B, G2#)   ' G2# expands to match all unique values`,
     simulatedOutput:{type:'dataframe',
       headers:['Unique Regions (sorted)','Count'],
       rows:[['Central',142],['East',198],['North',87],['West',163]]},
     note:'G2# refers to the entire spill range from the SORT(UNIQUE()) formula. COUNTIFS treats it as an array and returns a count for each region in one formula.',
     after:'A self-building, automatically sorted, deduplicated list with counts. When a new region appears in your source data, it shows up here automatically — no manual update required.'}
  ],
  challenge:{
    title:'Dynamic Top-Deals Report',
    description:`Using the transactions table (SalesRep, Region, Q, DealSize, Status), write a single spilled formula that: (1) filters to only "Won" deals with DealSize above $25,000, (2) sorts them by DealSize descending, and (3) separately produces a sorted unique list of winning sales reps. Add a COUNTA to show how many deals qualified.`,
    hint:`SORT(FILTER(range, (Status="Won")*(DealSize>25000),"None"), 4, -1) for sorted won deals. SORT(UNIQUE(FILTER(RepCol, (Status="Won")*(DealSize>25000),"None"))) for unique winning reps.`,
    starterCode:`' Transactions (A:E): SalesRep | Region | Quarter | DealSize | Status

' Formula 1 — in G2: Won deals over $25k, sorted by DealSize desc:
=SORT(
  FILTER(A2:E100,        ,"No qualifying deals"),
  4, -1
)

' Formula 2 — count of qualifying deals:
=COUNTA(G2#)

' Formula 3 — unique winning reps from filtered results:
=SORT(UNIQUE(FILTER(A2:A100,       ,"None")))`,
    solution:`' Formula 1 — sorted filtered deals:
=SORT(
  FILTER(A2:E100, (E2:E100="Won")*(D2:D100>25000), "No qualifying deals"),
  4, -1
)

' Formula 2 — count of qualifying deals (put below Formula 1 results):
=COUNTA(G2#)

' Formula 3 — unique reps with qualifying deals:
=SORT(UNIQUE(FILTER(A2:A100, (E2:E100="Won")*(D2:D100>25000), "None")))`,
    explanation:`The FILTER include argument combines two Boolean arrays with * (AND). SORT wraps FILTER and re-sorts the results. COUNTA(G2#) counts the spill range — it grows or shrinks automatically. UNIQUE(FILTER()) chains both functions: first filter to qualifying deals, then deduplicate the rep names from those rows.`,
    successMessage:`Dynamic arrays mastered! FILTER, SORT and UNIQUE replaced an entire class of VBA macros and helper-column workarounds. They're the most important Excel capability introduced in the last decade.`
  },
  insight:`Dynamic array functions were released in Excel 365 in 2019 and are now used by analysts at Google, Meta, McKinsey, and every major bank. They reduced the need for Power Query for simple extracts, eliminated most CTRL+SHIFT+ENTER array formulas, and cut the time to build live filtered reports from hours to minutes.`
},

{
  id:'excel-basic-4', language:'excel', level:'basic', order:4,
  title:'Pivot Tables & Conditional Formatting',
  duration:'25 min', xp:120,
  scenario:{
    company:'NovaTech Analytics', role:'Data Analyst',
    description:`"I need a summary by region and product category — totals, counts, and averages — and I want to visually highlight the top and bottom performers." Pivot tables are Excel's fastest aggregation tool (no formulas), and conditional formatting turns numbers into a visual layer your audience immediately understands.`
  },
  objectives:[
    'Build a pivot table from a structured data table',
    'Add calculated fields and change value summarisation',
    'Apply conditional formatting rules: colour scale, data bars, top/bottom rules',
    'Use the GETPIVOTDATA function to reference pivot values in formulas'
  ],
  terminology:[
    {term:'Pivot Table',lang:'excel',definition:'An interactive summary table that aggregates data from a source. Drag fields to Rows, Columns, Values, and Filters to reshape data with zero formulas.',example:'Insert → PivotTable → Choose Table → Drag Region → Rows, Revenue → Values'},
    {term:'Value Field Settings',lang:'excel',definition:'Right-click a Values field → Value Field Settings to change from Sum to Count, Average, Max, Min, % of Total, etc.',example:'Right-click Revenue cell → Summarise Values By → Average'},
    {term:'Calculated Field',lang:'excel',definition:'A custom formula inside a pivot table that operates on other pivot fields. Inserted via PivotTable Analyze → Fields, Items & Sets → Calculated Field.',example:'=Revenue / Units   creates an Average Price field'},
    {term:'Slicers',lang:'excel',definition:'Visual filter buttons connected to a pivot table. Click to instantly filter the pivot — more intuitive than dropdown filters for presentations.',example:'Insert → Slicer → Region → click East'},
    {term:'GETPIVOTDATA',lang:'excel',definition:'Retrieves a specific value from a pivot table by field name. More robust than cell references — survives pivot layout changes.',example:'=GETPIVOTDATA("Revenue", $A$3, "Region","East", "Category","Software")'},
    {term:'Conditional Formatting',lang:'excel',definition:'Applies formatting (colour, icons, bars) to cells based on their values or formulas. Fully dynamic — updates when data changes.',example:'Home → Conditional Formatting → Colour Scales → Green-White-Red'},
    {term:'Colour Scale',lang:'excel',definition:'Applies a gradient colour across a range — typically green for high, red for low — to communicate relative magnitude at a glance.',example:'Select revenue cells → CF → Colour Scales → Green-Yellow-Red'}
  ],
  theory:`<h3>Pivot Tables: Fastest Aggregation in Excel</h3>
<p>A pivot table can summarise 100,000 rows by region, category, and quarter in under 5 seconds — no formulas, no helper columns. The trade-off is that the layout is interactive but not formula-driven, so GETPIVOTDATA bridges the gap when you need to reference pivot values elsewhere.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Best practice setup:<br>1. Format source as a Table (Ctrl+T) — pivot auto-updates on refresh<br>2. Insert → PivotTable → Existing Worksheet<br>3. Drag: Region → Rows | Category → Columns | Revenue → Values</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Always refresh the pivot after data changes.</strong> Right-click anywhere in the pivot → Refresh, or Data → Refresh All. Pivot tables do not update automatically.</div></div>`,
  steps:[
    {step:1,title:'Build and Configure a Pivot Table',
     explanation:`Create a pivot table summarising total revenue and deal count by Region (rows) and Category (columns).`,
     code:`' Step-by-step (no formula — UI actions):

' 1. Click anywhere in your data table
' 2. Insert → PivotTable → OK (new/existing sheet)

' 3. In PivotTable Fields panel, drag:
'    Region    → Rows
'    Category  → Columns
'    Revenue   → Values  (auto-sums)
'    TransactionID → Values (will count)

' 4. Click the second Values field → Value Field Settings
'    → Summarise By: Count
'    → Custom Name: "# Deals"

' 5. Right-click any Revenue value → Value Field Settings
'    → Show Values As → % of Column Total
'    (to see category share within each region)

' 6. Restore to Sum: right-click → Value Field Settings → Sum`,
     simulatedOutput:{type:'dataframe',
       headers:['Region','Hardware','Services','Software','Grand Total'],
       rows:[['Central',43000,76000,189000,308000],['East',77000,98500,312000,487500],['West',64500,112000,265000,441500],['Grand Total',184500,286500,766000,1237000]]},
     note:'The pivot table rebuilds instantly when you drag fields. Grand Totals appear automatically. Right-clicking any value cell reveals Value Field Settings, Show Values As, and field formatting.',
     after:'A complete revenue matrix in seconds, no formulas. The Grand Total row and column are automatic. Right-click → Refresh whenever the source data is updated.'},
    {step:2,title:'Slicers and Calculated Fields',
     explanation:`Add slicers for interactive filtering, then create a calculated field for average deal size.`,
     code:`' Add Slicers:
' 1. Click anywhere in the pivot table
' 2. PivotTable Analyze → Insert Slicer
' 3. Check: Region, Quarter → OK
' 4. Click any slicer button to instantly filter the pivot

' Add a Calculated Field ("Avg Deal Size"):
' 1. PivotTable Analyze → Fields, Items & Sets → Calculated Field
' 2. Name: "Avg Deal Size"
' 3. Formula: = Revenue / TotalDeals
'    (where TotalDeals is another field — or use Count of ID)

' GETPIVOTDATA — reference a specific pivot value in a formula:
' Click a non-pivot cell, type =, then click the pivot value
' Excel auto-generates:
=GETPIVOTDATA("Revenue", $A$3, "Region", "East", "Category", "Software")
' More robust than =C5 — survives row/column reordering`,
     simulatedOutput:{type:'text',content:`Slicer: Q2 selected\nFiltered Pivot shows Q2 data only\n\nGETPIVOTDATA result: $312,000\n(East / Software total revenue)`},
     note:'GETPIVOTDATA is auto-generated when you click a pivot cell while typing a formula. It\'s far more stable than a cell reference because it references the pivot by field name, not position.',
     after:'Slicers turn your pivot table into an interactive dashboard — one click filters everything. GETPIVOTDATA lets you build formula outputs that pull from the pivot without breaking when the pivot is refreshed.'},
    {step:3,title:'Conditional Formatting',
     explanation:`Apply a colour scale to revenue values, data bars to deal counts, and a top-10% highlight rule to flag star performers.`,
     code:`' Colour Scale on Revenue values:
' 1. Select all revenue cells in a range (e.g. B2:E10)
' 2. Home → Conditional Formatting → Colour Scales
' 3. Choose Green-Yellow-Red (3-colour scale)
'    Green = highest  |  Red = lowest

' Data Bars on deal count column:
' 1. Select deal count cells
' 2. Home → CF → Data Bars → Blue gradient
'    Bar width proportional to value

' Top 10% rule — highlight outlier high performers:
' 1. Select revenue cells
' 2. Home → CF → Top/Bottom Rules → Top 10%
' 3. Choose Green Fill with Dark Green Text → OK

' Formula-based rule — flag any cell below target:
' 1. Home → CF → New Rule → Use Formula
' 2. Formula: =B2<50000
' 3. Choose Red fill → applies to all selected cells`,
     simulatedOutput:{type:'text',content:`Revenue cells:\n  $312,000  ← Deep green (highest)\n  $265,000  ← Mid green\n  $189,000  ← Yellow-green\n   $77,000  ← Orange\n   $43,000  ← Red (lowest)\n\nTop 10% cells get additional green border highlight.\nCells below $50,000 get red fill from formula rule.`},
     note:'Conditional formatting rules stack — a cell can have a colour scale AND a top-10% highlight simultaneously. Manage all rules via Home → CF → Manage Rules.',
     after:'The pivot table is now a self-coloured heatmap. Central/Hardware ($43k, red) and East/Software ($312k, dark green) are immediately visible without reading numbers. This is the fastest way to communicate data to non-analyst stakeholders.'}
  ],
  challenge:{
    title:'Quarterly Performance Dashboard',
    description:`Build a pivot table from the sales transactions data (SalesRep, Region, Quarter, DealSize, Status). Configure it with: SalesRep in Rows, Quarter in Columns, Sum of DealSize in Values. Add a slicer for Region. Apply a green-yellow-red colour scale to all value cells. Add a "Top 25%" highlight rule in bold. Then use GETPIVOTDATA to pull the Q2 total for "Alice" into a separate summary cell.`,
    hint:`PivotTable Analyze → Insert Slicer → Region. For CF: select values, Home → CF → Colour Scales → Green-Yellow-Red, then second rule Top/Bottom → Top 25% → Bold + green. GETPIVOTDATA("DealSize",$A$3,"SalesRep","Alice","Quarter","Q2")`,
    starterCode:`' Source: Transactions table (A:E)
' A: SalesRep | B: Region | C: Quarter | D: DealSize | E: Status

' Steps to complete:
' 1. Insert PivotTable from the Transactions table
' 2. Rows: SalesRep  |  Columns: Quarter  |  Values: Sum of DealSize
' 3. Insert Slicer for Region
' 4. Apply Green-Yellow-Red colour scale to all value cells
' 5. Add Top 25% rule: Bold + dark green text
' 6. In a separate cell, write GETPIVOTDATA to retrieve
'    Alice's Q2 total from the pivot:

=GETPIVOTDATA("DealSize", $A$3, "SalesRep", "Alice", "Quarter", "Q2")`,
    solution:`' There is no single formula for building the pivot (it is UI-driven).
' The key formula deliverable is GETPIVOTDATA:

=GETPIVOTDATA("DealSize", $A$3, "SalesRep", "Alice", "Quarter", "Q2")

' CF Rules applied to value cells (B5:E12 for example):
' Rule 1: Colour Scale — Green-Yellow-Red
' Rule 2: Top 25% — Format: Bold, Green text
' (via Home → CF → Top/Bottom Rules → Top 25%)

' Tip: Use "Stop If True" on the Top 25% rule if you want
' it to override the colour scale for top performers.`,
    explanation:`GETPIVOTDATA uses field names and values to locate the exact cell regardless of where Alice's row moves. The colour scale turns the pivot into a heatmap instantly. The Top 25% rule highlights exceptional quarters without manual scanning. Combined, these three features produce a presentation-ready summary table in minutes.`,
    successMessage:`Pivot tables and conditional formatting complete! These two tools together handle 80% of what managers ask for in Excel: "summarise it and make the patterns obvious." Every analyst needs these as second nature.`
  },
  insight:`Pivot tables were introduced in Excel 5.0 in 1993 and remain the fastest way to aggregate data in any spreadsheet tool. Conditional formatting colour scales are used in every investment banking model, every consulting deliverable, and every executive dashboard — because humans process colour faster than numbers.`
}

/* ═══════════════════════════════════════════════
   INTERMEDIATE  (lessons 5 – 8)
   ═══════════════════════════════════════════════ */

,{
  id:'excel-inter-1',
  language:'excel',
  level:'intermediate',
  order:5,
  title:'Power Query — Import, Clean & Merge',
  duration:'25 min',
  xp:120,
  scenario:`Your manager emails you a folder with three monthly sales exports from the ERP system. Each file has different column names — "Amt", "Amount", "Sale_Amt" — and some rows have nulls, extra spaces, and inconsistent date formats. She wants a single clean table refreshable every month with one click. You've been copying and pasting by hand. Not any more.`,
  objectives:['Connect Excel to a folder of CSV/XLSX files with Get & Transform','Rename and reorder columns in the Query Editor','Filter out null rows and trim whitespace','Append (stack) multiple queries into one master table','Refresh all data with one click'],
  terminology:[
    {term:'Power Query',definition:'A built-in Excel ETL engine (since 2016) that records every transformation step so you can replay them on new data without rewriting formulas.'},
    {term:'M Language',definition:'The functional language Power Query writes behind the scenes. You rarely write M directly — the UI generates it — but reading it helps debug complex queries.'},
    {term:'Applied Steps',definition:'The ordered list of transformations in the right panel of the Query Editor. Each step is one M expression and can be reordered, renamed, or deleted.'},
    {term:'Append Queries',definition:'Stacks two or more tables with the same columns on top of each other — equivalent to SQL UNION ALL.'},
    {term:'Merge Queries',definition:'Joins two tables on a key column — equivalent to SQL JOIN. Supports Left Outer, Inner, Right Outer, Full Outer, Left Anti, Right Anti.'},
    {term:'Query Refresh',definition:'Re-runs all Applied Steps against the current source data. Click Data → Refresh All or press Ctrl+Alt+F5.'}
  ],
  theory:`Power Query is hidden inside every copy of Excel 2016+ under Data → Get & Transform. It solves the #1 Excel pain point: when your source data changes, you normally redo all your cleanup work. Power Query records every step; a refresh replays them in seconds.

Key workflow:
1. Data → Get Data → From File/Folder
2. Transform in the Query Editor (no formulas, just clicks)
3. Close & Load to a worksheet table or the Data Model
4. Next month: Data → Refresh All

The Query Editor records your steps in M language automatically. You can see — and edit — the formula for each step in the Formula Bar.`,
  steps:[
    {title:'Open Power Query from a folder',code:`' 1. Put all three monthly CSV files in one folder
' 2. Data > Get Data > From File > From Folder
' 3. Browse to the folder, click OK
' 4. In the preview, click "Combine & Transform Data"
' Power Query opens with all files stacked automatically`,output:`Applied Steps (auto-created):
  Source
  Filter Hidden Files
  Invoke Custom Function
  Expand Table Column1`},
    {title:'Standardise column names',code:`' In the Query Editor:
' 1. Right-click the "Amt"/"Amount"/"Sale_Amt" header
'    → Rename → type "Revenue"
' 2. Repeat for other inconsistent columns
' 3. Drag columns to reorder them

' M code generated:
= Table.RenameColumns(#"Expanded Table Column1",
    {{"Amt","Revenue"},{"Sale_Amt","Revenue"},{"Amount","Revenue"}})`,output:`Applied Steps:
  ... (previous steps)
  Renamed Columns`},
    {title:'Remove nulls and trim whitespace',code:`' Filter nulls:
' Click the Revenue column dropdown → Number Filters → Not Equal To → null

' Trim text columns:
' Select the "Region" column → Transform tab → Format → Trim

' M equivalents:
= Table.SelectRows(Source, each [Revenue] <> null)
= Table.TransformColumns(Source, {{"Region", Text.Trim}})`,output:`Applied Steps:
  Filtered Rows
  Trimmed Text`},
    {title:'Append monthly queries into one master',code:`' If Power Query didn't auto-combine:
' Home → Append Queries → Append Queries as New
' Select Jan, Feb, Mar queries → OK

' M code:
= Table.Combine({Jan, Feb, Mar})`,output:`Row count: 1 247 rows (Jan: 412, Feb: 389, Mar: 446)`},
    {title:'Load to worksheet and test refresh',code:`' Home → Close & Load To…
' Choose "Table" in the existing worksheet

' To refresh next month (after adding Apr.csv to folder):
' Data → Refresh All   (or Ctrl+Alt+F5)`,output:`Table refreshed in 1.4 seconds.
New row count: 1 689 (+442 April rows)`}
  ],
  challenge:{
    prompt:`The merged table has a "SalesRep" column with values like " Alice Johnson " (leading/trailing spaces) and some rows have null SalesRep. Write the Power Query M steps to: (1) Trim the SalesRep column, and (2) replace null SalesRep with "Unknown".`,
    hint:`Use Table.TransformColumns with Text.Trim for step 1, and Table.ReplaceValue for step 2. Both are available in the Transform tab without writing M manually.`,
    solution:`' Step 1: Trim SalesRep
= Table.TransformColumns(#"Previous Step",
    {{"SalesRep", Text.Trim, type text}})

' Step 2: Replace null with "Unknown"
= Table.ReplaceValue(#"Trimmed Text",
    null, "Unknown",
    Replacer.ReplaceValue, {"SalesRep"})`,
    explanation:`Table.TransformColumns applies a function to every value in the named column(s). Text.Trim removes leading and trailing whitespace. Table.ReplaceValue with Replacer.ReplaceValue substitutes exact matches — here null — in the specified column. Both steps are recorded automatically when you use the UI.`
  },
  successMessage:`Power Query mastered! One-click monthly refresh is now in your toolkit. You've just automated work that used to take 30+ minutes of copy-pasting.`,
  insight:`Power Query is the most underused Excel feature. Analysts who know it report saving 2–5 hours per week on data preparation. Every step recorded in M means full auditability — a compliance requirement in many financial and regulated industries.`
}

,{
  id:'excel-inter-2',
  language:'excel',
  level:'intermediate',
  order:6,
  title:'Named Ranges, Data Validation & Dependent Dropdowns',
  duration:'20 min',
  xp:110,
  scenario:`You're building an order entry form for the warehouse team. They need to pick a Region from a dropdown, and then a second dropdown should only show the cities in that region. Without data validation your team enters typos, mixed cases, and invented city names daily. You need to lock it down — without locking them out.`,
  objectives:['Create named ranges for each list of values','Use INDIRECT() to reference named ranges by formula','Build a dynamic dependent (cascading) dropdown','Protect input cells outside the form area','Allow only valid entries with a custom error message'],
  terminology:[
    {term:'Named Range',definition:'A label assigned to a cell or range (e.g., "North_Cities"). Used in formulas instead of addresses like $A$2:$A$8. Managed in Formulas → Name Manager.'},
    {term:'Data Validation',definition:'A rule applied to a cell that restricts what values can be entered. Types: List, Whole Number, Decimal, Date, Text Length, Custom. Found in Data → Data Validation.'},
    {term:'INDIRECT()',definition:'Converts a text string into a real cell reference or named range at runtime. =INDIRECT("North_Cities") returns the range called North_Cities.'},
    {term:'Dependent Dropdown',definition:'A second dropdown whose list changes based on the value selected in a first dropdown. Built by combining a named range per region with INDIRECT().'},
    {term:'Sheet Protection',definition:'Locks cells against editing. Locked cells must have "Locked" checked AND the sheet must be protected (Review → Protect Sheet). Unlocked cells stay editable.'}
  ],
  theory:`Named ranges make formulas readable and maintainable. Instead of =VLOOKUP(A2,$F$2:$G$50,2,0) you write =VLOOKUP(A2,PriceList,2,0). When the source range moves, you update one name — not every formula.

Dependent dropdowns:
1. Create a named range per region — the name must match the text value in the first dropdown exactly (spaces → underscores).
2. In the second dropdown's Data Validation → Source, enter =INDIRECT(A2) where A2 holds the first selection.
3. Excel resolves the text string to the matching named range at runtime.

Rule: Named range names cannot contain spaces. Replace spaces with underscores.`,
  steps:[
    {title:'Build the region and city lists',code:`' On a "Lists" sheet set up:
' A1: Regions     B1: North        C1: South        D1: East
' A2: North       B2: Boston       C2: Atlanta      D2: New York
' A3: South       B3: Chicago      C3: Miami        D3: Philadelphia
' A4: East        B4: Minneapolis  C4: Nashville    D4: Baltimore`,output:`Lists sheet created with 3 regions, 3 cities each.`},
    {title:'Create named ranges',code:`' Select B2:B4 → Formulas → Define Name → "North"
' Select C2:C4 → Formulas → Define Name → "South"
' Select D2:D4 → Formulas → Define Name → "East"
' Select A2:A4 → Formulas → Define Name → "Regions"

' Verify in Formulas → Name Manager`,output:`Name Manager shows:
  East      ='Lists'!$D$2:$D$4
  North     ='Lists'!$B$2:$B$4
  Regions   ='Lists'!$A$2:$A$4
  South     ='Lists'!$C$2:$C$4`},
    {title:'Create the Region dropdown (cell B2 of Form sheet)',code:`' Select cell B2 on the Form sheet
' Data → Data Validation
'   Allow: List
'   Source: =Regions
'   Error Alert tab:
'     Style: Stop
'     Title: Invalid Region
'     Message: Please select a region from the dropdown.
' Click OK`,output:`Cell B2: dropdown shows North / South / East`},
    {title:'Create the dependent City dropdown (cell B3)',code:`' Select cell B3
' Data → Data Validation
'   Allow: List
'   Source: =INDIRECT(B2)
'   ✓ Ignore blank
' Click OK

' Test: Pick "North" in B2 → B3 shows Boston/Chicago/Minneapolis
'       Pick "South" in B2 → B3 shows Atlanta/Miami/Nashville`,output:`Cascading dropdown working correctly.
Selecting "East" in B2 populates B3 with New York/Philadelphia/Baltimore.`},
    {title:'Protect the sheet, leave input cells unlocked',code:`' Select ALL cells → Ctrl+1 → Protection tab → ✓ Locked
' Select only the input cells (B2, B3, B5, B6 etc.)
'   → Ctrl+1 → Protection tab → ✗ UNCHECK Locked
' Review → Protect Sheet → enter a password → OK
' Non-input cells are now read-only; input cells stay editable`,output:`Sheet protected. Clicking a non-input cell shows:
"The cell or chart you're trying to change is on a protected sheet."`}
  ],
  challenge:{
    prompt:`The warehouse team wants a third dependent dropdown: after selecting a City, they should see only the warehouses in that city. There are 2 warehouses per city (6 named ranges total). How do you set it up if the city names contain spaces (e.g., "New York")?`,
    hint:`Named ranges can't have spaces. Replace spaces with underscores in the range names (New_York). The INDIRECT formula in the third cell should reference the City cell — but you also need to replace spaces: =INDIRECT(SUBSTITUTE(B3," ","_"))`,
    solution:`' 1. Create named ranges:
'    New_York, Philadelphia, Baltimore, Boston, Chicago, Minneapolis, etc.
'    (one per city, 2 warehouse values each)
'
' 2. In cell B4 (Warehouse dropdown):
'    Data Validation → List → Source:
'    =INDIRECT(SUBSTITUTE(B3," ","_"))
'
' SUBSTITUTE(B3," ","_") converts "New York" → "New_York"
' INDIRECT then resolves "New_York" to the named range`,
    explanation:`SUBSTITUTE replaces all spaces in the city name with underscores before INDIRECT tries to find the named range. This is the standard pattern for dependent dropdowns when values contain spaces. The three-level cascade (Region → City → Warehouse) uses the same INDIRECT+SUBSTITUTE technique at each level.`
  },
  successMessage:`Dependent dropdowns done! Your order entry form now enforces clean data automatically — no more typos, no more mixed-case city names.`,
  insight:`Data validation with INDIRECT is used extensively in financial models, HR forms, and logistics dashboards across enterprises. The pattern scales to as many levels as needed. Named ranges also appear in VLOOKUP, SUMIFS, and structured table references — learning them pays dividends across the entire workbook.`
}

,{
  id:'excel-inter-3',
  language:'excel',
  level:'intermediate',
  order:7,
  title:'Advanced Charting — Combo Charts, Sparklines & Dynamic Titles',
  duration:'22 min',
  xp:115,
  scenario:`You're presenting monthly revenue and headcount to the executive team. Revenue is in millions; headcount is in dozens. A single axis makes one series invisible. Your director wants the chart title to automatically reflect the date range shown, and she wants sparklines in the summary table so she can spot trends without opening a separate chart. You have 30 minutes before the meeting.`,
  objectives:['Build a combo chart with primary and secondary axes','Format axis scales independently for two series','Add dynamic chart title referencing a cell formula','Insert column and line sparklines into a summary table','Use sparkline axis options to make trends comparable'],
  terminology:[
    {term:'Combo Chart',definition:'A single chart that uses two different chart types (e.g., clustered column + line) on the same plot area. Each series can use a primary or secondary vertical axis.'},
    {term:'Secondary Axis',definition:'A second vertical (Y) axis on the right side of a chart, used when two series have very different scales. Each axis scales independently.'},
    {term:'Sparkline',definition:'A tiny, word-sized chart embedded in a single cell. Types: Line, Column, Win/Loss. Used in dashboards to show trends inline with data.'},
    {term:'Dynamic Chart Title',definition:`A chart title linked to a cell. When the cell changes (e.g., via a formula), the chart title updates automatically. Set by selecting the title and typing = in the formula bar, then clicking the source cell.`},
    {term:'Axis Bounds',definition:'The minimum and maximum values on an axis. Setting them manually (Format Axis → Bounds) prevents Excel from rescaling when data changes, keeping charts visually consistent across updates.'}
  ],
  theory:`Combo charts solve the dual-scale problem. The default chart type in Excel maps all series to one axis — if Revenue is 4,200,000 and Headcount is 42, headcount appears as a flat line at zero. Assigning headcount to a secondary axis gives it its own scale.

Dynamic chart titles prevent stale slide decks. Link the title to a cell that contains a TEXT formula:
  =TEXT(MIN(DateRange),"mmm yyyy")&" – "&TEXT(MAX(DateRange),"mmm yyyy")
The title updates every time the data refreshes.

Sparklines live in cells, not on a drawing layer, so they move and resize with the row/column. They support axis scaling: "Same for all sparklines" makes bars comparable across rows.`,
  steps:[
    {title:'Insert a Clustered Column chart',code:`' Select A1:C13 (Month, Revenue, Headcount)
' Insert → Charts → Clustered Column
' Result: Revenue bars are huge; Headcount bars are invisible`,output:`Chart inserted. Headcount barely visible above x-axis.`},
    {title:'Convert Headcount series to Line on Secondary Axis',code:`' Right-click the Headcount series → Change Series Chart Type
' In the dialog:
'   Revenue:    Clustered Column  |  Primary axis
'   Headcount:  Line              |  ✓ Secondary Axis
' Click OK`,output:`Right Y-axis added (0–60 scale).
Left Y-axis shows 0–5,000,000.
Both series now clearly visible.`},
    {title:'Format axis scales and add axis titles',code:`' Right-click left axis → Format Axis
'   Bounds: Min 0, Max 6000000
'   Number → Custom → #,##0,,"M"   (shows 5M instead of 5,000,000)

' Right-click right axis → Format Axis
'   Bounds: Min 0, Max 80

' Chart Design → Add Chart Element → Axis Titles
'   Primary Vertical: "Revenue"
'   Secondary Vertical: "Headcount"`,output:`Left axis: 0M, 1M, 2M, 3M, 4M, 5M, 6M
Right axis: 0, 20, 40, 60, 80`},
    {title:'Add a dynamic chart title',code:`' In cell F1 enter:
=TEXT(MIN(A2:A13),"mmm yyyy")&" – "&TEXT(MAX(A2:A13),"mmm yyyy")

' Click once on the chart title to select the title box
' In the formula bar type:  =Sheet1!$F$1
' Press Enter

' Now extend the data to add Jan 2026 — the title updates automatically`,output:`Chart title: "Jan 2025 – Dec 2025"
After adding Jan 2026: "Jan 2025 – Jan 2026"`},
    {title:'Add sparklines next to summary table',code:`' Select E2:E13 (cells next to monthly summary rows)
' Insert → Sparklines → Column
'   Data Range: B2:B13   Location Range: E2:E13
' Sparkline Design → Axis → Vertical Axis Minimum: Same for All Sparklines
' Sparkline Design → Axis → Vertical Axis Maximum: Same for All Sparklines
' Highlight High Point: ✓ (marks the peak month)`,output:`Column sparklines in column E show monthly revenue distribution.
Peak month highlighted in a different colour.`}
  ],
  challenge:{
    prompt:`Your VP asks for a "Win/Loss" sparkline in column F that shows whether each month beat the prior month (Win) or fell short (Loss). The source data is the same revenue column B2:B13. How do you create this, and what kind of data does Win/Loss sparkline expect?`,
    hint:`Win/Loss sparklines don't show magnitude — they only show positive (win) vs. negative (loss). You'll need a helper column that calculates the month-over-month change: =B3-B2, =B4-B3, etc. The Win/Loss sparkline plots positive values as up-bars and negatives as down-bars.`,
    solution:`' Helper column G (MoM Change):
' G2: (blank — no prior month)
' G3: =B3-B2
' G4: =B4-B3
' ... down to G13: =B13-B12

' Select F3:F13 → Insert → Sparklines → Win/Loss
'   Data Range: G3:G13
'   Location Range: F3:F13
' Sparkline Design → Style → pick a colour pairing

' Up-bars = months that grew; Down-bars = months that shrank`,
    explanation:`Win/Loss sparklines encode only the sign of the value, not its magnitude. They are ideal for showing streaks (did we beat the prior period?) rather than scale. Creating a MoM delta column first converts the absolute revenue into the +/- values the sparkline needs.`
  },
  successMessage:`Combo charts and sparklines complete! Your executive deck now self-updates and communicates trends in less space than a full chart.`,
  insight:`Dynamic chart titles became possible when Excel allowed formula bar input on selected chart elements, introduced in Excel 2013. Finance teams use combo charts extensively for margin/volume, yield/rate, and price/volume analyses where two series with incompatible scales must share one plot.`
}

,{
  id:'excel-inter-4',
  language:'excel',
  level:'intermediate',
  order:8,
  title:'TEXT Functions — TEXTJOIN, TEXTSPLIT, LEFT/MID/RIGHT & Date Parsing',
  duration:'20 min',
  xp:110,
  scenario:`The HR system exports employee IDs as "EMP-2024-001", full names as "Johnson, Alice M." and hire dates as the text "01/15/2024". None of these are in a format Excel can sort, look up, or calculate with directly. You need to extract the year from the ID, reverse the name to "Alice Johnson", and convert the text dates into real serial dates — all using formulas so the transformations update automatically when the feed refreshes.`,
  objectives:['Split delimited text into parts with TEXTSPLIT (or LEFT/MID/FIND for older Excel)','Reassemble parts in a different order with TEXTJOIN','Extract substrings with LEFT, MID, RIGHT','Parse text dates into real Excel dates with DATEVALUE and DATE','Use TEXT() to format numbers and dates for display'],
  terminology:[
    {term:'TEXTSPLIT()',definition:'Splits a text string into an array by a delimiter. =TEXTSPLIT("a,b,c",",") returns {"a","b","c"}. Excel 365 / 2021+ only.'},
    {term:'TEXTJOIN()',definition:'Joins multiple values with a delimiter, optionally ignoring empty cells. =TEXTJOIN(", ",TRUE,A2:A10). Available from Excel 2019+.'},
    {term:'FIND() vs SEARCH()',definition:'Both return the position of a substring. FIND is case-sensitive; SEARCH supports wildcards. =FIND(",","Johnson, Alice") returns 8.'},
    {term:'MID(text, start, chars)',definition:'Returns a substring starting at position start for chars characters. =MID("EMP-2024-001",5,4) returns "2024".'},
    {term:'DATEVALUE()',definition:'Converts a date stored as text (in a recognisable format) into an Excel date serial number so you can do date arithmetic on it.'},
    {term:'TEXT(value, format)',definition:'Formats a number or date as text using format codes. =TEXT(TODAY(),"yyyy-mm-dd") returns "2025-07-11". Opposite of DATEVALUE.'}
  ],
  theory:`Excel formulas only work on their data type. If a date looks like "01/15/2024" but is stored as text, DATEDIF, NETWORKDAYS, and sorting all fail silently. Converting text to real types is always step one.

LEFT/MID/RIGHT + FIND pattern:
- Position of delimiter: pos = FIND(delimiter, text)
- Text before it: LEFT(text, pos-1)
- Text after it: MID(text, pos+1, LEN(text))

TEXTSPLIT (365+) replaces this entirely for simple cases.

TEXTJOIN is the modern replacement for concatenation chains: instead of =A2&", "&B2&", "&C2 you write =TEXTJOIN(", ",TRUE,A2:C2) — and it automatically skips blanks when the second argument is TRUE.`,
  steps:[
    {title:'Extract the year from Employee ID',code:`' Employee ID in A2: "EMP-2024-001"
' Year is always characters 5-8

=MID(A2, 5, 4)              ' → "2024" (text)
=VALUE(MID(A2, 5, 4))       ' → 2024  (number, for calculations)

' For variable-length IDs, use FIND to locate dashes:
=MID(A2, FIND("-",A2)+1, FIND("-",A2,FIND("-",A2)+1)-FIND("-",A2)-1)`,output:`2024`},
    {title:'Reverse "Last, First M." to "First Last"',code:`' Name in B2: "Johnson, Alice M."
' Step 1 — find the comma position
= FIND(",", B2)                        ' → 8

' Step 2 — extract Last name
= LEFT(B2, FIND(",",B2)-1)             ' → "Johnson"

' Step 3 — extract everything after ", " (first name + middle initial)
= TRIM(MID(B2, FIND(",",B2)+2, LEN(B2)))  ' → "Alice M."

' Step 4 — extract just the first name (before the space)
= LEFT(TRIM(MID(B2,FIND(",",B2)+2,LEN(B2))),
       FIND(" ",TRIM(MID(B2,FIND(",",B2)+2,LEN(B2))))-1)   ' → "Alice"

' Step 5 — assemble "First Last"
= TRIM(LEFT(TRIM(MID(B2,FIND(",",B2)+2,LEN(B2))),
            FIND(" ",TRIM(MID(B2,FIND(",",B2)+2,LEN(B2)))&" ")-1))
  &" "&LEFT(B2,FIND(",",B2)-1)          ' → "Alice Johnson"`,output:`Alice Johnson`},
    {title:'Same reversal with TEXTSPLIT + TEXTJOIN (Excel 365)',code:`' B2: "Johnson, Alice M."
' Split by ", "  →  {"Johnson","Alice M."}
= TEXTSPLIT(B2, ", ")

' Reverse: take index 2 first name word, then index 1 last name
= TEXTJOIN(" ", TRUE,
    LEFT(INDEX(TEXTSPLIT(B2,", "),2),         ' "Alice"
         FIND(" ",INDEX(TEXTSPLIT(B2,", "),2)&" ")-1),
    INDEX(TEXTSPLIT(B2,", "),1))              ' "Johnson"`,output:`Alice Johnson`},
    {title:'Convert text date to a real Excel date',code:`' C2 contains text: "01/15/2024"
' DATEVALUE converts US-format text dates
= DATEVALUE(C2)               ' → 45306  (serial number)

' Format the result as a date: Ctrl+1 → Date → Short Date
' → displays 1/15/2024

' For non-standard text like "2024.01.15":
= DATE(LEFT(C2,4), MID(C2,6,2), RIGHT(C2,2))
' LEFT(C2,4)="2024", MID(C2,6,2)="01", RIGHT(C2,2)="15"`,output:`1/15/2024  (stored as serial 45306, participates in date math)`},
    {title:'Format outputs for a report with TEXT()',code:`' Serial date → readable string
= TEXT(DATEVALUE(C2), "dddd, mmmm d yyyy")   ' → "Monday, January 15 2024"

' Number with units
= TEXT(D2/1000000, "0.00")&"M"              ' → "4.23M"

' Pad employee number to 6 digits
= TEXT(VALUE(RIGHT(A2,3)), "000000")         ' → "000001"`,output:`Monday, January 15 2024
4.23M
000001`}
  ],
  challenge:{
    prompt:`Column E contains product codes in the format "CAT-PROD-SIZE" (e.g., "ELEC-TV55-LG"). You need to extract all three parts into separate columns using TEXTSPLIT (for 365 users) and also the LEFT/MID/RIGHT approach for compatibility. Then use TEXTJOIN to reassemble them as "SIZE | PROD | CAT" (reversed order, " | " delimiter).`,
    hint:`For TEXTSPLIT: =TEXTSPLIT(E2,"-") returns an array. Use INDEX(...,1), INDEX(...,2), INDEX(...,3) to extract each part. For the legacy approach, find the two dash positions with FIND and a nested FIND starting after the first dash. For TEXTJOIN: =TEXTJOIN(" | ",TRUE, size, prod, cat).`,
    solution:`' TEXTSPLIT approach (365+)
=INDEX(TEXTSPLIT(E2,"-"),1)   ' CAT  → "ELEC"
=INDEX(TEXTSPLIT(E2,"-"),2)   ' PROD → "TV55"
=INDEX(TEXTSPLIT(E2,"-"),3)   ' SIZE → "LG"

' Legacy approach
pos1 = FIND("-",E2)                            ' 5
pos2 = FIND("-",E2,pos1+1)                     ' 10
=LEFT(E2,pos1-1)                               ' "ELEC"
=MID(E2,pos1+1,pos2-pos1-1)                    ' "TV55"
=RIGHT(E2,LEN(E2)-pos2)                        ' "LG"

' Reassemble reversed with TEXTJOIN
=TEXTJOIN(" | ",TRUE,
    RIGHT(E2,LEN(E2)-pos2),          ' SIZE
    MID(E2,pos1+1,pos2-pos1-1),      ' PROD
    LEFT(E2,pos1-1))                 ' CAT
' → "LG | TV55 | ELEC"`,
    explanation:`TEXTSPLIT with INDEX is cleaner but requires Excel 365/2021+. The legacy LEFT/MID/RIGHT + FIND pattern works in all versions back to Excel 2007. TEXTJOIN accepts array results or individual cell references. Reversing the order simply means listing the part variables in reverse sequence inside TEXTJOIN.`
  },
  successMessage:`Text functions mastered! You can now parse almost any messy imported string and reassemble it exactly as needed — no Power Query required for one-off transformations.`,
  insight:`Text manipulation is the most frequent task after filtering and aggregation in corporate Excel work. Every HR system, ERP export, and legacy database outputs data in formats Excel can't natively sort or calculate. LEFT/MID/FIND and the newer TEXTSPLIT/TEXTJOIN duo handle 95% of real-world string cleaning without needing VBA.`
}

]; // end EXCEL_LESSONS (Basic 1-4, Intermediate 5-8)
// Advanced lessons will be appended in Stage 3.

/* ═══════════════════════════════════════════════
   ADVANCED  (lessons 9 – 12)
   ═══════════════════════════════════════════════ */

EXCEL_LESSONS.push(

{
  id:'excel-adv-1',
  language:'excel',
  level:'advanced',
  order:9,
  title:'Power Pivot & DAX — Data Model, Relationships & Measures',
  duration:'30 min',
  xp:160,
  scenario:`Your company's sales database has three tables: Sales (500k rows), Products (2 000 rows), and Regions (50 rows). A regular pivot table can only use one table at a time, forcing you to VLOOKUP everything into a single flat table — a 500k-row monster that crashes Excel. Power Pivot lets you load all three tables into a compressed Data Model, draw relationships between them, and write calculated measures that aggregate across relationships without any VLOOKUPs.`,
  objectives:['Load multiple tables into the Excel Data Model via Power Pivot','Define a relationship between tables on a key column','Write a basic DAX measure with CALCULATE and FILTER','Use a Data Model pivot table to slice across related tables','Understand the difference between a calculated column and a measure'],
  terminology:[
    {term:'Power Pivot',definition:'An Excel add-in that loads data into a compressed in-memory engine (xVelocity columnar). Can handle hundreds of millions of rows. Accessed via the Power Pivot tab (enable in File → Options → Add-ins → COM Add-ins).'},
    {term:'Data Model',definition:"Excel's shared analytical storage layer. When you add a table to the Data Model, it's available to all pivot tables and Power Query queries in the workbook, and relationships can be defined between tables."},
    {term:'DAX',definition:'Data Analysis Expressions — the formula language for Power Pivot and Power BI. Designed for relational table calculations, not cell-reference calculations like regular Excel formulas.'},
    {term:'Measure',definition:'A DAX formula that calculates a value at query time, aggregating the filtered data shown in the pivot. Unlike calculated columns, measures are computed on demand and respect all slicer/filter context.'},
    {term:'CALCULATE()',definition:'The most important DAX function. Evaluates an expression in a modified filter context. =CALCULATE(SUM(Sales[Revenue]), Products[Category]="Electronics") sums revenue for electronics only.'},
    {term:'Filter Context',definition:'The set of filters active when a DAX expression is evaluated — determined by the pivot row/column labels, slicers, and any CALCULATE overrides. Understanding filter context is the key to writing correct DAX.'}
  ],
  theory:`Regular Excel formulas calculate left-to-right across cells. DAX calculates down columns in tables, respecting relationships between tables. The mental shift: stop thinking about cell addresses, start thinking about table[column] references.

Three core Data Model concepts:
1. Relationships — a one-to-many link between a key column in one table and a foreign key in another (like a SQL JOIN, but defined once and used by every pivot).
2. Measures — aggregations (SUM, AVERAGE, COUNT, DISTINCTCOUNT) that auto-filter to whatever is on the pivot. Write them in the Measure Grid.
3. Calculated Columns — row-by-row DAX formulas stored in the table (like a helper column, but in the compressed engine).

When to use Power Pivot vs regular formulas: any time you need aggregations across more than one table, or you have more than ~100k rows.`,
  steps:[
    {title:'Enable Power Pivot and load tables into the Data Model',code:`' File → Options → Add-ins → COM Add-ins → ✓ Microsoft Power Pivot for Excel
' A new "Power Pivot" tab appears in the ribbon

' For each table (Sales, Products, Regions):
' 1. Click inside the table
' 2. Power Pivot tab → Add to Data Model
' Data Model now holds all three tables — no VLOOKUPs needed`,output:`Power Pivot window shows three table tabs:
  Sales      (500 000 rows)
  Products   (2 000 rows)
  Regions    (50 rows)`},
    {title:'Create relationships between tables',code:`' Power Pivot window → Diagram View
' Drag Sales[ProductID]  →  Products[ProductID]   (many-to-one)
' Drag Sales[RegionCode] →  Regions[RegionCode]   (many-to-one)

' Or use Design tab → Manage Relationships → Create New
'   Table 1: Sales     Column: ProductID
'   Table 2: Products  Column: ProductID
'   Cardinality: Many to One`,output:`Diagram View shows:
  Sales ────< Products   (ProductID)
  Sales ────< Regions    (RegionCode)`},
    {title:'Write your first DAX measure',code:`' In the Power Pivot window, click below the Sales table data
' in the Measures Grid → type:

Total Revenue:=SUM(Sales[Revenue])

' Implicit measure (auto-created by dragging Revenue to pivot Values)
' is equivalent but DAX explicitly written is best practice

' More useful:
Avg Order Value:=DIVIDE(SUM(Sales[Revenue]), COUNTROWS(Sales))
' DIVIDE(numerator, denominator) returns BLANK instead of error on /0`,output:`Measure pane shows:
  Total Revenue    [implicit]
  Avg Order Value  = 247.83`},
    {title:'Use CALCULATE with a filter',code:`' Electronics Revenue:
Electronics Revenue:=
  CALCULATE(
    SUM(Sales[Revenue]),
    Products[Category] = "Electronics"
  )

' YTD Revenue (using built-in time intelligence):
YTD Revenue:=
  CALCULATE(
    SUM(Sales[Revenue]),
    DATESYTD(Sales[OrderDate])
  )

' These measures respect all other pivot filters simultaneously`,output:`In pivot:
  Region    | Total Revenue | Electronics Revenue
  North     | $1,240,000    | $487,000
  South     | $980,000      | $312,000`},
    {title:'Build a Data Model pivot table',code:`' Insert → PivotTable → ✓ Use this workbook's Data Model
' In the field list you now see ALL three tables
' Drag:
'   Rows:    Regions[RegionName]
'   Columns: Products[Category]
'   Values:  Total Revenue (measures section)
'   Slicer:  Sales[Year]

' The pivot JOIN is handled by the relationships — no flat file needed`,output:`Pivot table:
            | Electronics | Furniture | Clothing
  North     |  $487,000   | $310,000  | $443,000
  South     |  $312,000   | $218,000  | $450,000
  East      |  $601,000   | $275,000  | $364,000`}
  ],
  challenge:{
    prompt:`Write a DAX measure called "High Value Orders" that counts the number of Sales rows where Revenue > 1000. Then write a second measure "High Value %" that expresses this as a percentage of total orders, formatted to one decimal place.`,
    hint:`Use CALCULATE with FILTER or a boolean condition for the count. For the percentage, divide the two measures using DIVIDE and multiply by 100. FORMAT() can apply number formatting inside DAX, though formatting is often better applied in the pivot table itself.`,
    solution:`High Value Orders:=
  CALCULATE(
    COUNTROWS(Sales),
    Sales[Revenue] > 1000
  )

High Value %:=
  DIVIDE(
    [High Value Orders],
    COUNTROWS(Sales),
    0       ' return 0 instead of BLANK on zero denominator
  ) * 100

' In the pivot, format "High Value %" as Number with 1 decimal`,
    explanation:`CALCULATE with a numeric condition (Sales[Revenue] > 1000) automatically filters the Sales table to rows where the condition is TRUE before COUNTROWS counts them. DIVIDE is always preferred over / in DAX because it gracefully handles division-by-zero. Multiplying by 100 converts the decimal fraction to a percentage value — then format the pivot cell to show "%" if you want the symbol.`
  },
  successMessage:`Power Pivot and DAX unlocked! You can now analyse million-row datasets across multiple tables without VLOOKUP, without flat files, and without crashing Excel.`,
  insight:`Power Pivot uses the same xVelocity columnar engine as Azure Analysis Services and the on-premises SQL Server Analysis Services Tabular mode. A Power Pivot workbook is effectively a small, self-contained OLAP cube. DAX was created by the same team that built SQL Server Analysis Services and was later used as the formula language for Power BI — skills transfer directly.`
},

{
  id:'excel-adv-2',
  language:'excel',
  level:'advanced',
  order:10,
  title:'LAMBDA & LET — Custom Functions and Named Calculations',
  duration:'25 min',
  xp:150,
  scenario:`You have a formula that calculates a risk-adjusted return: (Return - RiskFreeRate) / StdDev — the Sharpe Ratio. You need it in 40 cells across 8 sheets. Every time it appears you copy a 60-character formula and change the cell references. When the method changes you update 40 formulas manually. LAMBDA lets you define SharpeRatio(return, riskFree, stdDev) once in the Name Manager and call it everywhere, forever, just like a built-in function.`,
  objectives:['Write a LAMBDA function and name it in the Name Manager','Use LET() to name intermediate calculations and simplify a formula','Nest LAMBDA inside MAP(), REDUCE(), SCAN() for array-level operations','Understand recursion in LAMBDA','Handle optional parameters with IF(ISOMITTED())'],
  terminology:[
    {term:'LAMBDA()',definition:'Defines a custom reusable function directly in Excel without VBA. Syntax: =LAMBDA(param1, param2, ..., formula). Must be named in Name Manager to be called by name.'},
    {term:'LET()',definition:'Assigns names to intermediate results within a single formula, eliminating repetition. =LET(x, A1+B1, y, x*2, x+y) evaluates x once and reuses it. Like a local variable in code.'},
    {term:'Name Manager',definition:'Formulas → Name Manager. Stores named ranges, constants, and LAMBDA functions. LAMBDAs saved here become custom worksheet functions available on any sheet in the workbook.'},
    {term:'MAP()',definition:'Applies a LAMBDA to each element of an array and returns an array of the same shape. =MAP(A1:A10, LAMBDA(x, x^2)) returns the square of each value.'},
    {term:'REDUCE()',definition:'Accumulates an array into a single value using a LAMBDA. =REDUCE(0, A1:A10, LAMBDA(acc, x, acc+x)) sums the array (same as SUM, but extensible).'},
    {term:'ISOMITTED()',definition:'Returns TRUE if an optional LAMBDA parameter was not supplied. Used to provide default values: =IF(ISOMITTED(p), defaultValue, p).'}
  ],
  theory:`LAMBDA converts Excel from a grid of formulas into a programming environment. Before LAMBDA (added in Excel 365, 2021), reusable logic required either VBA functions or copy-pasting long formulas everywhere.

LET solves the readability problem: if a formula uses the same sub-expression five times, LET computes it once, names it, and reuses the name. This is both faster (Excel evaluates it once) and far easier to audit.

LAMBDA + Name Manager pattern:
1. Write and test the formula as a regular cell formula
2. Wrap it in LAMBDA(p1, p2, ..., formula)
3. Open Formulas → Name Manager → New → paste the LAMBDA as the "Refers to" value
4. Call it by name anywhere: =SharpeRatio(C2, 0.02, D2)

MAP/REDUCE/SCAN apply a LAMBDA across arrays — replacing many ArrayFormula patterns with readable, named operations.`,
  steps:[
    {title:'Write and test a Sharpe Ratio formula with LET',code:`' Without LET (hard to read, repeats sub-expressions):
= (B2 - 0.02) / STDEV(B2:B13)

' With LET (readable, calculated once):
= LET(
    annualReturn,  B2,
    riskFreeRate,  0.02,
    stdDev,        STDEV(B$2:B$13),
    (annualReturn - riskFreeRate) / stdDev
  )`,output:`0.847  (Sharpe Ratio for asset in column B)`},
    {title:'Promote it to a named LAMBDA function',code:`' 1. Open Formulas → Name Manager → New
' 2. Name: SharpeRatio
' 3. Comment: (annualReturn - riskFree) / stdDev
' 4. Refers to:
=LAMBDA(annualReturn, riskFree, stdDev,
  (annualReturn - riskFree) / stdDev
)
' 5. Click OK

' Now call it on any sheet:
= SharpeRatio(B2, 0.02, STDEV(B$2:B$13))`,output:`0.847  (same result, readable formula)`},
    {title:'Add an optional parameter with ISOMITTED',code:`' Allow the caller to omit riskFree — default to 0.02
=LAMBDA(annualReturn, stdDev, [riskFree],
  LET(
    rf, IF(ISOMITTED(riskFree), 0.02, riskFree),
    (annualReturn - rf) / stdDev
  )
)

' Call with default risk-free rate:
= SharpeRatio(B2, STDEV(B$2:B$13))

' Call with explicit rate:
= SharpeRatio(B2, STDEV(B$2:B$13), 0.035)`,output:`With default (2%): 0.847
With 3.5% rate:  0.621`},
    {title:'Apply a LAMBDA across an array with MAP',code:`' Categorise each score in A2:A11 as Pass/Fail
' Grade threshold: 60

= MAP(A2:A11, LAMBDA(score,
    IF(score >= 60, "Pass", "Fail")
  ))

' Result: spills 10 values into B2:B11 automatically
' Same as IF(A2:A11>=60,"Pass","Fail") but the logic is now named and reusable`,output:`Pass
Fail
Pass
Pass
Fail
...`},
    {title:'Accumulate a running total with SCAN',code:`' SCAN(initialValue, array, LAMBDA(accumulator, currentValue, expression))
' returns an array of intermediate accumulated values

= SCAN(0, C2:C13, LAMBDA(acc, rev,
    acc + rev
  ))

' Returns running cumulative revenue Jan through Dec`,output:`Jan:  412,000
Feb:  801,000
Mar: 1,247,000
...
Dec: 4,823,000`}
  ],
  challenge:{
    prompt:`Write a LAMBDA named "Winsorize" that takes an array of values and a percentile threshold (e.g., 0.05 for 5th / 95th), and caps extreme values: anything below the 5th percentile is replaced with the 5th percentile value; anything above the 95th is replaced with the 95th. Use MAP to apply the capping logic to each element.`,
    hint:`Use PERCENTILE.INC(array, threshold) for the lower bound and PERCENTILE.INC(array, 1-threshold) for the upper bound. Capture these with LET. Then use MAP over the array and MIN(MAX(x, lowerBound), upperBound) to clamp each value.`,
    solution:`=LAMBDA(values, threshold,
  LET(
    lo, PERCENTILE.INC(values, threshold),
    hi, PERCENTILE.INC(values, 1 - threshold),
    MAP(values, LAMBDA(x,
      MIN(MAX(x, lo), hi)
    ))
  )
)

' Name it "Winsorize" in Name Manager.
' Call: =Winsorize(A2:A100, 0.05)`,
    explanation:`LET captures the percentile bounds once — important because PERCENTILE.INC is computed from the entire array, not per-element. MAP then applies the capping lambda to each individual element. MIN(MAX(x, lo), hi) is the classic clamp pattern: MAX enforces the floor, MIN enforces the ceiling. Winsorization is standard in finance and statistics for reducing the effect of outliers without removing data.`
  },
  successMessage:`LAMBDA and LET mastered! You've just given Excel a programming capability previously reserved for VBA. Your formulas are now reusable, named, and self-documenting.`,
  insight:`LAMBDA was the most-requested Excel feature for over a decade before Microsoft implemented it in 2021. It closes the gap between Excel and proper programming languages by introducing first-class functions. The MAP/REDUCE/SCAN family, added alongside LAMBDA, brings functional programming idioms to the spreadsheet — concepts directly transferable to Python, JavaScript, and SQL's WINDOW functions.`
},

{
  id:'excel-adv-3',
  language:'excel',
  level:'advanced',
  order:11,
  title:'VBA Macro Basics — Record, Edit & Automate Repetitive Tasks',
  duration:'28 min',
  xp:145,
  scenario:`Every Monday morning you open 12 regional sales files, copy the "Summary" tab from each into a master workbook, format the headers, apply the company colour scheme, and delete the source files' connections. It takes 90 minutes. Your colleague uses a VBA macro that does it in 4 seconds. Today you learn to write it.`,
  objectives:['Enable the Developer tab and understand the VBA Editor (VBE)','Record a macro and read the generated VBA code','Edit recorded code to remove hard-coded addresses','Write a For Each loop to process multiple sheets or files','Handle a basic runtime error with On Error Resume Next'],
  terminology:[
    {term:'VBA',definition:'Visual Basic for Applications — the macro language embedded in all Microsoft Office applications. Procedural, event-driven, and object-oriented. Runs inside the host application (Excel), not as a standalone program.'},
    {term:'Sub / End Sub',definition:'Defines a macro (procedure) in VBA. Sub MacroName() … End Sub. Subs can be called from other subs, assigned to buttons, or run from the Macros dialog (Alt+F8).'},
    {term:'Range Object',definition:"Excel's primary object for addressing cells. Range(\"A1\"), Range(\"A1:C10\"), Cells(1,1), ActiveCell. Most spreadsheet operations go through Range."},
    {term:'Worksheet / Workbook Objects',definition:'Worksheets(\"Summary\") or ActiveSheet to reference sheets; Workbooks.Open(path) or ActiveWorkbook for files. The Excel Object Model hierarchy: Application → Workbook → Worksheet → Range.'},
    {term:'For Each Loop',definition:'Iterates over every object in a collection. For Each ws In ThisWorkbook.Worksheets … Next ws processes every sheet. More robust than a counter-based For loop because it handles collection size changes.'},
    {term:'On Error Resume Next',definition:"Tells VBA to skip to the next line if an error occurs, instead of stopping and showing an error dialog. Use sparingly and always reset with On Error GoTo 0 after the risky block."}
  ],
  theory:`VBA operates on the Excel Object Model — a hierarchy of objects. Almost everything you do in Excel maps to a VBA statement:

  Click cell A1           →  Range("A1").Select
  Type a value            →  Range("A1").Value = "Hello"
  Format bold             →  Range("A1").Font.Bold = True
  Add a sheet             →  Worksheets.Add
  Open a file             →  Workbooks.Open "C:\\data\\sales.xlsx"

The fastest way to learn VBA is:
1. Turn on the macro recorder (Developer → Record Macro)
2. Do what you want to automate manually
3. Stop recording
4. Open the VBE (Alt+F11) and read what Excel wrote
5. Generalise the recorded code (remove hard-coded addresses, add loops)

Security note: Macros are disabled by default. Enable them only in files you created or trust. Never enable macros in files from unknown sources — macro viruses are real.`,
  steps:[
    {title:'Enable Developer tab and record a formatting macro',code:`' File → Options → Customize Ribbon → ✓ Developer → OK

' Developer tab → Record Macro
'   Macro name: FormatSummaryHeader
'   Store in: This Workbook
'   Shortcut: Ctrl+Shift+H
' Click OK — recording starts

' Now manually:
'   Select A1:F1
'   Fill color: company blue (#1565C0)
'   Font color: White, Bold, size 12
'   Apply borders

' Developer → Stop Recording`,output:`Macro recorded. Check Developer → Macros → Edit to see VBA.`},
    {title:'Read and clean the recorded code',code:`' What Excel recorded (typical verbose output):
Sub FormatSummaryHeader()
    Range("A1:F1").Select
    With Selection.Interior
        .Pattern = xlSolid
        .PatternColorIndex = xlAutomatic
        .Color = 1404929          ' hard-coded colour value (avoid)
        .TintAndShade = 0
        .PatternTintAndShade = 0
    End With
    ' ... many more lines ...
End Sub

' Cleaned-up version:
Sub FormatSummaryHeader()
    With Range("A1:F1")
        .Interior.Color = RGB(21, 101, 192)   ' company blue
        .Font.Color = RGB(255, 255, 255)
        .Font.Bold = True
        .Font.Size = 12
        .Borders.LineStyle = xlContinuous
    End With
End Sub`,output:`Cleaner, readable, and uses RGB for maintainable colour values.`},
    {title:'Loop over all sheets to apply the format',code:`Sub FormatAllSummaryHeaders()
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        ' Skip the master sheet
        If ws.Name <> "Master" Then
            With ws.Range("A1:F1")
                .Interior.Color = RGB(21, 101, 192)
                .Font.Color = RGB(255, 255, 255)
                .Font.Bold = True
                .Font.Size = 12
                .Borders.LineStyle = xlContinuous
            End With
        End If
    Next ws
    MsgBox "Done! All summary headers formatted.", vbInformation
End Sub`,output:`All 11 non-Master sheets formatted in under 1 second.
Message box: "Done! All summary headers formatted."`},
    {title:'Open multiple files and copy a sheet into the master',code:`Sub CopyAllSummarySheets()
    Dim masterWB As Workbook
    Dim sourceWB As Workbook
    Dim folderPath As String
    Dim fileName As String

    masterWB = ThisWorkbook
    folderPath = "C:\\Reports\\Regional\\"
    fileName = Dir(folderPath & "*.xlsx")   ' first matching file

    Do While fileName <> ""
        Set sourceWB = Workbooks.Open(folderPath & fileName)
        
        On Error Resume Next
        sourceWB.Sheets("Summary").Copy _
            After:=masterWB.Sheets(masterWB.Sheets.Count)
        On Error GoTo 0
        
        sourceWB.Close SaveChanges:=False
        fileName = Dir()   ' next file
    Loop

    MsgBox "Copied " & masterWB.Sheets.Count - 1 & " summary sheets."
End Sub`,output:`12 workbooks opened, Summary tab copied from each, source files closed.
Total time: 4.2 seconds.`},
    {title:'Assign a macro to a button',code:`' Developer → Insert → Button (Form Control)
' Draw the button on the sheet
' In the "Assign Macro" dialog: choose FormatAllSummaryHeaders → OK
' Right-click the button → Edit Text → type "Format Headers"

' Now any user can run the macro without knowing VBA:
' just click the button`,output:`Button "Format Headers" visible on Sheet1.
Click → all headers formatted automatically.`}
  ],
  challenge:{
    prompt:`Write a VBA Sub called "DeleteEmptySheets" that loops through all sheets in the active workbook and deletes any sheet where cell A1 is empty. Suppress the "are you sure?" confirmation dialog that Excel shows when deleting sheets. After the loop, show a message box with the count of deleted sheets.`,
    hint:`Use Application.DisplayAlerts = False before deletion to suppress confirmation dialogs, and restore it to True after. Track deleted count with an Integer variable incremented inside the If block. ws.Delete is the method to delete a sheet.`,
    solution:`Sub DeleteEmptySheets()
    Dim ws As Worksheet
    Dim deletedCount As Integer
    deletedCount = 0

    Application.DisplayAlerts = False  ' suppress "delete?" prompt

    For Each ws In ThisWorkbook.Worksheets
        If ws.Range("A1").Value = "" Then
            ws.Delete
            deletedCount = deletedCount + 1
        End If
    Next ws

    Application.DisplayAlerts = True   ' always restore

    MsgBox "Deleted " & deletedCount & " empty sheet(s).", vbInformation
End Sub`,
    explanation:`Application.DisplayAlerts = False globally suppresses all Excel alert dialogs for the duration of the macro — critical when automating destructive operations like sheet deletion. Always restore it to True immediately after the risky block; if the macro errors mid-way without restoring it, Excel stays in silent mode for the rest of the session. Iterating with For Each is safe for collection modification in this direction (you can delete while iterating forward because VBA resolves the collection reference before the loop body executes).`
  },
  successMessage:`VBA macros unlocked! You've automated your Monday morning routine and have the foundation to tackle any repetitive Excel task. The 90-minute job is now 4 seconds.`,
  insight:`VBA has been part of Excel since version 5.0 in 1993. Despite being 30+ years old, it remains the most widely used automation tool in corporate finance, accounting, and operations. Analysts who know VBA are consistently rated as significantly more productive. Modern alternatives (Office Scripts for browser Excel, Power Automate for cross-app flows) are growing but VBA's direct access to the Excel object model remains unmatched for complex workbook automation.`
},

{
  id:'excel-adv-4',
  language:'excel',
  level:'advanced',
  order:12,
  title:'What-If Analysis — Goal Seek, Scenario Manager & Data Tables',
  duration:'22 min',
  xp:140,
  scenario:`Your company is pricing a new product. The finance director needs: (1) the unit price that achieves exactly $500,000 profit, (2) a side-by-side comparison of profit under three pricing scenarios (aggressive, mid, premium), and (3) a sensitivity table showing profit for every combination of price (row) and volume (column). She needs all of this for a board meeting in two hours. These are the three What-If Analysis tools in Excel.`,
  objectives:['Use Goal Seek to find an input value that produces a target output','Create named scenarios with Scenario Manager and generate a summary report','Build a one-variable and two-variable Data Table for sensitivity analysis','Understand when to use each tool','Read and interpret a sensitivity matrix'],
  terminology:[
    {term:'Goal Seek',definition:'Works backwards from a desired output to find the input value that produces it. Data → What-If Analysis → Goal Seek. Uses iterative numerical solving. Modifies a single input cell.'},
    {term:'Scenario Manager',definition:'Stores multiple sets of input values (scenarios) and switches between them. Data → What-If Analysis → Scenario Manager. Produces a scenario summary worksheet comparing all scenarios side by side.'},
    {term:'Data Table',definition:'Calculates a formula\'s output for every combination of one or two input values. Data → What-If Analysis → Data Table. Produces a static result grid — not formulas, so it recalculates with F9 or automatically.'},
    {term:'Changing Cells',definition:'The input cell(s) that Goal Seek or Scenario Manager modifies. Also called "decision variables" in optimisation terminology.'},
    {term:'Result Cells',definition:'The output formula cells that Scenario Manager and Data Tables observe. Goal Seek calls this the "Set Cell".'},
    {term:'Circular Reference (intentional)',definition:'Data Tables use a special internal mechanism where Excel recalculates the column/row input cell reference. This is NOT a circular reference error — it is a deliberate two-pass calculation specific to Data Tables.'}
  ],
  theory:`What-If Analysis tools are the core of financial modelling. Every pricing model, DCF (discounted cash flow), and break-even analysis uses at least one of these tools.

When to use which:
| Tool             | Use when...                                          |
|------------------|------------------------------------------------------|
| Goal Seek        | You need one specific target value found by one input|
| Scenario Manager | You have 2–32 named "what-if" scenarios to compare   |
| Data Table       | You want a full grid of outputs across many values   |

Data Tables can be one-variable (one axis varies) or two-variable (both row and column vary). They are the fastest way to produce a sensitivity matrix — a staple of consulting and investment banking deliverables.`,
  steps:[
    {title:'Set up the financial model',code:`' Build a simple P&L in cells B2:B7:
' B2: Unit Price        = 25.00
' B3: Units Sold        = 20,000
' B4: Revenue           = B2 * B3
' B5: Variable Costs    = 10.00 per unit (B5 = 10 * B3)
' B6: Fixed Costs       = 100,000
' B7: Profit            = B4 - B5 - B6
'
' Current profit: (25-10)*20000 - 100000 = $200,000`,output:`Profit: $200,000`},
    {title:'Use Goal Seek to find the break-even price',code:`' Target: Profit (B7) = $500,000
' Data → What-If Analysis → Goal Seek
'   Set cell:    B7
'   To value:    500000
'   By changing: B2
' Click OK

' Excel iterates until it finds B2 = ?`,output:`Goal Seek found a solution.
  B2 (Unit Price) = $40.00
  B7 (Profit)     = $500,000

Verification: (40-10)*20000 - 100000 = 600000 - 100000 = $500,000 ✓`},
    {title:'Create pricing scenarios with Scenario Manager',code:`' Restore B2 to 25.00 first

' Data → What-If Analysis → Scenario Manager → Add
'   Scenario name: Aggressive
'   Changing cells: B2, B3     (price AND volume)
'   Values: B2=20, B3=30000

' Add another:
'   Scenario name: Mid-Market
'   Values: B2=25, B3=20000

' Add another:
'   Scenario name: Premium
'   Values: B2=45, B3=12000

' Click "Summary" → Result cells: B7 → OK`,output:`Scenario Summary (new sheet):
                    Current  Aggressive  Mid-Market  Premium
  Unit Price          $25      $20         $25         $45
  Units Sold       20,000   30,000      20,000      12,000
  Profit          $200,000  $200,000    $200,000    $380,000`},
    {title:'Build a two-variable Data Table (sensitivity matrix)',code:`' Layout:
' E2: =B7   (points to the Profit formula — THIS IS THE KEY)
' E3:E12:  prices  20, 22, 24, 26, 28, 30, 35, 40, 45, 50   (row input)
' F2:N2:  volumes  10000, 15000, 20000, 25000, 30000, 35000, 40000  (col input)

' Select E2:N12 (the whole table range including header row and col)
' Data → What-If Analysis → Data Table
'   Row input cell:    B3   (volume — matches the column header)
'   Column input cell: B2   (price  — matches the row header)
' Click OK

' Excel fills in the entire matrix instantly`,output:`Sensitivity matrix (profit, $000s):
Price↓ / Vol→  10,000  15,000  20,000  25,000  30,000
     20       -$0      $50K    $100K  $150K   $200K
     25       $50K    $125K   $200K  $275K   $350K
     30       $100K   $200K   $300K  $400K   $500K
     40       $200K   $350K   $500K  $650K   $800K
     50       $300K   $500K   $700K  $900K  $1,100K`},
    {title:'Add conditional formatting to the sensitivity matrix',code:`' Select F3:N12 (the result values, not headers)
' Home → Conditional Formatting → Color Scales → Green-White-Red
' (Green = highest profit, Red = lowest)

' Optional: highlight the break-even zone
' New Rule → Formula: =F3<0 → Red fill → "Loss territory"`,output:`Heatmap overlaid on sensitivity matrix.
Loss cells (negative profit) highlighted red.
High-profit cells gradient to dark green.`}
  ],
  challenge:{
    prompt:`The finance director wants to know: what is the minimum volume required to break even at EACH price point in your sensitivity table (prices from $20 to $50, step $5)? Use Goal Seek seven times — or better, write a VBA loop that runs Goal Seek programmatically for each price and records the break-even volume in column O.`,
    hint:`Goal Seek in VBA: Range("B7").GoalSeek Goal:=0, ChangingCell:=Range("B3"). Wrap this in a loop that first sets B2 to each price, runs Goal Seek on B3 to find zero profit, then records B3's result in the output column. Use a prices array: prices = Array(20, 25, 30, 35, 40, 45, 50).`,
    solution:`Sub FindBreakEvenVolumes()
    Dim prices As Variant
    Dim i As Integer
    prices = Array(20, 25, 30, 35, 40, 45, 50)

    ' Headers
    Range("O1").Value = "Price"
    Range("P1").Value = "Break-Even Volume"

    For i = 0 To UBound(prices)
        Range("B2").Value = prices(i)        ' set price
        Range("B3").Value = 10000            ' starting guess

        Range("B7").GoalSeek Goal:=0, _
                               ChangingCell:=Range("B3")

        Range("O" & (i + 2)).Value = prices(i)
        Range("P" & (i + 2)).Value = Round(Range("B3").Value, 0)
    Next i

    ' Restore base case
    Range("B2").Value = 25
    Range("B3").Value = 20000
    MsgBox "Break-even analysis complete.", vbInformation
End Sub`,
    explanation:`Range("B7").GoalSeek sets the profit cell as the "Set Cell", Goal:=0 is the target, and ChangingCell:=Range("B3") tells it which input to vary. Setting an initial guess for B3 helps Goal Seek's numerical solver converge quickly. The VBA loop eliminates the need to run Goal Seek manually 7 times, records each result programmatically, and restores the base case so the main model is unchanged. This combination of What-If Analysis + VBA automation is extremely common in financial modelling workflows.`
  },
  successMessage:`What-If Analysis mastered! You've completed the Excel curriculum. Goal Seek, Scenario Manager, and Data Tables are the analytical backbone of financial modelling — you now have every tool professional analysts use.`,
  insight:`Two-variable Data Tables producing sensitivity matrices are a hallmark of investment banking and consulting deliverables. They are called "tornado charts" when horizontal bar charts are added, or "football field charts" when showing valuation ranges. The ability to produce one in minutes from a live model — rather than hard-coded numbers — is a skill that distinguishes senior analysts from junior ones. Combined with Power Pivot, LAMBDA, Power Query, and VBA, you now have the full toolkit of an advanced Excel analyst.`
}

); // end EXCEL_LESSONS push (Advanced 9-12)

EXCEL_LESSONS.push(

/* ── BASIC 5 ─────────────────────────────────────────── */
{
  id:'excel-basic-5', language:'excel', level:'basic', order:5,
  title:'IF, AND, OR & Nested Logic — Decision Formulas',
  duration:'18 min', xp:110,
  scenario:{
    company:'Clearwater Finance', role:'Junior Analyst',
    description:`You have a loan application dataset. Risk classification requires nested logic: applications are "Approved" if credit score >= 680 AND debt-to-income <= 35%, "Review" if score >= 620 OR a guarantor is present, and "Declined" otherwise. You will build this logic with IF, AND, OR, and IFS — the core of conditional formula work in Excel.`
  },
  objectives:[
    'Write IF() formulas with comparison operators',
    'Combine conditions with AND() and OR()',
    'Build nested IF() chains for multiple outcomes',
    'Use IFS() as a cleaner alternative to nested IF()'
  ],
  terminology:[
    {term:'IF()',lang:'excel',definition:'Returns one value if a logical test is TRUE and another if FALSE. Syntax: IF(test, value_if_true, value_if_false).',example:'=IF(A2>=680,"Approved","Declined")'},
    {term:'AND()',lang:'excel',definition:'Returns TRUE only if ALL conditions are TRUE. Used inside IF() to require multiple conditions to hold simultaneously.',example:'=IF(AND(A2>=680,B2<=35%),"Approved","Review")'},
    {term:'OR()',lang:'excel',definition:'Returns TRUE if AT LEAST ONE condition is TRUE. Used when only one of several conditions needs to be met.',example:'=IF(OR(A2>=620,C2="Y"),"Review","Declined")'},
    {term:'IFS()',lang:'excel',definition:'Tests multiple conditions in sequence and returns the value for the first TRUE condition. Cleaner than nested IF() for 3+ outcomes.',example:'=IFS(A2>=680,"Approved",A2>=620,"Review",TRUE,"Declined")'},
    {term:'IFERROR()',lang:'excel',definition:'Returns a custom value instead of an error. Essential when formulas might hit #DIV/0!, #N/A, or #VALUE! errors.',example:'=IFERROR(VLOOKUP(A2,Table,2,0),"Not found")'}
  ],
  theory:`<h3>Building Decision Logic in Excel</h3>
<p>Conditional formulas are the most widely used formulas in business Excel. The core pattern is: <code>IF(test, result_if_true, result_if_false)</code>. Nesting IF() inside the "false" branch creates a chain of conditions — but IFS() is cleaner for three or more outcomes.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Nested IF (hard to read):<br>=IF(A2>=680,"Approved",IF(A2>=620,"Review","Declined"))<br><br>IFS (clean & readable):<br>=IFS(A2>=680,"Approved", A2>=620,"Review", TRUE,"Declined")</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Always end an IFS() formula with TRUE as the final condition — it acts as the "else" catch-all. Without it, IFS() returns an error when no condition matches.</div></div>`,
  steps:[
    {step:1, title:'Basic IF with Comparison Operators',
     explanation:`Build a simple pass/fail column using IF(). Comparison operators: = equals, <> not equal, > greater than, >= greater than or equal.`,
     code:`// Column layout — enter in row 2, drag down
// A: credit_score  B: dti_ratio  C: guarantor  D: decision

// Step 1: Simple threshold check
=IF(A2>=680, "Pass", "Fail")

// Examples with data:
A2=720  → "Pass"   (720 >= 680)
A2=650  → "Fail"   (650 < 680)
A2=680  → "Pass"   (680 >= 680, boundary included)

// Numeric result version (for math downstream):
=IF(A2>=680, 1, 0)   // 1=pass, 0=fail

// With text concatenation:
=IF(A2>=680, "Score " & A2 & " - PASS", "Score " & A2 & " - FAIL")
// A2=720 → "Score 720 - PASS"`,
     simulatedOutput:{type:'dataframe', headers:['credit_score','dti_ratio','guarantor','=IF(A2>=680,"Pass","Fail")'], rows:[['720','28%','N','Pass'],['650','42%','N','Fail'],['680','35%','Y','Pass'],['590','55%','Y','Fail'],['710','31%','N','Pass']]},
     note:'The >= operator includes the boundary. A score of exactly 680 returns "Pass". Use > if you want to exclude the exact boundary value.',
     after:'IF() is the foundation. Every more complex formula — IFS, IIFS, SWITCH — builds on this same test/true/false pattern.'},
    {step:2, title:'Combine Conditions with AND() and OR()',
     explanation:`AND requires all conditions true simultaneously. OR requires at least one. Combine them inside IF() to model real business rules.`,
     code:`// Two-condition approval: BOTH score >= 680 AND dti <= 35%
=IF(AND(A2>=680, B2<=0.35), "Approved", "Not Approved")

// A2=720, B2=28%  → "Approved"   (both conditions met)
// A2=720, B2=42%  → "Not Approved"  (dti too high)
// A2=650, B2=28%  → "Not Approved"  (score too low)

// Review trigger: score >= 620 OR guarantor = "Y"
=IF(OR(A2>=620, C2="Y"), "Review Possible", "Auto-Decline")

// A2=590, C2="Y"  → "Review Possible"  (guarantor present)
// A2=640, C2="N"  → "Review Possible"  (score qualifies)
// A2=580, C2="N"  → "Auto-Decline"     (neither condition)

// Combine AND + OR in one formula:
=IF(AND(A2>=640, OR(B2<=0.40, C2="Y")), "Review", "Decline")`,
     simulatedOutput:{type:'dataframe', headers:['score','dti','guar','AND check','OR check'], rows:[['720','28%','N','Approved','Review Possible'],['720','42%','N','Not Approved','Review Possible'],['590','30%','Y','Not Approved','Review Possible'],['590','55%','N','Not Approved','Auto-Decline']]},
     note:'AND() and OR() can accept up to 255 conditions. In practice, keeping it to 3-4 conditions per AND/OR keeps formulas readable.',
     after:'Nested AND/OR inside IF() models any business decision tree. The key insight: AND=intersection (stricter), OR=union (more permissive).'},
    {step:3, title:'IFS() for Multi-Outcome Logic',
     explanation:`IFS() evaluates conditions top-to-bottom and returns the first TRUE match. It replaces deeply nested IF() chains and is dramatically easier to read and audit.`,
     code:`// Three-tier decision: Approved / Review / Declined
// Nested IF (hard to read, easy to misplace parentheses):
=IF(AND(A2>=680,B2<=0.35),"Approved",IF(OR(A2>=620,C2="Y"),"Review","Declined"))

// Same logic with IFS (clean, auditable):
=IFS(
  AND(A2>=680, B2<=0.35), "Approved",
  OR(A2>=620, C2="Y"),    "Review",
  TRUE,                   "Declined"
)

// Four-tier risk rating:
=IFS(
  A2>=750,  "Tier 1 — Prime",
  A2>=680,  "Tier 2 — Near Prime",
  A2>=620,  "Tier 3 — Subprime",
  TRUE,     "Tier 4 — Deep Subprime"
)

// Score 780 → "Tier 1 — Prime"
// Score 700 → "Tier 2 — Near Prime"
// Score 635 → "Tier 3 — Subprime"
// Score 580 → "Tier 4 — Deep Subprime"`,
     simulatedOutput:{type:'dataframe', headers:['score','dti','guar','IFS Decision','Risk Tier'], rows:[['780','25%','N','Approved','Tier 1 — Prime'],['710','33%','N','Approved','Tier 2 — Near Prime'],['640','45%','Y','Review','Tier 3 — Subprime'],['590','55%','N','Declined','Tier 4 — Deep Subprime']]},
     after:'IFS() evaluates left-to-right, top-to-bottom. Put your most restrictive condition first. The TRUE catch-all at the end prevents the #N/A error when no condition matches.'}
  ],
  challenge:{
    title:'Build a Bonus Eligibility Formula',
    description:`Sales reps earn a bonus based on: "High Bonus" (quota >= 120% AND tenure >= 3 years), "Standard Bonus" (quota >= 100%, any tenure), "No Bonus" (below 100% quota). Write the IFS() formula, then add an IFERROR() wrapper to handle blank rows. Show results for 5 sample reps.`,
    hint:`IFS(AND(quota>=1.2,tenure>=3),"High Bonus",quota>=1,"Standard Bonus",TRUE,"No Bonus") — wrap with IFERROR(...,"—")`,
    starterCode:`// Column setup:
// A: rep_name   B: quota_pct (as decimal: 1.15=115%)   C: tenure_years

// Bonus formula in D2:
=IFERROR(
  IFS(
    AND(B2>=1.2, C2>=3), "High Bonus",
    B2>=1,               "Standard Bonus",
    TRUE,                "No Bonus"
  ),
  "—"   // shown for blank/error rows
)

// Test data for rows 2-6:
// Alice:  quota=1.25, tenure=4   → ?
// Bob:    quota=1.18, tenure=2   → ?
// Carol:  quota=1.05, tenure=5   → ?
// Dan:    quota=0.95, tenure=7   → ?
// Elena:  quota=1.22, tenure=3   → ?`,
    solution:`// D2 formula (drag down through D6):
=IFERROR(
  IFS(
    AND(B2>=1.2, C2>=3), "High Bonus",
    B2>=1,               "Standard Bonus",
    TRUE,                "No Bonus"
  ),
  "—"
)

// Results:
// Alice:  1.25, 4 years → High Bonus    (>=120% AND >=3 yrs)
// Bob:    1.18, 2 years → Standard Bonus (>=100% but only 2 yrs)
// Carol:  1.05, 5 years → Standard Bonus (>=100% qualifies, <120%)
// Dan:    0.95, 7 years → No Bonus      (below 100% quota)
// Elena:  1.22, 3 years → High Bonus    (>=120% AND >=3 yrs)`,
    explanation:`IFS() checks AND(B2>=1.2,C2>=3) first — the most restrictive condition. If false, it tries B2>=1. If false, TRUE catches the remainder. IFERROR() at the outer level ensures blank rows display a dash rather than an error — a good practice for any formula column that users may extend.`,
    successMessage:`Conditional logic mastered! IF + AND + OR + IFS + IFERROR is the core toolkit for every business rule formula in Excel — from HR eligibility to financial classification to risk scoring.`
  },
  insight:`Conditional formulas are the most-used Excel feature in finance, HR, operations, and compliance teams worldwide. IFS() was introduced in Excel 2019/Office 365 and is now preferred over nested IF() in professional auditing environments because each condition and result is a clearly paired argument rather than buried inside parentheses. IFERROR() wrapping is considered a professional best practice — formulas in shared workbooks should never show error codes to end users.`
},

/* ── INTERMEDIATE 5 ─────────────────────────────────── */
{
  id:'excel-inter-5', language:'excel', level:'intermediate', order:5,
  title:'Date & Time Functions — WORKDAY, NETWORKDAYS & DATEDIF',
  duration:'22 min', xp:155,
  scenario:{
    company:'Clearwater Finance', role:'Analyst',
    description:`Project timelines, SLA tracking, employee tenure, and invoice aging all require precise date arithmetic. You need to calculate business days between events (excluding weekends and holidays), determine due dates, measure tenure in years and months, and age invoices. Excel's date functions handle all of this — once you understand how Excel stores dates internally.`
  },
  objectives:[
    'Understand how Excel stores dates as serial numbers',
    'Calculate business-day intervals with NETWORKDAYS()',
    'Project future business-day dates with WORKDAY()',
    'Measure periods in years, months, and days with DATEDIF()'
  ],
  terminology:[
    {term:'DATE serial number',lang:'excel',definition:'Excel stores dates as integers counting from January 1 1900 (=1). January 1 2024 = 45292. This enables date subtraction and arithmetic.',example:'=TODAY()-DATE(2023,1,1)  // days since Jan 1 2023'},
    {term:'NETWORKDAYS()',lang:'excel',definition:'Counts the number of working days (Monday–Friday) between two dates, inclusive of both endpoints. Optional third argument excludes holiday dates.',example:'=NETWORKDAYS(A2,B2,HolidayRange)'},
    {term:'WORKDAY()',lang:'excel',definition:'Returns the date that is N working days after (positive N) or before (negative N) a start date, skipping weekends and optionally holidays.',example:'=WORKDAY(TODAY(),30)  // 30 business days from today'},
    {term:'DATEDIF()',lang:'excel',definition:'Calculates the difference between two dates in full years ("Y"), full months ("M"), days ("D"), months ignoring years ("YM"), or days ignoring months ("MD").',example:'=DATEDIF(hire_date, TODAY(), "Y")  // full years of tenure'},
    {term:'EDATE() / EOMONTH()',lang:'excel',definition:'EDATE returns the date N months before/after a date. EOMONTH returns the last day of the month N months away.',example:'=EOMONTH(TODAY(),0)    // last day of this month\n=EDATE(contract_date,12) // 1 year anniversary'}
  ],
  theory:`<h3>Excel Dates are Numbers</h3>
<p>This is the most important date concept in Excel: every date is stored as an integer. January 1 2024 = 45292. Because of this, <code>=B2-A2</code> simply gives the number of calendar days between two dates. Business day calculations require NETWORKDAYS() and WORKDAY() which skip weekends.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>=TODAY()-A2           // calendar days elapsed<br>=NETWORKDAYS(A2,TODAY()) // business days elapsed<br>=WORKDAY(TODAY(),10)     // 10 business days from now</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>DATEDIF() is an undocumented legacy function — it does not appear in Excel autocomplete — but it is the only reliable way to get "2 years, 3 months, 15 days" style durations. Always type it manually: =DATEDIF(start,end,"Y")</div></div>`,
  steps:[
    {step:1, title:'Calendar Days vs Business Days',
     explanation:`Understand the difference between simple date subtraction and NETWORKDAYS(), and how to add holiday lists.`,
     code:`// --- Sheet layout ---
// A: start_date   B: end_date   C: result

// 1. Calendar days — simple subtraction:
=B2-A2
// 2024-01-15 to 2024-02-15 = 31 days

// 2. Business days — NETWORKDAYS():
=NETWORKDAYS(A2, B2)
// Counts Mon-Fri between start and end (inclusive)

// 3. Business days EXCLUDING holidays:
=NETWORKDAYS(A2, B2, HolidayList)
// HolidayList is a named range containing holiday dates

// Examples:
// Jan 15 to Feb 15, 2024 (includes MLK Day Jan 15 = 1 holiday)
// Calendar days:  31
// Business days:  24 (without holiday list)
// Business days:  23 (with MLK Day in holiday list)

// 4. NETWORKDAYS.INTL — custom weekend:
=NETWORKDAYS.INTL(A2, B2, "0000011")
// "0000011" = Fri+Sat weekend pattern (for Saudi/UAE schedules)`,
     simulatedOutput:{type:'dataframe', headers:['start','end','calendar_days','networkdays','net_with_holiday'], rows:[['2024-01-15','2024-02-15','31','24','23'],['2024-03-01','2024-03-31','30','21','21'],['2024-06-28','2024-07-12','14','11','10']]},
     note:'NETWORKDAYS counts both endpoints as business days if they fall on weekdays. The holiday list is just a range of date values — build it in a dedicated sheet tab.',
     after:'For SLA tracking, invoice aging, and project management, NETWORKDAYS replaces all manual weekend/holiday counting. The holiday list is maintained once per year in a named range.'},
    {step:2, title:'Project Future Dates with WORKDAY()',
     explanation:`WORKDAY() calculates a deadline date N business days from a start, automatically skipping weekends and holidays.`,
     code:`// --- Loan processing calendar ---
// Application received: A2
// SLA target: 10 business days to decision

// 1. Simple 10-business-day deadline:
=WORKDAY(A2, 10)
// If A2 = Friday Jan 12, result = Friday Jan 26
// (skips two Sat/Sun weekends = 14 calendar days)

// 2. With holiday exclusions:
=WORKDAY(A2, 10, HolidayList)

// 3. Go backward — prior business day:
=WORKDAY(A2, -1)    // previous business day

// 4. First business day of next month:
=WORKDAY(EOMONTH(A2, 0), 1)
// EOMONTH gets last day of current month
// WORKDAY(...,1) steps one business day forward

// 5. Days until deadline (business days remaining):
=NETWORKDAYS(TODAY(), deadline_date) - 1
// -1 because NETWORKDAYS includes both endpoints`,
     simulatedOutput:{type:'dataframe', headers:['received','10bd_deadline','calendar_days','status'], rows:[['2024-01-12','2024-01-26','14','On Track'],['2024-01-08','2024-01-22','14','Due Soon'],['2024-01-02','2024-01-16','14','Overdue']]},
     note:'WORKDAY() returns a serial number — format the result cell as a date (Ctrl+1 → Date category). It does not automatically display as a date.',
     after:'WORKDAY is the backbone of SLA dashboards, project scheduling, and delivery forecasting. Combined with a centralized HolidayList named range, the entire team uses the same holiday calendar automatically.'},
    {step:3, title:'Tenure and Date Differences with DATEDIF()',
     explanation:`DATEDIF() measures the interval between two dates in complete units. It is the standard formula for HR tenure reporting and contract milestone tracking.`,
     code:`// --- Employee tenure calculation ---
// A2: hire_date    B2: =TODAY() (or termination date)

// Full years of service:
=DATEDIF(A2, TODAY(), "Y")
// hire=2019-03-15, today=2024-06-04 → 5 (full years)

// Full months of service:
=DATEDIF(A2, TODAY(), "M")
// → 62 (full months)

// Remaining months after full years (for "5 yrs 3 mo"):
=DATEDIF(A2, TODAY(), "YM")
// "YM" = months ignoring year difference → 2 months

// Remaining days after full months:
=DATEDIF(A2, TODAY(), "MD")
// "MD" = days ignoring month difference

// Full human-readable tenure string:
=DATEDIF(A2,TODAY(),"Y") & " yrs " &
 DATEDIF(A2,TODAY(),"YM") & " mo " &
 DATEDIF(A2,TODAY(),"MD") & " days"
// → "5 yrs 2 mo 20 days"

// Invoice aging buckets:
=IF(TODAY()-invoice_date<=30,"0-30 days",
 IF(TODAY()-invoice_date<=60,"31-60 days",
 IF(TODAY()-invoice_date<=90,"61-90 days","90+ days")))`,
     simulatedOutput:{type:'dataframe', headers:['hire_date','years','months_rem','days_rem','tenure_string'], rows:[['2019-03-15','5','2','20','5 yrs 2 mo 20 days'],['2022-07-01','1','11','3','1 yrs 11 mo 3 days'],['2020-01-10','4','4','25','4 yrs 4 mo 25 days']]},
     note:'DATEDIF does not appear in Excel formula autocomplete — it is an undocumented legacy function inherited from Lotus 1-2-3. Type it manually and it works correctly in all modern Excel versions.',
     after:'The YM and MD units make DATEDIF uniquely capable of producing "years, months, days" breakdowns — impossible with simple subtraction or YEAR()/MONTH() functions.'
    }
  ],
  challenge:{
    title:'Build a Project SLA Tracker',
    description:`Build formulas for a 5-row project tracker: (1) deadline = WORKDAY(start, 15) with holiday list, (2) business days remaining = NETWORKDAYS(TODAY(), deadline)-1 (show 0 if past due), (3) status = "Overdue" if remaining<0, "Due Today" if=0, "Due Soon" if<=3, else "On Track". Use the sample start dates provided.`,
    hint:`MAX(0, NETWORKDAYS(TODAY(),deadline)-1) prevents negative "remaining" values. IFS() for the status column.`,
    starterCode:`// Assume HolidayList = a named range of 5 holiday dates
// Paste these start dates in A2:A6:
// 2024-05-01, 2024-05-10, 2024-05-20, 2024-06-01, 2024-06-10

// B2 — Deadline (15 business days from start):
=WORKDAY(A2, 15, HolidayList)

// C2 — Business days remaining (not negative):
=MAX(0, NETWORKDAYS(TODAY(), B2)-1)

// D2 — Status:
=IFS(
  TODAY()>B2,        "Overdue",
  TODAY()=B2,        "Due Today",
  C2<=3,             "Due Soon",
  TRUE,              "On Track"
)

// Drag B2:D2 down through row 6`,
    solution:`// B2:
=WORKDAY(A2, 15, HolidayList)

// C2 — remaining business days, floored at 0:
=MAX(0, NETWORKDAYS(TODAY(), B2)-1)

// D2 — status:
=IFS(
  TODAY()>B2,  "Overdue",
  TODAY()=B2,  "Due Today",
  C2<=3,       "Due Soon",
  TRUE,        "On Track"
)

// For demonstration with a fixed "today" of 2024-06-04:
// Start=May 1  → Deadline=May 22 → Remaining=0 → Overdue
// Start=May 10 → Deadline=May 31 → Remaining=0 → Overdue
// Start=May 20 → Deadline=Jun 11 → Remaining=5 → On Track
// Start=Jun 1  → Deadline=Jun 25 → Remaining=15 → On Track
// Start=Jun 10 → Deadline=Jul 2  → Remaining=20 → On Track`,
    explanation:`MAX(0, NETWORKDAYS-1) ensures the remaining days column never shows a negative number for overdue items — the IFS status column handles the overdue signaling separately. This separation of concerns (raw number vs display status) makes both columns independently useful for filtering and sorting.`,
    successMessage:`SLA tracker complete! WORKDAY + NETWORKDAYS + DATEDIF is the date arithmetic toolkit used in every professional PM, HR, and finance dashboard in Excel.`
  },
  insight:`Business-day date arithmetic is one of the top Excel skills requested in finance, operations, and HR analyst job postings. NETWORKDAYS() is used in regulatory SLA tracking, WORKDAY() powers every Gantt chart and project deadline tool built in Excel, and DATEDIF() drives tenure and subscription lifecycle reports at companies ranging from startups to Fortune 500 HR departments. These three functions appear in more professional workbooks than any other date function.`
},

/* ── ADVANCED 5 ─────────────────────────────────────── */
{
  id:'excel-adv-5', language:'excel', level:'advanced', order:5,
  title:'Modern Array Functions — SEQUENCE, BYROW, BYCOL & MAKEARRAY',
  duration:'28 min', xp:185,
  scenario:{
    company:'Clearwater Finance', role:'Senior Analyst',
    description:`Your team has adopted Microsoft 365 Excel. With dynamic array functions introduced after 2019, you can generate entire tables from single formulas, run row-level and column-level calculations without helper columns, and build dynamic calendars or amortization schedules that resize automatically. This lesson covers the modern array function layer that separates Excel power users from everyone else.`
  },
  objectives:[
    'Generate numeric sequences and date grids with SEQUENCE()',
    'Calculate row-wise and column-wise aggregates with BYROW() and BYCOL()',
    'Build computed arrays with MAKEARRAY()',
    'Combine array functions with LAMBDA() for reusable patterns'
  ],
  terminology:[
    {term:'SEQUENCE()',lang:'excel',definition:'Generates an array of sequential numbers. Arguments: rows, [cols], [start], [step]. Spills into adjacent cells automatically.',example:'=SEQUENCE(5,3,10,5)  // 5 rows, 3 cols, start 10, step 5'},
    {term:'BYROW()',lang:'excel',definition:'Applies a LAMBDA function to each row of an array, returning one value per row. Replaces helper-column row-level calculations.',example:'=BYROW(A2:D10, LAMBDA(row, SUM(row)))'},
    {term:'BYCOL()',lang:'excel',definition:'Applies a LAMBDA function to each column of an array, returning one value per column. Equivalent of column-wise aggregation without pivot tables.',example:'=BYCOL(A2:D10, LAMBDA(col, AVERAGE(col)))'},
    {term:'MAKEARRAY()',lang:'excel',definition:'Creates a rows x cols array where each cell value is computed by a LAMBDA function receiving the row and column index.',example:'=MAKEARRAY(5,5,LAMBDA(r,c,r*c))  // multiplication table'},
    {term:'Spill range (#)',lang:'excel',definition:'When a formula returns multiple values, they spill into adjacent cells automatically. Reference the full spill range with # after the source cell: A2#',example:'=SORT(A2#)  // sort the spill range starting at A2'}
  ],
  theory:`<h3>The Dynamic Array Revolution</h3>
<p>Before 2019, returning multiple values from one formula required Ctrl+Shift+Enter legacy array entry. Modern Excel 365 formulas spill automatically — one formula fills multiple cells. SEQUENCE, BYROW, BYCOL, and MAKEARRAY are the building blocks of this new paradigm.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>=SEQUENCE(12,1,DATE(2024,1,1),30)<br>// Generates 12 dates, 30 days apart — a quarterly calendar<br><br>=BYROW(data, LAMBDA(r, XLOOKUP(MAX(r),r,headers)))<br>// Best-performing category per row, no helper columns</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>BYROW and BYCOL require Microsoft 365 (subscription). They are NOT available in Excel 2019 or older perpetual licenses. Always confirm your team's Excel version before using these in shared workbooks.</div></div>`,
  steps:[
    {step:1, title:'Generate Sequences and Date Grids with SEQUENCE()',
     explanation:`SEQUENCE creates a rectangular array of numbers or dates. Combined with date arithmetic, it builds dynamic calendars and reporting grids.`,
     code:`// 1. Simple number sequence:
=SEQUENCE(10)          // 1,2,3,...,10 in a column
=SEQUENCE(1,10)        // 1,2,3,...,10 in a row
=SEQUENCE(5,3)         // 5×3 grid: 1,2,3 / 4,5,6 / ...

// 2. Revenue forecast grid (months as columns, years as rows):
=SEQUENCE(3,12,1,1)    // 3yr × 12mo index grid

// 3. Monthly date sequence (first of each month in 2024):
=DATE(2024,SEQUENCE(12),1)
// Returns: 2024-01-01, 2024-02-01, ..., 2024-12-01

// 4. Business calendar for Q1 (all weekdays):
=WORKDAY(DATE(2024,1,1)-1, SEQUENCE(65))
// 65 weekdays from start of year → ~Q1

// 5. Dynamic row numbers (replaces manually typed 1,2,3...):
=SEQUENCE(ROWS(A2:A100))
// Adapts if range expands — no manual re-entry needed`,
     simulatedOutput:{type:'dataframe', headers:['SEQUENCE(5)','DATE col','SEQUENCE(3,4)'], rows:[['1','2024-01-01','1  2  3  4'],['2','2024-02-01','5  6  7  8'],['3','2024-03-01','9 10 11 12'],['4','2024-04-01',''],['5','2024-05-01','']]},
     note:'Format the date sequence cells as dates (Ctrl+1) — SEQUENCE returns raw serial numbers and the DATE function returns a serial number. The format is cosmetic, not functional.',
     after:'SEQUENCE is the foundation. Once the sequence spills, any formula referencing A2# operates on the entire spill range and resizes automatically when you change the row/column counts.'},
    {step:2, title:'Row and Column Aggregation with BYROW() and BYCOL()',
     explanation:`BYROW runs a LAMBDA against each row; BYCOL against each column. Both return a single value per row or column without helper columns.`,
     code:`// Data: sales matrix B2:E6 (4 products × 5 regions)
//         Q1       Q2       Q3       Q4
// East   42000    45000    38000    51000
// West   38000    41000    35000    47000
// North  29000    31000    27000    34000
// South  35000    38000    32000    43000
// Cent   22000    24000    21000    27000

// Row totals (annual revenue per region):
=BYROW(B2:E6, LAMBDA(row, SUM(row)))
// Returns: {176000; 161000; 121000; 148000; 94000}
// Spills into 5 cells — one per region row

// Row max (peak quarter per region):
=BYROW(B2:E6, LAMBDA(row, MAX(row)))
// Returns: {51000; 47000; 34000; 43000; 27000}

// Column averages (avg revenue per quarter):
=BYCOL(B2:E6, LAMBDA(col, AVERAGE(col)))
// Returns: {33200, 35800, 30600, 40400} — one per quarter column

// Column growth rate Q1→Q4 per region:
=BYROW(B2:E6, LAMBDA(row,
    (INDEX(row,1,4) / INDEX(row,1,1)) - 1
))
// Returns YoY-style growth for each region`,
     simulatedOutput:{type:'dataframe', headers:['region','BYROW SUM','BYROW MAX','BYCOL AVG (Q1-Q4)'], rows:[['East','176,000','51,000','33,200 | 35,800 | 30,600 | 40,400'],['West','161,000','47,000',''],['North','121,000','34,000',''],['South','148,000','43,000',''],['Cent','94,000','27,000','']]},
     note:'BYROW and BYCOL accept any LAMBDA expression, not just SUM. You can use IF, XLOOKUP, COUNTIF, or custom LAMBDA-defined functions inside them.',
     after:'BYROW/BYCOL completely eliminates the need for helper columns that compute row-level summaries. The result spills and updates automatically when source data changes.'},
    {step:3, title:'Build Computed Tables with MAKEARRAY()',
     explanation:`MAKEARRAY generates a rows-by-columns table where every cell value is computed by a LAMBDA that receives the row and column index. Ideal for multiplication tables, distance matrices, and scenario grids.`,
     code:`// 1. Classic multiplication table (5×5):
=MAKEARRAY(5, 5, LAMBDA(r, c, r * c))
// Cell at row 3, col 4 = 3*4 = 12

// 2. Loan payment scenario grid
// Rows = interest rates (5%–9%), Cols = terms (12–60 months)
=MAKEARRAY(5, 5, LAMBDA(r, c,
    LET(
      rate,   (4 + r) / 100 / 12,
      nper,   12 * c,
      pv,     50000,
      PMT(rate, nper, -pv)
    )
))
// Generates a 5×5 grid of monthly payments for $50,000 loan
// Row 1 = 5% rate, Row 5 = 9% rate
// Col 1 = 1yr, Col 5 = 5yr

// 3. Distance matrix between 4 cities (using dummy coords):
// (In real use, Haversine formula; simplified here)
=MAKEARRAY(4, 4, LAMBDA(r, c,
    IF(r=c, 0, ABS(r-c)*150)   // simplified placeholder
))`,
     simulatedOutput:{type:'dataframe', headers:['Rate\\Term','12 mo','24 mo','36 mo','48 mo','60 mo'], rows:[['5%','$4,279','$2,193','$1,499','$1,151','$943'],['6%','$4,307','$2,218','$1,522','$1,175','$967'],['7%','$4,334','$2,243','$1,546','$1,198','$990'],['8%','$4,362','$2,268','$1,569','$1,222','$1,014'],['9%','$4,389','$2,294','$1,593','$1,246','$1,038']]},
     note:'LET() inside MAKEARRAY lets you define named sub-expressions (rate, nper, pv) that make the formula readable and avoid repeating calculations.',
     after:'MAKEARRAY builds entire scenario analysis tables from a single formula — no copy-pasting, no absolute references to manage. Change the loan amount and every cell in the grid updates instantly.'
    }
  ],
  challenge:{
    title:'Dynamic Amortization Schedule Header',
    description:`Use SEQUENCE and date arithmetic to generate the first 12 month-end dates of an amortization schedule starting from a given start date. Then use BYCOL() on a 3x12 payment matrix to find the maximum payment in each month column. Print both results.`,
    hint:`EOMONTH(start_date, SEQUENCE(1,12,0)) gives 12 month-end dates in a row. BYCOL(matrix, LAMBDA(col, MAX(col))) gives the column maxima.`,
    starterCode:`// In a real Excel sheet:

// A1: start_date = 2024-01-15

// 1. Row of 12 month-end dates:
=EOMONTH(A1, SEQUENCE(1, 12, 0))
// SEQUENCE(1,12,0) = 0,1,2,...,11
// EOMONTH(date, 0) = last day of same month
// EOMONTH(date, 1) = last day of next month, etc.

// 2. Sample 3x12 payment matrix (rows=loans, cols=months):
// Paste this range B3:M5 or define as a named array
// LoanA: {1200,1185,1170,1155,1140,1125,1110,1095,1080,1065,1050,1035}
// LoanB: {980,965,950,935,920,905,890,875,860,845,830,815}
// LoanC: {1450,1432,1414,1396,1378,1360,1342,1324,1306,1288,1270,1252}

// 3. Max payment per month column:
=BYCOL(B3:M5, LAMBDA(col, MAX(col)))`,
    solution:`// 1. Month-end date sequence from 2024-01-15:
=EOMONTH(DATE(2024,1,15), SEQUENCE(1,12,0))
// Returns: 2024-01-31, 2024-02-29, 2024-03-31, ..., 2024-12-31

// 2. Define the payment matrix as a CHOOSE or inline array:
// (In real sheet, reference the data range directly)
={1200,1185,1170,1155,1140,1125,1110,1095,1080,1065,1050,1035;
   980, 965, 950, 935, 920, 905, 890, 875, 860, 845, 830, 815;
  1450,1432,1414,1396,1378,1360,1342,1324,1306,1288,1270,1252}

// 3. BYCOL max per month:
=BYCOL(B3:M5, LAMBDA(col, MAX(col)))
// Returns: {1450,1432,1414,1396,1378,1360,1342,1324,1306,1288,1270,1252}
// (LoanC dominates every month)

// Month-header results (formatted as dates):
// Jan 31 | Feb 29 | Mar 31 | Apr 30 | May 31 | Jun 30
// Jul 31 | Aug 31 | Sep 30 | Oct 31 | Nov 30 | Dec 31`,
    explanation:`EOMONTH(date, n) returns the last calendar day of the month n months from date. SEQUENCE(1,12,0) generates the offsets 0,1,...,11 in a single row — combining them creates a self-updating 12-month date header. BYCOL reduces a matrix column-by-column, replacing 12 separate MAX() formulas with one.`,
    successMessage:`Modern array functions mastered! SEQUENCE + BYROW + BYCOL + MAKEARRAY represents the frontier of Excel analytical power — these 4 functions can replace entire worksheets of helper columns and manual formulas.`
  },
  insight:`Microsoft 365's dynamic array engine (released 2019) is the largest architectural change to Excel in 20 years. SEQUENCE, BYROW, BYCOL, and MAKEARRAY are available to over 300 million Microsoft 365 users. Finance teams use MAKEARRAY for scenario grids, HR analytics teams use BYROW for row-level compensation calculations, and operations teams use BYCOL for inventory column summaries. Mastering these functions is what separates a power-user analyst from the rest of the team — and they are increasingly tested in senior Excel assessment rounds at investment banks, consulting firms, and tech companies.`
}

); // end EXCEL_LESSONS push (Advanced 13-15)
