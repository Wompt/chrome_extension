wompt.embed = {
	iframe: function(room_name, text_color){
		text_color = text_color || '444';
		
		return wompt.util.createElement('iframe',{
			src: wompt.settings.urlPrefix +	room_name +	"?iframe=1#c=" + text_color
			,height: '400px'
			,width: '95%'
			,style: 'border:none; display:block; margin:0 auto;'
		})
	}
}
