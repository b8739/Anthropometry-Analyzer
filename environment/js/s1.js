/* 
Function Explanation: 
	- 사용자가 체크 박스 (genderCheckbox/ageCheckbox)를 체크할때마다 ratio의 값을 자동으로 설정해주는 함수 
Parameter Explanation:
	- checkbox: genderCheckbox OR ageCheckbox
	- ratio: genderRatio OR ageRatio
*/ 

function divideRatio(checkbox, ratio) {
	var size = document.getElementsByClassName(checkbox).length;
	var totalNumOfBoxChecked = 0;
	var checkedBoxArray = [];
	for (var i = 0; i < size; i++)
	{
		if(document.getElementsByClassName(checkbox)[i].checked == true) 
			{
				totalNumOfBoxChecked+=1;
				checkedBoxArray [i] = i; 
			}
		else document.getElementsByClassName(ratio)[i].value = 0 + '%';

	}
	for (var i = 0; i < checkedBoxArray.length; i++)
	{
		if (checkedBoxArray[i] != null){
		document.getElementsByClassName(ratio)[checkedBoxArray[i]].value = 1/totalNumOfBoxChecked*100 + '%';
	}
		}
	
	}

/*
Function Explanation: 
	- checkTotalRatio: S2로 넘어가기 이전, S1에서 사용자가 설정한 Ratio가 100%인지 검증해주는 함수
	- ratioValue (ratio의 총합)이 1 (100%)라면 s1Complete을 return, 아니라면 s1Incomplete을 return.
*/

function checkTotalRatio(){
		let ratioSum = 0; //사용자가 체크한 ratio 값의 총합 (100% 인지 검증하기 위한 목적)
		let ratioValue; // String '%'를 제거한 순수한 퍼센트 수치 값
		let s1Complete = true;
		let s1Incomplete = false;
		
		if($('#percentSelect').is(":checked")){
			return s1Complete;
		}
	
		else{
				document.querySelectorAll('.ageRate').forEach(function(item, index) {
					ratioValue = item.value.split('%');
					ratioSum+=parseFloat(ratioValue[0]);
			})

			if(ratioSum<99.9)
				{
					console.log(ratioSum);
					return s1Incomplete;
				}
			else {
				return s1Complete;
			}
}}

function accordion_s1(){
	$("#s1Inside").slideToggle(100);
	$('.downCover').eq(0).toggleClass('rotate');	
	$("#s2Inside").slideToggle(100);
	$('.downCover').eq(1).toggleClass('rotate');
}

function calculateFinalRatio(){
	let gender = 0;
 	let age = 0;
		$('.genderCheckbox').each(function(index,item){
			if (index==1){
				gender++;
			}
			else{
				if($(this).is(":checked")){
					age = 0; // gender가 바뀔 때 age는 다시 0부터 시작하기 위해 초기화
					let genderRatioValue = $('.genderRatio:eq('+gender+')').val().split('%');
					
					$('.ageCheckbox').each(function(index,item){
						 if($(this).is(":checked")){
						 	let ageRatioValue = $('.ageRatio:eq('+age+')').val().split('%');
						 	finalRatio[gender][age] = (genderRatioValue[0]/100) * (ageRatioValue[0]/100);				
						}
					  	age++;
					})
				}
				if (gender>1){
				gender++;
				}	  
			}
 	
		});
}

const Maximizer = {
	getNumOfCases: function (){
		let gender = -1;
 		let age;
 		let maximizeCases = new Array;

		$(finalRatio).each(function(index,item){
			gender++; //처음엔 0으로 시작
			$(this).each(function(index,item){
				if (item !=0){
				age = index; 
				maximizeCases.push(population[gender][age]/item);		
				}
			})
		});

		console.log(maximizeCases);
		return maximizeCases;
		},
	maximizePopulation: function(maximizeCases, firstIndex, secondIndex){
		for (let i = 0; i<maximizeCases.length;i++){
		standard = maximizeCases[i];
		$(finalRatio).each(function(index,item){
			firstIndex++; //처음엔 0으로 시작
			$(this).each(function(index,item){
			    if (item !=0){
					secondIndex = index; 
					if (standard * item > population[firstIndex][secondIndex]){
					    $(maximizeCases).each(function(index,item){
						$(maximizeCases)[index] = 0;	
						 	 		});
						    return false;
						}
				     else
				 	 	maximized[firstIndex][secondIndex] = Math.floor(standard * item);												
				}
						 	 })});
		firstIndex=-1;
		secondIndex=0;
		}
	},
	shuffle:function(shuffleTarget){
		var j, x, i; 
		for (i = shuffleTarget.length; i; i -= 1) { 
			j = Math.floor(Math.random() * i);
			 x = shuffleTarget[i - 1]; 
			 shuffleTarget[i - 1] = shuffleTarget[j]; 
			 shuffleTarget[j] = x; 
		} 
	},
		//Json 파일 공식대로/랜덤으로 불러오기
	getMaximizedData:function(maximized){
	for (var i = 0; i<2; i++){
		for (var j = 0; j<7; j++){
			if (maximized[i][j]!=0){ 
				tempLength = maximized[i][j];
				switch (i){
		    case 0 :
		        tempGender = "남";
		        break;
		    case 1 :
		        tempGender = "여";
		        break;
				}
				switch (j){
		    case 0 :
		        tempAge = 10;
		        break;
		    case 1 :
		        tempAge = 20;
		        break;
		    case 2 :
		        tempAge = 30;
		        break;
		    case 3 :
		        tempAge = 40;
		        break;	        	        
		    case 4 :
		        tempAge = 50;
		        break;
		    case 5 :
		        tempAge = 60;
		        break;
		    case 6 :
		        tempAge = 70;
		        break;	        	        
				}
	//일단은 조건에 부합하면 tempData에 집어넣기
				$(data1).each(function(index,element){ 
			
					if(this.성별 == tempGender && this.나이>=(tempAge-10) && this.나이<tempAge) //0보다 크고 ex.10세 보다 낮고
						{
							tempData.push(element);
	                    } 
				});
	//--일단은 조건에 부합하면 tempData에 집어넣기
				Maximizer.shuffle(tempData); 
	//Maximized와 일치할때까지 원소들을 끝에서부터 제거
				while (tempData.length != tempLength){  
					tempData.pop();
				}
	//--Maximized와 일치할때까지 원소들을 끝에서부터 제거
					$(tempData).each(function(index,element){
						data2.push(element); 
					})
					tempData = new Array; 	 
			} 
		} 
	}//for문 끝

	}
}



//--Json 파일 공식대로/랜덤으로 불러오기
function getDataManually() {
	//연령대 구간 불러오기 (ageRange)
	let minAge = $('.minAge').val();
	let maxAge = $('.maxAge').val();
	
	//구간을 조건으로 데이터에서 필터링 
		$(data1).each(function(index,element){ 
			if (minAge<=this.나이 && this.나이<=maxAge){
				data2.push(element); 
			}
		});
}
//--s1

// s2
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
			    let pArray = new Array ("p1","p5","p25","p50","p75","p90","p95","p99","max");
		 		pArray.forEach(function(element,index){
		 			let bdColummn = document.createElement('td');
		  			bdColummn.id = tempElement +  element;
		  			document.getElementById(rowName).appendChild(bdColummn);
		 		 })

			});
	}
	
	function insertAnalysisTable(sd, p_value, mean, tempArray_statistics,insertCount){
		let percentiles = new Array (1,5,25,50,75,90,95,99);
		let n = tempArray_statistics.length;
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



