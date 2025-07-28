import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_password",  # replace with your actual MySQL password
    database="bank_db"
)
cursor = conn.cursor()

def create_account():
    acc_no = int(input("Enter Account Number: "))
    name = input("Enter Name: ")
    balance = float(input("Enter Initial Balance: "))
    
    query = "INSERT INTO accounts (account_no, name, balance) VALUES (%s, %s, %s)"
    values = (acc_no, name, balance)
    
    try:
        cursor.execute(query, values)
        conn.commit()
        print("✅ Account created successfully.")
    except mysql.connector.Error as err:
        print("❌ Error:", err)

def deposit():
    acc_no = int(input("Enter Account Number: "))
    amount = float(input("Enter amount to deposit: "))
    
    cursor.execute("SELECT balance FROM accounts WHERE account_no = %s", (acc_no,))
    result = cursor.fetchone()
    
    if result:
        new_balance = result[0] + amount
        cursor.execute("UPDATE accounts SET balance = %s WHERE account_no = %s", (new_balance, acc_no))
        conn.commit()
        print("✅ Deposit successful.")
    else:
        print("❌ Account not found.")

def withdraw():
    acc_no = int(input("Enter Account Number: "))
    amount = float(input("Enter amount to withdraw: "))
    
    cursor.execute("SELECT balance FROM accounts WHERE account_no = %s", (acc_no,))
    result = cursor.fetchone()
    
    if result:
        if result[0] >= amount:
            new_balance = result[0] - amount
            cursor.execute("UPDATE accounts SET balance = %s WHERE account_no = %s", (new_balance, acc_no))
            conn.commit()
            print("✅ Withdrawal successful.")
        else:
            print("❌ Insufficient balance.")
    else:
        print("❌ Account not found.")

def check_balance():
    acc_no = int(input("Enter Account Number: "))
    cursor.execute("SELECT name, balance FROM accounts WHERE account_no = %s", (acc_no,))
    result = cursor.fetchone()
    
    if result:
        print(f"👤 Account Holder: {result[0]}")
        print(f"💰 Current Balance: ₹{result[1]}")
    else:
        print("❌ Account not found.")

def delete_account():
    acc_no = int(input("Enter Account Number to delete: "))
    cursor.execute("SELECT * FROM accounts WHERE account_no = %s", (acc_no,))
    result = cursor.fetchone()
    
    if result:
        cursor.execute("DELETE FROM accounts WHERE account_no = %s", (acc_no,))
        conn.commit()
        print("🗑️ Account deleted successfully.")
    else:
        print("❌ Account not found.")

def menu():
    while True:
        print("\n===== 🏦 Bank Management System =====")
        print("1. Create Account")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Check Balance")
        print("5. Delete Account")
        print("6. Exit")
        
        choice = input("Enter choice: ")
        
        if choice == '1':
            create_account()
        elif choice == '2':
            deposit()
        elif choice == '3':
            withdraw()
        elif choice == '4':
            check_balance()
        elif choice == '5':
            delete_account()
        elif choice == '6':
            print("👋 Exiting. Thank you!")
            break
        else:
            print("❌ Invalid choice. Try again.")

menu()

# Close connection when done
cursor.close()
conn.close()