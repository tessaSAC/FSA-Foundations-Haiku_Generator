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
   		// Record syllable length;
   		lineSplit[1] = lineSplit[1].match(/\d/g).length;
    	console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]);

 		// Split into sorted arrays
 		switch (lineSplit[1]) {
 			case 1:
 				arr1.push(lineSplit[1]);
 				break;
 			case 2:
 				arr2.push(lineSplit[2]);
 				break;
 			case 3:
 				arr3.push(lineSplit[3]);
 				break;
		}
	});
}

formatData(cmudictFile);


console.log(arr1, arr2, arr3);



function createHaiku(structure){
    console.log("this should log a haiku with the structure " + structure);
}

module.exports = {
  createHaiku: createHaiku,
};