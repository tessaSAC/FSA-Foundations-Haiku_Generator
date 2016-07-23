var fs = require("fs"),
	cmudictFile = readCmudictFile('./cmudict.txt'),
	syllabArr = ["\n"];


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
 		if (!syllabArr[lineSplit[1]])
 			syllabArr[lineSplit[1]] = [];
 		syllabArr[lineSplit[1]].push(thisWord);
	});
}

formatData(cmudictFile);



exports.createHaiku = function(structure){

	var haiku = "",
		whichArr;
	// ADD THE CORRECT NUMBER OF SYLLABLES TO EACH LINE
	for (var i = 0; i < structure.length; ++i) {
		if (structure[0].length === 1) {              		    // FOR HAIKUS WITH NO SPECIFIED WORD COUNT
			var thisLine = structure[i][0];
			while (thisLine > 0) {
				whichArr = Math.ceil(Math.random() * Math.min((syllabArr.length - 1), thisLine));
				haiku += syllabArr[whichArr][Math.floor(Math.random() * syllabArr[whichArr].length)]; // INSTEAD OF X[A[B]] IT SHOULD BE X[A][B]
				thisLine -= whichArr;

				spacing(thisLine, 0);
	    	}

	    } else {           		                                // FOR HAIKUS WITH A SPECIFIED WORD COUNT
	    	for (var k = structure[i].length; k > 0; --k) {
	    		whichArr = structure[i][structure[i].length - k];
	    		haiku += syllabArr[whichArr][Math.floor(Math.random() * syllabArr[whichArr].length)];

	    		spacing(k, 1);
	    	}
	    }
    }

    function spacing(marker, midsentence) {
    	if (marker > midsentence)
			return haiku += " "; // ADD SPACE IF NOT END OF LINE
		else if (i === structure.length - 1)
			return haiku += ""; // ADD NOTHING IF END OF HAIKU
		else
			return haiku += "\n"; // ADD NEW LINE IF END OF LINE
    }

	console.log(haiku);
};


// module.exports = {
//   createHaiku: createHaiku
// };