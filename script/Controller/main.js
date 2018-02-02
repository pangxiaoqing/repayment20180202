!function(){
	var init = (function(){
		var methods = hmd.methods,
	 		service = hmd.service,
	 		router = hmd.router,
	 		_obj = {
	 			contract : router.contract,
	 			recharge : router.recharge
	 		}
		return function(){
			methods.getUrl({
				id : 'main-body',
				key : 'contract',
				source : _obj
			})
		}
	}())
	init();
}()