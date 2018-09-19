!function(){
	var init = (function(){
		var methods = hmd.methods,
	 		service = hmd.service,
	 		router = hmd.router,
            key = $.cookie('login_flag') == 0 ? 'daichang_contract' : 'contract',
	 		_obj = {
	 			contract : router.contract,
                recharge : router.recharge,
                daichang_contract : router.daichang_contract,
                daichang_recharge : router.daichang_recharge
	 		},
			p_obj = {
				"cont":"contract",
				"rec":"recharge",
                "daichang_cont":"daichang_contract",
                "daichang_rec":"daichang_recharge"
			};
		if(location.hash==="#contract"){
			key = p_obj.cont
		}
        if(location.hash==="#recharge"){
            key = p_obj.rec
        }
        if(location.hash==="#daichang_contract"){
            key = p_obj.daichang_cont
        }
        if(location.hash==="#daichang_recharge"){
            key = p_obj.daichang_rec
        }
		return function(){
			methods.getUrl({
				id : 'main-body',
				key : key,
				source : _obj
			})
		}
	}())
	init();
}()