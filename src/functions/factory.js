export const numberToPrice = (num) =>{
    let returnValue = "";
    num = String(num)
    const dotIndx = num.indexOf(".")
    if(dotIndx>0){
        const splitted = num.split("")
        returnValue = splitted.splice(dotIndx).join("")
        num = splitted.splice(0,dotIndx+1).join("")
    }
    for(let i = num.length-1;i > -1;i--){
        returnValue = num[i] + returnValue
        if((i+1)%3 === 0 && i !== num.length-1){
        returnValue = "," + returnValue
        }
    }
    return returnValue;
    }