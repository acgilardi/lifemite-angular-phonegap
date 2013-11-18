var appmite;

if (!appmite) {
    appmite = {};
} else if (typeof appmite != 'object') {
    throw new Error("appmite already exists and is not an object");
}


// if (!org.example) {
    // org.example = {};
// } else if (typeof org.example != 'object') {
    // throw new Error("org.example already exists and is not an object");
// }


String.format = String.prototype.format = function() 
{

	var i=0;
	var string = (typeof(this) == "function" && !(i++)) ? arguments[0] : this;
	
	for (; i < arguments.length; i++)
	string = string.replace(/\{\d+?\}/, arguments[i]);
	
	return string;
}

