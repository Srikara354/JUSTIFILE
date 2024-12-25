from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model and vectorizer
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json().get('Description')
    if not data:
        return jsonify({"error": "No description provided"}), 400
    
    # Transform the input using the loaded vectorizer
    X_input = vectorizer.transform([data])
    prediction = model.predict(X_input)[0]

    # Convert to native Python type if necessary
    prediction = int(prediction) if isinstance(prediction, np.int64) else prediction

    return jsonify({"BNS_Section": prediction})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
