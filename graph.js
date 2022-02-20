const data = window.getTypologyCarbonFootprint();
const foodItemCarbonFootprint = window.getFoodItemCarbonFootprint();

// Get the modal 
//from https://www.cssscript.com/simple-modal-window-with-background-blur-effect/
var modal = document.getElementById('myModal');
// Get the main container and the body
var body = document.getElementsByTagName('body');
var container = document.getElementById('myContainer');
// Get the open button
var btnOpen = document.getElementById("myBtn");
// Get the close button
var btnClose = document.getElementById("closeModal");


// Close the modal
btnClose.onclick = function () {
    modal.className = "Modal is-hidden is-visuallyHidden";
    body.className = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.className = "Modal is-hidden";
        body.className = "";
    }
}

// select the svg container first
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 1200)
    .attr('height', 2500)
    .attr('class', 'graph-svg')

// create margins & dimensions
const margin = { top: 30, right: 50, bottom: 30, left: 350 };
const graphWidth = 1200 - margin.left - margin.right;
const graphHeight = 2500 - margin.top - margin.bottom;

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// create axes groups
const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`)

const yAxisGroup = graph.append('g');

data.sort(function (a, b) {
    return b.CARBON_FOOTPRINT_TYPOLOGY - a.CARBON_FOOTPRINT_TYPOLOGY;
});

const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.CARBON_FOOTPRINT_TYPOLOGY)])
    .range([0, graphWidth]);

const y = d3.scaleBand()
    .domain(data.map(item => item.FOOD_TYPOLOGY))
    .range([0, graphHeight])
    .paddingInner(0.3)


// join the data to rects
const rects = graph.selectAll('rect')
    .data(data);

// append the enter selection to the DOM
rects.enter()
    .append('rect')
    .attr('x', x(0))
    .attr('y', d => y(d.FOOD_TYPOLOGY))
    .attr('width', function (d) { return x(d.CARBON_FOOTPRINT_TYPOLOGY) })
    .attr("height", y.bandwidth)
    .attr('fill', function (d) {
        if (d.FOOD_GROUP === 'AGRICULTURAL PROCESSED') {
            return '#264653';
        } else if (d.FOOD_GROUP === 'FISHING') {
            return '#e9c46a'
        } else if (d.FOOD_GROUP === 'CROPS') {
            return '#2a9d8f'
        }
        // ANIMAL HUSBANDRY
        return '#e76f51';
    });

const myLabels = graph.selectAll('text')
    .data(data);

// append the enter selection to the DOM
myLabels.enter()
    .append("text")
    .attr('x', function (d) { return x(d.CARBON_FOOTPRINT_TYPOLOGY) + 5 })
    .text((d) => d.CARBON_FOOTPRINT_TYPOLOGY)
    .attr('y', (d, i) => {
        return (y(d.FOOD_TYPOLOGY) + y.bandwidth() - 4);
    })
    .attr("fill", "#8d99ae")
    .attr("font-size", "12px");

// add event listeners
graph.selectAll('rect')
    .on("mouseover", function (d) {
        //console.log(d.target.__data__);
        d3.select(this)
            .transition().duration(100)
            .style("opacity", 0.3)
            .style("cursor", "default"); 
    })
    .on('mouseout', function (d) {
        d3.select(this)
            .transition().duration(100)
            .style("opacity", 1)
            .style("cursor", "default"); 
    });

graph.selectAll('text')
    .on("mouseover", function (d) {
        //console.log(d.target.__data__);
        d3.select(this)
            .transition().duration(100)
            .style("opacity", 0.5)
            .style("cursor", "default"); 
    })
    .on('mouseout', function (d) {
        d3.select(this)
            .transition().duration(100)
            .style("opacity", 1)
            .style("cursor", "default"); 
    });

// open modal on rects
graph.selectAll('rect')
    .on("click", function (d) {
        modal.className = "Modal is-visuallyHidden";
        setTimeout(function () {
            modal.className = "Modal";
        }, 100);
        updateModal(d);
    });

// open modal on supporting text
graph.selectAll('text')
    .on("click", function (d) {
        modal.className = "Modal is-visuallyHidden";
        setTimeout(function () {
            modal.className = "Modal";
        }, 100);
        updateModal(d);
    });

// create & call axes
const xAxis = d3.axisBottom(x)
    .ticks(8);
const yAxis = d3.axisLeft(y)
    .tickSize(0)

yAxisGroup.call(yAxis);
yAxisGroup.style("font-size", "16px");
yAxisGroup.selectAll('text')
    .attr("x", -10)

function updateModal(d) {

    const modalTable = document.getElementById("modalTable");
    modalTable.textContent = '';
    const tableHeader1 = document.createElement("DIV");
    tableHeader1.innerHTML = "FOOD ITEM";
    tableHeader1.className = "modalTableSubTitle";
    modalTable.append(tableHeader1);

    const tableHeader2 = document.createElement("DIV");
    tableHeader2.innerHTML = "CARBON FOOTPRINT<br>(kg C / kg)";
    tableHeader2.className = "modalTableSubTitle";
    modalTable.append(tableHeader2);

    // get food items for typology
    const foodTypology = d.target.__data__.FOOD_TYPOLOGY;

    let modalTital = document.querySelector(".modalTitle");
    modalTital.innerHTML = foodTypology;

    let foodItems = []
    for (let i = 0; i < foodItemCarbonFootprint.length; i++) {
        if (foodItemCarbonFootprint[i].FOOD_TYPOLOGY === foodTypology) {
            foodItems.push(foodItemCarbonFootprint[i]);
        };
    }

    for (let i = 0; i < foodItems.length; i++) {
        const tableItem1 = document.createElement("DIV");
        tableItem1.innerHTML = foodItems[i].FOOD_ITEM;
        modalTable.append(tableItem1);
        const tableItem2 = document.createElement("DIV");
        tableItem2.innerHTML = foodItems[i].CARBON_FOOTPRINT_FOOD_ITEM;
        modalTable.append(tableItem2);
    }
}
