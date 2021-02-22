$(function(){ $(".s2Confirm").click(function(){ 
// --functions
function fillKdGroupValue(data,kdName){
  let kdGroup = new Array;

  for (var key in data){
    kdGroup.push(data[key][kdName]);//key Dimension Name
  }

  return kdGroup;
}

// max 값 찾는 함수 선언
function getMaxValue (data,kdName) {
  let max = 0;
  for (var key in data){
    kdValue = data[key][kdName];//key Dimension Name
    if (max<kdValue){
      max = kdValue;
    }
  }
  return max;
} 

// min 값 찾는 함수 선언
function getMinValue (data,kdName) {
  let min = data[0][kdName]
  for (var key in data){
    kdValue = data[key][kdName];//key Dimension Name
    if (min>kdValue){
      min = kdValue;
    }
  }
    return min;
} 

function getMeanValue (data,kdName) {
  let subTotal = 0;
  for (var key in data){
    subTotal+= data[key][kdName];//key Dimension Name
  }
  return subTotal/data.length; 
}

// 변수

 fitToleranceX = 5;
 fitToleranceY = 5;
 targetAccomRatio = 95;
 minPopCoverageRatio = 4;
 kd1Group = new Array;
 kd2Group =new Array;
 kd1Name = tempBd[0];
 kd2Name = tempBd[1];

kd1Group = fillKdGroupValue(data2,kd1Name);
kd2Group = fillKdGroupValue(data2,kd2Name);

 numPopulation = data2.length; // 값 count해서 넣어야 함

maxKd1 = 0;
maxKd2 = 0;

minKd1 = 0;
minKd2 = 0;

meanKd1 = 0;
meanKd2 = 0;

// kd 각각 max 값 찾아서 변수에 할당
maxKd1 = getMaxValue(data2,kd1Name);
maxKd2 = getMaxValue(data2,kd2Name);

minKd1 = getMinValue(data2,kd1Name);
minKd2 = getMinValue(data2,kd2Name);

meanKd1 = getMeanValue(data2,kd1Name);
meanKd2 = getMeanValue(data2,kd2Name);

rangeX = maxKd1 - minKd1;
rangeY = maxKd2 - minKd2;

numGridsX = Math.round(rangeX/fitToleranceX);
numGridsY = Math.round(rangeY/fitToleranceY);

//lower bounds
LB_X = Math.round(meanKd1 - numGridsX/2*fitToleranceX); //이 부분 교수님께 여쭤볼것
LB_Y = Math.round(meanKd2 - numGridsY/2*fitToleranceY);

let row = 0;
sizingInfo = new Array();

for (i = 0; i<numGridsX; i++){
  for(j = 0; j<numGridsY; j++){
    sizingInfo[row]= new Array(8)
    sizingInfo[row][0] = LB_X + i*fitToleranceX;
    sizingInfo[row][1] = sizingInfo[row][0] + fitToleranceX/2;
    sizingInfo[row][2] = sizingInfo[row][0] + fitToleranceX;
    sizingInfo[row][3] = LB_Y + j*fitToleranceY;
    sizingInfo[row][4] = sizingInfo[row][3]  + fitToleranceY/2;
    sizingInfo[row][5] = sizingInfo[row][3]  + fitToleranceY;
    row++;
  }    
}

const numSizeCategories = numGridsX*numGridsY;

// count how many cases are included in each sizing category
let cntCasesInEachSizes = new Array(numSizeCategories);
cntCasesInEachSizes.fill(0);

for (let i =0; i<=numPopulation;i++){ 
    for (let j =0; j<numSizeCategories;j++){
    if (kd1Group[i] >= sizingInfo[j][0] && kd1Group[i] <= sizingInfo[j][2] 
      && kd2Group[i] >= sizingInfo[j][3] && kd2Group[i] <= sizingInfo[j][5])
          cntCasesInEachSizes[j]++;
  }
}

for (let i =0; i<numSizeCategories;i++){ //끝값
  sizingInfo[i][6] = cntCasesInEachSizes[i];
  sizingInfo[i][7] = sizingInfo[i][6]/numPopulation * 100; 
}

row = 0;
let numSizeCategory = new Array;
for (let i =0; i<numSizeCategories;i++){
    if (sizingInfo[i][7] > minPopCoverageRatio) { //minpopcoverageratio는 뭔지?
      numSizeCategory[row]= new Array(1);
      numSizeCategory[row][0] = i;
      row++;
    }

}

let numSizeCategoriesFilled = numSizeCategory.length;

reducedSizingInfo = new Array;

for (let i =0; i<numSizeCategoriesFilled;i++){ 
  reducedSizingInfo[i] = new Array;
    for (let j = 0; j<=7;j++){
      reducedSizingInfo[i][j] = sizingInfo[numSizeCategory[i]][j];
    }
}

// d3
// d3 start
// set the dimensions and margins of the graph
let margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 400 - margin.left - margin.right,
  height = 360 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#latticePlot")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
 xAdjustRangeMinus = setAdjustRangeMinus(minKd1);
 xAdjustRangePlus = setAdjustRangePlus(maxKd1);

if(xAdjustRangeMinus!=0){
   xaxisStart = Math.round((minKd1-xAdjustRangeMinus)/xAdjustRangeMinus)*xAdjustRangeMinus;
}
else{
   xaxisStart = 0;
}

 xaxisEnd = Math.round((maxKd1+xAdjustRangePlus)/xAdjustRangePlus)*xAdjustRangePlus;
 xTicksNum = (xaxisEnd-xaxisStart)/xAdjustRangePlus;

// Add X axis
let x = d3.scaleLinear()
  .domain([xaxisStart,xaxisEnd])
  .range([0, width])
  
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x)
  .ticks(xTicksNum));

yAdjustRangeMinus = setAdjustRangeMinus(minKd2);
yAdjustRangePlus = setAdjustRangePlus(maxKd2);

if(yAdjustRangeMinus!=0){
   yaxisStart = Math.round((minKd2-yAdjustRangeMinus)/yAdjustRangeMinus)*yAdjustRangeMinus;
}
else{
   yaxisStart = 0;
}

let yaxisEnd = Math.round((maxKd2+yAdjustRangePlus)/yAdjustRangePlus)*yAdjustRangePlus;
let yTicksNum = (yaxisEnd-yaxisStart)/yAdjustRangePlus;

// Add Y axis
let y = d3.scaleLinear()
  .domain([yaxisStart, yaxisEnd])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y)
  .ticks(yTicksNum));

// Add dots
svg.append('g')
  .selectAll("dot")
  .data(data2)
  .enter()
  .append("circle")
    .attr("cx", function (d) {
      return x(d[kd1Name]); 
    } )
    .attr("cy", function (d) { return y(d[kd2Name]); } )
    .attr("r", 1.5)
    .style("fill", "#69b3a2");

//rect
let rectWidth = d3.scaleLinear()
.domain([0, xAdjustRangePlus]) //0 - 100
.range([0, width/xTicksNum]); 

let rectHeight = d3.scaleLinear()
.domain([0, yAdjustRangePlus])
.range([0, height/yTicksNum]);

svg.append('g')
  .selectAll("rect") 
  .data(sizingInfo)
  .enter()
  .append('rect') //sizingInfo.length 개수만큼의 rect가 생겨난 상황
  .attr('width',rectWidth(fitToleranceX))
  .attr('height', rectHeight(fitToleranceY))
  .attr('x',function(d){
    return x(d[0]);
  })
  .attr('y',function(d){
    return y(d[3])-rectHeight(fitToleranceY); //왼쪽 아래가 아닌 왼쪽 위에이기 때문에
  })

  .attr('stroke', 'black')
  .attr('fill', 'none');

  svg.append('g')
  .selectAll("rect") 
  .data(reducedSizingInfo)
  .enter()
  .append('rect') //sizingInfo.length 개수만큼의 rect가 생겨난 상황
  .attr('width',rectWidth(fitToleranceX))
  .attr('height', rectHeight(fitToleranceY))
  .attr('x',function(d){
    return x(d[0]);
  })
  .attr('y',function(d){
    return y(d[3])-rectHeight(fitToleranceY); //왼쪽 아래가 아닌 왼쪽 위에이기 때문에
  })
  // style
  .attr('stroke', 'red')
  .attr('stroke-width', '3px')
  .attr('fill', 'none');

  // function
  function setAdjustRangeMinus(minKd){
    let adjustRangeMinus;
    if(10<minKd && minKd<100){
      adjustRangeMinus = 10;
    }
    else if (100<minKd && minKd<1000){
      adjustRangeMinus = 100;
    }
    else if (1000<minKd && minKd<10000){
      adjustRangeMinus = 100;
    }
    else{
      adjustRangeMinus = 0
    }
    return adjustRangeMinus;
  }
  
  function setAdjustRangePlus(maxKd){
    let adjustRangePlus;
    if(10<maxKd && maxKd<100){
      adjustRangePlus = 10;
    }
    else if (100<maxKd && maxKd<1000){
      adjustRangePlus = 100;
    }
    else if (1000<maxKd && maxKd<10000){
      adjustRangePlus = 100;
    }
    else{
      adjustRangePlus = 10;
    }
    return adjustRangePlus;
  }
});
});