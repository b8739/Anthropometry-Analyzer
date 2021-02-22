// jquery file
	if($('#percentSelect').is(":checked")){
		$('.ageRatio').prop('readOnly', true); 
	}

	$("#percentManual").click(function(){ 
		$('.ageRatio').removeAttr('readOnly'); 
	});

	$("#percentSelect").click(function(){ 
		$('.ageRatio').prop('readOnly', true); 
	});


//화면 해상도에 따른 visualization의 width값 자동 변환: 전체화면 - 400px(variation width)
function widthRevise(){
	var windowWidth = $(window).width();
	var visualizationWidth = windowWidth - 400
	$('#visualization').css(width, visualizationWidth+'px');
	
}


//퍼센트 박스 클릭 시 자동으로 1/n값 분할
	$(".ageCheckbox").click(function(){ 
	if($('#percentSelect').is(":checked")){
		let checkbox = "ageCheckbox";
		let ratio = "ageRatio";
		divideRatio(checkbox,ratio);
	}
});

	$(".genderCheckbox").click(function(){ 
	if($('#percentSelect').is(":checked")){
		let checkbox = "genderCheckbox";
		let ratio = "genderRatio";
		divideRatio(checkbox,ratio);
	}
});


// 아코디언  
$('.downCover').click(function() {
       	if($(this).hasClass('rotate')){
       		$(".accordion").slideUp(150);
       		$(".downCover").removeClass('rotate');
    		return;	
    	}
    	
    	else{
    		$(".accordion").slideUp(150);
       		$(".downCover").removeClass('rotate');
    		$(this).toggleClass('rotate');
    		if($(this).attr("id")=="s1down")
    	{
			$("#s1Inside").slideToggle(100,function(){
				$("#circle1").css('border-color', '#0E2E47');
				$("#circle1").css('color','#0E2E47');
			});
	    }
	    else if($(this).attr("id")=="s2down")
	    {
	     	$("#s2Inside").slideToggle(100,function(){
	     		$("#circle2").css('border-color', '#0E2E47');
	     		$("#circle2").css('color','#0E2E47');
	     	});
	    }
	    else if($(this).attr("id")=="s3down")
	    {
	     	$("#s3Inside").slideToggle(100,function(){
	     		$("#circle3").css('border-color', '#0E2E47');
	     		$("#circle3").css('color','#0E2E47');
	     	});
	    }
	    else if($(this).attr("id")=="s4down")
	    {
	     	$("#s4Inside").slideToggle(100,function(){
	     		$("#circle4").css('border-color', '#0E2E47');
	     		$("#circle4").css('color','#0E2E47');
	     	});
	    }
	    else if($(this).attr("id")=="s5down")
	    {
	     	$(".s5Inside").slideToggle(100,function(){
	     		$("#circle5").css('border-color', '#0E2E47');
	     		$("#circle5").css('color','#0E2E47');
	     	});
	    } 
	    
    	}


     	
	});

// --아코디언

// Gender 활성화 & 비활성화
let totalNumOfGenderChecked= 0;

$('.genderCheckbox').change(function(){
	 if($('.genderCheckbox').is(":checked") && $(".genderCheckbox:checked").length>totalNumOfGenderChecked){
	 	if ($(this).hasClass('male')){
	 	$('.genderRatio.male').removeAttr ('disabled');
	 	}
	 	else{
	 	$('.genderRatio.female').removeAttr ('disabled');
	 	}
		 }
	 else {
	 	if ($(this).hasClass('male')){
	 	$('.genderRatio.male').attr('disabled','disabled');
		 }
	 	else{
	 	$('.genderRatio.female').attr('disabled','disabled');
	 	}
	 }
	 totalNumOfGenderChecked = $(".genderCheckbox:checked").length; 
});

// -- Gender 활성화 & 비활성화

// Age 활성화 & 비활성화직
let totalNumOfAgeChecked = 0;

	$('.ageCheckbox').change(function(){    
        if($(this).is(":checked")  && $(".ageCheckbox:checked").length>totalNumOfAgeChecked){
			let index = $(this).val();
			$('.ageRatio:eq('+index+')').removeAttr ('disabled') //체크박스 활성화
	
        }
        else {
			let index = $(this).val();
			$('.ageRatio:eq('+index+')').val( 0 +'%');
			$('.ageRatio:eq('+index+')').attr('disabled','disabled'); // 체크박스 비활성화			
        }
	totalNumOfAgeChecked = $(".ageCheckbox:checked").length;
    });

// --Age 활성화 & 비활성화

	//1) 'select' 체크 시 event

			$("#ageSelect").click(function(){ 
			$("#age").children().show();
		    jQuery('#byInputBox').hide();  
		    });


	// --1) '선택' 체크 시 event	
		
//2) 'manual' 체크 시 event

			$(function(){ $("#ageManual").click(function(){ 
				$("#age").children().hide();
				
				jQuery('.s1factor_title').show(); 
				jQuery('#ageOption').show(); 
				$('#percentSelect').prop('checked', true); 
				$('.ageRatio').prop('readOnly', true);
				jQuery('.s1factor_title').show(); 
		        jQuery('#byInputBox').show();  
		     
	    });
		});
		
//2) --'직접입력' 체크 시 event		

//ageRatio 사용자가 값을 입력하고 엔터를 치거나 다른곳을 클릭했을때 event

 $(".ageRatio").focus(function(){
 		if(!$('#percentSelect').is(":checked")){
 			this.select();
 		}
	
})

    $(".ageRatio").bind('blur keydown',function(e) {  
    	let checker = 0;

          if (e.type === 'blur' || e.keyCode === 13)  //focus를 벗어나거나, 사용자가 엔터를 쳤을때의 이벤트
          { 
			 if (this.value.indexOf('%')==-1 && (checker == 0)){
			 	this.value += '%';
				}
			this.blur();
        }})

//--ageRatio 사용자가 값을 입력하고 엔터를 치거나 다른곳을 클릭했을때 event

//--genderRatio 사용자가 값을 입력하고 엔터를 치거나 다른곳을 클릭했을때 event


$(".genderRatio").focus(function(){
	this.select();
})  

    $(".genderRatio").bind('blur keydown',function(e) {  
    	let checker = 0;

          if (e.type === 'blur' || e.keyCode === 13)  //focus를 벗어나거나, 사용자가 엔터를 쳤을때의 이벤트
          { 

			let strArray = this.value.split('%');

		
			let remainder = 100-strArray[0];

			let checkedGender = [];
			
			checkedGender.push( $(".genderRatio"));

			            for (let i = 0; i < checkedGender[0].length;i++)
			        {
			        	  console.log($(this).attr('name'));

			            if (checkedGender[0][i].name == $(this).attr('name'))
			               { 
			          
			            continue;
			        }
			           else { // 아무것도 안 체크되어있지않은이상{}   
			            	$(".genderRatio")[i].value = remainder + '%'  ;                 
			        }
			        }
	
			          		 if (strArray[0]<1==true)
	          		{
	          			checker = 1;
	          			this.value = 0 + '%';
	          			
	          			let index = $(this).index();

						$('.genderCheckbox:eq('+index+')').prop("checked", false);
						$('genderRatio:eq('+index+')').attr('disabled','true'); 
				
	          		}
						totalNumOfGenderChecked = $(".genderCheckbox:checked").length;

			if (this.value.indexOf('%')==-1 && (checker == 0))
				this.value += '%';
			
			this.blur();
        }})
//--genderRatio 사용자가 값을 입력하고 엔터를 치거나 다른곳을 클릭했을때 event

// s1_save Event 시작 

// s1_save을 눌렀을 때 Percent 배열에 값을 채워넣는 과정정 
 $(".s1_save").click(function(){
 	// 1. select일 때
	if($('#ageSelect').is(":checked")){
		if(checkTotalRatio()==false){
			alert ("Age Percent의 총합이 100%가 되도록 입력해주세요");
			return false;
		}
		else{
			// s1 open & s2 close
			accordion_s1();
			// --s1 open & s2 close
			calculateFinalRatio();
		}
	 	
	 // --s1_save을 눌렀을 때 Percent 배열에 값을 채워넣는 과정

	//percent에서 population Index 가져와서 maximizeCases 배열 만들기
			let maximizeCases = new Array;
			maximizeCases = Maximizer.getNumOfCases();
			let gender=-1;
			let age=0;
	//--percent에서 population Index 가져와서 standardNum 배열 만들기

		Maximizer.maximizePopulation(maximizeCases, gender, age);
		//maximized 표기
				for (var i = 0; i<2; i++){
		                         for (var j = 0; j<7; j++){
		                              console.log("maximized"+"["+i+"]["+j+"] = "+maximized[i][j]);
		                         }
		                    }
			 	
		//--percent에서 population Index 가져오기

		Maximizer.getMaximizedData(maximized);
		}
	// 2. manual 때
	else{
		accordion_s1();
		getDataManually();
	}
 	})

//[START] S2 NEXT시 창 띄우기
function wrapWindowByMask(){
    //화면의 높이와 너비를 구한다.
    //var maskHeight = $(document).height();  
    //var maskWidth = $(window).width();  

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
    //$('#mask').css({'width':maskWidth,'height':maskHeight});  
    //애니메이션 효과 - 일단 1초동안 까맣게 됐다가 80% 불투명도로 간다.
    //$('#mask').fadeIn(10);      
    //$('#mask').fadeTo("slow",0.8);    
    //윈도우 같은 거 띄운다.
    $('#mask').show();
    // $('.window').show();
    $('.window').css('display','block');
}
// [END] s1_save Event 종료
    //검은 막 띄우기
    $('.s2Button').click(function(e){
  
      	e.preventDefault();
        wrapWindowByMask();
      
    });

    //닫기 버튼을 눌렀을 때
    $('.window .close').click(function (e) {  
        //링크 기본동작은 작동하지 않도록 한다.
        e.preventDefault();  
        $('#mask, .window').hide();  
    });       

    //검은 막을 눌렀을 때
//    $('#mask').click(function () {  
//        $(this).hide();  
//        $('.window').hide();  
//    });      

$(function(){$(".s2Confirm").click(function(){
	 $('#mask, .window').hide();

// [START] tempBd에 넣어두기
	$(".bodyDimensions").each(function(index,element){ 
	if ($(this).is(":checked")) {
		tempBd.push($(this).val());
		// alert(tempBd[index]);
	}

	//Analysis 항목에 table 만들어서 넣어두기	
})
missingValueCheck(tempBd);
createAnalysisTable(tempBd);

	for (var i = 0; i< data2.length; i++){

	for (key in data2[i]){
		var flag = 0;
	for (var k = 0; k<tempBd.length; k++){	
			if(key != tempBd[k]) //, 다르면 일단 끝까지는 가봄
			{
				if(k!=(tempBd.length-1)){
					continue;
				}
				else {flag=2;}
			}
			else{
				flag = 1;
			}

			if (flag == 2){
				delete data2[i][key];
				break;
			}
			else if (flag == 1){

				break; 
			}
		};
	} 

}
correlationMatrix(data2,tempBd);
})});



// [start] analysis 버튼 눌렀을때
$(function(){ $(".s2Confirm").click(function(){ 
let index ;
let fractionalPart;
let integerPart;
let p_value = new Array;
let p_valueTopush;
let tempArray_statistics = new Array;
let sdArray = new Array;
let sd = 0;
let insertCount = 0;
let total = 0;
let correlation_element;

//tempArray에 집어넣기

for (let i  = 0; i<Object.keys(data2[0]).length; i ++){
	sd = 0;
	total = 0
	let count = 0;
	data2.forEach(function(element,index){
		tempArray_statistics.push(data2[count][Object.keys(data2[0])[i]]); //값
		count++;
	});

		correlation_element = new Array(); //배열을 초기화해서 만듦
		tempArray_correlation.push(correlation_element); //비어있는 배열을 집어넣음

	tempArray_statistics.forEach(function(element,index){
		tempArray_correlation[insertCount].push(element);
	});

// console.log(tempArray_correlation);
tempArray_statistics.forEach(function(element,index){
	total+=element;
});

p_value.push(percentile(tempArray_statistics,1).toFixed(1));
p_value.push(percentile(tempArray_statistics,5).toFixed(1));
p_value.push(percentile(tempArray_statistics,10).toFixed(1));
p_value.push(percentile(tempArray_statistics,25).toFixed(1));
p_value.push(percentile(tempArray_statistics,50).toFixed(1));
p_value.push(percentile(tempArray_statistics,75).toFixed(1));
p_value.push(percentile(tempArray_statistics,90).toFixed(1));
p_value.push(percentile(tempArray_statistics,95).toFixed(1));
p_value.push(percentile(tempArray_statistics,99).toFixed(1));


	mean = total/tempArray_statistics.length;

if(mean%1!=0)
{
	mean = mean.toFixed(1);
}

tempArray_statistics.forEach(function(element,index){
	sdArray.push(Math.pow(element-mean,2));
});


sdArray.forEach(function(element,index){
	sd += element;
});

	sd /= tempArray_statistics.length;

	sd = Math.sqrt(sd);

if(sd%1!=0)
{
	sd = sd.toFixed(1);
}


insertAnalysisTable(sd, p_value, mean, tempArray_statistics, insertCount,missingValue);
	//[End] p value 집어 넣는 과정

	//[Start] 다음 치수를 위해서 초기화
	p_value = new Array();
	sdArray = new Array();
	tempArray_statistics = new Array();
	insertCount++;
	//[End] 다음 치수를 위해서 초기화
}
// [end] analysis 버튼 눌렀을 때

tempArray_correlation.forEach(function(element,index){

	if (index==tempArray_correlation.length-1)
		{

		}
	else{
		for (var i = index+1; i < tempArray_correlation.length; i++){
		pearsonsCorrelation(element,tempArray_correlation[i]);
		// console.log("i: "+i);
		// console.log("첫번째 인수: "+element+"|| 두번쨰 인수: "+tempArray_correlation[i]);
		}
	}
	
})
	})});
	








	
// s3Option_1 클릭 시 이벤트
	$(function(){
	$('.btn_s3Option_1').click(function() {
		if($(this).val() == "Analysis-Based"){
			$('.s3_analysis_option').removeClass('hidden');
		}
		else{
			$('.s3_analysis_option').addClass('hidden');
		}
	});
	});
// --s3Option_1 클릭 시 이벤트

$('#regbox').change(function(){//하는중
	let loopNumber = data2.length;
	linearRegression(y,data2[0][tempBd[0]],secondVar);
});

