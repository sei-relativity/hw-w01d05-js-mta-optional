const verifyIt = function (x, y, stops) {
    //x is to specify if  we're looking for a line or what line we are working with
    //y to pass the name of the line or station

    //Checking if the selected lines are valid selections
    if (x === 'lookForALine') {
        if (!(y && stops.indexOf(y.toString().toLowerCase()) >= 0))
            return false;
        return true;
    }

    let lLine = x.toString().toLowerCase();//lowercase line name



    //Verifying that the selected stations are valid selections
    if (!(y && stops[lLine].indexOf(y.toString().toLowerCase()) >= 0))
        return false;
    return true;
}

const printIt = function (lSLine, sS, lELine, eS, stops) {

    if (lSLine == lELine || stops[lSLine][sS] == 'union square' || stops[lELine][eS] == 'union square') {
        if (sS > eS) {
            var route = stops[lSLine].slice(eS, sS + 1)
            route.reverse();
        }
        else {
            var route = stops[lSLine].slice(sS, eS + 1);
        }
    }
    else {
        const sUnionSquare = stops[lSLine].indexOf('union square');//union square index on the start line
        const eUnionSquare = stops[lELine].indexOf('union square');//union square index on the end line

        if (sUnionSquare > sS) {
            var route = stops[lSLine].slice(sS, sUnionSquare + 1);
        }
        else {
            var route = stops[lSLine].slice(sUnionSquare, sS + 1);
            route.reverse();
        }
        if (eUnionSquare < eS) {
            var route2 = stops[lELine].slice(eUnionSquare + 1, eS + 1)
        }
        else {
            var route2 = stops[lELine].slice(eS, eUnionSquare);
            route2.reverse()
        }
    }
    console.log('You must travel through the following stops on the ' + lSLine.toUpperCase() + ' line: ' + route.join(', ') + '.');

    if (route2) {
        console.log('Change to the ' + lELine.toUpperCase() + ' line at Union Square.')
        console.log('Your journey continues through the following stops: ' + route2.join(', ') + '.')
    }
}

const stopsBetweenStations = function (lSLine, lSStation, lELine, lEStation, stops) {

    //to avoid repetition & have a correct union square's postion
    if (stops[lSLine][stops[lSLine].indexOf(lSStation)] == 'union square') {
        lSLine = lELine
    }
    if (stops[lELine][stops[lELine].indexOf(lEStation)] == 'union square') {
        lELine = lSLine
    }

    //Finding the postions of the stations
    const sS = stops[lSLine].indexOf(lSStation);
    const eS = stops[lELine].indexOf(lEStation);

    //Printing the stops
    printIt(lSLine, sS, lELine, eS, stops);
    //calculating the number of stops
    if (lSLine == lELine) {
        if (Math.abs(eS - sS) == 1) {
            return console.log("1 stop only")
        }
        return console.log((Math.abs(eS - sS)) + " stops in total.");
    }
    return console.log((Math.abs(sS - stops[lSLine].indexOf('union square')) + Math.abs(eS - stops[lELine].indexOf('union square'))) + " stops in total.");
}
const tripPlanner = function () {
    //Creating an object of the lines and stations
    const lines = ['n', 'l', '6'];
    const stops = {
        n: ['times square', '34th', '28th', '23rd', 'union square', '8th'],
        l: ['8th', '6th', 'union square', '3rd', '1st'],
        6: ['grand central', '33rd', '28th', '23rd', 'union square', 'astor place']
    }

    //asking for the start line and verifying it
    const sLine = window.prompt('What line would the trip start from?\n You can select between the N, L, and 6 lines\n Or x to exit');
    if (sLine == 'x') {
        return alert('Thanks for passsing by my code\n See you again soon')
    }
    let result = verifyIt('lookForALine', sLine, lines)
    if (!result) {
        alert("You wrote " + sLine + "\nThis is not one of available lines: N, L, and 6\n Now let's please start all over again");
        return tripPlanner()
    }
    const lSLine = sLine.toLowerCase(); // start line toLowerCase

    //asking for the start station and verifying it
    const sStation = window.prompt('Now please select one of the available stations for your selected line\n' + stops[lSLine].join(', ') + '.\nOr enter x to exit')
    if (sStation == 'x') {
        return alert('Thanks for passsing by my code\n See you again soon')
    }
    result = verifyIt(lSLine, sStation, stops);
    if (!result) {
        alert("You wrote " + sStation + "\nThis is not one of the available stations for your selected line\n" + stops[lSLine].join(', ') + ".\nNow let's please start all over again");
        return tripPlanner()
    }
    const lSStation = sStation.toLowerCase() // start station lower case

    //asking for the end line and verifying it
    const eLine = window.prompt("Great we have your starting destanion set\n Now please select the end line of your wanted station\n Available lines are: N, L, 6.\n or enter x to exit")
    if (eLine == 'x') {
        return alert('Thanks for passsing by my code\n See you again soon')
    }
    result = verifyIt('lookForALine', eLine, lines);
    if (!result) {
        alert("You wrote " + eLine + "\nThis is not one of available lines: N, L, and 6\n Now let's please start all over again");
        return tripPlanner()
    }
    const lELine = eLine.toLowerCase()//end line lowercase

    //asking for the end station and verifying it
    const eStation = window.prompt('Now please select one of the available stations for your selected line\n' + stops[lELine].join(', ') + '.\nOr enter x to exit')
    if (eStation == 'x') {
        return alert('Thanks for passsing by my code\n See you again soon')
    }
    result = verifyIt(lELine, eStation, stops);

    if (!result) {
        alert("You wrote " + eStation + "\nThis is not one of the available stations for your selected line\n" + stops[lELine].join(', ') + ".\nNow let's please start all over again");
        return tripPlanner()
    }
    const lEStation = eStation.toLowerCase()//end station lowercase

    stopsBetweenStations(lSLine, lSStation, lELine, lEStation, stops)

}