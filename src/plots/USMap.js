import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import * as fc from "d3fc"
// import all from "d3"
import * as topojson from "topojson"
import './plots.css';
import CloseIcon from '@mui/icons-material/Close';

import Modal from '@mui/material/Modal';
import ModalPlot from './ModalPlot'
// import d3-fetch from 'd'

const USMap = (props) => {
  const svgRef = useRef(null);
  const [currState, setState] = useState({});
  const [open, setOpen] = useState(false);
  const [stateData, setStateData] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  // const d3 = props.d3
  const us = props.us;
  const data = props.data;
  useEffect(() => {
      // D3 Code
  var width = 1000,
  height = 580,
  active = d3.select(null);
  
  var projection = d3.geoAlbersUsa()
      .scale(1200)
      .translate([width / 2, height / 2]);
  
  var path = d3.geoPath()
      .projection(projection);
  
  var svg = d3.select(svgRef.current).append("svg")
      .attr("width", width)
      .attr("height", height);
  
  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", reset);
  
  var g = svg.append("g")
      .style("stroke-width", "1.5px");
  
  var states = {}

  for(var i=0;i<props.data.length;i++){
    states[data[i].state]=states[data[i].state]?
    {totalNum:states[data[i].state].totalNum+1,
     data: states[data[i].state].data.concat(data[i])}:
     {totalNum:1,
      data : [data[i]]
    };
    // states[data[i].state].stateData = states[data[i].state]['state_data']?states[data[i].state]['state_data'].add(data[i]):[data[i]];
    // console.log( states[data[i].state])
    
    // .data.add(data[i])
  }
  var maxNum = 0;
  for (const [key, value] of Object.entries(states)) {
    maxNum = Math.max(value.totalNum, maxNum)
  }


  var case1 = maxNum/2;
  var case2 = maxNum/4;
  var case3 = maxNum/8;
  var case4 = maxNum/16;



  g.selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path)
      .attr("class", "feature")
      .style("fill", function(d) {
        // console.log(states[d.properties.name])
        var freqNum = states[d.properties.name]?states[d.properties.name].totalNum:0;
        
        if(freqNum===0){
          return "#ccc";
        }
        if(freqNum>=case1){
          return "rgb(94,14,18)";
        }
        if(freqNum>=case2){
          return "rgb(232,114,86)";
        }
        if(freqNum>=case3){
          return "rgb(242,191,168)";
        }
        if(freqNum>=case4){
          return "rgb(252,229,228)";
        }else{
          return  "rgb(253,245,241)";
        }
      })
      .style("opacity", 0.85)
      .on("click", clicked)
      .on("mouseenter", function(d) { setState(d.srcElement.__data__.properties) });




      // .on('mouseover', function(d, i) {

      //   var currentState = this;
      //   console.log(this)
      //   console.log(d3.select(this))
      // })
      ;


    g.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);



      const container = d3.select(svgRef.current);
      const colourScale = d3
        .scaleSequential(d3.interpolateReds)
        .domain([0, 100]);
      const domain = colourScale.domain();
      
      const width2 = 70;
      const height2 = 150;
      
      const paddedDomain = fc.extentLinear()
        .pad([0.1, 0.1])
        .padUnit("percent")(domain);
      const [min, max] = paddedDomain;
      const expandedDomain = d3.range(min, max, (max - min) / height2);
      
      const xScale = d3
        .scaleBand()
        .domain([0, 1])
        .range([0, width2]);
      
      const yScale = d3
        .scaleLinear()
        .domain(paddedDomain)
        .range([height2, 0]);
      
      const svgBar = fc
        .autoBandwidth(fc.seriesSvgBar())
        .xScale(xScale)
        .yScale(yScale)
        .crossValue(0)
        .baseValue((_, i) => (i > 0 ? expandedDomain[i - 1] : 0))
        .mainValue(d => d)
        .decorate(selection => {
          selection.selectAll("path").style("fill", d => colourScale(d));
        });
      
      const axisLabel = fc
        .axisRight(yScale).tickFormat(d => d + "%")
        .tickValues([...domain, (domain[1] + domain[0]) / 2 ])
        .tickSizeOuter(0);
      
      const legendSvg = container.append("svg")
        .attr("height", height2)
        .attr("width", width2);
      
      const legendBar = legendSvg
        .append("g")
        .datum(expandedDomain)
        .call(svgBar);
      
      const barWidth = Math.abs(20);
      legendSvg.append("g")
        .attr("transform", `translate(${barWidth})`)
        .datum(expandedDomain)
        .call(axisLabel)
        .select(".domain")
        .attr("visibility", "hidden");
      
      container.style("margin", "1em");
      

    function clicked(d) {
      if (active.node() === this) return reset();
      active.classed("active", false);
      active = d3.select(this).classed("active", true);
      var x = d.x
      var y = d.y
      var translate = [width / 2 -  x*1.4, height / 2 -  y*0.8];

      g.transition()
          .duration(750)
          .style("stroke-width", 1.5 / 2 + "px")
          .attr("transform", "translate(" + translate + ")scale(" + 2 + ")");
      setState(d.srcElement.__data__.properties);
      setStateData(states[d.srcElement.__data__.properties.name].data);
      handleOpen();
      // console.log(d.srcElement.__data__.properties)
    }
      
    function reset() {
      active.classed("active", false);
      active = d3.select(null);
    
      g.transition()
          .duration(750)
          .style("stroke-width", "1.5px")
          .attr("transform", "");
    
      setState({});
      }
      
    }, [data, props.data.length, props.us, us]); // redraw chart if data changes

  return (
    <>
    <div className="MapVertical">
    {currState?<div className="StateName">{currState.name}</div>:<div></div>}
    <svg className = "USMap" ref={svgRef}/>
    </div>
      <Modal
        className ="ModalClass"
        open={open}
        onClose={handleClose}
      >
        <div className="Modal-Content">
          <div className="Modal-Header">
          <div style={{fontSize:'25px'}}>{currState.name}</div>
          <CloseIcon style={{cursor:"pointer"}}onClick ={handleClose}/>
          </div>
          <ModalPlot data = {stateData}/>
        </div>
      </Modal>
    </>
  )
};

export default USMap;