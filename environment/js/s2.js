// s2
function missingValueCheck(checkedDimensions){
      
  checkedDimensions.forEach(function(element,index){
    let mv = 0;
    let dimension = element;
  data2.forEach(function(element, index){
     let person = data2[index][dimension];
      if(person==0||person==null||person=="")
      {
        mv++;
      }
  })
  missingValue.push(mv);

  });
  console.log(missingValue);
    return(missingValue);
}
// excel
function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
// --excel
	function createAnalysisTable(tempBd){
			tempBd.forEach(function(element,index){
				tempElement = element;
		 		let bdRow = document.createElement('tr');
		  			var rowName = 'bdRow' + index;
	                bdRow.id=rowName;
	                document.getElementById('analysisTable').appendChild(bdRow);

				let bdColummn = document.createElement('td');
		  			bdColummn.innerHTML = element;
		  			document.getElementById(rowName).appendChild(bdColummn);

		  		let statisticsArray = new Array ("N","mean","SD", "min");
		 			 statisticsArray.forEach(function(element,index){
				 		let bdColummn = document.createElement('td');
				  		bdColummn.id = tempElement + element;
				  		document.getElementById(rowName).appendChild(bdColummn);
				  })
			    let pArray = new Array ("p1","p5","p10","p25","p50","p75","p90","p95","p99","max");
		 		pArray.forEach(function(element,index){
		 			let bdColummn = document.createElement('td');
		  			bdColummn.id = tempElement +  element;
		  			document.getElementById(rowName).appendChild(bdColummn);
		 		 })

			});
	}
	
	function insertAnalysisTable(sd, p_value, mean, tempArray_statistics,insertCount,missingValue){
		let percentiles = new Array (1,5,10,25,50,75,90,95,99);
		let n = tempArray_statistics.length-missingValue[insertCount];
		let min = tempArray_statistics[0];
		let max = tempArray_statistics[tempArray_statistics.length-1];

	//[Start] p value 집어 넣는 과정
	//sd
	  var sdValue = document.createElement('span');
      var insertPlace = Object.keys(data2[0])[insertCount]+"SD";
 	  sdValue.innerHTML = sd;
 	  document.getElementById(insertPlace).appendChild(sdValue);
	//min
	  var minValue = document.createElement('span');
      var insertPlace = Object.keys(data2[0])[insertCount]+"min";
 	  minValue.innerHTML = min;
 	  document.getElementById(insertPlace).appendChild(minValue);

	 //max
 	  var maxValue = document.createElement('span');
 	  var insertPlace = Object.keys(data2[0])[insertCount]+"max";
  	  maxValue.innerHTML = max;
 	  document.getElementById(insertPlace).appendChild(maxValue);

	 //mean
 	  var meanValue = document.createElement('span');
 	  var insertPlace = Object.keys(data2[0])[insertCount]+"mean";
  	  meanValue.innerHTML = mean;
 	  document.getElementById(insertPlace).appendChild(meanValue);

	 var n_value = document.createElement('span');
 	 var insertPlace = Object.keys(data2[0])[insertCount]+"N";
 	 n_value.innerHTML = n;
 	 document.getElementById(insertPlace).appendChild(n_value);

	p_value.forEach(function(element,index){
	 var p_input = document.createElement('span');
 	 var insertPlace = Object.keys(data2[0])[insertCount]+"p"+percentiles[index];

 	 p_input.innerHTML = p_value[index];
 	 document.getElementById(insertPlace).appendChild(p_input);
	});
}
//Pearson's Function
pearsonsCorrelation = (x, y) => {
    let arrayLength = 0;

    if (x.length === y.length) {
      arrayLength = x.length;
    } else if (x.length > y.length) {
      //Handles errors for conflicts of difference in length of arrays inputed [x]&[y]
      arrayLength = y.length;
      console.error(
        "Array X has more items in it, the last " +
          (x.length - arrayLength) +
          " will not run in the correlation..."
      );
    } else {
      arrayLength = x.length;
      console.error(
        "Array Y has more values in it, the last " +
          (y.length - arrayLength) +
          " will not run in the correlation..."
      );
    }

    let xy = [];
    let x2 = [];
    let y2 = [];

    for (let i = 0; i < arrayLength; i++) {
      xy.push(x[i] * y[i]);
      x2.push(x[i] * x[i]);
      y2.push(y[i] * y[i]);
    }

    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_x2 = 0;
    let sum_y2 = 0;

    for (let i = 0; i < arrayLength; i++) {
      sum_x += x[i];
      sum_y += y[i];
      sum_xy += xy[i];
      sum_x2 += x2[i];
      sum_y2 += y2[i];
    }

    let stepOne = arrayLength * sum_xy - sum_x * sum_y;
    let stepTwo = arrayLength * sum_x2 - sum_x * sum_x;
    let stepThree = arrayLength * sum_y2 - sum_y * sum_y;
    let stepFour = Math.sqrt(stepTwo * stepThree);
    let r = stepOne / stepFour;
    let rSquared = r*r

    console.log("Pearson's Coefficient (r) = ", r.toFixed(2))
    // console.log("Coefficient of Determination (r^2) = ", rSquared.toFixed(2))
  };
  
  // percentile
function percentile(arr, p) {
if (arr.length === 0) return 0;
if (typeof p !== 'number') throw new TypeError('p must be a number');
if (p <= 0) return arr[0];
if (p >= 100) return arr[arr.length + 1];

arr.sort(function (a, b) { return a - b; });
var index = ((arr.length + 1)) * p/100,
    lower = Math.floor(index),
    upper = lower + 1,
    weight = index % 1;

if (upper >= arr.length) return arr[lower];
return arr[lower] + weight * (arr[upper] - arr[lower]);
}

// --s2