/* =========================================================
   db-setup.js  — SQL schema + realistic sample data
   Executed once via sql.js (SQLite in WebAssembly)
   ========================================================= */

const DB_SCHEMA = `
/* ── Tables ── */
CREATE TABLE IF NOT EXISTS departments (
  dept_id   INTEGER PRIMARY KEY,
  dept_name TEXT    NOT NULL,
  budget    REAL,
  location  TEXT
);

CREATE TABLE IF NOT EXISTS employees (
  employee_id INTEGER PRIMARY KEY,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT,
  department  TEXT NOT NULL,
  job_title   TEXT,
  salary      REAL,
  hire_date   TEXT,
  manager_id  INTEGER,
  region      TEXT
);

CREATE TABLE IF NOT EXISTS customers (
  customer_id  INTEGER PRIMARY KEY,
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  email        TEXT,
  city         TEXT,
  state        TEXT,
  signup_date  TEXT,
  segment      TEXT,
  total_orders INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  product_id   INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  category     TEXT,
  subcategory  TEXT,
  unit_price   REAL,
  cost         REAL,
  stock_qty    INTEGER
);

CREATE TABLE IF NOT EXISTS orders (
  order_id     INTEGER PRIMARY KEY,
  customer_id  INTEGER,
  order_date   TEXT,
  ship_date    TEXT,
  status       TEXT,
  total_amount REAL,
  region       TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
  item_id    INTEGER PRIMARY KEY,
  order_id   INTEGER,
  product_id INTEGER,
  quantity   INTEGER,
  unit_price REAL,
  discount   REAL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sales (
  sale_id     INTEGER PRIMARY KEY,
  employee_id INTEGER,
  product_id  INTEGER,
  customer_id INTEGER,
  sale_date   TEXT,
  amount      REAL,
  quantity    INTEGER,
  region      TEXT
);

/* ── Departments ── */
INSERT INTO departments VALUES
(1,'Sales',1500000,'East'),
(2,'Marketing',900000,'West'),
(3,'IT',1200000,'Central'),
(4,'Finance',700000,'East'),
(5,'Executive',2000000,'East'),
(6,'HR',450000,'West');

/* ── Employees (15 rows) ── */
INSERT INTO employees VALUES
(1,'Sarah','Johnson','sarah.j@company.com','Sales','Senior Sales Rep',72000,'2019-03-15',5,'East'),
(2,'Michael','Chen','michael.c@company.com','Sales','Sales Rep',58000,'2021-07-01',5,'West'),
(3,'Emily','Rodriguez','emily.r@company.com','Marketing','Marketing Analyst',65000,'2020-01-10',6,'East'),
(4,'James','Wilson','james.w@company.com','IT','Data Engineer',88000,'2018-11-20',7,'Central'),
(5,'Lisa','Thompson','lisa.t@company.com','Sales','Sales Manager',95000,'2016-05-12',8,'East'),
(6,'David','Martinez','david.m@company.com','Marketing','Marketing Manager',92000,'2017-02-28',8,'West'),
(7,'Jennifer','Brown','jennifer.b@company.com','IT','IT Director',120000,'2015-08-03',8,'Central'),
(8,'Robert','Davis','robert.d@company.com','Executive','CEO',200000,'2010-01-01',NULL,'East'),
(9,'Amanda','Taylor','amanda.t@company.com','Finance','Financial Analyst',70000,'2020-09-15',10,'West'),
(10,'Kevin','Anderson','kevin.a@company.com','Finance','Finance Manager',105000,'2016-04-22',8,'East'),
(11,'Jessica','Thomas','jessica.t@company.com','Sales','Sales Rep',55000,'2022-01-15',5,'West'),
(12,'Christopher','Jackson','chris.j@company.com','Marketing','Content Manager',68000,'2020-06-01',6,'East'),
(13,'Stephanie','White','steph.w@company.com','IT','Database Admin',85000,'2019-10-14',7,'Central'),
(14,'Brandon','Harris','brandon.h@company.com','Sales','Sales Rep',57000,'2021-03-22',5,'East'),
(15,'Megan','Clark','megan.c@company.com','Finance','Accountant',63000,'2021-11-08',10,'West');

/* ── Customers (20 rows) ── */
INSERT INTO customers VALUES
(1,'Alice','Kim','alice.k@email.com','New York','NY','2020-01-15','Premium',24),
(2,'Bob','Smith','bob.s@email.com','Los Angeles','CA','2020-03-22','Standard',8),
(3,'Carol','Johnson','carol.j@email.com','Chicago','IL','2019-11-10','Premium',31),
(4,'David','Lee','david.l@email.com','Houston','TX','2021-02-14','Standard',5),
(5,'Eva','Williams','eva.w@email.com','Phoenix','AZ','2021-08-30','Basic',2),
(6,'Frank','Brown','frank.b@email.com','Philadelphia','PA','2020-07-19','Standard',12),
(7,'Grace','Jones','grace.j@email.com','San Antonio','TX','2022-01-05','Basic',3),
(8,'Henry','Garcia','henry.g@email.com','San Diego','CA','2019-06-12','Premium',42),
(9,'Iris','Miller','iris.m@email.com','Dallas','TX','2021-09-28','Standard',7),
(10,'Jack','Wilson','jack.w@email.com','San Jose','CA','2020-12-01','Standard',15),
(11,'Karen','Moore','karen.m@email.com','Jacksonville','FL','2022-05-14','Basic',1),
(12,'Liam','Taylor','liam.t@email.com','Austin','TX','2021-04-18','Premium',19),
(13,'Maria','Anderson','maria.a@email.com','Columbus','OH','2020-08-27','Standard',10),
(14,'Noah','Thomas','noah.t@email.com','Charlotte','NC','2019-03-05','Premium',38),
(15,'Olivia','Jackson','olivia.j@email.com','Indianapolis','IN','2022-03-12','Basic',4),
(16,'Peter','White','peter.w@email.com','San Francisco','CA','2020-10-31','Premium',27),
(17,'Quinn','Harris','quinn.h@email.com','Seattle','WA','2021-07-22','Standard',9),
(18,'Rachel','Martin','rachel.m@email.com','Denver','CO','2021-11-15','Standard',6),
(19,'Samuel','Thompson','sam.t@email.com','Nashville','TN','2022-08-03','Basic',2),
(20,'Tanya','Clark','tanya.c@email.com','Boston','MA','2020-04-09','Premium',33);

/* ── Products (15 rows) ── */
INSERT INTO products VALUES
(1,'Laptop Pro 15"','Electronics','Computers',1299.99,780.00,45),
(2,'Wireless Mouse','Electronics','Accessories',29.99,8.50,230),
(3,'USB-C Hub','Electronics','Accessories',49.99,14.00,180),
(4,'Monitor 27"','Electronics','Displays',399.99,210.00,62),
(5,'Mechanical Keyboard','Electronics','Accessories',129.99,45.00,95),
(6,'Standing Desk','Furniture','Desks',599.99,220.00,28),
(7,'Ergonomic Chair','Furniture','Chairs',449.99,165.00,35),
(8,'Webcam HD','Electronics','Accessories',79.99,22.00,120),
(9,'Headphones Pro','Electronics','Audio',249.99,85.00,75),
(10,'Desk Organizer','Office Supplies','Organization',34.99,9.50,200),
(11,'Notebook Pack','Office Supplies','Stationery',19.99,5.00,350),
(12,'Tablet 10"','Electronics','Tablets',499.99,195.00,40),
(13,'Phone Stand','Accessories','Accessories',24.99,6.00,280),
(14,'LED Desk Lamp','Electronics','Lighting',59.99,18.00,110),
(15,'External SSD 1TB','Electronics','Storage',149.99,65.00,85);

/* ── Orders (24 rows) ── */
INSERT INTO orders VALUES
(1001,1,'2023-01-05','2023-01-08','Delivered',1329.98,'East'),
(1002,3,'2023-01-07','2023-01-11','Delivered',679.98,'East'),
(1003,2,'2023-01-12','2023-01-16','Delivered',249.99,'West'),
(1004,8,'2023-01-15','2023-01-19','Delivered',1749.97,'West'),
(1005,14,'2023-01-20','2023-01-24','Delivered',399.99,'East'),
(1006,16,'2023-02-01','2023-02-05','Delivered',599.99,'West'),
(1007,1,'2023-02-08','2023-02-12','Delivered',79.99,'East'),
(1008,4,'2023-02-14',NULL,'Cancelled',129.99,'Central'),
(1009,12,'2023-02-18','2023-02-22','Delivered',449.99,'East'),
(1010,20,'2023-02-25','2023-03-01','Delivered',499.99,'East'),
(1011,6,'2023-03-03','2023-03-07','Delivered',84.98,'East'),
(1012,10,'2023-03-10','2023-03-14','Delivered',1579.97,'West'),
(1013,5,'2023-03-15',NULL,'Pending',49.99,'Central'),
(1014,9,'2023-03-20','2023-03-24','Delivered',309.98,'Central'),
(1015,17,'2023-03-28','2023-04-01','Delivered',279.98,'West'),
(1016,3,'2023-04-05','2023-04-09','Delivered',1299.99,'East'),
(1017,8,'2023-04-12','2023-04-16','Delivered',899.98,'West'),
(1018,14,'2023-04-19',NULL,'Shipped',249.99,'East'),
(1019,2,'2023-04-25','2023-04-29','Delivered',54.98,'West'),
(1020,20,'2023-05-02','2023-05-06','Delivered',749.98,'East'),
(1021,3,'2023-05-10','2023-05-14','Delivered',129.99,'East'),
(1022,8,'2023-05-18','2023-05-22','Delivered',599.99,'West'),
(1023,1,'2023-06-01',NULL,'Pending',399.99,'East'),
(1024,14,'2023-06-08','2023-06-12','Delivered',1299.99,'East');

/* ── Order Items ── */
INSERT INTO order_items VALUES
(1,1001,1,1,1299.99,0),(2,1001,2,1,29.99,0),
(3,1002,4,1,399.99,0),(4,1002,6,1,279.99,0),
(5,1003,9,1,249.99,0),
(6,1004,4,1,399.99,0),(7,1004,1,1,1299.99,0),(8,1004,8,1,49.99,0),
(9,1005,4,1,399.99,0),
(10,1006,6,1,599.99,0),
(11,1007,8,1,79.99,0),
(12,1008,5,1,129.99,0),
(13,1009,7,1,449.99,0),
(14,1010,12,1,499.99,0),
(15,1011,2,2,29.99,0),(16,1011,10,1,34.99,0.1),
(17,1012,1,1,1299.99,0),(18,1012,8,1,79.99,0),(19,1012,5,1,129.99,0),(20,1012,3,1,49.99,0.05),
(21,1013,3,1,49.99,0),
(22,1014,9,1,249.99,0),(23,1014,2,2,29.99,0),
(24,1015,2,1,29.99,0),(25,1015,5,1,129.99,0),(26,1015,14,1,59.99,0.1),
(27,1016,1,1,1299.99,0),
(28,1017,4,1,399.99,0),(29,1017,9,2,249.99,0),
(30,1018,9,1,249.99,0),
(31,1019,2,1,29.99,0),(32,1019,11,1,24.99,0),
(33,1020,12,1,499.99,0),(34,1020,6,1,249.99,0);

/* ── Sales ── */
INSERT INTO sales VALUES
(1,1,1,1,'2023-01-05',1299.99,1,'East'),
(2,1,2,1,'2023-01-05',29.99,1,'East'),
(3,5,4,3,'2023-01-07',399.99,1,'East'),
(4,5,6,3,'2023-01-07',279.99,1,'East'),
(5,2,9,2,'2023-01-12',249.99,1,'West'),
(6,2,4,8,'2023-01-15',399.99,1,'West'),
(7,2,1,8,'2023-01-15',1299.99,1,'West'),
(8,1,8,8,'2023-01-15',49.99,1,'East'),
(9,14,4,14,'2023-01-20',399.99,1,'East'),
(10,1,6,16,'2023-02-01',599.99,1,'East'),
(11,1,8,1,'2023-02-08',79.99,1,'East'),
(12,11,5,4,'2023-02-14',129.99,1,'West'),
(13,5,7,12,'2023-02-18',449.99,1,'East'),
(14,2,12,20,'2023-02-25',499.99,1,'West'),
(15,1,2,6,'2023-03-03',59.98,2,'East'),
(16,1,10,6,'2023-03-03',34.99,1,'East'),
(17,2,1,10,'2023-03-10',1299.99,1,'West'),
(18,2,8,10,'2023-03-10',79.99,1,'West'),
(19,2,5,10,'2023-03-10',129.99,1,'West'),
(20,11,3,5,'2023-03-15',49.99,1,'West'),
(21,14,9,9,'2023-03-20',249.99,1,'East'),
(22,14,2,9,'2023-03-20',59.98,2,'East'),
(23,2,2,17,'2023-03-28',29.99,1,'West'),
(24,2,5,17,'2023-03-28',129.99,1,'West'),
(25,5,1,3,'2023-04-05',1299.99,1,'East'),
(26,2,4,8,'2023-04-12',399.99,1,'West'),
(27,2,9,8,'2023-04-12',499.98,2,'West'),
(28,14,9,14,'2023-04-19',249.99,1,'East'),
(29,11,2,2,'2023-04-25',29.99,1,'West'),
(30,11,11,2,'2023-04-25',19.99,1,'West'),
(31,1,12,20,'2023-05-02',499.99,1,'East'),
(32,1,6,20,'2023-05-02',249.99,1,'East');
`;
