﻿KitchenSink.Laografia4 = function(params) {

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
			{ text: "οι εργασίες δεν επιδέχονται αναβολή", value: "1" },
			{ text: "καθένας ανάλογα της αξίας και της κοινωνικής θέσης του", value: "2" },
			{ text: "αλλοίμονο σε κείνον που περιμένει να ζήσει από τον οίκτο των άλλων", value: "3" },
			{ text: "όνειρα που δύσκολα πραγματοποιούνται", value: "4" }
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
					DevExpress.ui.notify('Δώσατε λανθασμένη απάντηση. Η σωστή απάντηση ήταν όνειρα που δύσκολα πραγματοποιούνται', 'error', 2000);
				}
				
				cat4value = cat4value + score;
				KitchenSink.app.navigate("Laografia5");
				
			}
			
			//alert(model1value);
			
			
		
		}
		

    };

    return viewModel;
};