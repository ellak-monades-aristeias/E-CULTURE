KitchenSink.History1 = function(params) {

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
			{ text: "21 Φεβρουαρίου 1823", value: "1" },
			{ text: "25 Μαρτίου 1913", value: "2" },
			{ text: "21 Φεβρουαρίου 1913", value: "3" },
			{ text: "25 Μαρτίου 1823", value: "4" }
		],
        gender: ko.observable(''),
		
		
		
		loginfunc: function () {
		
			mygender = this.gender();
		
			//alert(mygender);
			//alert(cat1value);
			
			if (mygender == "")
			{
				//alert("Παρακαλώ συμπληρώστε όλα τα πεδία");
				DevExpress.ui.notify('Παρακαλώ συμπληρώστε όλα τα πεδία', 'warning', 2000);
			}
			else
			{
				var score = 0;
				
				if (mygender == "3")
				{
					score = 1;
					DevExpress.ui.notify('Συγχαρητήρια. Δώσατε τη σωστή απάντηση!', 'success', 2000);
				}
				else
				{
					score = 0;
					DevExpress.ui.notify('Δώσατε λανθασμένη απάντηση. Η σωστή απάντηση ήταν η 21 Φεβρουαρίου 1913', 'error', 2000);
				}
				
				cat3value = score;
				//alert(cat1value);
				KitchenSink.app.navigate("History2");
				
			}
			
			//alert(model1value);
			
			
		
		}
		

    };

    return viewModel;
};