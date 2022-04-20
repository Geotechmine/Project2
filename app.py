#Import necessary libraries
from flask import Flask, jsonify, render_template
#import the data from data.py file
from data import Peizo_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/api/v1.0/peizometer-readings")
def justice_league():
    """Return the Peizometer reading data as json"""
    return jsonify(Peizo_data)

#Create route that renders three different html pages
@app.route("/Home")
def home():
   
   return render_template("homepage.html")

@app.route("/Findings")
def finding():
   
   return render_template("findings.html")

@app.route("/Map")
def map():
   
   return render_template("map.html")

#Create route that takes to the main page
@app.route("/")
def welcome():
    return (
        f"Welcome to the Monitoring of Tailings API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/peizometer-readings:<br/>"
        f"/Home"
    )


if __name__ == "__main__":
    app.run(debug=True)
