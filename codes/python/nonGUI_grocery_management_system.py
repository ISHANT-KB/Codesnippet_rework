import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_mysql_password",  # Change this
    database="grocery_db"
)

cursor = conn.cursor()

# Function to add an item
def add_item():
    name = input("Enter item name: ")
    price = float(input("Enter item price: "))
    quantity = int(input("Enter quantity: "))
    query = "INSERT INTO grocery_items (item_name, price, quantity) VALUES (%s, %s, %s)"
    cursor.execute(query, (name, price, quantity))
    conn.commit()
    print("✅ Item added successfully.")

# Function to view all items
def view_items():
    cursor.execute("SELECT * FROM grocery_items")
    rows = cursor.fetchall()
    print("\n📦 Inventory:")
    print("ID | Name         | Price   | Quantity")
    print("---------------------------------------")
    for row in rows:
        print(f"{row[0]:<3}| {row[1]:<12}| ₹{row[2]:<7.2f}| {row[3]}")
    print()

# Function to update item quantity or price
def update_item():
    item_id = int(input("Enter item ID to update: "))
    new_price = float(input("Enter new price: "))
    new_quantity = int(input("Enter new quantity: "))
    query = "UPDATE grocery_items SET price = %s, quantity = %s WHERE item_id = %s"
    cursor.execute(query, (new_price, new_quantity, item_id))
    conn.commit()
    print("🔄 Item updated successfully.")

# Function to delete an item
def delete_item():
    item_id = int(input("Enter item ID to delete: "))
    cursor.execute("DELETE FROM grocery_items WHERE item_id = %s", (item_id,))
    conn.commit()
    print("🗑️ Item deleted successfully.")

# Function to search for an item by name
def search_item():
    name = input("Enter item name to search: ")
    query = "SELECT * FROM grocery_items WHERE item_name LIKE %s"
    cursor.execute(query, (f"%{name}%",))
    rows = cursor.fetchall()
    print("\n🔍 Search Results:")
    for row in rows:
        print(f"ID: {row[0]} | Name: {row[1]} | Price: ₹{row[2]:.2f} | Quantity: {row[3]}")
    if not rows:
        print("❌ No matching items found.")

# Main menu
def menu():
    while True:
        print("\n--- Grocery Management System ---")
        print("1. Add Item")
        print("2. View Items")
        print("3. Update Item")
        print("4. Delete Item")
        print("5. Search Item")
        print("6. Exit")

        choice = input("Enter choice: ")

        if choice == '1':
            add_item()
        elif choice == '2':
            view_items()
        elif choice == '3':
            update_item()
        elif choice == '4':
            delete_item()
        elif choice == '5':
            search_item()
        elif choice == '6':
            print("👋 Exiting... Thank you!")
            break
        else:
            print("⚠️ Invalid choice. Please try again.")

# Start the app
menu()

# Close MySQL connection
cursor.close()
conn.close()