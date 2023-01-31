export const numberToPrice = (num) =>{
            let returnValue = "";
            num = String(num)
            for(let i = num.length-1;i > -1;i--){
                if((i+1)%3 === 0 && i !== num.length-1){
                returnValue = "," + returnValue
                }
                returnValue = num[i] + returnValue
            }
            return returnValue;
            }