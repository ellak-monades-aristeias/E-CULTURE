﻿KitchenSink.History10 = function(params) {

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
			{ text: "Κίτσο Τζαβέλα", value: "1" },
			{ text: "Αθανάσιο Ψαλίδα", value: "2" },
			{ text: "Μεθόδιο Ανθρακίτη", value: "3" },
			{ text: "Διονυσίο Φιλοσόφο", value: "4" }
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
					DevExpress.ui.notify('Δώσατε λανθασμένη απάντηση. Η σωστή απάντηση ήταν τον Διονυσίο Φιλοσόφον', 'error', 2000);
				}
				
				cat3value = cat3value + score;
				KitchenSink.app.navigate("Results");
				
			}
			
			//alert(model1value);
			
			
		
		}
		

    };

    return viewModel;
};