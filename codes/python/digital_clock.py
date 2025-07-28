
import tkinter as tk
from time import strftime
from datetime import datetime

# Create the main window
root = tk.Tk()
root.title("Digital Clock with Date")
root.geometry("500x200")
root.resizable(False, False)
root.configure(bg="#0f172a") # Dark background

# Function to update both time and date
def update_clock():
   current_time = strftime('%H:%M:%S %p')
   current_date = strftime('%A, %d %B %Y') # Example: Monday, 21 July 2025
   time_label.config(text=current_time)
   date_label.config(text=current_date)
   root.after(1000, update_clock)

# Time label styling
time_label = tk.Label(root,
font=('Consolas', 48, 'bold'),
background="#0f172a",
foreground="#00d4ff",
pady=10)
time_label.pack()

# Date label styling
date_label = tk.Label(root,
font=('Segoe UI', 20, 'italic'),
background="#0f172a",
foreground="#7c3aed")
date_label.pack()

# Start updating
update_clock()

# Run the application
root.mainloop()