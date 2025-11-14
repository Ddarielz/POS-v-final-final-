'''import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="daniel",
    password="123456",
    database="pos"
)

cursor = connection.cursor()
cursor.execute("SELECT code_product, name_product, price_product FROM products LIMIT 10")

for row in cursor.fetchall():
    print(row)'''

import tkinter as tk
from tkinter import ttk, messagebox
import mysql.connector

class POSApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Sistema POS - Productos")
        self.root.geometry("800x600")
        
        # Configurar la conexión a la base de datos
        self.connection = None
        self.cursor = None
        
        self.create_widgets()
        self.connect_to_database()
        self.load_products()
    
    def create_widgets(self):
        # Frame principal
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Título
        title_label = ttk.Label(main_frame, text="Lista de Productos", 
                               font=("Arial", 16, "bold"))
        title_label.grid(row=0, column=0, columnspan=2, pady=(0, 20))
        
        # Botón para actualizar
        refresh_btn = ttk.Button(main_frame, text="Actualizar", 
                                command=self.load_products)
        refresh_btn.grid(row=1, column=0, pady=(0, 10), sticky=tk.W)
        
        # Botón para conectar/desconectar
        self.conn_btn = ttk.Button(main_frame, text="Desconectar", 
                                  command=self.toggle_connection)
        self.conn_btn.grid(row=1, column=1, pady=(0, 10), sticky=tk.E)
        
        # Treeview para mostrar los productos
        columns = ('Código', 'Nombre', 'Precio')
        self.tree = ttk.Treeview(main_frame, columns=columns, show='headings', height=20)
        
        # Configurar columnas
        self.tree.heading('Código', text='Código')
        self.tree.heading('Nombre', text='Nombre del Producto')
        self.tree.heading('Precio', text='Precio')
        
        self.tree.column('Código', width=100, anchor=tk.CENTER)
        self.tree.column('Nombre', width=400, anchor=tk.W)
        self.tree.column('Precio', width=150, anchor=tk.E)
        
        self.tree.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Scrollbar para el treeview
        scrollbar = ttk.Scrollbar(main_frame, orient=tk.VERTICAL, command=self.tree.yview)
        scrollbar.grid(row=2, column=2, sticky=(tk.N, tk.S))
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        # Frame de información
        info_frame = ttk.Frame(main_frame)
        info_frame.grid(row=3, column=0, columnspan=2, pady=(10, 0), sticky=(tk.W, tk.E))
        
        self.status_label = ttk.Label(info_frame, text="Conectando a la base de datos...")
        self.status_label.grid(row=0, column=0, sticky=tk.W)
        
        # Configurar el grid para que sea responsive
        main_frame.columnconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(2, weight=1)
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
    
    def connect_to_database(self):
        try:
            self.connection = mysql.connector.connect(
                host="localhost",
                user="daniel",
                password="123456",
                database="pos"
            )
            self.cursor = self.connection.cursor()
            self.status_label.config(text="✅ Conectado a la base de datos")
            self.conn_btn.config(text="Desconectar")
        except mysql.connector.Error as err:
            self.status_label.config(text=f"❌ Error de conexión: {err}")
            messagebox.showerror("Error de Conexión", f"No se pudo conectar a la base de datos:\n{err}")
    
    def toggle_connection(self):
        if self.connection and self.connection.is_connected():
            self.disconnect_database()
            self.conn_btn.config(text="Conectar")
        else:
            self.connect_to_database()
            if self.connection and self.connection.is_connected():
                self.load_products()
    
    def disconnect_database(self):
        if self.cursor:
            self.cursor.close()
        if self.connection and self.connection.is_connected():
            self.connection.close()
        self.status_label.config(text="🔌 Desconectado de la base de datos")
        # Limpiar la tabla
        for item in self.tree.get_children():
            self.tree.delete(item)
    
    def load_products(self):
        if not self.connection or not self.connection.is_connected():
            messagebox.showwarning("Advertencia", "No hay conexión a la base de datos")
            return
        
        try:
            # Limpiar tabla existente
            for item in self.tree.get_children():
                self.tree.delete(item)
            
            # Ejecutar consulta
            self.cursor.execute("SELECT code_product, name_product, price_product FROM products WHERE code_product = '100'")
            
            # Insertar datos en la tabla
            for row in self.cursor.fetchall():
                # Formatear el precio para mejor visualización
                formatted_price = f"${row[2]:.2f}" if row[2] else "$0.00"
                self.tree.insert('', tk.END, values=(row[0], row[1], formatted_price))
            
            # Actualizar contador
            item_count = len(self.tree.get_children())
            self.status_label.config(text=f"✅ Mostrando {item_count} productos")
            
        except mysql.connector.Error as err:
            messagebox.showerror("Error", f"Error al cargar productos:\n{err}")
    
    def __del__(self):
        # Cerrar conexiones al salir
        if hasattr(self, 'cursor') and self.cursor:
            self.cursor.close()
        if hasattr(self, 'connection') and self.connection and self.connection.is_connected():
            self.connection.close()

def main():
    root = tk.Tk()
    app = POSApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()