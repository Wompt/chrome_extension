wompt.util = {
	createElement: function(tag, attributes){
		var el = document.createElement(tag);
		for(var key in attributes){
			el.setAttribute(key, attributes[key])
		}
		return el;
	},
	
	once: function(key){
		window._wompt_once = window._wompt_once || {}
		var seen_yet = window._wompt_once[key];
		window._wompt_once[key] = true;
		return !seen_yet;
	}
}