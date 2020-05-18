function plotcreator(id) { 

    // Using the D3 library to read in samples.json.
    d3.json("data.json").then((data) => {
        console.log(data);
    
    var samples = data.samples

    // filtering the data by the id 
    var result = samples.filter(ids => ids.id.toString() === id)[0];
    console.log(result)

    // Defining the count of otu labels 
    var samplevalues = result['sample_values'];
    console.log(samplevalues)
    
    // Slicing the variable from above. 
    var slicevals = result['sample_values'].slice(0, 10).reverse()
    console.log(slicevals)

    // Isolating the otu ids from the json files
    var samplelabels = result['otu_ids'];
    console.log(samplelabels)

    // Slicing the above variable
    var slicelabels = result['otu_ids'].slice(0, 10).reverse()
    console.log(slicelabels)

    // Mapping it to a format that we want it 
    var OTU_id = slicelabels.map(d => "OTU " + d);

    // Defining the plotly type, data, orientation, and hover text. 
    var data = [{ 
        type: 'bar', 
        x: slicevals,
        y: OTU_id,
        orientation: 'h', 
        text: data.samples[0]['otu_labels'].slice(0, 10).reverse()
    }];

    // create layout variable to set plots layout
    var layout = {
        title: "The Top 10 OTU's",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        },
        height: 500,
        width: 1200
        };

     // Grabbing the bar id from the html code 
    var barchart = d3.select(".bar");
    
    // Empty the bar plot
    barchart.html("");

    // create the bar plot
    Plotly.newPlot("bar", data, layout);

    // Create data variable for bubble chart 

    var data1 = [{ 
        x: samplelabels,
        y: samplevalues,
        mode: 'markers',
        marker: {
            size: samplevalues,
            color: samplelabels
        }
        
    }];

    // Create layout variable for bubble chart

    var layout1 = { 
        title: 'Marker Size',
        showlegend: false,
        height: 500,
        width: 1200
    };
     
    // Grabbing the bubble id from the html code 
    var bubblechart = d3.select(".bubble_chart");
    
    // Empty the previous bubble chart
    bubblechart.html("");
    
    // create bubble plot 
    Plotly.newPlot('bubble_chart', data1, layout1);

    })

}


// grabbing the demographic data from json 
function getdata(id) { 

    d3.json("data.json").then((data) => {

    // Grabbing the metadata from the json 

    var metadata = data.metadata;

    console.log(metadata)

    // Filtering the metadata based on the specific id value from the dropdown
    // menu

    var result = metadata.filter(meta => meta.id.toString() === id)[0];

    // Grabbing the demographic class from the html code 
    var demographics = d3.select("#demographics");
    
    // Empty the demographic info panel
    demographics.html("");

    // grab the demographic data and append an h5 in the html code. 
   
     Object.entries(result).forEach((key) => {   
        demographics.append("h5").text(key[0] + ": " + key[1] + "\n");    
    
    });

    });

}

// Defining a function to be called by the dropdown menu in the html code to run 
// the above 2 functions

function runids(id) { 

    plotcreator(id)
    getdata(id)

}

// Defining a function to initialize the script by creating and characteriing the 
// dropdown as well as calling the two above function. 
function initial() {

    var dropdown = d3.select("#ids_drop");

    
    d3.json("data.json").then((data)=> {
        console.log(data)

        
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        
        plotcreator(data.names[0]);
        getdata(data.names[0]);

    });

}

initial();