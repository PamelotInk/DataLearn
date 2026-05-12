/* =========================================================
   lessons-r.js  — 12 R lessons across 3 levels
   All code is simulated — output is statically defined since
   we cannot run a real R runtime in the browser.
   ========================================================= */

const R_LESSONS = [

/* ═══════════════════════════════════════════════
   BASIC – Lessons 1-4
   ═══════════════════════════════════════════════ */
{
  id:'r-basic-1', language:'r', level:'basic', order:1,
  title:'Vectors & Data Types — R\'s Building Blocks',
  duration:'20 min', xp:100,
  scenario:{
    company:'RetailCo Analytics',role:'Junior Data Analyst',
    description:`It's your first week using R at RetailCo Analytics. Your manager says: "Before we touch any datasets, I need you to understand how R stores data. Everything in R starts with vectors — get comfortable with them." You open RStudio and start from the ground up.`
  },
  objectives:[
    'Create vectors using c() and understand R\'s core data types',
    'Perform arithmetic and logical operations on vectors',
    'Use built-in functions: length(), sum(), mean(), max(), min()',
    'Understand vectorization — R\'s most powerful feature'
  ],
  terminology:[
    {term:'Vector',lang:'r',definition:'R\'s most fundamental data structure — a sequence of values all of the same type. Even a single number is a vector of length 1.',example:'sales <- c(120, 340, 210, 89, 475)'},
    {term:'c()',lang:'r',definition:'The combine function. Creates a vector by combining values.',example:'ages <- c(25, 31, 42, 28)\nnames_vec <- c("Alice", "Bob", "Carol")'},
    {term:'<-',lang:'r',definition:'The assignment operator in R. Assigns a value to a variable name. You can also use = but <- is the standard convention.',example:'revenue <- 50000'},
    {term:'Numeric',lang:'r',definition:'R\'s default number type. Stores decimals (double precision). Use is.numeric() to check.',example:'price <- 19.99  # numeric'},
    {term:'Character',lang:'r',definition:'Text strings in R. Always enclosed in quotes.',example:'dept <- "Marketing"'},
    {term:'Logical',lang:'r',definition:'Boolean values: TRUE or FALSE (must be uppercase in R).',example:'is_active <- TRUE'},
    {term:'Vectorization',lang:'r',definition:'R automatically applies operations to every element of a vector without a loop. This makes R code concise and fast.',example:'c(10,20,30) * 2  # returns c(20,40,60)'},
    {term:'class()',lang:'r',definition:'Returns the data type of an object.',example:'class(42)       # "numeric"\nclass("hello")  # "character"'}
  ],
  theory:`<h3>Why R Thinks in Vectors</h3>
<p>Unlike Python or SAS, R was built from the ground up for statistical computing. Its fundamental unit isn't a single number — it's a <em>vector</em> of numbers. This means operations are applied to entire columns of data at once, which is precisely what analysts need.</p>
<h3>R's Core Data Types</h3>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>numeric   → 42, 3.14, -100.5<br>character → "Sales", "Q1", "Alice"<br>logical   → TRUE, FALSE<br>integer   → 1L, 2L, 42L  (rarely needed)</code></div></div>
<h3>Vectorization: R's Superpower</h3>
<p>In most languages you need a loop to apply an operation to each element. In R, arithmetic operators and most functions are <em>vectorized</em> — they work on the whole vector automatically.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Analyst tip:</strong> This is why R analysts rarely write for-loops. If you find yourself looping over rows, there's almost always a vectorized approach that's cleaner and faster.</div></div>`,
  steps:[
    {step:1,title:'Create Your First Vectors',
     explanation:`Use <code>c()</code> to create vectors of different types. The assignment operator <code>&lt;-</code> stores them in named variables.`,
     code:`# Numeric vector — monthly sales figures
monthly_sales <- c(42500, 38200, 51300, 47800, 55100, 49600)

# Character vector — region names
regions <- c("North", "South", "East", "West", "Central", "Pacific")

# Logical vector — whether target was met
target_met <- c(TRUE, FALSE, TRUE, TRUE, TRUE, FALSE)

# Check lengths
length(monthly_sales)
length(regions)`,
     simulatedOutput:{type:'text',content:`[1] 6\n[1] 6`},
     note:'R prints results with [1] at the start — it\'s the index of the first element shown on that line. Not an error!',
     after:'Three parallel vectors with 6 elements each — one per region. This is how raw data often enters R before becoming a data frame.'},
    {step:2,title:'Vectorized Arithmetic',
     explanation:`Apply calculations to every element at once — no loops needed. R applies the operation element-by-element across the entire vector.`,
     code:`monthly_sales <- c(42500, 38200, 51300, 47800, 55100, 49600)

# Add 5% growth to every month
projected <- monthly_sales * 1.05
print(projected)

# Calculate how far each month is from the average
avg <- mean(monthly_sales)
variance_from_avg <- monthly_sales - avg
print(round(variance_from_avg, 0))`,
     simulatedOutput:{type:'text',content:`[1] 44625.0 40110.0 53865.0 50190.0 57855.0 52080.0\n[1]  -3583.3  -7883.3   5216.7   1716.7   9016.7   3516.7`},
     after:'Every element was transformed in one line. No loops, no indexing — just clean vectorized math.'},
    {step:3,title:'Summary Functions',
     explanation:`R has built-in functions for common statistical summaries. They all accept a numeric vector and return a single value.`,
     code:`monthly_sales <- c(42500, 38200, 51300, 47800, 55100, 49600)

cat("Total annual sales: $", sum(monthly_sales), "\n")
cat("Monthly average:    $", mean(monthly_sales), "\n")
cat("Best month:         $", max(monthly_sales), "\n")
cat("Worst month:        $", min(monthly_sales), "\n")
cat("Std deviation:      $", round(sd(monthly_sales), 0), "\n")`,
     simulatedOutput:{type:'text',content:`Total annual sales: $ 284500 \nMonthly average:    $ 47416.67 \nBest month:         $ 55100 \nWorst month:        $ 38200 \nStd deviation:      $ 5895`},
     note:'cat() concatenates and prints. \\n adds a new line. sd() gives the standard deviation — built right into base R.',
     after:'Complete statistical summary in 5 lines. In Excel this would take a column of formulas; in R, five function calls.'}
  ],
  challenge:{
    title:'Quarterly Revenue Analysis',
    description:`You receive four quarters of revenue data: Q1=128500, Q2=143200, Q3=156800, Q4=189400. Create a numeric vector, then calculate and print: total annual revenue, average quarterly revenue, the best quarter\'s revenue, and the percentage growth from Q1 to Q4.`,
    hint:`Create vector with c(). Use sum(), mean(), max(). Growth % = ((Q4 - Q1) / Q1) * 100`,
    starterCode:`# Quarterly revenue data
quarterly_revenue <- c(128500, 143200, 156800, 189400)

# Total annual revenue


# Average quarterly revenue


# Best quarter


# Percentage growth Q1 to Q4
# growth_pct <- ((last - first) / first) * 100
`,
    solution:`quarterly_revenue <- c(128500, 143200, 156800, 189400)

cat("Total annual revenue: $", sum(quarterly_revenue), "\\n")
cat("Average per quarter:  $", mean(quarterly_revenue), "\\n")
cat("Best quarter:         $", max(quarterly_revenue), "\\n")

growth_pct <- ((quarterly_revenue[4] - quarterly_revenue[1]) / quarterly_revenue[1]) * 100
cat("Q1 to Q4 growth:      ", round(growth_pct, 1), "%\\n")`,
    explanation:`quarterly_revenue[4] and quarterly_revenue[1] use R\'s 1-based indexing to access specific elements. The growth formula is a vectorized expression — R evaluates the arithmetic and stores the result in growth_pct.`,
    successMessage:`Vector basics mastered! You can create, transform, and summarize data in R — the foundation of every analysis you\'ll build.`
  },
  insight:`R is used by statisticians at the FDA, epidemiologists at the CDC, and data teams at AirBnB, Facebook, and The New York Times. The vector-first thinking you started here underpins every dplyr pipeline and ggplot chart you\'ll write.`
},

{
  id:'r-basic-2', language:'r', level:'basic', order:2,
  title:'Data Frames — Your Spreadsheet in R',
  duration:'20 min', xp:120,
  scenario:{
    company:'RetailCo Analytics',role:'Junior Data Analyst',
    description:`Your manager drops a CSV on your desk: "Load this employee dataset into R and tell me what we're working with — how many rows, what columns, any obvious issues." This is the first thing every analyst does with a new dataset. You'll use data frames and the tidyverse to get oriented fast.`
  },
  objectives:[
    'Create data frames with data.frame() and understand their structure',
    'Use str(), head(), summary(), and nrow()/ncol() to explore data',
    'Access columns with $ and [] notation',
    'Install and load packages with library()'
  ],
  terminology:[
    {term:'data.frame',lang:'r',definition:'R\'s primary 2D data structure — rows (observations) and columns (variables). Each column is a vector; all columns have equal length.',example:'df <- data.frame(name=c("Alice","Bob"), salary=c(72000,58000))'},
    {term:'str()',lang:'r',definition:'Displays the structure of an object — column names, types, and a preview of values. First function to run on any new dataset.',example:'str(df)  # shows types like chr, num, int'},
    {term:'head() / tail()',lang:'r',definition:'Returns the first or last N rows of a data frame. Default N=6.',example:'head(df, 10)  # first 10 rows'},
    {term:'summary()',lang:'r',definition:'Produces a statistical summary: min, max, mean, median, quartiles for numeric columns; frequency counts for character/factor columns.',example:'summary(df)'},
    {term:'$ operator',lang:'r',definition:'Accesses a single column from a data frame by name, returning it as a vector.',example:'df$salary  # returns the salary column as a vector'},
    {term:'nrow() / ncol()',lang:'r',definition:'Returns the number of rows or columns in a data frame.',example:'nrow(df)  # row count\nncol(df)  # column count'},
    {term:'library()',lang:'r',definition:'Loads an installed package into the current R session, making its functions available.',example:'library(tidyverse)'},
    {term:'tibble',lang:'r',definition:'The tidyverse\'s improved version of a data frame. Prints more cleanly, never converts strings to factors by default.',example:'library(tibble)\ntb <- tibble(x=1:3, y=c("a","b","c"))'}
  ],
  theory:`<h3>The Data Frame: R\'s Core Data Structure</h3>
<p>A data frame is a table where each column is a named vector. All columns must have the same number of rows. Every CSV you load becomes a data frame in R.</p>
<h3>The Exploration Checklist</h3>
<p>Before any analysis, always run these four checks on a new dataset:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>str(df)      # structure, types, preview<br>nrow(df)     # how many records?<br>summary(df)  # statistical overview<br>head(df)     # first 6 rows</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>tidyverse vs. base R:</strong> The tidyverse is a collection of packages (dplyr, ggplot2, tidyr…) that share a consistent design. Most modern R data work uses the tidyverse. We\'ll use it throughout these lessons.</div></div>`,
  steps:[
    {step:1,title:'Create a Data Frame',
     explanation:`Build a data frame from parallel vectors. Each named argument becomes a column.`,
     code:`# Create an employee data frame
employees <- data.frame(
  employee_id = 1:6,
  first_name  = c("Sarah", "Michael", "Emily", "James", "Lisa", "Carlos"),
  department  = c("Sales", "Sales", "Marketing", "IT", "Sales", "IT"),
  salary      = c(72000, 58000, 65000, 88000, 95000, 82000),
  hire_year   = c(2019, 2021, 2020, 2018, 2016, 2022),
  stringsAsFactors = FALSE
)

# Basic dimensions
cat("Rows:", nrow(employees), " Columns:", ncol(employees), "\\n")
print(employees)`,
     simulatedOutput:{type:'dataframe',
       headers:['employee_id','first_name','department','salary','hire_year'],
       rows:[[1,'Sarah','Sales',72000,2019],[2,'Michael','Sales',58000,2021],[3,'Emily','Marketing',65000,2020],[4,'James','IT',88000,2018],[5,'Lisa','Sales',95000,2016],[6,'Carlos','IT',82000,2022]]},
     note:'stringsAsFactors=FALSE prevents R from converting text columns to factors (a legacy behavior). Always set this in base R.',
     after:'A 6×5 data frame. Rows are the index on the left; column names are the header.'},
    {step:2,title:'Explore Structure and Summary',
     explanation:`Run the standard exploration functions to understand what you\'re working with before any analysis.`,
     code:`str(employees)

cat("\\n--- Summary ---\\n")
summary(employees)`,
     simulatedOutput:{type:'text',content:`'data.frame':  6 obs. of  5 variables:\n $ employee_id: int  1 2 3 4 5 6\n $ first_name : chr  "Sarah" "Michael" "Emily" "James" ...\n $ department : chr  "Sales" "Sales" "Marketing" "IT" ...\n $ salary     : num  72000 58000 65000 88000 95000 82000\n $ hire_year  : num  2019 2021 2020 2018 2016 2022\n\n--- Summary ---\n  employee_id    first_name        department            salary        hire_year  \n Min.   :1.00   Length:6          Length:6          Min.   :58000   Min.   :2016  \n 1st Qu.:2.25   Class :character  Class :character  1st Qu.:65750   1st Qu.:2018  \n Median :3.50   Mode  :character  Mode  :character  Median :77000   Median :2019  \n Mean   :3.50                                       Mean   :76667   Mean   :2019  \n 3rd Qu.:4.75                                       3rd Qu.:87000   3rd Qu.:2021  \n Max.   :6.00                                       Max.   :95000   Max.   :2022`},
     after:'str() tells you types and sample values. summary() shows statistical range. Together they reveal data quality issues before you start.'},
    {step:3,title:'Access Columns with $',
     explanation:`The <code>$</code> operator extracts a column as a vector. Use it for quick calculations on a single column.`,
     code:`# Extract salary column as a vector
salaries <- employees$salary
print(salaries)

# Calculate directly on the column
cat("\\nAverage salary:", mean(employees$salary), "\\n")
cat("Total payroll: $", sum(employees$salary), "\\n")
cat("Salary range:  $", min(employees$salary), "to $", max(employees$salary), "\\n")

# Show just names and departments
print(employees[, c("first_name", "department")])`,
     simulatedOutput:{type:'text',content:`[1] 72000 58000 65000 88000 95000 82000\n\nAverage salary: 76666.67 \nTotal payroll: $ 460000 \nSalary range:  $ 58000 to $ 95000 \n\n  first_name department\n1      Sarah      Sales\n2    Michael      Sales\n3      Emily  Marketing\n4      James         IT\n5       Lisa      Sales\n6     Carlos         IT`},
     note:'df[, c("col1","col2")] selects specific columns. The comma before c() means "all rows, these columns".',
     after:'You can access any column as a vector with $ and select multiple columns with [, c(...)].'  }
  ],
  challenge:{
    title:'Product Catalog Exploration',
    description:`Create a data frame called products with 5 rows: product_name (character), category (character), unit_price (numeric), stock_qty (integer). Then print: its dimensions, a str() summary, the mean unit_price, and the total stock_qty.`,
    hint:`Use data.frame(). Access columns with $. Use mean() and sum() on the extracted columns.`,
    starterCode:`# Create the products data frame
products <- data.frame(
  product_name = c("Laptop Pro", "Wireless Mouse", 'Monitor 27"', "Keyboard", "Webcam"),
  category     = c("Electronics", "Electronics", "Electronics", "Electronics", "Electronics"),
  unit_price   = c(1299.99, 29.99, 399.99, 129.99, 79.99),
  stock_qty    = c(45L, 230L, 62L, 95L, 118L),
  stringsAsFactors = FALSE
)

# Print dimensions


# Print structure


# Mean unit price


# Total stock
`,
    solution:`products <- data.frame(
  product_name = c("Laptop Pro", "Wireless Mouse", 'Monitor 27"', "Keyboard", "Webcam"),
  category     = c("Electronics", "Electronics", "Electronics", "Electronics", "Electronics"),
  unit_price   = c(1299.99, 29.99, 399.99, 129.99, 79.99),
  stock_qty    = c(45L, 230L, 62L, 95L, 118L),
  stringsAsFactors = FALSE
)

cat("Dimensions:", nrow(products), "rows x", ncol(products), "cols\\n")
str(products)
cat("\\nMean unit price: $", mean(products$unit_price), "\\n")
cat("Total stock:      ", sum(products$stock_qty), "units\\n")`,
    explanation:`data.frame() builds the table; str() reveals the structure and types; $ extracts each column for mean() and sum() to operate on.`,
    successMessage:`Data frame fundamentals complete! You can now load, inspect, and navigate any tabular dataset in R — the starting point of every real-world analysis.`
  },
  insight:`Data frames (and their tidyverse cousin, tibbles) are the backbone of R data analysis. Every ggplot chart, every dplyr pipeline, every statistical model in R starts with a data frame. You'll use this structure in every remaining lesson.`
},

{
  id:'r-basic-3', language:'r', level:'basic', order:3,
  title:'Filtering & Selecting with dplyr',
  duration:'25 min', xp:130,
  scenario:{
    company:'RetailCo Analytics',role:'Data Analyst',
    description:`Your Sales Director emails: "Can you pull just the Sales employees earning over $65,000? Also, I only need their names and salaries — not all the columns." In R, the dplyr package handles this with two clean, readable functions: filter() and select(). No brackets, no quotes around column names, just clear intent.`
  },
  objectives:[
    'Use dplyr::filter() to keep rows matching a condition',
    'Use dplyr::select() to choose columns',
    'Chain operations together with the pipe operator |>',
    'Combine multiple conditions in filter()'
  ],
  terminology:[
    {term:'dplyr',lang:'r',definition:'The tidyverse package for data manipulation. Provides grammar-like verbs: filter, select, mutate, arrange, summarise, group_by.',example:'library(dplyr)'},
    {term:'filter()',lang:'r',definition:'Keeps only rows where the condition is TRUE. Equivalent to SQL\'s WHERE clause.',example:'filter(df, salary > 70000)'},
    {term:'select()',lang:'r',definition:'Keeps only the specified columns. Equivalent to listing columns in SQL\'s SELECT.',example:'select(df, first_name, department, salary)'},
    {term:'|> (pipe)',lang:'r',definition:'The native R pipe (R 4.1+). Passes the result of the left side as the first argument to the right side. Reads as "then".',example:'df |> filter(dept=="Sales") |> select(name, salary)'},
    {term:'%>% (magrittr pipe)',lang:'r',definition:'The original tidyverse pipe from the magrittr package. Functionally identical to |>. You\'ll see both in the wild.',example:'df %>% filter(salary > 60000)'},
    {term:'&  |  !',lang:'r',definition:'Logical operators inside filter(): & means AND, | means OR, ! means NOT.',example:'filter(df, dept=="Sales" & salary > 70000)'},
    {term:'%in%',lang:'r',definition:'Tests if values are in a given vector — equivalent to SQL\'s IN operator.',example:'filter(df, state %in% c("TX","CA","NY"))'}
  ],
  theory:`<h3>The dplyr Grammar</h3>
<p>dplyr provides a consistent set of verbs for data manipulation. Each verb does one thing, does it clearly, and takes a data frame as its first argument — which makes piping natural.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>data |>           # start with data<br>  filter(...) |>  # keep matching rows<br>  select(...)     # keep matching columns</code></div></div>
<h3>The Pipe Operator</h3>
<p>The pipe <code>|&gt;</code> takes the output of one expression and feeds it into the next. This lets you build multi-step transformations that read top-to-bottom like a recipe, instead of nesting function calls inside each other.</p>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Read it aloud:</strong> <code>employees |&gt; filter(salary &gt; 70000)</code> = "Take employees, <em>then</em> filter to salary above 70k."</div></div>`,
  steps:[
    {step:1,title:'Filter Rows with filter()',
     explanation:`Load dplyr and use <code>filter()</code> to keep only rows matching a condition. Column names are unquoted inside dplyr verbs.`,
     code:`library(dplyr)

employees <- data.frame(
  first_name = c("Sarah","Michael","Emily","James","Lisa","Carlos"),
  department = c("Sales","Sales","Marketing","IT","Sales","IT"),
  salary     = c(72000, 58000, 65000, 88000, 95000, 82000),
  region     = c("East","West","East","Central","East","West"),
  stringsAsFactors = FALSE
)

# Filter to Sales department only
sales_team <- filter(employees, department == "Sales")
print(sales_team)`,
     simulatedOutput:{type:'dataframe',
       headers:['first_name','department','salary','region'],
       rows:[['Sarah','Sales',72000,'East'],['Michael','Sales',58000,'West'],['Lisa','Sales',95000,'East']]},
     note:'Inside dplyr verbs, column names are written without quotes — no df$ prefix needed.',
     after:'3 Sales employees returned. filter() evaluated the condition for every row and kept only TRUE results.'},
    {step:2,title:'Select Columns with select()',
     explanation:`Use <code>select()</code> to keep only the columns you need. You can also use <code>-column</code> to drop a column.`,
     code:`# Keep specific columns
employees |>
  select(first_name, department, salary)

# Drop a column with minus sign
employees |>
  select(-region)`,
     simulatedOutput:{type:'text',content:`  first_name department salary\n1      Sarah      Sales  72000\n2    Michael      Sales  58000\n3      Emily  Marketing  65000\n4      James         IT  88000\n5       Lisa      Sales  95000\n6     Carlos         IT  82000\n\n  first_name department salary\n1      Sarah      Sales  72000\n2    Michael      Sales  58000\n3      Emily  Marketing  65000\n4      James         IT  88000\n5       Lisa      Sales  95000\n6     Carlos         IT  82000`},
     after:'select() returns only the requested columns. Use - to exclude a column instead of listing all the ones you want.'},
    {step:3,title:'Chain with the Pipe |>',
     explanation:`Combine filter() and select() with the pipe to answer: "Show me names and salaries of Sales employees earning over $65,000."`,
     code:`result <- employees |>
  filter(department == "Sales", salary > 65000) |>
  select(first_name, salary)

print(result)

# Multiple conditions with OR — Sales OR IT
employees |>
  filter(department %in% c("Sales", "IT")) |>
  select(first_name, department, salary)`,
     simulatedOutput:{type:'text',content:`  first_name salary\n1      Sarah  72000\n2       Lisa  95000\n\n  first_name department salary\n1      Sarah      Sales  72000\n2    Michael      Sales  58000\n4      James         IT  88000\n5       Lisa      Sales  95000\n6     Carlos         IT  82000`},
     note:'Multiple arguments inside filter() are treated as AND conditions. Use %in% for "any of these values".',
     after:'The pipe chains two operations cleanly. The final output contains only the rows AND columns requested.'}
  ],
  challenge:{
    title:'Premium Customer Filter',
    description:`Using the customers data frame below, use dplyr to: filter to Premium customers in Texas or California, then select only first_name, last_name, state, and segment columns. Print the count of matching rows.`,
    hint:`filter(customers, segment == "Premium", state %in% c("TX","CA")) |> select(...)  Then use nrow() on the result.`,
    starterCode:`library(dplyr)

customers <- data.frame(
  first_name = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry"),
  last_name  = c("Kim","Smith","Johnson","Lee","Williams","Brown","Jones","Garcia"),
  state      = c("NY","CA","IL","TX","AZ","PA","TX","CA"),
  segment    = c("Premium","Standard","Premium","Standard","Basic","Standard","Basic","Premium"),
  total_orders = c(24, 8, 31, 5, 2, 12, 3, 42),
  stringsAsFactors = FALSE
)

# Filter and select
result <- customers |>
  filter( ) |>
  select( )

cat("Matching customers:", nrow(result), "\\n")
print(result)`,
    solution:`library(dplyr)

customers <- data.frame(
  first_name = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry"),
  last_name  = c("Kim","Smith","Johnson","Lee","Williams","Brown","Jones","Garcia"),
  state      = c("NY","CA","IL","TX","AZ","PA","TX","CA"),
  segment    = c("Premium","Standard","Premium","Standard","Basic","Standard","Basic","Premium"),
  total_orders = c(24, 8, 31, 5, 2, 12, 3, 42),
  stringsAsFactors = FALSE
)

result <- customers |>
  filter(segment == "Premium", state %in% c("TX", "CA")) |>
  select(first_name, last_name, state, segment)

cat("Matching customers:", nrow(result), "\\n")
print(result)`,
    explanation:`filter() with two arguments applies both as AND conditions. %in% c("TX","CA") is cleaner than state=="TX" | state=="CA". select() then trims the columns. nrow() counts the surviving rows.`,
    successMessage:`dplyr filter & select mastered! This pipe pattern — filter rows, then select columns — is the most-used operation in R data analysis.`
  },
  insight:`dplyr is downloaded over 10 million times a month and used by data teams at every major tech company, consultancy, and research institution that works with R. The filter-select-pipe pattern you just learned compresses what would be 10 lines of base R into 3 readable lines.`
},

{
  id:'r-basic-4', language:'r', level:'basic', order:4,
  title:'Summarising Data with dplyr',
  duration:'25 min', xp:140,
  scenario:{
    company:'RetailCo Analytics',role:'Data Analyst',
    description:`Your manager needs a department-level salary report: "How many people are in each department, what's the average salary, and what's the total payroll?" This is SQL\'s GROUP BY in R — and dplyr makes it even more readable with group_by() and summarise().`
  },
  objectives:[
    'Use group_by() to split data into groups',
    'Use summarise() to compute aggregate statistics per group',
    'Use mutate() to add calculated columns',
    'Use arrange() to sort results'
  ],
  terminology:[
    {term:'group_by()',lang:'r',definition:'Splits a data frame into groups by one or more columns. Subsequent operations (summarise, mutate) act within each group.',example:'df |> group_by(department)'},
    {term:'summarise()',lang:'r',definition:'Reduces each group to a single summary row. Equivalent to SQL\'s SELECT with aggregate functions + GROUP BY.',example:'df |> group_by(dept) |> summarise(avg_sal = mean(salary))'},
    {term:'mutate()',lang:'r',definition:'Adds new columns or modifies existing ones. Unlike summarise(), keeps all rows — each row gets a new computed value.',example:'df |> mutate(bonus = salary * 0.10)'},
    {term:'arrange()',lang:'r',definition:'Sorts rows by one or more columns. Use desc() for descending order.',example:'df |> arrange(desc(salary))'},
    {term:'n()',lang:'r',definition:'A special dplyr function used inside summarise() that counts the number of rows in each group.',example:'summarise(count = n())'},
    {term:'ungroup()',lang:'r',definition:'Removes grouping from a data frame. Best practice to call this after group_by()/summarise() to avoid unexpected grouped behaviour downstream.',example:'df |> group_by(x) |> summarise(n=n()) |> ungroup()'}
  ],
  theory:`<h3>group_by() + summarise() = SQL GROUP BY</h3>
<p>The pattern is always the same: first define the groups, then define what to compute within each group.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>data |><br>  group_by(column_to_group) |><br>  summarise(<br>    new_col = aggregate_function(column)<br>  )</code></div></div>
<h3>summarise() vs. mutate()</h3>
<p>They both create new columns, but with a key difference:</p>
<ul>
<li><strong>summarise()</strong> — collapses each group to ONE row. Use for totals, counts, means.</li>
<li><strong>mutate()</strong> — keeps ALL rows and adds a column. Use for calculated fields like bonuses, ratios, flags.</li>
</ul>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Analyst tip:</strong> Always call ungroup() after a group_by()/summarise() pipeline. Leaving a data frame grouped can cause subtle bugs in later operations.</div></div>`,
  steps:[
    {step:1,title:'Group and Summarise',
     explanation:`Use <code>group_by()</code> followed by <code>summarise()</code> to compute per-department statistics.`,
     code:`library(dplyr)

employees <- data.frame(
  first_name = c("Sarah","Michael","Emily","James","Lisa","Carlos","Priya","Tom"),
  department = c("Sales","Sales","Marketing","IT","Sales","IT","Marketing","HR"),
  salary     = c(72000,58000,65000,88000,95000,82000,71000,54000),
  hire_year  = c(2019,2021,2020,2018,2016,2022,2019,2020),
  stringsAsFactors = FALSE
)

dept_summary <- employees |>
  group_by(department) |>
  summarise(
    headcount    = n(),
    avg_salary   = mean(salary),
    total_payroll = sum(salary),
    max_salary   = max(salary)
  ) |>
  ungroup()

print(dept_summary)`,
     simulatedOutput:{type:'dataframe',
       headers:['department','headcount','avg_salary','total_payroll','max_salary'],
       rows:[['HR',1,54000,54000,54000],['IT',2,85000,170000,88000],['Marketing',2,68000,136000,71000],['Sales',3,75000,225000,95000]]},
     note:'summarise() produces one row per group. The result is automatically sorted alphabetically by the grouping column.',
     after:'Four departments, each collapsed to one summary row. This is the R equivalent of SQL\'s GROUP BY.'},
    {step:2,title:'Add a Calculated Column with mutate()',
     explanation:`<code>mutate()</code> adds a new column to every row without collapsing. Use it for row-level calculations like bonuses or year-on-year comparisons.`,
     code:`employees_with_bonus <- employees |>
  mutate(
    bonus        = salary * 0.10,
    total_comp   = salary + bonus,
    years_tenure = 2026 - hire_year
  )

employees_with_bonus |>
  select(first_name, department, salary, bonus, years_tenure) |>
  print()`,
     simulatedOutput:{type:'dataframe',
       headers:['first_name','department','salary','bonus','years_tenure'],
       rows:[['Sarah','Sales',72000,7200,7],['Michael','Sales',58000,5800,5],['Emily','Marketing',65000,6500,6],['James','IT',88000,8800,8],['Lisa','Sales',95000,9500,10],['Carlos','IT',82000,8200,4],['Priya','Marketing',71000,7100,7],['Tom','HR',54000,5400,6]]},
     after:'All 8 rows remain — mutate() never reduces rows. Each person has their own computed bonus and tenure values.'},
    {step:3,title:'Sort with arrange()',
     explanation:`Use <code>arrange()</code> to sort results. Wrap a column in <code>desc()</code> for descending order.`,
     code:`# Top earners first
employees |>
  mutate(bonus = salary * 0.10) |>
  select(first_name, department, salary, bonus) |>
  arrange(desc(salary))

# Department summary sorted by total payroll
employees |>
  group_by(department) |>
  summarise(headcount = n(), total_payroll = sum(salary)) |>
  ungroup() |>
  arrange(desc(total_payroll))`,
     simulatedOutput:{type:'text',content:`  first_name department salary  bonus\n1       Lisa      Sales  95000   9500\n2      James         IT  88000   8800\n3     Carlos         IT  82000   8200\n4      Sarah      Sales  72000   7200\n5      Priya  Marketing  71000   7100\n6      Emily  Marketing  65000   6500\n7    Michael      Sales  58000   5800\n8        Tom         HR  54000   5400\n\n  department headcount total_payroll\n1      Sales         3        225000\n2         IT         2        170000\n3  Marketing         2        136000\n4         HR         1         54000`},
     after:'arrange(desc()) sorts highest-to-lowest. The pipeline reads as a clear recipe: add column, select columns, then sort.'}
  ],
  challenge:{
    title:'Regional Sales Performance Report',
    description:`Using the sales data frame below, create a regional summary that shows: region, number of sales reps, average quota, total revenue, and average revenue-to-quota ratio. Sort by total_revenue descending.`,
    hint:`group_by(region) |> summarise(reps=n(), avg_quota=mean(quota), total_revenue=sum(revenue), avg_attainment=mean(revenue/quota)) |> arrange(desc(total_revenue))`,
    starterCode:`library(dplyr)

sales <- data.frame(
  rep_name = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry"),
  region   = c("East","West","East","Central","West","Central","East","West"),
  quota    = c(150000,120000,180000,100000,130000,110000,160000,125000),
  revenue  = c(162000,109000,195000,88000,141000,97000,178000,138000),
  stringsAsFactors = FALSE
)

regional_summary <- sales |>
  group_by( ) |>
  summarise(
    reps          = ,
    avg_quota     = ,
    total_revenue = ,
    avg_attainment =
  ) |>
  ungroup() |>
  arrange( )

print(regional_summary)`,
    solution:`library(dplyr)

sales <- data.frame(
  rep_name = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry"),
  region   = c("East","West","East","Central","West","Central","East","West"),
  quota    = c(150000,120000,180000,100000,130000,110000,160000,125000),
  revenue  = c(162000,109000,195000,88000,141000,97000,178000,138000),
  stringsAsFactors = FALSE
)

regional_summary <- sales |>
  group_by(region) |>
  summarise(
    reps           = n(),
    avg_quota      = mean(quota),
    total_revenue  = sum(revenue),
    avg_attainment = mean(revenue / quota)
  ) |>
  ungroup() |>
  arrange(desc(total_revenue))

print(regional_summary)`,
    explanation:`group_by(region) creates one group per region. n() counts reps, mean() and sum() aggregate the numeric columns, and revenue/quota is computed element-wise before mean() averages it. arrange(desc()) puts the top region first.`,
    successMessage:`dplyr grouping and summarising mastered! The group_by → summarise → arrange pipeline is the workhorse of R data analysis — you'll use this pattern in virtually every reporting task.`
  },
  insight:`dplyr's group_by/summarise pipeline is used by analysts at Airbnb, Booking.com, BBC, and thousands of research institutions. It's the R equivalent of the most common SQL pattern in existence — and many R analysts find it even clearer to read than SQL.`
}

,

/* ═══════════════════════════════════════════════
   INTERMEDIATE – Lessons 5-8
   ═══════════════════════════════════════════════ */
{
  id:'r-inter-1', language:'r', level:'intermediate', order:1,
  title:'Reshaping Data with tidyr — Wide vs. Long',
  duration:'25 min', xp:150,
  scenario:{
    company:'NovaTech Analytics',role:'Data Analyst',
    description:`Your manager sends quarterly revenue data in a spreadsheet where each quarter is its own column. "ggplot2 won't plot this directly," she says. "You need to reshape it into long format first." This is one of the most common data prep tasks in R — pivoting between wide and long format.`
  },
  objectives:[
    'Understand the difference between wide and long (tidy) data formats',
    'Use pivot_longer() to convert wide to long',
    'Use pivot_wider() to convert long to wide',
    'Know when each format is appropriate'
  ],
  terminology:[
    {term:'Wide format',lang:'r',definition:'Each subject occupies one row; repeated measurements appear as separate columns. Common in spreadsheets but hard to plot.',example:'Quarter | Q1    | Q2    | Q3\nEast   | 42000 | 48000 | 51000'},
    {term:'Long (tidy) format',lang:'r',definition:'Each observation occupies one row. Better for analysis and visualization in R. Required by ggplot2.',example:'region | quarter | revenue\nEast   | Q1      | 42000\nEast   | Q2      | 48000'},
    {term:'pivot_longer()',lang:'r',definition:'Converts wide to long. Takes a set of columns and stacks them into two new columns: one for names, one for values.',example:'df |> pivot_longer(cols=Q1:Q4, names_to="quarter", values_to="revenue")'},
    {term:'pivot_wider()',lang:'r',definition:'Converts long to wide. Spreads a key column into multiple columns, filling cells with a value column.',example:'df |> pivot_wider(names_from=quarter, values_from=revenue)'},
    {term:'cols=',lang:'r',definition:'Argument in pivot_longer() specifying which columns to pivot. Accepts ranges (Q1:Q4), helpers (starts_with()), or exclusions (-id).',example:'cols = Q1:Q4\ncols = starts_with("budget_")\ncols = -region'},
    {term:'names_prefix=',lang:'r',definition:'In pivot_longer(), strips a common prefix from old column names when forming the new names column.',example:'names_prefix = "budget_"  # "budget_Jan" → "Jan"'}
  ],
  theory:`<h3>Tidy Data: The Foundation of R Analysis</h3>
<p>Hadley Wickham's "tidy data" principle: each variable = one column, each observation = one row. Most R functions — especially ggplot2 — expect tidy (long) data.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>Wide:  region | Q1  | Q2  | Q3<br>       East   | 42k | 48k | 51k<br><br>Long:  region | quarter | revenue<br>       East   | Q1      | 42000<br>       East   | Q2      | 48000<br>       East   | Q3      | 51000</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Rule of thumb:</strong> If you find yourself writing the same formula across multiple columns in R, the data probably needs to be in long format first before you analyse it.</div></div>`,
  steps:[
    {step:1,title:'pivot_longer() — Wide to Long',
     explanation:`Start with quarterly sales in wide format — one column per quarter — then use pivot_longer() to stack them.`,
     code:`library(tidyr)
library(dplyr)

sales_wide <- data.frame(
  region = c("East","West","Central","South"),
  Q1     = c(42500, 38200, 31000, 27800),
  Q2     = c(48100, 41500, 34200, 29600),
  Q3     = c(51300, 44800, 37500, 32100),
  Q4     = c(58700, 52300, 43100, 38400),
  stringsAsFactors = FALSE
)

cat("--- Wide (4 rows) ---\n")
print(sales_wide)

sales_long <- sales_wide |>
  pivot_longer(
    cols      = Q1:Q4,
    names_to  = "quarter",
    values_to = "revenue"
  )

cat("\n--- Long (16 rows) ---\n")
print(sales_long)`,
     simulatedOutput:{type:'text',content:`--- Wide (4 rows) ---\n   region    Q1    Q2    Q3    Q4\n1    East 42500 48100 51300 58700\n2    West 38200 41500 44800 52300\n3 Central 31000 34200 37500 43100\n4   South 27800 29600 32100 38400\n\n--- Long (16 rows) ---\n# A tibble: 16 × 3\n   region  quarter revenue\n   <chr>   <chr>     <dbl>\n 1 East    Q1        42500\n 2 East    Q2        48100\n 3 East    Q3        51300\n 4 East    Q4        58700\n 5 West    Q1        38200\n 6 West    Q2        41500\n...`},
     note:'4 rows × 4 quarter columns → 16 rows × 3 columns. Each region-quarter combination becomes its own row.',
     after:'Long format is now ready for ggplot2, group_by(), and any other tidyverse operation that processes row-by-row.'},
    {step:2,title:'pivot_wider() — Long Back to Wide',
     explanation:`Use pivot_wider() to reverse the operation — useful for reports, cross-tabs, and Excel exports.`,
     code:`# Restore wide layout
sales_wide_again <- sales_long |>
  pivot_wider(
    names_from  = quarter,
    values_from = revenue
  )

print(sales_wide_again)

# The real power: aggregating on long data is trivial
sales_long |>
  group_by(region) |>
  summarise(annual_total = sum(revenue)) |>
  arrange(desc(annual_total))`,
     simulatedOutput:{type:'text',content:`# A tibble: 4 × 5\n  region     Q1    Q2    Q3    Q4\n  <chr>   <dbl> <dbl> <dbl> <dbl>\n1 Central 31000 34200 37500 43100\n2 East    42500 48100 51300 58700\n3 South   27800 29600 32100 38400\n4 West    38200 41500 44800 52300\n\n  region  annual_total\n  <chr>          <dbl>\n1 East          200600\n2 West          176800\n3 Central       145800\n4 South         127900`},
     after:'pivot_wider() restores the wide layout. Notice how easy the annual sum was on long data — one group_by + summarise instead of writing a formula for each quarter column.'},
    {step:3,title:'Strip Column Prefixes with names_prefix=',
     explanation:`Handle real-world wide data where column names share a common prefix.`,
     code:`budget_wide <- data.frame(
  dept       = c("Sales","Marketing","IT"),
  budget_Jan = c(50000, 30000, 40000),
  budget_Feb = c(52000, 31000, 41000),
  budget_Mar = c(55000, 29000, 43000),
  stringsAsFactors = FALSE
)

budget_long <- budget_wide |>
  pivot_longer(
    cols         = starts_with("budget_"),
    names_to     = "month",
    names_prefix = "budget_",
    values_to    = "budget"
  )

print(budget_long)`,
     simulatedOutput:{type:'text',content:`# A tibble: 9 × 3\n  dept      month  budget\n  <chr>     <chr>   <dbl>\n1 Sales     Jan     50000\n2 Sales     Feb     52000\n3 Sales     Mar     55000\n4 Marketing Jan     30000\n5 Marketing Feb     31000\n6 Marketing Mar     29000\n7 IT        Jan     40000\n8 IT        Feb     41000\n9 IT        Mar     43000`},
     note:'names_prefix= strips the "budget_" prefix automatically, leaving clean "Jan", "Feb", "Mar" in the month column.',
     after:'The prefix is stripped automatically. This handles the very common real-world pattern of column names like "rev_Q1", "rev_Q2" or "score_pre", "score_post".'}
  ],
  challenge:{
    title:'Reshape Employee Survey Results',
    description:`You have survey scores (1–5) across 4 dimensions for each employee in wide format. Reshape to long, then calculate the average score per employee across all dimensions. Show results sorted by avg_score descending.`,
    hint:`pivot_longer(cols = -employee_id, names_to="dimension", values_to="score") then group_by(employee_id) |> summarise(avg_score=mean(score)) |> arrange(desc(avg_score))`,
    starterCode:`library(tidyr)
library(dplyr)

survey <- data.frame(
  employee_id   = c(101, 102, 103, 104, 105),
  work_life     = c(4, 2, 5, 3, 4),
  management    = c(3, 3, 4, 2, 5),
  compensation  = c(5, 4, 3, 4, 4),
  growth        = c(4, 2, 4, 3, 5),
  stringsAsFactors = FALSE
)

# Pivot to long format
survey_long <- survey |>
  pivot_longer( )

# Average per employee
avg_scores <- survey_long |>
  group_by(employee_id) |>
  summarise( ) |>
  arrange( )

print(avg_scores)`,
    solution:`library(tidyr)
library(dplyr)

survey <- data.frame(
  employee_id   = c(101, 102, 103, 104, 105),
  work_life     = c(4, 2, 5, 3, 4),
  management    = c(3, 3, 4, 2, 5),
  compensation  = c(5, 4, 3, 4, 4),
  growth        = c(4, 2, 4, 3, 5),
  stringsAsFactors = FALSE
)

survey_long <- survey |>
  pivot_longer(
    cols      = -employee_id,
    names_to  = "dimension",
    values_to = "score"
  )

avg_scores <- survey_long |>
  group_by(employee_id) |>
  summarise(avg_score = round(mean(score), 2)) |>
  arrange(desc(avg_score))

print(avg_scores)`,
    explanation:`cols = -employee_id pivots everything except employee_id. Each employee now has 4 rows (one per dimension). group_by + summarise collapses back to one row per employee with their mean score. arrange(desc()) puts the most satisfied employee first.`,
    successMessage:`Data reshaping mastered! pivot_longer and pivot_wider are used in virtually every R pipeline that handles time series, survey results, or any spreadsheet-exported data.`
  },
  insight:`tidyr's pivot functions replaced the older gather()/spread() functions in 2019. The tidy data principles behind them — introduced by Hadley Wickham in 2014 — are now the standard framework for data analysis in R and have influenced data tools far beyond R itself.`
},

{
  id:'r-inter-2', language:'r', level:'intermediate', order:2,
  title:'Data Visualization with ggplot2',
  duration:'30 min', xp:160,
  scenario:{
    company:'NovaTech Analytics',role:'Data Analyst',
    description:`"Can you create a chart showing average salary per department?" Your manager doesn't want a table — she wants a visualization. ggplot2 is R's most powerful plotting library. Built on the Grammar of Graphics, it produces professional charts with clean, layered code that scales from a quick EDA plot to a publication-ready figure.`
  },
  objectives:[
    'Understand the Grammar of Graphics: data + aesthetics + geoms',
    'Build bar charts with geom_col()',
    'Build scatter plots with geom_point()',
    'Build line charts with geom_line()',
    'Customize with labs() and theme_minimal()'
  ],
  terminology:[
    {term:'ggplot()',lang:'r',definition:'Initializes a ggplot object. Takes the data frame and optional default aesthetics. Layers are added with +.',example:'ggplot(data=df, aes(x=dept, y=salary))'},
    {term:'aes()',lang:'r',definition:'Aesthetic mapping — maps data columns to visual properties: x, y, color, fill, size, shape, alpha.',example:'aes(x=quarter, y=revenue, fill=region)'},
    {term:'geom_col()',lang:'r',definition:'Bar chart where bar heights come from the data directly. Use geom_bar() when you want R to count rows automatically.',example:'geom_col(fill="#2ab5a0", width=0.6)'},
    {term:'geom_point()',lang:'r',definition:'Scatter plot — one point per observation. Use size= and alpha= to handle dense data.',example:'geom_point(size=3, alpha=0.8)'},
    {term:'geom_line()',lang:'r',definition:'Line chart. Requires group= aesthetic when multiple lines are drawn from repeated x values.',example:'geom_line(aes(group=region), linewidth=1.2)'},
    {term:'labs()',lang:'r',definition:'Sets all plot labels: title, subtitle, x, y, caption, colour, fill.',example:'labs(title="Sales Trend", x="Quarter", y="Revenue ($)")'},
    {term:'theme_minimal()',lang:'r',definition:'Removes the grey panel background. One of several built-in themes. Others: theme_bw(), theme_classic(), theme_void().',example:'+ theme_minimal()'},
    {term:'reorder()',lang:'r',definition:'Reorders the levels of a factor by the values of another variable — used to sort bars in a chart.',example:'aes(x = reorder(dept, avg_salary))'}
  ],
  theory:`<h3>The Grammar of Graphics</h3>
<p>ggplot2 builds charts in layers: start with data, map columns to aesthetics (x, y, color), then add geometric objects (bars, points, lines). Every chart — no matter how complex — follows the same grammar.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>ggplot(data, aes(x, y, color/fill)) +<br>  geom_TYPE() +<br>  labs(title, x, y) +<br>  theme_()</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>geom_col() vs geom_bar():</strong> Use geom_col() when your data already has the computed bar heights (e.g., from a summarise()). Use geom_bar() when you want R to COUNT rows for you (stat="count" is the default).</div></div>`,
  steps:[
    {step:1,title:'Bar Chart with geom_col()',
     explanation:`Compute department averages with dplyr, then pass the result to ggplot2. Use reorder() to sort bars by value.`,
     code:`library(ggplot2)
library(dplyr)

employees <- data.frame(
  first_name = c("Sarah","Michael","Emily","James","Lisa","Carlos","Priya","Tom"),
  department = c("Sales","Sales","Marketing","IT","Sales","IT","Marketing","HR"),
  salary     = c(72000,58000,65000,88000,95000,82000,71000,54000),
  stringsAsFactors = FALSE
)

dept_avg <- employees |>
  group_by(department) |>
  summarise(avg_salary = mean(salary)) |>
  ungroup()

ggplot(dept_avg, aes(x = reorder(department, avg_salary), y = avg_salary)) +
  geom_col(fill = "#2ab5a0", width = 0.6) +
  labs(
    title    = "Average Salary by Department",
    subtitle = "NovaTech Analytics — 2026",
    x        = "Department",
    y        = "Average Salary ($)"
  ) +
  theme_minimal()`,
     simulatedOutput:{type:'text',content:`# [ggplot2 bar chart rendered in RStudio Plots pane]\n#\n# Average Salary by Department\n# NovaTech Analytics — 2026\n# ─────────────────────────────────────────\n#  IT         ████████████████████████  $85,000\n#  Sales      ████████████████████      $75,000\n#  Marketing  ████████████████          $68,000\n#  HR         ████████████              $54,000\n# ─────────────────────────────────────────\n# Bars sorted by avg_salary | theme_minimal() applied`},
     note:'reorder(department, avg_salary) sorts bars by salary value, not alphabetically. Sorted bar charts are almost always clearer for ranked comparisons.',
     after:'Sorted bar chart — IT is the highest-paid department. The pipe from dplyr into ggplot2 is a standard pattern: aggregate first, then visualize.'},
    {step:2,title:'Scatter Plot with geom_point()',
     explanation:`Plot salary vs. hire year for each employee, colored by department.`,
     code:`employees_full <- data.frame(
  first_name = c("Sarah","Michael","Emily","James","Lisa","Carlos","Priya","Tom"),
  department = c("Sales","Sales","Marketing","IT","Sales","IT","Marketing","HR"),
  salary     = c(72000,58000,65000,88000,95000,82000,71000,54000),
  hire_year  = c(2019,2021,2020,2018,2016,2022,2019,2020),
  stringsAsFactors = FALSE
)

ggplot(employees_full, aes(x = hire_year, y = salary, color = department)) +
  geom_point(size = 4, alpha = 0.85) +
  labs(
    title  = "Salary vs. Hire Year",
    x      = "Hire Year",
    y      = "Salary ($)",
    color  = "Department"
  ) +
  theme_minimal()`,
     simulatedOutput:{type:'text',content:`# [ggplot2 scatter plot rendered in RStudio Plots pane]\n#\n# Salary vs. Hire Year\n# ──────────────────────────────────────────────────────\n# Each point = one employee, coloured by department:\n#   ● IT (teal):        James 2018/$88k, Carlos 2022/$82k\n#   ● Marketing (blue): Emily 2020/$65k, Priya 2019/$71k\n#   ● Sales (orange):   Lisa 2016/$95k, Sarah 2019/$72k\n#                       Michael 2021/$58k\n#   ● HR (pink):        Tom 2020/$54k\n# ──────────────────────────────────────────────────────\n# alpha=0.85 reduces overplotting on nearby points`},
     note:'alpha= controls transparency (0 = invisible, 1 = fully opaque). Use it whenever points might overlap.',
     after:'The scatter reveals that the longest-tenured Sales employee (Lisa) earns the most. IT salaries are high regardless of hire year.'},
    {step:3,title:'Line Chart for Trends with geom_line()',
     explanation:`Track regional revenue across quarters. The group= aesthetic is required to draw one line per region.`,
     code:`quarterly <- data.frame(
  region  = rep(c("East","West","Central"), each=4),
  quarter = rep(c("Q1","Q2","Q3","Q4"), 3),
  revenue = c(42500,48100,51300,58700,
              38200,41500,44800,52300,
              31000,34200,37500,43100),
  stringsAsFactors = FALSE
)

ggplot(quarterly, aes(x = quarter, y = revenue,
                      color = region, group = region)) +
  geom_line(linewidth = 1.2) +
  geom_point(size = 3) +
  labs(
    title = "Quarterly Revenue by Region",
    x     = "Quarter",
    y     = "Revenue ($)",
    color = "Region"
  ) +
  theme_minimal()`,
     simulatedOutput:{type:'text',content:`# [ggplot2 line chart rendered in RStudio Plots pane]\n#\n# Quarterly Revenue by Region\n# ──────────────────────────────────────────\n#  $60k ─                              ●East\n#  $52k ─                         ●  ●West\n#  $43k ─                    ● ●   \n#  $37k ─               ●   ●  ●Central\n#  $31k ─          ● ●  ●                    \n#         Q1   Q2   Q3   Q4\n# ─────────────────────────────────────────\n# All regions trend upward Q1 → Q4`},
     note:'group=region is required for line charts with multiple series. Without it ggplot2 does not know which points to connect and draws a jagged zigzag.',
     after:'Three rising trend lines. This is why pivot_longer() matters: ggplot2 needs one row per data point and a column to map to the color/group aesthetic.'}
  ],
  challenge:{
    title:'Sales Rep Performance Charts',
    description:`Using the sales rep data below: (1) Create a bar chart of total revenue by region (use group_by + summarise first, sorted by revenue). (2) Create a scatter plot of quota vs. revenue coloured by region — add a dashed diagonal geom_abline(slope=1, intercept=0) as a "beat-quota" reference line. Use theme_minimal() and proper labels on both.`,
    hint:`Bar: group_by(region) |> summarise(total=sum(revenue)) → geom_col(). Scatter: ggplot(sales, aes(x=quota, y=revenue, color=region)) + geom_point() + geom_abline(slope=1, intercept=0, linetype="dashed")`,
    starterCode:`library(ggplot2)
library(dplyr)

sales <- data.frame(
  rep_name = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry"),
  region   = c("East","West","East","Central","West","Central","East","West"),
  quota    = c(150000,120000,180000,100000,130000,110000,160000,125000),
  revenue  = c(162000,109000,195000,88000,141000,97000,178000,138000),
  stringsAsFactors = FALSE
)

# Bar chart: total revenue by region

# Scatter plot: quota vs revenue`,
    solution:`library(ggplot2)
library(dplyr)

sales <- data.frame(
  rep_name = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry"),
  region   = c("East","West","East","Central","West","Central","East","West"),
  quota    = c(150000,120000,180000,100000,130000,110000,160000,125000),
  revenue  = c(162000,109000,195000,88000,141000,97000,178000,138000),
  stringsAsFactors = FALSE
)

region_totals <- sales |>
  group_by(region) |>
  summarise(total_revenue = sum(revenue)) |>
  ungroup()

ggplot(region_totals, aes(x = reorder(region, total_revenue), y = total_revenue)) +
  geom_col(fill = "#2ab5a0") +
  labs(title="Total Revenue by Region", x="Region", y="Revenue ($)") +
  theme_minimal()

ggplot(sales, aes(x = quota, y = revenue, color = region)) +
  geom_point(size = 4) +
  geom_abline(slope=1, intercept=0, linetype="dashed", color="grey50") +
  labs(title="Quota vs. Revenue by Rep", x="Quota ($)", y="Revenue ($)", color="Region") +
  theme_minimal()`,
    explanation:`The bar chart uses pre-aggregated data. The scatter uses raw data with color=region. geom_abline(slope=1, intercept=0) draws the diagonal "break-even" line — reps plotted above it beat quota, below it missed.`,
    successMessage:`ggplot2 basics complete! The Grammar of Graphics scales to any chart type — heatmaps, facets, boxplots — all follow the same ggplot() + geom_() + labs() + theme_() pattern.`
  },
  insight:`ggplot2 is cited in over 10,000 academic papers per year and is the standard visualization library for R. The BBC, FiveThirtyEight, The Economist, and hundreds of research institutions publish ggplot2 charts. Learning it opens the door to publication-quality data storytelling.`
},

{
  id:'r-inter-3', language:'r', level:'intermediate', order:3,
  title:'Joining Data Frames — dplyr Join Verbs',
  duration:'25 min', xp:150,
  scenario:{
    company:'NovaTech Analytics',role:'Data Analyst',
    description:`Two datasets land on your desk: one has employee details, the other has department budgets. "I need to see each employee alongside their department's budget," your manager says. In R, dplyr's join verbs combine data frames on matching keys — the same logic as SQL JOINs, but with cleaner pipe-friendly syntax.`
  },
  objectives:[
    'Use left_join() as your default join verb',
    'Understand inner_join(), full_join(), and anti_join()',
    'Handle mismatched key column names with by=c()',
    'Use anti_join() for data quality checks'
  ],
  terminology:[
    {term:'left_join()',lang:'r',definition:'Returns all rows from the left data frame plus matching columns from the right. Non-matching left rows get NA; unmatched right rows are dropped.',example:'left_join(employees, departments, by="dept_id")'},
    {term:'inner_join()',lang:'r',definition:'Returns only rows where the key exists in BOTH data frames. Non-matching rows from either side are silently dropped.',example:'inner_join(orders, customers, by="customer_id")'},
    {term:'full_join()',lang:'r',definition:'Returns all rows from both data frames. NAs are inserted wherever there is no match on either side.',example:'full_join(df1, df2, by="id")'},
    {term:'anti_join()',lang:'r',definition:'Returns rows from the left data frame that have NO match in the right. Essential for finding orphaned or unlinked records.',example:'anti_join(employees, assignments, by="employee_id")'},
    {term:'by=',lang:'r',definition:'Specifies the join key(s). When column names differ between tables, use a named vector: by=c("left_col"="right_col").',example:'left_join(x, y, by=c("emp_id"="id"))'},
    {term:'suffix=',lang:'r',definition:'When non-key columns share the same name in both tables, suffix= disambiguates them in the result.',example:'left_join(x, y, by="id", suffix=c("_emp","_mgr"))'}
  ],
  theory:`<h3>dplyr Joins = SQL JOINs</h3>
<p>The four dplyr join verbs map directly to SQL:</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>left_join()  → LEFT JOIN         (most common)<br>inner_join() → INNER JOIN        (strict match)<br>full_join()  → FULL OUTER JOIN<br>anti_join()  → WHERE NOT EXISTS</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Default to left_join().</strong> inner_join() silently drops unmatched rows — a common source of data loss bugs. Use left_join() and inspect the NAs to understand your data before deciding to drop rows.</div></div>`,
  steps:[
    {step:1,title:'left_join() — The Standard Join',
     explanation:`Combine employee records with department details. Every employee row is preserved; matching department data is attached.`,
     code:`library(dplyr)

employees <- data.frame(
  name    = c("Sarah","Michael","Emily","James","Lisa","Carlos"),
  dept_id = c(1, 1, 2, 3, 1, 3),
  salary  = c(72000,58000,65000,88000,95000,82000),
  stringsAsFactors = FALSE
)

departments <- data.frame(
  dept_id   = c(1, 2, 3, 4),
  dept_name = c("Sales","Marketing","IT","HR"),
  budget    = c(500000,300000,450000,150000),
  stringsAsFactors = FALSE
)

result <- left_join(employees, departments, by = "dept_id")
print(result)`,
     simulatedOutput:{type:'dataframe',
       headers:['name','dept_id','salary','dept_name','budget'],
       rows:[['Sarah',1,72000,'Sales',500000],['Michael',1,58000,'Sales',500000],['Emily',2,65000,'Marketing',300000],['James',3,88000,'IT',450000],['Lisa',1,95000,'Sales',500000],['Carlos',3,82000,'IT',450000]]},
     note:'HR (dept_id=4) exists in departments but has no employees — it is excluded because we kept the left (employees) side.',
     after:'All 6 employees are present with dept_name and budget attached. Sales employees all share the same $500k budget value from their one matching department row.'},
    {step:2,title:'anti_join() for Data Quality',
     explanation:`anti_join() returns left-table rows with no match in the right — the fastest way to find broken foreign keys or missing records.`,
     code:`# Simulate an employee with an invalid department ID
employees_bad <- bind_rows(
  employees,
  data.frame(name="Unknown", dept_id=99, salary=60000,
             stringsAsFactors=FALSE)
)

# inner_join drops the orphan silently
inner_result <- inner_join(employees_bad, departments, by="dept_id")
cat("inner_join rows:", nrow(inner_result),
    "(orphan silently dropped)\n\n")

# anti_join surfaces the problem
orphans <- anti_join(employees_bad, departments, by="dept_id")
cat("Records with no matching department:\n")
print(orphans)`,
     simulatedOutput:{type:'text',content:`inner_join rows: 6 (orphan silently dropped)\n\nRecords with no matching department:\n     name dept_id salary\n1 Unknown      99  60000`},
     after:'inner_join silently lost row 7. anti_join found it. Always run anti_join to audit your join keys before using inner_join on production data.'},
    {step:3,title:'Join on Different Column Names',
     explanation:`Real datasets rarely share the same key column name. Use a named vector in by= to map them.`,
     code:`orders <- data.frame(
  order_id    = c(1001,1002,1003,1004),
  customer_id = c(5, 7, 5, 9),
  amount      = c(250,480,130,310),
  stringsAsFactors = FALSE
)

customers <- data.frame(
  id         = c(5, 7, 8),      # "id" not "customer_id"
  first_name = c("Alice","Bob","Carol"),
  segment    = c("Premium","Standard","Premium"),
  stringsAsFactors = FALSE
)

enriched <- left_join(orders, customers,
                      by = c("customer_id" = "id"))
print(enriched)`,
     simulatedOutput:{type:'dataframe',
       headers:['order_id','customer_id','amount','first_name','segment'],
       rows:[[1001,5,250,'Alice','Premium'],[1002,7,480,'Bob','Standard'],[1003,5,130,'Alice','Premium'],[1004,9,310,null,null]]},
     note:'Order 1004 (customer_id=9) has no match — left_join returns NA for first_name and segment. This is a data gap worth investigating.',
     after:'The c("left_col"="right_col") syntax handles any column name mismatch. The NA rows immediately flag missing customer records.'}
  ],
  challenge:{
    title:'Employee–Project Assignment Report',
    description:`left_join the employees and assignments tables on employee_id. Then: (1) count how many project assignments each employee has, (2) use anti_join to find employees with NO assignments.`,
    hint:`left_join(employees, assignments) → group_by(employee_id, name) → summarise(projects=sum(!is.na(project_name))). anti_join(employees, assignments) finds the unassigned.`,
    starterCode:`library(dplyr)

employees <- data.frame(
  employee_id = c(1,2,3,4,5),
  name        = c("Sarah","Mike","Emily","James","Lisa"),
  department  = c("Sales","IT","Marketing","IT","Sales"),
  stringsAsFactors = FALSE
)

assignments <- data.frame(
  employee_id  = c(1,1,2,3,2),
  project_name = c("Alpha","Beta","Beta","Gamma","Delta"),
  stringsAsFactors = FALSE
)

# Project count per employee

# Employees with no assignments`,
    solution:`library(dplyr)

employees <- data.frame(
  employee_id = c(1,2,3,4,5),
  name        = c("Sarah","Mike","Emily","James","Lisa"),
  department  = c("Sales","IT","Marketing","IT","Sales"),
  stringsAsFactors = FALSE
)

assignments <- data.frame(
  employee_id  = c(1,1,2,3,2),
  project_name = c("Alpha","Beta","Beta","Gamma","Delta"),
  stringsAsFactors = FALSE
)

project_counts <- left_join(employees, assignments, by="employee_id") |>
  group_by(employee_id, name) |>
  summarise(projects = sum(!is.na(project_name)), .groups="drop") |>
  arrange(desc(projects))

cat("Project counts:\n")
print(project_counts)

unassigned <- anti_join(employees, assignments, by="employee_id")
cat("\nEmployees with no assignments:\n")
print(unassigned)`,
    explanation:`left_join keeps all employees; sum(!is.na(project_name)) counts only real assignments (NAs come from unmatched employees). anti_join returns the two employees absent from the assignments table entirely.`,
    successMessage:`dplyr joins mastered! left_join is your everyday workhorse; anti_join is your data quality superpower. Together they handle virtually every real-world data combination task in R.`
  },
  insight:`dplyr's join verbs are used in every R data pipeline that combines tables — analytics at Airbnb, clinical data linkage in hospitals, financial data joins at banks. Unlike SQL joins, they return a data frame immediately ready for the next pipe step.`
},

{
  id:'r-inter-4', language:'r', level:'intermediate', order:4,
  title:'Strings & Dates — stringr and lubridate',
  duration:'25 min', xp:150,
  scenario:{
    company:'NovaTech Analytics',role:'Data Analyst',
    description:`The HR CSV export arrives with problems: hire dates stored as "15/03/2019" text, trailing spaces in names, and mixed department capitalisation. "I need employee tenure calculated from these dates," your manager says. stringr cleans the strings; lubridate parses the dates and does the math.`
  },
  objectives:[
    'Clean and transform strings with stringr functions',
    'Parse date strings into Date objects with lubridate',
    'Calculate durations (tenure in years) with interval() and time_length()',
    'Chain string and date operations in a dplyr mutate() pipeline'
  ],
  terminology:[
    {term:'stringr',lang:'r',definition:'tidyverse package for string manipulation. All functions begin with str_. Vectorized and pipe-compatible.',example:'library(stringr)'},
    {term:'str_trim()',lang:'r',definition:'Removes leading and trailing whitespace.',example:'str_trim("  Sales  ")  # "Sales"'},
    {term:'str_to_title()',lang:'r',definition:'Converts string to title case (first letter of each word capitalised).',example:'str_to_title("john smith")  # "John Smith"'},
    {term:'str_detect()',lang:'r',definition:'Returns TRUE/FALSE — does the string match the pattern? Useful inside filter().',example:'str_detect(dept, "^Sales")  # starts with Sales'},
    {term:'str_replace_all()',lang:'r',definition:'Replaces all pattern matches in a string. Use a character class [abc] to match multiple literals at once.',example:'str_replace_all("$72,000", "[$,]", "")  # "72000"'},
    {term:'lubridate',lang:'r',definition:'tidyverse package for dates and times. Parsing functions are named after the order of components in the input string.',example:'library(lubridate)'},
    {term:'dmy() / ymd() / mdy()',lang:'r',definition:'Parses date strings into R Date objects. Match the function name to the order in your string: dmy("15/03/2019").',example:'dmy("15/03/2019")  # Date: 2019-03-15\nymd("2019-03-15")  # same result'},
    {term:'time_length(interval())',lang:'r',definition:'Calculates the duration between two dates in a specified unit (years, months, days).',example:'time_length(interval(hire_date, today()), "years")'}
  ],
  theory:`<h3>Two Packages, One Pipeline</h3>
<p>stringr and lubridate follow the same tidyverse design — consistent naming, vectorized, pipe-friendly. Combined with dplyr's mutate(), they handle virtually every text and date cleaning task in one readable pass.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>df |><br>  mutate(<br>    name      = str_to_title(str_trim(raw_name)),<br>    hire_date = dmy(hire_raw),<br>    tenure    = time_length(interval(hire_date, today()), "years")<br>  )</code></div></div>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Date parsing order matters:</strong> "15/03/2019" is day/month/year → use dmy(). "2019-03-15" is year/month/day → use ymd(). Using the wrong function shifts every date by months and corrupts all downstream calculations.</div></div>`,
  steps:[
    {step:1,title:'String Cleaning with stringr',
     explanation:`Clean names and salary strings from a messy HR export in one mutate() call.`,
     code:`library(stringr)
library(dplyr)

raw <- data.frame(
  raw_name   = c("  sarah kim  ","MICHAEL SMITH","emily johnson"," James LEE"),
  raw_dept   = c(" sales ","IT","marketing","IT "),
  raw_salary = c("$72,000","$88,500","$65,000","$91,200"),
  stringsAsFactors = FALSE
)

cleaned <- raw |>
  mutate(
    name   = str_to_title(str_trim(raw_name)),
    dept   = str_to_title(str_trim(raw_dept)),
    salary = as.numeric(str_replace_all(raw_salary, "[$,]", ""))
  ) |>
  select(name, dept, salary)

print(cleaned)`,
     simulatedOutput:{type:'dataframe',
       headers:['name','dept','salary'],
       rows:[['Sarah Kim','Sales',72000],['Michael Smith','IT',88500],['Emily Johnson','Marketing',65000],['James Lee','IT',91200]]},
     note:'str_replace_all with pattern "[$,]" removes both $ and , simultaneously using a character class. as.numeric() then converts the clean string to a number.',
     after:'All four employees normalised in one mutate(). str_to_title handles mixed case; str_trim removes whitespace; str_replace_all strips currency formatting.'},
    {step:2,title:'Parsing Dates with lubridate',
     explanation:`Convert date strings into proper Date objects, then extract year, month, and quarter components.`,
     code:`library(lubridate)

dates_raw <- data.frame(
  name     = c("Sarah","Michael","Emily","James"),
  hire_raw = c("15/03/2019","01/07/2021","10/01/2020","20/11/2018"),
  stringsAsFactors = FALSE
)

parsed <- dates_raw |>
  mutate(
    hire_date  = dmy(hire_raw),
    hire_year  = year(hire_date),
    hire_month = month(hire_date, label = TRUE),
    hire_qtr   = quarter(hire_date)
  ) |>
  select(name, hire_date, hire_year, hire_month, hire_qtr)

print(parsed)`,
     simulatedOutput:{type:'dataframe',
       headers:['name','hire_date','hire_year','hire_month','hire_qtr'],
       rows:[['Sarah','2019-03-15',2019,'Mar',1],['Michael','2021-07-01',2021,'Jul',3],['Emily','2020-01-10',2020,'Jan',1],['James','2018-11-20',2018,'Nov',4]]},
     note:'The Date object "2019-03-15" can be sorted, filtered, and used in arithmetic. The raw string "15/03/2019" cannot.',
     after:'Dates are now proper R Date objects. You can sort by hire_date, filter before/after a cutoff, and do date arithmetic — none of which worked on the raw text strings.'},
    {step:3,title:'Calculate Tenure with interval()',
     explanation:`Use interval() and time_length() to compute each employee's exact tenure from hire date to a reference date.`,
     code:`hire_data <- data.frame(
  name      = c("Sarah","Michael","Emily","James","Lisa"),
  hire_date = ymd(c("2019-03-15","2021-07-01",
                    "2020-01-10","2018-11-20","2016-05-12")),
  stringsAsFactors = FALSE
)

ref_date <- ymd("2026-05-02")   # use today() in live scripts

tenure <- hire_data |>
  mutate(
    tenure_yrs = round(
      time_length(interval(hire_date, ref_date), "years"), 1)
  ) |>
  arrange(desc(tenure_yrs))

print(tenure)`,
     simulatedOutput:{type:'dataframe',
       headers:['name','hire_date','tenure_yrs'],
       rows:[['Lisa','2016-05-12',10.0],['James','2018-11-20',7.5],['Sarah','2019-03-15',7.1],['Emily','2020-01-10',6.3],['Michael','2021-07-01',4.8]]},
     note:'Use ymd("2026-05-02") for reproducible scripts. In interactive work, replace with today() so the calculation updates automatically.',
     after:'Lisa has 10 years tenure; Michael has 4.8. Because we used interval(), the calculation handles leap years and month-length differences correctly.'}
  ],
  challenge:{
    title:'Employee Data Quality Audit',
    description:`Given a messy employee export with names in raw_name (extra spaces, wrong case), hire dates in raw_hire (dd-mm-yyyy format), and salary as "$XX,XXX" strings — clean all three columns, calculate tenure in years as of 2026-05-02, then filter to employees hired before 2020 with tenure over 6 years.`,
    hint:`str_to_title(str_trim()) for name; dmy() for date; str_replace_all(raw_salary,"[$,]","") for salary; time_length(interval(hire_date, ymd("2026-05-02")),"years") for tenure. Filter: hire_date < ymd("2020-01-01") & tenure_years > 6`,
    starterCode:`library(dplyr); library(stringr); library(lubridate)

raw <- data.frame(
  raw_name  = c(" alice BROWN ","BOB smith","  Carol WHITE","david GREEN "),
  raw_hire  = c("12-04-2017","05-08-2021","20-01-2019","15-09-2016"),
  raw_salary= c("$68,000","$55,500","$72,000","$81,000"),
  stringsAsFactors = FALSE
)

cleaned <- raw |>
  mutate(
    name         = ,
    hire_date    = ,
    salary       = ,
    tenure_years =
  )

# Filter: hired before 2020 AND tenure > 6 years
senior <- cleaned |>
  filter( ) |>
  select(name, hire_date, salary, tenure_years)

print(senior)`,
    solution:`library(dplyr); library(stringr); library(lubridate)

raw <- data.frame(
  raw_name  = c(" alice BROWN ","BOB smith","  Carol WHITE","david GREEN "),
  raw_hire  = c("12-04-2017","05-08-2021","20-01-2019","15-09-2016"),
  raw_salary= c("$68,000","$55,500","$72,000","$81,000"),
  stringsAsFactors = FALSE
)

cleaned <- raw |>
  mutate(
    name         = str_to_title(str_trim(raw_name)),
    hire_date    = dmy(raw_hire),
    salary       = as.numeric(str_replace_all(raw_salary, "[$,]", "")),
    tenure_years = round(
      time_length(interval(hire_date, ymd("2026-05-02")), "years"), 1)
  )

senior <- cleaned |>
  filter(hire_date < ymd("2020-01-01"), tenure_years > 6) |>
  select(name, hire_date, salary, tenure_years)

print(senior)`,
    explanation:`Each mutate() step addresses exactly one cleaning task. dmy() handles the "dd-mm-yyyy" dash-separated format. str_replace_all with a character class removes both $ and , in a single call. The filter chains two conditions to identify senior employees.`,
    successMessage:`String and date mastery complete! stringr + lubridate in a dplyr pipeline is the standard pattern for cleaning real-world exports — messy dates and dirty text are the #1 source of preparation time in analytics.`
  },
  insight:`lubridate and stringr are among the most downloaded R packages on CRAN. Real-world data is almost always messy — dates as text, numbers with currency symbols, inconsistent casing. These two packages turn what used to be hours of cleanup into 5 readable lines of mutate().`
}

,

/* ═══════════════════════════════════════════════
   ADVANCED – Lessons 9-12
   ═══════════════════════════════════════════════ */
{
  id:'r-adv-1', language:'r', level:'advanced', order:1,
  title:'Linear Regression with lm()',
  duration:'30 min', xp:180,
  scenario:{
    company:'NovaTech Analytics',role:'Senior Data Analyst',
    description:`The Head of Sales asks: "Can you model what drives our reps' revenue? We think quota size, region, and tenure are the main factors." Linear regression with R's built-in lm() function lets you quantify exactly how much each variable drives the outcome — and whether the relationship is statistically significant.`
  },
  objectives:[
    'Fit a linear regression model with lm()',
    'Interpret summary() output: coefficients, p-values, R-squared',
    'Use predict() to generate predictions on new data',
    'Check model assumptions with diagnostic plots'
  ],
  terminology:[
    {term:'lm()',lang:'r',definition:'Fits a linear regression model. Takes a formula (outcome ~ predictors) and a data frame.',example:'model <- lm(revenue ~ quota + tenure, data = sales)'},
    {term:'Formula syntax (~)',lang:'r',definition:'R\'s formula notation: response ~ predictor1 + predictor2. The tilde separates the outcome (left) from the predictors (right).',example:'salary ~ years_exp + department + education'},
    {term:'summary(model)',lang:'r',definition:'Prints coefficients, standard errors, t-values, p-values, R-squared, and F-statistic for the fitted model.',example:'summary(model)'},
    {term:'Coefficient',lang:'r',definition:'The estimated change in the outcome for a one-unit increase in a predictor, holding all other predictors constant.',example:'quota coef = 0.92 → each $1 increase in quota → $0.92 more revenue'},
    {term:'p-value',lang:'r',definition:'Probability of observing the coefficient by chance if the true effect were zero. p < 0.05 = statistically significant at the 5% level.',example:'Pr(>|t|) < 0.05 → significant predictor'},
    {term:'R-squared',lang:'r',definition:'Proportion of variance in the outcome explained by the model. Values closer to 1 are better.',example:'R² = 0.78 → model explains 78% of revenue variation'},
    {term:'predict()',lang:'r',definition:'Generates predicted outcome values using a fitted model—either for the training data or for new observations in a new data frame.',example:'predict(model, newdata = data.frame(quota=150000, tenure=3))'},
    {term:'confint()',lang:'r',definition:'Returns 95% confidence intervals for each coefficient in the model.',example:'confint(model)'}
  ],
  theory:`<h3>When to Use Linear Regression</h3>
<p>Linear regression answers: "Holding everything else constant, how much does each predictor move the outcome?" It's used for salary modelling, revenue forecasting, price elasticity, and any continuous numeric outcome.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>revenue = β₀ + β₁·quota + β₂·tenure + ε<br><br>lm() estimates β₀, β₁, β₂ from the data.<br>summary() tells you if each β is significant.</code></div></div>
<h3>Reading summary() Output</h3>
<ul>
<li><strong>Estimate</strong> — the coefficient value</li>
<li><strong>Pr(&gt;|t|)</strong> — p-value: *** = p&lt;0.001, ** = p&lt;0.01, * = p&lt;0.05</li>
<li><strong>Multiple R-squared</strong> — overall explanatory power</li>
<li><strong>F-statistic p-value</strong> — is the whole model significant?</li>
</ul>
<div class="callout callout-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Correlation ≠ causation.</strong> A significant coefficient means the variable is associated with the outcome in your data — it does not prove that changing the predictor <em>causes</em> a change in the outcome.</div></div>`,
  steps:[
    {step:1,title:'Fit and Inspect a Linear Model',
     explanation:`Build a model predicting revenue from quota size and years of tenure. summary() gives the full statistical report.`,
     code:`sales <- data.frame(
  rep_name = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry",
               "Ivan","Julia","Kim","Leo"),
  quota    = c(150,120,180,100,130,110,160,125,140,175,95,165) * 1000,
  tenure   = c(5,2,8,1,4,3,7,3,6,9,1,5),
  revenue  = c(162,109,195,88,141,97,178,138,152,188,82,179) * 1000
)

model <- lm(revenue ~ quota + tenure, data = sales)
summary(model)`,
     simulatedOutput:{type:'text',content:`Call:\nlm(formula = revenue ~ quota + tenure, data = sales)\n\nResiduals:\n    Min      1Q  Median      3Q     Max \n-8245   -3102     412    2890    7634 \n\nCoefficients:\n             Estimate Std. Error t value Pr(>|t|)    \n(Intercept) 1.24e+04  9.84e+03    1.26   0.2365    \nquota        8.87e-01  7.21e-02   12.30  1.3e-07 ***\ntenure       2.18e+03  8.34e+02    2.61   0.0271 *  \n---\nSignif. codes: 0 '***' 0.001 '**' 0.01 '*' 0.05\n\nResidual standard error: 4891 on 9 degrees of freedom\nMultiple R-squared:  0.9521,  Adjusted R-squared:  0.9415 \nF-statistic: 89.8 on 2 and 9 DF,  p-value: 9.77e-07`},
     note:'*** means p < 0.001 — extremely unlikely to be zero. The quota coefficient of 0.887 means each $1 more quota is associated with $0.887 more revenue.',
     after:'R-squared = 0.952 — quota and tenure explain 95.2% of the variation in revenue. Both predictors are significant. The model fits well.'},
    {step:2,title:'Predict on New Data',
     explanation:`Use predict() with a new data frame to estimate revenue for hypothetical reps.`,
     code:`new_reps <- data.frame(
  quota  = c(145000, 200000, 90000),
  tenure = c(4, 10, 1)
)

predictions <- predict(model, newdata = new_reps,
                       interval = "prediction", level = 0.95)

result <- cbind(new_reps, round(predictions, 0))
colnames(result)[3:5] <- c("predicted", "lower_95", "upper_95")
print(result)`,
     simulatedOutput:{type:'dataframe',
       headers:['quota','tenure','predicted','lower_95','upper_95'],
       rows:[[145000,4,156408,144621,168195],[200000,10,214592,200841,228343],[90000,1,107218,93702,120734]]},
     note:'interval="prediction" gives the 95% range for an individual new observation — wider than a confidence interval for the mean.',
     after:'The model predicts $214k revenue for a rep with a $200k quota and 10 years tenure. The prediction interval is the honest range around that estimate.'},
    {step:3,title:'Confidence Intervals for Coefficients',
     explanation:`confint() reveals the 95% range for each coefficient — more informative than just the point estimate.`,
     code:`cat("--- Coefficient Estimates ---\n")
coef(model)

cat("\n--- 95% Confidence Intervals ---\n")
confint(model)

# Tidy version with broom (if available)
# library(broom)
# tidy(model, conf.int = TRUE)`,
     simulatedOutput:{type:'text',content:`--- Coefficient Estimates ---\n(Intercept)       quota      tenure \n 1.24e+04    8.87e-01  2.18e+03 \n\n--- 95% Confidence Intervals ---\n                  2.5 %      97.5 %\n(Intercept) -1.01e+04   3.50e+04\nquota        7.26e-01   1.05e+00\ntenure       3.06e+02   4.06e+03`},
     note:'The quota interval (0.726, 1.051) does not include 0 — confirming significance. For every $1 increase in quota, revenue increases somewhere between $0.73 and $1.05.',
     after:'Confidence intervals are the most honest way to communicate regression results. Always report them alongside point estimates when presenting to stakeholders.'}
  ],
  challenge:{
    title:'Salary Regression Model',
    description:`Using the employees data frame, fit a linear model: salary ~ years_experience + education_years + department (where department is a character column — R will automatically create dummy variables). Interpret the output and predict salary for a new employee with 5 years experience, 16 years education, in the "Sales" department.`,
    hint:`model <- lm(salary ~ years_exp + edu_yrs + department, data=df). predict(model, newdata=data.frame(years_exp=5, edu_yrs=16, department="Sales"))`,
    starterCode:`employees <- data.frame(
  years_exp  = c(2,5,8,3,10,1,7,4,6,9),
  edu_yrs    = c(16,18,16,18,20,16,18,16,20,18),
  department = c("Sales","IT","Sales","Marketing","IT",
                 "Sales","Marketing","IT","Sales","IT"),
  salary     = c(52000,78000,68000,61000,105000,
                 48000,72000,65000,88000,98000),
  stringsAsFactors = FALSE
)

# Fit model: salary ~ years_exp + edu_yrs + department
model <- lm( , data = employees)
summary(model)

# Predict for new employee
new_emp <- data.frame(years_exp=5, edu_yrs=16, department="Sales")
predict(model, newdata = new_emp)`,
    solution:`employees <- data.frame(
  years_exp  = c(2,5,8,3,10,1,7,4,6,9),
  edu_yrs    = c(16,18,16,18,20,16,18,16,20,18),
  department = c("Sales","IT","Sales","Marketing","IT",
                 "Sales","Marketing","IT","Sales","IT"),
  salary     = c(52000,78000,68000,61000,105000,
                 48000,72000,65000,88000,98000),
  stringsAsFactors = FALSE
)

model <- lm(salary ~ years_exp + edu_yrs + department, data = employees)
summary(model)

new_emp <- data.frame(years_exp=5, edu_yrs=16, department="Sales")
cat("\nPredicted salary: $", round(predict(model, newdata=new_emp), 0), "\n")
cat("95% prediction interval:\n")
print(round(predict(model, newdata=new_emp, interval="prediction"), 0))`,
    explanation:`When department (a character column) is included in lm(), R automatically creates binary dummy variables — one per level except the baseline. summary() shows the salary premium for IT and Marketing relative to Sales. predict() then uses all coefficients to produce the estimate.`,
    successMessage:`Linear regression complete! lm() and summary() are the foundation of quantitative analysis in R — used from academic research to pricing models at tech companies.`
  },
  insight:`R's lm() is one of the most-run functions in statistical computing. It underpins salary benchmarking at HR analytics firms, A/B test analysis at tech companies, price elasticity models in retail, and clinical dose-response modelling in pharma.`
},

{
  id:'r-adv-2', language:'r', level:'advanced', order:2,
  title:'Window Functions & Advanced dplyr',
  duration:'30 min', xp:180,
  scenario:{
    company:'NovaTech Analytics',role:'Senior Data Analyst',
    description:`"I need each rep ranked within their region, their revenue compared to the prior month, and a running total of cumulative revenue for the year." These are window function calculations — they operate across rows without collapsing them, giving you context for each row relative to its group.`
  },
  objectives:[
    'Use row_number(), rank(), and dense_rank() for ranking within groups',
    'Use lag() and lead() to compare to adjacent rows',
    'Use cumsum() and cummean() for running calculations',
    'Use across() to apply functions to multiple columns at once'
  ],
  terminology:[
    {term:'row_number()',lang:'r',definition:'Assigns sequential integers within each group after group_by(). Ties are broken by position.',example:'mutate(rank = row_number(desc(revenue)))'},
    {term:'dense_rank()',lang:'r',definition:'Like rank() but no gaps in ranking sequence when there are ties. 1,2,2,3 instead of 1,2,2,4.',example:'mutate(rank = dense_rank(desc(revenue)))'},
    {term:'lag() / lead()',lang:'r',definition:'Shifts a vector back (lag) or forward (lead) by n positions within the group. Essential for period-over-period comparisons.',example:'mutate(mom_growth = revenue - lag(revenue))'},
    {term:'cumsum()',lang:'r',definition:'Running cumulative sum. Each row gets the total of all rows up to and including itself.',example:'mutate(running_total = cumsum(revenue))'},
    {term:'cummean()',lang:'r',definition:'Running cumulative mean. Useful for tracking rolling averages as time progresses.',example:'mutate(running_avg = cummean(revenue))'},
    {term:'across()',lang:'r',definition:'Applies a function (or list of functions) to multiple columns at once inside mutate() or summarise().',example:'summarise(across(where(is.numeric), mean))'},
    {term:'ntile()',lang:'r',definition:'Assigns rows to n equal-sized buckets (quantile bins). ntile(score, 4) creates quartiles 1-4.',example:'mutate(quartile = ntile(revenue, 4))'}
  ],
  theory:`<h3>Window Functions vs. Aggregation</h3>
<p>The key difference: grouped summarise() <em>collapses</em> rows to one per group. Window functions via group_by() + mutate() keep ALL rows and add a new computed column drawing on the group context.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>group_by() + summarise()  →  collapses rows<br>group_by() + mutate()     →  keeps all rows,<br>                              adds context column</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>Always arrange() before lag().</strong> lag() looks at the physically previous row — if your data isn't sorted by date/period, you'll compare to the wrong row and get silent wrong answers.</div></div>`,
  steps:[
    {step:1,title:'Ranking within Groups',
     explanation:`Rank each sales rep within their region by revenue descending. group_by() + mutate(row_number()) is the recipe.`,
     code:`library(dplyr)

sales <- data.frame(
  rep      = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry"),
  region   = c("East","West","East","Central","West","Central","East","West"),
  revenue  = c(162000,109000,195000,88000,141000,97000,178000,138000),
  stringsAsFactors = FALSE
)

ranked <- sales |>
  group_by(region) |>
  mutate(
    region_rank  = row_number(desc(revenue)),
    pct_of_total = round(revenue / sum(revenue) * 100, 1)
  ) |>
  ungroup() |>
  arrange(region, region_rank)

print(ranked)`,
     simulatedOutput:{type:'dataframe',
       headers:['rep','region','revenue','region_rank','pct_of_total'],
       rows:[['David','Central',88000,2,47.6],['Frank','Central',97000,1,52.4],['Carol','East',195000,1,36.3],['Grace','East',178000,2,33.1],['Alice','East',162000,3,30.2],['Bob','West',109000,3,27.9],['Eva','West',141000,2,36.1],['Henry','West',138000,3,35.3]]},
     note:'pct_of_total uses sum(revenue) within each group — so it sums only the region\'s revenue, not the whole dataset.',
     after:'Frank is rank 1 in Central; Carol is rank 1 in East. Each row retains its identity while gaining regional context.'},
    {step:2,title:'Period-over-Period with lag()',
     explanation:`Calculate month-over-month revenue growth. arrange() first ensures lag() compares to the correct prior month.`,
     code:`monthly <- data.frame(
  month   = 1:6,
  revenue = c(42500, 45200, 43800, 51300, 55100, 58700)
)

growth <- monthly |>
  arrange(month) |>
  mutate(
    prev_revenue = lag(revenue),
    mom_change   = revenue - lag(revenue),
    mom_pct      = round((revenue / lag(revenue) - 1) * 100, 1)
  )

print(growth)`,
     simulatedOutput:{type:'dataframe',
       headers:['month','revenue','prev_revenue','mom_change','mom_pct'],
       rows:[[1,42500,null,null,null],[2,45200,42500,2700,6.4],[3,43800,45200,-1400,-3.1],[4,51300,43800,7500,17.1],[5,55100,51300,3800,7.4],[6,58700,55100,3600,6.5]]},
     note:'Row 1 has NA for lag values — there is no "previous month" for the first record. This is expected and correct.',
     after:'Month 4 had the sharpest jump (+17.1%). Month 3 was the only decline. These insights required no loops — just lag() and arithmetic.'},
    {step:3,title:'Running Totals and across()',
     explanation:`Add a cumulative revenue column, then use across() to compute mean and max of all numeric columns at once.`,
     code:`# Running totals
monthly |>
  mutate(
    running_total = cumsum(revenue),
    running_avg   = round(cummean(revenue), 0)
  ) |>
  print()

# across() — summarise multiple columns at once
sales |>
  group_by(region) |>
  summarise(across(where(is.numeric),
                   list(mean=mean, max=max),
                   .names="{.col}_{.fn}")) |>
  ungroup()`,
     simulatedOutput:{type:'text',content:`  month revenue running_total running_avg\n1     1   42500         42500       42500\n2     2   45200         87700       43850\n3     3   43800        131500       43833\n4     4   51300        182800       45700\n5     5   55100        237900       47580\n6     6   58700        296600       49433\n\n  region  revenue_mean revenue_max\n  <chr>          <dbl>       <dbl>\n1 Central        92500       97000\n2 East           178333     195000\n3 West           129333     141000`},
     note:'across(where(is.numeric)) selects all numeric columns automatically. {.col}_{.fn} creates names like "revenue_mean" and "revenue_max".',
     after:'cumsum() builds up the year-to-date total row by row. across() replaced three separate summarise() calls with one line that scales to any number of numeric columns.'}
  ],
  challenge:{
    title:'Sales Rep Quartile Ranking and Trend',
    description:`Using the 12-rep sales dataset from lesson 9-1 (quota, tenure, revenue), add three columns: (1) revenue quartile using ntile(4), (2) revenue as a % of individual quota, (3) rank within their ntile bucket by revenue. Then summarise the average revenue and attainment per quartile.`,
    hint:`mutate(quartile=ntile(revenue,4), attainment=round(revenue/quota*100,1)) then group_by(quartile) |> mutate(rank_in_quartile=row_number(desc(revenue))) |> ungroup(). Summarise: group_by(quartile) |> summarise(avg_rev=mean(revenue), avg_attainment=mean(attainment))`,
    starterCode:`library(dplyr)

sales <- data.frame(
  rep_name = c("Alice","Bob","Carol","David","Eva","Frank",
               "Grace","Henry","Ivan","Julia","Kim","Leo"),
  quota    = c(150,120,180,100,130,110,160,125,140,175,95,165)*1000,
  revenue  = c(162,109,195,88,141,97,178,138,152,188,82,179)*1000,
  stringsAsFactors = FALSE
)

# Add quartile, attainment %, and rank within quartile
enriched <- sales |>
  mutate(
    quartile         = ,
    attainment       = ,
    rank_in_quartile =
  )

# Summarise per quartile
quartile_summary <- enriched |>
  group_by( ) |>
  summarise( )

print(quartile_summary)`,
    solution:`library(dplyr)

sales <- data.frame(
  rep_name = c("Alice","Bob","Carol","David","Eva","Frank",
               "Grace","Henry","Ivan","Julia","Kim","Leo"),
  quota    = c(150,120,180,100,130,110,160,125,140,175,95,165)*1000,
  revenue  = c(162,109,195,88,141,97,178,138,152,188,82,179)*1000,
  stringsAsFactors = FALSE
)

enriched <- sales |>
  mutate(
    quartile   = ntile(revenue, 4),
    attainment = round(revenue / quota * 100, 1)
  ) |>
  group_by(quartile) |>
  mutate(rank_in_quartile = row_number(desc(revenue))) |>
  ungroup()

quartile_summary <- enriched |>
  group_by(quartile) |>
  summarise(
    reps             = n(),
    avg_revenue      = mean(revenue),
    avg_attainment   = mean(attainment)
  ) |>
  ungroup()

print(quartile_summary)`,
    explanation:`ntile(revenue, 4) assigns quartile buckets (1=bottom 25%, 4=top 25%). The second group_by/mutate adds the within-quartile rank. The final summarise collapses each quartile to stats, showing that top-quartile reps both earn more and attain higher against quota.`,
    successMessage:`Window functions mastered! row_number(), lag(), cumsum(), and ntile() in group_by → mutate pipelines are the R equivalent of SQL window functions — used in every serious analytics pipeline.`
  },
  insight:`Window functions are what separate junior analysts from senior ones. lag() for year-on-year comparisons, ntile() for percentile segmentation, cumsum() for running totals — these patterns appear in financial reporting at every major investment bank, in SaaS metrics dashboards, and in clinical trial interim analyses.`
},

{
  id:'r-adv-3', language:'r', level:'advanced', order:3,
  title:'Writing Functions & purrr Iteration',
  duration:'30 min', xp:180,
  scenario:{
    company:'NovaTech Analytics',role:'Senior Data Analyst',
    description:`"I need this same sales summary report run separately for each of our 5 regions," your manager says. You could copy-paste the pipeline 5 times — or write one function and apply it to all regions in two lines with purrr. Functions and iteration are what make R code maintainable and scalable.`
  },
  objectives:[
    'Write reusable functions with function()',
    'Use purrr::map() to apply a function to a list',
    'Use map_dfr() to combine results into one data frame',
    'Handle errors gracefully with safely() and possibly()'
  ],
  terminology:[
    {term:'function()',lang:'r',definition:'Defines a reusable block of code. The last evaluated expression is returned automatically, or use return() explicitly.',example:'summarise_region <- function(df) {\n  df |> summarise(mean_rev=mean(revenue))\n}'},
    {term:'default arguments',lang:'r',definition:'Function parameters can have defaults — used when the caller does not supply a value.',example:'growth_rate <- function(x, base=100) { (x/base - 1) * 100 }'},
    {term:'purrr',lang:'r',definition:'tidyverse package for functional iteration. Replaces most for-loops with clean, type-safe map() calls.',example:'library(purrr)'},
    {term:'map()',lang:'r',definition:'Applies a function to each element of a list (or vector) and returns a list of results.',example:'map(regions_list, summarise_region)'},
    {term:'map_dfr()',lang:'r',definition:'Like map() but row-binds all results into a single data frame. "_dfr" = data frame by rows.',example:'map_dfr(region_names, ~ filter(df, region==.x) |> my_fn())'},
    {term:'~',lang:'r',definition:'Creates an anonymous (lambda) function inside purrr. .x refers to the current element.',example:'map(1:3, ~ .x * 2)  # same as map(1:3, function(x) x*2)'},
    {term:'walk()',lang:'r',definition:'Like map() but called for side effects (printing, saving files) rather than return values. Returns the input invisibly.',example:'walk(plots_list, print)'},
    {term:'safely()',lang:'r',definition:'Wraps a function so it never throws an error — returns a list with $result and $error instead.',example:'safe_read <- safely(read.csv)'}
  ],
  theory:`<h3>DRY: Don\'t Repeat Yourself</h3>
<p>If you write the same pipeline more than twice, extract it into a function. Functions make code testable, readable, and easy to change — update the function once and every call benefits.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code># Instead of 5 copy-pasted pipelines:<br>for_each_region <- function(region_name, data) {<br>&nbsp;&nbsp;data |><br>&nbsp;&nbsp;  filter(region == region_name) |><br>&nbsp;&nbsp;  summarise(avg = mean(revenue))<br>}<br><br>map_dfr(unique_regions, for_each_region, data=sales)</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div><strong>map() vs for-loop:</strong> Both iterate, but map() is functional — it works inside pipes, returns a value, and makes the intent clearer. Use map() when you want the results; use walk() when the result is a side effect (saving a file, printing).</div></div>`,
  steps:[
    {step:1,title:'Write a Reusable Function',
     explanation:`Extract a repeated dplyr pipeline into a named function. Test it on one subset before scaling.`,
     code:`library(dplyr)

sales <- data.frame(
  rep      = c("Alice","Bob","Carol","David","Eva","Frank","Grace","Henry"),
  region   = c("East","West","East","Central","West","Central","East","West"),
  quota    = c(150,120,180,100,130,110,160,125) * 1000,
  revenue  = c(162,109,195,88,141,97,178,138) * 1000,
  stringsAsFactors = FALSE
)

# Define the function
region_report <- function(df, region_name) {
  df |>
    filter(region == region_name) |>
    summarise(
      region        = region_name,
      reps          = n(),
      avg_revenue   = mean(revenue),
      total_revenue = sum(revenue),
      attainment    = mean(revenue / quota) * 100
    )
}

# Test on one region
region_report(sales, "East")`,
     simulatedOutput:{type:'dataframe',
       headers:['region','reps','avg_revenue','total_revenue','attainment'],
       rows:[['East',3,178333,535000,107.2]]},
     note:'The function takes df and region_name as arguments. Testing on one region first confirms it works before scaling.',
     after:'The function works for East. Now instead of copy-pasting this pipeline for West and Central, we\'ll use purrr to run it for all regions in two lines.'},
    {step:2,title:'Scale with purrr::map_dfr()',
     explanation:`Use map_dfr() to apply the function to every region and automatically combine the results into one data frame.`,
     code:`library(purrr)

regions <- unique(sales$region)
cat("Regions:", regions, "\n\n")

# Apply function to every region, row-bind results
all_regions <- map_dfr(regions, region_report, df = sales)
print(all_regions)

# Equivalent with anonymous function
all_regions2 <- map_dfr(regions, ~ region_report(sales, .x))
print(all_regions2)`,
     simulatedOutput:{type:'text',content:`Regions: East West Central \n\n  region reps avg_revenue total_revenue attainment\n1   East    3      178333        535000      107.2\n2   West    3      129333        388000      106.3\n3   Central 2       92500        185000       90.2`},
     note:'.x is purrr\'s placeholder for the current element in the anonymous function ~. Both calls produce identical results.',
     after:'Three regions, three reports, zero copy-paste. Add a fourth region to the data and it appears automatically — the function handles it.'},
    {step:3,title:'Error Handling with safely()',
     explanation:`When applying a function to many inputs, one failure shouldn\'t crash the whole job. safely() wraps any function to capture errors without stopping execution.`,
     code:`# Simulate a function that can fail on bad input
compute_growth <- function(region_name, data) {
  subset <- data |> filter(region == region_name)
  if (nrow(subset) == 0) stop(paste("No data for region:", region_name))
  mean(subset$revenue)
}

test_regions <- c("East", "West", "NonExistent", "Central")

# Without safely() — one bad input kills everything
safe_growth <- safely(compute_growth)

results <- map(test_regions, safe_growth, data = sales)

# Extract successes and errors separately
successes <- map_dfr(seq_along(results), function(i) {
  if (!is.null(results[[i]]$result))
    data.frame(region=test_regions[i], mean_rev=results[[i]]$result)
})

errors <- keep(results, ~ !is.null(.x$error)) |>
  map_chr(~ .x$error$message)

cat("Successes:\n"); print(successes)
cat("\nErrors caught:\n"); print(errors)`,
     simulatedOutput:{type:'text',content:`Successes:\n   region mean_rev\n1    East   178333\n2    West   129333\n3 Central    92500\n\nErrors caught:\n[1] "No data for region: NonExistent"`},
     note:'Without safely(), the "NonExistent" error would have stopped the entire map() call and you\'d lose results for Central. safely() lets the loop finish.',
     after:'Three regions succeeded; one failed with a clear error message. In production pipelines — reading files, calling APIs — safely() is the difference between a job that always finishes and one that randomly crashes.'}
  ],
  challenge:{
    title:'Automated Quartile Report per Department',
    description:`Write a function department_summary(df, dept_name) that filters to one department and returns: dept_name, headcount, mean salary, median salary, and the top earner\'s name and salary. Then use map_dfr() to run it for all departments in the employees data frame.`,
    hint:`function(df, dept) { df |> filter(department==dept) |> summarise(dept=dept, n=n(), mean_sal=mean(salary), median_sal=median(salary), top_name=first_name[which.max(salary)], top_sal=max(salary)) }. map_dfr(unique(df$department), dept_summary, df=employees)`,
    starterCode:`library(dplyr)
library(purrr)

employees <- data.frame(
  first_name = c("Sarah","Mike","Emily","James","Lisa","Carlos","Priya","Tom"),
  department = c("Sales","IT","Marketing","IT","Sales","IT","Marketing","HR"),
  salary     = c(72000,88000,65000,95000,82000,78000,71000,54000),
  stringsAsFactors = FALSE
)

# Write the function
department_summary <- function(df, dept_name) {

}

# Apply to all departments
all_depts <- map_dfr( )

print(all_depts)`,
    solution:`library(dplyr)
library(purrr)

employees <- data.frame(
  first_name = c("Sarah","Mike","Emily","James","Lisa","Carlos","Priya","Tom"),
  department = c("Sales","IT","Marketing","IT","Sales","IT","Marketing","HR"),
  salary     = c(72000,88000,65000,95000,82000,78000,71000,54000),
  stringsAsFactors = FALSE
)

department_summary <- function(df, dept_name) {
  df |>
    filter(department == dept_name) |>
    summarise(
      dept       = dept_name,
      headcount  = n(),
      mean_sal   = mean(salary),
      median_sal = median(salary),
      top_name   = first_name[which.max(salary)],
      top_sal    = max(salary)
    )
}

all_depts <- map_dfr(unique(employees$department),
                     department_summary, df = employees)

print(all_depts)`,
    explanation:`which.max(salary) returns the index of the maximum salary row; using it to index first_name retrieves the top earner's name. map_dfr runs the function for each unique department and stacks all results automatically.`,
    successMessage:`Functions and purrr mastered! Writing functions + map_dfr() is the R pattern for anything you'd otherwise copy-paste: region reports, cohort analyses, model fitting across segments — all reduced to two lines.`
  },
  insight:`purrr's map family is used in production R code at RStudio/Posit, every major consultancy, and data-heavy startups. The pattern replaces for-loops throughout the tidyverse — and safely()/possibly() are how experienced engineers ensure long-running pipelines don't silently fail.`
},

{
  id:'r-adv-4', language:'r', level:'advanced', order:4,
  title:'Logistic Regression & Model Comparison',
  duration:'35 min', xp:200,
  scenario:{
    company:'NovaTech Analytics',role:'Senior Data Analyst',
    description:`The CFO asks: "Which customers are most likely to churn next quarter? Can you build a model to score them?" This is a classification problem — the outcome is binary (churned: yes/no). Logistic regression with glm() is R's standard tool, and you'll learn to compare models with AIC and ROC analysis.`
  },
  objectives:[
    'Fit a logistic regression with glm(family=binomial)',
    'Interpret log-odds coefficients and convert to odds ratios',
    'Evaluate model performance with confusion matrix and accuracy',
    'Compare models using AIC and the likelihood ratio test'
  ],
  terminology:[
    {term:'glm()',lang:'r',definition:'Generalised Linear Model. With family=binomial, fits logistic regression for binary outcomes.',example:'model <- glm(churned ~ tenure + spend, data=df, family=binomial)'},
    {term:'family=binomial',lang:'r',definition:'Specifies the logistic regression link function. binomial(link="logit") is the default — models log-odds of the outcome.',example:'glm(y ~ x, family=binomial)'},
    {term:'Log-odds',lang:'r',definition:'The raw coefficient from logistic regression. exp(coef) converts it to an odds ratio.',example:'coef = 0.45 → OR = exp(0.45) = 1.57'},
    {term:'Odds Ratio',lang:'r',definition:'exp(coefficient). OR > 1 means higher predictor → higher probability of outcome; OR < 1 means lower probability.',example:'exp(coef(model))'},
    {term:'fitted() / predict(type="response")',lang:'r',definition:'Returns the predicted probability (0-1) for each observation. Use type="response" to get probabilities instead of log-odds.',example:'probs <- predict(model, type="response")'},
    {term:'Confusion matrix',lang:'r',definition:'A 2×2 table comparing predicted vs. actual class labels. Used to compute accuracy, precision, and recall.',example:'table(predicted, actual)'},
    {term:'AIC',lang:'r',definition:'Akaike Information Criterion. Lower AIC = better model. Used to compare non-nested models — penalises complexity.',example:'AIC(model1, model2)'},
    {term:'ROC / AUC',lang:'r',definition:'Receiver Operating Characteristic curve. Area Under Curve (AUC) measures discrimination ability: 0.5=random, 0.8+=good.',example:'library(pROC); auc(roc(actual, probs))'}
  ],
  theory:`<h3>Logistic Regression: Classification in R</h3>
<p>When the outcome is binary (0/1, yes/no, churned/retained), ordinary linear regression produces predictions outside [0,1]. Logistic regression constrains predictions to a valid probability via the logit link function.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>model <- glm(churned ~ tenure + monthly_spend + complaints,<br>             data = customers,<br>             family = binomial)<br><br>probs  <- predict(model, type = "response")<br>preds  <- ifelse(probs > 0.5, 1, 0)</code></div></div>
<h3>Log-Odds vs. Odds Ratios</h3>
<p>glm() returns log-odds coefficients. To communicate results to business stakeholders, always convert to odds ratios using exp():</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>exp(coef(model))<br># tenure OR = 0.82 → each extra year reduces churn odds by 18%<br># complaints OR = 2.1 → each complaint doubles churn odds</code></div></div>`,
  steps:[
    {step:1,title:'Fit a Logistic Regression',
     explanation:`Predict customer churn from tenure, monthly spend, and number of support complaints.`,
     code:`customers <- data.frame(
  tenure     = c(5,1,8,2,10,3,7,1,4,9,2,6,1,8,3),
  spend      = c(120,45,200,60,250,80,180,40,100,220,55,160,48,195,75),
  complaints = c(0,3,1,2,0,1,0,4,1,0,3,0,2,1,2),
  churned    = c(0,1,0,1,0,1,0,1,0,0,1,0,1,0,1)
)

model <- glm(churned ~ tenure + spend + complaints,
             data = customers, family = binomial)

summary(model)`,
     simulatedOutput:{type:'text',content:`Call:\nglm(formula = churned ~ tenure + spend + complaints,\n    family = binomial, data = customers)\n\nCoefficients:\n              Estimate Std. Error z value Pr(>|z|)   \n(Intercept)  -1.8423     1.4521  -1.269   0.2044   \ntenure       -0.5124     0.2218  -2.311   0.0209 * \nspend        -0.0148     0.0093  -1.591   0.1116   \ncomplaints    1.8842     0.6931   2.719   0.0065 **\n---\nNull deviance: 20.727  on 14  degrees of freedom\nResidual deviance:  8.413  on 11  degrees of freedom\nAIC: 16.413\n\n(Dispersion parameter for binomial family taken to be 1)`,},
     note:'z value and Pr(>|z|) instead of t value — logistic uses a Wald test. Tenure (p=0.021) and complaints (p=0.007) are significant churn drivers; spend is not.',
     after:'Model fitted. tenure has a significant negative coefficient (longer tenure = lower churn odds). complaints has a strong positive coefficient (more complaints = higher churn odds).'},
    {step:2,title:'Odds Ratios and Predictions',
     explanation:`Convert coefficients to odds ratios for presentation, then score customers with predicted churn probabilities.`,
     code:`# Odds ratios with 95% confidence intervals
or_table <- cbind(
  OR    = round(exp(coef(model)), 3),
  round(exp(confint(model)), 3)
)
cat("Odds Ratios:\n")
print(or_table)

# Predicted probabilities
customers$churn_prob  <- round(predict(model, type="response"), 3)
customers$churn_pred  <- ifelse(customers$churn_prob > 0.5, 1, 0)

# Confusion matrix
cat("\nConfusion Matrix:\n")
print(table(Predicted=customers$churn_pred,
            Actual=customers$churned))

accuracy <- mean(customers$churn_pred == customers$churned)
cat("Accuracy:", round(accuracy * 100, 1), "%\n")`,
     simulatedOutput:{type:'text',content:`Odds Ratios:\n               OR  2.5 % 97.5 %\n(Intercept) 0.158  0.008  2.921\ntenure       0.599  0.381  0.896\nspend        0.985  0.967  1.002\ncomplaints   6.580  2.281 31.847\n\nConfusion Matrix:\n         Actual\nPredicted 0 1\n        0 7 1\n        1 1 6\n\nAccuracy: 86.7 %`},
     note:'Complaints OR = 6.58: each additional complaint multiplies the churn odds by 6.6×. Tenure OR = 0.60: each additional year reduces churn odds by 40%.',
     after:'86.7% accuracy on training data with only 3 predictors. The confusion matrix shows 1 false positive and 1 false negative out of 15 customers.'},
    {step:3,title:'Model Comparison with AIC',
     explanation:`Build two candidate models and compare with AIC. Lower AIC wins. Then score new customers for a churn risk list.`,
     code:`# Model 1: only complaints and tenure
m1 <- glm(churned ~ tenure + complaints,
          data=customers, family=binomial)

# Model 2: all three predictors
m2 <- glm(churned ~ tenure + spend + complaints,
          data=customers, family=binomial)

cat("AIC comparison:\n")
print(AIC(m1, m2))

# Score new customers
new_customers <- data.frame(
  customer_id = c("C001","C002","C003","C004"),
  tenure      = c(1, 8, 2, 6),
  spend       = c(40, 220, 55, 170),
  complaints  = c(3, 0, 2, 1)
)
new_customers$churn_prob <- round(
  predict(m1, newdata=new_customers, type="response"), 3)

new_customers |>
  dplyr::arrange(desc(churn_prob)) |>
  print()`,
     simulatedOutput:{type:'text',content:`AIC comparison:\n   df      AIC\nm1  3   14.891\nm2  4   16.413\n\n  customer_id tenure spend complaints churn_prob\n1        C001      1    40          3      0.941\n2        C003      2    55          2      0.764\n3        C004      6   170          1      0.218\n4        C002      8   220          0      0.041`},
     note:'m1 has lower AIC (14.9 vs 16.4) despite fewer predictors — spend did not contribute enough to justify its added complexity.',
     after:'C001 has a 94.1% predicted churn probability (new, 3 complaints). C002 has only 4.1% (tenured, no complaints). This ranked list is exactly what CX teams need for proactive outreach.'}
  ],
  challenge:{
    title:'Employee Attrition Risk Scoring',
    description:`Fit a logistic regression predicting attrition (1=left, 0=stayed) from salary, years_at_company, and overtime (1=yes, 0=no). Print odds ratios with CIs. Score all employees and identify the top 3 highest attrition risks. Compare two models (with and without overtime) using AIC.`,
    hint:`glm(attrition ~ salary + years + overtime, family=binomial). exp(coef()) for ORs. predict(type="response") for probabilities. arrange(desc(attrition_prob)) |> head(3). AIC(m1, m2) to compare.`,
    starterCode:`library(dplyr)

hr <- data.frame(
  name         = c("A","B","C","D","E","F","G","H","I","J"),
  salary       = c(45000,82000,51000,95000,38000,78000,62000,44000,88000,55000),
  years        = c(1,8,2,10,1,7,4,1,9,3),
  overtime     = c(1,0,1,0,1,0,0,1,0,1),
  attrition    = c(1,0,1,0,1,0,0,1,0,1)
)

# Fit model with all predictors
m_full <- glm( , family=binomial, data=hr)

# Odds ratios

# Score and show top 3 risks
hr$attrition_prob <- predict( , type="response")

# Fit model WITHOUT overtime
m_reduced <- glm( , family=binomial, data=hr)

# AIC comparison`,
    solution:`library(dplyr)

hr <- data.frame(
  name         = c("A","B","C","D","E","F","G","H","I","J"),
  salary       = c(45000,82000,51000,95000,38000,78000,62000,44000,88000,55000),
  years        = c(1,8,2,10,1,7,4,1,9,3),
  overtime     = c(1,0,1,0,1,0,0,1,0,1),
  attrition    = c(1,0,1,0,1,0,0,1,0,1)
)

m_full <- glm(attrition ~ salary + years + overtime,
              family=binomial, data=hr)

cat("Odds Ratios:\n")
print(round(exp(cbind(OR=coef(m_full), confint(m_full))), 3))

hr$attrition_prob <- round(predict(m_full, type="response"), 3)

cat("\nTop 3 Attrition Risks:\n")
hr |> arrange(desc(attrition_prob)) |> head(3) |>
  select(name, salary, years, overtime, attrition_prob) |>
  print()

m_reduced <- glm(attrition ~ salary + years,
                 family=binomial, data=hr)

cat("\nAIC Comparison:\n")
print(AIC(m_full, m_reduced))`,
    explanation:`The full model includes overtime; the reduced model excludes it. AIC comparison shows whether overtime's predictive contribution justifies adding it. The top 3 attrition risks are those with high overtime, low salary, and few years — exactly the profile HR should prioritise for retention conversations.`,
    successMessage:`Logistic regression and model comparison complete! glm() + AIC + odds ratios is the industry-standard workflow for binary classification in R — used in HR analytics, credit risk, medical diagnosis, and marketing churn models worldwide.`
  },
  insight:`Logistic regression with glm() is the starting point for predictive analytics in every industry. It powers churn models at telecom companies, credit scoring at banks, readmission risk at hospitals, and fraud detection at fintechs. More complex models (random forests, XGBoost) are evaluated against logistic regression as the baseline — mastering it is non-negotiable for any quantitative analyst.`
}
,

/* ── BASIC 5 ─────────────────────────────────────────── */
{
  id:'r-basic-5', language:'r', level:'basic', order:5,
  title:'Reading Data — read_csv(), readxl & Data Import',
  duration:'18 min', xp:110,
  scenario:{
    company:'NorthStar Consulting', role:'Junior Analyst',
    description:`Every real analysis starts with loading data. Your client sends files in three formats: a CSV from the database export, an Excel workbook with multiple sheets, and a tab-delimited TXT from a legacy system. You need to understand how to load each one reliably in R before any analysis can begin.`
  },
  objectives:[
    'Read CSV files with readr::read_csv()',
    'Read Excel files with readxl::read_excel()',
    'Inspect and fix column types after import',
    'Use parse_number() to handle currency-formatted strings'
  ],
  terminology:[
    {term:'readr',lang:'r',definition:'A tidyverse package for fast, reliable CSV and delimited file reading. read_csv() is faster and more predictable than base R\'s read.csv().',example:'library(readr)\ndf <- read_csv("data.csv")'},
    {term:'read_csv()',lang:'r',definition:'Reads CSV files into a tibble. Automatically parses column types and prints a column specification message.',example:'df <- read_csv("sales.csv", skip=1)'},
    {term:'readxl',lang:'r',definition:'Reads Excel .xlsx and .xls files without requiring Excel to be installed. Supports sheet selection and cell ranges.',example:"library(readxl)\ndf <- read_excel('report.xlsx', sheet='Q1')"},
    {term:'col_types=',lang:'r',definition:'Manually specify column types: c=character, d=double, i=integer, D=date, l=logical. Overrides automatic parsing.',example:'read_csv("data.csv", col_types=cols(id=col_character(), date=col_date()))'},
    {term:'parse_number()',lang:'r',definition:'Strips currency symbols, commas, and other formatting then converts to numeric. The fastest fix for "$1,299.99" columns.',example:'parse_number("$1,299.99")  # returns 1299.99'}
  ],
  theory:`<h3>readr vs Base R</h3>
<p>Base R's <code>read.csv()</code> works but has quirks: it converts strings to factors by default, is slower on large files, and has less informative error messages. The tidyverse's <code>read_csv()</code> is strictly better for data analysis — use it as your default.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code>read_csv()   ← tidyverse, returns tibble, faster<br>read.csv()   ← base R, returns data.frame, slower</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Always check the column specification message that read_csv() prints. If it guessed "character" for a numeric column, there is a formatting problem in your data — hidden spaces, currency symbols, etc. — that you need to fix before any analysis.</div></div>`,
  steps:[
    {step:1, title:'Read a CSV File and Inspect Structure',
     explanation:`Use read_csv() to load a CSV file, inspect the column types that were automatically guessed, and understand the structure.`,
     code:`library(readr)
library(dplyr)

# Using inline CSV for practice (in real code: read_csv("myfile.csv"))
csv_text <- "employee_id,first_name,department,salary,hire_date
1001,Sarah,Sales,72000,2019-03-15
1002,Michael,IT,88000,2021-07-01
1003,Emily,Marketing,65000,2020-01-10
1004,James,IT,95000,2018-11-20
1005,Lisa,Sales,82000,2016-05-12"

df <- read_csv(csv_text, show_col_types = TRUE)

glimpse(df)
cat("\\n")
print(df)`,
     simulatedOutput:{type:'text', content:`Rows: 5\nCols: 5\n$ employee_id <dbl> 1001, 1002, 1003, 1004, 1005\n$ first_name  <chr> "Sarah", "Michael", "Emily", "James", "Lisa"\n$ department  <chr> "Sales", "IT", "Marketing", "IT", "Sales"\n$ salary      <dbl> 72000, 88000, 65000, 95000, 82000\n$ hire_date   <date> 2019-03-15, 2021-07-01, 2020-01-10, 2018-11-20, 2016-05-12\n\n# A tibble: 5 x 5\n  employee_id first_name department salary hire_date \n        <dbl> <chr>      <chr>       <dbl> <date>    \n1        1001 Sarah      Sales       72000 2019-03-15\n2        1002 Michael    IT          88000 2021-07-01\n3        1003 Emily      Marketing   65000 2020-01-10\n4        1004 James      IT          95000 2018-11-20\n5        1005 Lisa       Sales       82000 2016-05-12`},
     note:'read_csv() automatically parsed hire_date as <date> — a major advantage over base R which would leave it as character.',
     after:'The glimpse() output shows every column type. <dbl>=numeric, <chr>=text, <date>=date. If any type looks wrong, fix it with col_types= or a mutate() afterward.'},
    {step:2, title:'Read Excel Files with readxl',
     explanation:`Load a specific sheet from an Excel workbook. Real Excel files often have headers on row 2, merged cells, or summary rows — readxl handles these cleanly.`,
     code:`library(readxl)

# In real code:
# df_q1 <- read_excel("quarterly_report.xlsx", sheet = "Q1")
# df_q2 <- read_excel("quarterly_report.xlsx", sheet = "Q2")

# Simulate what read_excel() returns using tribble()
df_excel <- tibble::tribble(
  ~region, ~product,   ~q1_revenue, ~q2_revenue,
  "East",  "Laptop",       320000,      380000,
  "East",  "Monitor",       95000,      105000,
  "West",  "Laptop",       275000,      310000,
  "West",  "Monitor",       82000,       91000
)

cat("Loaded from Excel (simulated):\\n")
print(df_excel)

cat("\\nUseful read_excel() parameters:\\n")
cat("  sheet = 'Q1'       # Select sheet by name\\n")
cat("  sheet = 2          # Select sheet by position\\n")
cat("  range = 'B2:F15'   # Read specific cell range\\n")
cat("  skip  = 2          # Skip top rows (e.g. report headers)\\n")
cat("  n_max = 100        # Read only first 100 rows\\n")

# List sheet names before reading:
# readxl::excel_sheets("report.xlsx")`,
     simulatedOutput:{type:'text', content:`Loaded from Excel (simulated):\n# A tibble: 4 x 4\n  region product q1_revenue q2_revenue\n  <chr>  <chr>        <dbl>      <dbl>\n1 East   Laptop      320000     380000\n2 East   Monitor      95000     105000\n3 West   Laptop      275000     310000\n4 West   Monitor      82000      91000\n\nUseful read_excel() parameters:\n  sheet = 'Q1'       # Select sheet by name\n  sheet = 2          # Select sheet by position\n  range = 'B2:F15'   # Read specific cell range\n  skip  = 2          # Skip top rows (e.g. report headers)\n  n_max = 100        # Read only first 100 rows`},
     note:'excel_sheets("file.xlsx") lists all tab names before reading — always run this first when opening an unfamiliar workbook.',
     after:'readxl reads .xlsx without requiring Excel installed. The range= param is invaluable for workbooks where data does not start at A1.'},
    {step:3, title:'Fix Column Types After Import',
     explanation:`Data rarely imports perfectly. Numeric columns sometimes come in as character when they contain currency symbols or formatting. Fix them in a mutate() pipeline.`,
     code:`library(readr)
library(dplyr)
library(stringr)

# Simulate messy import where prices came in as character
df_messy <- tibble::tribble(
  ~product,       ~unit_price, ~units, ~sale_date,
  "Laptop Pro",   "$1,299.99",     45, "2024-01-15",
  "Wireless Mouse","$29.99",      230, "2024-02-10",
  "Monitor 27",   "$399.99",      62, "2024-03-05"
)

cat("Raw import — price and date are character:\\n")
glimpse(df_messy)

# Fix types with mutate()
df_clean <- df_messy |>
  mutate(
    unit_price = parse_number(unit_price),  # strips $, commas
    sale_date  = as.Date(sale_date),
    total      = unit_price * units          # now numeric, works!
  )

cat("\\nAfter type fixing:\\n")
glimpse(df_clean)
print(df_clean)`,
     simulatedOutput:{type:'text', content:`Raw import — price and date are character:\nRows: 3\nCols: 4\n$ product    <chr> "Laptop Pro", "Wireless Mouse", "Monitor 27"\n$ unit_price <chr> "$1,299.99", "$29.99", "$399.99"\n$ units      <dbl> 45, 230, 62\n$ sale_date  <chr> "2024-01-15", "2024-02-10", "2024-03-05"\n\nAfter type fixing:\nRows: 3\nCols: 5\n$ product    <chr> "Laptop Pro", "Wireless Mouse", "Monitor 27"\n$ unit_price <dbl> 1299.99, 29.99, 399.99\n$ units      <dbl> 45, 230, 62\n$ sale_date  <date> 2024-01-15, 2024-02-10, 2024-03-05\n$ total      <dbl> 58499.55, 6897.70, 24799.38`},
     after:'parse_number() is the single most useful import-fix function — it extracts the number from any currency-formatted string without a regex. Paired with as.Date(), it handles 90% of real-world messy data.'}
  ],
  challenge:{
    title:'Multi-File Import Pipeline',
    description:`Write a function called load_and_clean() that accepts a list of CSV strings, reads each one, binds them all together with bind_rows(), converts any column whose name contains "date" to Date type, and returns the combined tibble. Test it with two CSV strings that share the same schema.`,
    hint:`Use purrr::map() to read each CSV string, bind_rows() to combine, and mutate(across(contains("date"), as.Date)) to fix date columns.`,
    starterCode:`library(readr)
library(dplyr)
library(purrr)

load_and_clean <- function(csv_strings) {
  # Step 1: Read each CSV string into a tibble
  dfs <- map(csv_strings, ~ read_csv(.x, show_col_types = FALSE))
  
  # Step 2: Bind all tibbles into one
  combined <- bind_rows(dfs)
  
  # Step 3: Convert any column whose name contains "date" to Date type
  combined <- combined |>
    mutate(across(    ,    ))
  
  return(combined)
}

csv1 <- "id,name,sale_date,amount\\n1,Alice,2024-01-10,500\\n2,Bob,2024-01-15,320"
csv2 <- "id,name,sale_date,amount\\n3,Carol,2024-02-01,750\\n4,Dan,2024-02-20,410"

result <- load_and_clean(c(csv1, csv2))
glimpse(result)
print(result)`,
    solution:`library(readr)
library(dplyr)
library(purrr)

load_and_clean <- function(csv_strings) {
  dfs     <- map(csv_strings, ~ read_csv(.x, show_col_types = FALSE))
  combined <- bind_rows(dfs)
  combined <- combined |>
    mutate(across(contains("date"), as.Date))
  return(combined)
}

csv1 <- "id,name,sale_date,amount\\n1,Alice,2024-01-10,500\\n2,Bob,2024-01-15,320"
csv2 <- "id,name,sale_date,amount\\n3,Carol,2024-02-01,750\\n4,Dan,2024-02-20,410"

result <- load_and_clean(c(csv1, csv2))
glimpse(result)
print(result)`,
    explanation:`across(contains("date"), as.Date) applies as.Date() to every column whose name contains the word "date" — a scalable pattern that avoids naming every date column individually. map() + bind_rows() is the standard tidyverse multi-file loading idiom.`,
    successMessage:`Data import pipeline complete! read_csv + parse_number + bind_rows is the standard R pattern for ingesting messy real-world data from multiple files.`
  },
  insight:`Data import and type fixing is where 30-40% of real analyst time is spent. read_csv() + parse_number() + as.Date() handles the vast majority of messy files. The readxl package is bundled with the tidyverse installation and reads Excel without needing a Windows or Excel license — making it the default choice in cross-platform data teams and Linux-based cloud environments.`
},

/* ── INTERMEDIATE 5 ─────────────────────────────────── */
{
  id:'r-inter-5', language:'r', level:'intermediate', order:5,
  title:'Time Series — lubridate, Rolling Windows & Trends',
  duration:'25 min', xp:170,
  scenario:{
    company:'NorthStar Consulting', role:'Data Analyst',
    description:`You have 18 months of daily sales data. The client wants: weekly and monthly aggregations, a 4-week rolling average to smooth noise, and year-over-year growth by month. lubridate handles date arithmetic; slider provides rolling window functions; dplyr handles the aggregation.`
  },
  objectives:[
    'Parse and manipulate dates with lubridate',
    'Aggregate time series data to weekly and monthly buckets',
    'Calculate rolling averages with slider::slide_dbl()',
    'Compute year-over-year growth with lag()'
  ],
  terminology:[
    {term:'lubridate',lang:'r',definition:'tidyverse package for date and time manipulation. Parses date strings, extracts components (year, month, weekday), and handles arithmetic correctly.',example:'library(lubridate)\nymd("2024-01-15")  # parse\nmonth(date)         # extract component'},
    {term:'floor_date()',lang:'r',definition:'Rounds a date down to the start of a time unit: "week", "month", "quarter", or "year". The grouping key for time aggregation.',example:'floor_date(date, "month")  # 2024-01-15 -> 2024-01-01'},
    {term:'slide_dbl()',lang:'r',definition:'From the slider package. Applies a numeric function over a sliding window. .before= sets rows before current; .complete=TRUE requires a full window.',example:'slide_dbl(x, mean, .before=3)  # 4-row rolling mean'},
    {term:'lag()',lang:'r',definition:'Returns the value from n rows back. With monthly data, lag(x, 12) gives the value from the same month last year — the basis for YoY comparison.',example:'lag(revenue, 12)  # same month, prior year'},
    {term:'wday() / month() / year()',lang:'r',definition:'lubridate functions to extract date components as integers or ordered factors.',example:'wday(date, label=TRUE)   # "Mon","Tue",...\nmonth(date, label=TRUE)  # "Jan","Feb",...'}
  ],
  theory:`<h3>The Time Series Workflow in R</h3>
<ol><li>Parse raw date strings with lubridate (ymd, mdy, dmy)</li><li>Create a "bucket" column with floor_date() for aggregation</li><li>Aggregate with group_by + summarise</li><li>Smooth noise with sliding window functions</li><li>Compare periods with lag() or a period-shifted join</li></ol>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>floor_date() is the key function. It converts any daily date to its month or week bucket. floor_date(date, "month") on 2024-01-15, 2024-01-22, and 2024-01-31 all return 2024-01-01 — the shared group key for monthly aggregation.</div></div>`,
  steps:[
    {step:1, title:'Build a Daily Series and Extract Date Components',
     explanation:`Create 18 months of simulated daily sales data and extract year, month, week, and weekday components using lubridate.`,
     code:`library(lubridate)
library(dplyr)
library(tibble)

set.seed(42)

dates <- seq(ymd("2023-01-01"), ymd("2024-06-30"), by = "day")

daily_sales <- tibble(
  date    = dates,
  revenue = 1000 + 500*sin(as.numeric(dates - min(dates))/30) +
            200*(year(dates)==2024) +
            rnorm(length(dates), 0, 80)
) |>
  mutate(
    year        = year(date),
    month_label = month(date, label=TRUE),
    week_num    = week(date),
    day_of_wk   = wday(date, label=TRUE),
    month_start = floor_date(date, "month"),
    week_start  = floor_date(date, "week", week_start=1)
  )

glimpse(daily_sales)
cat("\\nFirst 4 rows:\\n")
print(head(daily_sales, 4))`,
     simulatedOutput:{type:'text', content:`Rows: 547\nCols: 8\n$ date        <date>  2023-01-01, 2023-01-02, ...\n$ revenue     <dbl>   1082.3, 998.7, 1147.2, ...\n$ year        <int>   2023, 2023, 2023, ...\n$ month_label <ord>   Jan, Jan, Jan, ...\n$ week_num    <dbl>   1, 1, 1, ...\n$ day_of_wk   <ord>   Sun, Mon, Tue, ...\n$ month_start <date>  2023-01-01, 2023-01-01, ...\n$ week_start  <date>  2023-01-02, 2023-01-02, ...\n\nFirst 4 rows:\n  date       revenue  year month_label week_num day_of_wk month_start week_start\n  <date>       <dbl> <int> <ord>          <dbl> <ord>      <date>      <date>\n1 2023-01-01   1082  2023 Jan                1 Sun        2023-01-01  2022-12-26\n2 2023-01-02    999  2023 Jan                1 Mon        2023-01-01  2023-01-02`},
     after:'month_start is the grouping key for monthly aggregation — all January days map to 2023-01-01, all February days to 2023-02-01, and so on.'},
    {step:2, title:'Monthly Aggregation with Rolling Average',
     explanation:`Group by month_start to get monthly totals, then apply a 3-month rolling average using slider to smooth seasonal variation.`,
     code:`library(slider)

monthly <- daily_sales |>
  group_by(month_start) |>
  summarise(
    revenue   = sum(revenue),
    avg_daily = mean(revenue),
    days      = n(),
    .groups   = "drop"
  ) |>
  arrange(month_start) |>
  mutate(
    rolling_3m = slide_dbl(revenue, mean, .before=2, .complete=TRUE)
  )

cat("Monthly revenue with 3-month rolling average:\\n")
print(monthly |> select(month_start, revenue, rolling_3m))`,
     simulatedOutput:{type:'text', content:`Monthly revenue with 3-month rolling average:\n# A tibble: 18 x 3\n   month_start revenue rolling_3m\n   <date>        <dbl>      <dbl>\n 1 2023-01-01   30247.        NA\n 2 2023-02-01   27819.        NA\n 3 2023-03-01   31562.     29876.\n 4 2023-04-01   33105.     30829.\n 5 2023-05-01   35218.     33295.\n 6 2023-06-01   33892.     34072.\n 7 2023-07-01   31456.     33522.\n 8 2023-08-01   30823.     32057.\n 9 2023-09-01   32701.     31660.\n10 2023-10-01   34912.     32812.\n11 2023-11-01   36201.     34605.\n12 2023-12-01   38904.     36672.\n13 2024-01-01   42315.     39140.\n14 2024-02-01   40218.     40479.\n15 2024-03-01   43901.     42145.\n16 2024-04-01   45123.     43081.\n17 2024-05-01   46802.     45275.\n18 2024-06-01   47534.     46486.`},
     note:'.before=2 means the current row plus 2 prior rows = 3-row window. .complete=TRUE returns NA until the window is full — those NAs are correct and expected for the first two months.',
     after:'The rolling average is significantly smoother than raw monthly revenue — seasonal spikes are dampened and the underlying upward trend is clear.'},
    {step:3, title:'Year-over-Year Growth with lag()',
     explanation:`Use lag() to retrieve prior-year values for the same month, then compute YoY and MoM growth rates — the two standard time-period comparisons in business reporting.`,
     code:`yoy <- monthly |>
  mutate(
    mom_pct        = (revenue / lag(revenue) - 1) * 100,
    rev_prior_year = lag(revenue, 12),
    yoy_pct        = (revenue / rev_prior_year - 1) * 100
  ) |>
  filter(month_start >= "2024-01-01") |>
  select(month_start, revenue, rev_prior_year, yoy_pct, mom_pct) |>
  mutate(across(c(yoy_pct, mom_pct), ~ round(.x, 1)))

cat("2024 YoY and MoM Growth:\\n")
print(yoy)

cat("\\nAverage 2024 YoY Growth:",
    round(mean(yoy$yoy_pct, na.rm=TRUE), 1), "%\\n")`,
     simulatedOutput:{type:'text', content:`2024 YoY and MoM Growth:\n# A tibble: 6 x 5\n  month_start revenue rev_prior_year yoy_pct mom_pct\n  <date>        <dbl>          <dbl>   <dbl>   <dbl>\n1 2024-01-01   42315.         30247.    39.9     8.8\n2 2024-02-01   40218.         27819.    44.6    -5.0\n3 2024-03-01   43901.         31562.    39.1     9.2\n4 2024-04-01   45123.         33105.    36.3     2.8\n5 2024-05-01   46802.         35218.    32.9     3.7\n6 2024-06-01   47534.         33892.    40.3     1.6\n\nAverage 2024 YoY Growth: 38.8 %`},
     after:'lag(revenue, 12) reaches back 12 rows — because data is monthly, that is exactly 12 months back = same month last year. 38.8% average YoY growth is the headline number for the executive summary.'}
  ],
  challenge:{
    title:'Weekly Revenue Summary and Best Day of Week',
    description:`Using the daily_sales tibble from this lesson: (1) aggregate revenue by week_start and year, (2) identify the week with highest total revenue, (3) find which day of the week has the highest average revenue across the full dataset. Print all three results.`,
    hint:`group_by(week_start) |> summarise(weekly=sum(revenue)), filter(weekly==max(weekly)), group_by(day_of_wk) |> summarise(avg=mean(revenue)) |> arrange(desc(avg))`,
    starterCode:`library(dplyr)

# 1. Weekly totals
weekly <- daily_sales |>
  group_by(year, week_start) |>
  summarise(weekly_revenue = sum(revenue), .groups="drop")

cat("Sample weekly data:\\n")
print(head(weekly, 4))

# 2. Best single week
best_week <- weekly |> filter(        )
cat("\\nBest week:", format(best_week$week_start), "Revenue:", round(best_week$weekly_revenue), "\\n")

# 3. Best day of week by average
best_day <- daily_sales |>
  group_by(day_of_wk) |>
  summarise(avg_revenue = mean(revenue)) |>
  arrange(         )

cat("\\nRevenue by day of week:\\n")
print(best_day)`,
    solution:`library(dplyr)

weekly <- daily_sales |>
  group_by(year, week_start) |>
  summarise(weekly_revenue = sum(revenue), .groups="drop")

cat("Sample weekly data:\\n")
print(head(weekly, 4))

best_week <- weekly |> filter(weekly_revenue == max(weekly_revenue))
cat("\\nBest week:", format(best_week$week_start), 
    "Revenue: $", round(best_week$weekly_revenue), "\\n")

best_day <- daily_sales |>
  group_by(day_of_wk) |>
  summarise(avg_revenue = mean(revenue)) |>
  arrange(desc(avg_revenue))

cat("\\nRevenue by day of week:\\n")
print(best_day)`,
    explanation:`filter(col == max(col)) selects the maximum row without needing slice_max(). arrange(desc()) ranks from highest to lowest. These two patterns — max filtering and sorted ranking — appear in virtually every business time series report.`,
    successMessage:`Time series analysis complete! lubridate + floor_date + slide_dbl + lag covers the full toolkit for date-based reporting in R.`
  },
  insight:`lubridate is consistently in the top-5 most downloaded R packages. floor_date() + group_by() + summarise() is the R equivalent of SQL's DATE_TRUNC + GROUP BY — once you understand it, building weekly, monthly, and quarterly aggregations becomes trivial. The slider package mirrors SQL window functions (rolling averages, cumulative sums) in a clean, tidyverse-compatible API.`
},

/* ── ADVANCED 5 ─────────────────────────────────────── */
{
  id:'r-adv-5', language:'r', level:'advanced', order:5,
  title:'R Markdown — Reproducible Parameterized Reports',
  duration:'30 min', xp:200,
  scenario:{
    company:'NorthStar Consulting', role:'Senior Analyst',
    description:`Your client expects a formatted HTML report every week — not a raw R script and a pile of CSV files. R Markdown lets you combine R code, visualizations, and narrative prose into a single document that re-renders itself with fresh data automatically. You will write a parameterized report template that any team member can knit for any region with a single function call.`
  },
  objectives:[
    'Write a .Rmd document with YAML header, code chunks, and Markdown prose',
    'Control chunk output with echo, message, warning, and fig options',
    'Add params: to the YAML header for parameterized reports',
    'Render multiple outputs from one template using rmarkdown::render()'
  ],
  terminology:[
    {term:'R Markdown (.Rmd)',lang:'r',definition:'A file format that combines YAML metadata, Markdown prose, and R code chunks. The document is knitted to HTML, PDF, Word, or slides.',example:'---\ntitle: "Sales Report"\noutput: html_document\n---\n```{r}\nsummary(df)\n```'},
    {term:'YAML Header',lang:'r',definition:'The top section (between triple-dash lines) of an .Rmd file. Sets title, author, output format, theme, and parameter defaults.',example:'---\ntitle: "Q1 Report"\nauthor: "Alice"\noutput: html_document\n---'},
    {term:'Code Chunk',lang:'r',definition:'An R code block inside fences with options in curly braces. Options control whether code, output, messages, and figures are included in the rendered output.',example:'```{r summary-table, echo=FALSE, message=FALSE}\nknitr::kable(df)\n```'},
    {term:'params:',lang:'r',definition:'YAML parameter block that makes the report dynamic. Values are accessed as params$name inside R code. Different values render different outputs from the same template.',example:'params:\n  region: "East"\n# In R: filter(df, region == params$region)'},
    {term:'rmarkdown::render()',lang:'r',definition:'Knits an .Rmd file from the R console. Accepts params= to override YAML defaults and output_file= to name the output.',example:'rmarkdown::render("report.Rmd", params=list(region="West"), output_file="west_report.html")'}
  ],
  theory:`<h3>The Reproducibility Problem</h3>
<p>A report built by copy-pasting numbers into Word breaks the moment the data changes. R Markdown solves this: the document <em>is</em> the analysis. Hit Knit and the code runs, tables and charts regenerate, and a formatted document is produced automatically with zero manual steps.</p>
<div class="callout callout-info"><i class="fas fa-code"></i><div><code># Knit from R console:\nrmarkdown::render("report.Rmd")\n\n# Parameterized — same template, different region:\nrmarkdown::render("report.Rmd",\n  params      = list(region = "West"),\n  output_file = "west_report.html")</code></div></div>
<div class="callout callout-tip"><i class="fas fa-lightbulb"></i><div>Always add knitr::opts_chunk$set(echo=FALSE, message=FALSE, warning=FALSE) in a setup chunk at the top of every report. Stakeholders want insights, not R code and package load messages.</div></div>`,
  steps:[
    {step:1, title:'Write the YAML Header and Setup Chunk',
     explanation:`The YAML header defines the document metadata and output format. The setup chunk sets global chunk options. Together they form the report scaffold.`,
     code:`# === Content of report.Rmd (displayed here as strings for reference) ===

cat("--- YAML HEADER ---\\n")
yaml_header <- '
---
title: "Monthly Sales Report"
subtitle: "Automated by R Markdown"
author: "Analytics Team"
date: "\`r Sys.Date()\`"
output:
  html_document:
    toc: true
    toc_float: true
    theme: flatly
    highlight: kate
params:
  region: "East"
  report_month: "2024-06"
---'
cat(yaml_header, "\\n\\n")

cat("--- SETUP CHUNK ---\\n")
setup_chunk <- '
\`\`\`{r setup, include=FALSE}
knitr::opts_chunk$set(
  echo    = FALSE,   # Hide R code from reader
  message = FALSE,   # Suppress package load messages
  warning = FALSE,   # Suppress warnings
  fig.width  = 9,
  fig.height = 5
)
library(dplyr); library(ggplot2); library(knitr); library(kableExtra)
\`\`\`'
cat(setup_chunk)`,
     simulatedOutput:{type:'text', content:`--- YAML HEADER ---\n---\ntitle: "Monthly Sales Report"\nsubtitle: "Automated by R Markdown"\nauthor: "Analytics Team"\ndate: "2024-06-04"       <- Sys.Date() renders at knit time\noutput:\n  html_document:\n    toc: true             <- floating table of contents\n    toc_float: true\n    theme: flatly         <- Bootstrap 4 professional theme\nparams:\n  region: "East"         <- override with render(params=list(...))\n  report_month: "2024-06"\n---\n\n--- SETUP CHUNK ---\ninclude=FALSE hides both the code and its output entirely.\nAll subsequent chunks inherit echo=FALSE, message=FALSE, warning=FALSE\nand the 9x5 inch figure size.`},
     note:'toc: true adds a floating sidebar table of contents. theme: flatly is a clean professional Bootstrap theme. Both are free and require no CSS knowledge.',
     after:'The YAML header and global setup chunk are boilerplate that goes at the top of every report template. Copy it once, adapt the title and params — done.'},
    {step:2, title:'Add Prose, Inline R Values, and a kable() Table',
     explanation:`Mix Markdown prose with inline R expressions and formatted tables. Inline R — backtick r expr backtick — is how you embed live computed values directly in narrative text.`,
     code:`library(dplyr)
library(knitr)

# Simulate the data section of the .Rmd
region_param <- "East"   # In .Rmd this is params$region

sales <- data.frame(
  month   = c("Jan","Feb","Mar","Apr","May","Jun"),
  revenue = c(42315, 40218, 43901, 45123, 46802, 47534),
  orders  = c(312, 298, 334, 351, 367, 382)
)

# Computed values used inline in prose
total_rev  <- sum(sales$revenue)
best_month <- sales$month[which.max(sales$revenue)]
avg_orders <- round(mean(sales$orders))

cat("=== Rendered prose (inline R in .Rmd) ===\\n")
cat(sprintf(
  "Region **%s** generated total revenue of **$%s** in H1 2024.\\nPeak month was **%s** with average **%d** orders per month.\\n\\n",
  region_param,
  formatC(total_rev, format="d", big.mark=","),
  best_month, avg_orders
))

cat("=== kable() table output ===\\n")
sales_fmt <- sales |>
  mutate(revenue = paste0("$", formatC(revenue, format="d", big.mark=",")))

knitr::kable(sales_fmt,
             col.names = c("Month","Revenue","Orders"),
             align = c("l","r","r"),
             caption = "H1 2024 Monthly Summary")`,
     simulatedOutput:{type:'text', content:`=== Rendered prose (inline R in .Rmd) ===\nRegion **East** generated total revenue of **$265,893** in H1 2024.\nPeak month was **Jun** with average **341** orders per month.\n\n=== kable() table output ===\n\nTable: H1 2024 Monthly Summary\n\n| Month | Revenue   | Orders |\n|:------|----------:|-------:|\n| Jan   |  $42,315  |    312 |\n| Feb   |  $40,218  |    298 |\n| Mar   |  $43,901  |    334 |\n| Apr   |  $45,123  |    351 |\n| May   |  $46,802  |    367 |\n| Jun   |  $47,534  |    382 |`},
     note:'In actual .Rmd: use backtick-r-space expressions inline. Example: "Total revenue was `r scales::dollar(total_rev)`" renders as "Total revenue was $265,893".',
     after:'knitr::kable() produces clean HTML or LaTeX tables. Add kableExtra::kable_styling(bootstrap_options="striped") for zebra-stripe formatting with no extra CSS.'},
    {step:3, title:'Parameterized Rendering for Multiple Regions',
     explanation:`The params: block makes one template produce many reports. Use purrr::walk() to loop over all regions and call rmarkdown::render() for each.`,
     code:`library(purrr)

# Simulate what parameterized rendering does
render_report_sim <- function(region) {
  cat(sprintf("\\n=== Rendering: %s Sales Report ===\\n", region))

  all_data <- data.frame(
    region  = c("East","East","West","West","North","North"),
    month   = c("May","Jun","May","Jun","May","Jun"),
    revenue = c(46802, 47534, 38210, 39875, 29310, 30145)
  )

  region_data <- all_data[all_data$region == region, ]
  total        <- sum(region_data$revenue)

  cat(sprintf("  Rows in scope : %d\\n", nrow(region_data)))
  cat(sprintf("  H1 Revenue    : $%s\\n", formatC(total, format="d", big.mark=",")))
  cat(sprintf("  Output file   : %s_report.html\\n", tolower(region)))
}

regions <- c("East", "West", "North")
walk(regions, render_report_sim)

cat("\\n--- Production code (run once to generate all reports) ---\\n")
cat('walk(regions, ~ rmarkdown::render(\\n')
cat('  input       = "report.Rmd",\\n')
cat('  params      = list(region = .x),\\n')
cat('  output_file = paste0(.x, "_report.html")\\n')
cat('))\\n')`,
     simulatedOutput:{type:'text', content:`=== Rendering: East Sales Report ===\n  Rows in scope : 2\n  H1 Revenue    : $94,336\n  Output file   : east_report.html\n\n=== Rendering: West Sales Report ===\n  Rows in scope : 2\n  H1 Revenue    : $78,085\n  Output file   : west_report.html\n\n=== Rendering: North Sales Report ===\n  Rows in scope : 2\n  H1 Revenue    : $59,455\n  Output file   : north_report.html\n\n--- Production code (run once to generate all reports) ---\nwalk(regions, ~ rmarkdown::render(\n  input       = "report.Rmd",\n  params      = list(region = .x),\n  output_file = paste0(.x, "_report.html")\n))`},
     after:'Three bespoke regional reports produced from one template in one function call. When the underlying data refreshes, rerun this walk() and all three reports update automatically — no copy-pasting necessary.'}
  ],
  challenge:{
    title:'Add a Performance Chart Section',
    description:`Write R code for a bar chart section that would appear in the report body: (1) use the monthly sales data from step 2, (2) color bars by whether the month exceeds the monthly average (steelblue = above, coral = below), (3) add a dashed horizontal reference line at the average, (4) format the y-axis with dollar signs using scales::dollar_format(). Print the ggplot object.`,
    hint:`mutate(above_avg = revenue > mean(revenue)), geom_col(aes(fill=above_avg)), geom_hline(yintercept=avg), scale_fill_manual(), scale_y_continuous(labels=scales::dollar_format())`,
    starterCode:`library(ggplot2)
library(dplyr)

sales <- data.frame(
  month   = factor(c("Jan","Feb","Mar","Apr","May","Jun"),
                   levels=c("Jan","Feb","Mar","Apr","May","Jun")),
  revenue = c(42315, 40218, 43901, 45123, 46802, 47534)
)

avg_rev <- mean(sales$revenue)
sales   <- sales |> mutate(above_avg = revenue > avg_rev)

p <- ggplot(sales, aes(x=month, y=revenue, fill=above_avg)) +
  # Add bars
  # Add average reference line (dashed, grey)
  # Two-color fill: "TRUE"="steelblue", "FALSE"="coral"
  # Dollar-formatted y-axis
  # Clean title and axis labels
  # theme_minimal()

print(p)`,
    solution:`library(ggplot2)
library(dplyr)

sales <- data.frame(
  month   = factor(c("Jan","Feb","Mar","Apr","May","Jun"),
                   levels=c("Jan","Feb","Mar","Apr","May","Jun")),
  revenue = c(42315, 40218, 43901, 45123, 46802, 47534)
)

avg_rev <- mean(sales$revenue)
sales   <- sales |> mutate(above_avg = revenue > avg_rev)

p <- ggplot(sales, aes(x=month, y=revenue, fill=above_avg)) +
  geom_col() +
  geom_hline(yintercept=avg_rev, linetype="dashed",
             color="grey30", linewidth=0.9) +
  scale_fill_manual(
    values = c("TRUE"="steelblue", "FALSE"="coral"),
    labels = c("TRUE"="Above Average", "FALSE"="Below Average"),
    name   = "Performance"
  ) +
  scale_y_continuous(labels=scales::dollar_format()) +
  labs(
    title    = "Monthly Revenue — H1 2024",
    subtitle = paste0("Dashed line = monthly average ($",
                      formatC(round(avg_rev), format="d", big.mark=","), ")"),
    x = "Month", y = "Revenue"
  ) +
  theme_minimal(base_size=13)

print(p)`,
    explanation:`geom_hline() adds a horizontal reference line that is not part of the data aesthetics — perfect for targets and averages. scale_fill_manual() maps logical TRUE/FALSE values to explicit colors. scale_y_continuous(labels=scales::dollar_format()) handles axis formatting automatically.`,
    successMessage:`R Markdown report template complete! You now have a reproducible, parameterized, visually polished reporting system that regenerates itself with fresh data on demand.`
  },
  insight:`R Markdown is used extensively at pharmaceutical companies (FDA-accepted HTML/PDF study reports), consulting firms, financial institutions, and academia (reproducible research journals). Quarto — the next-generation successor — uses identical concepts but adds Python, Julia, and Observable JS support in the same document. Learning R Markdown today is direct preparation for Quarto, which is becoming the standard for multi-language reproducible analysis across the entire data science ecosystem.`
}

]; // end R_LESSONS
