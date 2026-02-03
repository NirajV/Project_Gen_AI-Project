/* ==================================================================================
   1. DDL - DATA DEFINITION LANGUAGE (Create Tables)
   ================================================================================== */

USE EDW_STAGE_DB;
-- 1. Create Source Tables for Data Loading
-- 1. Departments Table
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50) NOT NULL,
    Location VARCHAR(100)
);

-- 2. Employees Table (FK to Departments)
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    DepartmentID INT,
    HireDate DATE,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

-- 3. Categories Table
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL,
    Description VARCHAR(255)
);

-- 4. Suppliers Table
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY,
    SupplierName VARCHAR(100) NOT NULL,
    ContactName VARCHAR(50),
    Phone VARCHAR(20),
    Country VARCHAR(50)
);

-- 5. Products Table (FK to Categories and Suppliers)
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    CategoryID INT,
    SupplierID INT,
    UnitPrice DECIMAL(10, 2),
    StockQuantity INT,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

-- 6. Customers Table
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    Phone VARCHAR(20),
    Address VARCHAR(255),
    City VARCHAR(50),
    Country VARCHAR(50)
);

-- 7. Shippers Table
CREATE TABLE Shippers (
    ShipperID INT PRIMARY KEY,
    CompanyName VARCHAR(100) NOT NULL,
    Phone VARCHAR(20)
);

-- 8. Orders Table (FK to Customers, Employees, Shippers)
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    EmployeeID INT,
    OrderDate DATE,
    ShipperID INT,
    TotalAmount DECIMAL(12, 2),
    Status VARCHAR(20) DEFAULT 'Pending', -- Pending, Shipped, Delivered
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (ShipperID) REFERENCES Shippers(ShipperID)
);

-- 9. OrderDetails Table (FK to Orders and Products)
-- Note: Composite Primary Key (OrderID, ProductID)
CREATE TABLE OrderDetails (
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- 10. Payments Table (FK to Orders)
CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY,
    OrderID INT,
    PaymentDate DATE,
    Amount DECIMAL(12, 2),
    PaymentMethod VARCHAR(50), -- Credit Card, PayPal, Bank Transfer
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

/* ==================================================================================
   2. DML - DATA MANIPULATION LANGUAGE (Insert Sample Data)
   ================================================================================== */

-- Insert Departments
INSERT INTO Departments (DepartmentID, DepartmentName, Location) VALUES
(1, 'Sales', 'New York - Floor 5'),
(2, 'IT', 'San Francisco - Building B'),
(3, 'HR', 'Chicago - Suite 100');

-- Insert Employees
INSERT INTO Employees (EmployeeID, FirstName, LastName, Email, DepartmentID, HireDate) VALUES
(101, 'John', 'Doe', 'john.doe@company.com', 1, '2020-01-15'),
(102, 'Jane', 'Smith', 'jane.smith@company.com', 2, '2019-03-22'),
(103, 'Robert', 'Brown', 'robert.brown@company.com', 1, '2021-06-01'),
(104, 'Emily', 'Davis', 'emily.davis@company.com', 3, '2018-11-05');

-- Insert Categories
INSERT INTO Categories (CategoryID, CategoryName, Description) VALUES
(1, 'Electronics', 'Gadgets, computers, and phones'),
(2, 'Furniture', 'Chairs, tables, and desks'),
(3, 'Books', 'Fiction, non-fiction, and educational');

-- Insert Suppliers
INSERT INTO Suppliers (SupplierID, SupplierName, ContactName, Phone, Country) VALUES
(1, 'TechWorld Inc.', 'Alice Johnson', '555-0101', 'USA'),
(2, 'Comfort Living', 'Bob Miller', '555-0102', 'Canada'),
(3, 'Global Reads', 'Charlie Wilson', '555-0103', 'UK');

-- Insert Products
INSERT INTO Products (ProductID, ProductName, CategoryID, SupplierID, UnitPrice, StockQuantity) VALUES
(1, 'Smartphone X', 1, 1, 699.99, 50),
(2, 'Laptop Pro', 1, 1, 1299.99, 30),
(3, 'Ergonomic Chair', 2, 2, 199.50, 20),
(4, 'Wooden Desk', 2, 2, 150.00, 15),
(5, 'Learn SQL', 3, 3, 39.99, 100),
(6, 'Python for Beginners', 3, 3, 29.99, 100);

-- Insert Customers
INSERT INTO Customers (CustomerID, FirstName, LastName, Email, Phone, Address, City, Country) VALUES
(1, 'Michael', 'Scott', 'm.scott@dunder.com', '555-1111', '1725 Slough Ave', 'Scranton', 'USA'),
(2, 'Dwight', 'Schrute', 'd.schrute@farms.com', '555-2222', 'Schrute Farms', 'Honesdale', 'USA'),
(3, 'Jim', 'Halpert', 'j.halpert@athlead.com', '555-3333', '456 Maple St', 'Philadelphia', 'USA');

-- Insert Shippers
INSERT INTO Shippers (ShipperID, CompanyName, Phone) VALUES
(1, 'FastTrack Logistics', '1-800-FAST'),
(2, 'Global Shipping Co.', '1-800-SHIP');

-- Insert Orders
INSERT INTO Orders (OrderID, CustomerID, EmployeeID, OrderDate, ShipperID, TotalAmount, Status) VALUES
(1001, 1, 101, '2023-10-01', 1, 739.98, 'Shipped'),
(1002, 2, 101, '2023-10-02', 2, 1299.99, 'Delivered'),
(1003, 3, 103, '2023-10-03', 1, 199.50, 'Pending');

-- Insert OrderDetails
-- Order 1001: 1 Smartphone + 1 SQL Book
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice) VALUES
(1001, 1, 1, 699.99),
(1001, 5, 1, 39.99);

-- Order 1002: 1 Laptop
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice) VALUES
(1002, 2, 1, 1299.99);

-- Order 1003: 1 Chair
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice) VALUES
(1003, 3, 1, 199.50);

-- Insert Payments
INSERT INTO Payments (PaymentID, OrderID, PaymentDate, Amount, PaymentMethod) VALUES
(1, 1001, '2023-10-01', 739.98, 'Credit Card'),
(2, 1002, '2023-10-02', 1299.99, 'PayPal');