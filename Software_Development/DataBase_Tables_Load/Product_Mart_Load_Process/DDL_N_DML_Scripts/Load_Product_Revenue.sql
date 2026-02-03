
/* ==================================================================================
   Load Data - Product Revenue Analysis
   ================================================================================== */

USE EDW_STAGE_DB;

INSERT INTO EDW_DIM_DB.Product_Revenue_Analysis (ProductName, CategoryName, SupplierName, TotalUnitsSold, NumberOfOrders, TotalRevenue)
SELECT 
    p.ProductName,
    c.CategoryName,
    s.SupplierName,
    SUM(od.Quantity) AS TotalUnitsSold,
    COUNT(DISTINCT o.OrderID) AS NumberOfOrders,
    -- Calculate revenue using the price at the time of order (from OrderDetails)
    SUM(od.Quantity * od.UnitPrice) AS TotalRevenue
FROM 
    OrderDetails od
    INNER JOIN EDW_STAGE_DB.Products p ON od.ProductID = p.ProductID
    INNER JOIN EDW_STAGE_DB.Orders o ON od.OrderID = o.OrderID
    INNER JOIN EDW_STAGE_DB.Categories c ON p.CategoryID = c.CategoryID
    INNER JOIN EDW_STAGE_DB.Suppliers s ON p.SupplierID = s.SupplierID
WHERE 
    -- Filter to include only completed sales
    o.Status IN ('Shipped', 'Delivered')
GROUP BY 
    p.ProductID, p.ProductName, c.CategoryName, s.SupplierName
ORDER BY 
    TotalRevenue DESC;