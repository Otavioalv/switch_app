from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/health', methods=["GET"])
def health():
    return jsonify(
        {
            "status": "health",
        }
    )



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)