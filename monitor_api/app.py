from flask import Flask, request, jsonify
from flask_cors import CORS
from routers import switch

app = Flask(__name__)
CORS(app, origins=["*"])

app.register_blueprint(switch.switch_bp)


@app.route('/health', methods=["GET"])
def health():
    return jsonify(
        {
            "status": "health",
        }
    )



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)