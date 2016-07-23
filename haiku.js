var fs = require("fs"),
	parser = require("./parser"),
	formatter = require("./formatter"),
	cmudictFile = readCmudictFile('./cmudict.txt'),
	syllabArr = ["\n"];


// READ DICTIONARY
function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}


// PARSE DICTIONARY
syllabArr = (parser.formatData(cmudictFile, syllabArr));



// PROFIT
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


    // FORMAT HAIKU
    haiku = formatter.capitalize(haiku);


    // OUTPUT IT
	console.log(haiku);
};


// module.exports = {
//   createHaiku: createHaiku
// };