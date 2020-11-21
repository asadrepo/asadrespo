
import React, { useEffect, Component } from 'react';
import * as d3 from 'd3';

const dataResult =         {
    "name": "latest-breach",
    "children" : [
{
    "name":"2020",
    "children": [
        {
            "entity": "Dutch Government",
            "lost_records": "6900000",
            "story": "Mar 2020. Dutch government lost a hard drive with data from 6.9m registered organ donors, including names, contact details, ID numbers, & signatures. ",
            "year": 2020,
            "source_link": "https://www.zdnet.com/article/dutch-government-loses-hard-drives-with-data-of-6-9-million-registered-donors/",
            "interesting_story" : 1
        },
        {
            "entity": "Virgin Media",
            "lost_records": "900000",
            "story": "Mar 2020. A poorly-configured database left user records exposed for 10 months. ",
            "year": 2020,
            "source_link": "https://www.bbc.co.uk/news/business-51760510",
            "interesting_story" : 1
        },
        {
            "entity": "Tesco Clubcard",
            "lost_records": "600000",
            "story": "Mar 2020. Hackers attempted to access records of 600k Clubcard holders. Accrued credit was stolen, but financial details weren't exposed.",
            "year": 2020,
            "source_link": "https://www.techradar.com/uk/news/tesco-clubcard-holders-warned-of-major-security-issue"
            ,
            "interesting_story" : 1
        },
        {
            "entity": "Zoom",
            "lost_records": "500000",
            "story": "Apr 2020. Zoom accounts up for grabs on hacker forums on the dark web. Lead to a host of zoom-bombing pranks. ",
            "year": 2020,
            "source_link": "https://www.welivesecurity.com/2020/04/16/half-million-zoom-accounts-sale-dark-web/",
            "interesting_story" : 1

        },
        {
            "entity": "MGM Hotels",
            "lost_records": "10600000",
            "story": "Feb 2020. Data stolen during an 2019 hack of an MGM server was published on a hacking forum.",
            "year": 2020,
            "source_link": "https://www.zdnet.com/article/exclusive-details-of-10-6-million-of-mgm-hotel-guests-posted-on-a-hacking-forum/",
            "interesting_story" : 1
        },
        {
            "entity": "Buchbinder Car Rentals",
            "lost_records": "500,0000",
            "story": "Jan 2020. Correspondence, invoices and contracts containing personal details were left exposed on an unsecured company server. ",
            "year": 2020,
            "source_link": "https://www.tellerreport.com/news/2020-01-22---big-data-leak--media--at-buchbinder-car-rental-company--customer-data-was-open-.BJ-S5Jk8Z8.html",
            "interesting_story" : 1
        }
    ]
},
{
    "name":"2019",
    "children": [

        {
            "entity": "People Data Labs",
            "lost_records": "3,000,000,000",
            "story": "3bn records were left unsecured, affecting 1.2bn unique users.",
            "year": 2019,
            "source_link": "https://www.dataviper.io/blog/2019/pdl-data-exposure-billion-people/",
            "interesting_story" : 1
        },
        {
            "entity": "OxyData",
            "lost_records": "380,000,000",
            "story": "Analysis of the \"Oxy\" database revealed an almost complete scrape of LinkedIN data, including recruiter information.",
            "year": 2019,
            "source_link": "https://www.dataviper.io/blog/2019/pdl-data-exposure-billion-people/",
            "interesting_story" : 0
        }            
    ]
},

{
    "name": "2018",
    "children": [
                        {
            "entity": "Click2Gov",
            "lost_records": "300,000",
            "story": "Dec 2018. Vulnerabilities in Click2Gov, a type of government payment software, allowed hackers to access financial records from local government payment networks in 46 US cities.",
            "year": 2018,
            "source_link": "http://fortune.com/2018/12/18/click2gov-local-government-portals-hackers-credit-card-breach/",
            "interesting_story" : 0
        },
        {
            "entity": "SingHealth",
            "lost_records": "1,500,000",
            "story": "July 2018. Hackers stole personal details of 1.5 million patients, as well as the prescription details of 160,000 people, including prime minister Lee Hesien Loong.",
            "year": 2018,
            "source_link": "https://www.straitstimes.com/singapore/personal-info-of-15m-singhealth-patients-including-pm-lee-stolen-in-singapores-most",
            "interesting_story" : 1
        },
        {
            "entity": "GovPayNow.com",
            "lost_records": "14,000,000",
            "story": "Sep 2018. A company used by thousands of US state and local governments to accept online payments leaked more than 14m customer records dating back at least six years, including names, addresses, phone numbers and the last four digits of the payer’s credit card.",
            "year": 2018,
            "source_link": "https://krebsonsecurity.com/2018/09/govpaynow-com-leaks-14m-records/",
            "interesting_story" : 0
        }

    ]
},
{
    "name": "2017",
    "children": [
        {
            "entity": "Newegg",
            "lost_records": "40,000,000",
            "story": "Sep 2018. Hackers injected 15 lines of card skimming code on the online retailer's payments page which remained for more than a month between Aug 14 and Sep 18. With over 45m monthly visitors, it's unclear how many customers were breached.",
            "year": 2017,
            "source_link": "https://yro.slashdot.org/story/18/09/19/1417242/hackers-stole-customer-credit-cards-in-newegg-data-breach?utm_source=rss1.0mainlinkanon&utm_medium=feed",
            "interesting_story" : 1
        },
        {
            "entity": "Mount Olympus",
            "lost_records": "18,000",
            "story": "A former employee of Mount Olympus Mortgage stole client information and loan files and took them with him when he went to work at Guaranteed Rate. Mount Olympus was awarded $25m in damages. ",
            "year": 2017,
            "source_link": "https://www.globenewswire.com/news-release/2018/10/02/1588510/0/en/Bitglass-2018-Financial-Services-Breach-Report-Number-of-Breaches-in-2018-Nearly-Triple-That-of-2015.html",
            "interesting_story" : 0

        }

    ]
},
{
    "name": "2015",
    "children": [

        {
            "entity": "Facebook",
            "lost_records": "29,000,000",
            "story": "Oct 2018. Malicious third-party scrapers collected profile information from many Facebook users. ",
            "year": 2015,
            "source_link": "https://www.businessinsider.com.au/facebook-thinks-spammers-responsible-hack-stole-info-from-29-million-users-2018-10?r=US&IR=T",
            "interesting_story" : 0
        },
        {
            "entity": "Mount Olympus",
            "lost_records": "18,000",
            "story": "A former employee of Mount Olympus Mortgage stole client information and loan files and took them with him when he went to work at Guaranteed Rate. Mount Olympus was awarded $25m in damages. ",
            "year": 2015,
            "source_link": "https://www.globenewswire.com/news-release/2018/10/02/1588510/0/en/Bitglass-2018-Financial-Services-Breach-Report-Number-of-Breaches-in-2018-Nearly-Triple-That-of-2015.html",
            "interesting_story" : 0


        },
        {
            "entity": "Apollo",
            "lost_records": "10,000,000,000",
            "story": "Data readily available online. Included info that looked to have been from LinkedIn profiles.",
            "year": 2015,
            "source_link": "https://www.wired.com/story/apollo-breach-linkedin-salesforce-data/",
            "interesting_story" : 0
        }
    ]
},
{
    "name": "2015",
    "children": [
                                        {
            "entity": "Facebook",
            "lost_records": "29,000,000",
            "story": "Oct 2018. Malicious third-party scrapers collected profile information from many Facebook users. ",
            "year": 2015,
            "source_link": "https://www.businessinsider.com.au/facebook-thinks-spammers-responsible-hack-stole-info-from-29-million-users-2018-10?r=US&IR=T",
            "interesting_story" : 0
        },
        {
            "entity": "Mount Olympus",
            "lost_records": "18,000",
            "story": "A former employee of Mount Olympus Mortgage stole client information and loan files and took them with him when he went to work at Guaranteed Rate. Mount Olympus was awarded $25m in damages. ",
            "year": 2015,
            "source_link": "https://www.globenewswire.com/news-release/2018/10/02/1588510/0/en/Bitglass-2018-Financial-Services-Breach-Report-Number-of-Breaches-in-2018-Nearly-Triple-That-of-2015.html",
            "interesting_story" : 0


        },
        {
            "entity": "Apollo",
            "lost_records": "10,000,000,000",
            "story": "Data readily available online. Included info that looked to have been from LinkedIn profiles.",
            "year": 2015,
            "source_link": "https://www.wired.com/story/apollo-breach-linkedin-salesforce-data/",
            "interesting_story" : 0
        }
    ]
},
        {
    "name": "2014",
    "children": [
        {
            "entity": "Facebook",
            "lost_records": "29,000,000",
            "story": "Oct 2018. Malicious third-party scrapers collected profile information from many Facebook users. ",
            "year": 2014,
            "source_link": "https://www.businessinsider.com.au/facebook-thinks-spammers-responsible-hack-stole-info-from-29-million-users-2018-10?r=US&IR=T",
            "interesting_story" : 0
        },
        {
            "entity": "Mount Olympus",
            "lost_records": "18,000",
            "story": "A former employee of Mount Olympus Mortgage stole client information and loan files and took them with him when he went to work at Guaranteed Rate. Mount Olympus was awarded $25m in damages. ",
            "year": 2014,
            "source_link": "https://www.globenewswire.com/news-release/2018/10/02/1588510/0/en/Bitglass-2018-Financial-Services-Breach-Report-Number-of-Breaches-in-2018-Nearly-Triple-That-of-2014.html",
            "interesting_story" : 0


        },
        {
            "entity": "Apollo",
            "lost_records": "10,000,000,000",
            "story": "Data readily available online. Included info that looked to have been from LinkedIn profiles.",
            "year": 2014,
            "source_link": "https://www.wired.com/story/apollo-breach-linkedin-salesforce-data/",
            "interesting_story" : 0
        }
    ]
}

]
};

class LatestBreachesBubble extends Component {
    

    componentDidMount() {

        var diameter = 1000, format = d3.format(",d"), width = 960 , height = 960
    var bubble = d3.pack()
        .size([diameter, diameter])
        .padding(40);

    var svg = d3.select("#chart").append("svg")
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

    var yearArray = ["Latest","2019","2018","2017","2016","2015","2014","2013","2011","2010"];

    for (var i=0; i <= 9 ; i++){
       var a =  (i * 100) + 15;

        var borderPath = svg.append("rect")
            .attr("x", 12)
            .attr("y", i * 100)
            .attr("height",20)
            .attr("width", 51.3125)
            .attr("rx", 6)
            .style("stroke", "#cccccc")
            .style("fill", "#23293f")
            .style("stroke-width", 1)
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

   // d3.json("latest_breach.json", function(error, data) {
      //  if (error) throw error;

      console.log(dataResult);
        var root = d3.hierarchy(classes(dataResult))
            .sum(function(d) {return d.value; })
            // .sort(d3.descending)
            .sort(function(a, b) {
                return -(a.year - b.year);
            });

        bubble(root);
        var node = svg.selectAll(".node")
            .data(root.children)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x * 1.0 + "," + d.y * 1.0 + ")"; });
        // .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
        // .attr('transform', function(d: any) { return 'translate(' + d.x * 1.5 + ',' + d.y + ')'; });

        // node.append("title")
        //     .text(function(d) {

        //       return d.data.className + ": " + format(d.data.records); });

        node.append("circle")
            .attr("r", function(d) {return d.r; })
            .style("fill", function(d) {
                console.log(d.data.interesting);

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

            });
        // .on("mouseover", function(d){
        // }).on("mouseout", function(d){
        //   d3.select(this)
        //        .transition().attr("r", d.r)

        //   // d3.select(this.nextSibling)
        //   //     .attr("opacity", "0")

        // });

        // testing rext ag for story
        node.append("text")
            .attr("dy", "10")
            .attr("class", "title")
            .style("text-anchor", "middle")
            .style("cursor", "pointer")
            .style("font-weight", "light")
            .attr("fill", function(d){
                if (d.data.interesting == 1){
                    return "#23293f";
                }else{
                    return "#FFFFFF";
                }
            })
            .attr("opacity", "0")
            .attr("y", "-20")
            .text(function(d) { return d.data.story; });

        // title text tag
        node.append("text")
            .attr("dy", "10")
            .attr("class", "title")
            .style("text-anchor", "middle")
            .style("cursor", "pointer")
            .style("font-weight", "light")
            .attr("fill", function(d){
                if (d.data.interesting == 1){
                    return "#23293f";
                }else{
                    return "#FFFFFF";
                }
            })
            // .attr("x", "10")
            .attr("y", "-20")
            .text(function(d) { return d.data.className.substring(0, d.r / 3); });

        // record text tag
        node.append("text")
            .attr("dy", "10")
            .style("text-anchor", "middle")
            .style("font-weight", "light")
            .style("font-size", "12")
            .style("cursor", "pointer")
            .attr("fill", function(d){
                if (d.data.interesting == 1){
                    return "#23293f";
                }else{
                    return "#FFFFFF";
                }
            })
            .text(function(d) { return d.data.records });

        node.append("text")
            .attr("dy", "25")
            .style("text-anchor", "middle")
            .style("font-weight", "light")
            .style("font-size", "12")
            .style("cursor", "pointer")
            .attr("fill", function(d){
                if (d.data.interesting == 1){
                    return "#23293f";
                }else{
                    return "#FFFFFF";
                }
            })
            .text(function(d) { return d.data.year });

    //});

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    d3.select('#chart').style("height", diameter + "px");
        // var diameter = 800, format = d3.format(",d"), width = 960, height = 960
        // var bubble = d3.pack()
        // .size([diameter, diameter])
        // .padding(15);
    
        // var svg = d3.select('#chart').append("svg")
        // .attr("viewBox", [0, 0, width, height])
        // .attr("class", "bubble");
    
        // var tooltip = d3.select('#chart').append("div") 
        //         .attr("class", "tooltipChart")               
        //         .style("opacity", 0);
    
        // svg.append("line")     
        //     .style("stroke", "#cccccc")  
        //     .attr("stroke-width", 2)
        //     .classed('linecap', true)
        //     .attr("x1", 0)
        //     .attr("y1", 960);      
     
        // var yearArray = ["Latest","2019","2018","2017","2016","2015","2014","2013","2011","2010"];
    
        // for (var i=0; i <= 9 ; i++){
        //    var a =  (i * 100) + 15;
          
        //     var borderPath = svg.append("rect")
        //       .attr("x", 0)
        //       .attr("y", i * 100)
        //       .attr("height",20)
        //       .attr("width", 51.3125)
        //       .attr("rx", 5)
        //       .style("stroke", "#cccccc")
        //       .style("fill", "#23293f")
        //       .style("stroke-width", 1)
        //       .style("stroke-opacity", 0.6);
            
        //     var textRect =   svg.append("text")
        //       .attr("fill", "#FFFFFF")
        //       .style("text-anchor","start")
        //       .attr("x", 10)
        //       .attr("y",a)
        //       .style("font-size","12px")
        //       .style("font-weight","bold")
        //       .text(yearArray[i]);
            
        //   }   
    
           
        //  //d3.json('flare3.json', function(error, data) {
        //     console.log("getting json data"); 
        //     // console.log(error);
        //     // if (error) throw error;
        //     var root = d3.hierarchy(classes(dataResult))
        //         .sum(function(d) {return d.value; })
        //         // .sort(d3.descending)
        //         .sort(function(a, b) { 
        //           return -(a.year - b.year); 
        //         });
          
        //     bubble(root);
        //     var node = svg.selectAll(".node")
        //       .data(root.children)
        //       .enter().append("g")
        //       .attr("class", "node")
        //         .attr("transform", function(d) { return "translate(" + d.x * 1.0 + "," + d.y * 1.0 + ")"; });
        //       // .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
        //       // .attr('transform', function(d: any) { return 'translate(' + d.x * 1.5 + ',' + d.y + ')'; });
          
        //     // node.append("title")
        //     //     .text(function(d) { 
          
        //     //       return d.data.className + ": " + format(d.data.records); });
          
        //     node.append("circle")
        //         .attr("r", function(d) {return d.r; })
        //         .style("fill", function(d) {
        //           console.log(d.data.interesting);
          
        //           if (d.data.interesting == 1){
        //              var color = d3.scaleOrdinal().range(["#d1ff00"]);
        //           }else{
        //               var color = d3.scaleOrdinal().range(["#23293f"]);
        //           } 
        //           return color(d.data.year); 
        //         })
        //         .style("cursor", "pointer")
        //         .attr("stroke", "#FFFFFF")
        //         .attr("stroke-width", 5)
        //         .on("click", function(d){
        //             window.open(d.data.source);
          
        //         });
        //         // .on("mouseover", function(d){ 
        //         // }).on("mouseout", function(d){
        //         //   d3.select(this)
        //         //        .transition().attr("r", d.r)
               
        //         //   // d3.select(this.nextSibling)
        //         //   //     .attr("opacity", "0")
           
        //         // });
          
        //    // testing rext ag for story     
        //     node.append("text")
        //         .attr("dy", "10")
        //         .attr("class", "title")
        //         .style("text-anchor", "middle")
        //         .style("cursor", "pointer")
        //         .style("font-weight", "light")
        //         .attr("fill", function(d){
        //           if (d.data.interesting == 1){
        //             return "#23293f";
        //           }else{
        //             return "#FFFFFF";
        //           }
        //         })
        //         .attr("opacity", "0")
        //         .attr("y", "-20")
        //         .text(function(d) { return d.data.story; });
          
        //    // title text tag     
        //     node.append("text")
        //         .attr("dy", "10")
        //         .attr("class", "title")
        //         .style("text-anchor", "middle")
        //         .style("cursor", "pointer")
        //         .style("font-weight", "light")
        //         .attr("fill", function(d){
        //           if (d.data.interesting == 1){
        //             return "#23293f";
        //           }else{
        //             return "#FFFFFF";
        //           }
        //         })
        //         // .attr("x", "10")
        //         .attr("y", "-20")
        //         .text(function(d) { return d.data.className.substring(0, d.r / 3); });
           
        //    // record text tag 
        //     node.append("text")
        //         .attr("dy", "10")
        //         .style("text-anchor", "middle")
        //         .style("font-weight", "light")
        //         .style("font-size", "12")
        //         .style("cursor", "pointer")
        //         .attr("fill", function(d){
        //           if (d.data.interesting == 1){
        //             return "#23293f";
        //           }else{
        //             return "#FFFFFF";
        //           }
        //         })
        //         .text(function(d) { return d.data.records });
            
        //     node.append("text")
        //         .attr("dy", "25")
        //         .style("text-anchor", "middle")
        //         .style("font-weight", "light")
        //         .style("font-size", "12")
        //         .style("cursor", "pointer")
        //         .attr("fill", function(d){
        //           if (d.data.interesting == 1){
        //             return "#23293f";
        //           }else{
        //             return "#FFFFFF";
        //           }
        //         })
        //         .text(function(d) { return d.data.year });
          
        // //  });
    
        //   console.log("cross it");
    
        //   d3.select('#chart').style("height", diameter + "px");
    }

render(){
    return (
        <div className="modal-body breaches_modal_inner_padding">
        <div className="container">
        <div id='chart' ref={'chart'}></div>
        </div>
        </div>
   
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