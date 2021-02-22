$(function(){ $(".s2Confirm").click(function(){ 
// PCA 계산 및 데이터 전처리
// 1. pca score 계산
data = PCA.dataParsingBeforePCA(data2,tempBd)
var vectors = PCA.getEigenVectors(data);
var adData = PCA.computeAdjustedData(data,vectors[0],vectors[1]);
// 2. Key:Value 형태 데이터로 변환
jsonData = new Array;

adData.formattedAdjustedData[0].forEach(function(item,index){
        tempArray = new Object;
        tempArray.pc1=item;
        tempArray.pc2=adData.formattedAdjustedData[1][index];
        jsonData.push(tempArray);
})

let pc1 = adData.formattedAdjustedData[0];
let pc2 = adData.formattedAdjustedData[1];

//D3 시작
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 300 - margin.left - margin.right,
    height = 260 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var svg = d3.select("#scatterPlot")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")
//Read the data
// 'sizedata/sizekorea_divided/sizekorea2004.json'


  // Add X axis
  var xaxis = d3.scaleLinear()
    .domain([0,0])
    .range([ 0, width]);
  svg.append("g")
    .attr("class", "myXaxis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xaxis))
    .attr("opacity", "0")

  // Add Y axis
  var yaxis = d3.scaleLinear()
    .domain([d3.min(pc2), d3.max(pc2)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(yaxis));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(jsonData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return xaxis(d['pc1']); } )
      .attr("cy", function (d) { return yaxis(d['pc2']); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

  // new X axis

  xaxis.domain([d3.min(pc1), d3.max(pc1)])
  svg.select(".myXaxis")
    .transition()
    .duration(500)
    .attr("opacity", "1")
    .call(d3.axisBottom(xaxis));

  svg.selectAll("circle")
    .transition()
    .delay(function(d,i){return(i*3)})
    .duration(500)
    .attr("cx", function (d) { return xaxis(d['pc1']); } )
    .attr("cy", function (d) { return yaxis(d['pc2']); } )

   // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + 13)
      .attr("y", height + margin.top + 20)
      .text("PC1");

  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height/2 + 12)
      .text("PC2")

})});
