wompt.create = {
	iframe: function(room_name, text_color){
		text_color = text_color || '444';
		
		return wompt.util.createElement('iframe',{
			src: wompt.settings.urlPrefix +	room_name +	"?iframe=1#c=" + text_color
			,height: '400px'
			,width: '95%'
			,style: 'border:none; display:block; margin:0 auto;'
		})
	},
	
	link: function(room_name, text, classes){
		return wompt.util.createElement('a',{
			href: wompt.settings.urlPrefix +	room_name,
			'class': classes
		}, text || room_name)
	},
	
	toggleLink: function(container_to_toggle, stateName){
		var collapsed = wompt.util.boolState(stateName);
		var a = wompt.util.createElement('a', {
			'href':'#',
			'class': 'breadcrumb',
			'style': 'font-weight: bold;'
		}, toggleText());
		
		function toggleText(){
			return collapsed ? "expand chat +" : "close chat -";
		}
		
		function setContainerHeight(){
			container_to_toggle.setAttribute('height', collapsed ? '0' : '300px');
		}
		
		setContainerHeight();
		container_to_toggle.style['-webkit-transition'] = "height .7s ease-in-out";
		
		a.addEventListener('click', function(e){
			collapsed = !collapsed;
			setContainerHeight();
			this.innerText = toggleText();
			e.preventDefault();
			wompt.util.boolState(stateName, collapsed);
		});
		return a;
	}
}
