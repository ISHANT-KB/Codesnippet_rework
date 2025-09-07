import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_mysql_password",  # Change this accordingly
    database="grocery_db"
)

cursor = conn.cursor()

# Function to add an item
def add_item():
    try:
        name = input("Enter item name: ")
        price = float(input("Enter item price: "))
        quantity = int(input("Enter quantity: "))

        query = "INSERT INTO grocery_items (item_name, price, quantity) VALUES (%s, %s, %s)"
        cursor.execute(query, (name, price, quantity))
        conn.commit()
        print("✅ Item added successfully.")
    except ValueError:
        print("⚠️ Invalid input! Price must be a number and quantity must be an integer.")
    except Exception as e:
        print("⚠️ Error while adding item:", e)

# Function to view all items
def view_items():
    try:
        cursor.execute("SELECT * FROM grocery_items")
        rows = cursor.fetchall()
        print("\n📦 Inventory:")
        print("ID | Name         | Price   | Quantity")
        print("---------------------------------------")
        for row in rows:
            print(f"{row[0]:<3}| {row[1]:<12}| ₹{row[2]:<7.2f}| {row[3]}")
        print()
    except Exception as e:
        print("⚠️ Error while fetching items:", e)

# Function to update item quantity or price
def update_item():
    try:
        item_id = int(input("Enter item ID to update: "))
        new_price = float(input("Enter new price: "))
        new_quantity = int(input("Enter new quantity: "))

        query = "UPDATE grocery_items SET price = %s, quantity = %s WHERE item_id = %s"
        cursor.execute(query, (new_price, new_quantity, item_id))
        conn.commit()

        if cursor.rowcount > 0:
            print("🔄 Item updated successfully.")
        else:
            print("❌ Item not found.")
    except ValueError:
        print("⚠️ Invalid input! Please enter valid numbers.")
    except Exception as e:
        print("⚠️ Error while updating item:", e)

# Function to delete an item
def delete_item():
    try:
        item_id = int(input("Enter item ID to delete: "))
        cursor.execute("DELETE FROM grocery_items WHERE item_id = %s", (item_id,))
        conn.commit()

        if cursor.rowcount > 0:
            print("🗑️ Item deleted successfully.")
        else:
            print("❌ Item not found.")
    except ValueError:
        print("⚠️ Invalid input! Please enter a valid item ID.")
    except Exception as e:
        print("⚠️ Error while deleting item:", e)

# Function to search for an item by name (case-insensitive)
def search_item():
    try:
        name = input("Enter item name to search: ")
        query = "SELECT * FROM grocery_items WHERE LOWER(item_name) LIKE %s"
        cursor.execute(query, (f"%{name.lower()}%",))
        rows = cursor.fetchall()

        print("\n🔍 Search Results:")
        if rows:
            for row in rows:
                print(f"ID: {row[0]} | Name: {row[1]} | Price: ₹{row[2]:.2f} | Quantity: {row[3]}")
        else:
            print("❌ No matching items found.")
    except Exception as e:
        print("⚠️ Error while searching item:", e)

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
if __name__ == "__main__":
    try:
        menu()
    finally:
        cursor.close()
        conn.close()