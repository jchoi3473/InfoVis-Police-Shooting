import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import './plots.css';
// import d3-fetch from 'd'
const ModalPlot = (props) => {
  const svgRef = useRef(null);
  const svgRef2 = useRef(null);
  const svgRef3 = useRef(null);

//Modal Plot for Gender
useEffect(() => {
    var margin = {top: 25, right: 5, bottom: 30, left: 60},
    width = 200 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
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
    .attr("x", (width/4))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("text-decoration", "underline")  
    .text("Police Shooting by Gender")
    .style("font-size", "10px")


    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height+30)
    .text("Gender")
    .style("font-size", "10px");


    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -45)
    // .attr("dy", ".9em")
    .attr("transform", "rotate(-90)")
    .attr("x", -40)
    .text("Number of Shootings")
    .style("font-size", "10px");

    //fetch data
    const data = props.data
    // const d = d3.csv("preprocessed.csv", newdata => {
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


    console.log(countObj)
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
    .domain([0, data.length+5])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));


    // Bars
    svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.gender); })
    .attr("y", function(d) { return y(d.count); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.count); })
    .attr("fill", "#69b3a2")
  }, [props.data, svgRef.current]); // redraw chart if data changes
//Modal Plot for Race
useEffect(() => {
  var margin = {top: 25, right: 5, bottom: 30, left: 60},
    width = 250 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
    // dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    // dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    // SELECTIONS
    const svg = d3
      .select(svgRef2.current)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
    .attr("x", (width/2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "10px") 
    .style("text-decoration", "underline")  
    .text("Police Shooting by Race");

    
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height+30)
    .text("Race")
    .style("font-size", "10px");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -45)
    // .attr("dy", ".9em")
    .attr("transform", "rotate(-90)")
    .attr("x", -40)
    .text("Number of Shootings")
    .style("font-size", "10px");
    //fetch data
    
    svg.append("text").attr("x", 120).attr("y", 0).text("A - Asian").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 120).attr("y", 10).text("W - White").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 120).attr("y", 20).text("H - Hispanic").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 120).attr("y", 30).text("B - Black").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 120).attr("y", 40).text("O - Others").style("font-size", "10px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 120).attr("y", 50).text("N - Native Americans").style("font-size", "10px").attr("alignment-baseline","middle")

    const data = props.data
    // const d = d3.csv("preprocessed.csv", newdata => {
    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.race; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, props.data.length+5])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

  var countObj = {};

  // count how many times male/female occur in list and store in countObj
  data.forEach(function(d) {
      var race = d.race;
      if(countObj[race] === undefined) {
          countObj[race] = 0;
      } else {
          countObj[race] = countObj[race] + 1;
      }
  });
  // now store the count in each data member
  data.forEach(function(d) {
      var race = d.race;
      d.count = countObj[race];
  });

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.race); })
      .attr("y", function(d) { return y(d.count); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.count); })
      .attr("fill", "#69b3a2")

  }, [props.data, svgRef2.current]); // redraw chart if data changes
//Modal Plot for Age
useEffect(() => {
  var margin = {top: 25, right: 5, bottom: 30, left: 60},
    width = 250 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
    // dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    // dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    // SELECTIONS
    const svg = d3
      .select(svgRef3.current)
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
    .attr("x", (width/2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "10px") 
    .style("text-decoration", "underline")  
    .text("Police Shooting by Age");

    
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height+30)
    .text("Age")
    .style("font-size", "10px");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -45)
    // .attr("dy", ".9em")
    .attr("transform", "rotate(-90)")
    .attr("x", -40)
    .text("Number of Shootings")
    .style("font-size", "10px");
    //fetch data
    
  svg.append("text").attr("x", 110).attr("y", 0).text("10: Age 0-10").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 10).text("20: Age 10-10").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 20).text("30: Age 20-30").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 30).text("40: Age 30-40").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 40).text("50: Age 40-50").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 50).text("60: Age 50-60").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 60).text("70: Age 60-70").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 70).text("80: Age 70-80").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 80).text("90: Age 80-90").style("font-size", "10px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 110).attr("y", 90).text("100: Age 90-100").style("font-size", "10px").attr("alignment-baseline","middle")

    const data = props.data
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
  .domain([0, data.length+5])
  .range([ height, 0]);
  svg.append("g")
  .call(d3.axisLeft(y));

  data.forEach(function(d) {
    var age = d.age;
    d.count = countObj[(age/10|0)*10];
  });


  // count how many times male/female occur in list and store in countObj
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
          return; 
        return height - y(d['value']); })
      .attr("fill", "#69b3a2")

  }, [props.data, svgRef3.current]); // redraw chart if data changes


  return (
    <div>
    <svg className="GenderBar BarModal" ref={svgRef} />
    <svg className="GenderBar BarModal" ref={svgRef2} />
    <svg className="GenderBar BarModal" ref={svgRef3} />
    </div>
  );
};

export default ModalPlot;