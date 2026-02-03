/* ==================================================================================
   Target Table DDL & DML - Product Revenue Analysis
   ================================================================================== */

USE EDW_DIM_DB;

-- 1. Create Target Table
-- Dropping the table if it exists ensures we can re-run this script cleanly
DROP TABLE IF EXISTS Product_Revenue_Analysis;

CREATE TABLE Product_Revenue_Analysis (
    AnalysisID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100),
    CategoryName VARCHAR(50),
    SupplierName VARCHAR(100),
    TotalUnitsSold INT,
    NumberOfOrders INT,
    TotalRevenue DECIMAL(15, 2),
    LoadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

