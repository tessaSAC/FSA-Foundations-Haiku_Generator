var fs = require("fs"),
	cmudictFile = readCmudictFile('./cmudict.txt'),
	arr1 = [], arr2 = [], arr3 = [];


function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data) {
	lines = data.toString().split("\n");
	var lineSplit;
	lines.forEach(function(line){
   		lineSplit = line.split("  ");


   		// RECORD SYLLABLE LENGTH:
   		if ((/\d/).test(lineSplit[1])) {
   			lineSplit[1] = lineSplit[1].match(/\d/g).length;
   		}
    	// console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]);


 		// SPLIT INTO SORTED ARRAYS
 		var thisWord = lineSplit[0].replace(/[^A-Z]/g, "");
 		switch (lineSplit[1]) {
 			case 1:
 				if (arr1.indexOf(thisWord) === -1)
 					{arr1.push(thisWord);}
 				break;
 			case 2:
	 			if (arr2.indexOf(thisWord) === -1)
	 				{arr2.push(thisWord);}
 				break;
 			case 3:
	 			if (arr3.indexOf(thisWord) === -1)
	 				{arr3.push(thisWord);}
 				break;
		}
	});
}

formatData(cmudictFile);



function createHaiku(structure){
	var haiku = "",
		thisLine = "",
		thisArr;
    for (var i = 0; i < structure.length; i++) {
    	var lineCount = structure[i],
    		whichArr = [];
    	while (lineCount > 0) {
    		// SELECT ARRAY
    		switch (lineCount) {
    			case 3:
    				whichArr.push(arr3); // fall through
    			case 2:
    				whichArr.push(arr2); // fall through
    			case 1:
    				whichArr.push(arr1);
    				thisArr = whichArr[Math.floor(Math.random()*whichArr.length)];
			}
			// ADJUST LINE COUNT
			switch (thisArr) {
				case arr1:
					--lineCount;
				case arr2:
					--lineCount;
				case arr3:
					--lineCount
			}
			// add a random word to the line
    	}
    }
}

module.exports = {
  createHaiku: createHaiku,
};