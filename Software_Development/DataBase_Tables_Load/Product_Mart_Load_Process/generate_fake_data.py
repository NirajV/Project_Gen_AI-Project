import os
import random
import datetime
from faker import Faker
from db_connection import create_db_connection, HOST, PORT, USER, PASSWORD, DATABASE

# Initialize Faker
fake = Faker()

def get_max_id(cursor, table, id_column):
    """Gets the maximum ID from a table."""
    cursor.execute(f"SELECT MAX({id_column}) FROM {table}")
    max_id = cursor.fetchone()[0]
    return max_id if max_id is not None else 0

def get_existing_ids(cursor, table, id_column):
    """Gets all existing IDs from a table."""
    cursor.execute(f"SELECT {id_column} FROM {table}")
    return [item[0] for item in cursor.fetchall()]

def generate_departments(cursor, num_to_generate):
    """Generates and inserts fake data for the Departments table."""
    max_id = get_max_id(cursor, "Departments", "DepartmentID")
    new_departments = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        name = fake.job() + " Department"
        location = fake.city()
        new_departments.append((next_id, name, location))
    
    query = "INSERT INTO Departments (DepartmentID, DepartmentName, Location) VALUES (%s, %s, %s)"
    cursor.executemany(query, new_departments)
    print(f"Inserted {num_to_generate} new departments.")

def generate_employees(cursor, num_to_generate):
    """Generates and inserts fake data for the Employees table."""
    max_id = get_max_id(cursor, "Employees", "EmployeeID")
    department_ids = get_existing_ids(cursor, "Departments", "DepartmentID")
    if not department_ids:
        print("Cannot generate employees without departments.")
        return

    new_employees = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = f"{first_name.lower()}.{last_name.lower()}{i}@{fake.domain_name()}"
        department_id = random.choice(department_ids)
        hire_date = fake.date_between(start_date="-10y", end_date="today")
        new_employees.append((next_id, first_name, last_name, email, department_id, hire_date))

    query = "INSERT INTO Employees (EmployeeID, FirstName, LastName, Email, DepartmentID, HireDate) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.executemany(query, new_employees)
    print(f"Inserted {num_to_generate} new employees.")

def generate_categories(cursor, num_to_generate):
    """Generates and inserts fake data for the Categories table."""
    max_id = get_max_id(cursor, "Categories", "CategoryID")
    new_categories = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        name = fake.word().capitalize() + " Goods"
        description = fake.sentence()
        new_categories.append((next_id, name, description))
    
    query = "INSERT INTO Categories (CategoryID, CategoryName, Description) VALUES (%s, %s, %s)"
    cursor.executemany(query, new_categories)
    print(f"Inserted {num_to_generate} new categories.")

def generate_suppliers(cursor, num_to_generate):
    """Generates and inserts fake data for the Suppliers table."""
    max_id = get_max_id(cursor, "Suppliers", "SupplierID")
    new_suppliers = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        company_name = fake.company()
        contact_name = fake.name()
        phone = fake.phone_number()[:20]
        country = fake.country()
        new_suppliers.append((next_id, company_name, contact_name, phone, country))

    query = "INSERT INTO Suppliers (SupplierID, SupplierName, ContactName, Phone, Country) VALUES (%s, %s, %s, %s, %s)"
    cursor.executemany(query, new_suppliers)
    print(f"Inserted {num_to_generate} new suppliers.")

def generate_products(cursor, num_to_generate):
    """Generates and inserts fake data for the Products table."""
    max_id = get_max_id(cursor, "Products", "ProductID")
    category_ids = get_existing_ids(cursor, "Categories", "CategoryID")
    supplier_ids = get_existing_ids(cursor, "Suppliers", "SupplierID")
    if not category_ids or not supplier_ids:
        print("Cannot generate products without categories and suppliers.")
        return

    new_products = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        product_name = fake.bs().capitalize()
        category_id = random.choice(category_ids)
        supplier_id = random.choice(supplier_ids)
        unit_price = round(random.uniform(10.0, 500.0), 2)
        stock_quantity = random.randint(10, 200)
        new_products.append((next_id, product_name, category_id, supplier_id, unit_price, stock_quantity))

    query = "INSERT INTO Products (ProductID, ProductName, CategoryID, SupplierID, UnitPrice, StockQuantity) VALUES (%s, %s, %s, %s, %s, %s)"
    cursor.executemany(query, new_products)
    print(f"Inserted {num_to_generate} new products.")

def generate_customers(cursor, num_to_generate):
    """Generates and inserts fake data for the Customers table."""
    max_id = get_max_id(cursor, "Customers", "CustomerID")
    new_customers = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = f"{first_name.lower()}.{last_name.lower()}{i}@{fake.domain_name()}"
        phone = fake.phone_number()[:20]
        address = fake.street_address()
        city = fake.city()
        country = fake.country()
        new_customers.append((next_id, first_name, last_name, email, phone, address, city, country))

    query = "INSERT INTO Customers (CustomerID, FirstName, LastName, Email, Phone, Address, City, Country) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.executemany(query, new_customers)
    print(f"Inserted {num_to_generate} new customers.")

def generate_shippers(cursor, num_to_generate):
    """Generates and inserts fake data for the Shippers table."""
    max_id = get_max_id(cursor, "Shippers", "ShipperID")
    new_shippers = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        company_name = fake.company() + " Logistics"
        phone = fake.phone_number()[:20]
        new_shippers.append((next_id, company_name, phone))
    
    query = "INSERT INTO Shippers (ShipperID, CompanyName, Phone) VALUES (%s, %s, %s)"
    cursor.executemany(query, new_shippers)
    print(f"Inserted {num_to_generate} new shippers.")

def generate_orders(cursor, num_to_generate):
    """Generates and inserts fake data for the Orders table."""
    max_id = get_max_id(cursor, "Orders", "OrderID")
    customer_ids = get_existing_ids(cursor, "Customers", "CustomerID")
    employee_ids = get_existing_ids(cursor, "Employees", "EmployeeID")
    shipper_ids = get_existing_ids(cursor, "Shippers", "ShipperID")
    if not customer_ids or not employee_ids or not shipper_ids:
        print("Cannot generate orders without customers, employees, and shippers.")
        return

    new_orders = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        customer_id = random.choice(customer_ids)
        employee_id = random.choice(employee_ids)
        order_date = fake.date_between(start_date="-2y", end_date="today")
        shipper_id = random.choice(shipper_ids)
        total_amount = round(random.uniform(50.0, 2000.0), 2)
        status = random.choice(['Pending', 'Shipped', 'Delivered'])
        new_orders.append((next_id, customer_id, employee_id, order_date, shipper_id, total_amount, status))

    query = "INSERT INTO Orders (OrderID, CustomerID, EmployeeID, OrderDate, ShipperID, TotalAmount, Status) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.executemany(query, new_orders)
    print(f"Inserted {num_to_generate} new orders.")

def generate_order_details(cursor, num_to_generate):
    """Generates and inserts fake data for the OrderDetails table."""
    order_ids = get_existing_ids(cursor, "Orders", "OrderID")
    product_ids = get_existing_ids(cursor, "Products", "ProductID")
    if not order_ids or not product_ids:
        print("Cannot generate order details without orders and products.")
        return

    new_order_details = []
    # This is a composite key, so we need to make sure the combination is unique.
    # We'll just generate random pairs and hope for the best for this example,
    # but in a real-world scenario, we'd need to be more careful.
    existing_pairs = set()
    cursor.execute("SELECT OrderID, ProductID FROM OrderDetails")
    for pair in cursor.fetchall():
        existing_pairs.add(pair)
    
    generated_count = 0
    while generated_count < num_to_generate:
        order_id = random.choice(order_ids)
        product_id = random.choice(product_ids)
        if (order_id, product_id) in existing_pairs:
            continue
        
        quantity = random.randint(1, 10)
        unit_price = round(random.uniform(10.0, 500.0), 2)
        new_order_details.append((order_id, product_id, quantity, unit_price))
        existing_pairs.add((order_id, product_id))
        generated_count += 1

    query = "INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice) VALUES (%s, %s, %s, %s)"
    cursor.executemany(query, new_order_details)
    print(f"Inserted {num_to_generate} new order details.")

def generate_payments(cursor, num_to_generate):
    """Generates and inserts fake data for the Payments table."""
    max_id = get_max_id(cursor, "Payments", "PaymentID")
    order_ids = get_existing_ids(cursor, "Orders", "OrderID")
    if not order_ids:
        print("Cannot generate payments without orders.")
        return

    new_payments = []
    for i in range(num_to_generate):
        next_id = max_id + i + 1
        order_id = random.choice(order_ids)
        payment_date = fake.date_between(start_date="-1y", end_date="today")
        amount = round(random.uniform(50.0, 2000.0), 2)
        payment_method = random.choice(['Credit Card', 'PayPal', 'Bank Transfer'])
        new_payments.append((next_id, order_id, payment_date, amount, payment_method))

    query = "INSERT INTO Payments (PaymentID, OrderID, PaymentDate, Amount, PaymentMethod) VALUES (%s, %s, %s, %s, %s)"
    cursor.executemany(query, new_payments)
    print(f"Inserted {num_to_generate} new payments.")

def main():
    """Main function to generate fake data for all tables."""
    connection = create_db_connection(HOST, USER, PASSWORD, DATABASE, PORT)
    if not connection:
        print("Failed to connect to the database.")
        return

    try:
        cursor = connection.cursor()

        # Define how many records to generate for each table
        NUM_DEPARTMENTS = 5
        NUM_EMPLOYEES = 20
        NUM_CATEGORIES = 3
        NUM_SUPPLIERS = 7
        NUM_PRODUCTS = 30
        NUM_CUSTOMERS = 50
        NUM_SHIPPERS = 2
        NUM_ORDERS = 100
        NUM_ORDER_DETAILS = 200
        NUM_PAYMENTS = 90
        
        print("Starting fake data generation...")
        
        # Generate data in order of dependency
        generate_departments(cursor, NUM_DEPARTMENTS)
        generate_employees(cursor, NUM_EMPLOYEES)
        generate_categories(cursor, NUM_CATEGORIES)
        generate_suppliers(cursor, NUM_SUPPLIERS)
        generate_products(cursor, NUM_PRODUCTS)
        generate_customers(cursor, NUM_CUSTOMERS)
        generate_shippers(cursor, NUM_SHIPPERS)
        generate_orders(cursor, NUM_ORDERS)
        generate_order_details(cursor, NUM_ORDER_DETAILS)
        generate_payments(cursor, NUM_PAYMENTS)

        connection.commit()
        print("Successfully generated and inserted fake data.")

    except Exception as e:
        print(f"An error occurred: {e}")
        connection.rollback()
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("Database connection closed.")


if __name__ == "__main__":
    main()
