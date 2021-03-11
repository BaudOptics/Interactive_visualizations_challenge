const url = './data/samples.json'

//function for creating bar chart
function makeBarChart(data, value){
    //pulling data from dataset
    let sampleValues = [];
    for (i=0;i<10;i++){
        sampleValues.push(data.samples[value].sample_values[i]);
    }
    console.log(`sampleValues:${sampleValues}`)
    let otuIDs = [];
    for(i=0;i<10;i++){
        otuIDs.push(data.samples[value].otu_ids[i]);
    }
    console.log(`otuIDs: ${otuIDs}`)
    let otuLabels = [];
    for (i=0;i<10;i++){
        otuLabels.push(data.samples[value].otu_labels[i]);
    }
    console.log(`otuLabels: ${otuLabels}`)
    console.log(otuLabels.length)
    //putting these arrays into a dictionary
    let trace1={
        y:sampleValues,
        x:otuLabels,
        type: "bar"
    };
    let chartData = trace1;
    let layout = {
        
    }
    Plotly.newPlot('bar',chartData,layout);
}

function init(value){
//reading the json file
    d3.json(url).then(data=>{
        //logging some data to the console
        console.log(data)
        //console.log(data.names)
        //data.names.map((d)=>console.log(d))
        //console.log(data.names.forEach(d=>d))

        //creating initial bar chart
        makeBarChart(data,value)

        //accessing dropdown menu using d3
        let dropDown = d3.select('#selDataset');
        //poulate the dropDown menu with d3
        dropDown.selectAll('option')
                .data(data.names)
                .enter()
                .append('option')
                .attr('value',(d,i)=>i)
                .text(d=>d);
        
    })
}
//adding ul and li tags to populate metadata table
// let metadata = d3.select('#sample-metadata');
//     metadata.append('ul')



//handling user choice from dropdown menu
function optionChanged(){
    //selecting an option
    let dropDown = d3.select('#selDataset');
    let selection = dropDown.property('value');
    console.log(selection);
    init(selection);
}

init(0);