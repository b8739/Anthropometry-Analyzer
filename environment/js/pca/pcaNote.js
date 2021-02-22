// 1. pca score 계산
data = PCA.dataParsingBeforePCA(data2,tempBd)
var vectors = PCA.getEigenVectors(data);
var adData = PCA.computeAdjustedData(data,vectors[0],vectors[1]);
//진행중
jsonData = new Array;

adData.formattedAdjustedData[0].forEach(function(item,index){
        tempArray = new Object;
        tempArray.pca1=item;
        tempArray.pca2=adData.formattedAdjustedData[1][index];
        jsonData.push(tempArray);
})