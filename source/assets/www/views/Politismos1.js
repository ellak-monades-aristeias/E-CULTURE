KitchenSink.Politismos1 = function(params) {

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
			{ text: "Κώνσταντίνος Καβάφης", value: "1" },
			{ text: "Άγγελος Σικελιανός", value: "2" },
			{ text: "Κώστας Καρυωτάκης", value: "3" },
			{ text: "Κώστής Παλαμάς", value: "4" }
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
					DevExpress.ui.notify('Δώσατε λανθασμένη απάντηση. Η σωστή απάντηση ήταν ο Κώστας Καρυωτάκης', 'error', 2000);
				}
				
				cat5value = score;
				//alert(cat1value);
				KitchenSink.app.navigate("Politismos2");
				
			}
			
			//alert(model1value);
			
			
		
		}
		

    };

    return viewModel;
};