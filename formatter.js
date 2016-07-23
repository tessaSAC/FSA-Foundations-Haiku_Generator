exports.capitalize = function(str) {
    return str.toLowerCase()
		.split("\n")
		.map(function(elem){return elem.slice(0, 1).toUpperCase() + elem.slice(1);})
		.join("\n");
};