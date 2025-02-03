from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

# 🔹 Configuration de la base de données PostgreSQL
DB_CONFIG = {
    "dbname": "STOCK_Magazin",
    "user": "postgres",
    "password": "2003",
    "host": "localhost",
    "port": 5432
}


def query_database(query):
    """ Fonction générique pour exécuter une requête et retourner le résultat. """
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        cursor.execute(query)
        result = cursor.fetchone()[0]  # Récupérer le premier résultat
        cursor.close()
        conn.close()
        return result
    except Exception as e:
        return str(e)

@app.route('/check_data', methods=['GET'])
def check_data():
    """ Vérifier si des données existent dans chaque table. """
    data = {
        "categories": query_database("SELECT COUNT(*) FROM categories"),
        "types_vetements": query_database("SELECT COUNT(*) FROM types_vetements"),
        "tailles": query_database("SELECT COUNT(*) FROM tailles"),
        "stock": query_database("SELECT COUNT(*) FROM stock"),
        "clients": query_database("SELECT COUNT(*) FROM clients"),
        "commandes": query_database("SELECT COUNT(*) FROM commandes")
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8970, debug=True)