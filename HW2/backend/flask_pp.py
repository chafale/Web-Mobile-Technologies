from flask import Flask, request, render_template
import pandas as pd
import joblib

app = Flask(__name__)


def load(age, weight):
    clf = joblib.load("regr.pkl")
    x = pd.DataFrame([[age, weight]], columns=["Age", "Weight"])
    prediction = clf.predict(x)[0]
    return prediction

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/predict_bp', methods=['GET', 'POST'])
def predictBP():
    age = request.args.get("age")
    weight = request.args.get("weight")
    return render_template("index.html", predict=str(load(int(age), int(weight))))


if __name__ == "__main__":
    app.run(host='localhost', port=8088, debug=True)
