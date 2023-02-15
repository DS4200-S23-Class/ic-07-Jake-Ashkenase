// create frame
const FRAME_HEIGHT = 250;
const FRAME_WIDTH = 250; 
const MARGINS = {left: 10, right: 10, top: 10, bottom: 10};



const data = [55000, 48000, 27000, 66000, 90000]; 

// Start with a new frame. This time, we will also set a constant
// for the width and height of our vis
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME = d3.select("vis")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// Now, let's define our scaling function

// find max X
const MAX_X = d3.max(data, (d) => { return d; }); 
console.log("Max x: " +MAX_X);  

// Now, define scale functions that maps our data values 
// (domain) to pixel values (range)
const X_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_X + 10000)]) // add some padding  
                  .range([0, VIS_WIDTH]); 



// Now, we can use X_SCALE to plot our points
FRAME.selectAll("points")  
    .data(data)  
    .enter()       
    .append("circle")  
      .attr("cx", (d) => { return (X_SCALE(d) + MARGINS.left); }) 
      .attr("cy", MARGINS.top) 
      .attr("r", 30)
      .attr("class", "point"); 

// We can also use X_SCALE to add an axis to the vis  
FRAME.append("g") // g is a "placeholder" svg
      .attr("transform", "translate(" + MARGINS.left + 
            "," + (VIS_HEIGHT + MARGINS.top) + ")") //moves axis 
                                                    // within margins 
      .call(d3.axisBottom(X_SCALE).ticks(4)) // function for generating axis  
        .attr("font-size", '20px'); // set font size
