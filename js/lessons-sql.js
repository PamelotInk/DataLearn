/* =========================================================
   lessons-sql.js  — 15 SQL lessons across 3 levels
   ========================================================= */

const SQL_LESSONS = [

/* ═══════════════════════════════════════════════
   BASIC – Lessons 1-5
   ═══════════════════════════════════════════════ */
{
  id:'sql-basic-1', language:'sql', level:'basic', order:1,
  title:'Your First Query — SELECT & FROM',
  duration:'15 min', xp:100,
  scenario:{
    company:'TechRetail Inc.',role:'Junior Data Analyst',
    description:`It's your first week as a Junior Data Analyst at TechRetail Inc. Your manager stops by your desk: "Can you pull all our customer records from the database? The marketing team needs a list for the Q2 campaign." You open your SQL client and stare at the database. Time to write your first query.`
  },
  objectives:[
    'Write a SQL SELECT statement to retrieve data',
    'Understand the role of the FROM clause',
    'Know when to use SELECT * vs. specific columns',
    'Rename output columns with aliases using AS'
  ],
  terminology:[
    {term:'SQL',lang:'sql',definition:'Structured Query Language — the standard language for interacting with relational databases. Pronounced "sequel" or S-Q-L.',example:'SELECT name FROM customers;'},
    {term:'SELECT',lang:'sql',definition:'The command that tells the database WHAT columns to return. Think of it as "Show me…"',example:'SELECT first_name, salary FROM employees;'},
    {term:'FROM',lang:'sql',definition:'Specifies WHICH table to read data from. Always paired with SELECT.',example:'SELECT * FROM products;'},
    {term:'Table',lang:'sql',definition:'A structured grid of data — rows and columns — similar to a spreadsheet. Stores one type of entity (customers, orders, etc.).'},
    {term:'Column / Field',lang:'sql',definition:'A vertical attribute in a table representing a specific data type (e.g., "salary", "email", "hire_date").'},
    {term:'Row / Record',lang:'sql',definition:'A horizontal entry in a table representing one instance (e.g., one customer, one order).'},
    {term:'Alias (AS)',lang:'sql',definition:'A temporary label for a column in your query results — makes output readable for stakeholders.',example:'SELECT first_name AS "First Name" FROM employees;'},
    {term:'Wildcard (*)',lang:'sql',definition:'Used in SELECT * to mean "return all columns". Great for exploration, but avoid in production code on large tables.',example:'SELECT * FROM customers; -- all columns'}
  ],
  theory:`<h3>Why SQL Is the Analyst's Most Used Tool</h3>
<p>Almost every company — retail, healthcare, finance, tech — stores data in relational databases. SQL is how you talk to those databases. Before you can visualize, model, or report anything, you need to get the data — and that's SQL's job.</p>
<h3>The Two-Part SELECT Statement</h3>
<p>Every data retrieval query has at minimum two clauses:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>SELECT column1, column2 &nbsp;&nbsp;-- WHAT to show<br>FROM table_name;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- WHERE to get it</code></div></div>
<p>Read it like a sentence: <em>"Show me first_name and salary FROM the employees table."</em></p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Convention:</strong> SQL keywords (SELECT, FROM, WHERE) are written in UPPERCASE for readability. SQL itself is case-insensitive, but this convention is used everywhere.</div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Analyst Warning:</strong> <code>SELECT *</code> on a table with millions of rows and dozens of columns is slow and wasteful. Always specify the columns you actually need once you move past exploration.</div></div>`,
  steps:[
    {step:1,title:'Retrieve All Data',
     explanation:`Let's start with the simplest possible query — get <em>everything</em> from one table. The asterisk <code>*</code> is a wildcard meaning "all columns". Run it and explore the result.`,
     code:`SELECT *\nFROM customers;`,
     note:'The semicolon (;) terminates the statement. Most SQL tools require it.',
     after:'You can see all 20 customer records with every column. Great for exploring an unfamiliar table.'},
    {step:2,title:'Select Specific Columns',
     explanation:`The marketing team only needs names, city, and customer segment — not emails or internal IDs. List column names separated by commas.`,
     code:`SELECT first_name, last_name, city, state, segment\nFROM customers;`,
     note:'Order matters — columns display in the order you list them.',
     after:'Now you return only 5 columns. This is faster and focuses on what the business actually needs.'},
    {step:3,title:'Add Column Aliases',
     explanation:`When presenting results to non-technical stakeholders, column names like <code>first_name</code> look raw. Use <code>AS</code> to rename them in the output.`,
     code:`SELECT\n    first_name  AS "First Name",\n    last_name   AS "Last Name",\n    city        AS "City",\n    segment     AS "Customer Tier"\nFROM customers;`,
     note:'Wrap aliases containing spaces in double quotes. The underlying table is unchanged.',
     after:'Output headers are now business-friendly. This is standard practice when preparing results for reports or Excel exports.'}
  ],
  challenge:{
    title:'Pull Employee Info for Quarterly Review',
    description:`Your manager messages you: "I need a list of all employees — their full name, department, job title, and salary — for the Q3 performance review. Can you pull that from the database?"`,
    hint:`The table name is <code>employees</code>. You need: <code>first_name</code>, <code>last_name</code>, <code>department</code>, <code>job_title</code>, <code>salary</code>`,
    starterCode:`-- Write your query below\nSELECT\n\nFROM ;`,
    solution:`SELECT\n    first_name  AS "First Name",\n    last_name   AS "Last Name",\n    department  AS "Department",\n    job_title   AS "Job Title",\n    salary      AS "Salary"\nFROM employees;`,
    explanation:`We select the five requested columns from the <code>employees</code> table and alias them for clean, readable output. The ORDER of columns in SELECT determines their display order.`,
    keywords:['employees','first_name','last_name','department'],
    successMessage:`You returned all 15 employees with clean column headers. Your manager can now import this directly into the review spreadsheet.`
  },
  insight:`At companies like Amazon, Walmart, and JPMorgan, analysts run hundreds of SELECT queries per day. This two-line pattern is the absolute foundation — every complex analytical query you'll ever write starts here.`
},

{
  id:'sql-basic-2', language:'sql', level:'basic', order:2,
  title:'Filtering Data — The WHERE Clause',
  duration:'20 min', xp:120,
  scenario:{
    company:'TechRetail Inc.',role:'Data Analyst',
    description:`The Sales Director emails you: "I only need to see Premium customers from California. Can you filter the customer list?" Instead of exporting everything and filtering in Excel, you'll do the filtering right in SQL — faster, more accurate, and repeatable.`
  },
  objectives:[
    'Use WHERE to filter rows based on conditions',
    'Apply comparison operators (=, >, <, >=, <=, !=)',
    'Combine filters with AND and OR',
    'Use BETWEEN, IN, and LIKE for flexible filtering'
  ],
  terminology:[
    {term:'WHERE',lang:'sql',definition:'Filters rows BEFORE they are returned. Only rows matching the condition are included.',example:"SELECT * FROM employees WHERE department = 'Sales';"},
    {term:'Comparison Operators',lang:'sql',definition:'Symbols used to compare values: = (equals), != (not equals), > (greater than), < (less than), >= (greater or equal), <= (less or equal).'},
    {term:'AND',lang:'sql',definition:'Logical operator that requires ALL conditions to be true for a row to be included.',example:"WHERE department = 'Sales' AND salary > 60000"},
    {term:'OR',lang:'sql',definition:'Logical operator that includes a row if ANY condition is true.',example:"WHERE city = 'New York' OR city = 'Los Angeles'"},
    {term:'BETWEEN',lang:'sql',definition:'Tests if a value falls within an inclusive range. Cleaner than writing >= AND <=.',example:'WHERE salary BETWEEN 50000 AND 80000'},
    {term:'IN',lang:'sql',definition:'Tests if a value matches any value in a list — shorthand for multiple OR conditions.',example:"WHERE state IN ('CA', 'NY', 'TX')"},
    {term:'LIKE',lang:'sql',definition:"Pattern matching for text. % is a wildcard matching any characters; _ matches exactly one character.",example:"WHERE first_name LIKE 'J%'  -- starts with J"},
    {term:'NULL',lang:'sql',definition:"The absence of any value — not zero, not empty string. Use IS NULL or IS NOT NULL to check for it.",example:'WHERE ship_date IS NULL  -- not yet shipped'}
  ],
  theory:`<h3>Filtering: The Key to Useful Queries</h3>
<p>Without WHERE, every query returns the entire table. In the real world, tables have millions of rows — you almost always need to filter. The WHERE clause is placed <em>after</em> FROM and before GROUP BY/ORDER BY.</p>
<h3>Clause Order (so far)</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>SELECT &nbsp;columns<br>FROM &nbsp;&nbsp;&nbsp;table<br>WHERE &nbsp;&nbsp;condition(s);</code></div></div>
<h3>Operator Precedence</h3>
<p>SQL evaluates AND before OR, just like multiplication before addition in math. When combining AND and OR, use parentheses to make your intent explicit:</p>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><code>WHERE department = 'Sales' AND (salary > 70000 OR region = 'East')</code><br>Without parentheses, the meaning changes!</div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Analyst Tip:</strong> Always test your WHERE clause on a small sample first (<code>LIMIT 10</code>) before running on large datasets to confirm it's filtering correctly.</div></div>`,
  steps:[
    {step:1,title:'Filter with a Single Condition',
     explanation:`Find all customers whose segment is 'Premium'. Use the <code>=</code> operator with single quotes around text values.`,
     code:`SELECT first_name, last_name, city, state, segment\nFROM customers\nWHERE segment = 'Premium';`,
     note:"String values need single quotes in SQL. Numbers do not: WHERE salary > 60000",
     after:'7 Premium customers are returned. The WHERE clause filtered out all non-Premium rows before results were sent back.'},
    {step:2,title:'Multiple Conditions with AND',
     explanation:`Sales Director only wants Premium customers from California specifically. Add a second condition with <code>AND</code> — both must be true.`,
     code:`SELECT first_name, last_name, city, state, segment\nFROM customers\nWHERE segment = 'Premium'\n  AND state = 'CA';`,
     after:'Now you get only Premium customers in California. Each additional AND condition narrows the result set.'},
    {step:3,title:'Using IN for Multiple Values',
     explanation:`The team now wants customers from Texas, California, OR New York. You could use OR three times, but <code>IN</code> is cleaner.`,
     code:`SELECT first_name, last_name, city, state, segment\nFROM customers\nWHERE state IN ('TX', 'CA', 'NY')\nORDER BY state, last_name;`,
     note:'IN is equivalent to: WHERE state = "TX" OR state = "CA" OR state = "NY"',
     after:'All customers from those three states appear, sorted by state then last name.'},
    {step:4,title:'Find Records with Missing Values',
     explanation:`Check which orders haven't shipped yet — their <code>ship_date</code> would be NULL. Use <code>IS NULL</code> (never use = NULL).`,
     code:`SELECT order_id, customer_id, order_date, status\nFROM orders\nWHERE ship_date IS NULL;`,
     note:'= NULL always returns no results in SQL. Always use IS NULL or IS NOT NULL.',
     after:'You can see orders that are still Pending or Cancelled — these lack a ship date.'}
  ],
  challenge:{
    title:'Identify High-Value Sales Staff',
    description:`HR is conducting a compensation review. They need a list of all Sales and Marketing employees whose salary is above $65,000. Return their name, department, job title, and salary — sorted by salary descending.`,
    hint:`Filter where department is in ('Sales','Marketing') AND salary > 65000. Then add ORDER BY salary DESC.`,
    starterCode:`-- Filter employees by department and salary\nSELECT\n\nFROM employees\nWHERE\n\nORDER BY ;`,
    solution:`SELECT\n    first_name  AS "First Name",\n    last_name   AS "Last Name",\n    department  AS "Department",\n    job_title   AS "Job Title",\n    salary      AS "Salary"\nFROM employees\nWHERE department IN ('Sales', 'Marketing')\n  AND salary > 65000\nORDER BY salary DESC;`,
    explanation:`We use IN to match two departments, AND to add the salary filter, and ORDER BY salary DESC to show highest earners first.`,
    keywords:['employees','department','salary','WHERE'],
    successMessage:`HR has their list. You filtered from 15 employees down to only those meeting both criteria — all in one clean query.`
  },
  insight:`Data analysts at healthcare companies use WHERE constantly: "show me patients over 65 with diabetes", "find claims over $10,000 from last quarter". WHERE is how you turn a database into a targeted answer.`
},

{
  id:'sql-basic-3', language:'sql', level:'basic', order:3,
  title:'Sorting & Limiting — ORDER BY and LIMIT',
  duration:'15 min', xp:100,
  scenario:{
    company:'TechRetail Inc.',role:'Data Analyst',
    description:`The VP of Sales wants to see "the top 5 best-paid employees" and "the 10 most recently hired staff." Your database has no built-in "top N" button. You'll use ORDER BY to sort results and LIMIT to restrict how many rows are returned.`
  },
  objectives:[
    'Sort results ascending (ASC) and descending (DESC)',
    'Sort by multiple columns',
    'Use LIMIT to return only top N rows',
    'Understand the default sort order'
  ],
  terminology:[
    {term:'ORDER BY',lang:'sql',definition:'Sorts the result set by one or more columns. Default direction is ASC (smallest/earliest first).',example:'ORDER BY salary DESC  -- highest first'},
    {term:'ASC',lang:'sql',definition:'Ascending order: A→Z for text, 0→9 for numbers, oldest→newest for dates. This is the SQL default.',example:'ORDER BY last_name ASC'},
    {term:'DESC',lang:'sql',definition:'Descending order: Z→A, 9→0, newest→oldest.',example:'ORDER BY hire_date DESC  -- most recent first'},
    {term:'LIMIT',lang:'sql',definition:'Restricts the number of rows returned. Placed at the very end of a query.',example:'SELECT * FROM orders LIMIT 10;'},
    {term:'OFFSET',lang:'sql',definition:'Skips a specified number of rows before starting to return results. Used with LIMIT for pagination.',example:'LIMIT 10 OFFSET 10  -- rows 11-20'}
  ],
  theory:`<h3>Why Sort and Limit?</h3>
<p>Raw data has no guaranteed order — databases store rows however is fastest for them. When you need "top performers", "most recent records", or "alphabetical lists", you must explicitly specify the order.</p>
<h3>Full Clause Order So Far</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>SELECT &nbsp;&nbsp;columns<br>FROM &nbsp;&nbsp;&nbsp;&nbsp;table<br>WHERE &nbsp;&nbsp;&nbsp;condition<br>ORDER BY column [ASC|DESC]<br>LIMIT &nbsp;&nbsp;&nbsp;n;</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Performance Tip:</strong> LIMIT is your best friend during exploration. Run <code>SELECT * FROM big_table LIMIT 100</code> to preview data without fetching millions of rows.</div></div>`,
  steps:[
    {step:1,title:'Sort by One Column',
     explanation:`Sort employees from highest to lowest salary. Add <code>ORDER BY salary DESC</code> at the end of your query.`,
     code:`SELECT first_name, last_name, department, salary\nFROM employees\nORDER BY salary DESC;`,
     after:'Robert Davis (CEO, $200k) is at the top, Megan Clark ($63k) at the bottom. Descending means largest first.'},
    {step:2,title:'Get the Top N Rows',
     explanation:`The VP only wants the top 5 earners. Add <code>LIMIT 5</code> after the ORDER BY — SQL first sorts, then cuts.`,
     code:`SELECT first_name, last_name, department, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 5;`,
     note:'LIMIT always applies AFTER ORDER BY — never use LIMIT without ORDER BY if order matters.',
     after:'Only the 5 highest-paid employees appear. This pattern (ORDER BY + LIMIT) is one of the most common in analytics.'},
    {step:3,title:'Sort by Multiple Columns',
     explanation:`Sort employees by department alphabetically, then by salary descending within each department.`,
     code:`SELECT first_name, last_name, department, salary\nFROM employees\nORDER BY department ASC, salary DESC;`,
     after:'Within each department, the highest earner appears first. Multi-column sorting is essential for grouped rankings.'}
  ],
  challenge:{
    title:'Find the 3 Most Recent Big Orders',
    description:`The operations team wants to know the 3 most recent Delivered orders with a total_amount over $500. Return the order_id, customer_id, order_date, and total_amount.`,
    hint:`Filter WHERE status = 'Delivered' AND total_amount > 500, then ORDER BY order_date DESC and LIMIT 3.`,
    starterCode:`SELECT\n\nFROM orders\nWHERE\n\nORDER BY\nLIMIT ;`,
    solution:`SELECT\n    order_id,\n    customer_id,\n    order_date,\n    total_amount\nFROM orders\nWHERE status = 'Delivered'\n  AND total_amount > 500\nORDER BY order_date DESC\nLIMIT 3;`,
    explanation:`WHERE filters to delivered, large orders. ORDER BY order_date DESC puts the most recent first. LIMIT 3 gives only the top 3.`,
    keywords:['orders','status','total_amount','ORDER BY','LIMIT'],
    successMessage:`The operations team has their three most recent big orders. Notice how combining WHERE + ORDER BY + LIMIT answers a very specific business question in one query.`
  },
  insight:`"Show me the top 10 customers by revenue", "find the 5 slowest queries this week", "what are our 3 best-selling products?" — this ORDER BY + LIMIT pattern answers all of these and is used in dashboards, reports, and executive summaries every day.`
},

{
  id:'sql-basic-4', language:'sql', level:'basic', order:4,
  title:'Summarizing Data — GROUP BY & Aggregates',
  duration:'25 min', xp:140,
  scenario:{
    company:'TechRetail Inc.',role:'Data Analyst',
    description:`The Finance team asks: "How many employees are in each department? What's the average salary by department? What's our total headcount?" Instead of counting manually, you'll use GROUP BY with aggregate functions to summarize data — this is one of the most powerful tools in your SQL arsenal.`
  },
  objectives:[
    'Use aggregate functions: COUNT, SUM, AVG, MIN, MAX',
    'Group rows using GROUP BY',
    'Filter groups with HAVING',
    'Understand the difference between WHERE and HAVING'
  ],
  terminology:[
    {term:'Aggregate Function',lang:'sql',definition:'A function that performs a calculation on a set of values and returns a single value.',example:'COUNT(*), SUM(salary), AVG(price), MIN(date), MAX(amount)'},
    {term:'COUNT',lang:'sql',definition:'Counts rows. COUNT(*) counts all rows; COUNT(column) counts non-NULL values in that column.',example:'SELECT COUNT(*) FROM orders;'},
    {term:'SUM',lang:'sql',definition:'Adds up all values in a numeric column.',example:'SELECT SUM(total_amount) FROM orders;'},
    {term:'AVG',lang:'sql',definition:'Calculates the arithmetic mean of a numeric column.',example:'SELECT AVG(salary) FROM employees;'},
    {term:'GROUP BY',lang:'sql',definition:'Divides rows into groups based on a column value. Aggregate functions then calculate per group.',example:'SELECT department, COUNT(*) FROM employees GROUP BY department;'},
    {term:'HAVING',lang:'sql',definition:'Filters GROUPS (after aggregation). Like WHERE, but for aggregated results.',example:'GROUP BY department HAVING COUNT(*) > 2'},
    {term:'MIN / MAX',lang:'sql',definition:'Returns the smallest or largest value in a column.',example:'SELECT MIN(salary), MAX(salary) FROM employees;'}
  ],
  theory:`<h3>From Individual Rows to Summaries</h3>
<p>Most business questions aren't about individual records — they're about groups: "total sales <em>by region</em>", "average order value <em>by month</em>", "count of customers <em>by segment</em>". GROUP BY + aggregates answer all of these.</p>
<h3>How GROUP BY Works</h3>
<p>SQL takes all rows, groups ones with the same value in the GROUP BY column, then applies the aggregate function to each group separately:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Sales department → [58k, 72k, 55k, 57k, 95k] → AVG = 67,400<br>IT department &nbsp;&nbsp;→ [88k, 120k, 85k] → AVG = 97,667</code></div></div>
<h3>WHERE vs. HAVING</h3>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Key distinction:</strong><br>• <code>WHERE</code> filters individual rows BEFORE grouping<br>• <code>HAVING</code> filters groups AFTER aggregation<br>You cannot use aggregate functions in WHERE — use HAVING instead.</div></div>
<h3>Full Clause Order</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>SELECT &nbsp;&nbsp;&nbsp;group_col, AGG(col)<br>FROM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table<br>WHERE &nbsp;&nbsp;&nbsp;&nbsp;row_filter<br>GROUP BY &nbsp;group_col<br>HAVING &nbsp;&nbsp;&nbsp;group_filter<br>ORDER BY &nbsp;...<br>LIMIT &nbsp;&nbsp;&nbsp;&nbsp;n;</code></div></div>`,
  steps:[
    {step:1,title:'Count Rows with COUNT',
     explanation:`How many employees are in each department? Use <code>COUNT(*)</code> with <code>GROUP BY department</code>. The asterisk counts all rows in each group.`,
     code:`SELECT\n    department,\n    COUNT(*) AS employee_count\nFROM employees\nGROUP BY department\nORDER BY employee_count DESC;`,
     after:'Each department gets its own row with a headcount. Sales has the most employees (5).'},
    {step:2,title:'Multiple Aggregates at Once',
     explanation:`One query can calculate many summaries at once. Add AVG, MIN, and MAX alongside COUNT to get a complete picture of salary distribution by department.`,
     code:`SELECT\n    department,\n    COUNT(*)              AS headcount,\n    ROUND(AVG(salary), 0) AS avg_salary,\n    MIN(salary)           AS min_salary,\n    MAX(salary)           AS max_salary\nFROM employees\nGROUP BY department\nORDER BY avg_salary DESC;`,
     note:'ROUND(value, decimal_places) rounds a number. ROUND(AVG(salary), 0) rounds to whole dollars.',
     after:'You can see the salary spread within each department. The Executive avg is skewed by the CEO\'s compensation.'},
    {step:3,title:'Filter Groups with HAVING',
     explanation:`Only show departments where the average salary exceeds $80,000. This is a group-level filter — use <code>HAVING</code>, not WHERE.`,
     code:`SELECT\n    department,\n    COUNT(*)              AS headcount,\n    ROUND(AVG(salary), 0) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 80000\nORDER BY avg_salary DESC;`,
     after:'Only Executive, IT, and Finance appear — the three departments averaging above $80k.'}
  ],
  challenge:{
    title:'Sales Performance Summary by Region',
    description:`The VP of Sales wants a regional performance report. For each region in the sales table, calculate: the total revenue (sum of amount), the number of transactions, and the average transaction value. Only include regions with more than 8 transactions. Sort by total revenue descending.`,
    hint:`GROUP BY region, use SUM(amount), COUNT(*), AVG(amount). Filter groups with HAVING COUNT(*) > 8.`,
    starterCode:`SELECT\n    region,\n    \n    \n    \nFROM sales\nGROUP BY\nHAVING\nORDER BY ;`,
    solution:`SELECT\n    region,\n    ROUND(SUM(amount), 2)  AS total_revenue,\n    COUNT(*)               AS transactions,\n    ROUND(AVG(amount), 2)  AS avg_transaction\nFROM sales\nGROUP BY region\nHAVING COUNT(*) > 8\nORDER BY total_revenue DESC;`,
    explanation:`GROUP BY region creates one row per region. The three aggregates calculate per-region metrics. HAVING filters to regions with enough transactions to be statistically meaningful.`,
    keywords:['sales','GROUP BY','SUM','COUNT','AVG','HAVING'],
    successMessage:`The VP has a clean regional summary. This pattern — GROUP BY + multiple aggregates + HAVING — is the backbone of almost every business summary report.`
  },
  insight:`This pattern powers executive dashboards everywhere. "Total sales by region", "average NPS by product category", "number of tickets by priority" — all GROUP BY questions. Excel pivot tables do the same thing, but SQL does it faster on millions of rows.`
},

{
  id:'sql-basic-5', language:'sql', level:'basic', order:5,
  title:'Combining Tables — INNER JOIN',
  duration:'25 min', xp:150,
  scenario:{
    company:'TechRetail Inc.',role:'Data Analyst',
    description:`The sales report currently only shows employee IDs and customer IDs — not names. Your manager asks: "Can you give me a report that shows the actual employee name, the customer they sold to, the product they sold, and the sale amount?" This data lives across three tables. You need INNER JOIN to combine them.`
  },
  objectives:[
    'Understand relational database design and foreign keys',
    'Write an INNER JOIN to combine two tables',
    'Join three or more tables in a single query',
    'Use table aliases for concise code'
  ],
  terminology:[
    {term:'JOIN',lang:'sql',definition:'Combines rows from two or more tables based on a related column (a key). Fundamental to relational databases.',example:'SELECT * FROM orders JOIN customers ON orders.customer_id = customers.customer_id;'},
    {term:'INNER JOIN',lang:'sql',definition:'Returns only rows where the join condition matches in BOTH tables. Rows without a match in either table are excluded.',example:'FROM sales s INNER JOIN employees e ON s.employee_id = e.employee_id'},
    {term:'Primary Key',lang:'sql',definition:'A column (or combination) that uniquely identifies each row in a table. E.g., customer_id in the customers table.',example:'customer_id INTEGER PRIMARY KEY'},
    {term:'Foreign Key',lang:'sql',definition:'A column in one table that references the primary key of another table, linking the two.',example:'orders.customer_id references customers.customer_id'},
    {term:'ON',lang:'sql',definition:'Specifies the condition that links the two tables. Usually a primary key = foreign key relationship.',example:'JOIN orders ON customers.customer_id = orders.customer_id'},
    {term:'Table Alias',lang:'sql',definition:'A short nickname for a table in a query, making code more concise. Defined with AS or just a space.',example:'FROM employees e  -- e is now an alias for employees'}
  ],
  theory:`<h3>Why Do We Have Multiple Tables?</h3>
<p>Databases store each type of entity in its own table (customers, orders, employees, products). This <em>prevents data duplication</em> — instead of storing "Alice Kim" in thousands of order rows, we store her once in customers and reference her ID. JOIN is how we reconnect this data when we need it together.</p>
<h3>The JOIN Concept</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>sales.employee_id = 1 &nbsp;→ links to→ employees.employee_id = 1<br>Which employee? → Sarah Johnson</code></div></div>
<h3>INNER JOIN: The Most Common Join</h3>
<p>INNER JOIN only returns rows with a matching record in both tables. If a sale has no matching employee, that sale row is excluded. This is almost always what you want.</p>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Always qualify column names</strong> when joining tables. If both tables have a column named "id", write table.id or alias.id to avoid ambiguity.</div></div>`,
  steps:[
    {step:1,title:'Join Two Tables',
     explanation:`Combine the <code>sales</code> and <code>employees</code> tables. Match rows where sales.employee_id equals employees.employee_id.`,
     code:`SELECT\n    s.sale_id,\n    e.first_name  AS employee_first,\n    e.last_name   AS employee_last,\n    s.amount,\n    s.sale_date\nFROM sales s\nINNER JOIN employees e ON s.employee_id = e.employee_id\nORDER BY s.sale_date;`,
     note:'s and e are table aliases — shorthand so you don\'t have to write "sales" and "employees" repeatedly.',
     after:'Now each sale shows the actual employee name instead of just an ID. The join matched employee_id from both tables.'},
    {step:2,title:'Join Three Tables',
     explanation:`Add the customers table to also show who each sale was made to, by joining on customer_id.`,
     code:`SELECT\n    s.sale_id,\n    e.first_name  AS sold_by,\n    c.first_name  AS sold_to,\n    c.city,\n    s.amount,\n    s.sale_date\nFROM sales s\nINNER JOIN employees e ON s.employee_id = e.employee_id\nINNER JOIN customers c ON s.customer_id = c.customer_id\nORDER BY s.amount DESC;`,
     after:'Each row now shows the salesperson and the customer. You chained two JOINs together.'},
    {step:3,title:'Add Products and Aggregate',
     explanation:`Join a fourth table (products) and summarize — total revenue per product category, with product join providing names.`,
     code:`SELECT\n    p.category,\n    COUNT(*)              AS total_sales,\n    ROUND(SUM(s.amount), 2) AS total_revenue\nFROM sales s\nINNER JOIN products p ON s.product_id = p.product_id\nGROUP BY p.category\nORDER BY total_revenue DESC;`,
     after:'Revenue summarized by product category, with clean names instead of IDs. This is a JOIN + GROUP BY pattern used in nearly every business report.'}
  ],
  challenge:{
    title:'Employee Sales Performance Report',
    description:`The Sales Manager wants a performance leaderboard. For each employee in the Sales department specifically, show: their full name, total number of sales transactions, and total revenue generated. Sort by total revenue descending.`,
    hint:`JOIN sales to employees on employee_id. Filter WHERE e.department = 'Sales'. GROUP BY employee name. Use COUNT(*) and SUM(s.amount).`,
    starterCode:`SELECT\n    e.first_name,\n    e.last_name,\n    \n    \nFROM sales s\nINNER JOIN employees e ON\nWHERE\nGROUP BY\nORDER BY ;`,
    solution:`SELECT\n    e.first_name         AS "First Name",\n    e.last_name          AS "Last Name",\n    COUNT(*)             AS "Total Sales",\n    ROUND(SUM(s.amount), 2) AS "Total Revenue"\nFROM sales s\nINNER JOIN employees e ON s.employee_id = e.employee_id\nWHERE e.department = 'Sales'\nGROUP BY e.employee_id, e.first_name, e.last_name\nORDER BY SUM(s.amount) DESC;`,
    explanation:`We JOIN sales to employees to get names, filter to Sales department only with WHERE, then GROUP BY employee to aggregate their performance. Grouping by employee_id ensures uniqueness.`,
    keywords:['sales','employees','INNER JOIN','employee_id','GROUP BY'],
    successMessage:`The Sales Manager has a performance leaderboard. You combined JOIN (to get names) + WHERE (to filter department) + GROUP BY + aggregates (to summarize performance) — all in one query.`
  },
  insight:`At every data-driven company, analysts spend most of their time writing queries that JOIN 3-5+ tables together. Mastering JOINs is the single biggest leap from "SQL beginner" to "SQL analyst".`
},

/* ═══════════════════════════════════════════════
   INTERMEDIATE – Lessons 6-10
   ═══════════════════════════════════════════════ */
{
  id:'sql-inter-1', language:'sql', level:'intermediate', order:1,
  title:'LEFT JOIN — Keeping All Rows from One Table',
  duration:'20 min', xp:150,
  scenario:{
    company:'TechRetail Inc.',role:'Data Analyst',
    description:`Your manager asks: "Which of our customers have never placed an order? We want to target them with a win-back campaign." INNER JOIN only returns customers WHO HAVE orders. LEFT JOIN returns ALL customers — even those with no orders. This is a critical difference.`
  },
  objectives:[
    'Understand the difference between INNER and LEFT JOIN',
    'Use LEFT JOIN to find records with no matching rows',
    'Identify NULL values after a LEFT JOIN',
    'Apply the "find unmatched rows" pattern'
  ],
  terminology:[
    {term:'LEFT JOIN',lang:'sql',definition:'Returns ALL rows from the LEFT table, and matching rows from the RIGHT table. Non-matching right-table rows become NULL.',example:'FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id'},
    {term:'NULL (after JOIN)',lang:'sql',definition:'When a LEFT JOIN finds no match in the right table, all columns from the right table are filled with NULL for that row.'},
    {term:'RIGHT JOIN',lang:'sql',definition:'Mirror of LEFT JOIN — returns all rows from the right table. Rarely used; LEFT JOIN is preferred by convention.'},
    {term:'FULL OUTER JOIN',lang:'sql',definition:'Returns all rows from both tables, with NULLs where there is no match. Not supported in all databases.'},
    {term:'Anti-join pattern',lang:'sql',definition:'Finding rows in table A with NO match in table B. Use LEFT JOIN ... WHERE right_table.id IS NULL.',example:'LEFT JOIN orders o ON c.id=o.customer_id WHERE o.customer_id IS NULL'}
  ],
  theory:`<h3>INNER vs. LEFT JOIN Visualized</h3>
<p>Think of two overlapping circles (a Venn diagram):</p>
<ul><li><strong>INNER JOIN</strong> → only the overlapping center (rows matched in BOTH tables)</li><li><strong>LEFT JOIN</strong> → the entire left circle (all left rows + matched right rows)</li></ul>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>customers table: 20 customers<br>orders table: 24 orders (some customers ordered multiple times)<br><br>INNER JOIN → only the ~15 customers who have at least one order<br>LEFT JOIN  → all 20 customers; those without orders show NULL in order columns</code></div></div>
<h3>The Anti-Join Pattern</h3>
<p>One of the most useful analytical patterns: <strong>"Find all A that have no B."</strong></p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>LEFT JOIN + WHERE right_key IS NULL = "in A but not in B".<br>This finds inactive customers, unassigned leads, orphaned records, etc.</div></div>`,
  steps:[
    {step:1,title:'LEFT JOIN to Include All Customers',
     explanation:`Join customers to orders using LEFT JOIN. Every customer row is kept — even those with no matching orders.`,
     code:`SELECT\n    c.customer_id,\n    c.first_name,\n    c.last_name,\n    o.order_id,\n    o.total_amount\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nORDER BY c.customer_id;`,
     after:'All 20 customers appear. Customers 5, 7, 11, 13, 15, 18, 19 show NULL for order columns — they have no orders.'},
    {step:2,title:'Find Customers with No Orders',
     explanation:`Use the anti-join pattern: after LEFT JOIN, filter WHERE the right table\'s key IS NULL. These are customers with ZERO orders.`,
     code:`SELECT\n    c.customer_id,\n    c.first_name,\n    c.last_name,\n    c.segment,\n    c.city\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.customer_id IS NULL\nORDER BY c.segment;`,
     after:'These customers have never placed an order — perfect targets for the win-back campaign.'},
    {step:3,title:'Count Orders Per Customer',
     explanation:`How many orders has each customer placed? Use LEFT JOIN + COUNT(o.order_id) so that customers with zero orders show 0, not disappear from results.`,
     code:`SELECT\n    c.first_name,\n    c.last_name,\n    c.segment,\n    COUNT(o.order_id) AS order_count,\n    COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id, c.first_name, c.last_name, c.segment\nORDER BY total_spent DESC;`,
     note:'COALESCE(value, default) replaces NULL with a default. COALESCE(SUM(amount), 0) shows 0 instead of NULL for no-order customers.',
     after:'All 20 customers appear with their order counts, including those with 0 orders.'}
  ],
  challenge:{
    title:'Find Products Never Sold',
    description:`The inventory team wants to know which products have never appeared in a sale transaction, so they can consider discontinuing or promoting them. Return the product_id, product_name, category, and unit_price.`,
    hint:`LEFT JOIN products to sales on product_id, then WHERE s.product_id IS NULL.`,
    starterCode:`SELECT\n    p.product_id,\n    p.product_name,\n    p.category,\n    p.unit_price\nFROM products p\nLEFT JOIN\n\nWHERE\nORDER BY p.category;`,
    solution:`SELECT\n    p.product_id,\n    p.product_name,\n    p.category,\n    p.unit_price\nFROM products p\nLEFT JOIN sales s ON p.product_id = s.product_id\nWHERE s.product_id IS NULL\nORDER BY p.category;`,
    explanation:`We start from products (left table, keep all), left join to sales. Products with no matching sale get NULL in s.product_id, which we filter for with IS NULL.`,
    keywords:['products','sales','LEFT JOIN','IS NULL'],
    successMessage:`You found the products with zero sales. The anti-join (LEFT JOIN + IS NULL) is one of the most powerful patterns in SQL analytics.`
  },
  insight:`"Which ads got no clicks?", "Which stores had no sales last month?", "Which accounts have no assigned rep?" — all LEFT JOIN + IS NULL questions. This pattern catches "missing" data that INNER JOIN would silently hide.`
},

{
  id:'sql-inter-2', language:'sql', level:'intermediate', order:2,
  title:'Subqueries — Queries Within Queries',
  duration:'25 min', xp:160,
  scenario:{
    company:'TechRetail Inc.',role:'Data Analyst',
    description:`The Finance team asks: "Which employees earn more than the company average salary?" You know AVG(salary) gives a single number — but you need to use that number in a WHERE clause. The answer is a subquery: a query nested inside another query.`
  },
  objectives:[
    'Write subqueries in the WHERE clause',
    'Use subqueries in the FROM clause (derived tables)',
    'Understand correlated vs. non-correlated subqueries',
    'Know when subqueries vs. JOINs are appropriate'
  ],
  terminology:[
    {term:'Subquery',lang:'sql',definition:'A complete SQL query nested inside another query, enclosed in parentheses. Can appear in SELECT, FROM, or WHERE.',example:'WHERE salary > (SELECT AVG(salary) FROM employees)'},
    {term:'Scalar Subquery',lang:'sql',definition:'A subquery that returns exactly one value (one row, one column). Used in WHERE conditions.',example:'(SELECT AVG(salary) FROM employees)'},
    {term:'Derived Table',lang:'sql',definition:'A subquery used in the FROM clause. SQL treats it like a temporary table. Must be given an alias.',example:'FROM (SELECT dept, AVG(sal) AS avg FROM emp GROUP BY dept) AS dept_avgs'},
    {term:'Correlated Subquery',lang:'sql',definition:'A subquery that references the outer query. Runs once per outer row — can be slow on large datasets.'},
    {term:'IN with Subquery',lang:'sql',definition:'Use a subquery to build the list for an IN condition.',example:'WHERE customer_id IN (SELECT customer_id FROM premium_customers)'}
  ],
  theory:`<h3>When You Need a Subquery</h3>
<p>Subqueries solve problems where you need the result of one query to feed into another — where you can't combine everything into a single flat JOIN.</p>
<h3>Three Places Subqueries Can Live</h3>
<ol>
<li><strong>WHERE</strong> — "Where value > (some calculated number)"</li>
<li><strong>FROM</strong> — "Treat this aggregated result as a table"</li>
<li><strong>SELECT</strong> — "Add a calculated column from another table"</li>
</ol>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Rule of thumb:</strong> Subqueries in WHERE are clear and readable for scalar comparisons. For complex logic, CTEs (next lesson) are often cleaner than deep nested subqueries.</div></div>`,
  steps:[
    {step:1,title:'WHERE Subquery — Compare to Average',
     explanation:`Find all employees who earn more than the company-wide average salary. The subquery calculates the average; the outer query does the comparison.`,
     code:`SELECT\n    first_name,\n    last_name,\n    department,\n    salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees)\nORDER BY salary DESC;`,
     note:'The subquery (SELECT AVG...) runs first and returns one number. The outer query then compares each employee\'s salary to that number.',
     after:'These employees all earn above the $82,333 company average. The subquery dynamically calculates the threshold.'},
    {step:2,title:'IN with Subquery',
     explanation:`Find all sales made to Premium customers. The subquery builds the list of premium customer IDs; the outer query filters sales to those IDs.`,
     code:`SELECT\n    s.sale_id,\n    s.amount,\n    s.sale_date,\n    s.region\nFROM sales s\nWHERE s.customer_id IN (\n    SELECT customer_id\n    FROM customers\n    WHERE segment = 'Premium'\n)\nORDER BY s.amount DESC;`,
     after:'Only sales to Premium customers appear. The subquery returns a list of IDs; IN tests membership.'},
    {step:3,title:'FROM Subquery — Derived Table',
     explanation:`Use a subquery in FROM to first aggregate, then filter the results. Find departments where the max salary exceeds $100,000.`,
     code:`SELECT\n    dept_stats.department,\n    dept_stats.avg_salary,\n    dept_stats.max_salary\nFROM (\n    SELECT\n        department,\n        ROUND(AVG(salary), 0) AS avg_salary,\n        MAX(salary)           AS max_salary\n    FROM employees\n    GROUP BY department\n) AS dept_stats\nWHERE dept_stats.max_salary > 100000\nORDER BY dept_stats.max_salary DESC;`,
     note:'The derived table (the inner query) must be given an alias — here it\'s "dept_stats". You then reference it like any other table.',
     after:'Departments with a $100k+ top earner — note that we couldn\'t use HAVING max_salary > 100000 and also alias it for outer filtering without this approach.'}
  ],
  challenge:{
    title:'Find Above-Average Orders by Region',
    description:`Finance wants to review unusually large orders. Find all orders where the total_amount is above the average order amount for that order's region. Return order_id, customer_id, region, total_amount. Hint: this requires comparing each order's amount to its region's average — a classic derived table problem.`,
    hint:`Build a derived table that calculates AVG(total_amount) per region. Then JOIN that back to orders and compare each order's amount to its region's average.`,
    starterCode:`SELECT\n    o.order_id,\n    o.customer_id,\n    o.region,\n    o.total_amount\nFROM orders o\nINNER JOIN (\n    SELECT region, ROUND(AVG(total_amount), 2) AS region_avg\n    FROM orders\n    GROUP BY region\n) AS rg ON\nWHERE\nORDER BY o.region, o.total_amount DESC;`,
    solution:`SELECT\n    o.order_id,\n    o.customer_id,\n    o.region,\n    o.total_amount,\n    rg.region_avg\nFROM orders o\nINNER JOIN (\n    SELECT region, ROUND(AVG(total_amount), 2) AS region_avg\n    FROM orders\n    GROUP BY region\n) AS rg ON o.region = rg.region\nWHERE o.total_amount > rg.region_avg\nORDER BY o.region, o.total_amount DESC;`,
    explanation:`The subquery calculates average order amount per region. We join it back to the orders table on region, then filter orders above their region's average.`,
    keywords:['orders','AVG','GROUP BY','INNER JOIN','region'],
    successMessage:`You found above-average orders per region using a derived table — a sophisticated pattern that couldn't be done with simple WHERE alone.`
  },
  insight:`Subqueries power some of the most common analytical patterns: "above-average performers", "customers who bought X but not Y", "top N per group". Once you master subqueries, CTE syntax (next lesson) will feel like a natural upgrade.`
},

{
  id:'sql-inter-3', language:'sql', level:'intermediate', order:3,
  title:'CTEs — Common Table Expressions',
  duration:'25 min', xp:160,
  scenario:{
    company:'TechRetail Inc.',role:'Data Analyst',
    description:`You've been building increasingly complex queries, and nested subqueries are getting hard to read. CTEs (WITH clauses) let you define a named, temporary result set at the top of your query — making complex logic readable, maintainable, and reusable. They're one of the most loved features in modern SQL.`
  },
  objectives:[
    'Write a single CTE using the WITH clause',
    'Chain multiple CTEs together',
    'Understand when CTEs are better than subqueries',
    'Read and interpret complex CTE-based queries'
  ],
  terminology:[
    {term:'CTE',lang:'sql',definition:'Common Table Expression — a named temporary result set defined with the WITH keyword. Exists only for the duration of the query.',example:'WITH dept_avg AS (SELECT dept, AVG(sal) FROM emp GROUP BY dept) SELECT ...'},
    {term:'WITH clause',lang:'sql',definition:'The keyword that introduces a CTE. Multiple CTEs are separated by commas.',example:'WITH cte1 AS (...), cte2 AS (...) SELECT ...'},
    {term:'Readability',lang:'sql',definition:'CTEs improve query readability by giving meaningful names to intermediate calculations, making complex queries self-documenting.'},
    {term:'Recursive CTE',lang:'sql',definition:'A special CTE that references itself, used for hierarchical data (org charts, bill of materials). Advanced topic.'}
  ],
  theory:`<h3>Subquery vs. CTE — Same Logic, Better Structure</h3>
<p>A CTE is essentially a named subquery pulled to the top. Both produce the same result, but CTEs are:</p>
<ul><li><strong>More readable</strong> — logic has a meaningful name</li><li><strong>Reusable</strong> — you can reference the same CTE multiple times</li><li><strong>Easier to debug</strong> — test each CTE independently</li><li><strong>Industry standard</strong> — most SQL style guides prefer CTEs for complex logic</li></ul>
<h3>Syntax</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>WITH cte_name AS (<br>&nbsp;&nbsp;SELECT ...<br>)<br>SELECT * FROM cte_name WHERE ...;</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Pro tip:</strong> Name your CTEs descriptively — <code>premium_customers</code>, <code>monthly_sales</code>, <code>top_products</code>. A well-named CTE makes a complex query nearly self-documenting.</div></div>`,
  steps:[
    {step:1,title:'Your First CTE',
     explanation:`Rewrite the "above-average salary" query using a CTE. Define the company average in the WITH clause, then reference it cleanly in the WHERE clause.`,
     code:`WITH company_avg AS (\n    SELECT AVG(salary) AS avg_salary\n    FROM employees\n)\nSELECT\n    e.first_name,\n    e.last_name,\n    e.department,\n    e.salary,\n    ROUND(ca.avg_salary, 0) AS company_avg\nFROM employees e\nCROSS JOIN company_avg ca\nWHERE e.salary > ca.avg_salary\nORDER BY e.salary DESC;`,
     note:'CROSS JOIN with a single-row CTE is a clean way to reference a scalar value many times.',
     after:'Same result as the subquery approach, but the logic is labeled and separated. Much easier to understand and modify.'},
    {step:2,title:'Chaining Multiple CTEs',
     explanation:`Chain two CTEs: first calculate total revenue per employee, then rank the top performers.`,
     code:`WITH employee_revenue AS (\n    SELECT\n        s.employee_id,\n        ROUND(SUM(s.amount), 2) AS total_revenue,\n        COUNT(*) AS sale_count\n    FROM sales s\n    GROUP BY s.employee_id\n),\ntop_performers AS (\n    SELECT\n        e.first_name,\n        e.last_name,\n        er.total_revenue,\n        er.sale_count\n    FROM employee_revenue er\n    INNER JOIN employees e ON er.employee_id = e.employee_id\n    WHERE er.total_revenue > 1000\n)\nSELECT *\nFROM top_performers\nORDER BY total_revenue DESC;`,
     note:'Multiple CTEs are separated by commas. Each CTE can reference previous ones.',
     after:'The query reads like a story: "first calculate revenue per employee, then join to get names, then show top performers". Clean and maintainable.'},
    {step:3,title:'CTE for Complex Business Logic',
     explanation:`Find customer segments that generated above-average revenue per order. Three CTEs: segment revenue → segment order count → segment average → compare.`,
     code:`WITH segment_totals AS (\n    SELECT\n        c.segment,\n        SUM(o.total_amount)  AS segment_revenue,\n        COUNT(o.order_id)    AS order_count\n    FROM customers c\n    INNER JOIN orders o ON c.customer_id = o.customer_id\n    GROUP BY c.segment\n),\noverall_avg AS (\n    SELECT AVG(total_amount) AS global_avg\n    FROM orders\n),\nsegment_performance AS (\n    SELECT\n        st.segment,\n        ROUND(st.segment_revenue, 2) AS revenue,\n        st.order_count,\n        ROUND(st.segment_revenue / st.order_count, 2) AS avg_order_value\n    FROM segment_totals st\n)\nSELECT\n    sp.*,\n    ROUND(oa.global_avg, 2) AS global_avg_order\nFROM segment_performance sp\nCROSS JOIN overall_avg oa\nORDER BY sp.avg_order_value DESC;`,
     after:'A multi-step analysis that would be a deeply nested mess as subqueries, but reads clearly as chained CTEs.'}
  ],
  challenge:{
    title:'Monthly Sales Trend with CTEs',
    description:`The CFO wants a monthly sales summary for 2023. Using CTEs: (1) calculate total revenue per month, (2) calculate the running cumulative revenue. Return month (as YYYY-MM), monthly_revenue, and cumulative_revenue. Hint: SQLite supports strftime() for date formatting.`,
    hint:`CTE 1: GROUP BY strftime('%Y-%m', sale_date). CTE 2 is optional; use SUM() for totals. strftime('%Y-%m', sale_date) extracts year-month from a date.`,
    starterCode:`WITH monthly_totals AS (\n    SELECT\n        strftime('%Y-%m', sale_date) AS month,\n        ROUND(SUM(amount), 2) AS monthly_revenue\n    FROM sales\n    GROUP BY strftime('%Y-%m', sale_date)\n)\nSELECT\n    month,\n    monthly_revenue\nFROM monthly_totals\nORDER BY month;`,
    solution:`WITH monthly_totals AS (\n    SELECT\n        strftime('%Y-%m', sale_date) AS month,\n        ROUND(SUM(amount), 2) AS monthly_revenue\n    FROM sales\n    GROUP BY strftime('%Y-%m', sale_date)\n)\nSELECT\n    month,\n    monthly_revenue\nFROM monthly_totals\nORDER BY month;`,
    explanation:`The CTE groups sales by year-month using strftime(). The outer query selects and orders the result. This pattern cleanly separates the calculation from the final retrieval.`,
    keywords:['WITH','sales','GROUP BY','SUM','strftime','sale_date'],
    successMessage:`You've built a monthly revenue trend using CTEs. This pattern is used in virtually every financial dashboard and reporting system.`
  },
  insight:`At companies like Airbnb, LinkedIn, and Spotify, most production SQL uses CTEs. They make queries auditable, testable, and understandable within the engineering and analytics team — not just by the person who wrote them.`
},

{
  id:'sql-inter-4', language:'sql', level:'intermediate', order:4,
  title:'CASE Statements — Conditional Logic',
  duration:'20 min', xp:140,
  scenario:{
    company:'TechRetail Inc.',role:'Data Analyst',
    description:`The Marketing team wants to classify customers into tiers based on total spending, create a discount flag for high-value orders, and label employees based on salary bands. You can't do this with simple filters — you need conditional logic directly in SQL. That's CASE.`
  },
  objectives:[
    'Write CASE WHEN statements for conditional column values',
    'Use CASE inside GROUP BY for pivot-like summaries',
    'Combine CASE with aggregate functions',
    'Implement business rules in SQL without post-processing'
  ],
  terminology:[
    {term:'CASE',lang:'sql',definition:'SQL\'s conditional expression. Evaluates conditions in order and returns the value of the first matching WHEN clause.',example:"CASE WHEN salary > 100000 THEN 'High' WHEN salary > 70000 THEN 'Mid' ELSE 'Standard' END"},
    {term:'WHEN',lang:'sql',definition:'The condition to evaluate in a CASE expression.',example:"WHEN total_orders > 20 THEN 'VIP'"},
    {term:'THEN',lang:'sql',definition:'The value returned when its WHEN condition is true.',example:"THEN 'Loyal Customer'"},
    {term:'ELSE',lang:'sql',definition:'The default value returned if no WHEN condition matches. If omitted and no WHEN matches, returns NULL.',example:"ELSE 'New Customer'"},
    {term:'END',lang:'sql',definition:'Required keyword that closes a CASE expression.',example:'CASE WHEN ... THEN ... ELSE ... END AS label'}
  ],
  theory:`<h3>CASE: SQL's If-Else</h3>
<p>CASE evaluates conditions top to bottom and returns the first match:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>CASE<br>&nbsp;&nbsp;WHEN condition1 THEN value1<br>&nbsp;&nbsp;WHEN condition2 THEN value2<br>&nbsp;&nbsp;ELSE default_value<br>END AS column_alias</code></div></div>
<h3>Two Flavors of CASE</h3>
<ul><li><strong>Searched CASE</strong> (shown above) — evaluates arbitrary conditions</li>
<li><strong>Simple CASE</strong> — compares one expression to multiple values:<br><code>CASE column WHEN 'A' THEN 'Good' WHEN 'B' THEN 'Okay' END</code></li></ul>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Use cases:</strong> Salary bands, risk tiers, order status labels, A/B test group assignment, custom sorting, conditional aggregates, replacing NULL with default text.</div></div>`,
  steps:[
    {step:1,title:'Classify Employees into Salary Bands',
     explanation:`Label each employee with a compensation tier based on their salary using a CASE expression.`,
     code:`SELECT\n    first_name,\n    last_name,\n    department,\n    salary,\n    CASE\n        WHEN salary >= 100000 THEN 'Senior / Executive'\n        WHEN salary >= 75000  THEN 'Mid-Senior'\n        WHEN salary >= 60000  THEN 'Mid-Level'\n        ELSE                       'Junior'\n    END AS compensation_tier\nFROM employees\nORDER BY salary DESC;`,
     after:'Every employee is labeled. CASE evaluates from top to bottom — the first matching WHEN wins.'},
    {step:2,title:'CASE in GROUP BY — Pivot Summary',
     explanation:`Count how many employees fall into each compensation tier. Use CASE inside COUNT to create a summary grouping.`,
     code:`SELECT\n    CASE\n        WHEN salary >= 100000 THEN 'Senior / Executive'\n        WHEN salary >= 75000  THEN 'Mid-Senior'\n        WHEN salary >= 60000  THEN 'Mid-Level'\n        ELSE                       'Junior'\n    END AS tier,\n    COUNT(*) AS employee_count,\n    ROUND(AVG(salary), 0) AS avg_salary\nFROM employees\nGROUP BY tier\nORDER BY avg_salary DESC;`,
     after:'Each tier group is counted. Grouping on a CASE expression is a powerful way to create custom categorizations.'},
    {step:3,title:'Conditional Aggregation',
     explanation:`Calculate total revenue separately for East and West regions using conditional aggregation — a pivot-like technique without PIVOT syntax.`,
     code:`SELECT\n    strftime('%Y-%m', sale_date)           AS month,\n    ROUND(SUM(CASE WHEN region='East' THEN amount ELSE 0 END), 2) AS east_revenue,\n    ROUND(SUM(CASE WHEN region='West' THEN amount ELSE 0 END), 2) AS west_revenue,\n    ROUND(SUM(amount), 2)                 AS total_revenue\nFROM sales\nGROUP BY strftime('%Y-%m', sale_date)\nORDER BY month;`,
     note:'SUM(CASE WHEN region=\'East\' THEN amount ELSE 0 END) sums amount only for East rows, adds 0 for all others.',
     after:'A crosstab-style report from a single query. This conditional aggregation technique is used constantly in financial and sales reporting.'}
  ],
  challenge:{
    title:'Customer Health Score Report',
    description:`Marketing wants each customer scored: if total_orders >= 20 → 'Champion', 10-19 → 'Loyal', 5-9 → 'Developing', 1-4 → 'At Risk', 0 → 'Inactive'. Return customer name, segment, total_orders, and their score label, sorted by total_orders descending.`,
    hint:`Use CASE WHEN total_orders >= 20 THEN 'Champion' ... END in your SELECT from the customers table.`,
    starterCode:`SELECT\n    first_name,\n    last_name,\n    segment,\n    total_orders,\n    CASE\n        \n        \n        \n        \n        \n    END AS health_score\nFROM customers\nORDER BY total_orders DESC;`,
    solution:`SELECT\n    first_name,\n    last_name,\n    segment,\n    total_orders,\n    CASE\n        WHEN total_orders >= 20 THEN 'Champion'\n        WHEN total_orders >= 10 THEN 'Loyal'\n        WHEN total_orders >= 5  THEN 'Developing'\n        WHEN total_orders >= 1  THEN 'At Risk'\n        ELSE                         'Inactive'\n    END AS health_score\nFROM customers\nORDER BY total_orders DESC;`,
    explanation:`CASE evaluates conditions from top to bottom. Once a condition matches, its THEN value is returned and the rest are skipped. The ELSE catches any remaining cases (0 orders).`,
    keywords:['customers','CASE','WHEN','THEN','total_orders'],
    successMessage:`Customer health scores assigned! Notice how CASE eliminates the need to post-process in Excel — the classification happens right in the database.`
  },
  insight:`CASE statements implement business logic in SQL. At healthcare companies, CASE classifies patients (low/medium/high risk). At banks, it creates credit tiers. At e-commerce companies, it segments customers. Wherever there are business rules, there's CASE.`
},

{
  id:'sql-inter-5', language:'sql', level:'intermediate', order:5,
  title:'Window Functions — Rank, Row Number & Partitions',
  duration:'30 min', xp:180,
  scenario:{
    company:'TechRetail Inc.',role:'Senior Data Analyst',
    description:`The Sales Director asks: "Can you rank each employee within their region by sales revenue? Also show their regional rank alongside their absolute number." Traditional GROUP BY collapses rows into one per group. Window functions add analytical calculations to rows WITHOUT collapsing them — you get the rank AND all the original row data.`
  },
  objectives:[
    'Understand what makes window functions different from GROUP BY',
    'Use ROW_NUMBER(), RANK(), and DENSE_RANK()',
    'Define windows with OVER, PARTITION BY, and ORDER BY',
    'Apply window functions to ranking and segmentation problems'
  ],
  terminology:[
    {term:'Window Function',lang:'sql',definition:'Performs a calculation across a set of rows related to the current row, without collapsing rows like GROUP BY does.',example:'RANK() OVER (PARTITION BY region ORDER BY salary DESC)'},
    {term:'OVER()',lang:'sql',definition:'The keyword that turns an aggregate-like function into a window function. Defines the window of rows to consider.',example:'SUM(amount) OVER (PARTITION BY region)'},
    {term:'PARTITION BY',lang:'sql',definition:'Divides rows into groups (partitions) for the window calculation. Like GROUP BY but without collapsing.',example:'PARTITION BY department  -- separate window per department'},
    {term:'ROW_NUMBER()',lang:'sql',definition:'Assigns a unique sequential number to each row within its partition. No ties — each row gets a unique number.',example:'ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)'},
    {term:'RANK()',lang:'sql',definition:'Like ROW_NUMBER but allows ties. Tied rows get the same rank; the next rank skips (1, 2, 2, 4).',example:'RANK() OVER (ORDER BY revenue DESC)'},
    {term:'DENSE_RANK()',lang:'sql',definition:'Like RANK() but no gaps after ties. Tied rows share rank; next rank increments by 1 (1, 2, 2, 3).',example:'DENSE_RANK() OVER (ORDER BY score DESC)'}
  ],
  theory:`<h3>The Problem Window Functions Solve</h3>
<p>Before window functions, getting "rank within group" required complex self-joins or subqueries. Window functions do this elegantly in one pass.</p>
<h3>The Window Function Pattern</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>function_name() OVER (<br>&nbsp;&nbsp;PARTITION BY group_column&nbsp;&nbsp;-- optional: split into groups<br>&nbsp;&nbsp;ORDER BY sort_column DESC  -- defines order within window<br>)</code></div></div>
<h3>ROW_NUMBER vs RANK vs DENSE_RANK</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Scores: 100, 90, 90, 80<br>ROW_NUMBER: &nbsp;1, 2, 3, 4 &nbsp;(always unique)<br>RANK: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1, 2, 2, 4 &nbsp;(skips after tie)<br>DENSE_RANK: &nbsp;1, 2, 2, 3 &nbsp;(no skip after tie)</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>When to use which:</strong><br>• ROW_NUMBER → de-duplicate, assign sequential IDs<br>• RANK → leaderboards where ties share position<br>• DENSE_RANK → competition rankings without gaps</div></div>`,
  steps:[
    {step:1,title:'Rank All Employees by Salary',
     explanation:`Rank all employees by salary from highest to lowest using RANK(). No PARTITION BY means one window across all rows.`,
     code:`SELECT\n    first_name,\n    last_name,\n    department,\n    salary,\n    RANK() OVER (ORDER BY salary DESC) AS salary_rank\nFROM employees\nORDER BY salary_rank;`,
     after:'Each employee has a salary rank. If two employees had the same salary, they\'d share a rank and the next rank would skip.'},
    {step:2,title:'Rank Within Groups Using PARTITION BY',
     explanation:`Rank employees within their own department. PARTITION BY department creates a separate ranking window for each department.`,
     code:`SELECT\n    first_name,\n    last_name,\n    department,\n    salary,\n    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,\n    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_dense_rank,\n    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num\nFROM employees\nORDER BY department, dept_rank;`,
     after:'Each employee has a rank within their own department. The three ranking functions produce different results — compare them side by side.'},
    {step:3,title:'Filter to Top Performer Per Department',
     explanation:`Combine with a CTE to find the #1 earner in each department. Window functions can\'t be used directly in WHERE, so wrap them in a CTE.`,
     code:`WITH ranked_employees AS (\n    SELECT\n        first_name,\n        last_name,\n        department,\n        salary,\n        ROW_NUMBER() OVER (\n            PARTITION BY department\n            ORDER BY salary DESC\n        ) AS dept_rank\n    FROM employees\n)\nSELECT\n    first_name,\n    last_name,\n    department,\n    salary\nFROM ranked_employees\nWHERE dept_rank = 1\nORDER BY salary DESC;`,
     note:'Window functions must be in a CTE or subquery before you can filter on their results — they can\'t appear in WHERE directly.',
     after:'The highest earner in each department. This "top N per group" pattern is one of the most requested in business analytics.'}
  ],
  challenge:{
    title:'Regional Sales Leaderboard',
    description:`Create a sales leaderboard. For the sales table, calculate each employee's total revenue, then rank them within their region using RANK(). Return employee_id, region, total_revenue, and regional_rank. Only show employees ranked 1 or 2 in their region.`,
    hint:`Step 1 (CTE): GROUP BY employee_id, region to get total revenue. Step 2 (CTE): Apply RANK() OVER (PARTITION BY region ORDER BY total_revenue DESC). Step 3: Filter WHERE regional_rank <= 2.`,
    starterCode:`WITH emp_revenue AS (\n    SELECT\n        employee_id,\n        region,\n        ROUND(SUM(amount), 2) AS total_revenue\n    FROM sales\n    GROUP BY employee_id, region\n),\nranked AS (\n    SELECT\n        employee_id,\n        region,\n        total_revenue,\n        RANK() OVER (PARTITION BY region ORDER BY total_revenue DESC) AS regional_rank\n    FROM emp_revenue\n)\nSELECT *\nFROM ranked\nWHERE\nORDER BY region, regional_rank;`,
    solution:`WITH emp_revenue AS (\n    SELECT\n        employee_id,\n        region,\n        ROUND(SUM(amount), 2) AS total_revenue\n    FROM sales\n    GROUP BY employee_id, region\n),\nranked AS (\n    SELECT\n        employee_id,\n        region,\n        total_revenue,\n        RANK() OVER (PARTITION BY region ORDER BY total_revenue DESC) AS regional_rank\n    FROM emp_revenue\n)\nSELECT *\nFROM ranked\nWHERE regional_rank <= 2\nORDER BY region, regional_rank;`,
    explanation:`The first CTE aggregates revenue per employee per region. The second CTE applies RANK() partitioned by region. The outer query filters to top 2 per region.`,
    keywords:['sales','RANK','OVER','PARTITION BY','GROUP BY'],
    successMessage:`Regional leaderboard built! This CTE + window function + filter pattern is the gold standard for "top N per group" in professional SQL.`
  },
  insight:`Window functions were added to SQL because analysts needed them so badly. Every BI tool — Looker, Tableau, Power BI — generates window function SQL under the hood. Mastering RANK, ROW_NUMBER, and their relatives makes you a substantially more effective analyst.`
},

/* ═══════════════════════════════════════════════
   ADVANCED – Lessons 11-15
   ═══════════════════════════════════════════════ */
{
  id:'sql-adv-1', language:'sql', level:'advanced', order:1,
  title:'LAG, LEAD & Running Totals',
  duration:'30 min', xp:200,
  scenario:{
    company:'TechRetail Inc.',role:'Senior Data Analyst',
    description:`The CFO needs a month-over-month revenue comparison: "How much did we grow from last month? What's our running cumulative revenue for the year?" These require comparing a row to OTHER rows (previous/next period) — exactly what LAG, LEAD, and SUM() window functions are built for.`
  },
  objectives:[
    'Use LAG() to access values from previous rows',
    'Use LEAD() to access values from future rows',
    'Calculate running totals with SUM() OVER (ORDER BY)',
    'Compute month-over-month change and growth rates'
  ],
  terminology:[
    {term:'LAG()',lang:'sql',definition:'Returns a value from a previous row in the window. LAG(col, n) goes back n rows (default 1).',example:'LAG(revenue, 1) OVER (ORDER BY month)  -- previous month revenue'},
    {term:'LEAD()',lang:'sql',definition:'Returns a value from a future row in the window. LEAD(col, n) goes forward n rows.',example:'LEAD(amount, 1) OVER (ORDER BY date)  -- next row amount'},
    {term:'Running Total',lang:'sql',definition:'A cumulative sum that increases with each row. Calculated with SUM() OVER (ORDER BY date) with no PARTITION or with ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.',example:'SUM(revenue) OVER (ORDER BY month)'},
    {term:'ROWS BETWEEN',lang:'sql',definition:'Defines exactly which rows are included in the window frame. UNBOUNDED PRECEDING = all prior rows; CURRENT ROW = the current row.',example:'ROWS BETWEEN 3 PRECEDING AND CURRENT ROW  -- 4-row rolling window'},
    {term:'Moving Average',lang:'sql',definition:'An average of the current row plus N-1 prior rows, calculated with AVG() OVER (ORDER BY date ROWS BETWEEN n PRECEDING AND CURRENT ROW).'}
  ],
  theory:`<h3>Time-Series Analytics — The Heart of Business Analysis</h3>
<p>Most business questions involve comparing to a prior period: "Is revenue up vs. last month?" "Is the trend improving?" These require looking at neighboring rows in a time series.</p>
<h3>LAG and LEAD Syntax</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>LAG(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)<br>LEAD(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)<br><br>offset: how many rows back/forward (default 1)<br>default: value if no prior/next row exists (default NULL)</code></div></div>
<h3>Window Frame for Running Total</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>SUM(revenue) OVER (<br>&nbsp;&nbsp;ORDER BY month<br>&nbsp;&nbsp;ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW<br>)</code></div></div>`,
  steps:[
    {step:1,title:'Month-over-Month Revenue Comparison with LAG',
     explanation:`Build a monthly revenue CTE, then use LAG to bring in the previous month's revenue for side-by-side comparison.`,
     code:`WITH monthly AS (\n    SELECT\n        strftime('%Y-%m', sale_date) AS month,\n        ROUND(SUM(amount), 2)       AS revenue\n    FROM sales\n    GROUP BY strftime('%Y-%m', sale_date)\n)\nSELECT\n    month,\n    revenue,\n    LAG(revenue, 1, 0) OVER (ORDER BY month) AS prev_month_rev,\n    ROUND(revenue - LAG(revenue, 1, 0) OVER (ORDER BY month), 2) AS mom_change\nFROM monthly\nORDER BY month;`,
     after:'Each month shows current and prior revenue side-by-side, plus the absolute change. January\'s prev_month shows 0 (the default we set for missing prior).'},
    {step:2,title:'Month-over-Month Growth Rate',
     explanation:`Calculate percentage growth: (current - previous) / previous * 100. Use a CTE to first compute the LAG value, then calculate growth in the outer query.`,
     code:`WITH monthly AS (\n    SELECT\n        strftime('%Y-%m', sale_date) AS month,\n        ROUND(SUM(amount), 2) AS revenue\n    FROM sales\n    GROUP BY strftime('%Y-%m', sale_date)\n),\nwith_lag AS (\n    SELECT\n        month,\n        revenue,\n        LAG(revenue) OVER (ORDER BY month) AS prev_rev\n    FROM monthly\n)\nSELECT\n    month,\n    revenue,\n    prev_rev,\n    CASE\n        WHEN prev_rev IS NULL THEN NULL\n        ELSE ROUND((revenue - prev_rev) / prev_rev * 100, 1)\n    END AS growth_pct\nFROM with_lag\nORDER BY month;`,
     after:'Growth rates calculated exactly as they would appear in a CFO dashboard or investor report.'},
    {step:3,title:'Cumulative (Running) Revenue',
     explanation:`Add a running total column that accumulates revenue as months progress — the YTD running total.`,
     code:`WITH monthly AS (\n    SELECT\n        strftime('%Y-%m', sale_date) AS month,\n        ROUND(SUM(amount), 2) AS monthly_revenue\n    FROM sales\n    GROUP BY strftime('%Y-%m', sale_date)\n)\nSELECT\n    month,\n    monthly_revenue,\n    SUM(monthly_revenue) OVER (\n        ORDER BY month\n        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n    ) AS cumulative_revenue\nFROM monthly\nORDER BY month;`,
     after:'The cumulative column shows year-to-date revenue building up. This is the standard YTD chart data used in BI dashboards.'}
  ],
  challenge:{
    title:'3-Month Rolling Average Sales',
    description:`Calculate a 3-month rolling average of monthly revenue using a window function. Return month, monthly_revenue, and rolling_3mo_avg (rounded to 2 decimal places). This smooths out month-to-month volatility to reveal the underlying trend.`,
    hint:`Use AVG(monthly_revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) for a 3-month rolling average starting from the current month.`,
    starterCode:`WITH monthly AS (\n    SELECT\n        strftime('%Y-%m', sale_date) AS month,\n        ROUND(SUM(amount), 2) AS monthly_revenue\n    FROM sales\n    GROUP BY strftime('%Y-%m', sale_date)\n)\nSELECT\n    month,\n    monthly_revenue,\n    -- Add rolling 3-month average here\nFROM monthly\nORDER BY month;`,
    solution:`WITH monthly AS (\n    SELECT\n        strftime('%Y-%m', sale_date) AS month,\n        ROUND(SUM(amount), 2) AS monthly_revenue\n    FROM sales\n    GROUP BY strftime('%Y-%m', sale_date)\n)\nSELECT\n    month,\n    monthly_revenue,\n    ROUND(AVG(monthly_revenue) OVER (\n        ORDER BY month\n        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n    ), 2) AS rolling_3mo_avg\nFROM monthly\nORDER BY month;`,
    explanation:`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW tells SQL to average the current row plus the two rows before it — a 3-month window. Early months have fewer than 3 periods to average across.`,
    keywords:['AVG','OVER','ROWS BETWEEN','PRECEDING','CURRENT ROW'],
    successMessage:`Rolling average complete! This time-series pattern appears in every financial and operations dashboard — smoothing out volatility to show true trends.`
  },
  insight:`LAG/LEAD + running totals are the backbone of time-series analytics. Stock price analysis, revenue trend reports, churn rate calculations, cohort analysis — all rely on these window patterns. This is where SQL becomes genuinely powerful for business intelligence.`
},

{
  id:'sql-adv-2', language:'sql', level:'advanced', order:2,
  title:'Self Joins — A Table Joining Itself',
  duration:'25 min', xp:180,
  scenario:{
    company:'TechRetail Inc.',role:'Senior Data Analyst',
    description:`HR asks: "Can you show each employee alongside their manager's name and salary?" The manager's information is in the same employees table — just in a different row. A self join lets you join a table to itself, treating it as two separate virtual tables with different aliases.`
  },
  objectives:[
    'Understand when a self join is needed',
    'Write a self join using table aliases',
    'Handle NULL (top-level) records in self joins',
    'Build organizational hierarchy queries'
  ],
  terminology:[
    {term:'Self Join',lang:'sql',definition:'A JOIN where a table is joined to itself. Two aliases refer to the same underlying table as if they were two different tables.',example:'FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id'},
    {term:'Hierarchical Data',lang:'sql',definition:'Data where records reference other records of the same type: employee → manager → director → CEO. Common in org charts, categories, file systems.'},
    {term:'Recursive Query',lang:'sql',definition:'An advanced CTE that references itself, used to traverse multiple levels of a hierarchy. Uses WITH RECURSIVE syntax.'}
  ],
  theory:`<h3>When Is a Self Join Needed?</h3>
<p>Whenever a table has a column that references another row in the same table:</p>
<ul><li>employees.manager_id → employees.employee_id (who is my manager?)</li><li>products.parent_category_id → products.category_id (what category is this in?)</li><li>customers.referred_by → customers.customer_id (who referred this customer?)</li></ul>
<h3>The Technique</h3>
<p>Give the table two different aliases — one for the "child" perspective, one for the "parent" perspective — and join on the relationship column:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>FROM employees AS emp &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- child (the employee)<br>JOIN employees AS mgr &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- parent (the manager)<br>&nbsp;&nbsp;ON emp.manager_id = mgr.employee_id</code></div></div>`,
  steps:[
    {step:1,title:'Basic Self Join — Employee and Manager',
     explanation:`Join employees to itself: "emp" alias for the employee row, "mgr" alias for the manager row. Match where emp.manager_id = mgr.employee_id.`,
     code:`SELECT\n    emp.first_name         AS employee,\n    emp.job_title          AS emp_title,\n    emp.salary             AS emp_salary,\n    mgr.first_name         AS manager,\n    mgr.job_title          AS mgr_title\nFROM employees AS emp\nINNER JOIN employees AS mgr ON emp.manager_id = mgr.employee_id\nORDER BY mgr.first_name, emp.salary DESC;`,
     after:'Each employee is paired with their manager. The CEO (Robert Davis, no manager) is excluded by INNER JOIN since his manager_id is NULL.'},
    {step:2,title:'Include Top-Level with LEFT JOIN',
     explanation:`Use LEFT JOIN to also include the CEO — who has no manager (manager_id IS NULL). COALESCE fills the NULL manager fields with a label.`,
     code:`SELECT\n    emp.first_name              AS employee,\n    emp.department,\n    emp.salary                  AS emp_salary,\n    COALESCE(mgr.first_name, 'No Manager') AS manager,\n    COALESCE(mgr.salary, 0)     AS mgr_salary\nFROM employees AS emp\nLEFT JOIN employees AS mgr ON emp.manager_id = mgr.employee_id\nORDER BY emp.department, emp.salary DESC;`,
     after:'Now the CEO appears too, labeled "No Manager". LEFT JOIN preserves all emp rows; COALESCE handles the NULLs.'},
    {step:3,title:'Find Employees Who Earn More Than Their Manager',
     explanation:`A classic self-join pattern: filter to employees where their salary exceeds their manager\'s salary.`,
     code:`SELECT\n    emp.first_name  AS employee,\n    emp.department,\n    emp.salary      AS employee_salary,\n    mgr.first_name  AS manager,\n    mgr.salary      AS manager_salary,\n    emp.salary - mgr.salary AS salary_difference\nFROM employees AS emp\nINNER JOIN employees AS mgr ON emp.manager_id = mgr.employee_id\nWHERE emp.salary > mgr.salary\nORDER BY salary_difference DESC;`,
     after:'These employees earn more than their direct manager — often an interesting HR data point for compensation reviews.'}
  ],
  challenge:{
    title:'Salary Comparison at Each Level',
    description:`For each employee (except the CEO), show: employee name, their salary, manager name, manager salary, and whether the employee is paid 'Above Manager', 'Below Manager', or 'Equal to Manager'. Use a CASE statement for the comparison label.`,
    hint:`Self join employees on manager_id = employee_id, then CASE WHEN emp.salary > mgr.salary THEN 'Above Manager' WHEN emp.salary < mgr.salary THEN 'Below Manager' ELSE 'Equal' END.`,
    starterCode:`SELECT\n    emp.first_name AS employee,\n    emp.salary     AS emp_salary,\n    mgr.first_name AS manager,\n    mgr.salary     AS mgr_salary,\n    CASE\n        \n        \n        \n    END AS pay_vs_manager\nFROM employees AS emp\nINNER JOIN employees AS mgr ON\nORDER BY emp.department;`,
    solution:`SELECT\n    emp.first_name AS employee,\n    emp.department,\n    emp.salary     AS emp_salary,\n    mgr.first_name AS manager,\n    mgr.salary     AS mgr_salary,\n    CASE\n        WHEN emp.salary > mgr.salary THEN 'Above Manager'\n        WHEN emp.salary < mgr.salary THEN 'Below Manager'\n        ELSE                              'Equal to Manager'\n    END AS pay_vs_manager\nFROM employees AS emp\nINNER JOIN employees AS mgr ON emp.manager_id = mgr.employee_id\nORDER BY emp.department, emp.salary DESC;`,
    explanation:`The self join matches each employee to their manager's row. CASE then classifies the salary relationship. JOIN condition: emp.manager_id = mgr.employee_id.`,
    keywords:['employees','emp','mgr','manager_id','CASE'],
    successMessage:`HR compensation audit complete! Self joins are the elegant solution whenever a table has a foreign key pointing back to itself.`
  },
  insight:`Self joins power org chart tools, file system explorers, product category hierarchies, and "friends of friends" social graph queries. Any time your data has a parent-child relationship within one table, the self join is your tool.`
},

{
  id:'sql-adv-3', language:'sql', level:'advanced', order:3,
  title:'Pivoting Data with CASE & Conditional Aggregation',
  duration:'30 min', xp:190,
  scenario:{
    company:'TechRetail Inc.',role:'Senior Data Analyst',
    description:`The executive team wants a report where each row is a product category, and each column shows revenue for a different region (East, West, Central) — all in one row. This "wide format" pivot table doesn't have a PIVOT keyword in SQLite, but conditional aggregation with CASE provides the exact same result.`
  },
  objectives:[
    'Build a pivot table using CASE + SUM conditional aggregation',
    'Transform row values into column headers',
    'Handle dynamic pivots vs. static pivots',
    'Understand when to pivot vs. use regular GROUP BY'
  ],
  terminology:[
    {term:'Pivot Table',lang:'sql',definition:'A data transformation that rotates row values into column headers, summarizing data in a grid format. Common in dashboards and Excel.',example:'Rows: product category. Columns: East revenue, West revenue, Central revenue'},
    {term:'Conditional Aggregation',lang:'sql',definition:'Using CASE inside an aggregate function (SUM, COUNT) to calculate aggregates on a filtered subset of rows.',example:'SUM(CASE WHEN region = "East" THEN amount ELSE 0 END) AS east_revenue'},
    {term:'Static Pivot',lang:'sql',definition:'A pivot where you hardcode the column values (regions, months, etc.) in your CASE statements. Must update the query if values change.'},
    {term:'Wide Format',lang:'sql',definition:'Data layout where each variable is a column. Opposite of "long format" where each variable is a row value.'},
    {term:'COALESCE',lang:'sql',definition:'Returns the first non-NULL value in a list. Useful for replacing NULL pivot cells with 0.',example:'COALESCE(SUM(...), 0)'}
  ],
  theory:`<h3>Long Format vs. Wide Format</h3>
<p>Raw data is usually stored in <em>long format</em> — one row per observation. Pivot tables transform to <em>wide format</em> — one row per category with one column per dimension value.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Long:                       &nbsp;&nbsp;&nbsp;Wide (pivoted):<br>Electronics | East | 5200 &nbsp;&nbsp;&nbsp;Category | East | West<br>Electronics | West | 3100 &nbsp;&nbsp;&nbsp;Electronics | 5200 | 3100<br>Furniture   | East | 2800 &nbsp;&nbsp;&nbsp;Furniture   | 2800 | ...</code></div></div>
<h3>The SQL Pivot Technique</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>SUM(CASE WHEN region = 'East' THEN amount ELSE 0 END) AS east_revenue<br>-- This sums amount ONLY for East rows, adds 0 for everything else</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div>Static pivots require you to know all dimension values in advance. If a new region is added, you must update the query. For fully dynamic pivots, most analysts use Python or a BI tool.</div></div>`,
  steps:[
    {step:1,title:'Revenue by Category and Region (Long Format)',
     explanation:`First understand the data in long format — one row per category-region combination. This is the raw data you'll pivot.`,
     code:`SELECT\n    p.category,\n    s.region,\n    ROUND(SUM(s.amount), 2) AS revenue\nFROM sales s\nINNER JOIN products p ON s.product_id = p.product_id\nGROUP BY p.category, s.region\nORDER BY p.category, s.region;`,
     after:'This long-format result has multiple rows per category. The goal is to flatten this so each category is ONE row with separate region columns.'},
    {step:2,title:'Pivot to Wide Format',
     explanation:`Use conditional aggregation to create one column per region. Each CASE expression sums amount only for rows in that region.`,
     code:`SELECT\n    p.category,\n    ROUND(SUM(CASE WHEN s.region='East'    THEN s.amount ELSE 0 END),2) AS east_revenue,\n    ROUND(SUM(CASE WHEN s.region='West'    THEN s.amount ELSE 0 END),2) AS west_revenue,\n    ROUND(SUM(CASE WHEN s.region='Central' THEN s.amount ELSE 0 END),2) AS central_revenue,\n    ROUND(SUM(s.amount), 2)                                              AS total_revenue\nFROM sales s\nINNER JOIN products p ON s.product_id = p.product_id\nGROUP BY p.category\nORDER BY total_revenue DESC;`,
     after:'Each category is now one row with separate revenue columns — a true pivot table. The CEO could read this directly in a slide.'},
    {step:3,title:'Add Percentage Breakdown',
     explanation:`Enhance the pivot by adding each region\'s percentage of total revenue per category.`,
     code:`SELECT\n    p.category,\n    ROUND(SUM(CASE WHEN s.region='East' THEN s.amount ELSE 0 END),2)  AS east_rev,\n    ROUND(SUM(CASE WHEN s.region='West' THEN s.amount ELSE 0 END),2)  AS west_rev,\n    ROUND(SUM(s.amount), 2)                                            AS total_rev,\n    ROUND(100.0 * SUM(CASE WHEN s.region='East' THEN s.amount ELSE 0 END)\n          / SUM(s.amount), 1)                                          AS east_pct,\n    ROUND(100.0 * SUM(CASE WHEN s.region='West' THEN s.amount ELSE 0 END)\n          / SUM(s.amount), 1)                                          AS west_pct\nFROM sales s\nINNER JOIN products p ON s.product_id = p.product_id\nGROUP BY p.category\nORDER BY total_rev DESC;`,
     after:'Revenue AND regional share in one clean table. This is the kind of summary that goes directly into executive presentations.'}
  ],
  challenge:{
    title:'Monthly Revenue by Product Category',
    description:`Pivot the data so each row is a month (2023-01 to 2023-05) and each column is a product category (Electronics, Furniture, Office Supplies, Accessories). Show total revenue per month per category. Add a grand total column.`,
    hint:`GROUP BY strftime('%Y-%m', sale_date). Create one CASE column per category. Join sales to products for category.`,
    starterCode:`SELECT\n    strftime('%Y-%m', s.sale_date) AS month,\n    ROUND(SUM(CASE WHEN p.category='Electronics'    THEN s.amount ELSE 0 END),2) AS electronics,\n    ROUND(SUM(CASE WHEN p.category='Furniture'      THEN s.amount ELSE 0 END),2) AS furniture,\n    ROUND(SUM(CASE WHEN p.category='Office Supplies' THEN s.amount ELSE 0 END),2) AS office_supplies,\n    ROUND(SUM(CASE WHEN p.category='Accessories'    THEN s.amount ELSE 0 END),2) AS accessories,\n    \nFROM sales s\nINNER JOIN products p ON s.product_id = p.product_id\nGROUP BY\nORDER BY month;`,
    solution:`SELECT\n    strftime('%Y-%m', s.sale_date) AS month,\n    ROUND(SUM(CASE WHEN p.category = 'Electronics'    THEN s.amount ELSE 0 END),2) AS electronics,\n    ROUND(SUM(CASE WHEN p.category = 'Furniture'      THEN s.amount ELSE 0 END),2) AS furniture,\n    ROUND(SUM(CASE WHEN p.category = 'Office Supplies' THEN s.amount ELSE 0 END),2) AS office_supplies,\n    ROUND(SUM(CASE WHEN p.category = 'Accessories'    THEN s.amount ELSE 0 END),2) AS accessories,\n    ROUND(SUM(s.amount), 2) AS grand_total\nFROM sales s\nINNER JOIN products p ON s.product_id = p.product_id\nGROUP BY strftime('%Y-%m', s.sale_date)\nORDER BY month;`,
    explanation:`Each CASE column sums amount for one category. GROUP BY month creates one row per month. This is exactly what a Finance team would use for a category breakdown over time.`,
    keywords:['sales','products','CASE','SUM','GROUP BY','strftime'],
    successMessage:`Monthly category pivot built! This exact pattern appears in financial reporting, budgeting tools, and executive dashboards worldwide.`
  },
  insight:`Excel pivot tables are beloved. Now you can do the same thing in SQL — faster, on millions of rows, reproducible, and embeddable in dashboards. Many BI tools actually convert their pivot UI into exactly this SQL underneath.`
},

{
  id:'sql-adv-4', language:'sql', level:'advanced', order:4,
  title:'Date & Time Functions for Time-Series Analysis',
  duration:'25 min', xp:180,
  scenario:{
    company:'TechRetail Inc.',role:'Senior Data Analyst',
    description:`The operations team asks: "How long does it take us to ship orders on average? Which orders took more than 7 days to ship? Break down order volume by month and day of week." Date manipulation is one of the most common — and trickiest — parts of data analytics SQL.`
  },
  objectives:[
    'Extract date parts (year, month, day, weekday)',
    'Calculate the difference between two dates',
    'Filter by date ranges',
    'Build time-based groupings'
  ],
  terminology:[
    {term:'strftime()',lang:'sql',definition:'SQLite date formatting function. Extracts or formats date parts.',example:"strftime('%Y', date_col)  -- year\nstrftime('%m', date_col)  -- month\nstrftime('%d', date_col)  -- day"},
    {term:'julianday()',lang:'sql',definition:'Converts a date to a Julian Day Number (a floating point number). Subtract two julianday() results to get days between dates.',example:"julianday(ship_date) - julianday(order_date)  -- days to ship"},
    {term:'DATE()',lang:'sql',definition:'Returns a date value, and allows date arithmetic.',example:"DATE('now', '-30 days')  -- 30 days ago"},
    {term:'Date Arithmetic',lang:'sql',definition:'Calculating date differences or adding/subtracting time intervals from dates.',example:"DATE(hire_date, '+1 year')  -- one year after hire"},
    {term:'ISO Weekday',lang:'sql',definition:"SQLite's strftime('%w') returns 0=Sunday, 1=Monday, ..., 6=Saturday."}
  ],
  theory:`<h3>Dates Are Tricky — But Essential</h3>
<p>Almost every analytical question involves time: trends, seasonality, aging, SLAs, cohorts. Date functions vary across databases (MySQL uses DATEDIFF, PostgreSQL uses EXTRACT, SQL Server uses DATEPART), but the concepts are the same.</p>
<h3>SQLite Date Functions</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>strftime('%Y-%m', date_col)          -- 2023-04 (year-month)<br>strftime('%w', date_col)             -- weekday (0=Sun)<br>julianday(d2) - julianday(d1)        -- days between dates<br>DATE('now', '-7 days')               -- 7 days ago<br>DATE(hire_date, '+1 year')           -- 1 year after hire</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Learning date functions in one SQL dialect is 80% transferable. The function names differ but the concepts (extract, difference, truncate) are universal.</div></div>`,
  steps:[
    {step:1,title:'Extract Date Components',
     explanation:`Extract year, month, and day of week from order dates to understand ordering patterns.`,
     code:`SELECT\n    order_id,\n    order_date,\n    strftime('%Y', order_date)  AS order_year,\n    strftime('%m', order_date)  AS order_month,\n    CASE strftime('%w', order_date)\n        WHEN '0' THEN 'Sunday'\n        WHEN '1' THEN 'Monday'\n        WHEN '2' THEN 'Tuesday'\n        WHEN '3' THEN 'Wednesday'\n        WHEN '4' THEN 'Thursday'\n        WHEN '5' THEN 'Friday'\n        WHEN '6' THEN 'Saturday'\n    END AS day_of_week\nFROM orders\nORDER BY order_date;`,
     after:'Each order has its date broken into components. Day of week uses CASE to convert the numeric weekday to a readable label.'},
    {step:2,title:'Calculate Days to Ship',
     explanation:`How many days between order_date and ship_date? Use julianday() subtraction, and NULL handling for unshipped orders.`,
     code:`SELECT\n    order_id,\n    order_date,\n    ship_date,\n    status,\n    CASE\n        WHEN ship_date IS NULL THEN 'Not Yet Shipped'\n        ELSE CAST(julianday(ship_date) - julianday(order_date) AS INTEGER) || ' days'\n    END AS days_to_ship\nFROM orders\nORDER BY order_date;`,
     note:'CAST(...AS INTEGER) removes the decimal. || is SQLite string concatenation.',
     after:'Each delivered order shows shipping time in days. Unshipped orders are labeled clearly.'},
    {step:3,title:'Aggregate by Time Dimension',
     explanation:`Average shipping time and volume by month — a typical operations SLA tracking query.`,
     code:`SELECT\n    strftime('%Y-%m', order_date) AS month,\n    COUNT(*) AS total_orders,\n    COUNT(ship_date) AS shipped_orders,\n    ROUND(AVG(\n        CASE WHEN ship_date IS NOT NULL\n             THEN julianday(ship_date) - julianday(order_date)\n        END\n    ), 1) AS avg_days_to_ship\nFROM orders\nGROUP BY strftime('%Y-%m', order_date)\nORDER BY month;`,
     after:'Monthly SLA report showing order volume and average shipping time. COUNT(ship_date) only counts non-NULL values (shipped orders), so NULL unshipped orders are excluded from the average.'}
  ],
  challenge:{
    title:'Shipping SLA Compliance Report',
    description:`The operations team has a 7-day shipping SLA. For delivered orders only, calculate: the total number of orders, how many met the SLA (≤ 7 days), how many missed it (> 7 days), and the SLA compliance rate (as a percentage). Also show the average shipping time.`,
    hint:`Filter WHERE status = 'Delivered'. Use COUNT(*) total, SUM(CASE WHEN days_diff <= 7 THEN 1 ELSE 0 END) for on-time. Round percentage to 1 decimal.`,
    starterCode:`WITH shipping_days AS (\n    SELECT\n        order_id,\n        status,\n        CAST(julianday(ship_date) - julianday(order_date) AS INTEGER) AS days_to_ship\n    FROM orders\n    WHERE status = 'Delivered'\n)\nSELECT\n    COUNT(*)    AS total_shipped,\n    -- on_time count (<=7 days)\n    -- late count (>7 days)\n    -- compliance rate %\n    ROUND(AVG(days_to_ship), 1) AS avg_days_to_ship\nFROM shipping_days;`,
    solution:`WITH shipping_days AS (\n    SELECT\n        order_id,\n        status,\n        CAST(julianday(ship_date) - julianday(order_date) AS INTEGER) AS days_to_ship\n    FROM orders\n    WHERE status = 'Delivered'\n)\nSELECT\n    COUNT(*)                                                          AS total_shipped,\n    SUM(CASE WHEN days_to_ship <= 7 THEN 1 ELSE 0 END)              AS on_time,\n    SUM(CASE WHEN days_to_ship > 7  THEN 1 ELSE 0 END)              AS late,\n    ROUND(100.0 * SUM(CASE WHEN days_to_ship <= 7 THEN 1 ELSE 0 END)\n          / COUNT(*), 1)                                             AS compliance_rate_pct,\n    ROUND(AVG(days_to_ship), 1)                                      AS avg_days_to_ship\nFROM shipping_days;`,
    explanation:`The CTE calculates shipping days for delivered orders. Conditional aggregation (SUM + CASE) counts on-time vs. late without a GROUP BY. The compliance rate divides on-time count by total, multiplied by 100.`,
    keywords:['orders','julianday','CASE','SUM','status','Delivered'],
    successMessage:`SLA compliance report built! This pattern is standard in operations analytics at every e-commerce, logistics, and service company.`
  },
  insight:`Date analytics drive most operational KPIs: shipping SLAs, patient wait times, issue resolution times, employee tenure analysis, subscription renewal windows. Mastering date functions makes you indispensable in any analytics role.`
},

{
  id:'sql-adv-5', language:'sql', level:'advanced', order:5,
  title:'Complex Analytical Patterns — Cohort & Retention',
  duration:'35 min', xp:220,
  scenario:{
    company:'TechRetail Inc.',role:'Lead Data Analyst',
    description:`The product team asks the most important question in subscription and e-commerce analytics: "Of the customers who first signed up in each quarter, how many placed an order within 90 days? What's our new customer activation rate?" This is cohort analysis — one of the most valuable and sought-after analytics skills.`
  },
  objectives:[
    'Define and identify customer cohorts by sign-up period',
    'Calculate activation and retention rates',
    'Combine CTEs, JOINs, and window functions for complex analysis',
    'Present cohort analysis results in a readable format'
  ],
  terminology:[
    {term:'Cohort',lang:'sql',definition:'A group of entities (users, customers) who share a common characteristic at a specific time — usually the period they first appeared.',example:'Jan 2020 cohort = all customers who signed up in January 2020'},
    {term:'Cohort Analysis',lang:'sql',definition:'Tracking how cohorts behave over time. Used to measure retention, activation, churn, and lifetime value.',},
    {term:'Activation Rate',lang:'sql',definition:'The percentage of new customers/users who complete a key action (first order, first subscription) within a defined window.'},
    {term:'Retention',lang:'sql',definition:'The percentage of customers who continue to engage/purchase after their initial period. Core health metric for any recurring-revenue business.'},
    {term:'DATE truncation',lang:'sql',definition:"Reducing a date to a larger unit (month, quarter, year) using date functions. Used to group cohorts.",example:"strftime('%Y-Q', signup_date)  -- year-quarter grouping"}
  ],
  theory:`<h3>Why Cohort Analysis Matters</h3>
<p>Aggregate metrics like "total monthly active users" hide whether you're growing or retaining. Cohort analysis reveals the underlying health: are customers who signed up 6 months ago still buying? Are newer cohorts better or worse than older ones?</p>
<h3>The Analytical Pattern</h3>
<ol>
<li><strong>Define cohort</strong> — when did the customer first appear? (signup_date truncated to month/quarter)</li>
<li><strong>Define the event</strong> — when did they do the key action? (first order)</li>
<li><strong>Calculate time between</strong> — how many days/months after cohort entry did the event happen?</li>
<li><strong>Aggregate</strong> — what % of the cohort did the action within the window?</li>
</ol>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Cohort analysis questions are asked in almost every data analyst interview at product-led companies. Understanding this pattern sets you apart.</div></div>`,
  steps:[
    {step:1,title:'Identify Customer Sign-up Cohorts',
     explanation:`Group customers by their sign-up year-month (that's their cohort). Count the cohort size.`,
     code:`SELECT\n    strftime('%Y-%m', signup_date) AS cohort_month,\n    COUNT(*) AS cohort_size\nFROM customers\nGROUP BY strftime('%Y-%m', signup_date)\nORDER BY cohort_month;`,
     after:'Each month\'s sign-up cohort. Size indicates how many customers we acquired in that period.'},
    {step:2,title:'Find Each Customer\'s First Order Date',
     explanation:`A CTE finds the earliest order date per customer, which defines when they first "activated".`,
     code:`WITH first_orders AS (\n    SELECT\n        customer_id,\n        MIN(order_date) AS first_order_date\n    FROM orders\n    GROUP BY customer_id\n)\nSELECT\n    c.customer_id,\n    c.first_name,\n    strftime('%Y-%m', c.signup_date)          AS cohort_month,\n    fo.first_order_date,\n    CAST(julianday(fo.first_order_date)\n         - julianday(c.signup_date) AS INTEGER) AS days_to_first_order\nFROM customers c\nLEFT JOIN first_orders fo ON c.customer_id = fo.customer_id\nORDER BY c.signup_date;`,
     after:'Each customer shows their cohort and how many days until their first order. NULL means no order yet.'},
    {step:3,title:'Calculate 90-Day Activation Rate by Cohort',
     explanation:`The full cohort analysis: for each sign-up month cohort, what percentage ordered within 90 days?`,
     code:`WITH first_orders AS (\n    SELECT customer_id, MIN(order_date) AS first_order_date\n    FROM orders\n    GROUP BY customer_id\n),\ncohort_analysis AS (\n    SELECT\n        strftime('%Y-%m', c.signup_date) AS cohort_month,\n        COUNT(c.customer_id) AS cohort_size,\n        SUM(CASE\n            WHEN fo.first_order_date IS NOT NULL\n             AND julianday(fo.first_order_date) - julianday(c.signup_date) <= 90\n            THEN 1 ELSE 0\n        END) AS activated_90d\n    FROM customers c\n    LEFT JOIN first_orders fo ON c.customer_id = fo.customer_id\n    GROUP BY strftime('%Y-%m', c.signup_date)\n)\nSELECT\n    cohort_month,\n    cohort_size,\n    activated_90d,\n    cohort_size - activated_90d AS not_activated,\n    ROUND(100.0 * activated_90d / cohort_size, 1) AS activation_rate_pct\nFROM cohort_analysis\nORDER BY cohort_month;`,
     after:'Each click cohort shows the activation rate. This is the core output that product and growth teams use to evaluate customer quality and onboarding effectiveness.'}
  ],
  challenge:{
    title:'High-Value Customer Identification',
    description:`Identify customers who are in the top 25% by total spending (use ntile or percentile approximation), and have placed at least 2 orders. Return customer names, segment, total_spent, order_count, and a label 'High Value' or 'Standard'. Sort by total_spent descending.`,
    hint:`CTE 1: aggregate orders per customer (SUM total_amount, COUNT orders). CTE 2: Add NTILE(4) OVER (ORDER BY total_spent DESC) to create quartiles. Filter CTE 2 where ntile = 1 (top 25%) AND order_count >= 2.`,
    starterCode:`WITH customer_spending AS (\n    SELECT\n        customer_id,\n        ROUND(SUM(total_amount), 2) AS total_spent,\n        COUNT(*) AS order_count\n    FROM orders\n    GROUP BY customer_id\n),\nranked_customers AS (\n    SELECT\n        customer_id,\n        total_spent,\n        order_count,\n        NTILE(4) OVER (ORDER BY total_spent DESC) AS spend_quartile\n    FROM customer_spending\n)\nSELECT\n    c.first_name,\n    c.last_name,\n    c.segment,\n    rc.total_spent,\n    rc.order_count,\n    CASE WHEN rc.spend_quartile = 1 AND rc.order_count >= 2\n         THEN 'High Value' ELSE 'Standard' END AS customer_tier\nFROM ranked_customers rc\nINNER JOIN customers c ON rc.customer_id = c.customer_id\nWHERE\nORDER BY rc.total_spent DESC;`,
    solution:`WITH customer_spending AS (\n    SELECT\n        customer_id,\n        ROUND(SUM(total_amount), 2) AS total_spent,\n        COUNT(*) AS order_count\n    FROM orders\n    GROUP BY customer_id\n),\nranked_customers AS (\n    SELECT\n        customer_id,\n        total_spent,\n        order_count,\n        NTILE(4) OVER (ORDER BY total_spent DESC) AS spend_quartile\n    FROM customer_spending\n)\nSELECT\n    c.first_name,\n    c.last_name,\n    c.segment,\n    rc.total_spent,\n    rc.order_count,\n    CASE WHEN rc.spend_quartile = 1 AND rc.order_count >= 2\n         THEN 'High Value' ELSE 'Standard' END AS customer_tier\nFROM ranked_customers rc\nINNER JOIN customers c ON rc.customer_id = c.customer_id\nWHERE rc.spend_quartile = 1 AND rc.order_count >= 2\nORDER BY rc.total_spent DESC;`,
    explanation:`NTILE(4) splits customers into 4 equal-size groups by spending. Quartile 1 = top 25%. Combined with order_count >= 2, we filter to truly high-value, active customers.`,
    keywords:['customer_spending','NTILE','order_count','spend_quartile','CASE'],
    successMessage:`Advanced cohort-ready segmentation complete! NTILE, CTEs, window functions, and CASE combined — this is senior-level SQL analytics.`
  },
  insight:`Cohort analysis is the most impactful skill interviewed for at product analytics roles (Spotify, Airbnb, DoorDash, Meta). Combined with window functions and CTEs, this pattern answers "are we getting better or worse?" — the question every growing company needs answered.`
}

]; // end SQL_LESSONS
