function addIFrame(){
	var repo_head = document.getElementsByClassName('repohead')[0];
	if(repo_head && repo_head.className.indexOf('shortdetails') < 0){
		var container = wompt.util.createElement('div', {style:'margin:.1em 0 .6em 0;'});
		var iframe = wompt.create.iframe('github' + window.location.pathname);
		wompt.util.applyAttributes(iframe, {
			width: '100%',
			height: expandedState() ? '300px' : '0',
			style: 'display:block; border:none; -webkit-transition:height .7s ease-in-out;'
		});
		container.appendChild(createToggleLink(iframe, expandedState()));
		container.appendChild(iframe);
		repo_head.parentNode.insertBefore(container, repo_head.nextSibling)
	}
}

function expandedState(state){
	if(state == null) return localStorage['github_expanded'] == 'true'
	return localStorage['github_expanded'] = state;
}

function createToggleLink(iframe_to_toggle, expanded){
	var a = wompt.util.createElement('a', {
		'href':'#',
		'class': 'breadcrumb',
		'style': 'font-weight: bold;'
	}, toggleText());
	
	function toggleText(){
		return expanded ? "close chat -" : "expand chat +";
	}
	
	a.addEventListener('click', function(e){
		expanded = !expanded;
		iframe_to_toggle.setAttribute('height', expanded ? '300px' : '0');
		this.innerText = toggleText();
		e.preventDefault();
		expandedState(expanded);
	});
	return a;
}

if(wompt.util.once('github-links')){
	addIFrame();
}