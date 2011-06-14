function addIFrame(){
	var repo_head = document.getElementsByClassName('repohead')[0];
	// make sure we only add the iframe on the main project page for public
	// project. On all other pages, the repo_head div has a 'shortdetails' or
	// 'vis-private' CSS class
	if(repo_head
		 && !wompt.util.hasClass(repo_head,'shortdetails')
		 && !wompt.util.hasClass(repo_head,'vis-private')){
		
		var container = wompt.util.createElement('div', {style:'margin:.1em 0 .6em 0;'});
		iframe = wompt.create.iframe('github' + getRoomNameFromUrl(window.location.pathname));
		
		wompt.util.applyAttributes(iframe, {
			width: '100%',
			height: collapsedState() ? '0' : '300px',
			style: 'display:block; border:none; -webkit-transition:height .7s ease-in-out;'
		});
		
		container.appendChild(createToggleLink(iframe, collapsedState()));
		container.appendChild(iframe);
		repo_head.parentNode.insertBefore(container, repo_head.nextSibling)
	}
}

function getRoomNameFromUrl(path){
	return path.split('/').slice(0,3).join('/');
}

function collapsedState(state){
	return wompt.util.boolState('github_collapsed', state)
}

function createToggleLink(iframe_to_toggle, collapsed){
	var a = wompt.util.createElement('a', {
		'href':'#',
		'class': 'breadcrumb',
		'style': 'font-weight: bold;'
	}, toggleText());
	
	function toggleText(){
		return collapsed ? "expand chat +" : "close chat -";
	}
	
	a.addEventListener('click', function(e){
		collapsed = !collapsed;
		iframe_to_toggle.setAttribute('height', collapsed ? '0' : '300px');
		this.innerText = toggleText();
		e.preventDefault();
		collapsedState(collapsed);
	});
	return a;
}

if(wompt.util.once('github-links')){
	addIFrame();
}