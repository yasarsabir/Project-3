from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

data = pd.read_csv(r"C:\Users\savyl\OneDrive\Desktop\GitHub\Project-3\Flask App\Resources\data.csv")
data_dict = data.to_dict()

@app.route('/')
def dashboard():
    return render_template('index.html')

@app.route('/vaccine')
def vaccine():
    return render_template('vaccine.html')

@app.route('/location/<string:location_name>')
def location_details(location_name):
    location = data_dict.get(location_name)
    if location:
        return render_template('location_details.html', location=location)
    else:
        return 'Location not found.'

@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        query = request.form.get('query')
        search_results = [loc for loc in data_dict['location'] if query.lower() in loc.lower()]
        return render_template('search_results.html', results=search_results, query=query)
    return render_template('search.html')

if __name__ == '__main__':
    app.run(debug=True)
