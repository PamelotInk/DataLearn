/* =========================================================
   lessons-python.js  — 15 Python (pandas) lessons
   All code is simulated — output is statically defined since
   we cannot run a real Python runtime in the browser.
   ========================================================= */

const PYTHON_LESSONS = [

/* ═══════════════════════════════════════════════
   BASIC – Lessons 1-5
   ═══════════════════════════════════════════════ */
{
  id:'py-basic-1', language:'python', level:'basic', order:1,
  title:'DataFrames — Your Spreadsheet in Python',
  duration:'20 min', xp:100,
  scenario:{
    company:'RetailCo Analytics',role:'Junior Data Analyst',
    description:`Your team receives a CSV file of employee data and asks you to "load it into Python and take a look." This is the first thing every analyst does — load a dataset, inspect its shape, check column types, and preview rows. You'll use pandas, Python's most essential data analysis library.`
  },
  objectives:[
    'Import pandas and create a DataFrame',
    'Use head(), tail(), shape, and info() to explore data',
    'Understand dtypes and why they matter',
    'Select specific columns from a DataFrame'
  ],
  terminology:[
    {term:'pandas',lang:'python',definition:'The most widely used Python library for data manipulation and analysis. Built on top of NumPy.',example:'import pandas as pd'},
    {term:'DataFrame',lang:'python',definition:'pandas\' core data structure — a 2D labeled table with rows and columns, similar to a SQL table or Excel spreadsheet.',example:'df = pd.read_csv("data.csv")'},
    {term:'Series',lang:'python',definition:'A single column of a DataFrame — a 1D labeled array. Selecting one column returns a Series; selecting multiple returns a DataFrame.',example:'s = df["salary"]  # Series'},
    {term:'dtype',lang:'python',definition:'The data type of a column: int64 (integers), float64 (decimals), object (text/mixed), datetime64 (dates), bool (true/false).',example:'df.dtypes  # view all column types'},
    {term:'head() / tail()',lang:'python',definition:"Returns the first or last N rows of a DataFrame. Default N=5. Essential for quickly previewing data.",example:'df.head(10)  # first 10 rows'},
    {term:'shape',lang:'python',definition:'A tuple (rows, columns) showing the DataFrame\'s dimensions.',example:'df.shape  # (1000, 15)'},
    {term:'info()',lang:'python',definition:'Prints a concise summary: column names, non-null counts, dtypes, and memory usage.',example:'df.info()'}
  ],
  theory:`<h3>Why pandas Is the Analyst's Best Friend</h3>
<p>When data lives in CSV files, Excel spreadsheets, or database exports, pandas reads it into a DataFrame — a Python object you can filter, join, aggregate, and transform with clean, readable code. It's the bridge between raw data and insight.</p>
<h3>The Analysis Workflow</h3>
<ol><li><strong>Load</strong> — pd.read_csv(), pd.read_excel(), pd.read_sql()</li><li><strong>Inspect</strong> — head(), info(), dtypes, shape</li><li><strong>Clean</strong> — handle nulls, fix types, rename columns</li><li><strong>Analyze</strong> — filter, group, aggregate, merge</li><li><strong>Report</strong> — visualize, export, share</li></ol>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Convention:</strong> Always import pandas as pd — this is universal shorthand in every data team worldwide.</div></div>`,
  steps:[
    {step:1,title:'Import pandas and Create a DataFrame',
     explanation:`Start every analysis by importing pandas. You can create a DataFrame from a dictionary for practice, or load from a file in real work.`,
     code:`import pandas as pd\n\n# Create a DataFrame from a dictionary\ndata = {\n    'first_name': ['Sarah','Michael','Emily','James','Lisa'],\n    'department': ['Sales','Sales','Marketing','IT','Sales'],\n    'salary':     [72000, 58000, 65000, 88000, 95000],\n    'hire_date':  ['2019-03-15','2021-07-01','2020-01-10','2018-11-20','2016-05-12']\n}\ndf = pd.DataFrame(data)\nprint(df)`,
     simulatedOutput:{type:'dataframe',
       headers:['first_name','department','salary','hire_date'],
       rows:[['Sarah','Sales',72000,'2019-03-15'],['Michael','Sales',58000,'2021-07-01'],['Emily','Marketing',65000,'2020-01-10'],['James','IT',88000,'2018-11-20'],['Lisa','Sales',95000,'2016-05-12']]},
     note:'DataFrames display like a table. Index (0,1,2...) appears on the left — that\'s the row label.',
     after:'Your data is now a DataFrame. Each key in the dictionary became a column; values became rows.'},
    {step:2,title:'Inspect Your DataFrame',
     explanation:`Use shape, info(), and head() to understand what you\'re working with before any analysis.`,
     code:`print("Shape:", df.shape)          # (rows, columns)\nprint("\\nColumn types:")\nprint(df.dtypes)\nprint("\\nFirst 3 rows:")\nprint(df.head(3))`,
     simulatedOutput:{type:'text',content:`Shape: (5, 4)\n\nColumn types:\nfirst_name    object\ndepartment    object\nsalary         int64\nhire_date      object\ndtype: object\n\nFirst 3 rows:\n  first_name department  salary   hire_date\n0      Sarah      Sales   72000  2019-03-15\n1    Michael      Sales   58000  2021-07-01\n2      Emily  Marketing   65000  2020-01-10`},
     note:'dtype "object" means text (string). Notice hire_date is object — we\'d normally parse it to datetime for date operations.',
     after:'You now know: 5 rows, 4 columns, salary is numeric, everything else is text.'},
    {step:3,title:'Select Columns',
     explanation:`Select a single column (returns Series) or multiple columns (returns DataFrame) using bracket notation.`,
     code:`# Single column → Series\nprint("=== Single Column (Series) ===")\nprint(df['salary'])\n\n# Multiple columns → DataFrame\nprint("\\n=== Multiple Columns (DataFrame) ===")\nprint(df[['first_name','department','salary']])`,
     simulatedOutput:{type:'text',content:`=== Single Column (Series) ===\n0    72000\n1    58000\n2    65000\n3    88000\n4    95000\nName: salary, dtype: int64\n\n=== Multiple Columns (DataFrame) ===\n  first_name department  salary\n0      Sarah      Sales   72000\n1    Michael      Sales   58000\n2      Emily  Marketing   65000\n3      James         IT   88000\n4       Lisa      Sales   95000`},
     after:'Single bracket → Series. Double bracket [[ ]] → DataFrame. This distinction matters for many pandas operations.'}
  ],
  challenge:{
    title:'First Look at the Product Catalog',
    description:`Write Python code to: (1) create a DataFrame with product_name, category, unit_price, and stock_qty for at least 4 products, (2) print its shape, (3) display only the product_name and unit_price columns, and (4) show the data types.`,
    hint:`Create a dict with 4 lists, pass to pd.DataFrame(). Use .shape, [[cols]], .dtypes`,
    starterCode:`import pandas as pd\n\nproducts_data = {\n    'product_name': ['Laptop Pro', 'Wireless Mouse', 'Monitor 27"', 'Mechanical Keyboard'],\n    'category':     ['Electronics', 'Electronics', 'Electronics', 'Electronics'],\n    'unit_price':   [1299.99, 29.99, 399.99, 129.99],\n    'stock_qty':    [45, 230, 62, 95]\n}\n\n# Create DataFrame\ndf_products = \n\n# Print shape\n\n# Show only product_name and unit_price\n\n# Show data types\n`,
    solution:`import pandas as pd\n\nproducts_data = {\n    'product_name': ['Laptop Pro', 'Wireless Mouse', 'Monitor 27"', 'Mechanical Keyboard'],\n    'category':     ['Electronics', 'Electronics', 'Electronics', 'Electronics'],\n    'unit_price':   [1299.99, 29.99, 399.99, 129.99],\n    'stock_qty':    [45, 230, 62, 95]\n}\n\ndf_products = pd.DataFrame(products_data)\nprint("Shape:", df_products.shape)\nprint("\\nPrice list:")\nprint(df_products[['product_name', 'unit_price']])\nprint("\\nData types:")\nprint(df_products.dtypes)`,
    explanation:`pd.DataFrame() turns the dictionary into a DataFrame. .shape is a property (no parentheses). Double brackets [['col1','col2']] selects multiple columns.`,
    successMessage:`DataFrame basics mastered! You can now load, inspect, and select from any dataset — the foundation of all Python data analysis.`
  },
  insight:`pandas is used at Google, Netflix, Twitter, and virtually every data team that uses Python. It's the #1 library in data science and analytics — learning it is as essential as learning Excel was to the previous generation.`
},

{
  id:'py-basic-2', language:'python', level:'basic', order:2,
  title:'Filtering Rows — Boolean Indexing',
  duration:'20 min', xp:120,
  scenario:{
    company:'RetailCo Analytics',role:'Junior Data Analyst',
    description:`Your manager passes you a dataset and asks: "Can you pull out just the Sales department employees? Also find anyone making over $70,000." In pandas, filtering rows uses Boolean indexing — a condition that produces True/False for each row, and only True rows are returned.`
  },
  objectives:[
    'Filter rows using comparison operators',
    'Combine conditions with & (AND) and | (OR)',
    'Use .isin() for multiple value matching',
    'Use .str methods for text filtering'
  ],
  terminology:[
    {term:'Boolean Indexing',lang:'python',definition:'Filtering a DataFrame by passing a Series of True/False values. Rows where the value is True are kept.',example:"df[df['salary'] > 70000]"},
    {term:'& and |',lang:'python',definition:'Bitwise AND and OR used for combining conditions in pandas. Unlike Python\'s "and/or" keywords, these work element-wise on Series.',example:"df[(df['dept']=='Sales') & (df['salary']>60000)]"},
    {term:'.isin()',lang:'python',definition:'Returns True for rows where the column value is in the provided list — equivalent to SQL\'s IN operator.',example:"df[df['dept'].isin(['Sales','Marketing'])]"},
    {term:'.str accessor',lang:'python',definition:'Accesses string methods on a Series (contains, startswith, upper, strip, etc.).',example:"df[df['name'].str.startswith('J')]"},
    {term:'.query()',lang:'python',definition:'An alternative filter syntax using a SQL-like string expression. Useful for complex filters with better readability.',example:"df.query(\"salary > 70000 and department == 'Sales'\")"}
  ],
  theory:`<h3>How Boolean Indexing Works</h3>
<p>When you write <code>df['salary'] > 70000</code>, pandas evaluates each row and returns a Series of True/False. Passing that back into <code>df[...]</code> keeps only the True rows.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>condition = df['salary'] > 70000<br>&nbsp;&nbsp;&nbsp;→ [True, False, False, True, True]<br>df[condition] → only rows where True</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Critical:</strong> Always wrap each condition in parentheses when combining with & or |:<br><code>df[(cond1) &amp; (cond2)]</code>  ← correct<br><code>df[cond1 &amp; cond2]</code> ← may error</div></div>`,
  steps:[
    {step:1,title:'Filter by a Single Condition',
     explanation:`Filter the DataFrame to only employees in the Sales department.`,
     code:`import pandas as pd\n\ndf = pd.DataFrame({\n    'name':['Sarah','Michael','Emily','James','Lisa'],\n    'department':['Sales','Sales','Marketing','IT','Sales'],\n    'salary':[72000,58000,65000,88000,95000],\n    'region':['East','West','East','Central','East']\n})\n\n# Filter to Sales only\nsales_df = df[df['department'] == 'Sales']\nprint(f"Sales employees ({len(sales_df)} found):")\nprint(sales_df)`,
     simulatedOutput:{type:'text',content:`Sales employees (3 found):\n     name department  salary region\n0   Sarah      Sales   72000   East\n1  Michael      Sales   58000   West\n4    Lisa       Sales   95000   East`},
     after:'3 Sales employees returned. Note indices (0,1,4) are preserved from original DataFrame.'},
    {step:2,title:'Combine Conditions with AND',
     explanation:`Find Sales employees earning more than $65,000. Both conditions must be true — use & with parentheses.`,
     code:`# Sales AND salary > 65000\nhigh_sales = df[\n    (df['department'] == 'Sales') &\n    (df['salary'] > 65000)\n]\nprint("High-earning Sales staff:")\nprint(high_sales[['name','department','salary']])`,
     simulatedOutput:{type:'text',content:`High-earning Sales staff:\n    name department  salary\n0  Sarah      Sales   72000\n4   Lisa      Sales   95000`},
     after:'Only Sarah and Lisa meet both criteria. Michael earns $58k — below $65k threshold.'},
    {step:3,title:'Use .isin() for Multiple Values',
     explanation:`Filter to employees in Sales OR Marketing using .isin() — cleaner than multiple OR conditions.`,
     code:`# Multiple department filter\nfront_office = df[df['department'].isin(['Sales', 'Marketing'])]\nprint("Sales & Marketing staff:")\nprint(front_office)`,
     simulatedOutput:{type:'text',content:`Sales & Marketing staff:\n      name department  salary region\n0    Sarah      Sales   72000   East\n1  Michael      Sales   58000   West\n2    Emily  Marketing   65000   East\n4     Lisa      Sales   95000   East`},
     after:'.isin([list]) is much cleaner than (dept=="Sales") | (dept=="Marketing") | (...) for many values.'}
  ],
  challenge:{
    title:'Premium Customer Filter',
    description:`Given the customers DataFrame below, filter to: (1) Premium customers from Texas or California, (2) Print the count, (3) Display first_name, last_name, state, segment columns only.`,
    hint:`Use .isin(['TX','CA']) for states, & to combine with (segment == 'Premium'), then select columns with [[ ]].`,
    starterCode:`import pandas as pd\n\ncustomers = pd.DataFrame({\n    'first_name': ['Alice','Bob','Carol','David','Eva','Frank','Grace','Henry'],\n    'last_name':  ['Kim','Smith','Johnson','Lee','Williams','Brown','Jones','Garcia'],\n    'state':      ['NY','CA','IL','TX','AZ','PA','TX','CA'],\n    'segment':    ['Premium','Standard','Premium','Standard','Basic','Standard','Basic','Premium'],\n    'total_orders':[24,8,31,5,2,12,3,42]\n})\n\n# Filter: Premium customers in TX or CA\nfiltered = customers[\n    \n]\n\nprint(f"Found: {len(filtered)} customers")\nprint(filtered[['first_name','last_name','state','segment']])`,
    solution:`import pandas as pd\n\ncustomers = pd.DataFrame({\n    'first_name': ['Alice','Bob','Carol','David','Eva','Frank','Grace','Henry'],\n    'last_name':  ['Kim','Smith','Johnson','Lee','Williams','Brown','Jones','Garcia'],\n    'state':      ['NY','CA','IL','TX','AZ','PA','TX','CA'],\n    'segment':    ['Premium','Standard','Premium','Standard','Basic','Standard','Basic','Premium'],\n    'total_orders':[24,8,31,5,2,12,3,42]\n})\n\nfiltered = customers[\n    (customers['segment'] == 'Premium') &\n    (customers['state'].isin(['TX', 'CA']))\n]\n\nprint(f"Found: {len(filtered)} customers")\nprint(filtered[['first_name','last_name','state','segment']])`,
    explanation:`(segment == 'Premium') creates a boolean Series. .isin(['TX','CA']) creates another. & combines them. len() counts matching rows. [[ ]] selects columns at the end.`,
    successMessage:`You filtered a DataFrame to a specific business segment just like you would in SQL — but now entirely in Python.`
  },
  insight:`Boolean indexing in pandas is the Python equivalent of SQL's WHERE clause. Every real-world analysis starts with filtering to the relevant subset of data. pandas filtering is also faster than Excel filters on millions of rows.`
},

{
  id:'py-basic-3', language:'python', level:'basic', order:3,
  title:'groupby() — Summarizing Data by Group',
  duration:'25 min', xp:140,
  scenario:{
    company:'RetailCo Analytics',role:'Data Analyst',
    description:`The Finance team wants: "Total salary spend by department. Average salary per department. How many employees per department?" In SQL, you'd use GROUP BY. In pandas, the equivalent is groupby() — and it's incredibly powerful.`
  },
  objectives:[
    'Use groupby() with single and multiple columns',
    'Apply aggregate functions: sum, mean, count, min, max',
    'Use .agg() for multiple aggregations at once',
    'Reset the index after groupby operations'
  ],
  terminology:[
    {term:'groupby()',lang:'python',definition:'Splits a DataFrame into groups based on column values, then applies an aggregation function to each group.',example:"df.groupby('department')['salary'].mean()"},
    {term:'.agg()',lang:'python',definition:'Apply multiple aggregation functions at once to one or more columns.',example:"df.groupby('dept').agg({'salary':['mean','sum','count']})"},
    {term:'.reset_index()',lang:'python',definition:'After groupby, group columns become the index. reset_index() moves them back to regular columns for easier use.',example:"df.groupby('dept').sum().reset_index()"},
    {term:'.size()',lang:'python',definition:'Counts the total number of rows per group, including NaN rows (unlike count() which skips NaN).',example:"df.groupby('category').size()"},
    {term:'.transform()',lang:'python',definition:'Like groupby().agg() but returns a result with the same shape as the original DataFrame. Used to add group-level stats as new columns.',example:"df['dept_avg'] = df.groupby('dept')['salary'].transform('mean')"}
  ],
  theory:`<h3>The Split-Apply-Combine Pattern</h3>
<p>groupby() works in three steps:</p>
<ol><li><strong>Split</strong> — divide the DataFrame into groups (one per unique department)</li><li><strong>Apply</strong> — run an aggregation function on each group (sum salaries)</li><li><strong>Combine</strong> — merge all group results into one output DataFrame</li></ol>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>df.groupby('department')['salary'].mean()<br>→ Sales: 75,000 | IT: 97,667 | Marketing: 78,500</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>After groupby(), the group column becomes the index. Almost always call .reset_index() to make the output a clean, flat DataFrame.</div></div>`,
  steps:[
    {step:1,title:'Basic groupby with One Aggregation',
     explanation:`Calculate the average salary per department. Chain groupby → column selection → aggregation function.`,
     code:`import pandas as pd\n\ndf = pd.DataFrame({\n    'name':['Sarah','Michael','Emily','James','Lisa','Jennifer','Kevin'],\n    'department':['Sales','Sales','Marketing','IT','Sales','IT','Finance'],\n    'salary':[72000,58000,65000,88000,95000,120000,105000]\n})\n\n# Average salary per department\navg_by_dept = df.groupby('department')['salary'].mean().reset_index()\navg_by_dept.columns = ['department','avg_salary']\navg_by_dept = avg_by_dept.sort_values('avg_salary', ascending=False)\nprint(avg_by_dept)`,
     simulatedOutput:{type:'dataframe',
       headers:['department','avg_salary'],
       rows:[['IT',104000.0],['Finance',105000.0],['Sales',75000.0],['Marketing',65000.0]]},
     after:'Each department has one row with its average salary. reset_index() moved department from index to a column.'},
    {step:2,title:'Multiple Aggregations with .agg()',
     explanation:`Calculate count, average, and total salary in one call using .agg() with a dictionary.`,
     code:`summary = df.groupby('department')['salary'].agg(\n    headcount='count',\n    avg_salary='mean',\n    total_salary='sum',\n    min_salary='min',\n    max_salary='max'\n).reset_index()\n\n# Round the numeric columns\nsummary['avg_salary'] = summary['avg_salary'].round(0)\nprint(summary.sort_values('total_salary', ascending=False).to_string(index=False))`,
     simulatedOutput:{type:'text',content:`department  headcount  avg_salary  total_salary  min_salary  max_salary\n        IT          2    104000.0        208000       88000      120000\n     Sales          3     75000.0        225000       58000       95000\n   Finance          1    105000.0        105000      105000      105000\n Marketing          1     65000.0         65000       65000       65000`},
     note:'Named aggregations (headcount=\'count\') give clean column names directly. .to_string(index=False) hides the row index for cleaner printing.',
     after:'A complete department compensation summary from one readable call.'},
    {step:3,title:'Add Group Stats Back to Original DataFrame',
     explanation:`Use .transform() to add each employee\'s department average salary as a new column, keeping all original rows.`,
     code:`# Add dept average to each row (without collapsing)\ndf['dept_avg_salary'] = df.groupby('department')['salary'].transform('mean').round(0)\ndf['vs_dept_avg'] = df['salary'] - df['dept_avg_salary']\ndf['pct_of_dept_avg'] = (df['salary'] / df['dept_avg_salary'] * 100).round(1)\n\nprint(df[['name','department','salary','dept_avg_salary','vs_dept_avg']]\n      .sort_values('department'))`,
     simulatedOutput:{type:'text',content:`      name department  salary  dept_avg_salary  vs_dept_avg\n6    Kevin    Finance  105000         105000.0          0.0\n2    Emily  Marketing   65000          65000.0          0.0\n3    James         IT   88000         104000.0     -16000.0\n5 Jennifer         IT  120000         104000.0      16000.0\n1  Michael      Sales   58000          75000.0     -17000.0\n0    Sarah      Sales   72000          75000.0      -3000.0\n4     Lisa      Sales   95000          75000.0      20000.0`},
     after:'transform() broadcasts group statistics back to original row level — how much is each employee above or below their department average?'}
  ],
  challenge:{
    title:'Regional Sales Summary',
    description:`Given a sales DataFrame, calculate per region: total revenue (sum of amount), transaction count, and average transaction value. Round averages to 2 decimal places. Sort by total revenue descending.`,
    hint:`groupby('region')['amount'].agg(total_revenue='sum', count='count', avg_amount='mean').reset_index()`,
    starterCode:`import pandas as pd\n\nsales = pd.DataFrame({\n    'employee_id':[1,1,2,2,5,5,14,1,2,11],\n    'region':     ['East','East','West','West','East','East','East','East','West','West'],\n    'amount':     [1299.99,29.99,249.99,399.99,279.99,599.99,399.99,79.99,1299.99,49.99]\n})\n\n# Group by region with multiple aggregations\nregional_summary = sales.groupby('region')['amount'].agg(\n    \n    \n    \n).reset_index()\n\nregional_summary['avg_amount'] = regional_summary['avg_amount'].round(2)\nprint(regional_summary.sort_values('total_revenue', ascending=False))`,
    solution:`import pandas as pd\n\nsales = pd.DataFrame({\n    'employee_id':[1,1,2,2,5,5,14,1,2,11],\n    'region':     ['East','East','West','West','East','East','East','East','West','West'],\n    'amount':     [1299.99,29.99,249.99,399.99,279.99,599.99,399.99,79.99,1299.99,49.99]\n})\n\nregional_summary = sales.groupby('region')['amount'].agg(\n    total_revenue='sum',\n    transaction_count='count',\n    avg_amount='mean'\n).reset_index()\n\nregional_summary['avg_amount'] = regional_summary['avg_amount'].round(2)\nprint(regional_summary.sort_values('total_revenue', ascending=False))`,
    explanation:`groupby('region') creates one group per region. .agg() with named aggregations creates multiple output columns simultaneously. reset_index() and sort_values() clean up the output.`,
    successMessage:`Regional summary built with one readable chain! groupby().agg() is the Python equivalent of SQL's GROUP BY — the heart of analytical summarization.`
  },
  insight:`groupby() powers virtually every business report in Python analytics. Revenue by product, churn by cohort, average response time by team — all groupby() problems. Learning to chain groupby → agg → reset_index → sort is core muscle memory for analysts.`
},

{
  id:'py-basic-4', language:'python', level:'basic', order:4,
  title:'Merging DataFrames — The pandas JOIN',
  duration:'25 min', xp:140,
  scenario:{
    company:'RetailCo Analytics',role:'Data Analyst',
    description:`You have two DataFrames: one with sales transactions (with employee_id) and one with employee info (with names). Your manager asks for a report showing each sale with the employee's name. You need to combine these two DataFrames — exactly what pd.merge() does, equivalent to SQL's JOIN.`
  },
  objectives:[
    'Use pd.merge() to join two DataFrames',
    'Understand how="inner", "left", "right", "outer"',
    'Handle column name conflicts with suffixes',
    'Merge on multiple keys'
  ],
  terminology:[
    {term:'pd.merge()',lang:'python',definition:'Joins two DataFrames based on matching column values. Equivalent to SQL JOIN.',example:"pd.merge(df1, df2, on='employee_id', how='inner')"},
    {term:'on=',lang:'python',definition:'The column name(s) to join on — must exist in both DataFrames with the same name.',example:"pd.merge(orders, customers, on='customer_id')"},
    {term:'left_on / right_on',lang:'python',definition:'Use when join columns have different names in the two DataFrames.',example:"pd.merge(df1, df2, left_on='emp_id', right_on='id')"},
    {term:'how=',lang:'python',definition:"The join type: 'inner' (default, matching rows only), 'left' (all left rows), 'right' (all right rows), 'outer' (all rows from both).",example:"how='left'"},
    {term:'suffixes=',lang:'python',definition:'When both DataFrames have a column with the same name (other than the join key), pandas adds suffixes to distinguish them.',example:"suffixes=('_sales','_budget')"}
  ],
  theory:`<h3>pd.merge() Maps Directly to SQL JOIN Types</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>how='inner' &nbsp;→ INNER JOIN (matching rows only)<br>how='left' &nbsp;&nbsp;→ LEFT JOIN  (all left + matched right)<br>how='right' &nbsp;→ RIGHT JOIN (all right + matched left)<br>how='outer' &nbsp;→ FULL OUTER JOIN (all rows both)</code></div></div>
<h3>Three Ways to Specify Join Keys</h3>
<ul><li><code>on='column'</code> — same column name in both DataFrames</li><li><code>left_on='a', right_on='b'</code> — different names</li><li><code>on=['col1','col2']</code> — multiple join keys</li></ul>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>After any merge, always check the row count. Unexpected row count means there are duplicate keys or a join condition problem.</div></div>`,
  steps:[
    {step:1,title:'Inner Merge — The Most Common Join',
     explanation:`Combine sales transactions with employee names using the shared employee_id column.`,
     code:`import pandas as pd\n\nsales = pd.DataFrame({\n    'sale_id':     [1,2,3,4,5],\n    'employee_id': [1,1,2,5,2],\n    'amount':      [1299.99, 29.99, 249.99, 399.99, 1299.99],\n    'region':      ['East','East','West','East','West']\n})\n\nemployees = pd.DataFrame({\n    'employee_id': [1,2,5],\n    'first_name':  ['Sarah','Michael','Lisa'],\n    'department':  ['Sales','Sales','Sales']\n})\n\n# Merge on employee_id\nresult = pd.merge(sales, employees, on='employee_id', how='inner')\nprint(result[['sale_id','first_name','department','amount','region']])`,
     simulatedOutput:{type:'dataframe',
       headers:['sale_id','first_name','department','amount','region'],
       rows:[[1,'Sarah','Sales',1299.99,'East'],[2,'Sarah','Sales',29.99,'East'],[3,'Michael','Sales',249.99,'West'],[4,'Lisa','Sales',399.99,'East'],[5,'Michael','Sales',1299.99,'West']]},
     after:'Employee names are now on each sale row. inner merge kept only rows where employee_id existed in both DataFrames.'},
    {step:2,title:'Left Merge — Keep All Left Rows',
     explanation:`Find all employees and their total sales — including employees who made no sales (they\'ll show NaN).`,
     code:`emp_sales = pd.merge(employees, sales, on='employee_id', how='left')\nprint("All employees (even with no sales):")\nprint(emp_sales[['first_name','sale_id','amount']])\n\n# Count nulls (employees with no matching sales)\nprint(f"\\nNulls in sale_id: {emp_sales['sale_id'].isna().sum()}")`,
     simulatedOutput:{type:'text',content:`All employees (even with no sales):\n  first_name  sale_id   amount\n0      Sarah      1.0  1299.99\n1      Sarah      2.0    29.99\n2    Michael      3.0   249.99\n3    Michael      5.0  1299.99\n4       Lisa      4.0   399.99\n\nNulls in sale_id: 0`},
     note:'If an employee had no sales, sale_id and amount would be NaN. Left merge guarantees all left rows appear.',
     after:'Left merge is how you find "which employees had no sales" (WHERE sale_id IS NULL in the result).'},
    {step:3,title:'Merge Then groupby — A Complete Report',
     explanation:`Merge sales with employees, then group to get total revenue per employee — a complete sales performance report.`,
     code:`# Merge\nmerged = pd.merge(sales, employees, on='employee_id')\n\n# Aggregate\nperformance = merged.groupby(['first_name','department'])['amount'].agg(\n    transactions='count',\n    total_revenue='sum'\n).reset_index()\nperformance['total_revenue'] = performance['total_revenue'].round(2)\nprint(performance.sort_values('total_revenue', ascending=False).to_string(index=False))`,
     simulatedOutput:{type:'text',content:` first_name department  transactions  total_revenue\n    Michael      Sales             2        1549.98\n      Sarah      Sales             2        1329.98\n       Lisa      Sales             1         399.99`},
     after:'merge + groupby is the pandas equivalent of JOIN + GROUP BY — used in virtually every business report.'}
  ],
  challenge:{
    title:'Customer Order Report',
    description:`Merge the orders DataFrame with the customers DataFrame on customer_id. Then calculate: total amount spent and order count per customer. Return a DataFrame with first_name, last_name, segment, order_count, total_spent. Sort by total_spent descending.`,
    hint:`pd.merge(orders, customers, on='customer_id'). Then groupby(['first_name','last_name','segment']).agg(...).reset_index().`,
    starterCode:`import pandas as pd\n\norders = pd.DataFrame({\n    'order_id':   [1001,1002,1003,1004,1005,1006,1007],\n    'customer_id':[1,3,2,8,14,16,1],\n    'total_amount':[1329.98,679.98,249.99,1749.97,399.99,599.99,79.99]\n})\n\ncustomers = pd.DataFrame({\n    'customer_id':[1,2,3,8,14,16],\n    'first_name': ['Alice','Bob','Carol','Henry','Noah','Peter'],\n    'last_name':  ['Kim','Smith','Johnson','Garcia','Thomas','White'],\n    'segment':    ['Premium','Standard','Premium','Premium','Premium','Premium']\n})\n\n# Merge then aggregate\nmerged = pd.merge(\n    \n)\n\nreport = merged.groupby(['first_name','last_name','segment'])['total_amount'].agg(\n    order_count=\n    total_spent=\n).reset_index()\n\nprint(report.sort_values('total_spent', ascending=False).to_string(index=False))`,
    solution:`import pandas as pd\n\norders = pd.DataFrame({\n    'order_id':   [1001,1002,1003,1004,1005,1006,1007],\n    'customer_id':[1,3,2,8,14,16,1],\n    'total_amount':[1329.98,679.98,249.99,1749.97,399.99,599.99,79.99]\n})\n\ncustomers = pd.DataFrame({\n    'customer_id':[1,2,3,8,14,16],\n    'first_name': ['Alice','Bob','Carol','Henry','Noah','Peter'],\n    'last_name':  ['Kim','Smith','Johnson','Garcia','Thomas','White'],\n    'segment':    ['Premium','Standard','Premium','Premium','Premium','Premium']\n})\n\nmerged = pd.merge(orders, customers, on='customer_id')\n\nreport = merged.groupby(['first_name','last_name','segment'])['total_amount'].agg(\n    order_count='count',\n    total_spent='sum'\n).reset_index()\n\nprint(report.sort_values('total_spent', ascending=False).to_string(index=False))`,
    explanation:`merge() combines the DataFrames on customer_id. Then groupby(['name','segment']) creates one row per customer. .agg() calculates count and sum simultaneously. reset_index() and sort_values() finalize the output.`,
    successMessage:`Customer order report complete! merge + groupby is the single most-used analytical pattern in pandas.`
  },
  insight:`pd.merge() is how Python analysts replicate SQL JOINs. At companies like Uber and DoorDash, analysts constantly merge DataFrames from different data sources (CRM, transactions, marketing) to build comprehensive reports.`
},

{
  id:'py-basic-5', language:'python', level:'basic', order:5,
  title:'Handling Missing Data — NaN & Nulls',
  duration:'20 min', xp:120,
  scenario:{
    company:'RetailCo Analytics',role:'Data Analyst',
    description:`Real-world data is never clean. Your manager hands you a customer dataset with missing emails, null purchase dates, and blank cities. Before any analysis, you need to find, understand, and handle missing values — or your summary statistics will be wrong and your models will break.`
  },
  objectives:[
    'Detect missing values with isna() and isnull()',
    'Count and report missing data by column',
    'Fill missing values with fillna()',
    'Drop rows or columns with missing values using dropna()'
  ],
  terminology:[
    {term:'NaN',lang:'python',definition:"Not a Number — pandas' representation of a missing value. Inherited from NumPy. Numeric columns use NaN; object columns may use None.",example:'import numpy as np; np.nan'},
    {term:'.isna()',lang:'python',definition:'Returns True where values are NaN/None. .isnull() is identical.',example:'df.isna()  # True for missing values'},
    {term:'.notna()',lang:'python',definition:'Returns True where values are NOT missing. Opposite of isna().',example:"df[df['email'].notna()]  # rows with email present"},
    {term:'.fillna()',lang:'python',definition:'Replaces NaN with a specified value, column mean, median, or forward/backward fill.',example:"df['city'].fillna('Unknown')"},
    {term:'.dropna()',lang:'python',definition:'Removes rows (or columns) containing NaN. Parameters: subset, how, thresh.',example:"df.dropna(subset=['email'])  # drop rows missing email"},
    {term:'forward fill (ffill)',lang:'python',definition:'Fills NaN with the last known value. Used in time-series data where a missing value should carry forward.',example:"df['price'].fillna(method='ffill')"}
  ],
  theory:`<h3>Missing Data Is the #1 Data Quality Issue</h3>
<p>In every real dataset: survey respondents skip questions, database entries are incomplete, sensors fail, forms have optional fields. Ignoring NaN causes silent errors: <code>np.mean([1, 2, NaN, 4])</code> in pandas returns 2.33 (skips NaN) but not all operations handle it gracefully.</p>
<h3>The Missing Data Strategy</h3>
<ol><li><strong>Detect</strong> — find how much is missing and where</li><li><strong>Understand</strong> — is it random or systematic? Does it matter?</li><li><strong>Handle</strong> — drop, fill with constant, fill with stat, or flag</li></ol>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Never</strong> blindly drop or fill all nulls without understanding why they're missing. A null survey answer may mean "not applicable" — not the same as a null price (which is probably a data error).</div></div>`,
  steps:[
    {step:1,title:'Detect Missing Values',
     explanation:`Use isna().sum() to get a count of missing values per column — your data quality audit.`,
     code:`import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'customer_id':[1,2,3,4,5,6],\n    'first_name': ['Alice','Bob',None,'David','Eva','Frank'],\n    'email':      ['a@x.com',None,None,'d@x.com','e@x.com',None],\n    'city':       ['New York','LA',None,'Houston',None,'Philly'],\n    'total_spent':[450.0, 200.0, np.nan, 75.0, np.nan, 310.0]\n})\n\nprint("Missing value count per column:")\nprint(df.isna().sum())\nprint(f"\\nTotal cells: {df.size}")\nprint(f"Missing cells: {df.isna().sum().sum()}")\nprint(f"Completeness: {100*(1 - df.isna().sum().sum()/df.size):.1f}%")`,
     simulatedOutput:{type:'text',content:`Missing value count per column:\ncustomer_id    0\nfirst_name     1\nemail          3\ncity           2\ntotal_spent    2\ndtype: int64\n\nTotal cells: 30\nMissing cells: 8\nCompleteness: 73.3%`},
     after:'You can see exactly where data is missing. email has the most gaps. 73.3% of the dataset is complete.'},
    {step:2,title:'Fill Missing Values',
     explanation:`Fill missing total_spent with the column median (robust to outliers), and fill missing city with "Unknown".`,
     code:`df_clean = df.copy()  # always work on a copy\n\n# Fill numeric with median\nmedian_spent = df_clean['total_spent'].median()\ndf_clean['total_spent'] = df_clean['total_spent'].fillna(median_spent)\n\n# Fill categorical with 'Unknown'\ndf_clean['city'] = df_clean['city'].fillna('Unknown')\n\nprint(f"Median spent used for fill: \${median_spent:.2f}")\nprint("\\nAfter filling:")\nprint(df_clean[['customer_id','city','total_spent']])`,
     simulatedOutput:{type:'text',content:`Median spent used for fill: $255.00\n\nAfter filling:\n   customer_id      city  total_spent\n0            1  New York       450.00\n1            2        LA       200.00\n2            3   Unknown       255.00\n3            4   Houston        75.00\n4            5   Unknown       255.00\n5            6    Philly       310.00`},
     note:'Always use median (not mean) for filling numeric NaN when outliers are possible. Mean is skewed by extremes.',
     after:'NaN replaced with sensible values. The DataFrame is now safe for analysis.'},
    {step:3,title:'Drop Rows Missing Critical Data',
     explanation:`For email campaigns, we need a valid email. Drop rows where email is missing — this is business-justified, not arbitrary.`,
     code:`# Drop rows missing email\ndf_campaign = df.dropna(subset=['email'])\nprint(f"Rows before: {len(df)}")\nprint(f"Rows after dropping missing email: {len(df_campaign)}")\nprint("\\nCampaign-ready customers:")\nprint(df_campaign[['customer_id','first_name','email']])`,
     simulatedOutput:{type:'text',content:`Rows before: 6\nRows after dropping missing email: 3\n\nCampaign-ready customers:\n   customer_id first_name      email\n0            1      Alice    a@x.com\n3            4      David    d@x.com\n4            5        Eva    e@x.com`},
     after:'3 customers with valid emails. dropna(subset=[\'email\']) only drops rows missing email — not rows missing other columns.'}
  ],
  challenge:{
    title:'Data Quality Report',
    description:`Given the DataFrame below, produce a data quality report: (1) Print the count and percentage of missing values per column, (2) fill missing salary with the department median, (3) drop any rows where both city and salary are missing.`,
    hint:`isna().sum() / len(df) * 100 for percentages. Use groupby + transform to fill with department median. dropna(subset=['city','salary'], how='all') drops rows where both are missing.`,
    starterCode:`import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'name':      ['Sarah','Michael','Emily','James','Lisa','Kevin'],\n    'department':['Sales','Sales','Marketing','IT','Sales','Finance'],\n    'city':      ['NY', None, 'Chicago', None, 'NY', 'Boston'],\n    'salary':    [72000, 58000, None, 88000, None, 105000]\n})\n\n# 1. Missing value audit\nmissing_count = df.isna().sum()\nmissing_pct = (df.isna().sum() / len(df) * 100).round(1)\nprint("Column | Missing | Pct")\nfor col in df.columns:\n    print(f"{col:12} | {missing_count[col]:7} | {missing_pct[col]:5.1f}%")\n\n# 2. Fill salary with department median\ndf['salary'] = df.groupby('department')['salary'].transform(\n    lambda x: x.fillna(x.median())\n)\n\n# 3. Drop rows where BOTH city and salary are still missing\ndf_clean = df.dropna(subset=['city','salary'], how='all')\nprint(f"\\nRows remaining: {len(df_clean)}")\nprint(df_clean)`,
    solution:`import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'name':      ['Sarah','Michael','Emily','James','Lisa','Kevin'],\n    'department':['Sales','Sales','Marketing','IT','Sales','Finance'],\n    'city':      ['NY', None, 'Chicago', None, 'NY', 'Boston'],\n    'salary':    [72000, 58000, None, 88000, None, 105000]\n})\n\nmissing_count = df.isna().sum()\nmissing_pct = (df.isna().sum() / len(df) * 100).round(1)\nprint("Column | Missing | Pct")\nfor col in df.columns:\n    print(f"{col:12} | {missing_count[col]:7} | {missing_pct[col]:5.1f}%")\n\ndf['salary'] = df.groupby('department')['salary'].transform(\n    lambda x: x.fillna(x.median())\n)\n\ndf_clean = df.dropna(subset=['city','salary'], how='all')\nprint(f"\\nRows remaining: {len(df_clean)}")\nprint(df_clean)`,
    explanation:`isna().sum() counts missing. Dividing by len(df)*100 gives percentages. groupby+transform with a lambda fills each NaN with its department\'s median salary. how='all' in dropna() only drops rows where ALL specified columns are null.`,
    successMessage:`Data quality audit complete! These patterns — assess, fill strategically, drop when justified — are the foundation of every data cleaning workflow.`
  },
  insight:`Data cleaning consumes 60-80% of a real analyst's time. mastering NaN handling in pandas is not glamorous, but it's what separates analysts who produce correct results from those who don't. Every Kaggle competition, every production pipeline starts with this.`
},

/* ═══════════════════════════════════════════════
   INTERMEDIATE – Lessons 6-10
   ═══════════════════════════════════════════════ */
{
  id:'py-inter-1', language:'python', level:'intermediate', order:1,
  title:'Pivot Tables — pd.pivot_table()',
  duration:'25 min', xp:160,
  scenario:{
    company:'RetailCo Analytics',role:'Data Analyst',
    description:`The Director wants a pivot table showing total revenue by product category (rows) and region (columns) — just like Excel's PivotTable feature, but faster on large data and reproducible. pandas provides pd.pivot_table() for exactly this.`
  },
  objectives:[
    'Create pivot tables with pd.pivot_table()',
    'Understand values, index, columns, and aggfunc parameters',
    'Add margins (row/column totals)',
    'Reshape back with pd.melt()'
  ],
  terminology:[
    {term:'pd.pivot_table()',lang:'python',definition:'Creates a spreadsheet-style pivot table. Groups data by index rows and columns headers, aggregating a values column.',example:"pd.pivot_table(df, values='revenue', index='category', columns='region', aggfunc='sum')"},
    {term:'values=',lang:'python',definition:'The column to aggregate in the pivot table.',example:"values='amount'"},
    {term:'index=',lang:'python',definition:'Column(s) that become the row labels of the pivot table.',example:"index='product_category'"},
    {term:'columns=',lang:'python',definition:'Column whose unique values become the column headers.',example:"columns='region'"},
    {term:'margins=True',lang:'python',definition:'Adds row and column totals (Grand Total row and column) to the pivot table.',example:'margins=True, margins_name="Total"'},
    {term:'pd.melt()',lang:'python',definition:'Reverse of pivot — reshapes a wide DataFrame back to long format.',example:"pd.melt(df, id_vars=['category'], var_name='region', value_name='revenue')"}
  ],
  theory:`<h3>Pivot Table = GROUP BY in Two Dimensions</h3>
<p>A pivot table is a GROUP BY that places one group variable on rows and another on columns, creating a matrix of aggregated values. The same data that requires a complex multi-condition GROUP BY in SQL becomes a one-liner with pivot_table.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>pd.pivot_table(<br>&nbsp;&nbsp;df,<br>&nbsp;&nbsp;values='revenue',    # what to aggregate<br>&nbsp;&nbsp;index='category',   # row labels<br>&nbsp;&nbsp;columns='region',   # column headers<br>&nbsp;&nbsp;aggfunc='sum',      # how to aggregate<br>&nbsp;&nbsp;fill_value=0        # replace NaN with 0<br>)</code></div></div>`,
  steps:[
    {step:1,title:'Create a Basic Pivot Table',
     explanation:`Build a pivot showing total revenue by product category (rows) and region (columns).`,
     code:`import pandas as pd\n\ndata = {\n    'category': ['Electronics','Electronics','Furniture','Electronics','Furniture','Office Supplies'],\n    'region':   ['East','West','East','Central','West','East'],\n    'revenue':  [5200, 3100, 2800, 1500, 1900, 450]\n}\ndf = pd.DataFrame(data)\n\npivot = pd.pivot_table(\n    df,\n    values='revenue',\n    index='category',\n    columns='region',\n    aggfunc='sum',\n    fill_value=0\n)\nprint(pivot)`,
     simulatedOutput:{type:'text',content:`region           Central   East  West\ncategory\nElectronics         1500   5200  3100\nFurniture              0   2800  1900\nOffice Supplies        0    450     0`},
     after:'One row per category, one column per region. fill_value=0 replaces NaN (no sales in that combination) with 0.'},
    {step:2,title:'Add Totals with margins',
     explanation:`Add row and column grand totals to the pivot table.`,
     code:`pivot_with_totals = pd.pivot_table(\n    df,\n    values='revenue',\n    index='category',\n    columns='region',\n    aggfunc='sum',\n    fill_value=0,\n    margins=True,\n    margins_name='Grand Total'\n)\nprint(pivot_with_totals)`,
     simulatedOutput:{type:'text',content:`region           Central   East  West  Grand Total\ncategory\nElectronics         1500   5200  3100        9800\nFurniture              0   2800  1900        4700\nOffice Supplies        0    450     0         450\nGrand Total         1500   8450  5000       14950`},
     after:'Grand Total row and column added automatically. This is the format executives expect in summary reports.'},
    {step:3,title:'Multiple Aggregation Functions',
     explanation:`Use aggfunc as a list to calculate multiple statistics in one pivot table.`,
     code:`pivot_multi = pd.pivot_table(\n    df,\n    values='revenue',\n    index='category',\n    columns='region',\n    aggfunc=['sum','count'],\n    fill_value=0\n)\n# Flatten multi-level column names\npivot_multi.columns = [f'{agg}_{region}' for agg, region in pivot_multi.columns]\npivot_multi = pivot_multi.reset_index()\nprint(pivot_multi.to_string(index=False))`,
     simulatedOutput:{type:'text',content:`         category  sum_Central  sum_East  sum_West  count_Central  count_East  count_West\n      Electronics         1500      5200      3100              1           1           1\n        Furniture            0      2800      1900              0           1           1\n  Office Supplies            0       450         0              0           1           0`},
     after:'Both sum and count for each region in one pivot. The multi-level columns are flattened to readable names.'}
  ],
  challenge:{
    title:'Monthly Category Revenue Pivot',
    description:`Create a pivot table showing total revenue by month (rows) and sales category (columns). Use the sample data provided. Add grand total margins. Round all values to 2 decimal places.`,
    hint:`pd.pivot_table(df, values='amount', index='month', columns='category', aggfunc='sum', fill_value=0, margins=True)`,
    starterCode:`import pandas as pd\n\ndf = pd.DataFrame({\n    'month':    ['2023-01','2023-01','2023-02','2023-02','2023-01','2023-02','2023-03','2023-03'],\n    'category': ['Electronics','Furniture','Electronics','Office Supplies','Electronics','Furniture','Electronics','Office Supplies'],\n    'amount':   [5200, 2800, 3100, 450, 1299, 1900, 2400, 300]\n})\n\npivot = pd.pivot_table(\n    df,\n    values=\n    index=\n    columns=\n    aggfunc=\n    fill_value=\n    margins=\n    margins_name=\n)\n\nprint(pivot.round(2))`,
    solution:`import pandas as pd\n\ndf = pd.DataFrame({\n    'month':    ['2023-01','2023-01','2023-02','2023-02','2023-01','2023-02','2023-03','2023-03'],\n    'category': ['Electronics','Furniture','Electronics','Office Supplies','Electronics','Furniture','Electronics','Office Supplies'],\n    'amount':   [5200, 2800, 3100, 450, 1299, 1900, 2400, 300]\n})\n\npivot = pd.pivot_table(\n    df,\n    values='amount',\n    index='month',\n    columns='category',\n    aggfunc='sum',\n    fill_value=0,\n    margins=True,\n    margins_name='Grand Total'\n)\n\nprint(pivot.round(2))`,
    explanation:`pivot_table automatically groups by the index (month) and creates one column per unique category value. margins=True adds the totals row and column.`,
    successMessage:`Pivot table built in one function call! pd.pivot_table() replaces complex conditional aggregation SQL with clean, readable Python.`
  },
  insight:`Every CFO and director expects pivot tables. The advantage of pd.pivot_table() over Excel is that it runs on millions of rows in seconds, is reproducible code, and can be automated. Data engineers and analysts use this to generate scheduled reports.`
},

{
  id:'py-inter-2', language:'python', level:'intermediate', order:2,
  title:'String Operations & Data Cleaning',
  duration:'25 min', xp:150,
  scenario:{
    company:'RetailCo Analytics',role:'Data Analyst',
    description:`You receive a customer CSV with inconsistent formatting: "  sarah JOHNSON ", "SMITH, BOB", mixed-case categories, extra whitespace, and phone numbers in different formats. Before analysis, you need to standardize the data. pandas .str accessor provides vectorized string operations.`
  },
  objectives:[
    'Use .str accessor for string cleaning operations',
    'Apply strip, lower, upper, title, replace, split',
    'Extract patterns using .str.contains() and .str.extract()',
    'Create new columns from string transformations'
  ],
  terminology:[
    {term:'.str accessor',lang:'python',definition:'Access to string methods applied element-wise to a pandas Series. Works on object dtype columns.',example:"df['name'].str.lower()"},
    {term:'.str.strip()',lang:'python',definition:'Removes leading and trailing whitespace from strings.',example:"df['city'].str.strip()"},
    {term:'.str.lower() / .str.upper()',lang:'python',definition:'Converts strings to all lowercase or uppercase.',example:"df['email'].str.lower()"},
    {term:'.str.replace()',lang:'python',definition:'Replaces occurrences of a pattern (string or regex) with another string.',example:"df['phone'].str.replace('-','')"},
    {term:'.str.contains()',lang:'python',definition:'Returns True/False if the string contains a pattern. Useful for filtering.',example:"df[df['email'].str.contains('@')]"},
    {term:'.str.split()',lang:'python',definition:'Splits strings on a delimiter, returning a list or expanded columns.',example:"df['full_name'].str.split(' ', expand=True)"}
  ],
  theory:`<h3>Real Data Is Messy</h3>
<p>Inconsistent string formatting is one of the most common data quality issues. Python's .str accessor applies string functions to every row at once (vectorized), making data cleaning concise and fast.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>df['name'].str.strip().str.title()<br>→ "  sarah johnson  " → "Sarah Johnson"</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Chain .str operations: <code>.str.strip().str.lower().str.replace(' ','-')</code> — each step returns a Series that the next step operates on.</div></div>`,
  steps:[
    {step:1,title:'Clean String Columns',
     explanation:`Strip whitespace, normalize casing, and standardize a category column with inconsistent formatting.`,
     code:`import pandas as pd\n\ndf = pd.DataFrame({\n    'name':      ['  SARAH johnson ', 'michael Chen  ', ' Emily RODRIGUEZ'],\n    'email':     ['SARAH.J@Company.COM', 'michael.c@company.com', 'emily.r@COMPANY.COM'],\n    'department':['sales', 'SALES', 'Marketing  ']\n})\n\nprint("=== Before ===")\nprint(df)\n\n# Clean\ndf['name']       = df['name'].str.strip().str.title()\ndf['email']      = df['email'].str.strip().str.lower()\ndf['department'] = df['department'].str.strip().str.title()\n\nprint("\\n=== After ===")\nprint(df)`,
     simulatedOutput:{type:'text',content:`=== Before ===\n               name                  email         department\n0   SARAH johnson   SARAH.J@Company.COM          sales\n1  michael Chen    michael.c@company.com         SALES\n2  Emily RODRIGUEZ  emily.r@COMPANY.COM    Marketing  \n\n=== After ===\n              name                  email department\n0    Sarah Johnson   sarah.j@company.com      Sales\n1     Michael Chen  michael.c@company.com      Sales\n2  Emily Rodriguez   emily.r@company.com  Marketing`},
     after:'All three columns are now consistently formatted — Title Case names, lowercase emails, no extra whitespace.'},
    {step:2,title:'Extract Parts from Strings',
     explanation:`Split a full_name column into first and last name columns using str.split with expand=True.`,
     code:`df2 = pd.DataFrame({'full_name': ['Sarah Johnson','Michael Chen','Emily Rodriguez','James Wilson']})\n\n# Split and expand into separate columns\ndf2[['first_name','last_name']] = df2['full_name'].str.split(' ', n=1, expand=True)\n\nprint(df2)`,
     simulatedOutput:{type:'dataframe',
       headers:['full_name','first_name','last_name'],
       rows:[['Sarah Johnson','Sarah','Johnson'],['Michael Chen','Michael','Chen'],['Emily Rodriguez','Emily','Rodriguez'],['James Wilson','James','Wilson']]},
     note:'expand=True turns the split result into a DataFrame with one column per part. n=1 splits on the first space only.',
     after:'First and last name in separate columns — ready for standardized reporting or mail merge.'},
    {step:3,title:'Filter and Flag with String Methods',
     explanation:`Find employees whose email doesn\'t match company domain, and flag them for review.`,
     code:`df3 = pd.DataFrame({\n    'name':  ['Sarah','Michael','Emily','External Vendor','James'],\n    'email': ['sarah@company.com','michael@company.com','emily@gmail.com','vendor@external.org','james@company.com']\n})\n\n# Flag non-company emails\ndf3['is_company_email'] = df3['email'].str.endswith('@company.com')\ndf3['email_domain'] = df3['email'].str.split('@').str[1]\n\nprint(df3.to_string(index=False))\nprint(f"\\nExternal accounts: {(~df3['is_company_email']).sum()}")`,
     simulatedOutput:{type:'text',content:`               name                email  is_company_email    email_domain\n              Sarah    sarah@company.com              True    company.com\n            Michael  michael@company.com              True    company.com\n              Emily       emily@gmail.com             False      gmail.com\n    External Vendor  vendor@external.org             False   external.org\n              James    james@company.com              True    company.com\n\nExternal accounts: 2`},
     after:'Boolean flag column created from string operation. String chaining .split().str[1] extracts the domain portion.'}
  ],
  challenge:{
    title:'SKU Standardization',
    description:`The product DataFrame below has inconsistent product codes. Clean them: (1) strip whitespace, (2) convert to uppercase, (3) replace spaces with hyphens, (4) create a category_code column that is the first 3 characters of the cleaned sku.`,
    hint:`\`.str.strip().str.upper().str.replace(' ', '-')\` to clean. \`.str[:3]\` for first 3 chars.`,
    starterCode:`import pandas as pd\n\ndf = pd.DataFrame({\n    'product_name': ['Laptop Pro','Wireless Mouse','Standing Desk','USB-C Hub'],\n    'sku':          ['  elec 001', 'ELEC 002  ', 'furn 001', '  ELEC 003']\n})\n\n# Clean sku column\ndf['sku_clean'] = df['sku']\n\n# Extract category code (first 3 chars)\ndf['category_code'] = \n\nprint(df[['product_name','sku','sku_clean','category_code']])`,
    solution:`import pandas as pd\n\ndf = pd.DataFrame({\n    'product_name': ['Laptop Pro','Wireless Mouse','Standing Desk','USB-C Hub'],\n    'sku':          ['  elec 001', 'ELEC 002  ', 'furn 001', '  ELEC 003']\n})\n\ndf['sku_clean'] = df['sku'].str.strip().str.upper().str.replace(' ', '-')\ndf['category_code'] = df['sku_clean'].str[:3]\n\nprint(df[['product_name','sku','sku_clean','category_code']])`,
    explanation:`.str.strip() removes whitespace. .str.upper() normalizes case. .str.replace(' ','-') fixes spacing. .str[:3] slices the first 3 characters — Python slicing works on string Series.`,
    successMessage:`SKUs standardized! String cleaning is 30-40% of real data prep work. These .str methods scale to millions of rows instantly.`
  },
  insight:`String cleaning is unglamorous but ubiquitous. At any company ingesting data from multiple systems, inconsistent formatting is guaranteed. Python analysts who can quickly clean data are far more productive than those who manually correct it in Excel.`
},

{
  id:'py-inter-3', language:'python', level:'intermediate', order:3,
  title:'Time Series — Date Parsing & Resampling',
  duration:'25 min', xp:160,
  scenario:{
    company:'RetailCo Analytics',role:'Data Analyst',
    description:`The finance team needs monthly and weekly revenue summaries from a daily transactions log. You'll parse the date column, set it as the index, and use pandas' powerful resample() function to aggregate by any time frequency — one of the most distinctive pandas capabilities.`
  },
  objectives:[
    'Parse date strings to datetime with pd.to_datetime()',
    'Set a DatetimeIndex for time-series operations',
    'Resample data to different frequencies (daily→monthly)',
    'Calculate rolling windows on time series'
  ],
  terminology:[
    {term:'pd.to_datetime()',lang:'python',definition:'Converts a string or number column to pandas Timestamp (datetime) type.',example:"df['date'] = pd.to_datetime(df['date'])"},
    {term:'DatetimeIndex',lang:'python',definition:'A pandas index made of datetime values. Enables time-based slicing, resampling, and period operations.',example:"df = df.set_index('order_date')"},
    {term:'.resample()',lang:'python',definition:'Groups time-series data into time buckets (day, week, month, quarter, year) and applies an aggregation.',example:"df.resample('M')['revenue'].sum()  # monthly totals"},
    {term:'Frequency Aliases',lang:'python',definition:"Resample frequency strings: 'D'=daily, 'W'=weekly, 'M'=month end, 'MS'=month start, 'Q'=quarter, 'A'=annual.",example:"df.resample('MS').sum()"},
    {term:'.rolling()',lang:'python',definition:'Computes rolling window statistics. .rolling(3).mean() = 3-period moving average.',example:"df['revenue'].rolling(3).mean()"}
  ],
  theory:`<h3>Time Series: The Most Common Business Dataset</h3>
<p>Sales by day, users per month, inventory by week — almost every real-world dataset has a time dimension. pandas treats datetime columns specially, enabling powerful time-based operations that are tedious in SQL.</p>
<h3>The Time Series Workflow</h3>
<ol><li><code>pd.to_datetime()</code> — parse strings to datetime</li><li><code>.set_index()</code> — make date the index</li><li><code>.resample('M')</code> — group by month</li><li><code>.agg()</code> — calculate statistics per period</li></ol>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Frequency cheat sheet:</strong> 'D' = day, 'W' = week, 'MS' = month start, 'ME' = month end, 'QS' = quarter start, 'YS' = year start</div></div>`,
  steps:[
    {step:1,title:'Parse Dates and Set Index',
     explanation:`Convert a string date column to datetime and set it as the DataFrame index for time-series operations.`,
     code:`import pandas as pd\n\ndf = pd.DataFrame({\n    'order_date':  ['2023-01-05','2023-01-12','2023-01-20','2023-02-08',\n                     '2023-02-18','2023-03-03','2023-03-10','2023-03-28'],\n    'revenue':     [1329.98, 249.99, 399.99, 79.99, 449.99, 84.98, 1579.97, 279.98]\n})\n\n# Parse date and set as index\ndf['order_date'] = pd.to_datetime(df['order_date'])\ndf = df.set_index('order_date')\n\nprint("dtype of index:", df.index.dtype)\nprint("\\nFirst 3 rows:")\nprint(df.head(3))`,
     simulatedOutput:{type:'text',content:`dtype of index: datetime64[ns]\n\nFirst 3 rows:\n             revenue\norder_date          \n2023-01-05   1329.98\n2023-01-12    249.99\n2023-01-20    399.99`},
     after:'The index is now datetime64. You can slice by date: df["2023-01"] returns all January rows.'},
    {step:2,title:'Resample to Monthly Totals',
     explanation:`Aggregate daily data into monthly buckets with resample(\'MS\') — Month Start frequency.`,
     code:`monthly = df.resample('MS')['revenue'].agg(\n    total='sum',\n    transactions='count',\n    avg_order='mean'\n).round(2)\n\nprint("Monthly Revenue Summary:")\nprint(monthly)`,
     simulatedOutput:{type:'dataframe',
       headers:['','total','transactions','avg_order'],
       rows:[['2023-01-01',1979.96,3,659.99],['2023-02-01',529.98,2,264.99],['2023-03-01',1944.93,3,648.31]]},
     after:'Three daily transactions per month collapse into one monthly summary row. Resample handles date-boundary logic automatically.'},
    {step:3,title:'Rolling Moving Average',
     explanation:`Calculate a 30-day rolling average of daily revenue to smooth out volatility and show the trend.`,
     code:`# Monthly data as a starting point\nmonthly_rev = df.resample('MS')['revenue'].sum()\n\n# Add rolling average\nmonthly_rev = monthly_rev.reset_index()\nmonthly_rev.columns = ['month','revenue']\nmonthly_rev['rolling_3mo'] = monthly_rev['revenue'].rolling(3, min_periods=1).mean().round(2)\n\nprint(monthly_rev.to_string(index=False))`,
     simulatedOutput:{type:'text',content:`       month  revenue  rolling_3mo\n  2023-01-01  1979.96      1979.96\n  2023-02-01   529.98      1254.97\n  2023-03-01  1944.93      1484.96`},
     note:'min_periods=1 ensures the rolling average calculates even when fewer than 3 prior periods exist (at the start of the series).',
     after:'Rolling average smooths the volatile monthly data. This is the "trend line" behind every time-series chart in finance.'}
  ],
  challenge:{
    title:'Weekly Sales Trend',
    description:`Given the daily sales DataFrame below, resample to weekly totals ('W'). Calculate weekly revenue, transaction count, and a 3-week rolling average. Reset the index and rename the columns clearly.`,
    hint:`resample('W')['amount'].agg(total_revenue='sum', transactions='count').reset_index(). Then rolling(3).mean() on total_revenue.`,
    starterCode:`import pandas as pd\n\ndates = pd.date_range('2023-01-01', periods=21, freq='D')\nimport numpy as np\nnp.random.seed(42)\ndf = pd.DataFrame({'date': dates, 'amount': np.random.uniform(200, 2000, 21).round(2)})\ndf = df.set_index('date')\n\n# Resample to weekly\nweekly = df.resample('W')['amount'].agg(\n    \n    \n).reset_index()\n\n# Add rolling 3-week average\nweekly['rolling_3wk_avg'] = \n\nprint(weekly.round(2).to_string(index=False))`,
    solution:`import pandas as pd\nimport numpy as np\n\ndates = pd.date_range('2023-01-01', periods=21, freq='D')\nnp.random.seed(42)\ndf = pd.DataFrame({'date': dates, 'amount': np.random.uniform(200, 2000, 21).round(2)})\ndf = df.set_index('date')\n\nweekly = df.resample('W')['amount'].agg(\n    total_revenue='sum',\n    transactions='count'\n).reset_index()\n\nweekly['rolling_3wk_avg'] = weekly['total_revenue'].rolling(3, min_periods=1).mean().round(2)\n\nprint(weekly.round(2).to_string(index=False))`,
    explanation:`resample('W') groups by calendar week. .agg() calculates multiple stats. rolling(3).mean() creates a 3-week trailing average. min_periods=1 prevents NaN in early weeks.`,
    successMessage:`Weekly trend analysis complete! Resample + rolling is the standard pandas approach to time-series aggregation used in every financial analytics team.`
  },
  insight:`pandas resampling is used at trading firms, e-commerce platforms, and fintech companies to aggregate real-time transaction streams into OHLC bars, hourly summaries, daily close reports, and monthly KPI dashboards — all from the same concise API.`
},

/* ═══════════════════════════════════════════════
   ADVANCED – Lessons 11-15
   ═══════════════════════════════════════════════ */
{
  id:'py-adv-1', language:'python', level:'advanced', order:1,
  title:'Advanced groupby — Custom Functions & apply()',
  duration:'30 min', xp:190,
  scenario:{
    company:'RetailCo Analytics',role:'Senior Data Analyst',
    description:`Standard aggregations (sum, mean, count) aren't always enough. The product team needs a custom metric: "For each customer segment, calculate the interquartile range of order values, the 90th percentile spend, and a custom loyalty score." These require custom functions via .apply() and .agg() with lambdas.`
  },
  objectives:[
    'Use .apply() with custom functions on groups',
    'Pass lambda functions to .agg()',
    'Calculate percentiles and custom metrics',
    'Understand when apply() is slower and when to avoid it'
  ],
  terminology:[
    {term:'.apply()',lang:'python',definition:'Applies a custom Python function to each group or row/column. More flexible than .agg() but slower on large datasets.',example:"df.groupby('segment').apply(custom_fn)"},
    {term:'lambda',lang:'python',definition:'An anonymous single-expression function. Used inline with apply/agg for concise custom aggregations.',example:"lambda x: x.quantile(0.9)  -- 90th percentile"},
    {term:'np.percentile()',lang:'python',definition:'NumPy function to calculate any percentile of an array.',example:"np.percentile(x, 75)  -- 75th percentile"},
    {term:'IQR',lang:'python',definition:'Interquartile Range — the difference between the 75th and 25th percentiles. A robust measure of spread that ignores outliers.',example:'iqr = q75 - q25'},
    {term:'named aggregation',lang:'python',definition:'In .agg(), using keyword arguments to name the output columns.',example:".agg(median_val=('amount','median'), iqr=('amount', lambda x: x.quantile(.75)-x.quantile(.25)))"}
  ],
  theory:`<h3>Beyond Built-in Aggregations</h3>
<p>Built-in aggregations (sum, mean, count) are optimized C code and extremely fast. Custom functions via apply() are Python and much slower. Use built-ins wherever possible and apply() only when necessary.</p>
<h3>When to Use apply()</h3>
<ul><li>Custom statistical calculations (IQR, coefficient of variation)</li><li>Business logic that can't be expressed as a simple aggregation</li><li>Returning multiple values from one group computation</li></ul>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Performance note:</strong> apply() can be 10-100x slower than vectorized operations on large datasets. Always try to find a vectorized equivalent before using apply().</div></div>`,
  steps:[
    {step:1,title:'Custom Aggregation with lambda in agg()',
     explanation:`Use lambda functions inside .agg() to calculate custom metrics like 90th percentile and IQR in one call.`,
     code:`import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'segment': ['Premium','Standard','Premium','Basic','Premium','Standard','Basic','Premium'],\n    'amount':  [1329.98, 249.99, 679.98, 49.99, 1749.97, 399.99, 129.99, 599.99]\n})\n\nresult = df.groupby('segment')['amount'].agg(\n    count='count',\n    mean=lambda x: round(x.mean(), 2),\n    median=lambda x: round(x.median(), 2),\n    p90=lambda x: round(x.quantile(0.9), 2),\n    iqr=lambda x: round(x.quantile(0.75) - x.quantile(0.25), 2)\n).reset_index()\n\nprint(result.to_string(index=False))`,
     simulatedOutput:{type:'text',content:` segment  count     mean   median      p90      iqr\n    Basic      2    89.99    89.99   124.99    80.00\n  Premium      4  1089.98   1004.99  1674.98   770.00\n Standard      2   324.99   324.99   389.99   150.00`},
     after:'Custom statistics calculated per segment. lambda x: x.quantile(0.9) is the 90th percentile — the clearest way to express custom aggregations.'},
    {step:2,title:'apply() for Complex Group Logic',
     explanation:`Use apply() when you need to return multiple values or apply logic that touches the whole group DataFrame at once.`,
     code:`def segment_stats(group):\n    """Custom stats function applied per segment group"""\n    return pd.Series({\n        'count':          len(group),\n        'total':          group['amount'].sum().round(2),\n        'avg':            group['amount'].mean().round(2),\n        'top_transaction':group['amount'].max(),\n        'cv_pct':         round(group['amount'].std() / group['amount'].mean() * 100, 1)\n    })\n\nresult = df.groupby('segment').apply(segment_stats, include_groups=False).reset_index()\nprint(result.to_string(index=False))`,
     simulatedOutput:{type:'text',content:` segment  count    total      avg  top_transaction  cv_pct\n    Basic      2   179.98    89.99           129.99    64.5\n  Premium      4  4359.92  1089.98          1749.97    49.2\n Standard      2   649.98   324.99           399.99    32.5`},
     note:'cv_pct = Coefficient of Variation (std/mean * 100). A measure of dispersion relative to the mean. Higher = more variable spending.',
     after:'apply() let us write a complete Python function and apply it to each group. This pattern works for any logic, no matter how complex.'},
    {step:3,title:'Rank Within Groups Using transform()',
     explanation:`Add within-group rankings back to the original DataFrame using transform() — without collapsing rows.`,
     code:`# Add rank within each segment by amount\ndf['rank_in_segment'] = df.groupby('segment')['amount'].rank(\n    method='dense', ascending=False\n)\n\ndf['segment_total'] = df.groupby('segment')['amount'].transform('sum').round(2)\ndf['pct_of_segment'] = (df['amount'] / df['segment_total'] * 100).round(1)\n\nprint(df.sort_values(['segment','rank_in_segment']).to_string(index=False))`,
     simulatedOutput:{type:'text',content:` segment   amount  rank_in_segment  segment_total  pct_of_segment\n    Basic    129.99              1.0         179.98            72.2\n    Basic     49.99              2.0         179.98            27.8\n  Premium   1749.97              1.0        4359.92            40.1\n  Premium   1329.98              2.0        4359.92            30.5\n  Premium    679.98              3.0        4359.92            15.6\n  Premium    599.99              4.0        4359.92            13.8\n Standard    399.99              1.0         649.98            61.5\n Standard    249.99              2.0         649.98            38.5`},
     after:'Each transaction ranked within its segment. transform() adds group context to every row without losing the row-level detail.'}
  ],
  challenge:{
    title:'Customer Lifetime Value Segmentation',
    description:`Calculate per customer: total_spent, order_count, avg_order_value, and a custom "LTV score" = total_spent * log(order_count + 1). Round all to 2 decimal places. Then rank customers by LTV score descending.`,
    hint:`Use np.log() for the natural log. groupby('customer_id').agg(...) then add ltv_score column as total_spent * np.log(order_count + 1).`,
    starterCode:`import pandas as pd\nimport numpy as np\n\norders = pd.DataFrame({\n    'customer_id':[1,1,1,2,2,3,3,3,3,4],\n    'first_name': ['Alice','Alice','Alice','Bob','Bob','Carol','Carol','Carol','Carol','David'],\n    'segment':    ['Premium']*3 + ['Standard']*2 + ['Premium']*4 + ['Basic'],\n    'amount':     [450.0, 320.0, 890.0, 150.0, 200.0, 1200.0, 300.0, 750.0, 980.0, 80.0]\n})\n\n# Aggregate per customer\ncustomer_stats = orders.groupby(['customer_id','first_name','segment'])['amount'].agg(\n    total_spent='sum',\n    order_count='count',\n    avg_order_value='mean'\n).reset_index().round(2)\n\n# LTV score\ncustomer_stats['ltv_score'] = \n\nprint(customer_stats.sort_values('ltv_score', ascending=False).to_string(index=False))`,
    solution:`import pandas as pd\nimport numpy as np\n\norders = pd.DataFrame({\n    'customer_id':[1,1,1,2,2,3,3,3,3,4],\n    'first_name': ['Alice','Alice','Alice','Bob','Bob','Carol','Carol','Carol','Carol','David'],\n    'segment':    ['Premium']*3 + ['Standard']*2 + ['Premium']*4 + ['Basic'],\n    'amount':     [450.0, 320.0, 890.0, 150.0, 200.0, 1200.0, 300.0, 750.0, 980.0, 80.0]\n})\n\ncustomer_stats = orders.groupby(['customer_id','first_name','segment'])['amount'].agg(\n    total_spent='sum',\n    order_count='count',\n    avg_order_value='mean'\n).reset_index().round(2)\n\ncustomer_stats['ltv_score'] = (customer_stats['total_spent'] * np.log(customer_stats['order_count'] + 1)).round(2)\nprint(customer_stats.sort_values('ltv_score', ascending=False).to_string(index=False))`,
    explanation:`groupby().agg() with named aggregations produces the per-customer stats. LTV score is then computed as a vectorized column operation — no apply() needed since it's a simple formula.`,
    successMessage:`LTV scoring complete! This pattern — aggregate then derive — is the core of customer analytics, churn modeling, and loyalty program design.`
  },
  insight:`Custom group functions power the analytical models behind personalization at Amazon, risk scoring at banks, and churn prediction at SaaS companies. Knowing when to use built-in aggregations vs. apply() vs. vectorized operations is what separates intermediate analysts from senior ones.`
},

{
  id:'py-adv-2', language:'python', level:'advanced', order:2,
  title:'Statistical Analysis with scipy and descriptive stats',
  duration:'30 min', xp:200,
  scenario:{
    company:'RetailCo Analytics',role:'Senior Data Analyst',
    description:`The data science team asks: "Is the difference in average order value between Premium and Standard customers statistically significant? Can you run a t-test? Also summarize the distribution of order amounts with skewness and kurtosis." Statistical analysis in Python uses scipy.stats alongside pandas.`
  },
  objectives:[
    'Generate descriptive statistics with .describe()',
    'Calculate skewness and kurtosis to understand distributions',
    'Run a two-sample t-test with scipy.stats',
    'Interpret statistical test results (p-value, significance)'
  ],
  terminology:[
    {term:'.describe()',lang:'python',definition:'Generates descriptive statistics: count, mean, std, min, 25th/50th/75th percentiles, max.',example:'df["amount"].describe()'},
    {term:'Skewness',lang:'python',definition:'Measures asymmetry of a distribution. 0 = symmetric; positive = right tail; negative = left tail.',example:'df["amount"].skew()'},
    {term:'Kurtosis',lang:'python',definition:'Measures the "tailedness" of a distribution. High kurtosis = heavy tails / more outliers.',example:'df["amount"].kurtosis()'},
    {term:'t-test',lang:'python',definition:'Statistical test comparing the means of two groups to determine if the difference is statistically significant.',example:'scipy.stats.ttest_ind(group1, group2)'},
    {term:'p-value',lang:'python',definition:'Probability of observing the data if the null hypothesis (no difference) is true. p < 0.05 typically indicates statistical significance.',example:'if p_value < 0.05: print("Significant")'},
    {term:'Null hypothesis',lang:'python',definition:'The default assumption being tested — usually "there is no difference between groups". A low p-value gives evidence to reject it.'}
  ],
  theory:`<h3>Descriptive vs. Inferential Statistics</h3>
<p><strong>Descriptive statistics</strong> summarize what the data shows (mean, median, std). <strong>Inferential statistics</strong> test whether patterns in a sample are likely to exist in the broader population.</p>
<h3>When to Use a t-test</h3>
<p>Use a two-sample t-test when you have two groups and want to know if their means are significantly different. Core assumptions:</p>
<ul><li>Both groups are approximately normally distributed (or large samples)</li><li>Observations are independent</li><li>Variances may or may not be equal (Welch's t-test handles unequal)</li></ul>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>p &lt; 0.05 → reject null → difference is statistically significant<br>p ≥ 0.05 → fail to reject null → difference may be due to chance</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div>Statistical significance ≠ practical significance. A tiny difference can be "significant" with a large enough sample. Always report both the p-value AND the effect size.</div></div>`,
  steps:[
    {step:1,title:'Descriptive Statistics Deep Dive',
     explanation:`Use .describe() and additional stats functions to fully characterize an order amount distribution.`,
     code:`import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'segment': ['Premium']*5 + ['Standard']*5 + ['Basic']*5,\n    'amount':  [1329.98,679.98,1749.97,599.99,449.99,\n                249.99,399.99,79.99,309.98,279.98,\n                49.99,129.99,54.98,79.99,34.99]\n})\n\nprint("=== Overall Distribution ===")\nprint(df['amount'].describe().round(2))\nprint(f"\\nSkewness:  {df['amount'].skew():.3f}")\nprint(f"Kurtosis:  {df['amount'].kurtosis():.3f}")`,
     simulatedOutput:{type:'text',content:`=== Overall Distribution ===\ncount      15.000000\nmean      496.638000\nstd       518.321000\nmin        34.990000\n25%        79.990000\n50%       279.980000\n75%       599.990000\nmax      1749.970000\ndtype: float64\n\nSkewness:  1.132\nKurtosis:  0.187`},
     after:'Mean ($497) >> Median ($280) — the right skew (1.13) confirms premium orders pull the mean up. This distribution is NOT symmetric.'},
    {step:2,title:'Compare Groups with groupby + describe',
     explanation:`Break down statistics by customer segment to compare distributions.`,
     code:`print("=== Statistics by Segment ===")\ngroup_stats = df.groupby('segment')['amount'].describe().round(2)\nprint(group_stats)\n\nprint("\\n=== Skewness & CV by Segment ===")\nskew_cv = df.groupby('segment')['amount'].agg(\n    skewness=lambda x: round(x.skew(), 3),\n    cv_pct=lambda x: round(x.std()/x.mean()*100, 1)\n)\nprint(skew_cv)`,
     simulatedOutput:{type:'text',content:`=== Statistics by Segment ===\n          count     mean      std     min      25%      50%      75%     max\nsegment\nBasic       5.0    69.99    34.54   34.99    49.99    54.98    79.99  129.99\nPremium     5.0   961.99   566.93  449.99   599.99   679.98  1329.98 1749.97\nStandard    5.0   264.00   126.98   79.99   249.99   279.98   399.99  399.99\n\n=== Skewness & CV by Segment ===\n          skewness  cv_pct\nsegment\nBasic        1.283    49.3\nPremium      0.718    58.9\nStandard    -1.280    48.1`},
     after:'Premium orders are 3.6x more expensive than Standard on average. Premium has the highest coefficient of variation (most variability).'},
    {step:3,title:'Two-Sample t-Test',
     explanation:`Test whether Premium and Standard customers have statistically different average order values.`,
     code:`from scipy import stats\n\npremium  = df[df['segment']=='Premium']['amount']\nstandard = df[df['segment']=='Standard']['amount']\n\n# Welch's t-test (does NOT assume equal variance)\nt_stat, p_value = stats.ttest_ind(premium, standard, equal_var=False)\n\nprint(f"Premium mean:  \${premium.mean():.2f}")\nprint(f"Standard mean: \${standard.mean():.2f}")\nprint(f"Difference:    \${premium.mean() - standard.mean():.2f}")\nprint(f"\\nt-statistic: {t_stat:.3f}")\nprint(f"p-value:     {p_value:.4f}")\nalpha = 0.05\nif p_value < alpha:\n    print(f"\\n✓ Result: SIGNIFICANT (p < {alpha})")\n    print("There IS a statistically significant difference between groups.")\nelse:\n    print(f"\\n✗ Result: NOT significant (p ≥ {alpha})")\n    print("No statistically significant difference detected.")`,
     simulatedOutput:{type:'text',content:`Premium mean:  $961.99\nStandard mean: $264.00\nDifference:    $697.99\n\nt-statistic: 2.764\np-value:     0.0312\n\n✓ Result: SIGNIFICANT (p < 0.05)\nThere IS a statistically significant difference between groups.`},
     after:'p=0.031 < 0.05: the $698 difference is statistically significant — not likely due to random chance. Premium customers genuinely spend more.'}
  ],
  challenge:{
    title:'A/B Test Analysis',
    description:`An A/B test was run on two checkout page designs. Group A is the control, Group B is the treatment. Analyze: (1) descriptive stats for each group, (2) run a t-test, (3) print a conclusion in plain English.`,
    hint:`scipy.stats.ttest_ind(group_a, group_b). Compare p to 0.05. Report mean difference and whether it's significant.`,
    starterCode:`import pandas as pd\nfrom scipy import stats\n\nresults = pd.DataFrame({\n    'group':       ['A']*10 + ['B']*10,\n    'order_value': [45.2,67.8,34.1,89.3,55.0,72.4,48.9,61.2,38.7,79.6,\n                    58.3,84.1,71.5,93.2,62.7,88.4,77.9,95.6,68.1,82.3]\n})\n\ngroup_a = results[results['group']=='A']['order_value']\ngroup_b = results[results['group']=='B']['order_value']\n\n# 1. Descriptive stats\nprint(results.groupby('group')['order_value'].describe().round(2))\n\n# 2. t-test\nt_stat, p_value = stats.ttest_ind( )\n\n# 3. Conclusion\nprint(f"\\nt-stat: {t_stat:.3f}, p-value: {p_value:.4f}")\nif p_value < 0.05:\n    print(f"SIGNIFICANT: Group B averages \${group_b.mean()-group_a.mean():.2f} more than Group A.")\nelse:\n    print("NOT significant: no reliable difference detected.")`,
    solution:`import pandas as pd\nfrom scipy import stats\n\nresults = pd.DataFrame({\n    'group':       ['A']*10 + ['B']*10,\n    'order_value': [45.2,67.8,34.1,89.3,55.0,72.4,48.9,61.2,38.7,79.6,\n                    58.3,84.1,71.5,93.2,62.7,88.4,77.9,95.6,68.1,82.3]\n})\n\ngroup_a = results[results['group']=='A']['order_value']\ngroup_b = results[results['group']=='B']['order_value']\n\nprint(results.groupby('group')['order_value'].describe().round(2))\n\nt_stat, p_value = stats.ttest_ind(group_a, group_b, equal_var=False)\n\nprint(f"\\nt-stat: {t_stat:.3f}, p-value: {p_value:.4f}")\nif p_value < 0.05:\n    print(f"SIGNIFICANT: Group B averages \${group_b.mean()-group_a.mean():.2f} more than Group A.")\nelse:\n    print("NOT significant: no reliable difference detected.")`,
    explanation:`Welch's t-test (equal_var=False) compares the two group means. p-value < 0.05 means the observed difference is unlikely to be due to chance alone. Group B's higher mean is statistically real.`,
    successMessage:`A/B test analyzed! Statistical testing is used for every major product decision at tech companies — feature launches, pricing changes, UI experiments all go through this workflow.`
  },
  insight:`Product teams at Facebook, Airbnb, and Booking.com run thousands of A/B tests simultaneously. Analysts who can correctly interpret t-tests, p-values, and confidence intervals are essential to data-driven product decisions. This is one of the most impactful skills in analytics.`
},

{
  id:'py-adv-3', language:'python', level:'advanced', order:3,
  title:'Cohort Analysis in Python',
  duration:'35 min', xp:220,
  scenario:{
    company:'RetailCo Analytics',role:'Lead Data Analyst',
    description:`The retention team asks: "Of customers who first ordered in each month, what percentage placed a second order in subsequent months?" This is a cohort retention matrix — the most sophisticated and valuable customer analytics pattern, requiring datetime manipulation, multi-level groupby, and unstack().`
  },
  objectives:[
    'Build a cohort analysis from transaction data',
    'Calculate cohort sizes and retention counts',
    'Create a retention rate matrix using unstack()',
    'Interpret cohort retention for business decisions'
  ],
  terminology:[
    {term:'Cohort',lang:'python',definition:'A group of customers sharing a common start event at the same time (first order month). Each cohort is tracked over subsequent periods.',},
    {term:'Retention Rate',lang:'python',definition:'The percentage of a cohort still active (ordering) in a given period after their first period.',},
    {term:'.unstack()',lang:'python',definition:'Pivots the innermost index level into columns — transforms a multi-index Series/DataFrame into a crosstab matrix.',example:'df.groupby(["cohort","period"]).size().unstack()'},
    {term:'Period Number',lang:'python',definition:'The number of months/periods after a customer\'s cohort month. Period 0 = their first month; Period 1 = one month later.',},
    {term:'Retention Matrix',lang:'python',definition:'A table where rows are cohorts and columns are period numbers. Values are retention rates showing what % of the cohort returned each period.'}
  ],
  theory:`<h3>The Retention Matrix — The Most Valuable Analytics Output</h3>
<p>A retention matrix answers: "Are customers coming back?" Each row is a cohort (customers who started in a given month). Each column is a period (0 = their first month, 1 = one month later, etc.). Values are the % of that cohort still active.</p>
<p>Diagonal reading (cohort rows across columns) shows lifecycle: are cohorts healthy? Is retention improving over time (newer cohorts retaining better = product improving)?</p>
<h3>The Algorithm</h3>
<ol><li>Find each customer's first order month (their cohort)</li><li>Calculate the period number for each subsequent order</li><li>Aggregate: count unique customers per cohort per period</li><li>Pivot and divide by cohort size to get rates</li></ol>`,
  steps:[
    {step:1,title:'Assign Cohorts and Period Numbers',
     explanation:`For each order, determine: which cohort does the customer belong to (month of first order)? What period is this order in?`,
     code:`import pandas as pd\n\norders = pd.DataFrame({\n    'customer_id': [1,1,1,2,2,3,3,3,4,4,5],\n    'order_date':  ['2023-01-05','2023-02-10','2023-04-15',\n                     '2023-01-12','2023-02-20',\n                     '2023-02-08','2023-03-15','2023-04-22',\n                     '2023-03-10','2023-05-18',\n                     '2023-04-25']\n})\n\norders['order_date'] = pd.to_datetime(orders['order_date'])\norders['order_month'] = orders['order_date'].dt.to_period('M')\n\n# First order month per customer = their cohort\ncohort_map = orders.groupby('customer_id')['order_month'].min()\ncohort_map.name = 'cohort_month'\n\norders = orders.merge(cohort_map, on='customer_id')\norders['period'] = (orders['order_month'] - orders['cohort_month']).apply(lambda x: x.n)\n\nprint(orders[['customer_id','order_date','cohort_month','order_month','period']]\n      .sort_values(['cohort_month','customer_id','period']).to_string(index=False))`,
     simulatedOutput:{type:'text',content:` customer_id order_date cohort_month order_month  period\n           1 2023-01-05      2023-01     2023-01       0\n           1 2023-02-10      2023-01     2023-02       1\n           1 2023-04-15      2023-01     2023-04       3\n           2 2023-01-12      2023-01     2023-01       0\n           2 2023-02-20      2023-01     2023-02       1\n           3 2023-02-08      2023-02     2023-02       0\n           3 2023-03-15      2023-02     2023-03       1\n           3 2023-04-22      2023-02     2023-04       2\n           4 2023-03-10      2023-03     2023-03       0\n           4 2023-05-18      2023-03     2023-05       2\n           5 2023-04-25      2023-04     2023-04       0`},
     after:'Each order has a cohort_month (when this customer first ordered) and a period (how many months later this order is).'},
    {step:2,title:'Build the Retention Matrix',
     explanation:`Pivot the data: count unique customers per cohort per period, then calculate retention rates.`,
     code:`# Count unique customers per cohort per period\ncohort_data = orders.groupby(['cohort_month','period'])['customer_id'].nunique()\n\n# Unstack period into columns\ncohort_matrix = cohort_data.unstack(level='period').fillna(0)\nprint("Cohort size matrix (customers):")\nprint(cohort_matrix.astype(int))\n\n# Cohort sizes for rate calculation\ncohort_sizes = cohort_matrix[0]\n\n# Retention rates\nretention = cohort_matrix.divide(cohort_sizes, axis=0) * 100\nretention = retention.round(1)\nprint("\\nRetention Rate Matrix (%):")\nprint(retention)`,
     simulatedOutput:{type:'text',content:`Cohort size matrix (customers):\nperiod        0  1  2  3\ncohort_month            \n2023-01       2  2  0  1\n2023-02       1  1  1  0\n2023-03       1  0  1  0\n2023-04       1  0  0  0\n\nRetention Rate Matrix (%):\nperiod         0      1      2      3\ncohort_month                        \n2023-01    100.0  100.0    0.0   50.0\n2023-02    100.0  100.0  100.0    0.0\n2023-03    100.0    0.0  100.0    0.0\n2023-04    100.0    0.0    0.0    0.0`},
     after:'Period 0 is always 100% (everyone orders in their first month). Period 1 shows who came back the next month. The matrix reveals retention patterns.'},
    {step:3,title:'Interpret the Matrix',
     explanation:`Add cohort size, format output, and derive business insights from the retention data.`,
     code:`print("\\n=== Executive Cohort Summary ===\\n")\nfor cohort in cohort_matrix.index:\n    size = int(cohort_sizes[cohort])\n    p1_ret = retention.loc[cohort, 1] if 1 in retention.columns else 0\n    print(f"Cohort {cohort}: Size={size}, Month-1 Retention={p1_ret:.0f}%")\n\nif 1 in retention.columns:\n    avg_m1 = retention[1].mean()\n    print(f"\\nAvg Month-1 Retention: {avg_m1:.1f}%")\n    print("Interpretation: Of customers who placed their FIRST order,")\n    print(f"an average of {avg_m1:.0f}% returned for a second order the following month.")`,
     simulatedOutput:{type:'text',content:`=== Executive Cohort Summary ===\n\nCohort 2023-01: Size=2, Month-1 Retention=100.0%\nCohort 2023-02: Size=1, Month-1 Retention=100.0%\nCohort 2023-03: Size=1, Month-1 Retention=0.0%\nCohort 2023-04: Size=1, Month-1 Retention=0.0%\n\nAvg Month-1 Retention: 50.0%\nInterpretation: Of customers who placed their FIRST order,\nan average of 50% returned for a second order the following month.`},
     after:'Month-1 retention is the most critical metric for e-commerce. In this small sample, Jan and Feb cohorts returned; Mar and Apr cohorts haven\'t yet.'}
  ],
  challenge:{
    title:'Cohort Size Trend',
    description:`Using the orders data from this lesson, answer: (1) How large was each cohort? (2) Which cohort had the highest month-1 retention? (3) What is the average retention rate at period 1 across all cohorts? Print your answers in a clear format.`,
    hint:`cohort_sizes gives cohort sizes. retention[1] gives period 1 rates. .idxmax() finds the best cohort. .mean() gives the average.`,
    starterCode:`# Use cohort_sizes and retention from the lesson above\n# (run the lesson steps first, then answer these questions)\n\n# 1. Cohort sizes\nprint("=== Cohort Sizes ===")\nprint(cohort_sizes.astype(int))\n\n# 2. Best month-1 retention cohort\nif 1 in retention.columns:\n    best_cohort = retention[1].idxmax()\n    best_rate = retention[1].max()\n    print(f"\\nBest Month-1 Retention: {best_cohort} ({best_rate:.1f}%)")\n\n# 3. Average period-1 retention\nif 1 in retention.columns:\n    avg_p1 = retention[1].mean()\n    print(f"\\nAverage Period-1 Retention: {avg_p1:.1f}%")`,
    solution:`# Cohort sizes\nprint("=== Cohort Sizes ===")\nprint(cohort_sizes.astype(int))\n\nif 1 in retention.columns:\n    best_cohort = retention[1].idxmax()\n    best_rate   = retention[1].max()\n    print(f"\\nBest Month-1 Retention: {best_cohort} ({best_rate:.1f}%)")\n    avg_p1 = retention[1].mean()\n    print(f"Average Period-1 Retention: {avg_p1:.1f}%")\n    print(f"Insight: On average, {avg_p1:.0f}% of new customers return for a second order.")`,
    explanation:`cohort_sizes is a Series indexed by cohort month. retention[1] extracts column 1 (period 1 rates). idxmax() finds the index of the maximum value. .mean() averages across cohorts.`,
    successMessage:`Cohort analysis complete! This is the most sophisticated standard analysis in e-commerce and SaaS — you can now build it from scratch in Python.`
  },
  insight:`Retention cohort analysis is the #1 tool for subscription businesses (Netflix, Spotify) and e-commerce (Amazon, Shopify stores). Low month-1 retention means your product isn't sticky; improving cohort curves is worth more than acquiring new customers.`
}

,

/* ── INTERMEDIATE 4 ───────────────────────────────────── */
{
  id:'py-inter-4', language:'python', level:'intermediate', order:4,
  title:'Data Visualization — matplotlib & seaborn',
  duration:'25 min', xp:160,
  scenario:{
    company:'RetailCo Analytics', role:'Data Analyst',
    description:`Your weekly report currently lands in the CFO's inbox as a wall of numbers. She asks you to "make it visual." You'll use matplotlib for full control and seaborn for statistical plots — producing charts that could go straight into a board presentation.`
  },
  objectives:[
    'Create bar, line, and scatter charts with matplotlib',
    'Make publication-quality figures with seaborn',
    'Customize titles, labels, and color palettes',
    'Export figures to PNG for reports and emails'
  ],
  terminology:[
    {term:'matplotlib',lang:'python',definition:'The foundational Python plotting library. Every other viz tool (seaborn, pandas .plot()) builds on it.',example:'import matplotlib.pyplot as plt'},
    {term:'seaborn',lang:'python',definition:'A statistical visualization library built on matplotlib. Produces attractive figures with minimal code and integrates directly with DataFrames.',example:'import seaborn as sns'},
    {term:'Figure / Axes',lang:'python',definition:'Figure = the overall canvas. Axes = individual plot panel. One Figure can hold multiple Axes (subplots).',example:'fig, ax = plt.subplots()\nax.bar(x, y)'},
    {term:'plt.show()',lang:'python',definition:'Renders and displays the current figure. In a script, call once after all customization. In Jupyter, often automatic.',example:'plt.show()'},
    {term:'savefig()',lang:'python',definition:'Saves the figure to a file. dpi controls resolution — 150 for screen, 300 for print.',example:"fig.savefig('chart.png', dpi=150, bbox_inches='tight')"},
    {term:'hue=',lang:'python',definition:'seaborn parameter that assigns colors by a categorical column, automatically adding a legend.',example:"sns.barplot(data=df, x='dept', y='salary', hue='level')"}
  ],
  theory:`<h3>matplotlib vs seaborn — When to Use Which</h3>
<p><strong>matplotlib</strong> gives you pixel-level control but requires verbose code. <strong>seaborn</strong> wraps matplotlib for statistical chart types (bar, box, violin, scatter with regression) and produces prettier defaults in a few lines. In practice: use seaborn for exploration and standard charts, drop to matplotlib when you need precise customization.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Always import both: <code>import matplotlib.pyplot as plt</code> and <code>import seaborn as sns</code>. Set a theme once with <code>sns.set_theme(style="whitegrid")</code> for clean, boardroom-ready charts.</div></div>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>fig, ax = plt.subplots(figsize=(10, 6))<br>snss.barplot(data=df, x='dept', y='revenue', ax=ax)<br>ax.set_title('Revenue by Department')<br>plt.tight_layout()<br>plt.show()</code></div></div>`,
  steps:[
    {step:1, title:'Bar Chart with matplotlib',
     explanation:`Create a department revenue bar chart — the most common chart in business analytics.`,
     code:`import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame({
    'department': ['Sales','Marketing','IT','Finance','Operations'],
    'revenue':    [4.2, 1.8, 0.9, 0.6, 2.1],
    'headcount':  [24,  12,  18,  8,   15]
})

fig, ax = plt.subplots(figsize=(9, 5))

bars = ax.bar(df['department'], df['revenue'],
              color=['#2563eb','#7c3aed','#059669','#d97706','#dc2626'])

ax.set_title('Annual Revenue by Department ($M)', fontsize=14, fontweight='bold', pad=12)
ax.set_xlabel('Department')
ax.set_ylabel('Revenue ($M)')
ax.set_ylim(0, 5)

# Add value labels on each bar
for bar in bars:
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.05,
            f'\${bar.get_height():.1f}M', ha='center', va='bottom', fontsize=10)

plt.tight_layout()
plt.savefig('dept_revenue.png', dpi=150, bbox_inches='tight')
plt.show()
print("Chart saved to dept_revenue.png")`,
     simulatedOutput:{type:'text', content:`[Bar chart rendered: 5 bars showing department revenue]\nSales: $4.2M  Marketing: $1.8M  IT: $0.9M  Finance: $0.6M  Operations: $2.1M\n\nChart saved to dept_revenue.png`},
     note:'figsize=(width, height) is in inches. bbox_inches="tight" prevents labels from being clipped when saving.',
     after:'You have a publication-ready bar chart with labeled bars, a bold title, and png output suitable for email attachments.'},
    {step:2, title:'Line Chart for Time Trends',
     explanation:`Plot monthly revenue trend with seaborn — perfect for time series in executive dashboards.`,
     code:`import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

sns.set_theme(style="whitegrid")

monthly = pd.DataFrame({
    'month':   ['Jan','Feb','Mar','Apr','May','Jun',
                 'Jul','Aug','Sep','Oct','Nov','Dec'],
    'revenue': [3.1, 3.4, 3.8, 4.0, 4.2, 4.5,
                 4.3, 4.7, 5.1, 4.9, 5.3, 5.8],
    'target':  [3.5]*12
})

fig, ax = plt.subplots(figsize=(11, 5))

sns.lineplot(data=monthly, x='month', y='revenue',
             marker='o', linewidth=2.5, color='#2563eb',
             label='Actual Revenue', ax=ax)

ax.plot(monthly['month'], monthly['target'],
        '--', color='#dc2626', linewidth=1.5, label='Target')

ax.fill_between(range(len(monthly)), monthly['revenue'],
                monthly['target'],
                where=(monthly['revenue'] >= monthly['target']),
                alpha=0.1, color='green', label='Above Target')

ax.set_title('Monthly Revenue vs Target (FY 2024)', fontsize=14, fontweight='bold')
ax.set_xlabel('Month')
ax.set_ylabel('Revenue ($M)')
ax.legend()
plt.tight_layout()
plt.show()`,
     simulatedOutput:{type:'text', content:`[Line chart rendered]\nActual Revenue line: upward trend from $3.1M (Jan) to $5.8M (Dec)\nTarget line: flat at $3.5M throughout year\nGreen shaded area: months Apr–Dec where actual > target\n\nKPI: Revenue exceeded target in 9 of 12 months (+120% target attainment in Dec)`},
     note:'fill_between shades areas between two series — visually shows above/below target periods instantly.',
     after:'A trend chart that\'s immediately readable: one glance shows the strong second-half performance and consistent target beat.'},
    {step:3, title:'Scatter Plot and Subplots',
     explanation:`Use subplots to show multiple charts on one figure — essential for dashboard-style reporting.`,
     code:`import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'experience_yrs': np.random.randint(1, 20, 50),
    'salary':         np.random.randint(45000, 150000, 50),
    'department':     np.random.choice(['Sales','IT','Marketing','Finance'], 50),
    'performance':    np.random.randint(60, 100, 50)
})

fig, axes = plt.subplots(1, 2, figsize=(13, 5))
fig.suptitle('Employee Analytics Dashboard', fontsize=15, fontweight='bold')

# Left: scatter plot
sns.scatterplot(data=df, x='experience_yrs', y='salary',
                hue='department', size='performance',
                sizes=(40, 200), ax=axes[0], alpha=0.8)
axes[0].set_title('Salary vs Experience by Department')
axes[0].set_xlabel('Years of Experience')
axes[0].set_ylabel('Annual Salary ($)')

# Right: box plot
sns.boxplot(data=df, x='department', y='salary',
            palette='Set2', ax=axes[1])
axes[1].set_title('Salary Distribution by Department')
axes[1].set_xlabel('Department')
axes[1].set_ylabel('Annual Salary ($)')
axes[1].tick_params(axis='x', rotation=15)

plt.tight_layout()
plt.show()`,
     simulatedOutput:{type:'text', content:`[Two-panel dashboard rendered]\n\nLeft panel (scatter): 50 data points colored by department\n  IT employees: higher salaries at lower experience (top-left cluster)\n  Sales: wider spread, experience correlates with salary\n  Point size = performance score\n\nRight panel (box plot):\n  IT median: ~$105K  |  Finance median: ~$98K\n  Sales median: ~$87K  |  Marketing median: ~$82K\n  IT shows tightest distribution; Sales has highest variance`},
     after:'A two-panel dashboard in one figure. hue= adds color by category, size= scales point size by numeric value — both add information without adding complexity.'}
  ],
  challenge:{
    title:'Sales Performance Dashboard',
    description:`Create a 2-panel figure: (1) a horizontal bar chart of total sales by region (use barh), (2) a line chart showing monthly trend for the top region. Use a whitegrid theme and bold titles on both panels.`,
    hint:`plt.subplots(1,2), ax.barh() for horizontal bars, filter df by top region for the line chart.`,
    starterCode:`import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

sns.set_theme(style="whitegrid")

regional = pd.DataFrame({
    'region':  ['East','West','North','South','Central'],
    'total':   [5.2, 4.8, 3.1, 2.9, 4.0]
})

monthly_east = pd.DataFrame({
    'month':   ['Q1','Q2','Q3','Q4'],
    'revenue': [1.1, 1.3, 1.4, 1.4]
})

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.suptitle('Sales Performance Dashboard', fontsize=14, fontweight='bold')

# Panel 1: Horizontal bar chart by region
# YOUR CODE HERE

# Panel 2: Quarterly trend for East (top region)
# YOUR CODE HERE

plt.tight_layout()
plt.show()`,
    solution:`import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

sns.set_theme(style="whitegrid")

regional = pd.DataFrame({
    'region':  ['East','West','North','South','Central'],
    'total':   [5.2, 4.8, 3.1, 2.9, 4.0]
})
monthly_east = pd.DataFrame({
    'month':   ['Q1','Q2','Q3','Q4'],
    'revenue': [1.1, 1.3, 1.4, 1.4]
})

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
fig.suptitle('Sales Performance Dashboard', fontsize=14, fontweight='bold')

regional_sorted = regional.sort_values('total')
axes[0].barh(regional_sorted['region'], regional_sorted['total'], color='#2563eb')
axes[0].set_title('Total Sales by Region ($M)', fontweight='bold')
axes[0].set_xlabel('Revenue ($M)')

sns.lineplot(data=monthly_east, x='month', y='revenue',
             marker='o', color='#059669', ax=axes[1])
axes[1].set_title('East Region — Quarterly Trend ($M)', fontweight='bold')
axes[1].set_ylabel('Revenue ($M)')

plt.tight_layout()
plt.show()`,
    explanation:`sort_values() before barh() puts the longest bar at the top. Sorting before a horizontal bar chart is almost always the right choice — it immediately shows the ranking.`,
    successMessage:`Dashboard built! You can now turn any DataFrame into a polished, multi-panel visual in minutes.`
  },
  insight:`matplotlib and seaborn are used in ~85% of Python data teams. Learning to produce boardroom-quality visuals in code means your analysis is reproducible and version-controlled — unlike Excel charts. seaborn's hue= parameter alone can replace a pivot table + chart combo.`
},

/* ── INTERMEDIATE 5 ───────────────────────────────────── */
{
  id:'py-inter-5', language:'python', level:'intermediate', order:5,
  title:'Reshaping Data — melt(), stack() & crosstab()',
  duration:'22 min', xp:150,
  scenario:{
    company:'RetailCo Analytics', role:'Data Analyst',
    description:`Your BI tool expects long-format data; the CSV you received is wide (one column per quarter). Your manager needs a cross-tabulation of region vs. product category by count. You'll master melt() to flip wide-to-long, and pd.crosstab() to build frequency matrices — two of the most practical data reshaping operations in an analyst's toolkit.`
  },
  objectives:[
    'Use pd.melt() to convert wide format to long format',
    'Use pivot_table() to go long-to-wide',
    'Build cross-tabulation tables with pd.crosstab()',
    'Normalize crosstabs to percentages'
  ],
  terminology:[
    {term:'Wide Format',lang:'python',definition:'Each variable has its own column. Easy for humans to read; awkward for groupby/visualization code.',example:'Q1_revenue | Q2_revenue | Q3_revenue  (3 columns)'},
    {term:'Long Format',lang:'python',definition:'Each row is one observation. Required by seaborn, ggplot2, and most BI tools.',example:'quarter | revenue  (rows: Q1→val, Q2→val, Q3→val)'},
    {term:'pd.melt()',lang:'python',definition:'Converts wide format to long format by "melting" specified columns into rows.',example:"pd.melt(df, id_vars=['name'], value_vars=['Q1','Q2'], var_name='quarter', value_name='revenue')"},
    {term:'pd.crosstab()',lang:'python',definition:'Computes a frequency/count table of two categorical Series. Equivalent to SQL GROUP BY two columns.',example:"pd.crosstab(df['region'], df['category'])"},
    {term:'normalize=',lang:'python',definition:'In crosstab, normalize="index" gives row percentages, normalize="columns" gives column percentages, normalize=True gives grand total %.',example:"pd.crosstab(index, col, normalize='index')"}
  ],
  theory:`<h3>Wide vs Long — The Format That Determines Everything</h3>
<p>Most raw data arrives in <strong>wide format</strong> (a column per period/metric) because it's human-readable in Excel. But Python visualization and analysis functions expect <strong>long format</strong> (a row per observation). <code>melt()</code> is the bridge.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code># Wide → Long\npd.melt(df, id_vars=['product'],\n&nbsp;&nbsp;value_vars=['Jan','Feb','Mar'],\n&nbsp;&nbsp;var_name='month', value_name='sales')</code></div></div>
<p><code>pd.crosstab()</code> is essentially a two-dimensional GROUP BY — instantly showing how observations are distributed across two categorical dimensions.</p>`,
  steps:[
    {step:1, title:'melt() — Wide to Long',
     explanation:`A quarterly sales report arrives as a wide DataFrame. Melt it to long format for further analysis.`,
     code:`import pandas as pd

# Typical wide-format report (straight from Excel)
wide = pd.DataFrame({
    'product':    ['Laptop','Mouse','Monitor','Keyboard'],
    'Q1_sales':   [320, 850, 215, 480],
    'Q2_sales':   [380, 920, 260, 530],
    'Q3_sales':   [410, 870, 290, 560],
    'Q4_sales':   [450, 1050, 310, 620]
})
print("Wide format:")
print(wide)
print()

# Melt to long format
long = pd.melt(
    wide,
    id_vars=['product'],
    value_vars=['Q1_sales','Q2_sales','Q3_sales','Q4_sales'],
    var_name='quarter',
    value_name='units_sold'
)

# Clean up quarter names
long['quarter'] = long['quarter'].str.replace('_sales', '')
long = long.sort_values(['product','quarter']).reset_index(drop=True)

print("Long format (16 rows = 4 products × 4 quarters):")
print(long.head(8))`,
     simulatedOutput:{type:'text', content:`Wide format:\n   product  Q1_sales  Q2_sales  Q3_sales  Q4_sales\n0   Laptop       320       380       410       450\n1    Mouse       850       920       870      1050\n2  Monitor       215       260       290       310\n3 Keyboard       480       530       560       620\n\nLong format (16 rows = 4 products × 4 quarters):\n    product quarter  units_sold\n0  Keyboard      Q1         480\n1  Keyboard      Q2         530\n2  Keyboard      Q3         560\n3  Keyboard      Q4         620\n4    Laptop      Q1         320\n5    Laptop      Q2         380\n6    Laptop      Q3         410\n7    Laptop      Q4         450`},
     note:'id_vars = columns to keep as-is. value_vars = columns to melt into rows. Now you can groupby("quarter") or plot a seaborn lineplot with hue="product".',
     after:'16 rows instead of 4. Every BI tool, seaborn plot, and groupby call will now work correctly on this data.'},
    {step:2, title:'Long Back to Wide with pivot_table()',
     explanation:`Go in the reverse direction: reshape long format into a crosstab-style report with products as rows and quarters as columns.`,
     code:`# Reverse: long → wide summary
wide_again = long.pivot_table(
    index='product',
    columns='quarter',
    values='units_sold',
    aggfunc='sum'
).astype(int)

# Add a total column
wide_again['Total'] = wide_again.sum(axis=1)
wide_again = wide_again.sort_values('Total', ascending=False)

print("Pivot: products × quarters (units sold)")
print(wide_again)
print()

# YoY growth Q1 → Q4
wide_again['Q1_to_Q4_growth_%'] = (
    (wide_again['Q4'] - wide_again['Q1']) / wide_again['Q1'] * 100
).round(1)
print(wide_again[['Q1','Q4','Total','Q1_to_Q4_growth_%']])`,
     simulatedOutput:{type:'text', content:`Pivot: products × quarters (units sold)\nquarter   Q1   Q2   Q3    Q4  Total\nproduct                              \nMouse     850  920  870  1050   3690\nKeyboard  480  530  560   620   2190\nLaptop    320  380  410   450   1560\nMonitor   215  260  290   310   1075\n\n          Q1   Q4  Total  Q1_to_Q4_growth_%\nMouse    850  1050   3690               23.5\nKeyboard 480   620   2190               29.2\nLaptop   320   450   1560               40.6\nMonitor  215   310   1075               44.2`},
     after:'A management-ready summary table. Laptops and Monitors showed the highest growth despite lower volume — a key insight hidden in the raw data.'},
    {step:3, title:'pd.crosstab() — Frequency Matrix',
     explanation:`Build a cross-tabulation of region vs. category showing both counts and row percentages.`,
     code:`import pandas as pd
import numpy as np

np.random.seed(7)
orders = pd.DataFrame({
    'region':   np.random.choice(['East','West','North','South'], 200),
    'category': np.random.choice(['Electronics','Clothing','Food','Books'], 200),
    'amount':   np.random.uniform(10, 500, 200).round(2)
})

# Count cross-tab
ct_count = pd.crosstab(orders['region'], orders['category'],
                        margins=True, margins_name='Total')
print("Order Count by Region × Category:")
print(ct_count)
print()

# Row-normalised (% of each region's orders per category)
ct_pct = pd.crosstab(orders['region'], orders['category'],
                      normalize='index').mul(100).round(1)
print("Row % (how each region splits across categories):")
print(ct_pct)`,
     simulatedOutput:{type:'text', content:`Order Count by Region × Category:\ncategory  Books  Clothing  Electronics  Food  Total\nregion                                              \nEast         11        15           12    15     53\nNorth        11        12           14    12     49\nSouth        14        12           11    12     49\nWest         12        11           12    14     49\nTotal        48        50           49    53    200\n\nRow % (how each region splits across categories):\ncategory  Books  Clothing  Electronics  Food\nregion                                      \nEast       20.8      28.3         22.6  28.3\nNorth      22.4      24.5         28.6  24.5\nSouth      28.6      24.5         22.4  24.5\nWest       24.5      22.4         24.5  28.6`},
     after:'The row % view reveals regional mix preferences. North has the highest Electronics share (28.6%); South leans toward Books (28.6%). These are insights for regional marketing strategy.'}
  ],
  challenge:{
    title:'Annual Employee Survey Reshape',
    description:`A survey dataset has one column per year (2021, 2022, 2023) for satisfaction scores. Melt it to long format. Then: (1) find the average score per department per year, (2) pivot back to a wide table showing departments as rows and years as columns.`,
    hint:`pd.melt(id_vars=['employee_id','department'], value_vars=['2021','2022','2023'], var_name='year', value_name='score'), then groupby+pivot_table.`,
    starterCode:`import pandas as pd

survey = pd.DataFrame({
    'employee_id': range(1,11),
    'department':  ['Sales','Sales','IT','IT','Marketing','Marketing','Finance','Finance','Sales','IT'],
    '2021':        [7, 8, 9, 6, 8, 7, 9, 8, 6, 9],
    '2022':        [8, 7, 8, 7, 9, 8, 8, 9, 7, 8],
    '2023':        [9, 9, 9, 8, 9, 9, 9, 9, 8, 9]
})

# Step 1: Melt to long format
long_survey = pd.melt(
    # YOUR CODE HERE
)

# Step 2: Average score per department per year
avg_scores = long_survey.groupby(    )['score'].mean().round(2).reset_index()
print("Average satisfaction scores:")
print(avg_scores)

# Step 3: Pivot to wide table (departments as rows, years as columns)
pivot_scores = avg_scores.pivot_table(   )
print("\nPivot table:")
print(pivot_scores)`,
    solution:`import pandas as pd

survey = pd.DataFrame({
    'employee_id': range(1,11),
    'department':  ['Sales','Sales','IT','IT','Marketing','Marketing','Finance','Finance','Sales','IT'],
    '2021':        [7, 8, 9, 6, 8, 7, 9, 8, 6, 9],
    '2022':        [8, 7, 8, 7, 9, 8, 8, 9, 7, 8],
    '2023':        [9, 9, 9, 8, 9, 9, 9, 9, 8, 9]
})

long_survey = pd.melt(
    survey,
    id_vars=['employee_id','department'],
    value_vars=['2021','2022','2023'],
    var_name='year',
    value_name='score'
)

avg_scores = long_survey.groupby(['department','year'])['score'].mean().round(2).reset_index()
print("Average satisfaction scores:")
print(avg_scores)

pivot_scores = avg_scores.pivot_table(
    index='department', columns='year', values='score'
)
print("\nPivot table:")
print(pivot_scores)`,
    explanation:`melt() unpacks the year columns into rows. groupby(['department','year']) calculates per-cell averages. pivot_table() then reshapes back — but now with aggregated values instead of raw scores.`,
    successMessage:`Data reshaping mastered! melt + groupby + pivot_table is a complete transformation pipeline that handles 90% of real-world report generation.`
  },
  insight:`Data reshaping is where junior analysts lose hours and senior analysts spend minutes. melt() and pivot_table() are the pandas equivalents of unpivot and pivot in SQL/Power Query. Every BI tool, visualization library, and statistical model expects your data in a specific shape — knowing how to move between formats instantly is one of the highest-leverage skills in analytics.`
},

/* ── ADVANCED 4 ───────────────────────────────────── */
{
  id:'py-adv-4', language:'python', level:'advanced', order:4,
  title:'Machine Learning Foundations — sklearn Classification',
  duration:'35 min', xp:200,
  scenario:{
    company:'RetailCo Analytics', role:'Senior Data Analyst',
    description:`The finance team wants to predict which customers are likely to churn next quarter so the retention team can intervene proactively. You'll build a classification model using scikit-learn — the standard Python ML library — clean the features, train a Random Forest, evaluate performance, and score the customer base to produce a priority call list.`
  },
  objectives:[
    'Prepare features and target with train/test split',
    'Train a Random Forest classifier with sklearn',
    'Evaluate with confusion matrix, accuracy, and classification report',
    'Extract feature importance to explain the model'
  ],
  terminology:[
    {term:'scikit-learn (sklearn)',lang:'python',definition:'The standard Python machine learning library. Consistent API: fit(), predict(), score() across all model types.',example:'from sklearn.ensemble import RandomForestClassifier'},
    {term:'train_test_split',lang:'python',definition:'Splits data into training (model learns) and test (model is evaluated) sets. test_size=0.2 holds out 20% for testing.',example:'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)'},
    {term:'Feature Matrix (X)',lang:'python',definition:'The input DataFrame — all columns used to predict. Rows are observations; columns are features (predictors).',example:'X = df[["age","tenure","purchases","avg_spend"]]'},
    {term:'Target Vector (y)',lang:'python',definition:'The column you are predicting — 1 column of labels (0=retained, 1=churned).',example:'y = df["churned"]'},
    {term:'Confusion Matrix',lang:'python',definition:'A 2×2 table: True Positives, True Negatives, False Positives, False Negatives. Shows where the model makes errors.',example:'[[TN, FP], [FN, TP]]'},
    {term:'Feature Importance',lang:'python',definition:'Scores showing how much each feature contributed to the model\'s predictions. Helps explain and audit the model.',example:'rf.feature_importances_  # array of scores summing to 1'}
  ],
  theory:`<h3>The sklearn API — Always the Same Pattern</h3>
<ol><li>Import a model class</li><li><code>model.fit(X_train, y_train)</code> — train</li><li><code>model.predict(X_test)</code> — predict on new data</li><li><code>model.score(X_test, y_test)</code> — evaluate</li></ol>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Random Forest is the best first model to try for classification: it handles mixed data types, rarely overfits with default settings, requires minimal preprocessing, and provides feature importance for explainability.</div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Accuracy alone is misleading</strong> on imbalanced datasets. If 90% of customers don't churn, a model predicting "never churn" gets 90% accuracy but is useless. Always look at precision, recall, and F1 for each class.</div></div>`,
  steps:[
    {step:1, title:'Prepare Features and Split Data',
     explanation:`Build a realistic customer churn dataset, select features, handle any missing values, and split into train/test sets.`,
     code:`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 500

df = pd.DataFrame({
    'customer_id':    range(1, n+1),
    'tenure_months':  np.random.randint(1, 72, n),
    'monthly_spend':  np.random.uniform(20, 300, n).round(2),
    'num_products':   np.random.randint(1, 6, n),
    'support_calls':  np.random.randint(0, 15, n),
    'last_login_days':np.random.randint(0, 180, n),
    'nps_score':      np.random.randint(0, 11, n),
})

# Churn is more likely for low tenure, high support calls, low NPS
churn_prob = (
    (df['tenure_months'] < 12).astype(int) * 0.3 +
    (df['support_calls'] > 8).astype(int) * 0.3 +
    (df['nps_score'] < 4).astype(int) * 0.25 +
    (df['last_login_days'] > 90).astype(int) * 0.15
)
df['churned'] = (churn_prob + np.random.uniform(-0.1, 0.1, n) > 0.4).astype(int)

print(f"Dataset: {len(df)} customers  |  Churn rate: {df['churned'].mean():.1%}")

FEATURES = ['tenure_months','monthly_spend','num_products',
            'support_calls','last_login_days','nps_score']
X = df[FEATURES]
y = df['churned']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

print(f"Train: {len(X_train)} rows  |  Test: {len(X_test)} rows")
print(f"Train churn rate: {y_train.mean():.1%}  |  Test churn rate: {y_test.mean():.1%}")`,
     simulatedOutput:{type:'text', content:`Dataset: 500 customers  |  Churn rate: 32.4%\nTrain: 400 rows  |  Test: 100 rows\nTrain churn rate: 32.5%  |  Test churn rate: 32.0%`},
     note:'stratify=y preserves the churn ratio in both train and test sets. Without it, you might get lucky/unlucky splits that skew results.',
     after:'Clean train/test split with matching churn rates. The model will learn on 400 customers and be evaluated on 100 it has never seen.'},
    {step:2, title:'Train and Evaluate the Model',
     explanation:`Train a Random Forest classifier and evaluate it with a confusion matrix and classification report.`,
     code:`from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (confusion_matrix, classification_report,
                              accuracy_score, roc_auc_score)

rf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)

y_pred = rf.predict(X_test)
y_prob = rf.predict_proba(X_test)[:, 1]  # probability of churn

print(f"Accuracy:  {accuracy_score(y_test, y_pred):.3f}")
print(f"AUC-ROC:   {roc_auc_score(y_test, y_prob):.3f}")
print()

cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(f"              Predicted: No  Predicted: Yes")
print(f"Actual: No    {cm[0,0]:>12}  {cm[0,1]:>13}")
print(f"Actual: Yes   {cm[1,0]:>12}  {cm[1,1]:>13}")
print()
print("Classification Report:")
print(classification_report(y_test, y_pred,
      target_names=['Retained','Churned']))`,
     simulatedOutput:{type:'text', content:`Accuracy:  0.870\nAUC-ROC:   0.921\n\nConfusion Matrix:\n              Predicted: No  Predicted: Yes\nActual: No          62              6\nActual: Yes          7             25\n\nClassification Report:\n              precision  recall  f1-score  support\n  Retained       0.90    0.91      0.90       68\n   Churned       0.81    0.78      0.79       32\n  accuracy                         0.87      100\n macro avg       0.85    0.85      0.85      100`},
     note:'AUC-ROC of 0.92 is excellent. Recall for Churned = 0.78 means we catch 78% of actual churners. Improving recall (catching more real churners) is usually the business goal.',
     after:'6 customers we predicted would stay but actually churned (False Negatives) — these are missed intervention opportunities. 7 predicted to churn who stayed (False Positives) — unnecessary reach-out cost.'},
    {step:3, title:'Feature Importance and Scoring New Customers',
     explanation:`Understand which features drive the model, then score all customers with churn probabilities to build a priority call list.`,
     code:`import pandas as pd

# Feature importance
importance_df = pd.DataFrame({
    'feature':   FEATURES,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)

print("Feature Importance (contribution to model decisions):")
for _, row in importance_df.iterrows():
    bar = '█' * int(row['importance'] * 40)
    print(f"  {row['feature']:20} {row['importance']:.3f}  {bar}")

# Score all active (non-churned) customers
active_customers = df[df['churned'] == 0].copy()
active_customers['churn_probability'] = rf.predict_proba(
    active_customers[FEATURES])[:, 1].round(3)

priority_list = (active_customers
    .sort_values('churn_probability', ascending=False)
    [['customer_id','tenure_months','support_calls',
      'nps_score','churn_probability']]
    .head(10))

print(f"\nTop 10 At-Risk Customers (priority retention call list):")
print(priority_list.to_string(index=False))`,
     simulatedOutput:{type:'text', content:`Feature Importance (contribution to model decisions):\n  support_calls        0.241  █████████\n  nps_score            0.217  ████████\n  last_login_days      0.189  ███████\n  tenure_months        0.168  ██████\n  monthly_spend        0.107  ████\n  num_products         0.078  ███\n\nTop 10 At-Risk Customers (priority retention call list):\n customer_id  tenure_months  support_calls  nps_score  churn_probability\n         147              4             12          2             0.892\n         312              7             11          1             0.871\n          89              3             13          3             0.858\n         456              6             10          2             0.847\n         203              9             11          2             0.839\n          71              5             12          4             0.821\n         388              8             10          1             0.815\n         175              4             13          2             0.809\n         291              6             11          3             0.798\n          52             11              9          2             0.784`},
     after:'Support calls and NPS score are the strongest churn predictors. Customer 147 — 4 months tenure, 12 support calls, NPS of 2 — has an 89.2% churn probability. Call them first.'}
  ],
  challenge:{
    title:'Retrain with Threshold Tuning',
    description:`The retention team says they can only call 20 customers per week. Using the model above, find the churn probability threshold that maximizes the number of true churners caught within a 20-customer budget. Print: the threshold, how many customers are flagged, and the precision and recall at that threshold.`,
    hint:`Sort customers by churn_probability descending. Take top 20. Check how many are actual churners. Compute precision = true_churners/20, recall = true_churners/total_churners.`,
    starterCode:`# Use X_test, y_test, y_prob from the steps above

import pandas as pd

results = pd.DataFrame({
    'actual':      y_test.values,
    'churn_prob':  y_prob
}).sort_values('churn_prob', ascending=False).reset_index(drop=True)

BUDGET = 20  # can only act on 20 customers

# Top-20 by probability
top20 = results.head(BUDGET)

# YOUR CODE: calculate threshold, precision, recall
threshold = 
true_churners_caught = 
total_actual_churners = 

precision = 
recall    = 

print(f"Threshold (prob of #20 customer): {threshold:.3f}")
print(f"True churners in top {BUDGET}: {true_churners_caught}")
print(f"Precision at budget: {precision:.1%}")
print(f"Recall at budget:    {recall:.1%}")`,
    solution:`import pandas as pd

results = pd.DataFrame({
    'actual':     y_test.values,
    'churn_prob': y_prob
}).sort_values('churn_prob', ascending=False).reset_index(drop=True)

BUDGET = 20
top20 = results.head(BUDGET)

threshold            = top20['churn_prob'].iloc[-1]
true_churners_caught = top20['actual'].sum()
total_actual_churners = results['actual'].sum()

precision = true_churners_caught / BUDGET
recall    = true_churners_caught / total_actual_churners

print(f"Threshold (prob of #20 customer): {threshold:.3f}")
print(f"True churners in top {BUDGET}: {true_churners_caught}")
print(f"Precision at budget: {precision:.1%}")
print(f"Recall at budget:    {recall:.1%}")`,
    explanation:`Sorting by probability descending and slicing by budget is "top-k precision" — the real business metric for prioritized outreach. Most churn prevention campaigns run at a fixed budget, not a fixed threshold.`,
    successMessage:`Model evaluation with business constraints mastered! Threshold tuning is the bridge between ML metrics and real operational decisions.`
  },
  insight:`Random Forest classifiers are the #1 most-used model in corporate analytics because they require minimal preprocessing, handle mixed data types, are hard to overfit, and provide feature importance for business explainability. sklearn's consistent API (fit → predict → score) means learning one model teaches you the interface for the entire library's 40+ models.`
},

/* ── ADVANCED 5 ───────────────────────────────────── */
{
  id:'py-adv-5', language:'python', level:'advanced', order:5,
  title:'Automated Reporting Pipeline — pandas + Jinja2',
  duration:'30 min', xp:200,
  scenario:{
    company:'RetailCo Analytics', role:'Senior Data Analyst',
    description:`Every Monday you spend 2 hours copying numbers from a pandas report into a PowerPoint template. Your manager asks if it can be automated. You'll build a templated HTML report generator using pandas and Jinja2 — so any analyst can run one script and produce a formatted, stakeholder-ready HTML report populated with live data.`
  },
  objectives:[
    'Build reusable analysis functions that return DataFrames',
    'Use pandas Styler to add conditional formatting to tables',
    'Use Jinja2 templates to inject data into HTML',
    'Write a single-command report generation script'
  ],
  terminology:[
    {term:'Jinja2',lang:'python',definition:'A Python templating engine. Write HTML with {{ variable }} placeholders, then render() with a dict to produce filled-in HTML.',example:"Template('Hello {{ name }}!').render(name='Alice')"},
    {term:'pandas Styler',lang:'python',definition:'Adds CSS styling to a DataFrame rendered as HTML. Supports color gradients, conditional formatting, number formatting.',example:"df.style.background_gradient(cmap='Blues').to_html()"},
    {term:'highlight_max()',lang:'python',definition:'Highlights the maximum value in each column or row with a background color.',example:"df.style.highlight_max(color='#d4edda')"},
    {term:'format()',lang:'python',definition:'In Styler, applies number formatting to columns — currency, percentages, decimal places.',example:"df.style.format({'revenue': '\${:,.0f}', 'pct': '{:.1%}'})"},
    {term:'Template.render()',lang:'python',definition:'Populates a Jinja2 template string with variables from a dict, returning the finished HTML string.',example:"html = template.render(title='Q4 Report', tables=tables_dict)"}
  ],
  theory:`<h3>Why Automated Reports Beat Manual Copy-Paste</h3>
<ul><li><strong>Reproducible:</strong> run the same script next week — same structure, new data</li><li><strong>Error-free:</strong> no manual transposition mistakes</li><li><strong>Versioned:</strong> templates and logic live in git</li><li><strong>Fast delivery:</strong> seconds instead of hours</li></ul>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Pipeline: Load data → Transform → Style → Inject into template → Write HTML file</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Jinja2 is installed with Flask and many other packages. If not available: <code>pip install jinja2</code>. It's also used in dbt — learning it here gives you a head start on dbt macros.</div></div>`,
  steps:[
    {step:1, title:'Build the Analysis Functions',
     explanation:`Write modular functions that each return a clean DataFrame — the raw material for the report.`,
     code:`import pandas as pd
import numpy as np

np.random.seed(99)

# Simulate source data
df = pd.DataFrame({
    'region':    np.random.choice(['East','West','North','South'], 200),
    'category':  np.random.choice(['Electronics','Clothing','Food'], 200),
    'revenue':   np.random.uniform(100, 5000, 200).round(2),
    'units':     np.random.randint(1, 50, 200),
    'month':     np.random.choice(['Jan','Feb','Mar'], 200)
})

def revenue_by_region(data):
    return (data.groupby('region')['revenue']
            .agg(total_revenue='sum', avg_order='mean', orders='count')
            .round(2)
            .sort_values('total_revenue', ascending=False)
            .reset_index())

def category_summary(data):
    return (data.groupby('category')
            .agg(revenue=('revenue','sum'),
                 units=('units','sum'))
            .round(2)
            .assign(revenue_per_unit=lambda x: (x.revenue/x.units).round(2))
            .sort_values('revenue', ascending=False)
            .reset_index())

regional = revenue_by_region(df)
cats     = category_summary(df)

print("Regional Summary:")
print(regional)
print("\nCategory Summary:")
print(cats)`,
     simulatedOutput:{type:'dataframe', headers:['region','total_revenue','avg_order','orders'], rows:[['East',74213.45,1484.27,50],['West',72105.82,1442.12,50],['North',65891.33,1317.83,50],['South',58340.19,1166.80,50]]},
     note:'Each function takes a DataFrame as input — making them testable and reusable across reports.',
     after:'Two clean summary DataFrames, each answering one business question. The report will present both.'},
    {step:2, title:'Style the Tables with pandas Styler',
     explanation:`Apply conditional formatting — green/red highlights, currency formatting — to make numbers scannable at a glance.`,
     code:`def style_regional(df):
    return (df.style
            .format({'total_revenue': '\${:,.0f}',
                     'avg_order':     '\${:,.0f}',
                     'orders':        '{:,}'})
            .background_gradient(subset=['total_revenue'],
                                  cmap='Blues')
            .highlight_max(subset=['total_revenue'],
                            color='#d4f0d4')
            .highlight_min(subset=['total_revenue'],
                            color='#f8d7da')
            .set_table_attributes('class="report-table"')
            .hide(axis='index'))

def style_category(df):
    return (df.style
            .format({'revenue': '\${:,.0f}',
                     'units':   '{:,}',
                     'revenue_per_unit': '\${:,.2f}'})
            .bar(subset=['revenue'], color='#4a90d9')
            .set_table_attributes('class="report-table"')
            .hide(axis='index'))

# Render styled tables to HTML strings
regional_html  = style_regional(regional).to_html()
category_html  = style_category(cats).to_html()

print("Styled HTML tables generated.")
print(f"Regional table HTML: {len(regional_html):,} characters")
print(f"Category table HTML: {len(category_html):,} characters")`,
     simulatedOutput:{type:'text', content:`Styled HTML tables generated.\nRegional table HTML: 4,218 characters\nCategory table HTML: 2,891 characters\n\nRegional table features:\n  ✓ Revenue formatted as currency ($74,213)\n  ✓ Highest revenue row highlighted green\n  ✓ Lowest revenue row highlighted red\n  ✓ Blue gradient intensity tracks revenue level\n\nCategory table features:\n  ✓ Revenue bars show proportional size visually\n  ✓ Consistent currency and comma formatting`},
     note:'to_html() converts the styled DataFrame to a self-contained HTML table string — ready to inject into a template.',
     after:'Two HTML table strings with embedded CSS styling. The numbers are formatted, the top/bottom performers are color-coded.'},
    {step:3, title:'Inject Into a Jinja2 Template',
     explanation:`Write an HTML template with {{ placeholders }}, render it with the data, and write the finished report to a file.`,
     code:`from jinja2 import Template
from datetime import date

TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>{{ title }}</title>
  <style>
    body { font-family: Inter, Arial, sans-serif; max-width: 900px;
           margin: 40px auto; color: #1e293b; }
    h1   { color: #1d4ed8; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    h2   { color: #475569; margin-top: 32px; }
    .report-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .report-table td, .report-table th { padding: 8px 12px; border: 1px solid #e2e8f0; }
    .report-table thead { background: #f1f5f9; font-weight: 600; }
    .meta { color: #94a3b8; font-size: 13px; margin-bottom: 24px; }
    .kpi  { display: flex; gap: 24px; margin: 20px 0; }
    .kpi-card { background: #f8fafc; border-radius: 8px; padding: 16px 24px;
                border-left: 4px solid #2563eb; }
    .kpi-val  { font-size: 28px; font-weight: 700; color: #1d4ed8; }
    .kpi-label{ font-size: 13px; color: #64748b; margin-top: 4px; }
  </style>
</head>
<body>
  <h1>{{ title }}</h1>
  <p class="meta">Generated: {{ report_date }} &nbsp;|&nbsp; Period: {{ period }}</p>
  <div class="kpi">
    <div class="kpi-card">
      <div class="kpi-val">{{ total_revenue }}</div>
      <div class="kpi-label">Total Revenue</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">{{ total_orders }}</div>
      <div class="kpi-label">Total Orders</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-val">{{ top_region }}</div>
      <div class="kpi-label">Top Region</div>
    </div>
  </div>
  <h2>Revenue by Region</h2>
  {{ regional_table }}
  <h2>Category Performance</h2>
  {{ category_table }}
</body>
</html>
"""

html = Template(TEMPLATE).render(
    title        = 'Quarterly Sales Report — Q1 2025',
    report_date  = date.today().strftime('%B %d, %Y'),
    period       = 'January – March 2025',
    total_revenue= f"\${df['revenue'].sum():,.0f}",
    total_orders = f"{len(df):,}",
    top_region   = regional.iloc[0]['region'],
    regional_table = regional_html,
    category_table = category_html
)

with open('q1_report.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Report written: q1_report.html ({len(html):,} bytes)")
print(f"Open in browser to view the formatted report.")`,
     simulatedOutput:{type:'text', content:`Report written: q1_report.html (12,847 bytes)\nOpen in browser to view the formatted report.\n\n=== Report Contents ===\nTitle:        Quarterly Sales Report — Q1 2025\nGenerated:    May 04, 2026\nPeriod:       January – March 2025\n\nKPI Cards:\n  Total Revenue:  $270,550\n  Total Orders:   200\n  Top Region:     East\n\nTables included:\n  ✓ Revenue by Region (4 rows, styled with gradient + highlights)\n  ✓ Category Performance (3 rows, styled with bar chart column)\n\nOutput: q1_report.html — open in any browser or email as attachment`},
     after:'A complete, formatted HTML report built entirely from code. Change the data source, run the script — the report updates automatically every time.'}
  ],
  challenge:{
    title:'Add a Month-over-Month Section',
    description:`Extend the report: (1) calculate total revenue for each of the 3 months in the dataset, (2) compute MoM growth % (Feb vs Jan, Mar vs Feb), (3) style the MoM table with green for positive growth and red for negative, and (4) add it to the Jinja2 template between the KPI cards and the regional table.`,
    hint:`groupby('month')['revenue'].sum(), pct_change(), applymap() or Styler.applymap(color_growth, subset=['mom_growth'])`,
    starterCode:`import pandas as pd

# Month order fix
month_order = {'Jan':1,'Feb':2,'Mar':3}
monthly = (df.groupby('month')['revenue'].sum()
            .reset_index()
            .assign(sort_key=lambda x: x['month'].map(month_order))
            .sort_values('sort_key')
            .drop(columns='sort_key'))

# YOUR CODE: add mom_growth column (% change from previous month)
monthly['mom_growth'] = 

def color_growth(val):
    color = 'background-color: #d4edda' if val > 0 else 'background-color: #f8d7da'
    return color if pd.notna(val) else ''

# Style the table
monthly_styled = (monthly.style
    .format({'revenue': '\${:,.0f}', 'mom_growth': lambda v: f'{v:+.1f}%' if pd.notna(v) else '—'})
    # YOUR CODE: apply color_growth to mom_growth column
    .hide(axis='index')
    .to_html())

print(monthly_styled[:500])  # preview first 500 chars of HTML`,
    solution:`import pandas as pd

month_order = {'Jan':1,'Feb':2,'Mar':3}
monthly = (df.groupby('month')['revenue'].sum()
            .reset_index()
            .assign(sort_key=lambda x: x['month'].map(month_order))
            .sort_values('sort_key')
            .drop(columns='sort_key'))

monthly['mom_growth'] = monthly['revenue'].pct_change() * 100

def color_growth(val):
    if pd.isna(val): return ''
    return 'background-color: #d4edda' if val > 0 else 'background-color: #f8d7da'

monthly_styled = (monthly.style
    .format({'revenue': '\${:,.0f}',
             'mom_growth': lambda v: f'{v:+.1f}%' if pd.notna(v) else '—'})
    .applymap(color_growth, subset=['mom_growth'])
    .hide(axis='index')
    .to_html())

print(monthly_styled[:500])`,
    explanation:`pct_change() calculates month-over-month growth in one line — it divides each value by the previous row. applymap() applies a function cell-by-cell within the subset column, returning CSS strings that Styler embeds as inline styles.`,
    successMessage:`Automated report with MoM analysis complete! You now have a reusable pipeline that any analyst on your team can run in seconds to produce a boardroom-ready HTML report.`
  },
  insight:`Automated reporting pipelines save analysts 4–8 hours per week. pandas + Jinja2 is the Python-native stack — no BI tool license required, works anywhere Python runs, and the output is email-friendly HTML. The same Jinja2 templating is used in dbt for SQL models and macros — cross-skill knowledge transfer.`
}

]; // end PYTHON_LESSONS
