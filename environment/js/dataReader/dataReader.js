// Json Data -> data

// s2 key값 불러오기 (ansur, caesar, sizekorea, etc.)
    //   $(function(){
    //       $.getJSON( "sizedata/keyInfo.json", function( data ) {
    //          for(key in data[0]) {
    //               // 체크박스 태그 만들기
    //               var span = document.createElement('span');
    //              span.innerHTML = key+":"+data[0][key];
    //              span.className='bodyDimensionsTitles'
    //              document.getElementById('sizeList').appendChild(span);
                         
    //               var input = document.createElement('input');
    //               input.className='bodyDimensions';
    //               input.display = "block";
    //               input.type = "checkbox";
    //               input.value = key;
    //               document.getElementById('sizeList').insertBefore(input,span);
    //             }
    //       });
    //   });
// --s2 key값 불러오기 (ansur, caesar, sizekorea, etc.)


      $(function(){
           $.getJSON( "sizedata/peopleData.json", function(data ) {
// s2 key값 불러오기 (peopleData)
             for(key in data[0]) {
               if(key!="성별"&&key!="나이"){
                 // 체크박스 태그 만들기
                 var span = document.createElement('span');
                span.innerHTML = key;
                span.className='bodyDimensionsTitles'
                document.getElementById('sizeList').appendChild(span);
                       
                 var input = document.createElement('input');
                 input.className='bodyDimensions';
                 input.display = "block";
                 input.type = "checkbox";
                 input.value = key;
                  document.getElementById('sizeList').insertBefore(input,span);
               }
           }
// --s2 key값 불러오기 (peopleData)
                    for (var i = 0; i<2; i++){
                         for (var j = 0; j<7; j++){
                              population[i][j] = 0;
                              finalRatio[i][j] = 0;
                              maximized[i][j] = 0;

                    }
     
                         }
                        //  alert("Succeed!");
//[End] Json Data -> data

//[Start] Json 데이터 -> numPercent 배열

                    $(data).each(function(){
                        data1.push(this);
                         if(this.성별 == "남") {
                              if (this.나이 < 10){population[0][0]++}//10세 이하
                              else if (this.나이 < 20){population[0][1]++}//10대
                              else if (this.나이 < 30){population[0][2]++}//20대
                              else if (this.나이 < 40){population[0][3]++}//30대
                              else if (this.나이 < 50){population[0][4]++}//40대
                              else if (this.나이 < 60){population[0][5]++}//50대
                              else if (this.나이 < 70){population[0][6]++}//60대
                              

                         }
                         else{ //여성
                                   if (this.나이 < 10){population[1][0]++}//10세 이하
                              if (this.나이 < 20){population[1][1]++}//10대
                              if (this.나이 < 30){population[1][2]++}//20대
                              if (this.나이 < 40){population[1][3]++}//30대
                              if (this.나이 < 50){population[1][4]++}//40대
                              if (this.나이 < 60){population[1][5]++}//50대
                              if (this.나이 < 70){population[1][6]++}//60대

                         }

                         

                    });
//[End] Json 데이터 -> numPercent 배열 

//[Start] numPeople element 콘솔에 나열
              // for (var i = 0; i<2; i++){
              //             for (var j = 0; j<7; j++){
              //                 console.log("population"+"["+i+"]["+j+"] = "+population[i][j]);

              //                 // console.log(numPeople[i][j]);
              //             }
              //        }
//[End] numPeople element 콘솔에 나열   
console.log("population ready");
                    });
                });




        