/* =========================================================
   lessons-sas.js  — 12 SAS lessons across 3 levels
   All code is simulated (SAS cannot run in-browser).
   Explanations focus on enterprise analytics context.
   ========================================================= */

const SAS_LESSONS = [

/* ═══════════════════════════════════════════════
   BASIC – Lessons 1-4
   ═══════════════════════════════════════════════ */
{
  id:'sas-basic-1', language:'sas', level:'basic', order:1,
  title:'The DATA Step — Reading & Creating Datasets',
  duration:'20 min', xp:100,
  scenario:{
    company:'HealthAnalytics Corp.',role:'Junior SAS Analyst',
    description:`It's your first week as a SAS analyst at a healthcare company. Your manager says: "We have a raw CSV of patient records. Can you bring it into SAS as a dataset and print the first few rows?" The SAS DATA step is how you read, create, and manipulate data — it's the foundation of everything in SAS.`
  },
  objectives:[
    'Understand the role of the SAS DATA step',
    'Use DATALINES to create a dataset inline',
    'Use PROC PRINT to view dataset contents',
    'Understand SAS datasets (libraries, members)'
  ],
  terminology:[
    {term:'DATA Step',lang:'sas',definition:'The primary SAS programming block for creating and manipulating datasets. Reads data row-by-row in an implicit loop.',example:'DATA mydata; INPUT name $ age; DATALINES; Alice 32 Bob 45; RUN;'},
    {term:'PROC Step',lang:'sas',definition:'A pre-built SAS procedure for analysis, reporting, or transformation. Examples: PROC PRINT, PROC MEANS, PROC SQL, PROC REG.',example:'PROC PRINT DATA=mydata; RUN;'},
    {term:'Dataset',lang:'sas',definition:'SAS\'s primary data structure — rows (observations) and columns (variables). Stored in a SAS library.',example:'WORK.employees (temporary), MYLIB.patients (permanent)'},
    {term:'Library',lang:'sas',definition:'A named reference to a folder where SAS datasets are stored. WORK is the default temporary library.',example:'LIBNAME mylib "C:/data/"; /* points SAS to a folder */'},
    {term:'DATALINES',lang:'sas',definition:'A statement that allows you to type raw data directly into a SAS program, line by line.',example:'DATALINES;\nAlice 32\nBob 45\n;'},
    {term:'INPUT',lang:'sas',definition:'Defines the variables to read from raw data. A $ after the variable name indicates a character (text) variable.',example:'INPUT name $ age salary;'},
    {term:'RUN',lang:'sas',definition:'Submits the preceding DATA or PROC step for execution. Every step should end with RUN.',example:'PROC PRINT DATA=work.sales; RUN;'},
    {term:'Observation',lang:'sas',definition:'A single row in a SAS dataset — equivalent to a record in SQL or a DataFrame row in Python.'}
  ],
  theory:`<h3>SAS: The Enterprise Analytics Standard</h3>
<p>SAS (Statistical Analysis System) has been the dominant tool in healthcare, pharma, banking, and government analytics for 50+ years. If you work with clinical trial data, insurance claims, federal datasets, or large-scale risk models, you'll encounter SAS.</p>
<h3>The Two Building Blocks</h3>
<p>Every SAS program is built from two types of steps:</p>
<ul>
<li><strong>DATA step</strong> — create, read, and transform data row by row</li>
<li><strong>PROC step</strong> — run pre-built analytical procedures on datasets</li>
</ul>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>DATA work.newdataset;<br>&nbsp;&nbsp;[data manipulation here]<br>RUN;<br><br>PROC some_procedure DATA=work.newdataset;<br>&nbsp;&nbsp;[procedure options here]<br>RUN;</code></div></div>
<h3>The DATA Step's Implicit Loop</h3>
<p>The DATA step reads data one observation at a time in a loop — even if you don't see the loop. For each row, all statements are executed, then the row is written to the output dataset.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Key insight:</strong> In SAS, you almost never need to write explicit loops for row-level operations. The DATA step loop handles it automatically.</div></div>`,
  steps:[
    {step:1,title:'Create a Dataset with DATALINES',
     explanation:`Create your first SAS dataset by defining variables with INPUT and providing data with DATALINES. The $ after a variable name means it's text (character).`,
     code:`DATA work.employees;\n    INPUT employee_id first_name $ department $ salary;\n    DATALINES;\n1 Sarah Sales 72000\n2 Michael Sales 58000\n3 Emily Marketing 65000\n4 James IT 88000\n5 Lisa Sales 95000\n;\nRUN;`,
     note:'WORK is the default temporary library. Datasets in WORK are deleted when your SAS session ends.',
     after:'SAS reads 5 observations into WORK.EMPLOYEES. The log will show "NOTE: The data set WORK.EMPLOYEES has 5 observations and 4 variables."'},
    {step:2,title:'View Data with PROC PRINT',
     explanation:`PROC PRINT displays dataset contents. Use the OBS= option to limit the number of rows printed.`,
     code:`PROC PRINT DATA=work.employees;\n    TITLE 'Employee Dataset';\nRUN;\n\n/* Print only first 3 rows */\nPROC PRINT DATA=work.employees (OBS=3);\n    TITLE 'First 3 Employees';\nRUN;`,
     note:'TITLE sets a heading for the output. OBS= in parentheses after the dataset name is a dataset option.',
     after:'Output shows all 5 employees with an automatic observation number (Obs) column added by PROC PRINT.'},
    {step:3,title:'Add Calculated Variables in the DATA Step',
     explanation:`Create a new variable (bonus) calculated from existing variables in the DATA step. New variables are written to the output dataset automatically.`,
     code:`DATA work.employees_bonus;\n    SET work.employees;  /* read from existing dataset */\n    bonus = salary * 0.10;\n    annual_total = salary + bonus;\nRUN;\n\nPROC PRINT DATA=work.employees_bonus;\n    TITLE 'Employees with Bonus';\nRUN;`,
     note:'SET reads an existing SAS dataset. You can then add new variables or modify existing ones.',
     after:'The new dataset has 6 variables — the original 4 plus bonus and annual_total calculated for each row.'}
  ],
  challenge:{
    title:'Create a Product Sales Dataset',
    description:`Create a SAS dataset called WORK.PRODUCTS with 5 rows containing: product_id (numeric), product_name (character), category (character), unit_price (numeric), and units_sold (numeric). Then calculate a revenue variable (unit_price * units_sold) and print the result.`,
    hint:`Use INPUT with $ for character variables. Add the revenue calculation after the DATALINES section using SET, or compute it directly in the first DATA step.`,
    starterCode:`/* Step 1: Create the base dataset */\nDATA work.products;\n    INPUT product_id product_name $ category $ unit_price units_sold;\n    DATALINES;\n/* Add 5 rows of product data here */\n;\nRUN;\n\n/* Step 2: Add revenue variable */\nDATA work.products_rev;\n    SET work.products;\n    /* calculate revenue here */\nRUN;\n\nPROC PRINT DATA=work.products_rev;\nRUN;`,
    solution:`DATA work.products;\n    INPUT product_id product_name $ category $ unit_price units_sold;\n    DATALINES;\n1 Laptop Electronics 1299.99 10\n2 Mouse Electronics 29.99 45\n3 Desk Furniture 599.99 8\n4 Chair Furniture 449.99 12\n5 Notebook Supplies 19.99 100\n;\nRUN;\n\nDATA work.products_rev;\n    SET work.products;\n    revenue = unit_price * units_sold;\nRUN;\n\nPROC PRINT DATA=work.products_rev;\n    TITLE 'Product Revenue Report';\nRUN;`,
    explanation:`The first DATA step creates the base dataset using DATALINES. The second DATA step reads it with SET and computes revenue. PROC PRINT displays the result. This "DATA step → intermediate dataset → analysis" workflow is the foundation of SAS programming.`,
    keywords:['DATA','INPUT','DATALINES','SET','RUN','PROC PRINT'],
    successMessage:`Your first complete SAS program! You created data, transformed it, and reported it — the core SAS workflow used in clinical trials, insurance analysis, and financial reporting.`
  },
  insight:`SAS is used in 9 of the top 10 global pharmaceutical companies and virtually all FDA clinical trial submissions. The DATA step and PROC PRINT you just learned are in production at companies like Pfizer, Johnson & Johnson, and the US Census Bureau.`
},

{
  id:'sas-basic-2', language:'sas', level:'basic', order:2,
  title:'PROC MEANS & PROC FREQ — Descriptive Statistics',
  duration:'20 min', xp:110,
  scenario:{
    company:'HealthAnalytics Corp.',role:'SAS Analyst',
    description:`Your manager asks: "Can you give me a summary of our patient dataset? Average age, min/max values, count of patients by condition?" In SAS, PROC MEANS handles numeric summary statistics and PROC FREQ handles frequency counts — the two procedures you'll run first on any new dataset.`
  },
  objectives:[
    'Use PROC MEANS to get numeric descriptive statistics',
    'Use PROC FREQ for frequency counts and crosstabs',
    'Control which statistics are displayed',
    'Group analysis using the CLASS statement'
  ],
  terminology:[
    {term:'PROC MEANS',lang:'sas',definition:'Computes descriptive statistics (N, mean, min, max, std dev) for numeric variables in a dataset.',example:'PROC MEANS DATA=work.patients N MEAN MIN MAX; VAR age weight; RUN;'},
    {term:'PROC FREQ',lang:'sas',definition:'Produces frequency counts and percentage tables for categorical variables. Also tests for association between variables.',example:'PROC FREQ DATA=work.patients; TABLES gender / NOCUM; RUN;'},
    {term:'VAR statement',lang:'sas',definition:'In PROC MEANS/UNIVARIATE, specifies which numeric variables to analyze. Without it, all numeric variables are analyzed.',example:'VAR salary bonus annual_total;'},
    {term:'CLASS statement',lang:'sas',definition:'Groups the analysis by levels of a categorical variable — like GROUP BY in SQL.',example:'CLASS department; /* analyze separately for each dept */'},
    {term:'TABLES statement',lang:'sas',definition:'In PROC FREQ, specifies one or more variables for frequency counts. Use * between variables for crosstabulation.',example:'TABLES gender * condition;  /* 2-way crosstab */'},
    {term:'N',lang:'sas',definition:'The count of non-missing observations for a variable.',example:'PROC MEANS DATA=d N MEAN STDDEV; VAR salary; RUN;'},
    {term:'STDDEV',lang:'sas',definition:'Standard deviation — measures how spread out values are around the mean.'},
    {term:'NOCUM',lang:'sas',definition:'Option in PROC FREQ that suppresses the cumulative frequency and percent columns.',example:'TABLES department / NOCUM;'}
  ],
  theory:`<h3>The First Thing You Do With New Data</h3>
<p>Before any modeling or reporting, analysts always start with exploratory data analysis (EDA): What are the ranges? Are there outliers? How is the data distributed? Missing values? SAS makes this fast with PROC MEANS and PROC FREQ.</p>
<h3>PROC MEANS — Numeric Summaries</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>PROC MEANS DATA=dataset STAT1 STAT2 ...;<br>&nbsp;&nbsp;CLASS grouping_variable;<br>&nbsp;&nbsp;VAR numeric_variable;<br>RUN;</code></div></div>
<p>Common statistics options: <code>N MEAN MEDIAN MIN MAX STDDEV RANGE SUM</code></p>
<h3>PROC FREQ — Categorical Summaries</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>PROC FREQ DATA=dataset;<br>&nbsp;&nbsp;TABLES var1 var2 var1*var2;<br>RUN;</code></div></div>
<p><code>var1*var2</code> creates a crosstabulation (contingency table) between two variables.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>PROC MEANS and PROC FREQ together take less than 30 seconds to summarize any new dataset. They should be your first two PROCs on any data you've never seen before.</div></div>`,
  steps:[
    {step:1,title:'Basic Descriptive Statistics with PROC MEANS',
     explanation:`Get key summary statistics for numeric variables in the employee dataset. Specify exactly which statistics you want.`,
     code:`PROC MEANS DATA=work.employees N MEAN MEDIAN MIN MAX STDDEV;\n    VAR salary;\n    TITLE 'Salary Summary Statistics';\nRUN;`,
     after:'Output shows: N=5, Mean=75,600, Median=72,000, Min=58,000, Max=95,000, StdDev=14,247. A full picture of the salary distribution in seconds.'},
    {step:2,title:'Group Analysis with CLASS',
     explanation:`Break down salary statistics BY department using the CLASS statement. This is equivalent to GROUP BY in SQL.`,
     code:`PROC MEANS DATA=work.employees N MEAN MAX MIN;\n    CLASS department;\n    VAR salary;\n    TITLE 'Salary by Department';\nRUN;`,
     after:'Separate statistics for each department. CLASS automatically creates sub-groups and calculates separately — no need to write separate queries.'},
    {step:3,title:'Frequency Counts with PROC FREQ',
     explanation:`Count how many employees are in each department and what percentage they represent.`,
     code:`PROC FREQ DATA=work.employees;\n    TABLES department / NOCUM;\n    TITLE 'Employee Count by Department';\nRUN;\n\n/* Two-way frequency table: department BY some_flag */\nPROC FREQ DATA=work.employees;\n    TABLES department * employee_id / NOFREQ NOPERCENT;\n    TITLE 'Department-Employee Crosstab';\nRUN;`,
     note:'NOCUM = no cumulative column. NOFREQ = hide frequency count in crosstab. NOPERCENT = hide percentages.',
     after:'PROC FREQ shows count and percent for each department. The crosstab (*) version shows a matrix view.'}
  ],
  challenge:{
    title:'Patient Data Analysis',
    description:`Using the following DATALINES data (create it first), calculate: (1) overall statistics for age and blood_pressure variables using PROC MEANS, and (2) a frequency count of diagnosis using PROC FREQ. The data has variables: patient_id, age, blood_pressure (numeric), gender ($), diagnosis ($).`,
    hint:`Create the dataset first with a DATA step + DATALINES. Then run PROC MEANS with VAR age blood_pressure, and PROC FREQ with TABLES diagnosis / NOCUM.`,
    starterCode:`/* Step 1: Create patient dataset */\nDATA work.patients;\n    INPUT patient_id age blood_pressure gender $ diagnosis $;\n    DATALINES;\n1 45 125 M Hypertension\n2 38 118 F Normal\n3 62 140 M Hypertension\n4 29 112 F Normal\n5 55 135 M Hypertension\n6 41 122 F Normal\n7 70 150 M Hypertension\n8 33 115 F Normal\n;\nRUN;\n\n/* Step 2: Summary statistics */\nPROC MEANS DATA=work.patients N MEAN MIN MAX STDDEV;\n    /* Add VAR statement */\nRUN;\n\n/* Step 3: Frequency count */\nPROC FREQ DATA=work.patients;\n    /* Add TABLES statement */\nRUN;`,
    solution:`DATA work.patients;\n    INPUT patient_id age blood_pressure gender $ diagnosis $;\n    DATALINES;\n1 45 125 M Hypertension\n2 38 118 F Normal\n3 62 140 M Hypertension\n4 29 112 F Normal\n5 55 135 M Hypertension\n6 41 122 F Normal\n7 70 150 M Hypertension\n8 33 115 F Normal\n;\nRUN;\n\nPROC MEANS DATA=work.patients N MEAN MIN MAX STDDEV;\n    VAR age blood_pressure;\n    TITLE 'Patient Vital Statistics';\nRUN;\n\nPROC FREQ DATA=work.patients;\n    TABLES diagnosis / NOCUM;\n    TITLE 'Diagnosis Frequency';\nRUN;`,
    explanation:`PROC MEANS analyzes both numeric variables in one pass. The TITLE helps label output in reports. PROC FREQ with NOCUM gives a clean count and percent table without the cumulative columns.`,
    keywords:['PROC MEANS','PROC FREQ','VAR','TABLES','DATALINES','CLASS'],
    successMessage:`Patient summary complete! These two PROCs are how every clinical analyst begins examining a new dataset — fast, complete, and no manual calculation needed.`
  },
  insight:`Every regulated industry (pharma, banking, insurance) runs PROC MEANS and PROC FREQ as standard quality checks before any analytical work. At the FDA, submitted clinical trial analyses must include these summaries in defined Table/Listing/Figure (TLF) formats.`
},

{
  id:'sas-basic-3', language:'sas', level:'basic', order:3,
  title:'DATA Step Logic — IF/THEN, WHERE, and Formats',
  duration:'20 min', xp:120,
  scenario:{
    company:'HealthAnalytics Corp.',role:'SAS Analyst',
    description:`You need to clean and enrich your patient dataset: create a derived age group variable, filter out incomplete records, and apply formats so that coded values (like "M"/"F") display as meaningful labels. These are everyday DATA step tasks in clinical and business analytics.`
  },
  objectives:[
    'Use IF/THEN/ELSE for conditional variable assignment',
    'Filter observations with WHERE (and DELETE)',
    'Apply SAS formats for display-friendly output',
    'Use the LENGTH statement to prevent truncation'
  ],
  terminology:[
    {term:'IF/THEN/ELSE',lang:'sas',definition:'Conditional logic in the DATA step. Works like CASE WHEN in SQL — evaluates conditions and executes actions.',example:'IF age >= 65 THEN age_group = "Senior"; ELSE age_group = "Non-Senior";'},
    {term:'WHERE (DATA step)',lang:'sas',definition:'Filters observations read into a dataset. More efficient than IF for filtering because it prevents unmatched rows from entering the PDV.',example:'WHERE salary > 50000;'},
    {term:'DELETE',lang:'sas',definition:'Removes the current observation from being written to the output dataset. Used inside IF conditions.',example:'IF missing(salary) THEN DELETE;'},
    {term:'FORMAT',lang:'sas',definition:'Associates a display format with a variable. Formats change how data is displayed without changing the stored value.',example:"FORMAT hire_date MMDDYY10.;  /* displays as 03/15/2019 */"},
    {term:'PROC FORMAT',lang:'sas',definition:'Creates custom formats — maps stored values to display labels.',example:"PROC FORMAT; VALUE genderfmt 'M'='Male' 'F'='Female'; RUN;"},
    {term:'LENGTH',lang:'sas',definition:'Sets the maximum length for a character variable. Must be defined before the first assignment to avoid truncation.',example:'LENGTH age_group $ 20;'},
    {term:'MISSING()',lang:'sas',definition:'Returns TRUE if a variable has a missing value (SAS uses . for numeric missing, blank for character).',example:'IF MISSING(salary) THEN DELETE;'},
    {term:'IN operator',lang:'sas',definition:'Tests membership in a list — SAS version of SQL IN.',example:"IF department IN ('Sales', 'Marketing') THEN bonus_eligible = 'Y';"}
  ],
  theory:`<h3>The DATA Step: More Than Just Reading Data</h3>
<p>The DATA step is also your primary data transformation tool. Each observation passes through all statements, allowing you to:</p>
<ul>
<li>Create derived variables (age groups, flags, calculated fields)</li>
<li>Filter out irrelevant or invalid records</li>
<li>Recode and label values for reporting</li>
</ul>
<h3>SAS Formats — Making Data Readable</h3>
<p>SAS stores dates as numbers (days since Jan 1, 1960) and codes as short strings. Formats are display masks applied at output time:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>FORMAT salary DOLLAR12.2;    /* $72,000.00 */<br>FORMAT hire_date DATE9.;      /* 15MAR2019 */<br>FORMAT pct PERCENT8.1;       /* 72.5%    */</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>LENGTH Warning:</strong> In SAS, a character variable's length is set the <em>first time</em> it's assigned. If "Yes" is assigned before "Definitely Not", the variable is truncated at 3 characters. Always define LENGTH before assignments.</div></div>`,
  steps:[
    {step:1,title:'IF/THEN/ELSE — Create Derived Variables',
     explanation:`Create an age_group variable from the numeric age. Use ELSE IF to chain multiple conditions.`,
     code:`DATA work.patients_grp;\n    SET work.patients;\n    LENGTH age_group $ 15;\n    IF age < 18 THEN age_group = 'Pediatric';\n    ELSE IF 18 <= age < 45 THEN age_group = 'Adult';\n    ELSE IF 45 <= age < 65 THEN age_group = 'Middle Age';\n    ELSE age_group = 'Senior';\nRUN;\n\nPROC PRINT DATA=work.patients_grp;\n    VAR patient_id age age_group;\nRUN;`,
     after:'Each patient now has an age group label. The LENGTH statement prevents truncation — without it, the first assigned value would set the length.'},
    {step:2,title:'WHERE to Filter Observations',
     explanation:`Create a dataset containing only patients diagnosed with Hypertension.`,
     code:`DATA work.hypertension_pts;\n    SET work.patients;\n    WHERE diagnosis = 'Hypertension';\nRUN;\n\nPROC PRINT DATA=work.hypertension_pts;\n    TITLE 'Hypertension Patients Only';\nRUN;`,
     note:'WHERE in a DATA step is more efficient than IF for filtering — SQL-like syntax, same result.',
     after:'Only hypertension patients are in the new dataset — used for disease-specific analysis in clinical research.'},
    {step:3,title:'Custom Formats with PROC FORMAT',
     explanation:`Create a format that maps "M"/"F" to "Male"/"Female", then apply it to the gender variable in output.`,
     code:`/* Define the format */\nPROC FORMAT;\n    VALUE $ genderfmt\n        'M' = 'Male'\n        'F' = 'Female';\n    VALUE agefmt\n        LOW - 17  = 'Pediatric (<18)'\n        18  - 44  = 'Adult (18-44)'\n        45  - 64  = 'Middle Age (45-64)'\n        65  - HIGH = 'Senior (65+)';\nRUN;\n\n/* Apply the format */\nPROC PRINT DATA=work.patients;\n    FORMAT gender $genderfmt. age agefmt.;\n    TITLE 'Patient Summary with Formats';\nRUN;`,
     note:'$ before a format name = character format. Formats end with a period (.) when applied.',
     after:'"M" now displays as "Male", and ages display as their group label. The underlying data is unchanged — formats are display-only.'}
  ],
  challenge:{
    title:'Employee Risk Classification',
    description:`Using the employees dataset, add a variable called risk_flag: 'High Risk' if salary < 60000 AND department = 'Sales', 'Watch List' if salary < 70000 but not Sales, and 'Low Risk' otherwise. Also create a compensation_band based on salary: 'Band A' (<= 65k), 'Band B' (65k–90k), 'Band C' (>90k). Print the result.`,
    hint:`Use LENGTH statements before the IF/THEN. Chain ELSE IF conditions for both new variables.`,
    starterCode:`DATA work.employees_risk;\n    SET work.employees;\n    LENGTH risk_flag $ 12 compensation_band $ 8;\n    /* Add risk_flag logic */\n    IF salary < 60000 AND department = 'Sales' THEN risk_flag = 'High Risk';\n    ELSE IF salary < 70000 THEN risk_flag = 'Watch List';\n    ELSE risk_flag = 'Low Risk';\n    /* Add compensation_band logic */\n\nRUN;\n\nPROC PRINT DATA=work.employees_risk;\n    VAR first_name department salary risk_flag compensation_band;\nRUN;`,
    solution:`DATA work.employees_risk;\n    SET work.employees;\n    LENGTH risk_flag $ 12 compensation_band $ 8;\n    IF salary < 60000 AND department = 'Sales' THEN risk_flag = 'High Risk';\n    ELSE IF salary < 70000 THEN risk_flag = 'Watch List';\n    ELSE risk_flag = 'Low Risk';\n    IF salary <= 65000 THEN compensation_band = 'Band A';\n    ELSE IF salary <= 90000 THEN compensation_band = 'Band B';\n    ELSE compensation_band = 'Band C';\nRUN;\n\nPROC PRINT DATA=work.employees_risk;\n    VAR first_name department salary risk_flag compensation_band;\n    TITLE 'Employee Risk and Compensation Classification';\nRUN;`,
    explanation:`Two separate IF/THEN/ELSE blocks create two independent derived variables. LENGTH is declared first for both character variables to prevent truncation. SET reads the existing employees dataset.`,
    keywords:['IF','THEN','ELSE','LENGTH','SET','PROC PRINT'],
    successMessage:`Risk classification complete! This IF/THEN pattern is how clinical trials create derived variables (responder vs. non-responder), how banks classify credit risk, and how insurers segment policyholders.`
  },
  insight:`In pharmaceutical clinical trials, derived variables (like response status, age groups, and risk classifications) are created following strict Statistical Analysis Plans (SAPs). The SAS DATA step IF/THEN logic you just practiced is in thousands of FDA submissions.`
},

{
  id:'sas-basic-4', language:'sas', level:'basic', order:4,
  title:'PROC SORT & Combining Datasets — SET and MERGE',
  duration:'20 min', xp:120,
  scenario:{
    company:'HealthAnalytics Corp.',role:'SAS Analyst',
    description:`You have two datasets: one with patient demographics and one with their test results. You need to combine them into a single analysis-ready dataset. In SAS, PROC SORT + MERGE is the classic way to join datasets by a common key — the SAS equivalent of SQL's JOIN.`
  },
  objectives:[
    'Sort datasets with PROC SORT',
    'Combine datasets vertically with SET (appending)',
    'Combine datasets horizontally with MERGE (joining)',
    'Use the BY statement for grouped operations'
  ],
  terminology:[
    {term:'PROC SORT',lang:'sas',definition:'Sorts a SAS dataset by one or more variables. Required before BY-group processing or MERGE.',example:'PROC SORT DATA=work.patients; BY patient_id; RUN;'},
    {term:'MERGE',lang:'sas',definition:'Combines two or more datasets side-by-side (horizontally) by matching observations on a BY key. Like SQL JOIN.',example:'MERGE work.demographics work.labs; BY patient_id;'},
    {term:'SET (stacking)',lang:'sas',definition:'When SET lists two or more datasets, it stacks them vertically (appends). Like SQL UNION ALL.',example:'DATA combined; SET work.jan_data work.feb_data; RUN;'},
    {term:'BY statement',lang:'sas',definition:'In a DATA step with MERGE, specifies the key variable(s) for matching. Datasets must be sorted by this key first.',example:'BY patient_id;'},
    {term:'IN= option',lang:'sas',definition:'A dataset option that creates a temporary binary variable indicating which dataset contributed the current observation.',example:'MERGE demo(IN=indem) labs(IN=inlab); BY id;'},
    {term:'NODUPKEY',lang:'sas',definition:'Option in PROC SORT that removes duplicate observations for the BY key variables.',example:'PROC SORT DATA=d NODUPKEY; BY patient_id; RUN;'},
    {term:'OUT= option',lang:'sas',definition:'In PROC SORT, saves the sorted dataset to a new name instead of overwriting the original.',example:'PROC SORT DATA=original OUT=sorted_copy; BY id; RUN;'}
  ],
  theory:`<h3>Why Sort Before Merge?</h3>
<p>Unlike SQL, SAS's MERGE requires datasets to be sorted by the BY variable. If they're not sorted, results will be incorrect or SAS will throw an error. PROC SORT is always step one before MERGE.</p>
<h3>SET vs. MERGE</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>/* Stacking (UNION ALL equivalent) */<br>DATA combined;<br>&nbsp;&nbsp;SET dataset1 dataset2;  /* rows are stacked */<br>RUN;<br><br>/* Matching (JOIN equivalent) */<br>PROC SORT DATA=dataset1; BY key; RUN;<br>PROC SORT DATA=dataset2; BY key; RUN;<br>DATA merged;<br>&nbsp;&nbsp;MERGE dataset1 dataset2;<br>&nbsp;&nbsp;BY key;<br>RUN;</code></div></div>
<h3>Controlling Which Observations to Keep (IN=)</h3>
<p>The IN= dataset option is how you replicate SQL's INNER, LEFT, and RIGHT JOIN behavior:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>MERGE dem(IN=a) labs(IN=b); BY id;<br>IF a AND b; &nbsp;&nbsp;/* INNER JOIN: only rows in both */<br>IF a; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/* LEFT JOIN: all from dem */<br>IF a AND NOT b; /* Anti-join: dem without labs */</code></div></div>`,
  steps:[
    {step:1,title:'Sort with PROC SORT',
     explanation:`Sort the patients dataset by patient_id (ascending) and also demonstrate sorting by multiple variables.`,
     code:`/* Sort by single key */\nPROC SORT DATA=work.patients OUT=work.patients_sorted;\n    BY patient_id;\nRUN;\n\n/* Sort by multiple columns */\nPROC SORT DATA=work.patients OUT=work.patients_multi;\n    BY diagnosis DESCENDING age;\nRUN;\n\nPROC PRINT DATA=work.patients_multi;\n    TITLE 'Patients Sorted by Diagnosis then Age Desc';\nRUN;`,
     note:'DESCENDING reverses the sort order for the variable it precedes. Variables without DESCENDING sort ascending.',
     after:'Dataset is now sorted by diagnosis alphabetically, then by age from oldest to youngest within each diagnosis group.'},
    {step:2,title:'Stack Datasets Vertically with SET',
     explanation:`Create two small datasets (Q1 and Q2 sales) and stack them into one combined dataset.`,
     code:`DATA work.q1_sales;\n    INPUT rep_id $ amount;\n    DATALINES;\nS001 12500\nS002 9800\nS003 15600\n;\nRUN;\n\nDATA work.q2_sales;\n    INPUT rep_id $ amount;\n    DATALINES;\nS001 14200\nS002 11300\nS004 8900\n;\nRUN;\n\n/* Stack Q1 and Q2 together */\nDATA work.all_sales;\n    SET work.q1_sales work.q2_sales;\nRUN;\n\nPROC PRINT DATA=work.all_sales; TITLE 'All Sales'; RUN;`,
     after:'6 combined rows — Q1 and Q2 stacked vertically. Equivalent to SQL UNION ALL.'},
    {step:3,title:'Join Datasets with MERGE',
     explanation:`Join a demographics dataset with a lab results dataset on patient_id using PROC SORT then MERGE.`,
     code:`/* Create datasets */\nDATA work.demographics;\n    INPUT patient_id age gender $;\n    DATALINES;\n1 45 M\n2 38 F\n3 62 M\n4 29 F\n;\nRUN;\n\nDATA work.labs;\n    INPUT patient_id cholesterol blood_sugar;\n    DATALINES;\n1 210 98\n2 185 92\n3 240 110\n5 195 88\n;\nRUN;\n\n/* Sort both by key */\nPROC SORT DATA=work.demographics; BY patient_id; RUN;\nPROC SORT DATA=work.labs; BY patient_id; RUN;\n\n/* INNER JOIN with IN= */\nDATA work.combined;\n    MERGE work.demographics(IN=indem) work.labs(IN=inlab);\n    BY patient_id;\n    IF indem AND inlab; /* only rows in BOTH */\nRUN;\n\nPROC PRINT DATA=work.combined; TITLE 'Matched Patient Records'; RUN;`,
     after:'Only patients 1, 2, and 3 appear — patient 4 has no labs, patient 5 has labs but no demographics. The IN= logic implements an inner join.'}
  ],
  challenge:{
    title:'Link Employees to Department Budgets',
    description:`Create a WORK.DEPT_BUDGETS dataset (5 rows: Sales 1500000, Marketing 900000, IT 1200000, Finance 700000, HR 450000 — variables: department $, budget). Then merge it with WORK.EMPLOYEES so each employee row shows their department's budget. Use a LEFT JOIN approach (keep all employees even if budget data is missing). Add a \`pct_of_budget\` variable = salary / budget * 100.`,
    hint:`1. Create DEPT_BUDGETS with DATALINES. 2. PROC SORT both datasets BY department. 3. MERGE with IN= variables, IF inall; for left join means IF a (employees);. 4. Calculate pct_of_budget in the DATA step.`,
    starterCode:`/* Step 1: Create dept budget data */\nDATA work.dept_budgets;\n    INPUT department $ budget;\n    DATALINES;\nSales 1500000\nMarketing 900000\nIT 1200000\nFinance 700000\nHR 450000\n;\nRUN;\n\n/* Step 2: Sort both datasets */\nPROC SORT DATA=work.employees; BY department; RUN;\nPROC SORT DATA=work.dept_budgets; BY department; RUN;\n\n/* Step 3: Merge */\nDATA work.emp_with_budget;\n    MERGE work.employees(IN=inemp) work.dept_budgets(IN=inbudg);\n    BY department;\n    IF inemp; /* left join - keep all employees */\n    pct_of_budget = salary / budget * 100;\nRUN;\n\nPROC PRINT DATA=work.emp_with_budget;\n    VAR first_name department salary budget pct_of_budget;\nRUN;`,
    solution:`DATA work.dept_budgets;\n    INPUT department $ budget;\n    DATALINES;\nSales 1500000\nMarketing 900000\nIT 1200000\nFinance 700000\nHR 450000\n;\nRUN;\n\nPROC SORT DATA=work.employees; BY department; RUN;\nPROC SORT DATA=work.dept_budgets; BY department; RUN;\n\nDATA work.emp_with_budget;\n    MERGE work.employees(IN=inemp) work.dept_budgets(IN=inbudg);\n    BY department;\n    IF inemp;\n    pct_of_budget = ROUND(salary / budget * 100, 0.01);\nRUN;\n\nPROC PRINT DATA=work.emp_with_budget;\n    VAR first_name department salary budget pct_of_budget;\n    TITLE 'Employees with Department Budget Share';\nRUN;`,
    explanation:`PROC SORT must be run on BOTH datasets by the same BY key. MERGE combines them horizontally. IF inemp keeps all employees (left join). The pct_of_budget variable is computed in the same DATA step immediately after the merge.`,
    keywords:['PROC SORT','MERGE','BY','IN=','SET','DATALINES'],
    successMessage:`Dataset merge complete! The SORT → MERGE → IN= pattern is the SAS workhorse for combining data tables — found in virtually every enterprise SAS program.`
  },
  insight:`At banks, insurers, and pharma companies, datasets arrive from different systems (claims, demographics, prescriptions, labs) and must be merged daily. The SORT + MERGE workflow you just learned is at the heart of every SAS ETL pipeline in regulated industries.`
},

/* ═══════════════════════════════════════════════
   INTERMEDIATE – Lessons 5-8
   ═══════════════════════════════════════════════ */
{
  id:'sas-inter-1', language:'sas', level:'intermediate', order:1,
  title:'PROC SQL in SAS — SQL Inside SAS',
  duration:'25 min', xp:150,
  scenario:{
    company:'HealthAnalytics Corp.',role:'SAS Analyst',
    description:`Your manager knows you're good with SQL. "Did you know SAS has a full SQL engine built in?" PROC SQL lets you write standard SQL queries against SAS datasets — no SORT required before joins, supports subqueries, and can create datasets or reports directly. It bridges your SQL skills into the SAS environment.`
  },
  objectives:[
    'Execute SQL queries inside SAS using PROC SQL',
    'Create SAS datasets from SQL queries with CREATE TABLE AS',
    'Use SQL JOINs on SAS datasets (no pre-sort needed)',
    'Leverage PROC SQL for operations that are verbose in the DATA step'
  ],
  terminology:[
    {term:'PROC SQL',lang:'sas',definition:'SAS procedure that executes SQL statements against SAS datasets. Supports SELECT, JOIN, GROUP BY, subqueries, and more.',example:'PROC SQL; SELECT * FROM work.patients; QUIT;'},
    {term:'QUIT',lang:'sas',definition:'Terminates PROC SQL (unlike RUN which executes each step — QUIT exits the entire PROC SQL session).',example:'PROC SQL;\n  SELECT ...\nQUIT;'},
    {term:'CREATE TABLE AS',lang:'sas',definition:'Creates a new SAS dataset from a SQL SELECT result — the SAS equivalent of SELECT INTO or CREATE TABLE AS SELECT.',example:'PROC SQL;\n  CREATE TABLE work.summary AS\n  SELECT dept, COUNT(*) AS n FROM work.emp GROUP BY dept;\nQUIT;'},
    {term:'INOBS=',lang:'sas',definition:'PROC SQL option limiting the number of rows read. Useful for testing on large datasets.',example:'PROC SQL INOBS=100;'},
    {term:'CALCULATED',lang:'sas',definition:'In PROC SQL, references a column created in the same SELECT list (SAS extension to standard SQL).',example:'SELECT salary, salary*0.1 AS bonus, CALCULATED bonus + salary AS total FROM emp;'},
    {term:'NOPRINT',lang:'sas',definition:'Prevents PROC SQL from printing output — useful when only creating a dataset.',example:'PROC SQL NOPRINT; CREATE TABLE ... QUIT;'}
  ],
  theory:`<h3>When to Use PROC SQL vs. DATA Step</h3>
<p>Experienced SAS programmers choose between DATA step and PROC SQL based on the task:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Use DATA Step for:<br>  • Complex row-by-row logic<br>  • Reading external files<br>  • Array processing<br>  • Defining custom formats<br><br>Use PROC SQL for:<br>  • JOINs (no pre-sorting required)<br>  • Subqueries and CTEs<br>  • GROUP BY summaries<br>  • When you think in SQL</code></div></div>
<h3>The PROC SQL Structure</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>PROC SQL [options];<br>&nbsp;&nbsp;SELECT ...;<br>&nbsp;&nbsp;CREATE TABLE ... AS SELECT ...;<br>QUIT;  /* note: QUIT not RUN */</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>PROC SQL is particularly valuable when transitioning from a SQL-heavy background to SAS. You can leverage your existing SQL knowledge while learning the DATA step gradually.</div></div>`,
  steps:[
    {step:1,title:'Basic PROC SQL Query',
     explanation:`Run a standard SELECT query using PROC SQL against a SAS dataset. Syntax is nearly identical to SQL Server/MySQL.`,
     code:`PROC SQL;\n    SELECT\n        first_name,\n        last_name,\n        department,\n        salary\n    FROM work.employees\n    WHERE salary > 70000\n    ORDER BY salary DESC;\nQUIT;`,
     after:'Results appear in the output window. The only SAS-specific thing here is the wrapper (PROC SQL; ... QUIT;) — the SQL itself is standard.'},
    {step:2,title:'GROUP BY and Aggregates',
     explanation:`Use GROUP BY to summarize — count employees and average salary by department.`,
     code:`PROC SQL;\n    SELECT\n        department,\n        COUNT(*) AS headcount,\n        ROUND(AVG(salary), 0) AS avg_salary,\n        MAX(salary) AS max_salary\n    FROM work.employees\n    GROUP BY department\n    HAVING COUNT(*) >= 1\n    ORDER BY avg_salary DESC;\nQUIT;`,
     after:'Standard SQL GROUP BY + HAVING works exactly as in SQL Server or PostgreSQL. PROC SQL knows SAS datasets are just like database tables.'},
    {step:3,title:'CREATE TABLE — Save SQL Results to a Dataset',
     explanation:`Save a SQL query result as a permanent SAS dataset using CREATE TABLE AS. Then use it in downstream steps.`,
     code:`PROC SQL NOPRINT;\n    CREATE TABLE work.dept_summary AS\n    SELECT\n        department,\n        COUNT(*) AS headcount,\n        ROUND(AVG(salary), 0) AS avg_salary,\n        SUM(salary) AS total_payroll\n    FROM work.employees\n    GROUP BY department;\nQUIT;\n\n/* Now use it like any SAS dataset */\nPROC PRINT DATA=work.dept_summary;\n    TITLE 'Department Payroll Summary';\nRUN;`,
     note:'NOPRINT suppresses inline output when you only want the dataset, not the printed table.',
     after:'The dept_summary dataset is created and available for further analysis by any subsequent SAS step.'}
  ],
  challenge:{
    title:'Merge and Summarize Using PROC SQL',
    description:`Using PROC SQL only: join WORK.EMPLOYEES with WORK.DEPT_BUDGETS (from the previous lesson) and return each department's name, total payroll (sum of salaries), the budget, and payroll as a percentage of budget. Sort by the percentage descending.`,
    hint:`Use an INNER JOIN on department. Use SUM(e.salary) and GROUP BY e.department. Divide sum_salary by budget and multiply by 100 for the percentage.`,
    starterCode:`PROC SQL;\n    SELECT\n        e.department,\n        SUM(e.salary) AS total_payroll,\n        /* budget from dept_budgets */\n        /* payroll_pct calculation */\n    FROM work.employees AS e\n    /* JOIN dept_budgets */\n    GROUP BY e.department\n    ORDER BY /* percent column */ DESC;\nQUIT;`,
    solution:`PROC SQL;\n    SELECT\n        e.department,\n        SUM(e.salary)           AS total_payroll,\n        d.budget,\n        ROUND(100 * SUM(e.salary) / d.budget, 2) AS payroll_pct\n    FROM work.employees AS e\n    INNER JOIN work.dept_budgets AS d\n        ON e.department = d.department\n    GROUP BY e.department, d.budget\n    ORDER BY payroll_pct DESC;\nQUIT;`,
    explanation:`PROC SQL JOINs need no pre-sorting. GROUP BY both the department name and budget (budget is a non-aggregated column from the joined table). The ROUND function rounds to 2 decimal places.`,
    keywords:['PROC SQL','CREATE TABLE','INNER JOIN','GROUP BY','HAVING','QUIT'],
    successMessage:`PROC SQL join and summary complete! You can now move seamlessly between SQL logic and SAS — a powerful combination in enterprise analytics.`
  },
  insight:`Many SAS programmers who also know SQL maintain two skills simultaneously: DATA step for complex ETL, PROC SQL for analytical queries. Major pharma companies and banks run thousands of PROC SQL queries daily for reporting and compliance.`
},

{
  id:'sas-inter-2', language:'sas', level:'intermediate', order:2,
  title:'SAS Arrays & DO Loops — Efficient Iteration',
  duration:'25 min', xp:160,
  scenario:{
    company:'HealthAnalytics Corp.',role:'SAS Analyst',
    description:`You have a dataset with 12 monthly revenue columns (revenue_jan through revenue_dec). Your task: flag any month where revenue dropped more than 20% vs. the previous month, calculate the year total, and find the max month — all without writing 12 repetitive IF statements. SAS arrays and DO loops make this elegant.`
  },
  objectives:[
    'Define and traverse arrays in the DATA step',
    'Use DO loops for iterative processing',
    'Apply arrays for wide-format (many-column) data transformation',
    'Combine arrays with IF logic for flagging'
  ],
  terminology:[
    {term:'ARRAY',lang:'sas',definition:'Groups a set of variables under a single name for iterative processing. Arrays exist only within the DATA step.',example:'ARRAY revenue{12} rev_jan--rev_dec;  /* array of 12 variables */'},
    {term:'DO loop',lang:'sas',definition:'Repeats a block of SAS statements. DO i = 1 TO n iterates from 1 to n. Must end with END.',example:'DO i = 1 TO 12; total + revenue{i}; END;'},
    {term:'Array subscript {}',lang:'sas',definition:'The index used to access an element in an array. revenue{3} accesses the 3rd element.',example:'revenue{i}  /* i is the loop counter */'},
    {term:'DO WHILE',lang:'sas',definition:'Loops while a condition is true. Checks the condition before each iteration.',example:'DO WHILE (i < 10 AND NOT MISSING(x));'},
    {term:'Variable list (--)',lang:'sas',definition:'Shorthand to reference a range of consecutively numbered variables.',example:'ARRAY monthly{12} jan1--dec12;'},
    {term:'_NUMERIC_',lang:'sas',definition:'Special array reference that includes ALL numeric variables in the dataset automatically.',example:'ARRAY nums{*} _NUMERIC_;'}
  ],
  theory:`<h3>The Problem Arrays Solve</h3>
<p>Wide-format data often has 12 months, 52 weeks, or 100 test items as separate columns. Repeating the same logic 12 times is error-prone and unmaintainable. Arrays let you treat a group of variables as an indexed sequence:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>ARRAY rev{12} rev_jan rev_feb ... rev_dec;<br>DO i = 1 TO 12;<br>&nbsp;&nbsp;total_rev + rev{i};  /* += shorthand */<br>END;</code></div></div>
<h3>Temporary Array Elements</h3>
<p>Use ARRAY _TEMP_ {n} to create working variables that are not stored in the output dataset — useful for intermediate calculations.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Arrays in SAS are commonly used in clinical trials to process lab values, questionnaire scores, and repeated measurements across visits. They're essential for any wide-format dataset.</div></div>`,
  steps:[
    {step:1,title:'Define an Array and Sum Values',
     explanation:`Create a dataset with 4 quarterly revenue values, then use an array and DO loop to calculate the annual total and average.`,
     code:`DATA work.quarterly_rev;\n    INPUT company $ q1 q2 q3 q4;\n    ARRAY quarters{4} q1 q2 q3 q4;\n    annual_total = 0;\n    DO i = 1 TO 4;\n        annual_total + quarters{i};\n    END;\n    avg_quarter = annual_total / 4;\n    DROP i; /* don't keep the loop counter */\n    DATALINES;\nAlpha 120000 135000 148000 162000\nBeta  98000  102000 117000 125000\nGamma 210000 225000 198000 240000\n;\nRUN;\n\nPROC PRINT DATA=work.quarterly_rev;\nRUN;`,
     note:'The + operator in annual_total + quarters{i} is SAS\'s accumulation shorthand — same as annual_total = annual_total + quarters{i}.',
     after:'Each company row shows individual quarters plus the calculated annual total and average — all via a 3-line DO loop instead of 4 separate statements.'},
    {step:2,title:'Find Max and Flag Below Average',
     explanation:`Extend the array loop to find the max quarter and flag any quarter below the yearly average.`,
     code:`DATA work.quarterly_analysis;\n    SET work.quarterly_rev;\n    ARRAY quarters{4} q1 q2 q3 q4;\n    ARRAY flags{4} flag1 flag2 flag3 flag4;\n    max_quarter = 0;\n    DO i = 1 TO 4;\n        IF quarters{i} > max_quarter THEN max_quarter = quarters{i};\n        IF quarters{i} < avg_quarter THEN flags{i} = 1;\n        ELSE flags{i} = 0;\n    END;\n    DROP i;\nRUN;\n\nPROC PRINT DATA=work.quarterly_analysis;\n    TITLE 'Quarterly Analysis with Flags';\nRUN;`,
     after:'Each quarter has a flag (1=below average, 0=at or above). Using a second array (flags) in the same loop keeps code clean.'},
    {step:3,title:'Standardize Multiple Variables',
     explanation:`A common clinical analytics task: standardize all numeric variables to z-scores (subtract mean, divide by std dev) using _NUMERIC_ to avoid naming each variable.`,
     code:`PROC MEANS DATA=work.quarterly_rev NOPRINT OUTPUT OUT=work.stats MEAN= STD= / AUTONAME;\nRUN;\n\n/* Simple standardization via DO loop and array */\nDATA work.normalized;\n    SET work.quarterly_rev;\n    ARRAY raw{4} q1 q2 q3 q4;\n    ARRAY norm{4} norm_q1 norm_q2 norm_q3 norm_q4;\n    /* Hardcoded stats for illustration */\n    ARRAY means{4} (141667 165500 154333 175667);\n    ARRAY stds{4}  (57028  62659  40622  57694);\n    DO i = 1 TO 4;\n        norm{i} = (raw{i} - means{i}) / stds{i};\n    END;\n    DROP i;\nRUN;\n\nPROC PRINT DATA=work.normalized;\n    VAR company norm_q1 -- norm_q4;\nRUN;`,
     after:'Standardized z-scores for each quarter. The array approach scales to 100+ variables with zero additional code.'}
  ],
  challenge:{
    title:'Lab Value Imputation',
    description:`Clinical datasets frequently have missing lab values. Create a dataset with 3 patients and 5 lab measurements (lab1–lab5). Some values are missing (use a period . for numeric missing). Use an array and DO loop to: (1) count missing values per patient, (2) calculate the mean of available values, (3) replace any missing value with the row mean (imputation). Print before and after.`,
    hint:`ARRAY labs{5} lab1-lab5; Count missing with: IF MISSING(labs{i}) THEN missing_count + 1; Calculate mean from non-missing values. Second pass replaces missing: IF MISSING(labs{i}) THEN labs{i} = row_mean;`,
    starterCode:`DATA work.lab_data;\n    INPUT patient_id lab1 lab2 lab3 lab4 lab5;\n    DATALINES;\n1 5.2 4.8 . 5.5 4.9\n2 3.1 . 3.8 . 3.2\n3 7.1 7.4 7.0 6.9 .\n;\nRUN;\n\nDATA work.labs_imputed;\n    SET work.lab_data;\n    ARRAY labs{5} lab1-lab5;\n    /* Count non-missing and compute mean */\n    n_avail = 0;\n    total = 0;\n    DO i = 1 TO 5;\n        IF NOT MISSING(labs{i}) THEN DO;\n            n_avail + 1;\n            total + labs{i};\n        END;\n    END;\n    row_mean = total / n_avail;\n    /* Impute missing with row mean */\n    DO i = 1 TO 5;\n        IF MISSING(labs{i}) THEN labs{i} = ROUND(row_mean, 0.01);\n    END;\n    DROP i total n_avail;\nRUN;\n\nPROC PRINT DATA=work.labs_imputed; RUN;`,
    solution:`DATA work.lab_data;\n    INPUT patient_id lab1 lab2 lab3 lab4 lab5;\n    DATALINES;\n1 5.2 4.8 . 5.5 4.9\n2 3.1 . 3.8 . 3.2\n3 7.1 7.4 7.0 6.9 .\n;\nRUN;\n\nDATA work.labs_imputed;\n    SET work.lab_data;\n    ARRAY labs{5} lab1-lab5;\n    n_avail = 0;\n    total = 0;\n    DO i = 1 TO 5;\n        IF NOT MISSING(labs{i}) THEN DO;\n            n_avail + 1;\n            total + labs{i};\n        END;\n    END;\n    row_mean = ROUND(total / n_avail, 0.01);\n    DO i = 1 TO 5;\n        IF MISSING(labs{i}) THEN labs{i} = row_mean;\n    END;\n    DROP i total n_avail;\nRUN;\n\nPROC PRINT DATA=work.labs_imputed;\n    TITLE 'Lab Values After Mean Imputation';\nRUN;`,
    explanation:`Two DO loops: first calculates the row mean from available values, second fills missing values with that mean. The MISSING() function returns TRUE for numeric missing (.) and character blank. DROP removes working variables from output.`,
    keywords:['ARRAY','DO','MISSING','NOT MISSING','ROUND','DROP'],
    successMessage:`Lab value imputation complete! Mean imputation with SAS arrays is a standard pre-processing step in clinical trial datasets and is referenced in FDA statistical guidelines.`
  },
  insight:`SAS arrays are used daily in clinical trial data processing — iterating over lab visits, questionnaire responses, and biomarker panels. A single array + DO loop replaces hundreds of lines of IF-THEN statements across 50+ repeated measures.`
},

{
  id:'sas-inter-3', language:'sas', level:'intermediate', order:3,
  title:'SAS Macro Language — Dynamic and Reusable Code',
  duration:'30 min', xp:180,
  scenario:{
    company:'HealthAnalytics Corp.',role:'SAS Analyst',
    description:`You're producing the same analysis for five different disease conditions. Copy-pasting the code five times is slow and error-prone — if the logic needs to change, you'd update five places. SAS macros let you write the code once and call it with different parameters. They're the "functions" of SAS programming.`
  },
  objectives:[
    'Define and call simple macro variables (%LET)',
    'Write a parameterized SAS macro (%MACRO / %MEND)',
    'Use macro variables in code with & prefix',
    'Call macros with different arguments to reuse logic'
  ],
  terminology:[
    {term:'Macro Variable',lang:'sas',definition:'A text substitution variable defined with %LET. Referenced in code with & prefix. Replaced before SAS compiles the code.',example:'%LET dept = Sales;  ... WHERE department = "&dept"'},
    {term:'%LET',lang:'sas',definition:'Defines a macro variable.',example:'%LET threshold = 70000;  %LET report_date = 2023-06-01;'},
    {term:'%MACRO / %MEND',lang:'sas',definition:'Define the start and end of a macro definition. The code between them is the macro body.',example:'%MACRO report(dept=); ... %MEND report;'},
    {term:'Macro call',lang:'sas',definition:'Executes a defined macro by name with %. Arguments passed in parentheses.',example:'%report(dept=Sales);'},
    {term:'&variable',lang:'sas',definition:'References a macro variable — the & triggers macro resolution.',example:'WHERE department = "&dept_name"'},
    {term:'%PUT',lang:'sas',definition:'Prints a message (often a macro variable value) to the SAS log. Used for debugging.',example:'%PUT NOTE: Processing department &dept;'},
    {term:'%IF / %THEN',lang:'sas',definition:'Macro-level conditional logic — evaluates at compile time, not run time. Different from DATA step IF/THEN.',example:'%IF &level = advanced %THEN %DO; ... %END;'},
    {term:'%DO / %END',lang:'sas',definition:'Macro loop or block delimiter. Used in %IF conditions and %DO loops.',example:'%DO i = 1 %TO 5; %analysis(month=&i); %END;'}
  ],
  theory:`<h3>Two Levels of SAS Logic</h3>
<p>SAS code runs at two levels:</p>
<ol>
<li><strong>Macro level</strong> — code is resolved by the macro processor BEFORE SAS compiles it. Produces SAS code as text.</li>
<li><strong>Data/procedure level</strong> — the resulting SAS code runs against actual data.</li>
</ol>
<p>Think of macros like find-and-replace that runs first, then SAS executes the result.</p>
<h3>Macro Benefit: One Change, Global Effect</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>%LET analysis_year = 2023;<br>/* Change 2023 to 2024 in ONE place — updates everywhere */</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Macro ≠ DATA step:</strong> Macro variables are text substitution — they don't hold typed values like Python variables. %LET rate = 1.05 stores the text "1.05", not the number 1.05.</div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>In regulated environments (pharma, banking), macros are used to parameterize standard analyses so they can be rerun whenever data is updated without manual code changes.</div></div>`,
  steps:[
    {step:1,title:'Simple Macro Variables with %LET',
     explanation:`Define a macro variable for a threshold and reuse it throughout a program. Change it in one place to update all references.`,
     code:`%LET salary_threshold = 70000;\n%LET report_title = Salary Analysis Report;\n\nPROC SQL;\n    SELECT\n        first_name,\n        last_name,\n        department,\n        salary\n    FROM work.employees\n    WHERE salary > &salary_threshold\n    ORDER BY salary DESC;\n    TITLE "&report_title";\nQUIT;\n\n%PUT NOTE: Threshold used was &salary_threshold;`,
     note:'&salary_threshold is replaced with "70000" before PROC SQL runs. The %PUT confirms the value in the log.',
     after:'PROC SQL runs with salary > 70000. Change %LET salary_threshold = 80000 and the entire program updates automatically.'},
    {step:2,title:'Define a Parameterized Macro',
     explanation:`Write a macro that produces a department summary report. Call it multiple times with different department names.`,
     code:`%MACRO dept_report(dept=);\n    PROC SQL;\n        SELECT\n            first_name,\n            last_name,\n            salary\n        FROM work.employees\n        WHERE department = "&dept"\n        ORDER BY salary DESC;\n        TITLE "Salary Report: &dept Department";\n    QUIT;\n%MEND dept_report;\n\n/* Call the macro for each department */\n%dept_report(dept=Sales);\n%dept_report(dept=Marketing);\n%dept_report(dept=IT);`,
     after:'Three separate reports generated from one macro definition. Add a new department call without writing new PROC SQL code.'},
    {step:3,title:'Macro with %DO Loop',
     explanation:`Use a %DO loop to iterate over a list of values and call a macro repeatedly.`,
     code:`%MACRO analyze_dept(dept=, min_salary=60000);\n    PROC MEANS DATA=work.employees N MEAN MAX;\n        WHERE department = "&dept" AND salary >= &min_salary;\n        VAR salary;\n        TITLE "Stats for &dept - Min Salary: &min_salary";\n    RUN;\n%MEND analyze_dept;\n\n/* Single call with keyword parameters */\n%analyze_dept(dept=Sales, min_salary=55000);\n%analyze_dept(dept=IT, min_salary=80000);\n%analyze_dept(dept=Finance, min_salary=60000);`,
     note:'Macros can have multiple parameters with defaults. Keyword parameters (name=value) can be specified in any order.',
     after:'Three PROC MEANS runs with different filters — each parameterized from a single macro. The macro processor generates the SAS code, then SAS runs it.'}
  ],
  challenge:{
    title:'Build a Reusable Analysis Macro',
    description:`Write a SAS macro called %eda_report(dataset=, groupvar=, numvar=) that: (1) runs PROC MEANS on &numvar, grouped by &groupvar CLASS, and (2) runs PROC FREQ on &groupvar. Call it twice: once with employees data (groupvar=department, numvar=salary) and once with patients data (groupvar=diagnosis, numvar=age).`,
    hint:`Define the macro with three parameters. Inside, write PROC MEANS with CLASS &groupvar; VAR &numvar; and PROC FREQ with TABLES &groupvar. Then call it twice with different arguments.`,
    starterCode:`%MACRO eda_report(dataset=, groupvar=, numvar=);\n    PROC MEANS DATA=&dataset N MEAN MIN MAX;\n        CLASS &groupvar;\n        VAR &numvar;\n        TITLE "Summary of &numvar by &groupvar (&dataset)";\n    RUN;\n    PROC FREQ DATA=&dataset;\n        TABLES &groupvar / NOCUM;\n        TITLE "Frequency: &groupvar (&dataset)";\n    RUN;\n%MEND eda_report;\n\n/* Call 1: Employees */\n%eda_report(dataset=work.employees, groupvar=department, numvar=salary);\n\n/* Call 2: Patients */\n%eda_report(dataset=work.patients, groupvar=diagnosis, numvar=age);`,
    solution:`%MACRO eda_report(dataset=, groupvar=, numvar=);\n    PROC MEANS DATA=&dataset N MEAN MIN MAX STDDEV;\n        CLASS &groupvar;\n        VAR &numvar;\n        TITLE "Summary of &numvar by &groupvar (&dataset)";\n    RUN;\n    PROC FREQ DATA=&dataset;\n        TABLES &groupvar / NOCUM;\n        TITLE "Frequency of &groupvar (&dataset)";\n    RUN;\n%MEND eda_report;\n\n%eda_report(dataset=work.employees, groupvar=department, numvar=salary);\n%eda_report(dataset=work.patients, groupvar=diagnosis, numvar=age);`,
    explanation:`The macro substitutes &dataset, &groupvar, and &numvar into the SAS code. Each call generates completely different PROC MEANS and PROC FREQ output. One macro definition, unlimited reuse with different data and variables.`,
    keywords:['%MACRO','%MEND','%LET','&','CLASS','VAR','PROC MEANS','PROC FREQ'],
    successMessage:`Reusable EDA macro built! In enterprise SAS, production macros like this run nightly to generate regulatory reports, clinical data listings, and financial summaries for dozens of studies in one execution.`
  },
  insight:`SAS macro libraries are the foundation of enterprise analytics automation. At large pharma companies, a single macro call generates an entire validated TLF package (50+ tables and figures) from a clinical trial dataset — the same macro runs for every submission update.`
},

{
  id:'sas-inter-4', language:'sas', level:'intermediate', order:4,
  title:'Statistical PROCs — PROC REG, PROC CORR & PROC TTEST',
  duration:'25 min', xp:170,
  scenario:{
    company:'HealthAnalytics Corp.',role:'SAS Analyst',
    description:`The medical director asks: "Is there a statistically significant relationship between age and blood pressure in our patient population? Does the new drug group have significantly lower blood pressure than the control?" SAS's statistical procedures (PROC REG, PROC CORR, PROC TTEST) answer these questions with industry-standard outputs.`
  },
  objectives:[
    'Test correlation between variables with PROC CORR',
    'Run simple linear regression with PROC REG',
    'Compare group means with PROC TTEST',
    'Interpret p-values, R-squared, and confidence intervals'
  ],
  terminology:[
    {term:'PROC CORR',lang:'sas',definition:'Calculates Pearson correlation coefficients between numeric variables. Tests the strength and direction of linear relationships.',example:'PROC CORR DATA=patients; VAR age blood_pressure; RUN;'},
    {term:'PROC REG',lang:'sas',definition:'Performs linear regression. Models a dependent variable (Y) as a linear function of one or more independent variables (X).',example:'PROC REG DATA=patients; MODEL blood_pressure = age weight; RUN;'},
    {term:'PROC TTEST',lang:'sas',definition:'Tests whether the means of one or two groups are statistically different. Outputs t-statistic, p-value, and confidence intervals.',example:'PROC TTEST DATA=trial; CLASS treatment_group; VAR bp_change; RUN;'},
    {term:'p-value',lang:'sas',definition:'The probability of observing results as extreme as the data under the null hypothesis. p < 0.05 is commonly considered statistically significant.',example:'Pr > |t| < 0.05 → reject the null hypothesis'},
    {term:'R-squared (R²)',lang:'sas',definition:'Proportion of variance in the dependent variable explained by the model. R² = 0.75 means 75% of variation is explained.',example:'R-Square 0.7512 → 75.1% of variance explained'},
    {term:'Confidence Interval',lang:'sas',definition:'A range within which the true parameter is estimated to fall with a specified probability (e.g., 95% CI).',example:'95% CI [2.3, 8.7] means: we are 95% confident the true parameter is between 2.3 and 8.7'},
    {term:'MODEL statement',lang:'sas',definition:'In PROC REG, specifies the dependent variable = independent variable(s).',example:'MODEL y = x1 x2 x3;  /* multiple regression */'}
  ],
  theory:`<h3>From Descriptive to Inferential Statistics</h3>
<p>PROC MEANS tells you WHAT the data looks like. Statistical PROCs tell you WHETHER differences or relationships are meaningful — accounting for sample size and random variation.</p>
<h3>Which Procedure for Which Question</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>"Are X and Y related?"     → PROC CORR (correlation)<br>"Can X predict Y?"        → PROC REG (regression)<br>"Are groups different?"   → PROC TTEST (t-test)<br>"Who differs from whom?"  → PROC ANOVA / PROC GLM</code></div></div>
<h3>Interpreting the p-value</h3>
<p>A p-value < 0.05 means: if there were truly no relationship/difference, you'd see these results less than 5% of the time by chance alone — so the relationship likely exists.</p>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div>p < 0.05 = statistically significant, but not necessarily clinically or practically significant. Always consider effect size alongside p-values in healthcare analytics.</div></div>`,
  steps:[
    {step:1,title:'Correlate Variables with PROC CORR',
     explanation:`Test whether age and blood pressure are correlated in the patient dataset. PROC CORR outputs the correlation coefficient and its p-value.`,
     code:`PROC CORR DATA=work.patients;\n    VAR age blood_pressure;\n    TITLE 'Correlation: Age and Blood Pressure';\nRUN;`,
     after:'Output shows a Pearson correlation coefficient (e.g., r=0.94) and Prob > |r| (p-value). A high r close to 1.0 with p < 0.05 indicates strong positive correlation.'},
    {step:2,title:'Linear Regression with PROC REG',
     explanation:`Model blood pressure as a function of age. PROC REG estimates the regression equation and tests its statistical significance.`,
     code:`PROC REG DATA=work.patients;\n    MODEL blood_pressure = age;\n    TITLE 'Regression: Blood Pressure ~ Age';\nRUN;\nQUIT;`,
     note:'PROC REG requires QUIT (like PROC SQL) after the final RUN.',
     after:'Output includes: R-Square (variance explained), the intercept and slope coefficient, and their p-values. "Pr > |t|" for the age coefficient tests if age significantly predicts blood pressure.'},
    {step:3,title:'Compare Groups with PROC TTEST',
     explanation:`Test whether blood pressure differs significantly between male and female patients.`,
     code:`PROC TTEST DATA=work.patients;\n    CLASS gender;\n    VAR blood_pressure;\n    TITLE 'T-Test: BP by Gender';\nRUN;`,
     after:'Output shows mean BP for each gender, the t-statistic, degrees of freedom, and p-value (Pr > |t|). If p < 0.05, the groups are significantly different.'}
  ],
  challenge:{
    title:'Clinical Trial Analysis',
    description:`Create a dataset with 10 subjects in two treatment groups (treatment/control) with a blood pressure change variable (bp_change — negative = improvement). Use PROC TTEST to test if the treatment group has significantly greater BP reduction than the control. Then compute correlation between a continuous dose variable and bp_change. Interpret the results.`,
    hint:`DATALINES with 5 subjects per group. PROC TTEST CLASS=treatment_group VAR=bp_change. PROC CORR VAR dose bp_change.`,
    starterCode:`DATA work.trial;\n    INPUT subject treatment $ bp_change dose;\n    DATALINES;\n1 Treatment -15 50\n2 Treatment -12 50\n3 Treatment -18 75\n4 Treatment -20 75\n5 Treatment -14 100\n6 Control    -5 0\n7 Control    -3 0\n8 Control    -8 0\n9 Control    -4 0\n10 Control   -6 0\n;\nRUN;\n\n/* T-test: is the treatment group reduction significantly different? */\nPROC TTEST DATA=work.trial;\n    CLASS treatment;\n    VAR bp_change;\n    TITLE 'Treatment vs Control BP Change';\nRUN;\n\n/* Correlation: does higher dose correlate with more reduction? */\nPROC CORR DATA=work.trial;\n    VAR dose bp_change;\n    TITLE 'Dose-Response Correlation';\nRUN;`,
    solution:`DATA work.trial;\n    INPUT subject treatment $ bp_change dose;\n    DATALINES;\n1 Treatment -15 50\n2 Treatment -12 50\n3 Treatment -18 75\n4 Treatment -20 75\n5 Treatment -14 100\n6 Control    -5 0\n7 Control    -3 0\n8 Control    -8 0\n9 Control    -4 0\n10 Control   -6 0\n;\nRUN;\n\nPROC TTEST DATA=work.trial;\n    CLASS treatment;\n    VAR bp_change;\n    TITLE 'Treatment vs Control BP Change';\nRUN;\n\nPROC CORR DATA=work.trial;\n    VAR dose bp_change;\n    TITLE 'Dose-Response Relationship';\nRUN;`,
    explanation:`PROC TTEST CLASS=treatment splits patients into two groups and tests if mean bp_change differs. The treatment group averages -15.8 mmHg vs. control -5.2 mmHg. PROC CORR tests whether increasing dose correlates with greater reduction.`,
    keywords:['PROC TTEST','CLASS','VAR','PROC CORR','PROC REG','MODEL','p-value'],
    successMessage:`Clinical analysis complete! These procedures represent the statistical core of every Phase II/III clinical trial analysis submitted to the FDA. PROC TTEST alone appears in thousands of regulatory submissions annually.`
  },
  insight:`PROC CORR, PROC REG, and PROC TTEST are mandatory in FDA clinical trial statistical analysis plans. Every pharmaceutical company uses them for primary efficacy endpoints. The exact output formats are recognized and accepted by regulators worldwide.`
},

/* ═══════════════════════════════════════════════
   ADVANCED – Lessons 9-12
   ═══════════════════════════════════════════════ */
{
  id:'sas-adv-1', language:'sas', level:'advanced', order:1,
  title:'PROC REPORT — Publication-Quality Tables',
  duration:'25 min', xp:180,
  scenario:{
    company:'HealthAnalytics Corp.',role:'Senior SAS Analyst',
    description:`The medical writing team needs a publication-quality summary table for the clinical study report: patient demographics by treatment arm, formatted to ICH E3 standards. PROC REPORT is SAS's most powerful reporting procedure — it combines SELECT, GROUP BY, and COMPUTE columns into a single, highly controllable output.`
  },
  objectives:[
    'Build structured reports with PROC REPORT',
    'Use COLUMN, DEFINE, and COMPUTE statements',
    'Apply statistical displays (n, mean, SD) within PROC REPORT',
    'Format and label output for regulatory submission'
  ],
  terminology:[
    {term:'PROC REPORT',lang:'sas',definition:'A powerful reporting procedure that produces formatted tables with full control over layout, calculations, and styling.',example:'PROC REPORT DATA=dataset; COLUMN var1 var2 calc; RUN;'},
    {term:'COLUMN statement',lang:'sas',definition:'Specifies which variables appear in the report and their order.',example:'COLUMN name department salary salary=salary_pct;'},
    {term:'DEFINE statement',lang:'sas',definition:'Defines how each column behaves: DISPLAY (show value), GROUP (group rows), ANALYSIS (compute stat), COMPUTED (calculated).',example:"DEFINE salary / ANALYSIS MEAN FORMAT=DOLLAR12.2 'Avg Salary';"},
    {term:'COMPUTE block',lang:'sas',definition:'Calculates a new column value using existing column values. Executes at the row level.',example:'COMPUTE pct; pct = salary / total_sal * 100; ENDCOMP;'},
    {term:'ACROSS',lang:'sas',definition:'Creates side-by-side columns for each level of a categorical variable — pivot-like columns in PROC REPORT.',example:'DEFINE treatment / ACROSS;'},
    {term:'BREAK BEFORE/AFTER',lang:'sas',definition:'Inserts summary rows (subtotals) before or after a group in the report.',example:'BREAK AFTER department / SUMMARIZE SKIP;'},
    {term:'ODS',lang:'sas',definition:'Output Delivery System — controls where SAS output goes: HTML, PDF, RTF, Excel. Used to produce submission-ready documents.',example:'ODS PDF FILE="report.pdf"; PROC REPORT ...; RUN; ODS PDF CLOSE;'}
  ],
  theory:`<h3>Why PROC REPORT Over PROC PRINT?</h3>
<p>PROC PRINT shows data as-is. PROC REPORT gives you:</p>
<ul>
<li>Full column labeling and formatting</li>
<li>Built-in summarization (means, sums per group)</li>
<li>Computed columns with custom formulas</li>
<li>ACROSS columns for cross-tabulations</li>
<li>ODS integration for PDF/RTF/HTML output</li>
</ul>
<h3>The PROC REPORT Structure</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>PROC REPORT DATA=dataset NOWD;<br>&nbsp;&nbsp;COLUMN var1 var2 var3;<br>&nbsp;&nbsp;DEFINE var1 / GROUP 'Label';<br>&nbsp;&nbsp;DEFINE var2 / ANALYSIS MEAN FORMAT=...;<br>&nbsp;&nbsp;COMPUTE calc_col;<br>&nbsp;&nbsp;&nbsp;&nbsp;calc_col = formula;<br>&nbsp;&nbsp;ENDCOMP;<br>RUN;</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>PROC REPORT with ODS RTF is the standard for producing Table/Listing/Figure (TLF) outputs in clinical trial submissions. Every pharma SAS analyst must know this procedure.</div></div>`,
  steps:[
    {step:1,title:'Basic Structured Report',
     explanation:`Build a formatted report with grouped rows and computed column statistics — more control than PROC PRINT.`,
     code:`PROC REPORT DATA=work.employees NOWD;\n    COLUMN department first_name salary;\n    DEFINE department  / GROUP 'Department';\n    DEFINE first_name  / DISPLAY 'Employee';\n    DEFINE salary      / DISPLAY FORMAT=DOLLAR12. 'Salary';\n    TITLE 'Employee Salary Report';\nRUN;`,
     after:'Employees are grouped by department with formatted salary. NOWD (no window) runs in batch mode.'},
    {step:2,title:'Summary Statistics per Group',
     explanation:`Use ANALYSIS type to automatically compute statistics (mean, N) per department. Add a BREAK AFTER for subtotals.`,
     code:`PROC REPORT DATA=work.employees NOWD;\n    COLUMN department salary salary=salary_n;\n    DEFINE department  / GROUP 'Department';\n    DEFINE salary      / ANALYSIS MEAN FORMAT=DOLLAR10. 'Avg Salary';\n    DEFINE salary_n    / ANALYSIS N 'N';\n    BREAK AFTER department / SKIP;\n    TITLE 'Department Salary Summary';\nRUN;`,
     note:'You can alias the same variable (salary=salary_n) to compute multiple statistics for it.',
     after:'Each department shows its average salary and headcount, with a blank line between departments.'},
    {step:3,title:'Computed Column — Percent of Total',
     explanation:`Add a computed column showing each department\'s payroll as a percent of the company total.`,
     code:`PROC REPORT DATA=work.employees NOWD;\n    COLUMN department salary total_payroll pct;\n    DEFINE department     / GROUP 'Department';\n    DEFINE salary         / ANALYSIS SUM NOPRINT;  /* hidden sum */\n    DEFINE total_payroll  / COMPUTED FORMAT=DOLLAR14. 'Total Payroll';\n    DEFINE pct            / COMPUTED FORMAT=PERCENT8.1 '% of Total';\n    COMPUTE total_payroll;\n        total_payroll = salary.SUM;\n    ENDCOMP;\n    COMPUTE pct;\n        pct = salary.SUM / 1130000;  /* total company payroll */\n    ENDCOMP;\n    RBREAK AFTER / SUMMARIZE;\n    TITLE 'Department Payroll with Percentages';\nRUN;`,
     after:'A publication-quality table showing payroll totals and percentages, with a grand total row at the bottom added by RBREAK AFTER / SUMMARIZE.'}
  ],
  challenge:{
    title:'Demographic Summary Table (Table 1)',
    description:`"Table 1" is the standard demographic summary in clinical papers. Create a PROC REPORT showing: one row per diagnosis group (from WORK.PATIENTS), average age (mean ± std), count N, and percent of total patients. Format mean as 8.1 and percent as 8.1%.`,
    hint:`DEFINE diagnosis / GROUP. DEFINE age twice (ANALYSIS MEAN and ANALYSIS STDDEV). Use a COMPUTE block for the percent. PROC MEANS first to get total N if needed, or use a macro variable.`,
    starterCode:`/* First get total N */\n%LET total_n = 8;  /* we know 8 patients */\n\nPROC REPORT DATA=work.patients NOWD;\n    COLUMN diagnosis age age=age_sd n_col pct_col;\n    DEFINE diagnosis / GROUP 'Diagnosis';\n    DEFINE age       / ANALYSIS MEAN FORMAT=8.1 'Mean Age';\n    DEFINE age_sd    / ANALYSIS STDDEV FORMAT=8.1 'SD';\n    DEFINE n_col     / COMPUTED FORMAT=4. 'N';\n    DEFINE pct_col   / COMPUTED FORMAT=8.1 'Pct (%)';\n    COMPUTE n_col;\n        n_col = age.N;\n    ENDCOMP;\n    COMPUTE pct_col;\n        pct_col = age.N / &total_n * 100;\n    ENDCOMP;\n    RBREAK AFTER / SUMMARIZE;\n    TITLE 'Table 1: Patient Demographics by Diagnosis';\nRUN;`,
    solution:`%LET total_n = 8;\n\nPROC REPORT DATA=work.patients NOWD;\n    COLUMN diagnosis age age=age_sd n_col pct_col;\n    DEFINE diagnosis / GROUP 'Diagnosis';\n    DEFINE age       / ANALYSIS MEAN FORMAT=8.1 'Mean Age';\n    DEFINE age_sd    / ANALYSIS STDDEV FORMAT=8.1 'SD';\n    DEFINE n_col     / COMPUTED FORMAT=4. 'N';\n    DEFINE pct_col   / COMPUTED FORMAT=8.1 'Pct (%)';\n    COMPUTE n_col;\n        n_col = age.N;\n    ENDCOMP;\n    COMPUTE pct_col;\n        pct_col = age.N / &total_n * 100;\n    ENDCOMP;\n    RBREAK AFTER / SUMMARIZE;\n    TITLE 'Table 1: Patient Demographics by Diagnosis';\nRUN;`,
    explanation:`COLUMN lists all display and computed columns. ANALYSIS columns compute statistics. COMPUTE blocks reference those statistics (age.N, age.SUM). RBREAK AFTER adds an overall summary row. This structure generates a Table 1 that would appear in any peer-reviewed clinical publication.`,
    keywords:['PROC REPORT','DEFINE','ANALYSIS','COMPUTE','ENDCOMP','RBREAK','GROUP'],
    successMessage:`Table 1 generated! This PROC REPORT pattern is one of the most commonly produced outputs in pharmaceutical clinical trial reporting and is directly used in regulatory submissions worldwide.`
  },
  insight:`At CROs (Contract Research Organizations) and pharma companies, PROC REPORT with ODS RTF generates the complete Table/Listing/Figure packages submitted to the FDA. Analysts who master PROC REPORT and ODS are among the highest-paid SAS professionals.`
},

{
  id:'sas-adv-2', language:'sas', level:'advanced', order:2,
  title:'Survival Analysis — PROC LIFETEST & PROC PHREG',
  duration:'30 min', xp:200,
  scenario:{
    company:'HealthAnalytics Corp.',role:'Senior SAS Analyst',
    description:`The lead statistician asks: "How does survival time differ between treatment and control groups? What is the hazard ratio for the treatment, controlling for age?" Survival (time-to-event) analysis is a cornerstone of clinical trials, insurance actuarial work, and customer churn modeling. SAS leads this domain with PROC LIFETEST and PROC PHREG.`
  },
  objectives:[
    'Understand time-to-event data structure (time + event flag)',
    'Produce Kaplan-Meier survival curves with PROC LIFETEST',
    'Test for survival differences between groups with the log-rank test',
    'Fit a Cox proportional hazards model with PROC PHREG'
  ],
  terminology:[
    {term:'Survival Analysis',lang:'sas',definition:'Statistical methods for analyzing time-to-event data where some subjects may not have experienced the event by study end (censored).',example:'Time to death, time to relapse, time to customer churn'},
    {term:'Censored observation',lang:'sas',definition:'A subject who does not experience the event during the study — they leave the study or the study ends. Censoring flag = 0.',example:'A patient who is lost to follow-up before death'},
    {term:'Kaplan-Meier curve',lang:'sas',definition:'Non-parametric estimate of the survival function — probability of surviving beyond time t. Steps down at each event time.',example:'PROC LIFETEST plots the K-M curve by default'},
    {term:'Log-rank test',lang:'sas',definition:'Tests whether two or more K-M survival curves are statistically different. PROC LIFETEST reports this automatically.',example:'Log-Rank p=0.03 → curves differ significantly'},
    {term:'PROC LIFETEST',lang:'sas',definition:'Produces K-M survival estimates, survival curves, and log-rank test for group comparisons.',example:'PROC LIFETEST DATA=d; TIME survtime*status(0); STRATA trt_group; RUN;'},
    {term:'PROC PHREG',lang:'sas',definition:'Fits a Cox proportional hazards regression model — the most common survival regression used in clinical trials.',example:'PROC PHREG DATA=d; MODEL survtime*status(0) = trt age; RUN;'},
    {term:'Hazard Ratio (HR)',lang:'sas',definition:'The ratio of hazard rates between two groups. HR=0.6 in the treatment group means 40% lower risk of the event vs. control.',example:'HR < 1 = protective treatment; HR > 1 = increased risk'},
    {term:'TIME*event(0)',lang:'sas',definition:'The PROC LIFETEST/PHREG syntax for time-to-event data. The number in parentheses is the censoring indicator value.',example:'TIME survtime * died(0);  /* 0=censored, 1=died */'}
  ],
  theory:`<h3>Why Standard Methods Fail for Time-to-Event Data</h3>
<p>You can't use a simple t-test on survival times because of <strong>censoring</strong> — some subjects are still alive at study end. Using those subjects' last-known times as actual survival times would underestimate true survival. Kaplan-Meier and Cox models handle censoring correctly.</p>
<h3>The K-M Estimator</h3>
<p>At each event time, K-M calculates:<br>P(survive beyond t) = P(survive beyond t-1) × P(survive at t | survived to t)</p>
<h3>Cox Regression</h3>
<p>Models the hazard rate as: h(t) = h₀(t) × exp(β·X)<br>Exponentiating the coefficients gives the Hazard Ratio (HR).</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>The Cox model is the most-used regression in clinical trials. Understanding HR and its 95% CI is essential for any clinical data analyst role.</div></div>`,
  steps:[
    {step:1,title:'Create Survival Dataset',
     explanation:`Build a time-to-event dataset. Variables needed: time (days), event indicator (1=occurred, 0=censored), and group.`,
     code:`DATA work.survival_data;\n    INPUT subject time_days status treatment $ age;\n    DATALINES;\n1  365 1 Treatment 45\n2  180 1 Treatment 52\n3  420 0 Treatment 38\n4  290 1 Treatment 61\n5  500 0 Treatment 44\n6  120 1 Control   55\n7  150 1 Control   63\n8  200 1 Control   47\n9  310 1 Control   58\n10 180 0 Control   42\n;\nRUN;\n\nPROC PRINT DATA=work.survival_data;\n    TITLE 'Survival Study Dataset';\nRUN;`,
     after:'Dataset has 10 subjects: time_days = follow-up duration, status 1=event occurred, 0=censored. Treatment group has longer survival times.'},
    {step:2,title:'Kaplan-Meier Curves with PROC LIFETEST',
     explanation:`Estimate survival curves for each treatment group and test for statistical difference using the log-rank test.`,
     code:`PROC LIFETEST DATA=work.survival_data PLOTS=survival(ATRISK);\n    TIME time_days * status(0);  /* 0 = censored */\n    STRATA treatment;\n    TITLE 'Kaplan-Meier Survival Curves by Treatment';\nRUN;`,
     note:'TIME var*event(censor_value): the number in parentheses is the value indicating censoring (not the event).',
     after:'Output shows K-M tables (survival probability at each event time), survival curves plot, and the log-rank test p-value comparing the two curves.'},
    {step:3,title:'Cox Proportional Hazards Model',
     explanation:`Fit a Cox model to estimate the treatment effect while controlling for age. The exponentiated coefficient is the Hazard Ratio.`,
     code:`PROC PHREG DATA=work.survival_data;\n    CLASS treatment (REF='Control');\n    MODEL time_days * status(0) = treatment age / RISKLIMITS;\n    TITLE 'Cox Regression: Treatment Effect on Survival';\nRUN;`,
     note:'CLASS treatment (REF=\'Control\') sets Control as the reference group. RISKLIMITS adds 95% CI for the Hazard Ratio.',
     after:'Output shows: the β coefficient for treatment, Hazard Ratio (exp(β)), and its 95% CI. HR < 1 for treatment means reduced hazard (better survival).'}
  ],
  challenge:{
    title:'Customer Churn Survival Analysis',
    description:`Survival analysis isn't just clinical — it's used for customer churn. Create a dataset of 10 customers with: days_active (how long they were customers), churned (1=churned, 0=still active), and segment (Premium/Standard). Run PROC LIFETEST comparing survival (staying) curves by segment. Interpret whether Premium customers churn at a different rate.`,
    hint:`Same structure as clinical: TIME days_active * churned(0); STRATA segment; Log-rank p < 0.05 = segments differ in churn rate.`,
    starterCode:`DATA work.churn;\n    INPUT customer days_active churned segment $;\n    DATALINES;\n1  720 0 Premium\n2  850 0 Premium\n3  600 1 Premium\n4  910 0 Premium\n5  480 1 Premium\n6  120 1 Standard\n7  200 1 Standard\n8  300 1 Standard\n9  150 1 Standard\n10 400 0 Standard\n;\nRUN;\n\nPROC LIFETEST DATA=work.churn PLOTS=survival;\n    TIME days_active * churned(0);\n    STRATA segment;\n    TITLE 'Customer Retention by Segment';\nRUN;`,
    solution:`DATA work.churn;\n    INPUT customer days_active churned segment $;\n    DATALINES;\n1  720 0 Premium\n2  850 0 Premium\n3  600 1 Premium\n4  910 0 Premium\n5  480 1 Premium\n6  120 1 Standard\n7  200 1 Standard\n8  300 1 Standard\n9  150 1 Standard\n10 400 0 Standard\n;\nRUN;\n\nPROC LIFETEST DATA=work.churn PLOTS=survival;\n    TIME days_active * churned(0);\n    STRATA segment;\n    TITLE 'Customer Retention: Premium vs Standard';\nRUN;`,
    explanation:`The survival "event" here is churn (leaving). Censored = still active customers (not yet churned). STRATA segment compares K-M curves for Premium vs. Standard. The log-rank test tells us if they churn at statistically different rates.`,
    keywords:['PROC LIFETEST','TIME','STRATA','status','censored','Kaplan-Meier','log-rank'],
    successMessage:`Churn survival analysis complete! Survival methods are used at telecom, SaaS, and insurance companies to model retention — the same mathematics as clinical trial survival analysis.`
  },
  insight:`Survival analysis with PROC LIFETEST and PROC PHREG is required for FDA drug approval submissions. The exact output you just produced maps directly to the "Efficacy Analysis" section of an NDA/BLA package. The same methods power customer lifetime value models at Amazon and Netflix.`
},

{
  id:'sas-adv-3', language:'sas', level:'advanced', order:3,
  title:'ODS — Producing Reports in PDF, RTF & Excel',
  duration:'20 min', xp:170,
  scenario:{
    company:'HealthAnalytics Corp.',role:'Senior SAS Analyst',
    description:`You've produced great analysis. Now the regulatory affairs team needs the tables in RTF for Word, the charts in PDF for submission, and the data tables in Excel for the client. SAS ODS (Output Delivery System) routes all SAS output to professional-grade documents with a few lines of code.`
  },
  objectives:[
    'Understand the ODS framework and destinations',
    'Generate PDF and RTF documents from SAS output',
    'Export SAS data to Excel with ODS EXCEL',
    'Control page layout, styles, and document properties'
  ],
  terminology:[
    {term:'ODS',lang:'sas',definition:'Output Delivery System — controls where SAS output is sent. Destinations include HTML, PDF, RTF, EXCEL, and more.',example:'ODS PDF FILE="report.pdf"; PROC PRINT ...; ODS PDF CLOSE;'},
    {term:'ODS destination',lang:'sas',definition:'The output format: PDF, RTF, HTML, EXCEL, LISTING (default), POWERPOINT.',example:'ODS RTF FILE="tables.rtf" STYLE=JOURNAL;'},
    {term:'STYLE=',lang:'sas',definition:'Applies a predefined visual theme to ODS output. Options: JOURNAL (monochrome), DEFAULT, HARVEST, SASWEB.',example:'ODS PDF STYLE=JOURNAL;  /* academic publication style */'},
    {term:'ODS GRAPHICS',lang:'sas',definition:'Controls format and size of SAS graphics (charts/plots) sent to ODS destinations.',example:'ODS GRAPHICS ON / WIDTH=6in HEIGHT=4in;'},
    {term:'ODS EXCEL',lang:'sas',definition:'Exports SAS output to Excel (.xlsx) format. Each PROC step creates a new worksheet.',example:'ODS EXCEL FILE="data.xlsx"; PROC PRINT ...; ODS EXCEL CLOSE;'},
    {term:'ODS CLOSE',lang:'sas',definition:'Closes all open ODS destinations — must always be called after opening an ODS destination.',example:'ODS PDF CLOSE;  /* always close when done */'},
    {term:'TITLE / FOOTNOTE',lang:'sas',definition:'Sets up to 10 titles/footnotes for SAS output. Applied globally until reset.',example:'TITLE1 "Study Report"; FOOTNOTE1 "Confidential";'}
  ],
  theory:`<h3>Why ODS Matters in Regulated Environments</h3>
<p>Clinical trial outputs must meet strict formatting requirements (ICH E3, FDA guidance). Manually copying SAS tables into Word is error-prone and non-reproducible. ODS automates document production:</p>
<ul>
<li>100% reproducible — rerun the program = identical documents</li>
<li>Audit trail — the code is the documentation</li>
<li>Batch production — one program, 50+ tables in one submission package</li>
</ul>
<h3>ODS Sandwich Pattern</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>ODS destination FILE="name.ext" OPTIONS;<br>&nbsp;&nbsp;/* Your PROC steps here — all go to the file */<br>ODS destination CLOSE;</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div>Always close ODS destinations with ODS [destination] CLOSE. Forgetting to close leaves files locked or incomplete.</div></div>`,
  steps:[
    {step:1,title:'Generate a PDF Report',
     explanation:`Route multiple PROC outputs to a single PDF file with professional formatting.`,
     code:`/* Set document titles */\nTITLE1 'HealthAnalytics Corp. — Employee Summary';\nTITLE2 'Confidential — For Internal Use Only';\nFOOTNOTE1 'Program: employee_report.sas | Run: &SYSDATE';\n\n/* Open PDF destination */\nODS PDF FILE='employee_report.pdf'\n         STYLE=JOURNAL\n         STARTPAGE=YES;  /* new page per PROC */\n\n/* All procs between here and PDF CLOSE go to the PDF */\nPROC PRINT DATA=work.employees; RUN;\n\nPROC MEANS DATA=work.employees N MEAN MIN MAX;\n    CLASS department;\n    VAR salary;\nRUN;\n\n/* Close PDF */\nODS PDF CLOSE;\n\nTITLE;     /* reset titles */\nFOOTNOTE;  /* reset footnotes */`,
     after:'employee_report.pdf is created with both PROC outputs on separate pages, styled in the JOURNAL theme (black/white, publication-ready).'},
    {step:2,title:'RTF for Word/Regulatory Submission',
     explanation:`RTF format is preferred by medical writers — they can edit it in Microsoft Word after generation.`,
     code:`ODS RTF FILE='employee_tables.rtf'\n        STYLE=JOURNAL\n        BODYTITLE;  /* titles in doc body, not header */\n\nTITLE1 'Table 1. Employee Demographics';\nPROC REPORT DATA=work.employees NOWD;\n    COLUMN department first_name salary;\n    DEFINE department / GROUP 'Department';\n    DEFINE first_name / DISPLAY 'Name';\n    DEFINE salary     / DISPLAY FORMAT=DOLLAR12. 'Salary';\nRUN;\n\nODS RTF CLOSE;`,
     after:'An RTF file is created that opens in Microsoft Word with the table already formatted. STYLE=JOURNAL produces the black/white style required in most regulatory submissions.'},
    {step:3,title:'Export to Excel',
     explanation:`Send multiple datasets to Excel — each PROC step gets its own worksheet.`,
     code:`ODS EXCEL FILE='salary_data.xlsx'\n        OPTIONS(EMBEDDED_TITLES='YES'\n                SHEET_NAME='Employee Data');\n\nTITLE 'Employee Roster';\nPROC PRINT DATA=work.employees; RUN;\n\nODS EXCEL OPTIONS(SHEET_NAME='Dept Summary');\nTITLE 'Department Summary';\nPROC MEANS DATA=work.employees N MEAN MAX;\n    CLASS department; VAR salary;\nRUN;\n\nODS EXCEL CLOSE;`,
     after:'salary_data.xlsx contains two worksheets — one for the employee list, one for the summary — allowing non-SAS users to work with the data directly in Excel.'}
  ],
  challenge:{
    title:'Produce a Complete Submission Package',
    description:`Using WORK.EMPLOYEES and WORK.PATIENTS, produce a PDF document containing: (1) a PROC REPORT of employee salary by department, (2) PROC FREQ of patient diagnoses, (3) PROC MEANS of patient age and blood pressure. Use STYLE=JOURNAL and include appropriate TITLE and FOOTNOTE statements.`,
    hint:`Open ODS PDF before the first PROC. Place all three procs between ODS PDF and ODS PDF CLOSE. Different TITLE1 for each table.`,
    starterCode:`FOOTNOTE1 'Confidential — Not for Distribution';\n\nODS PDF FILE='submission_package.pdf' STYLE=JOURNAL STARTPAGE=YES;\n\n/* Table 1: Employee Salary Summary */\nTITLE1 'Table 1: Employee Salary by Department';\nPROC REPORT DATA=work.employees NOWD;\n    COLUMN department salary;\n    DEFINE department / GROUP 'Department';\n    DEFINE salary     / ANALYSIS MEAN FORMAT=DOLLAR12. 'Avg Salary';\nRUN;\n\n/* Table 2: Patient Diagnosis Frequency */\nTITLE1 /* add title */\nPROC FREQ DATA=work.patients;\n    /* add TABLES statement */\nRUN;\n\n/* Table 3: Patient Vitals Summary */\nTITLE1 /* add title */\nPROC MEANS DATA=work.patients N MEAN MIN MAX;\n    /* add VAR statement */\nRUN;\n\nODS PDF CLOSE;\nTITLE; FOOTNOTE;`,
    solution:`FOOTNOTE1 'Confidential — Not for Distribution';\n\nODS PDF FILE='submission_package.pdf' STYLE=JOURNAL STARTPAGE=YES;\n\nTITLE1 'Table 1: Employee Salary by Department';\nPROC REPORT DATA=work.employees NOWD;\n    COLUMN department salary;\n    DEFINE department / GROUP 'Department';\n    DEFINE salary     / ANALYSIS MEAN FORMAT=DOLLAR12. 'Avg Salary';\nRUN;\n\nTITLE1 'Table 2: Patient Diagnosis Frequency';\nPROC FREQ DATA=work.patients;\n    TABLES diagnosis / NOCUM;\nRUN;\n\nTITLE1 'Table 3: Patient Vital Statistics';\nPROC MEANS DATA=work.patients N MEAN MIN MAX STDDEV;\n    VAR age blood_pressure;\nRUN;\n\nODS PDF CLOSE;\nTITLE; FOOTNOTE;`,
    explanation:`All three PROCs run between ODS PDF and ODS PDF CLOSE — their output goes to the PDF. STARTPAGE=YES puts each on a new page. The FOOTNOTE persists across all tables. TITLE; and FOOTNOTE; after closing clear global titles/footnotes for subsequent code.`,
    keywords:['ODS PDF','ODS RTF','ODS EXCEL','STYLE','STARTPAGE','TITLE','FOOTNOTE','ODS CLOSE'],
    successMessage:`Submission package created! ODS automates document production that would take hours of manual formatting. Production SAS teams at pharma companies use this to generate 100+ page regulatory documents in minutes.`
  },
  insight:`ODS mastery is a premium skill in the SAS job market. Clinical programmers who can produce ICH-compliant RTF deliverables automatically are among the most sought after in the CRO and pharma sector, commanding significantly higher salaries.`
},

{
  id:'sas-adv-4', language:'sas', level:'advanced', order:4,
  title:'PROC LOGISTIC — Logistic Regression for Binary Outcomes',
  duration:'30 min', xp:210,
  scenario:{
    company:'HealthAnalytics Corp.',role:'Lead SAS Analyst',
    description:`The data science team asks: "Given a patient's age, blood pressure, and cholesterol level, what is the probability they have hypertension? Build a model that predicts diagnosis." When the outcome is binary (yes/no, 1/0), logistic regression is the appropriate model. PROC LOGISTIC is SAS's primary tool for this.`
  },
  objectives:[
    'Understand when logistic regression is appropriate',
    'Fit a binary logistic regression model with PROC LOGISTIC',
    'Interpret odds ratios and model fit statistics',
    'Use the SCORE statement or OUTPUT to get predicted probabilities'
  ],
  terminology:[
    {term:'PROC LOGISTIC',lang:'sas',definition:'Fits logistic regression models for binary, ordinal, or nominal outcomes. Industry standard for clinical and actuarial binary prediction.',example:'PROC LOGISTIC DATA=patients; MODEL hypertension(EVENT="1") = age bp chol; RUN;'},
    {term:'Logistic Regression',lang:'sas',definition:'Models the probability of a binary outcome as a function of predictors. Output is a probability (0–1) via the logistic function.',example:'P(hypertension) = 1 / (1 + e^(−(β₀ + β₁·age + β₂·bp)))'},
    {term:'Odds Ratio (OR)',lang:'sas',definition:'The ratio of odds of the event for a one-unit increase in a predictor. OR > 1 = higher odds with higher predictor.',example:'OR=1.05 for age → each additional year of age → 5% higher odds of hypertension'},
    {term:'EVENT=',lang:'sas',definition:'Specifies which value of the binary outcome is the "event" being modeled.',example:"MODEL outcome(EVENT='1') = predictors;"},
    {term:'C-Statistic (AUC)',lang:'sas',definition:'Area Under the ROC Curve — measures how well the model discriminates. 0.5 = random, 0.7+ = acceptable, 0.8+ = good, 0.9+ = excellent.',example:'C = 0.85 → model correctly ranks 85% of event/non-event pairs'},
    {term:'OUTPUT',lang:'sas',definition:'In PROC LOGISTIC, creates a dataset with predicted probabilities and other statistics for each observation.',example:'OUTPUT OUT=pred_data PREDICTED=prob_hat;'},
    {term:'-2 Log Likelihood',lang:'sas',definition:'A fit statistic — smaller values indicate better model fit. Comparing nested models: the difference follows a chi-square distribution.',example:'Likelihood Ratio Test: intercept-only vs. full model'}
  ],
  theory:`<h3>Why Not Linear Regression for Binary Outcomes?</h3>
<p>Linear regression can predict values outside [0,1] — impossible for probabilities. Logistic regression applies the logistic (sigmoid) function to constrain output to [0,1]:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Linear: Y = β₀ + β₁X  (can be any real number)<br>Logistic: P = 1 / (1 + e^(−(β₀+β₁X)))  (always 0–1)</code></div></div>
<h3>Interpreting Odds Ratios</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>OR = 1.0 → no effect<br>OR = 2.0 → 2x higher odds<br>OR = 0.5 → 50% lower odds<br><br>95% CI for OR: if it doesn't include 1.0 → significant</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Logistic regression is among the most-used methods in clinical trials (binary endpoints), insurance (default/no default), and risk scoring (credit risk, readmission risk). PROC LOGISTIC output format is accepted by FDA in NDA submissions.</div></div>`,
  steps:[
    {step:1,title:'Create a Logistic Regression Dataset',
     explanation:`Build a richer patient dataset with a binary outcome (hypertension: 1=yes, 0=no) and multiple predictors.`,
     code:`DATA work.hyp_study;\n    INPUT patient_id age blood_pressure cholesterol bmi hypertension;\n    DATALINES;\n1  45 125 210 26.5 1\n2  38 118 195 24.1 0\n3  62 140 240 29.8 1\n4  29 112 175 22.3 0\n5  55 135 225 28.4 1\n6  41 120 205 25.7 0\n7  70 150 255 31.2 1\n8  33 115 185 23.8 0\n9  58 138 235 30.1 1\n10 47 122 200 25.0 0\n11 63 145 248 32.5 1\n12 35 117 190 24.9 0\n;\nRUN;`,
     after:'Dataset created with 12 patients, binary hypertension outcome, and three continuous predictors.'},
    {step:2,title:'Fit the Logistic Regression Model',
     explanation:`Fit a logistic regression model predicting hypertension from age, blood pressure, and cholesterol.`,
     code:`PROC LOGISTIC DATA=work.hyp_study DESCENDING;\n    MODEL hypertension = age blood_pressure cholesterol\n          / ODDSRATIO RSQUARE CTABLE;\n    TITLE 'Logistic Regression: Hypertension Predictors';\nRUN;`,
     note:'DESCENDING models P(hypertension=1). Alternatively use MODEL hypertension(EVENT="1")=... Without it, SAS models the LOWER value by default.',
     after:'Output shows: model fit statistics (-2LL, Hosmer-Lemeshow), odds ratios with 95% CIs, and the C-statistic (AUC). Every predictor with p < 0.05 is a significant predictor.'},
    {step:3,title:'Predicted Probabilities and Classification',
     explanation:`Use OUTPUT to obtain the predicted probability of hypertension for each patient, then classify with a 0.5 cutoff.`,
     code:`PROC LOGISTIC DATA=work.hyp_study DESCENDING NOPRINT;\n    MODEL hypertension = age blood_pressure cholesterol;\n    OUTPUT OUT=work.hyp_predicted PREDICTED=prob_hyp;\nRUN;\n\nDATA work.hyp_class;\n    SET work.hyp_predicted;\n    predicted_class = (prob_hyp >= 0.5);\n    correct = (hypertension = predicted_class);\nRUN;\n\nPROC MEANS DATA=work.hyp_class;\n    VAR prob_hyp correct;\n    TITLE 'Predicted Probabilities and Accuracy';\nRUN;\n\nPROC PRINT DATA=work.hyp_class;\n    VAR patient_id hypertension prob_hyp predicted_class correct;\nRUN;`,
     after:'Each patient has a predicted probability and a 0/1 predicted class. The "correct" column flags correct predictions. PROC MEANS shows average probability and overall accuracy.'}
  ],
  challenge:{
    title:'Credit Default Logistic Model',
    description:`Logistic regression isn't just clinical — it's the foundation of credit scoring. Create a 12-observation credit dataset (variables: customer_id, age, income, credit_score, debt_ratio, defaulted [1=yes, 0=no]). Fit a logistic regression with all four predictors. Obtain predicted default probabilities. Identify the 3 customers with the highest default risk.`,
    hint:`PROC LOGISTIC DATA=credit DESCENDING; MODEL defaulted = age income credit_score debt_ratio; OUTPUT OUT=scored PREDICTED=default_prob; Then sort scored by default_prob DESC and print top 3 with PROC PRINT (OBS=3).`,
    starterCode:`DATA work.credit;\n    INPUT cust_id age income credit_score debt_ratio defaulted;\n    DATALINES;\n1  28 35000 620 0.45 1\n2  45 72000 740 0.20 0\n3  22 28000 580 0.55 1\n4  38 55000 700 0.28 0\n5  52 90000 780 0.15 0\n6  31 31000 600 0.50 1\n7  44 68000 720 0.22 0\n8  26 29000 610 0.48 1\n9  60 110000 800 0.12 0\n10 33 38000 640 0.40 1\n11 49 82000 760 0.18 0\n12 29 32000 590 0.52 1\n;\nRUN;\n\n/* Fit model */\nPROC LOGISTIC DATA=work.credit DESCENDING;\n    MODEL defaulted = age income credit_score debt_ratio / ODDSRATIO;\n    OUTPUT OUT=work.scored PREDICTED=default_prob;\n    TITLE 'Credit Default Model';\nRUN;\n\n/* Sort by risk and find top 3 */\nPROC SORT DATA=work.scored OUT=work.highest_risk;\n    BY DESCENDING default_prob;\nRUN;\n\nPROC PRINT DATA=work.highest_risk (OBS=3);\n    VAR cust_id age income credit_score debt_ratio defaulted default_prob;\n    TITLE 'Top 3 Highest Default Risk Customers';\nRUN;`,
    solution:`DATA work.credit;\n    INPUT cust_id age income credit_score debt_ratio defaulted;\n    DATALINES;\n1  28 35000 620 0.45 1\n2  45 72000 740 0.20 0\n3  22 28000 580 0.55 1\n4  38 55000 700 0.28 0\n5  52 90000 780 0.15 0\n6  31 31000 600 0.50 1\n7  44 68000 720 0.22 0\n8  26 29000 610 0.48 1\n9  60 110000 800 0.12 0\n10 33 38000 640 0.40 1\n11 49 82000 760 0.18 0\n12 29 32000 590 0.52 1\n;\nRUN;\n\nPROC LOGISTIC DATA=work.credit DESCENDING;\n    MODEL defaulted = age income credit_score debt_ratio / ODDSRATIO;\n    OUTPUT OUT=work.scored PREDICTED=default_prob;\n    TITLE 'Credit Default Logistic Regression';\nRUN;\n\nPROC SORT DATA=work.scored OUT=work.highest_risk;\n    BY DESCENDING default_prob;\nRUN;\n\nPROC PRINT DATA=work.highest_risk (OBS=3);\n    VAR cust_id age income credit_score debt_ratio defaulted default_prob;\n    TITLE 'Top 3 Highest Default Risk Customers';\nRUN;`,
    explanation:`PROC LOGISTIC fits the model and OUTPUT saves predicted probabilities. PROC SORT orders by default_prob DESC, then PROC PRINT with OBS=3 shows the three riskiest customers — exactly how credit risk teams identify high-risk accounts.`,
    keywords:['PROC LOGISTIC','MODEL','DESCENDING','OUTPUT','PREDICTED','ODDSRATIO','PROC SORT'],
    successMessage:`Credit risk model complete! PROC LOGISTIC powers credit scoring at banks worldwide. The same model structure — with different predictors — runs in healthcare (readmission risk), marketing (churn probability), and insurance (claim likelihood).`
  },
  insight:`PROC LOGISTIC is used by every major bank for Basel III credit risk models, by healthcare systems for readmission risk scoring, and by insurers for underwriting. SAS holds regulatory acceptance in these industries that newer tools are still working to achieve.`
},

/* ── BASIC 5 ─────────────────────────────────────────── */
{
  id:'sas-basic-5', language:'sas', level:'basic', order:5,
  title:'PROC UNIVARIATE — Detailed Distribution Analysis',
  duration:'20 min', xp:120,
  scenario:{
    company:'Meridian Health Sciences', role:'Biostatistician I',
    description:`The protocol requires a full distributional analysis of the primary endpoint (systolic blood pressure). You need more than PROC MEANS can provide — normality tests, percentiles, and extreme observations. PROC UNIVARIATE is the standard SAS procedure for this.`
  },
  objectives:[
    'Run PROC UNIVARIATE to get detailed descriptive statistics',
    'Use CLASS to compare distributions between groups',
    'Request normality tests with the NORMAL option',
    'Save statistics to a dataset with the OUTPUT statement'
  ],
  terminology:[
    {term:'PROC UNIVARIATE',lang:'sas',definition:'Produces detailed univariate statistics: moments, quantiles, extreme observations, and optional normality tests.',example:'PROC UNIVARIATE DATA=mydata;\n  VAR sbp;\nRUN;'},
    {term:'Shapiro-Wilk Test',lang:'sas',definition:'A normality test produced by the NORMAL option. p > 0.05 → fail to reject normality. p < 0.05 → evidence of non-normality.',example:'PROC UNIVARIATE NORMAL; VAR sbp; RUN;'},
    {term:'Percentile / Quantile',lang:'sas',definition:'The value below which a given percentage falls. P25=Q1, P50=median, P75=Q3.',example:'Pct 25 = 118 means 25% of values are below 118'},
    {term:'Skewness',lang:'sas',definition:'Measure of distribution asymmetry. 0=symmetric, positive=right-tailed, negative=left-tailed.',example:'Skewness = 1.4 → long right tail'},
    {term:'OUTPUT statement',lang:'sas',definition:'Saves requested statistics (mean, median, percentiles, etc.) to a new SAS dataset for further use.',example:'OUTPUT OUT=stats MEAN=mean_val MEDIAN=median_val;'}
  ],
  theory:`<h3>When PROC MEANS Isn't Enough</h3>
<p>PROC MEANS gives you mean, SD, min, max, and N. PROC UNIVARIATE adds:</p>
<ul><li>Skewness and kurtosis (distribution shape)</li><li>Full percentile table (P1, P5, P10, Q1, Median, Q3, P90, P95, P99)</li><li>The 5 highest and 5 lowest observations</li><li>Shapiro-Wilk and other normality tests</li></ul>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>PROC UNIVARIATE with the NORMAL option is required in most FDA-submitted clinical trial protocols. The Shapiro-Wilk test is preferred for samples &lt; 2000.</div></div>`,
  steps:[
    {step:1, title:'Basic PROC UNIVARIATE',
     explanation:`Run PROC UNIVARIATE on systolic blood pressure to get all standard distributional statistics.`,
     code:`DATA work.bp_study;
    INPUT patient_id sbp dbp age treatment $;
    DATALINES;
1  128 82 45 A
2  141 90 62 B
3  118 76 38 A
4  155 98 71 B
5  132 84 50 A
6  144 92 58 B
7  121 78 41 A
8  162 102 75 B
9  126 80 44 A
10 148 94 65 B
11 115 74 35 A
12 157 99 72 B
;
RUN;

PROC UNIVARIATE DATA=work.bp_study;
    VAR sbp;
    TITLE 'Distributional Analysis of Systolic Blood Pressure';
RUN;`,
     after:'Output includes N=12, mean, SD, skewness, kurtosis, all percentiles, and the 5 lowest/5 highest SBP values. The stem-and-leaf plot shows the distribution shape.'},
    {step:2, title:'NORMAL Option — Normality Tests',
     explanation:`Add the NORMAL option to request the Shapiro-Wilk statistic — required before choosing parametric vs non-parametric tests.`,
     code:`PROC UNIVARIATE DATA=work.bp_study NORMAL PLOT;
    VAR sbp dbp;
    TITLE 'Normality Tests for Blood Pressure Variables';
RUN;`,
     note:'PLOT requests a stem-and-leaf and box plot. NORMAL adds Shapiro-Wilk (W), Kolmogorov-Smirnov (D), Anderson-Darling (A-Sq), and Cramér-von Mises (W-Sq) statistics.',
     after:'For sbp: W≈0.962, p≈0.713 → fail to reject normality. Parametric tests (t-test, ANOVA) are appropriate for these outcomes.'},
    {step:3, title:'CLASS and OUTPUT Statements',
     explanation:`Compare SBP by treatment group and save key statistics to a dataset for reporting.`,
     code:`PROC UNIVARIATE DATA=work.bp_study NORMAL;
    CLASS treatment;
    VAR sbp;
    TITLE 'SBP by Treatment Group (A vs B)';
RUN;

/* Save statistics to a dataset */
PROC UNIVARIATE DATA=work.bp_study;
    VAR sbp;
    OUTPUT OUT=work.sbp_stats
        MEAN=mean_sbp
        STD=std_sbp
        MEDIAN=median_sbp
        P25=q1_sbp
        P75=q3_sbp
        SKEWNESS=skew_sbp;
RUN;

PROC PRINT DATA=work.sbp_stats;
    TITLE 'Saved SBP Statistics';
RUN;`,
     after:'Separate distributional output per treatment group shows Treatment B consistently higher. The OUTPUT dataset has one row with named statistics — ready to embed directly into a reporting macro.'}
  ],
  challenge:{
    title:'Endpoint Distribution Package',
    description:`Run PROC UNIVARIATE with CLASS=treatment and NORMAL option on both sbp and dbp. Save mean, median, P10, P90, and skewness for each to a dataset work.ep_stats. Print it.`,
    hint:`PROC UNIVARIATE NORMAL; CLASS treatment; VAR sbp dbp; OUTPUT OUT=work.ep_stats MEAN=mean_sbp mean_dbp MEDIAN=... P10=... P90=... SKEWNESS=...;`,
    starterCode:`PROC UNIVARIATE DATA=work.bp_study NORMAL;
    CLASS treatment;
    VAR sbp dbp;
    OUTPUT OUT=work.ep_stats
        /* Add keyword = name pairs here */
        ;
    TITLE 'Endpoint Distribution by Treatment';
RUN;

PROC PRINT DATA=work.ep_stats;
    TITLE 'Distributional Statistics Dataset';
RUN;`,
    solution:`PROC UNIVARIATE DATA=work.bp_study NORMAL;
    CLASS treatment;
    VAR sbp dbp;
    OUTPUT OUT=work.ep_stats
        MEAN     = mean_sbp    mean_dbp
        MEDIAN   = median_sbp  median_dbp
        P10      = p10_sbp     p10_dbp
        P90      = p90_sbp     p90_dbp
        SKEWNESS = skew_sbp    skew_dbp;
    TITLE 'Endpoint Distribution by Treatment';
RUN;

PROC PRINT DATA=work.ep_stats;
    TITLE 'Distributional Statistics Dataset';
RUN;`,
    explanation:`When VAR lists multiple variables, the OUTPUT statement pairs keyword-generated names in order: first keyword name → first VAR variable, second name → second VAR variable.`,
    successMessage:`PROC UNIVARIATE mastered! Complete distributional analysis is the mandatory step before choosing parametric tests in clinical and regulatory work.`
  },
  insight:`PROC UNIVARIATE is one of the five most-referenced PROCs in FDA SAP templates. The combination of NORMAL + CLASS + OUTPUT is standard practice in pharmaceutical submissions.`
},

/* ── INTERMEDIATE 5 ─────────────────────────────────── */
{
  id:'sas-inter-5', language:'sas', level:'intermediate', order:5,
  title:'PROC TRANSPOSE — Reshaping SAS Datasets',
  duration:'22 min', xp:160,
  scenario:{
    company:'Meridian Health Sciences', role:'Statistical Programmer',
    description:`You receive a laboratory dataset in long format (one row per visit per test). The reporting macro expects wide format (one row per patient with separate columns for each visit). PROC TRANSPOSE is the SAS equivalent of an Excel pivot — the most-used reshaping tool in clinical programming.`
  },
  objectives:[
    'Convert long format to wide format with PROC TRANSPOSE',
    'Control output column names with PREFIX= and the ID statement',
    'Go wide-to-long for statistical models',
    'Use the BY statement to transpose within subject groups'
  ],
  terminology:[
    {term:'PROC TRANSPOSE',lang:'sas',definition:'Rotates a SAS dataset: rows become columns (long→wide) or columns become rows (wide→long).',example:'PROC TRANSPOSE DATA=long OUT=wide PREFIX=visit_;\n  BY id; ID timepoint; VAR value;\nRUN;'},
    {term:'BY Statement',lang:'sas',definition:'Transposes each BY group separately — one output row per BY group (per patient).',example:'BY patient_id;'},
    {term:'ID Statement',lang:'sas',definition:'The variable whose values become the new column names.',example:'ID visit;  /* "V1","V2","V3" become column names */'},
    {term:'VAR Statement',lang:'sas',definition:'The variable(s) whose values fill the new columns.',example:'VAR lab_value;'},
    {term:'PREFIX=',lang:'sas',definition:'Prepends a string to column names when raw values aren\'t valid SAS variable names.',example:'PREFIX=v_  → v_V1  v_V2  v_V3'}
  ],
  theory:`<h3>Long vs Wide — The SAS Reporting Problem</h3>
<p>Clinical data arrives long (patient × visit × variable). Reporting macros, PROC COMPARE, and table shells expect wide (one row per patient).</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Long: patient | visit | value<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;101   | V1   | 125     → Wide: 101 | sbp_V1=125 | sbp_V2=118<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;101   | V2   | 118</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div>PROC TRANSPOSE requires input to be <strong>sorted by the BY variable</strong>. Always run PROC SORT first or specify the NOTSORTED option with caution.</div></div>`,
  steps:[
    {step:1, title:'Long to Wide Transpose',
     explanation:`Convert a longitudinal SBP dataset from long format (one row per visit) to wide (one row per patient, one column per visit).`,
     code:`DATA work.lab_long;
    INPUT patient_id visit $ sbp;
    DATALINES;
101 V1 128
101 V2 122
101 V3 119
102 V1 145
102 V2 140
102 V3 138
103 V1 132
103 V2 128
103 V3 125
;
RUN;

PROC SORT DATA=work.lab_long;
    BY patient_id;
RUN;

PROC TRANSPOSE DATA=work.lab_long
               OUT=work.lab_wide(DROP=_NAME_)
               PREFIX=sbp_;
    BY patient_id;
    ID visit;
    VAR sbp;
RUN;

PROC PRINT DATA=work.lab_wide;
    TITLE 'Wide: One Row Per Patient';
RUN;`,
     after:'3 rows (one per patient) with columns: patient_id, sbp_V1, sbp_V2, sbp_V3. DROP=_NAME_ removes the automatic tracking variable since it isn\'t needed here.'},
    {step:2, title:'Wide to Long Transpose',
     explanation:`Reverse direction — melt a wide dataset back to long format, needed for PROC MIXED or graphing.`,
     code:`/* Wide-to-long using NAME= for the variable-name column */
PROC TRANSPOSE DATA=work.lab_wide
               OUT=work.lab_long2
               NAME=visit;
    BY patient_id;
    VAR sbp_V1 sbp_V2 sbp_V3;
RUN;

DATA work.lab_long2;
    SET work.lab_long2(RENAME=(COL1=sbp));
    visit = COMPRESS(visit, 'sbp_');  /* strip "sbp_" prefix */
RUN;

PROC PRINT DATA=work.lab_long2;
    TITLE 'Restored Long Format';
RUN;`,
     note:'When transposing wide-to-long without an ID, the output value column defaults to COL1. Rename it in the following DATA step. NAME=visit gives a meaningful name to the "original variable name" column.',
     after:'9 rows again — one per patient per visit with clean visit and sbp columns. Ready for PROC MIXED longitudinal models.'},
    {step:3, title:'Two-Measure Transpose with BY and ID',
     explanation:`Transpose simultaneous measurements (SBP and DBP) at each visit using both the ID and VAR statements.`,
     code:`DATA work.vitals_long;
    INPUT patient_id visit $ measure $ value;
    DATALINES;
101 V1 SBP 128
101 V1 DBP  82
101 V2 SBP 122
101 V2 DBP  78
102 V1 SBP 145
102 V1 DBP  91
102 V2 SBP 140
102 V2 DBP  88
;
RUN;

PROC SORT DATA=work.vitals_long;
    BY patient_id visit;
RUN;

PROC TRANSPOSE DATA=work.vitals_long
               OUT=work.vitals_wide(DROP=_LABEL_)
               PREFIX=v;
    BY patient_id visit;
    ID measure;
    VAR value;
RUN;

PROC PRINT DATA=work.vitals_wide;
    TITLE 'Wide: Patient × Visit with SBP and DBP Columns';
RUN;`,
     after:'Each patient × visit row has vSBP and vDBP columns — the format required by most CRF table shells and clinical listing macros.'}
  ],
  challenge:{
    title:'Efficacy Score Pivot',
    description:`4 patients, 3 time points (Baseline, Week4, Week8), one efficacy score each. Data is in long format. Transpose to wide, then calculate change-from-baseline (Week4 − Baseline and Week8 − Baseline) in a DATA step.`,
    hint:`PROC SORT BY patient_id; PROC TRANSPOSE ... BY patient_id; ID timepoint; VAR score; Then DATA step: change_wk4 = Week4 - Baseline;`,
    starterCode:`DATA work.scores;
    INPUT patient_id timepoint $ score;
    DATALINES;
1 Baseline 72
1 Week4    65
1 Week8    58
2 Baseline 81
2 Week4    74
2 Week8    69
3 Baseline 68
3 Week4    60
3 Week8    53
4 Baseline 77
4 Week4    68
4 Week8    62
;
RUN;

PROC SORT DATA=work.scores; BY patient_id; RUN;

PROC TRANSPOSE DATA=work.scores
               OUT=work.scores_wide(DROP=_NAME_);
    BY         ;
    ID         ;
    VAR        ;
RUN;

DATA work.scores_wide;
    SET work.scores_wide;
    /* Add change variables */
RUN;

PROC PRINT DATA=work.scores_wide; TITLE 'Score Summary'; RUN;`,
    solution:`DATA work.scores;
    INPUT patient_id timepoint $ score;
    DATALINES;
1 Baseline 72
1 Week4    65
1 Week8    58
2 Baseline 81
2 Week4    74
2 Week8    69
3 Baseline 68
3 Week4    60
3 Week8    53
4 Baseline 77
4 Week4    68
4 Week8    62
;
RUN;

PROC SORT DATA=work.scores; BY patient_id; RUN;

PROC TRANSPOSE DATA=work.scores
               OUT=work.scores_wide(DROP=_NAME_);
    BY patient_id;
    ID timepoint;
    VAR score;
RUN;

DATA work.scores_wide;
    SET work.scores_wide;
    change_wk4 = Week4 - Baseline;
    change_wk8 = Week8 - Baseline;
RUN;

PROC PRINT DATA=work.scores_wide;
    TITLE 'Efficacy Score Summary with Change from Baseline';
RUN;`,
    explanation:`The ID=timepoint statement uses the timepoint values (Baseline, Week4, Week8) as column names. The subsequent DATA step then uses those column names in arithmetic — SAS treats them like any other numeric variable.`,
    successMessage:`PROC TRANSPOSE mastered! Long-to-wide and wide-to-long are daily operations in clinical programming — you can now handle any reshaping requirement in SAS.`
  },
  insight:`PROC TRANSPOSE is one of the top-five most-used PROCs in pharmaceutical statistical programming. Every longitudinal trial needs reshaping: ADSL (one row per subject) derives from long adverse event records; change-from-baseline tables need wide format; mixed models need long. Mastering PROC TRANSPOSE means mastering every data shape transition in the development pipeline.`
},

/* ── ADVANCED 5 ─────────────────────────────────────── */
{
  id:'sas-adv-5', language:'sas', level:'advanced', order:5,
  title:'PROC GENMOD — Generalized Linear Models',
  duration:'35 min', xp:220,
  scenario:{
    company:'Meridian Health Sciences', role:'Senior Biostatistician',
    description:`The Phase III trial uses a count outcome (number of adverse events per patient) — not normally distributed. A negative binomial regression is appropriate. PROC GENMOD handles non-normal outcomes (Poisson, negative binomial, logistic, gamma) under one unified framework — a cornerstone of regulatory biostatistics.`
  },
  objectives:[
    'Fit a Poisson regression model for count outcomes',
    'Diagnose overdispersion and switch to Negative Binomial',
    'Interpret rate ratios (exponentials of log coefficients)',
    'Use the REPEATED statement for GEE with correlated data'
  ],
  terminology:[
    {term:'PROC GENMOD',lang:'sas',definition:'Fits generalized linear models for non-normal outcomes. Supports DIST= NORMAL, BINOMIAL, POISSON, NEGBIN, GAMMA.',example:'PROC GENMOD DATA=mydata;\n  CLASS treatment;\n  MODEL count = treatment age / DIST=POISSON LINK=LOG;\nRUN;'},
    {term:'DIST=',lang:'sas',definition:'Distributional family. POISSON for counts, NEGBIN for overdispersed counts, BINOMIAL for binary outcomes.',example:'DIST=NEGBIN'},
    {term:'LINK=',lang:'sas',definition:'Link function. LOG for count/Poisson, LOGIT for binary, IDENTITY for normal.',example:'LINK=LOG'},
    {term:'Overdispersion',lang:'sas',definition:'In Poisson models, variance exceeds the mean. Deviance/DF > 1.5 indicates overdispersion → use NEGBIN.',example:'Deviance/DF = 3.2 → switch to NEGBIN'},
    {term:'Rate Ratio',lang:'sas',definition:'The exponentiated regression coefficient in a Poisson/NegBin model — multiplicative factor on the event rate.',example:'exp(0.35) = 1.42 → 42% higher rate in group B vs A'},
    {term:'GEE (REPEATED statement)',lang:'sas',definition:'Generalized Estimating Equations for correlated/repeated-measures data. REPEATED statement activates GEE in PROC GENMOD.',example:'REPEATED SUBJECT=patient_id / TYPE=AR(1);'}
  ],
  theory:`<h3>When to Use PROC GENMOD vs PROC REG</h3>
<table style="width:100%;font-size:13px;border-collapse:collapse"><tr style="background:#f1f5f9"><th style="padding:6px;text-align:left">Outcome</th><th style="padding:6px;text-align:left">DIST=</th><th style="padding:6px;text-align:left">LINK=</th><th style="padding:6px;text-align:left">Coefficient → </th></tr><tr><td style="padding:6px">Count (# events)</td><td style="padding:6px">POISSON</td><td style="padding:6px">LOG</td><td style="padding:6px">exp() = rate ratio</td></tr><tr style="background:#f8fafc"><td style="padding:6px">Count (overdispersed)</td><td style="padding:6px">NEGBIN</td><td style="padding:6px">LOG</td><td style="padding:6px">exp() = rate ratio</td></tr><tr><td style="padding:6px">Binary (0/1)</td><td style="padding:6px">BINOMIAL</td><td style="padding:6px">LOGIT</td><td style="padding:6px">exp() = odds ratio</td></tr><tr style="background:#f8fafc"><td style="padding:6px">Positive continuous</td><td style="padding:6px">GAMMA</td><td style="padding:6px">LOG</td><td style="padding:6px">exp() = mean ratio</td></tr></table>`,
  steps:[
    {step:1, title:'Poisson Regression and Overdispersion Check',
     explanation:`Fit a Poisson model for adverse event counts, then check if overdispersion requires switching to Negative Binomial.`,
     code:`DATA work.ae_counts;
    INPUT patient_id treatment $ age ae_count;
    DATALINES;
1  A 45  2
2  B 62  8
3  A 38  1
4  B 71 11
5  A 50  3
6  B 58  9
7  A 41  2
8  B 67 14
9  A 44  1
10 B 65 10
11 A 35  0
12 B 72 12
;
RUN;

PROC GENMOD DATA=work.ae_counts;
    CLASS treatment(REF='A');
    MODEL ae_count = treatment age / DIST=POISSON LINK=LOG;
    TITLE 'Poisson Regression: AE Counts';
RUN;`,
     note:'Check "Criteria For Assessing Goodness Of Fit". Deviance/DF >> 1 signals overdispersion → switch to NEGBIN.',
     after:'PROC GENMOD output shows log-scale regression coefficients. If Deviance/DF > 1.5, the Poisson assumption is violated and standard errors will be underestimated.'},
    {step:2, title:'Negative Binomial Model',
     explanation:`Switch to DIST=NEGBIN for overdispersed counts. Use ESTIMATE with EXP to get rate ratios directly.`,
     code:`PROC GENMOD DATA=work.ae_counts;
    CLASS treatment(REF='A');
    MODEL ae_count = treatment age / DIST=NEGBIN LINK=LOG;
    ESTIMATE 'TrtB vs A Rate Ratio' treatment 1 / EXP;
    TITLE 'Negative Binomial: AE Counts (Overdispersion Corrected)';
RUN;`,
     after:'The NEGBIN Deviance/DF approaches 1.0 — well-fitting model. The ESTIMATE statement with EXP outputs the rate ratio and its 95% confidence interval directly, which is what goes into the clinical study report.'},
    {step:3, title:'GEE for Repeated Measures',
     explanation:`When patients have multiple observations, use the REPEATED statement to activate GEE — accounting for within-patient correlation.`,
     code:`DATA work.ae_long;
    INPUT patient_id visit treatment $ age ae_count;
    DATALINES;
1 1 A 45 1
1 2 A 45 2
1 3 A 45 0
2 1 B 62 5
2 2 B 62 7
2 3 B 62 4
3 1 A 38 0
3 2 A 38 1
3 3 A 38 0
4 1 B 71 8
4 2 B 71 9
4 3 B 71 6
;
RUN;

PROC SORT DATA=work.ae_long; BY patient_id visit; RUN;

PROC GENMOD DATA=work.ae_long;
    CLASS patient_id treatment(REF='A');
    MODEL ae_count = treatment visit age / DIST=POISSON LINK=LOG;
    REPEATED SUBJECT=patient_id / TYPE=UN CORRW;
    TITLE 'GEE — Repeated Measures Poisson Regression';
RUN;`,
     after:'The REPEATED statement produces population-averaged (marginal) estimates with correct standard errors that account for within-patient correlation across visits. TYPE=UN estimates unstructured correlation; CORRW prints the estimated working correlation matrix.'}
  ],
  challenge:{
    title:'Logistic GENMOD for Binary Outcome',
    description:`Create a binary variable high_ae = 1 if ae_count > 5, else 0. Fit a PROC GENMOD logistic regression (DIST=BINOMIAL, LINK=LOGIT) with treatment and age as predictors. Use ESTIMATE with EXP for the treatment odds ratio.`,
    hint:`DATA step: high_ae = (ae_count > 5); PROC GENMOD DIST=BINOMIAL LINK=LOGIT; ESTIMATE 'OR' treatment 1 / EXP;`,
    starterCode:`DATA work.ae_binary;
    SET work.ae_counts;
    high_ae = (ae_count > 5);
RUN;

PROC GENMOD DATA=work.ae_binary;
    CLASS treatment(REF='A');
    MODEL high_ae = treatment age /
        DIST=
        LINK=;
    ESTIMATE 'Trt B vs A Odds Ratio' treatment 1 / ;
    TITLE 'Logistic via PROC GENMOD';
RUN;`,
    solution:`DATA work.ae_binary;
    SET work.ae_counts;
    high_ae = (ae_count > 5);
RUN;

PROC GENMOD DATA=work.ae_binary;
    CLASS treatment(REF='A');
    MODEL high_ae = treatment age /
        DIST=BINOMIAL
        LINK=LOGIT;
    ESTIMATE 'Trt B vs A Odds Ratio' treatment 1 / EXP;
    TITLE 'Logistic via PROC GENMOD';
RUN;`,
    explanation:`PROC GENMOD with DIST=BINOMIAL LINK=LOGIT produces the same parameter estimates as PROC LOGISTIC, but with the added flexibility of the ESTIMATE statement and GEE extension.`,
    successMessage:`Generalized Linear Models mastered! PROC GENMOD handles count, binary, and skewed continuous outcomes under one framework — a cornerstone of regulatory biostatistics.`
  },
  insight:`PROC GENMOD is required knowledge for FDA statistical reviewers and pharmaceutical biostatisticians. Poisson/NegBin for safety counts, logistic for binary endpoints, gamma for healthcare costs, GEE for longitudinal data — all run through PROC GENMOD. The unified DIST= + LINK= + REPEATED framework means one procedure handles a dozen analyses.`
}

]; // end SAS_LESSONS
