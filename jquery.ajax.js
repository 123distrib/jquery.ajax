(function($){
	$.fn.pages = function(options) {
		
		// default values
		var defaults = { 
			suppData : {},
			noLazy : false,
			callb : function() {},
			callback : function() {},
			dataform : 'form', //'form'
			dataType : 'html',
			loader: ''
		}; 
		
		// apply defaults values
		var options = $.extend({}, defaults, options); 		
		var selector = this;

		$.ajax({
			dataType:options.dataType,
			type: "POST",
			//async: false,
			url: options.urlTarget,
			data: $(options.dataform).serialize()+"&"+$.param(options.suppData),
			success: function(html){
				$(selector).html(html);
	
				if(html == '') {
					options.callback();
				}
				
				options.callb();
			},
			complete: function(){
				console.log("Complete: "+options.urlTarget);
			},
			beforeSend: function() {
				if(options.loader == 2) {
					$(selector).html('<img src="/loader.gif" />');		
				} else {
					$(selector).html('Loading ...');	
				}
			},
			//timeout:0,
			dataType:'html',
			error:function(html) {
				$(selector).html(html.responseText);
			}
		});		
	};	
})(jQuery);