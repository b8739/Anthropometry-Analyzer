function getPredictedValue (intercept,firstSlope,secondSlope,firstVar,secondVar){ //yhat = b0+b1*x+b2*x
    let predictedValue = 0;
    
    predictedValue = intercept+firstSlope*firstVar+secondSlope*secondVar;
    return predictedValue;
}
function getEss(y,predictedValue){
    let sq_error = 0;
    for (let i = 0; i <y.length; i++) {
        sq_error += Math.pow(y[i]-predictedValue[i],2);
    }
    return sq_error;
}
function getTss(y, mean_y){
    let avg_error = 0;
    for (let i = 0; i <y.length; i++) {
        avg_error += Math.pow(y[i]-mean_y,2);
    }
    return avg_error;
}

function linearRegression(y,firstVar,secondVar){ 
    let lr = {},
     predictedValue = [],
     n = y.length,
     //mean
     mean_y = 0,
     mean_firstVar = 0,
     mean_secondVar = 0,
     //ε(variable)
     _firstVar = 0,
     _secondVar = 0,
     _y = 0,
     // ε(variable^2)
     sq_firstVar = 0,
     sq_secondVar = 0,
     // ε(variable*variable)
     mul_firstVar_y = 0, 
     mul_secondVar_y = 0,
     mul_firstVar_secondVar = 0,
     // ε(variable-variable) for rSquared
     ess = 0,
     rss = 0,
     tss = 0;
     
    for (let i = 0; i <n; i++) {
        //ε(variable)
        _firstVar += firstVar[i];
        _secondVar += secondVar[i];
        _y += y[i];
        // ε(variable^2)
        sq_firstVar += (firstVar[i]*firstVar[i]);
        sq_secondVar += (secondVar[i]*secondVar[i]);
        // ε(variable*variable)
        mul_firstVar_y += firstVar[i] * y[i];
        mul_secondVar_y += secondVar[i] * y[i];
        mul_firstVar_secondVar += firstVar[i]*secondVar[i];
    }

    //mean
    mean_y = _y/n;
    mean_firstVar = _firstVar/firstVar.length;  
    mean_secondVar = _secondVar/secondVar.length;
    //ε(variable^2)
    sq_firstVar = sq_firstVar - (_firstVar*_firstVar)/n;
    sq_secondVar = sq_secondVar - (_secondVar*_secondVar)/n;
    // ε(variable*variable)
    mul_firstVar_y = mul_firstVar_y - (_firstVar*_y)/n 
    mul_secondVar_y = mul_secondVar_y - (_secondVar*_y)/n; 
    mul_firstVar_secondVar = mul_firstVar_secondVar - (_firstVar*_secondVar)/n;

    //slope (기울기), intercept (절편) 계산 
    lr['slope_firstVar'] = (sq_secondVar*mul_firstVar_y-mul_firstVar_secondVar*mul_secondVar_y)
                            /(sq_firstVar*sq_secondVar-mul_firstVar_secondVar*mul_firstVar_secondVar);///b1
    lr['slope_secondVar'] = (sq_firstVar*mul_secondVar_y-mul_firstVar_secondVar*mul_firstVar_y)
                            /(sq_firstVar*sq_secondVar-mul_firstVar_secondVar*mul_firstVar_secondVar);//b2
    lr['intercept'] = mean_y-lr.slope_firstVar*mean_firstVar-lr.slope_secondVar*mean_secondVar//b0
    
    //예측값 계산  
    for (let i = 0; i <n; i++) {
    predictedValue.push(getPredictedValue(lr.intercept,lr.slope_firstVar,lr.slope_secondVar,firstVar[i],secondVar[i]));
    }

    //ess, tss, rss (오차값 합 계산)
    ess = getEss(y, predictedValue);
    tss = getTss(y, mean_y);
    rss = tss-ess;
 
    //rsquared (결정계수), adjusted rsquared (조정된 결정계수) 계산
    lr['rsquared'] = (rss/tss);
    lr['adjusted_rsquared'] =  1-(1-lr['rsquared'])*((n-1)/(n-2-1));
    return lr;
}


// 가상 종속변수 (y)와 독립변수 (firstVar, secondVar) 
let y = [1740,1722,1788,1770,1697,1781]; 
let firstVar = [1616,1596,1665 ,1640,1582,1663];
let secondVar = [1429,1368,1428,1414,1340,1412]; 



//R.squared = 1 - sum((y-predictedValue)^2)/sum((y-mean(y))^2)
