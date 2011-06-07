function eachEntry(callback){
	var each = Array.prototype.forEach,
	list_css_classes = ['sitetable', 'organic-listing'];
	
	list_css_classes.forEach(function(css_class){
		eachEntryInLists(document.getElementsByClassName(css_class))
	});
	
	function eachEntryInLists(lists){
		each.call(lists, eachEntryInList)
	}
	
	function eachEntryInList(list){
		var entries = list.getElementsByClassName('entry');
		each.call(entries, callback)
	}
}

function addLinks(){
	eachEntry(addLinkToEntry);
}

function addLinkToEntry(entry){
	var buttons = entry.getElementsByClassName('buttons');
	if(buttons.length > 0){
		// button bar
		var bar = buttons[0],
		// comments link
		comments = bar.getElementsByClassName('comments')[0],
		// new li and link to wompt
		li = document.createElement('li');
		
		if(comments){
			li.appendChild(
				wompt.create.link(
					'reddit/' + getRoomNameFromCommentsLink(comments),
					'chat',
					'comments'));
			// insert chat link right after "comments" link
			var comments_li = comments.parentNode;			
			bar.insertBefore(li, comments_li.nextSibling);
		}
	}
}

function getRoomNameFromCommentsLink(link){
	var href = link && link.getAttribute('href')
	if(href){
		var matches = href.match(/reddit\.com\/r\/(.*)$/),
		url_part = matches && matches[1];
		return url_part && url_part.replace(/comments\//,'');
	}
}

if(wompt.util.once('reddit-links')){
	addLinks();
}