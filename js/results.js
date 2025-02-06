/**
 * Write a reference for today's date into the ref div
 */
function populateReference(){
    var d = new Date();
    document.getElementById('ref').innerHTML = ["<p>Tomkins, M., Huck, J. J., Dortch, J., Hughes P. D., Kirkbride, M. & Barr, I. (", d.getFullYear(),"). SHED Earth. <a href=\"http://www.shed.earth/shedcalc\">http://shed.earth</a>. <em>Accessed ", d.getDate(), "/", d.getMonth()+1, "/", d.getFullYear(), ".</em></p>"].join('');
}

/**
 * Get a data from a specified cookie entry
 */
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

/**
 * write data exported from cookie into the results table
 */
function populateTableAndChart() {

    // get the 'data' entry from the session cookie
    const cookieData = getCookie('data');
    if (!cookieData) return;

    let outputs;
    try {
        outputs = JSON.parse(cookieData);
    } catch (e) {
        console.error('Error parsing cookie data:', e);
        return;
    }

    // create table body
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    // loop through each data object to get the contents
    outputs.forEach(row => {
        
        // construct table row
        const tr = document.createElement('tr');

        // load data into table cells
        ['name', 'lat', 'lng', 'mean', 'mad', 'age', 'errors'].forEach(key => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        });

        // append table row
        tableBody.appendChild(tr);
    });
    
    // plot the chart
    plotChart(outputs)
}

/**
 * Listener for when page is loaded
 */
function onload(){
    populateReference();
    populateTableAndChart();
}


/**
 * Plot chart using D3
 */
function plotChart(outputs) {
    // Extract age and error data
    const ages = outputs.map(row => parseFloat(row.age.toFixed(1)));
    const errors = outputs.map(row => parseFloat(row.errors.toFixed(1)));

    if (ages.length === 0 || errors.length === 0) {
        console.error('Error: Missing age or error data.');
        return;
    }

    // Calculate ymax (5 * ceil((max(ages) + max(errors)) / 5))
    let maxAge = Math.max(...ages);
    let maxError = Math.max(...errors);
    let ymax = 5 * Math.ceil((maxAge + maxError) / 5);

    // Set up chart dimensions
    const width = 600, height = 600, margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Remove previous chart (if exists)
    d3.select("#chart").selectAll("*").remove();

    // Create an SVG element
    const svg = d3.select("#chart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Define scales (X-axis starts at 1 instead of 0)
    const xScale = d3.scaleLinear()
        .domain([0, ages.length+1])  // Start at 1
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, ymax])
        .range([chartHeight, 0]);

    // Define axes
    const xAxis = d3.axisBottom(xScale).ticks(ages.length+1).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale);

    // Add axes to the SVG
    svg.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
        .append("text")
        .attr("x", chartWidth / 2)
        .attr("y", 40)
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text("Sample Order");

    svg.append("g")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", -50)
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text("Age (ka)");

    // Add title
    svg.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", -10)
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Estimated Sample Ages");

    // Plot error bars
    svg.selectAll(".error-bar")
        .data(outputs)
        .enter()
        .append("line")
        .attr("x1", (_, i) => xScale(i + 1))  // Adjust index to start from 1
        .attr("x2", (_, i) => xScale(i + 1))
        .attr("y1", d => yScale(d.age - d.errors))
        .attr("y2", d => yScale(d.age + d.errors))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    // Plot age points
    svg.selectAll(".age-point")
        .data(outputs)
        .enter()
        .append("circle")
        .attr("cx", (_, i) => xScale(i + 1))  // Adjust index to start from 1
        .attr("cy", d => yScale(d.age))
        .attr("r", 4)
        .attr("fill", "black");
}