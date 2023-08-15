# Import dependencies

from flask import Flask, render_template, request
#from modules import convert_to_dict, make_ordinal
import pandas as pd
app = Flask(__name__)
#from flask_cors import cross_origin

# Simulated data
vaccination_data = [
    {"location": "Country A", "total_vaccinations": 1000},
    {"location": "Country B", "total_vaccinations": 1500},
    {"location": "Country C", "total_vaccinations": 800}
]

data = pd.read_csv(r"C:\Users\savyl\OneDrive\Desktop\GitHub\Project-3\Flask App\Resources\data.csv")

data_dict = data.to_dict()
print(data_dict["location"])


# Home page
# @app.route('/')
# def home():
#     return 'Welcome to the COVID-19 Vaccination Data Dashboard!'

# Dashboard page with list of locations
@app.route('/')
def dashboard():
    return render_template('index.html')
 #return render_template('dashboard.html', data=data["location"])


# Location details page
@app.route('/location/<string:location_name>')
def location_details(location_name):
    location = next((loc for loc in data if loc['location'] == location_name), None)
    if location:
        return render_template('location_details.html', location=data["location"])
    else:
        return 'Location not found.'
    
# Search page
@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        query = request.form.get('query')
        search_results = [loc for loc in data if query.lower() in loc['location'].lower()]
        return render_template('search_results.html', results=search_results, query=query)
    return render_template('search.html')

if __name__ == '__main__':
    app.run(debug=True)

