var sizeData = new Array; // ansur, caesar, sizekorea 데이터 저장하는 json 배열 (계속 재활용해서 사용)

// ethnicity
var caucasian  = new Array;
var african_american  = new Array;
var hispanic  = new Array;
var asian  = new Array;
var white  = new Array;
var korean = new Array;
// --ethnicity

  $(document).ready(function() {
            // ansur 파일 읽어서 배열에 저장
           $.getJSON( "sizedata/ansur.json", function(sizeData) {
                        
                    $(sizeData).each(function(){
                              if (this.Ethnicity == "Caucasian"){caucasian.push(this);}//10세 이하
                              else if (this.Ethnicity == "American African"){african_american.push(this);}
                              else if (this.Ethnicity == "Hispanic"){hispanic.push(this);}
                              else if (this.Ethnicity == "Native American/Alaskan"){native_american_alaskan.push(this);}
                              else if (this.Ethnicity == "Asian"||this.Ethnicity == "Pacific Islander"){asian.push(this);}     
                    });
                    });
            // --ansur 파일 읽어서 배열에 저장

            // caesar 파일 읽어서 배열에 저장
            $.getJSON( "sizedata/caesar.json", function(sizeData) {

                    $(sizeData).each(function(){
                              if (this.Ethnicity == "Netherlands/Dutch"||this.Ethnicity == "Netherlands/Other"||this.Ethnicity == "Italy/Italian"){caucasian.push(this);}//10세 이하
                              else if (this.Ethnicity == "Spanish/Hispanic Mexican American"){hispanic.push(this);}
                              else if (this.Ethnicity == "White"){white.push(this);} 
                    });
                    });
          
            // --caesar 파일 읽어서 배열에 저장

            // sizeKorea 파일 읽어서 배열에 저장
             $.getJSON("sizedata/sizekorea.json", function(sizeData) {
                    $(sizeData).each(function(){
                             korean.push(this);
                    });
                    });
            
             // --sizeKorea 파일 읽어서 배열에 저장
                });