KitchenSink.Category = function (params) {

	/*
		cat1value = 0;
		cat2value = 0;
		cat3value = 0;
		cat4value = 0;
		cat5value = 0;
	*/
	
    var viewModel = {
	
	
	   mnimeia : function()
            {

				KitchenSink.app.navigate("Mnimeia1");
		
            },
			
	   arxaia : function()
            {
			
				KitchenSink.app.navigate("Arxaia1");

            },

	   history : function()
            {
			
				KitchenSink.app.navigate("History1");

            },	

	   laografia : function()
            {
			
				KitchenSink.app.navigate("Laografia1");

            },	

	   politismos : function()
            {
			
				KitchenSink.app.navigate("Politismos1");

            }			
	

		
    };
    return viewModel;
};