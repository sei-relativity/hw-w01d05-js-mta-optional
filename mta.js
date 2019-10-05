const subwayLines = {
    N: ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"],
    L: ["8th", "6th", "Union Square", "3rd", "1st"],
    6: ["Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor Place"]
}
const check = function(line, station){
    for(const key in subwayLines){
        if(key == line){
            for(i =0; i<subwayLines[key].length; i++){
                if(station == subwayLines[key][i]) return true
            }
        }
    }
    return false
}
const planTrip = function (startL, startS, endL, endS){
    let count = 0;
    let position = 0;
    let message = "You must travel the following stops on the "+ startL+ " line: " + startS+ " "
    if(!check(startL, startS)) return "Please enter a valid input"
    if(!check(endL, endS)) return "Please enter a valid input"
    if(startL == endL){
        for( let i=0; i < subwayLines[startL].length; i++) {
            count++ 
            position = (i + (subwayLines[startL].indexOf(startS) + 1)) % subwayLines[startL].length;
            message += ","+subwayLines[startL][position]+" "
            if(position == subwayLines[startL].indexOf(endS)) break;
        }
        
    }
    else {
        for( let i=0; i < subwayLines[startL].length; i++) {
            count++ 
            position = (i + (subwayLines[startL].indexOf(startS) + 1)) % subwayLines[startL].length;
            message += ","+subwayLines[startL][position]+" "
            if(position == subwayLines[startL].indexOf("Union Square")) 
            break;
        }
        message += "\nChange at Union Station\nYour journey continues through the following stops: "
        for( let i=0; i < subwayLines[endL].length; i++) {
            count++ 
            position = (i + (subwayLines[endL].indexOf("Union Square") + 1)) % subwayLines[endL].length;
            message += subwayLines[endL][position]+", "
            if(position == subwayLines[endL].indexOf(endS)) break;
        }
    }
    message = message.slice(0,-2)
    return message+"\n"+count+" stops in total"
}
console.log(planTrip("N", "Times Square", "6", "33rd"))