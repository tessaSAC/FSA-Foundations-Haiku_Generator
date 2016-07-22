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
	var haiku = "";
	// ADD THE CORRECT NUMBER OF SYLLABLES TO EACH LINE
	for (var i = 0; i < structure.length; ++i) {
		var thisLine = structure[i];

		while (thisLine > 0) {
			var whichArr = 0;
			whichArr = Math.ceil(Math.random() * Math.min((syllabArr.length - 1), thisLine));
			haiku += syllabArr[whichArr][Math.floor(Math.random() * syllabArr[whichArr].length)]; // INSTEAD OF X[A[B]] IT SHOULD BE X[A][B]
			thisLine -= whichArr;

			if (thisLine > 0)
				haiku += " "; // ADD SPACE IF NOT END OF LINE
			else if (i === structure.length - 1)
				haiku += ""; // ADD NOTHING IF END OF HAIKU
			else
				haiku += "\n"; // ADD NEW LINE IF END OF LINE
    	}
    }
	console.log(haiku);
};


// module.exports = {
//   createHaiku: createHaiku
// };