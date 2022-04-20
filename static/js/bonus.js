// Build Gauge Function
function buildGauge(Latest_pressure,Node_id,Date_last_reading) {
    var gauge = d3.select('#gauge');
    gauge.html('');

    var ggData = [{
        domain: {x: [0, 1], y: [0, 1]},
        value: Latest_pressure,
        title: '<b>Current pressure reading</b><br>VWP'+''+Node_id+'-'+Date_last_reading,
        type: 'indicator',
        mode: 'gauge+number',
        gauge: {
            axis:{range:[-30,30]},
            shape: 'angular',
            bar: { thickness: 0 },
            steps: [
                {range: [-30, -20], color: '#EBF5FB'},
                {range: [-20, -10], color: '#D6EAF8'},
                {range: [-10, 0], color: '#AED6F1'},
                {range: [0, 10], color: '#85C1E9'},
                {range: [10, 20], color: '#5DADE2'},
                {range: [20, 30], color: '#3498DB'},  
                {range: [0, Latest_pressure], color: 'blue', thickness: 0.8},
            ],
            
            threshold: {
                line: {color: 'red', width: 1},
                thickness: 0.5,
                value: Latest_pressure
                 
            }
        },
        number: {'suffix': "", 'font': {'size': 70}},
    }];

    var theta = 90-(Latest_pressure*3)
    var r = 0.5
    var x_head = r * Math.cos(Math.PI/180*theta)
    var y_head = r * Math.sin(Math.PI/180*theta)


    var layout = {
        width: 600,
        height: 450,
        margin: {
            t: 0,
            b: 0
        },
        xaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
        yaxis: {range: [0, 1], showgrid: false, 'zeroline': false, 'visible': false},
        showlegend: false,
        
        
        annotations: [
         {
            ax: 0.5,
            ay: 0.25,
            axref: 'x',
            ayref: 'y',
           x: 0.5+x_head,
           y: 0.25+y_head,
           xref: 'x',
           yref: 'y',
            showarrow: true,
            arrowhead: 9,
           arrowcolor: "red",
           tickwidth: 4,
           text: 'kPa',
           font: {'size': 30},
                      
          }
        ],

    };
    Plotly.newPlot('gauge', ggData, layout);
};