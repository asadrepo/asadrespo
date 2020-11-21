
import React, { Component } from 'react';
import * as d3 from 'd3';



class LatestBreachesBubble extends Component {
    

    componentDidMount() {
        var diameter = 900, format = d3.format(",d"), width = 970, height = 960
        var bubble = d3.pack().size([diameter, diameter]).padding(15);

        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("viewBox", [0, 0, width, height])
                    .attr("class", "bubble");

        var tooltip = d3.select("#chart").append("div") 
                        .attr("class", "tooltip")               
                        .style("opacity", 0);

            svg.append("line")     
                .style("stroke", "#cccccc")  
                .attr("stroke-width", 0)
                .classed('linecap', true)
                .attr("x1", 0)
                .attr("y1", 960);      
 
        //var yearArray = ["Latest","2019","2018","2017","2016","2015","2014","2013","2011","2010"];
        var yearArray = this.props.dataYearArray;
        console.log(yearArray.length);
        for (var i=0; i <= yearArray.length ; i++){
            var a =  (i * 100) + 15;

            console.log("this is for loop" + a);
     
             var borderPath = svg.append("rect")
                 .attr("x", 12)
                 .attr("y", i * 100)
                 .attr("height",20)
                 .attr("width", 51.3125)
                 .attr("rx", 6)
                 .style("stroke", "#cccccc")
                 .style("fill", "#23293f")
                 .style("stroke-width", 1)
                 .style('margin-right', 10)
                 .style("stroke-opacity", 0.6);
     
             var textRect =   svg.append("text")
                 .attr("fill", "#FFFFFF")
                 .style("text-anchor","start")
                 .attr("x", 20)
                 .attr("y",a)
                 .style("font-size","12px")
                 .style("font-weight","bold")
                 .text(yearArray[i]);
     
         }

         console.log(this.props.dataResult);
        
         var root = d3.hierarchy(classes(this.props.dataResult))
         .sum(function(d) {
             return d.value;
             })
         .sort(function(a, b) { 
             console.log(a.year+ ' --' + b.year);
           return -(a.year - b.year); 
         });
   
        bubble(root);
        var node = svg.selectAll(".node")
                      .data(root.children)
                      .enter().append("g")
                      .attr("class", "node")
                      .attr("transform", function(d) { 
                            return "translate(" + d.x * 1.0 + "," + d.y * 1.0 + ")";
                    });
   
       
   
     node.append("circle")
         // .attr("r", function(d) {  return d.r; })
         .style("fill", function(d) {
         //  console.log(d.data);
   
           if(d.data.records === '10,000,000,000'){
             return "red";
           }
   
           if (d.data.interesting == 1){
               var color = d3.scaleOrdinal().range(["#d1ff00"]);
           }else{
               var color = d3.scaleOrdinal().range(["#23293f"]);
           } 
           return color(d.data.year); 
         })
         .style("cursor", "pointer")
         .attr("stroke", "#FFFFFF")
         .attr("stroke-width", 0)
         .on("click", function(d){
             window.open(d.data.source);
   
         })
         .transition()
         .duration(2000)
         .attr("r",function(d) {  return d.r; })
         .ease(d3.easeSin);
         
     node.append("text")
         .attr("dy", "10")
         .attr("class", "title")
         .style("text-anchor", "middle")
         .style("cursor", "pointer")
         .style("font-weight", "light")
         .attr("fill", function(d){
   
   
           if (d.data.interesting === 1){
             return "#23293f";
           }else{
             return "#FFFFFF";
           }
         })
         .attr("opacity", "0")
         .attr("y", "-20")
         .text(function(d) { return d.data.story; })
   
    // title text tag     
     node.append("text")
         .attr("dy", "10")
         .attr("class", "title")
         .style("text-anchor", "middle")
         .style("cursor", "pointer")
         .style("font-weight", "light")
         .attr("fill", function(d){
             if(d.data.records === '10,000,000,000'){
             return "#FFFFFF";
           }
   
           if (d.data.interesting === 1){
             return "#23293f";
           }else{
             return "#FFFFFF";
           }
         })
         // .attr("x", "10")
         .attr("y", "-20")
         .text(function(d) { return d.data.className.substring(0, d.r / 3); })
         .style("font-size", function(d){
            //  console.log("this is test"); 
            // console.log(d.data);                  
            if(d.data.value > 15){
                return "14";
            }

            return "16";
         });
    
    // record text tag 
     node.append("text")
         .attr("dy", "10")
         .style("text-anchor", "middle")
         .style("font-weight", "light")
         .style("font-size", function(d){
           //console.log(d.data.records.length);
           //console.log(d.data.className+'--'+parseFloat(d.data.records));
   
           if(d.data.records.length >= 8 && d.data.value <= 10){
             return "10";
           }
           return "12";
         })
         .style("cursor", "pointer")
         .attr("fill", function(d){
   
           if(d.data.records === '10,000,000,000'){
             return "#FFFFFF";
           }
   
           if (d.data.interesting === 1){
             return "#23293f";
           }else{
             return "#FFFFFF";
           }
         })
         .text(function(d) { return d.data.records });
     
    }

render(){
    return (
       
        <div id='chart' ref={'chart'}></div>
        
);
}
    
}

function classes(root) {
    var classes = [];
  
    function recurse(name, node) {
      if (node.children) node.children.forEach(function(child) { recurse(node.entity, child); });
      else classes.push({
        packageName: name, 
        className: node.entity, 
        value: node.entity.length, 
        year:node.year, 
        records: node.lost_records,
        source : node.source_link,
        story: node.story,
        interesting : node.interesting_story
      });
    }
  
    recurse(null, root);
    return {children: classes};
  }


export default LatestBreachesBubble;