
import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
host='localhost',
user='root',
password='your_mysql_password', # Change this
database='airline_system'
)
cursor = conn.cursor()

def add_flight():
   name = input("Enter Flight Name: ")
   source = input("Enter Source: ")
   dest = input("Enter Destination: ")
   time = input("Enter Departure Time: ")
   query = "INSERT INTO flights (flight_name, source, destination, departure_time) VALUES (%s, %s, %s, %s)"
   cursor.execute(query, (name, source, dest, time))
   conn.commit()
   print("✅ Flight added successfully!\n")

def view_flights():
   cursor.execute("SELECT * FROM flights")
   flights = cursor.fetchall()
   print("\n--- Available Flights ---")
   for f in flights:
   print(f"ID: {f[0]}, Name: {f[1]}, From: {f[2]}, To: {f[3]}, Time: {f[4]}")
   print()

def book_ticket():
   view_flights()
   fid = input("Enter Flight ID to Book: ")
   name = input("Enter Passenger Name: ")
   query = "INSERT INTO bookings (flight_id, passenger_name) VALUES (%s, %s)"
   cursor.execute(query, (fid, name))
   conn.commit()
   print("🎟️ Ticket booked successfully!\n")

def view_bookings():
   cursor.execute("""
   SELECT b.booking_id, b.passenger_name, f.flight_name
   FROM bookings b
   JOIN flights f ON b.flight_id = f.flight_id
   """)
   bookings = cursor.fetchall()
   print("\n--- All Bookings ---")
   for b in bookings:
   print(f"Booking ID: {b[0]}, Passenger: {b[1]}, Flight: {b[2]}")
   print()

def cancel_booking():
   view_bookings()
   bid = input("Enter Booking ID to cancel: ")
   cursor.execute("DELETE FROM bookings WHERE booking_id = %s", (bid,))
   conn.commit()
   print("❌ Booking cancelled.\n")

def main():
   while True:
   print("📋 Airline Management System")
   print("1. Add Flight")
   print("2. View Flights")
   print("3. Book Ticket")
   print("4. View Bookings")
   print("5. Cancel Booking")
   print("6. Exit")
   
   choice = input("Enter your choice: ")
   print()
   
   if choice == '1':
   add_flight()
   elif choice == '2':
   view_flights()
   elif choice == '3':
   book_ticket()
   elif choice == '4':
   view_bookings()
   elif choice == '5':
   cancel_booking()
   elif choice == '6':
   break
   else:
   print("Invalid choice. Try again.\n")

cursor.close()
conn.close()
print("🔚 Program exited.")

if __name__ == "__main__":
main()