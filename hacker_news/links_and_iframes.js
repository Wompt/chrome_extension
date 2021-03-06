function addWomptLink(td){
	var l = document.createElement('a');

	l.appendChild(document.createTextNode('(chat)'));
	l.setAttribute('href',wompt.settings.urlPrefix + 'hackernews/' + getArticleId(td));
	td.appendChild(document.createTextNode(' | '));
	td.appendChild(l);
}

function getArticleId(subtext_td){
	var links = subtext_td.getElementsByTagName('a'),
	comments = links && links[links.length-1],
	url = comments && comments.getAttribute('href');
	
	if(url){
		return getArticleIdFromUrl(url);
	}
}

function getArticleIdFromUrl(url){
	var id = url && url.match(/id=(\d+)$/);
	return id && id[1];	
}

function getNext(el, tag, index){
	var next = el;
	while(next){
		next = next.nextSibling;
		if(next && next.tagName == tag){
			if(!index) return next;
			index--;
		}
	}
}

function AddLinksToChatRooms(){
	var subtexts = document.getElementsByClassName('subtext');
	for(var i=0,len=subtexts.length;i<len;i++){
		var el = subtexts[i];
		if(true){
			addWomptLink(el);
		}
	}
}

function AddWomptFrameAboveComments(){
	var outer_table = document.getElementsByTagName('table')[0],
	row =     outer_table && outer_table.getElementsByTagName('tr')[0],
	nextrow = row         && getNext(row,'TR', 1),
	table =   nextrow     && nextrow.getElementsByTagName('table')[0],
	br =      table       && getNext(table,'BR');
	if(br){
		br.parentNode.insertBefore(createWomptFrame(),br);
	}
}

function AddWomptFrameBelowHeader(){
	var outer_table = document.getElementsByTagName('table')[0],
	row =     outer_table && outer_table.getElementsByTagName('tr')[0],
	nextrow = row         && getNext(row,'TR', 1);
	if(nextrow){
		iframe = createWomptFrame('hackernews');
		if(!iframe) return;
		
		var newrow = wompt.util.createElement('tr'),
		td = wompt.util.createElement('td'),
		toggle = wompt.create.toggleLink(iframe, 'hackernews_main');

		toggle.style.margin = ".5em";
		toggle.style.lineHeight = "2em";
		iframe.style.marginBottom = "1em";
		
		newrow.appendChild(td);
		td.appendChild(toggle);
		td.appendChild(iframe);
		nextrow.parentNode.insertBefore(newrow, nextrow);
	}
}

var iframe;
function createWomptFrame(room_name){
	if(iframe) return null;
	return iframe = wompt.create.iframe(room_name || ('hackernews/' + getArticleIdFromUrl(window.location.toString())));
}

if(wompt.util.once('hacker_news')){
	AddWomptFrameAboveComments();
	AddWomptFrameBelowHeader();
	AddLinksToChatRooms();
}
