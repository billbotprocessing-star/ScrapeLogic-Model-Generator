import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for your Replit domain

# Configuration: Store these in Replit "Secrets" (Environment Variables)
N8N_WEBHOOK_URL = os.environ.get("N8N_WEBHOOK_URL")
API_AUTH_KEY = os.environ.get("SCRAPELOGIC_SECRET_KEY")

@app.route('/analyze', methods=['POST'])
def bridge_to_n8n():
    """
    Receives URL from frontend, validates request, and triggers n8n pipeline.
    """
    try:
        data = request.json
        target_url = data.get("url")

        if not target_url:
            return jsonify({"error": "No URL provided"}), 400

        # Optional: Internal Security Check
        # auth_header = request.headers.get("X-API-KEY")
        # if auth_header != API_AUTH_KEY:
        #     return jsonify({"error": "Unauthorized"}), 401

        # Payload to send to n8n logic engine
        payload = {
            "url": target_url,
            "request_source": "scrapelogic-replit-ui",
            "model_version": "GPT-5.2-Creation"
        }

        # Forwarding to n8n
        print(f"Forwarding {target_url} to Logic Engine...")
        response = requests.post(N8N_WEBHOOK_URL, json=payload)
        
        # Return n8n's output directly to the frontend
        return jsonify(response.json()), response.status_code

    except Exception as e:
        print(f"Bridge Error: {str(e)}")
        return jsonify({"error": "Internal Bridge Failure", "details": str(e)}), 500

if __name__ == "__main__":
    # Standard Replit port
    app.run(host='0.0.0.0', port=8080)
