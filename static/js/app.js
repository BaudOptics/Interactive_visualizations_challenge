const url = './data/samples.json'

//reading the json file
d3.json(url).then(data=>{
    //console.log(data)
    //console.log(data.names)
    data.names.map((d)=>console.log(d))
    //console.log(data.names.forEach(d=>d))

//accessing dropdown menu using d3
    let dropDown = d3.select('#selDataset');
//poulate the dropDown menu with d3
    dropDown.selectAll('option')
            .data(data.names)
            .enter()
            .append('option')
            .attr('value',(d,i)=>i)
            .text(d=>d)
//selecting an option
    let dataset = dropDown.property('value');
    console.log(dataset)

})
