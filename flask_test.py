from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

# -------------------------------------
# FUNCIÓN PARA CONECTARSE A LA BASE
# -------------------------------------
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="daniel",
        password="123456",
        database="pos"
    )

# -------------------------------------
# RUTA PRINCIPAL
# -------------------------------------
@app.route("/")
def root():
    return render_template("index.html")

# -------------------------------------
# LISTAR PRODUCTOS (solo ejemplo)
# -------------------------------------
@app.route("/products")
def products():
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT code_product, name_product, price_product FROM products")
        products = cursor.fetchall()

        cursor.close()
        connection.close()

        return render_template("products.html", products=products)

    except mysql.connector.Error as err:
        return f"Error de conexión: {err}", 500

# -------------------------------------
# PRODUCTO POR CÓDIGO (API JSON)
# -------------------------------------
@app.route("/products/<code_product>")
def product(code_product):
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            "SELECT code_product, name_product, price_product FROM products WHERE code_product = %s",
            (code_product,)
        )
        product = cursor.fetchone()

        cursor.close()
        connection.close()

        if not product:
            return jsonify(error="Producto no encontrado"), 404

        return jsonify(product=product), 200

    except mysql.connector.Error as err:
        return f"Error de conexión: {err}", 500

# -------------------------------------
# OBTENER PRODUCTO DESDE ?code=101
# -------------------------------------
@app.route("/product")
def product_get():
    code = request.args.get("code")

    if not code:
        return "Falta el parámetro 'code'", 400

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            "SELECT code_product, name_product, price_product FROM products WHERE code_product = %s",
            (code,)
        )
        product = cursor.fetchone()

        cursor.close()
        connection.close()

        if not product:
            return "Producto no encontrado", 404

        # Reutiliza la misma plantilla de la lista pero con 1 producto
        return render_template("product.html", products=[product])

    except mysql.connector.Error as err:
        return f"Error de conexión: {err}", 500

# -------------------------------------
# ARRANCAR SERVIDOR
# -------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
