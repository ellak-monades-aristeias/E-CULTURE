KitchenSink.Mnimeia3 = function(params) {

    var viewModel = {
	
/*	
	colors: [
        { text: "red", value: "#FF0000" },
        { text: "green", value: "#00AA00" },
        { text: "blue", value: "#0000FF" }
    ],
    currentColor: ko.observable("#FF0000"),
    changeColor: function (e) {
        this.currentColor(e.value);
    },
	*/
	
		genders: [
			{ text: "9ος αιώνας μ.Χ.", value: "1" },
			{ text: "1ος αιώνας π.Χ.", value: "2" },
			{ text: "19ος αιώνας μ.Χ.", value: "3" },
			{ text: "6ος αιώνας μ.Χ.", value: "4" }
		],
        gender: ko.observable(''),
		
		
		
		loginfunc: function () {
		
			mygender = this.gender();
		
			//alert(mygender);
			
			if (mygender == "")
			{
				//alert("Παρακαλώ συμπληρώστε όλα τα πεδία");
				DevExpress.ui.notify('Παρακαλώ συμπληρώστε όλα τα πεδία', 'warning', 2000);
			}
			else
			{
				var score = 0;
				
				if (mygender == "4")
				{
					score = 1;
					DevExpress.ui.notify('Συγχαρητήρια. Δώσατε τη σωστή απάντηση!', 'success', 2000);
				}
				else
				{
					score = 0;
					DevExpress.ui.notify('Δώσατε λανθασμένη απάντηση. Η σωστή απάντηση ήταν ο 6ος αιώνας μ.Χ.', 'error', 2000);
				}
				
				cat1value = cat1value + score;
				KitchenSink.app.navigate("Mnimeia4");
				
			}
			
			//alert(model1value);
			
			
		
		}
		

    };

    return viewModel;
};