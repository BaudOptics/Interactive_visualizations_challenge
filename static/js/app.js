const url = './data/samples.json'

//function for creating bar chart

function updateBarChart(data,value){
        let sampleValues = [];
        if (data.samples[value].sample_values.length < 10){
                for (i=0;i<data.samples[value].sample_values.length;i++){
                        sampleValues.push(data.samples[value].sample_values[i]);
                }
        }
        else {
                for (i=0;i<10;i++){
                        sampleValues.push(data.samples[value].sample_values[i]);
                }
        }
    console.log(`sampleValues:${sampleValues}`)
    let otuIDs = [];
    if (data.samples[value].otu_ids.length<10){
        for(i=0;i<data.samples[value].otu_ids.length;i++){
                otuIDs.push(`UTO ${data.samples[value].otu_ids[i]}`);
        }
    }
    else {
        for(i=0;i<10;i++){
                otuIDs.push(`UTO ${data.samples[value].otu_ids[i]}`);
        } 
    }
    console.log(`otuIDs: ${otuIDs}`)
    let otuLabels = [];
    if (data.samples[value].otu_labels.length<10){
        for (i=0;i<data.samples[value].otu_labels.length;i++){
                otuLabels.push(data.samples[value].otu_labels[i]);
        }
        }
        else {
                for (i=0;i<10;i++){
                        otuLabels.push(data.samples[value].otu_labels[i]);
                }  
        }
    console.log(`otuLabels: ${otuLabels}`)
    //console.log(otuLabels.length)
    let trace1={
        x:sampleValues.reverse(),
        y:Array.from(otuIDs),
        text:Array.from(otuLabels),
        type: "bar",
        orientation: "h"
    };

    console.log(trace1);
//     layout ={
//     }
//     console.log(layout)
    let chartData = [trace1];
    
    Plotly.newPlot('bar',chartData);
}

function populateTable(data,value){
    //adding ul and li tags to populate metadata table
    console.log(data.metadata[value].id)
    let metadata = d3.select('#sample-metadata').append('ul');
    metadata.append('li')
            .text(`id: ${data.metadata[value].id}`)
            .attr('id','ID')
    metadata.append('li')
            .text(`ethnicity: ${data.metadata[value].ethnicity}`)
            .attr('id',"ethnicity")
    metadata.append('li')
            .text(`gender: ${data.metadata[value].gender}`)
            .attr('id','gender')
    metadata.append('li')
            .text(`age: ${data.metadata[value].age}`)
            .attr('id','age')
    metadata.append('li')
            .text(`location: ${data.metadata[value].location}`)
            .attr('id','location')
    metadata.append('li')
            .text(`bbtype: ${data.metadata[value].bbtype}`)
            .attr('id','bbtype')
    metadata.append('li')
            .text(`wfreq: ${data.metadata[value].wfreq}`)
            .attr('id','wfreq')
}

function updateBubbleChart(data,value){
        let sampleValues = [];
        for (i=0;i<data.samples[value].sample_values.length;i++){
                sampleValues.push(data.samples[value].sample_values[i]);
        }
    console.log(`sampleValues:${sampleValues}`)
    let otuIDs = [];
    let colors = [];
        for(i=0;i<data.samples[value].otu_ids.length;i++){
                otuIDs.push(data.samples[value].otu_ids[i]);
                colors.push(`rgb(${data.samples[value].otu_ids[i]/1000},${data.samples[value].otu_ids[i]/100},${data.samples[value].otu_ids[i]/10})`)
        }
    console.log(`colors: ${colors}`)
    console.log(`otuIDs: ${otuIDs}`)
    let otuLabels = [];
        for (i=0;i<data.samples[value].otu_labels.length;i++){
                otuLabels.push(data.samples[value].otu_labels[i]);
        }
    console.log(`otuLabels: ${otuLabels}`)
    
    let trace1={
        x:Array.from(otuIDs),
        y:sampleValues,
        text:Array.from(otuLabels),
        mode: "markers",
        marker:{
                size:sampleValues,
                color:Array.from(colors)
        }
    };

    console.log('bubble chart trace');
    console.log(trace1)
    let chartData = [trace1];
    
    Plotly.newPlot('bubble',chartData);
}

function editTable(data,value){
    let metadata = d3.select('#sample-metadata');
    metadata.select('#ID')
            .text(`id: ${data.metadata[value].id}`)
    metadata.select('#ethnicity')
            .text(`ethnicity: ${data.metadata[value].ethnicity}`)
    metadata.select('#gender')
            .text(`gender: ${data.metadata[value].gender}`)
    metadata.select("#age")
            .text(`age: ${data.metadata[value].age}`)
    metadata.select('#location')
            .text(`location: ${data.metadata[value].location}`)
    metadata.select('#bbtype')
            .text(`bbtype: ${data.metadata[value].bbtype}`)
    metadata.select('#wfreq')
            .text(`wfreq: ${data.metadata[value].wfreq}`)
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
        updateBarChart(data,value)

        updateBubbleChart(data,value)

        //accessing dropdown menu using d3
        let dropDown = d3.select('#selDataset');
        //poulate the dropDown menu with d3
        dropDown.selectAll('option')
                .data(data.names)
                .enter()
                .append('option')
                .attr('value',(d,i)=>i)
                .text(d=>d);
        //populating table with first entry
        populateTable(data,0)
    })
}

//function to update tables and charts
function update(value){
    //reading the json file
        d3.json(url).then(data=>{
    
            //updating bar chart
            updateBarChart(data,value)

            //updating bubble chart
            updateBubbleChart(data,value)
    
            //updating table
            editTable(data,value)
        })
    }



//handling user choice from dropdown menu
function optionChanged(){
    //selecting an option
    let dropDown = d3.select('#selDataset');
    let selection = dropDown.property('value');
    console.log(`selection ${selection} has been loaded`);
    update(selection);
}

init(0);