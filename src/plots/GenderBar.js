import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import './plots.css';
// import d3-fetch from 'd'
const GenderBar = (props) => {
  const svgRef = useRef(null);

useEffect(() => {
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    // dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    // SELECTIONS
    const svg = d3
      .select(svgRef.current)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Police Shooting by Gender");

    
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2+25)
    .attr("y", height+30)
    .text("Gender");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -45)
    // .attr("dy", ".9em")
    .attr("transform", "rotate(-90)")
    .attr("x", -60)
    .text("Number of Shootings");
    //fetch data
    


    const data = props.Data
    // const d = d3.csv("preprocessed.csv", newdata => {
    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.gender; }))
    .padding(0.2);
    
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, data.length+100])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    var countObj = {};

    // count how many times male/female occur in list and store in countObj
    data.forEach(function(d) {
    var gender = d.gender;
    if(countObj[gender] === undefined) {
        countObj[gender] = 0;
    } else {
        countObj[gender] = countObj[gender] + 1;
    }
    });
    // now store the count in each data member
    data.forEach(function(d) {
    var gender = d.gender;
    d.count = countObj[gender];
    });

    // Bars
    svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.gender); })
    .attr("y", function(d) { return y(d.count); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.count); })
    .attr("fill", "#9ADCFF")

    // })

    // const container = svg
    //   .append("g")
    //   .classed("container", true)
    //   .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

    // // Draw Circle
    // container.append("circle").attr("r", 25);
  }, [props.Data]); // redraw chart if data changes

  return <svg className="GenderBar" ref={svgRef} />;
};

export default GenderBar;