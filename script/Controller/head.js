!function(){
	function exit(){
		$('#_exit').click(function(){
			hmd.component({
	            temp : '_login_temp',
	            id : 'root'
	        })
		})
		
	}
	var init = (function(){
		return function(){
			exit();
		}
	}());

	init();
}()