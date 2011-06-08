function addIFrame(){
	var repo_head = document.getElementsByClassName('repohead')[0];
	// make sure we only add the iframe on the main project page
	// on all other pages, the repo_head div has a 'shortdetails' class
	if(repo_head && repo_head.className.indexOf('shortdetails') < 0){
		
		var container = wompt.util.createElement('div', {style:'margin:.1em 0 .6em 0;'});
		var iframe = wompt.create.iframe('github' + window.location.pathname);
		
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

function collapsedState(state){
	if(state == null) return localStorage['github_collapsed'] == 'true'
	return localStorage['github_collapsed'] = state;
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