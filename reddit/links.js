function eachEntry(callback){
	entries = document.getElementsByClassName('entry');
	Array.prototype.forEach.call(entries, callback)
}

function addLinks(){
	eachEntry(addLinkToEntry);
}

function addLinkToEntry(entry){
	var buttons = entry.getElementsByClassName('buttons');
	if(buttons.length > 0){
		// button bar
		var bar = buttons[0],
		// children
		items = bar.getElementsByTagName('li'),
		// new li and link to wompt
		li = document.createElement('li');
		
		li.appendChild(
			wompt.create.link(
				'reddit/' + getRoomNameFromCommentsLink(items[0]),
				'chat',
				'comments'));
		// insert chat link right after "comments" link
		bar.insertBefore(li, items[1]);
	}
}

function getRoomNameFromCommentsLink(comments){
	var a = comments.getElementsByTagName('a')[0],
	href = a && a.getAttribute('href')
	if(href){
		var matches = href.match(/reddit\.com\/r\/(.*)$/);
		return matches && matches[1];
	}
}

if(wompt.util.once('reddit-links')){
	addLinks();
}
