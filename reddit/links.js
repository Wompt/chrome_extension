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
	if(href)
		return getRoomNameFromCommentsUrl(href);
}

function getRoomNameFromCommentsUrl(url){
	var matches = url.match(/reddit\.com\/r\/(.*)$/),
	url_part = matches && matches[1];
	if(!url_part) return;
	return url_part.replace(/comments\//,'').replace(/\/$/,'');
}

function addIFrame(){
	var href = window.location.href;
	
	if(href.indexOf('/comments/') >=0){
		var comment_area = document.getElementsByClassName('commentarea')[0],
		comments_section = comment_area && comment_area.getElementsByClassName('sitetable nestedlisting')[0];
		if(comments_section){
			var iframe = wompt.create.iframe('reddit/' + getRoomNameFromCommentsUrl(href));
			wompt.util.applyAttributes(iframe, {
				width: '550px',
				style: 'display:block; border:none; margin:0;'
			});
			comments_section.insertBefore(iframe, comments_section.childNodes[0])
		}
	}
}

if(wompt.util.once('reddit-links')){
	addLinks();
	addIFrame();
}