wompt.util = {
	createElement: function(tag, attributes, innerText){
		var el = document.createElement(tag);
		
		wompt.util.applyAttributes(el, attributes);
		
		if(innerText)
			el.appendChild(document.createTextNode(innerText));

		return el;
	},
	
	applyAttributes: function(el, attr){
		for(var key in attr){
			el.setAttribute(key, attr[key])
		}
	},
	
	once: function(key){
		window._wompt_once = window._wompt_once || {}
		var seen_yet = window._wompt_once[key];
		window._wompt_once[key] = true;
		return !seen_yet;
	},
	
	hasClass: function(el, _class){
		return el.className.indexOf(_class) >= 0
	}
}