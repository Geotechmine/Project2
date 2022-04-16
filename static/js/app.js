// Assigne URL variable to JSON data
url = 'samples.json'

// Define json data as variable
var staticData = d3.json(url)

// Console log to see if data is accessible
staticData.then(function(data) {
    console.log(data)
});

// Functon for Building Plots 
function buildPlots(selection) {
    staticData.then(function(data) {
        // Filter through metadata for object with matching id
        var metadata = data.metadata;
        var filteredMetadata = metadata.filter(subject => {
            // Double equals because selection is string but id is integer
            return selection == subject.Node_id
        });

        // Call buildGauge function with Latest_pressure data
        buildGauge(filteredMetadata[0].Latest_pressure,filteredMetadata[0].Node_id,filteredMetadata[0].Date_last_reading);

        // Filled piezometer information table data 
        var demoBox = d3.select('#sample-metadata');
        demoBox.html('');
        Object.entries(filteredMetadata[0]).forEach(function([key, value],index){
            if(index<=10) {
            demoBox.append('p').text(`${key}: ${value}`);
        }});

        // Filter through samples for object with matching id
        var samples = data.samples;
        var filteredSamples = samples.filter(subject => {
            return selection == subject.Node_id
        });

        // Populate Horizontal Bar Chart 
        var barChart = d3.select('#bar');
        barChart.html('');
        
        var sampleValues = [filteredMetadata[0].Maxpressure,filteredMetadata[0].Minimumpressure];
        var otuIDs = ["<b>Maximum</b><br>Pressure(kPa)", "<b>Minimum</b><br>Pressure(kPa)"];
        var otuLabels = ["Maximum Pore Water Pressure in VWP"+''+filteredMetadata[0].Node_id, "Minimum Pore Water Pressure in VWP"+''+filteredMetadata[0].Node_id];
        var hbData = [{
            type: 'bar',
            x: sampleValues.slice(0,2).reverse(),
            y: otuIDs.map(otu => 'VWP' + ' ' + otu).slice(0,2).reverse(),
            text: otuLabels.slice(0,2).reverse(),
            orientation: 'h',
           }];
           var layout = {
            title: 'Max and Min Historical PWP Values (VWP'+" "+filteredMetadata[0].Node_id+" "+'in kPa)',
            barmode: 'stack',

           // margin: {
           //    l: 100,
            //    r: 20,
           //     t: 200,
            //    b: 70
           //   },
           //   width: 600,
           //   height: 600,
           //   paper_bgcolor: 'rgb(248,248,255)',
            //  plot_bgcolor: 'rgb(248,248,255)',
            //  annotations: [
             //   {
              //    xref: 'paper',
               //   yref: 'paper',
               //   x: -0.15,
               //   y: -0.109,
               //   text: 'Geatway reading ' + 'From (2016), Piezometer readings in kPa, ' + 'Piezometer information ' + '(Accessed on 20 March 2021)',
                //  showarrow: false,
                //  font:{
                //    family: 'Arial',
                 //   size: 10,
                 //   color: 'rgb(150,150,150)'
                 // }
                //}
              //]
            };
         

        Plotly.newPlot('bar', hbData, layout);
        
        // Building Scatter Chart 
        var scatterChart = d3.select('#scatter');
        scatterChart.html('');
        var trace1 = {
            x: filteredSamples[0].otu_ids,
            y: filteredSamples[0].sample_values,
            text: "Pore water pressure reading in VWP"+" "+filteredMetadata[0].Node_id +" "+ "at"+" "+ "Y3 Paddock",
            mode: 'lines+markers',
            marker: {
                color: otuIDs,
                size: sampleValues,
                colorscale: 'Earth',
            }
        };

        var bbData = [trace1];
        Plotly.newPlot('scatter', bbData);
    });
}

// Define optionChange function being called in HTML file
function optionChanged(subject) {
    buildPlots(subject);
}

// Define init function
function init() {
    var selector = d3.select('#selDataset');
    // Populate dropdown list with subject id's
    staticData.then((data) => {
        var names = data.names;
        names.forEach((name) => {
            selector
            .append('option')
            .text(name)
            .property('value', name);
        });
        
        buildPlots(names[0]);
    });
}

// Call init function on pageload
init();