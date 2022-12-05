import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import './plots.css';
// import d3-fetch from 'd'
const AgeBar = (props) => {
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
    .text("Police Shooting by Age");
    
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2+25)
    .attr("y", height+30)
    .text("Age");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -45)
    // .attr("dy", ".9em")
    .attr("transform", "rotate(-90)")
    .attr("x", -60)
    .text("Number of Shootings");
    //fetch data
    
    svg.append("text").attr("x", 300).attr("y", 20).text("10: Age 0-10").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 300).attr("y", 35).text("20: Age 10-10").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 300).attr("y", 50).text("30: Age 20-30").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 300).attr("y", 65).text("40: Age 30-40").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 300).attr("y", 80).text("50: Age 40-50").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 300).attr("y", 95).text("60: Age 50-60").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 300).attr("y", 110).text("70: Age 60-70").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 300).attr("y", 125).text("80: Age 70-80").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 300).attr("y", 140).text("90: Age 80-90").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 300).attr("y", 155).text("100: Age 90-100").style("font-size", "10px").attr("alignment-baseline","middle")

    const data = props.Data
    // const d = d3.csv("preprocessed.csv", newdata => {
    // X axis

    var ageList = [0,0,0,0,0,0,0,0,0,0]
    for(var i=0;i<data.length;i++){
      ageList[(data[i].age/10|0)]+=1;
    }
    var countObj = [];
  
    data.forEach(function(d) {
        var age = d.age;
        if(countObj[(age/10|0)] === undefined) {
            countObj[(age/10|0)] = {"key":((age/10|0)+1)*10,"value" : 1};
        } else {
            countObj[(age/10|0)] = {"key":((age/10|0)+1)*10, "value":countObj[(age/10|0)].value + 1};
        }
    });


  var x = d3.scaleBand()
    .range([ 0, width ])
    // .domain(data.map(function(d) { return d.age; }))
    .domain(countObj.map(function(d) { return d['key']; }))
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

    data.forEach(function(d) {
      var age = d.age;
      d.count = countObj[(age/10|0)*10];
  });
  
  // Bars
  svg.selectAll("mybar")
    .data(countObj)
    .enter()
    .append("rect")
      .attr("x", function(d) {
        if(d===undefined)
        return; 
        return x(d['key']); })
      .attr("y", function(d) { 
        if(d===undefined)
        return;
        return y(d['value']); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { 
        if(d===undefined)
        return;return height - y(d['value']); })
      .attr("fill", "#FF8AAE")

  }, [props.Data, svgRef.current]); // redraw chart if data changes

  return <svg className="GenderBar" ref={svgRef} />;
};

export default AgeBar;