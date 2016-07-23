exports.formatData = function(data, syllabArr) {
	var lines = data.toString().split("\n"),
		lineSplit;
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

  return syllabArr;
};