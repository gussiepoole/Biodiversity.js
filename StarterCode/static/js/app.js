console.log("app.js");

// url 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// define function to retrieve metaData 
function metaData(subject_id) {
    // get all data
    d3.json(url).then((data) => {
        // get metaData
        let metaData = data.metadata;
        // filter metaData for subject id
        let value = metaData.filter(result => result.id == subject_id);
        // get the first from the array 
        let valData = value[0];
        // select demographic info
        d3.select("#sample-metadata").html("");
        // use object.entries() to add K:V pairs to panel
        Object.entries(valData).forEach(([key, value]) => {
            // log K:V pairs
            console.log(`metaData ${subject_id}`);
            console.log(key, value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

// Function for bar chart
function barChart(subject_id) {
    //get all data
    d3.json(url).then((data) => {
        // get sample info
        let subject_info = data.samples;
        // filter for subject id 
        let value = subject_info.filter(result => result.id == subject_id);
        // get the first from the array 
        let valData = value[0];
        // retrieve otus, labels + values
        let otu_ids = valData.otu_ids;
        let otu_labels = valData.otu_labels;
        let sample_values = valData.sample_values;

        // display the top 10 OTUs found in that individual
         console.log(otu_ids, otu_labels, sample_values)
         console.log(`barChart ${subject_id}`);


         //set top 10 OTUs in descending order
         let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
         let xticks = sample_values.slice(0,10).reverse();
         let labels = otu_labels.slice(0,10).reverse();
         
         // bar chart trace
         let trace = {
            type: "bar",
            x: xticks,
            y: yticks,
            orientation: "h",
            text: labels
        };
         // layout and title
         let layout = {
            title: "Top 10 OTUS",
            orientation: "h",
            xaxis: {
                tickangle: -45,
                barmode: 'group',
            }
         };

         // plot
         Plotly.newPlot("bar", [trace], layout);
    
        });
    };


// Create bubble chart function
function bubbleChart(subject_id) {
    // Create a function to return all data
    d3.json(url).then((data) => {
        // get sample info
        let subject_info = data.samples;
        // filter for subject id 
        let value = subject_info.filter(result => result.id == subject_id);
        // get the first from the array 
        let valData = value[0];
        // retrieve otus, labels + values
        let otu_ids = valData.otu_ids;
        let otu_labels = valData.otu_labels;
        let sample_values = valData.sample_values;

         // display the top 10 OTUs found in that individual
         console.log(otu_ids, otu_labels, sample_values)
         console.log(`bubbleChart ${subject_id}`);
         
         let trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }; 

        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace], layout)
    });
};



 // Create a function to filter 

//initialize chart
function init() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // get subject ids to populate dropdown
    d3.json(url).then((data) => {
        //adding variable for subject ids
        let subject_ids = data.names;

        // adding subjects to dropdown
        subject_ids.forEach((id) => {
            // console.log(id);
            dropdownMenu
                .append("option")
                .attr("value", id)
                .text(id);
            
        });
         // get the first subject 
        let first_subject = subject_ids[0];
        metaData(first_subject);
        barChart(first_subject);
        bubbleChart(first_subject);
    });
}

// Create function that will change subject ID when different subject ID selected
function optionChanged(subject_id) {
    console.log(`optionChanged ${subject_id}`);
    metaData(subject_id);
    barChart(subject_id);
    bubbleChart(subject_id);
}

 

init();


  // Assign the value of the dropdown menu option to a variable
  //let dataset = dropdownMenu.property("value");
