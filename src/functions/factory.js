export const numberToPrice = (num) =>{
    num = String(num)

    let returnVal = ""
    let counter = 0
    let decimal;
    const splitted = num.split(".")
    if(splitted[1]){
        decimal = splitted[1]
    }
    num = splitted[0]
    for(let i = num.length-1;i >= 0;i-- ){

        if(counter === 3 && counter !== 0){
            returnVal = "," + returnVal
            counter = 0
        }
        returnVal = num[i] + returnVal
        counter++
    }
    if(decimal){
        returnVal = returnVal + "." + decimal
    }
    return returnVal
}