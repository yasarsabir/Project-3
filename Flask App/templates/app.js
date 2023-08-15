// 1. Use the D3 library to read in the JSON data
const file = "covid2.json";
const dataPromise = d3.json(file);
console.log("Data Promise: ", dataPromise);

// Create bar charts, scatter plot, and table with dropdown menus
dataPromise.then(function(data) {
  // Extract unique continents and dates from the data
  let uniqueContinents = [...new Set(data.map(d => d.continent))];
  let uniqueDates = [...new Set(data.map(d => d.date))];

  // Select the dropdown menus for continent and date
  let continentDropdown = d3.select("#continentDropdown");
  let dateDropdown = d3.select("#dateDropdown");

  // Populate the dropdown menus with options
  uniqueContinents.forEach(function(continent) {
    continentDropdown.append("option")
      .text(continent)
      .property("value", continent);
  });

  uniqueDates.forEach(function(date) {
    dateDropdown.append("option")
      .text(date)
      .property("value", date);
  });

  // Set the default values for continent and date
  let defaultContinent = uniqueContinents[0];
  let defaultDate = uniqueDates[0];

  // Call the updateBarCharts, updateScatterPlot, and updateTable functions to create the initial charts and table
  updateBarCharts(defaultContinent, defaultDate);
  updateScatterPlot(defaultContinent, defaultDate);
  updateTable(defaultContinent, defaultDate);

  // Define the updateBarCharts function to update all the bar charts when the dropdown menus are changed
function updateBarCharts(continent, date) {
  // Filter the data based on the selected continent and date
  let filteredData = data.filter(d => d.continent === continent && d.date === date);

  // Sort the filtered data based on the people_vaccinated_per_hundred metric in descending order
  filteredData.sort((a, b) => b.people_vaccinated_per_hundred - a.people_vaccinated_per_hundred);

  let locations = filteredData.map(d => d.location);
  let vaccinatedValues = filteredData.map(d => d.people_vaccinated_per_hundred);
  let percentages = filteredData.map(d => (d.people_fully_vaccinated / d.population) * 100);
  let totalDeaths = filteredData.map(d => d.total_deaths);
  let totalCases = filteredData.map(d => d.total_cases);
  let diabetesPrevalence = filteredData.map(d => d.diabetes_prevalence);

  // Create the trace for the vaccinated per hundred bar chart
  let trace1 = {
    x: vaccinatedValues,
    y: locations,
    type: "bar",
    orientation: "h",
    name: "Percentage Partially Vaccinated"
  };

  // Create the trace for the percentage fully vaccinated bar chart
  let trace2 = {
    x: percentages,
    y: locations,
    type: "bar",
    orientation: "h",
    name: "Percentage Fully Vaccinated"
  };

  // Define the layout for the bar charts
  let layout = {
    barmode: "group",
    title: "Vaccination Statistics by Location",
    xaxis: { title: "Percentage / Count" },
    yaxis: {
      title: "Location",
      automargin: true,
      side: "left"
    },
    margin: {
      l: 100,
      r: 100,
      t: 50,
      b: 50
    }
  };

  // Set the dimensions of the bar chart container
  let container = document.getElementById("bar");
  container.style.width = "1400px";
  container.style.height = "800px";

  // Plot the first two bar charts
  Plotly.newPlot("bar", [trace1, trace2], layout, { responsive: true });

  // Create a new div element for the total deaths bar chart
  let deathsContainer = document.createElement("div");
  deathsContainer.id = "deathsBar";
  deathsContainer.style.width = "100%";
  deathsContainer.style.height = "600px";

  // Append the new div to the document
  container.after(deathsContainer);

  // Create the trace for the total deaths bar chart
  let trace3 = {
    x: totalDeaths,
    y: locations,
    type: "bar",
    orientation: "h",
    name: "Total Deaths",
    marker: {
      color: 'rgba(214, 39, 40, 0.7)' // Change this color to your desired color 214, 39, 40, 0.7
    }
  };

  // Define the layout for the total deaths bar chart
  let deathsLayout = {
    title: "Total Deaths by Location",
    xaxis: { title: "Total Deaths" },
    yaxis: { title: "Location" },
    margin: {
      l: 100,
      r: 100,
      t: 50,
      b: 50
    }
  };

  // Plot the total deaths bar chart
  Plotly.newPlot("deathsBar", [trace3], deathsLayout, { responsive: true });

  // Create a new div element for the total cases bar chart
  let casesContainer = document.createElement("div");
  casesContainer.id = "casesBar";
  casesContainer.style.width = "100%";
  casesContainer.style.height = "600px";

  // Append the new div to the document
  deathsContainer.after(casesContainer);

  // Create the trace for the total cases bar chart
  let trace4 = {
    x: totalCases,
    y: locations,
    type: "bar",
    orientation: "h",
    name: "Total Cases",
    marker: {
      color: 'rgba(44, 160, 44, 0.7)' // Change this color to your desired color
    }
  };

  // Define the layout for the total cases bar chart
  let casesLayout = {
    title: "Total Cases by Location",
    xaxis: { title: "Total Cases" },
    yaxis: { title: "Location" },
    margin: {
      l: 100,
      r: 100,
      t: 50,
      b: 50
    }
  };

  // Plot the total cases bar chart
  Plotly.newPlot("casesBar", [trace4], casesLayout, { responsive: true });

  // Create a new div element for the diabetes prevalence bar chart
let diabetesContainer = document.createElement("div");
diabetesContainer.id = "diabetesBar";
diabetesContainer.style.width = "100%";
diabetesContainer.style.height = "600px";

// Append the new div to the document
casesContainer.after(diabetesContainer);

// Create the trace for the diabetes prevalence bar chart
let trace5 = {
  x: diabetesPrevalence,
  y: locations,
  type: "bar",
  orientation: "h",
  name: "Diabetes Prevalence",
  marker: {
    color: 'rgba(148, 103, 189, 0.7)'
  }
};

// Define the layout for the diabetes prevalence bar chart
let diabetesLayout = {
  title: "Diabetes Prevalence by Location",
  xaxis: { title: "Diabetes Prevalence" },
  yaxis: { title: "Location" },
  margin: {
    l: 100,
    r: 100,
    t: 50,
    b: 50
  }
};

// Plot the diabetes prevalence bar chart
Plotly.newPlot("diabetesBar", [trace5], diabetesLayout, { responsive: true });

// Create a new div element for the cardiovascular death rate bar chart
let cardioContainer = document.createElement("div");
cardioContainer.id = "cardioBar";
cardioContainer.style.width = "100%";
cardioContainer.style.height = "600px";

// Append the new div to the document
diabetesContainer.after(cardioContainer);

// Create the trace for the cardiovascular death rate bar chart
let trace6 = {
  x: filteredData.map(d => d.cardiovasc_death_rate),
  y: locations,
  type: "bar",
  orientation: "h",
  name: "Cardiovascular Death Rate",
  marker: {
    color: 'rgba(255, 127, 14, 0.7)'
  }
};

// Define the layout for the cardiovascular death rate bar chart
let cardioLayout = {
  title: "Cardiovascular Death Rate by Location",
  xaxis: { title: "Cardiovascular Death Rate" },
  yaxis: { title: "Location" },
  margin: {
    l: 100,
    r: 100,
    t: 50,
    b: 50
  }
};

// Plot the cardiovascular death rate bar chart
Plotly.newPlot("cardioBar", [trace6], cardioLayout, { responsive: true });

// Create a new div element for the life expectancy bar chart
let lifeExpectancyContainer = document.createElement("div");
lifeExpectancyContainer.id = "lifeExpectancyBar";
lifeExpectancyContainer.style.width = "100%";
lifeExpectancyContainer.style.height = "600px";

// Append the new div to the document
cardioContainer.after(lifeExpectancyContainer);

// Create the trace for the life expectancy bar chart
let trace7 = {
  x: filteredData.map(d => d.life_expectancy),
  y: locations,
  type: "bar",
  orientation: "h",
  name: "Life Expectancy",
  marker: {
    color: 'rgba(31, 119, 180, 0.7)'
  }
};

// Define the layout for the life expectancy bar chart
let lifeExpectancyLayout = {
  title: "Life Expectancy by Location",
  xaxis: { title: "Life Expectancy" },
  yaxis: { title: "Location" },
  margin: {
    l: 100,
    r: 100,
    t: 50,
    b: 50
  }
};

// Plot the life expectancy bar chart
Plotly.newPlot("lifeExpectancyBar", [trace7], lifeExpectancyLayout, { responsive: true });


  // Define the updateScatterPlot function to update the scatter plot when the dropdown menus are changed
  function updateScatterPlot(continent, date) {
    // Filter the data based on the selected continent and date
    let filteredData = data.filter(d => d.continent === continent && d.date === date);

    let gdpPerCapita = filteredData.map(d => d.gdp_per_capita);
    let vaccinatedValues = filteredData.map(d => d.people_vaccinated_per_hundred);
    let locations = filteredData.map(d => d.location); // Added line to get locations

    // Create the trace for the scatter plot
    let trace = {
      x: gdpPerCapita,
      y: vaccinatedValues,
      mode: "markers+text",
      type: "scatter",
      text: locations, // Use locations as the text labels
      textposition: 'top center',
      textfont: {
        family: 'Raleway, sans-serif'
      },
      marker: {
        size: 10,
        color: vaccinatedValues,
        colorscale: "Viridis",
        showscale: true
      },
      // Add custom hovertemplate to show the location in the tooltip
      hovertemplate: '<b>GDP per Capita:</b> %{x}<br><b>Percentage Partially Vaccinated:</b> %{y}'
    };

    // Define the layout for the scatter plot
    let layout = {
      title: "GDP per Capita vs Percentage Partially Vaccinated",
      xaxis: { title: "GDP per Capita" },
      yaxis: { title: "Percentage Partially Vaccinated" },
      margin: {
        l: 50, // Increases the left margin for spacing
        r: 50, // Increases the right margin for spacing
        t: 50, // Increases the top margin for spacing
        b: 50 // Increases the bottom margin for spacing
      }
    };

    // Set the dimensions of the scatter plot container
    let container = document.getElementById("scatter");
    container.style.height = "600px";

  
  }

  // Define the updateTable function to update the table when the dropdown menus are changed
  function updateTable(continent, date) {
    // Filter the data based on the selected continent and date
    let filteredData = data.filter(d => d.continent === continent && d.date === date);

    // Select the table body
    let tableBody = d3.select("#table tbody");

    // Remove existing rows from the table
    tableBody.html("");

    // Loop through the filtered data and add rows to the table
    filteredData.forEach(function(d) {
      // Create a new row
      let row = tableBody.append("tr");

      // Add cells to the row
      row.append("td").text(d.location);
      row.append("td").text(d.people_fully_vaccinated);
      row.append("td").text(d.people_vaccinated);
      row.append("td").text(d.population);
      row.append("td").text(d.total_cases);
    });
  }

  // Attach event listeners to the dropdown menus
  continentDropdown.on("change", function() {
    let selectedContinent = d3.select(this).property("value");
    let selectedDate = dateDropdown.property("value");

    updateBarCharts(selectedContinent, selectedDate);
    updateScatterPlot(selectedContinent, selectedDate);
    updateTable(selectedContinent, selectedDate);
  });

  dateDropdown.on("change", function() {
    let selectedContinent = continentDropdown.property("value");
    let selectedDate = d3.select(this).property("value");

    updateBarCharts(selectedContinent, selectedDate);
    updateScatterPlot(selectedContinent, selectedDate);
    updateTable(selectedContinent, selectedDate);
  });

  // Call the updateTable function to create the initial table
  updateTable(defaultContinent, defaultDate);
};

});
