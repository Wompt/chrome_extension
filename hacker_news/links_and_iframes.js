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

function AddWomptFrameAboveNewComments(){
	var outer_table = document.getElementsByTagName('table')[0],
	row =     outer_table && outer_table.getElementsByTagName('tr')[0],
	nextrow = row         && getNext(row,'TR');
	if(nextrow){
		var td = document.createElement('td');
		td.setAttribute('style', 'padding:15px 0;');
		td.appendChild(createWomptFrame('hackernews'));
		nextrow.appendChild(td);
	}
}

function createWomptFrame(room_name){
	return wompt.embed.iframe(room_name || ('hackernews/' + getArticleIdFromUrl(window.location.toString())));
}

if(wompt.util.once('hacker_news')){
	if(window.location.href.indexOf('newcomments')>=0)
		AddWomptFrameAboveNewComments();
	else
		AddWomptFrameAboveComments();
	AddLinksToChatRooms();
}
