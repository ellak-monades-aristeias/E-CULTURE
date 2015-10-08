KitchenSink.Arxaia10 = function(params) {

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
			{ text: "αποτελεί σήμερα τη μεγαλύτερη σε έκταση αρχαία πόλη της Ελλάδας", value: "1" },
			{ text: "ότι έχουν γίνει εργασίες αναστήλωσης και ανάδειξης του αρχαιολογικού χώρου", value: "2" },
			{ text: "τα περισσότερα από τα εκθέματα δεν έχουν υποστεί καμία παραμόρφωση", value: "3" },
			{ text: "δίπλα ακριβώς από τον αρχαιολογικό χώρο περνάει ο μεγαλύτερος ποταμός της Ελλάδας", value: "4" }
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
				
				if (mygender == "1")
				{
					score = 1;
					DevExpress.ui.notify('Συγχαρητήρια. Δώσατε τη σωστή απάντηση!', 'success', 2000);
				}
				else
				{
					score = 0;
					DevExpress.ui.notify('Δώσατε λανθασμένη απάντηση. Η σωστή απάντηση ήταν αποτελεί σήμερα τη μεγαλύτερη σε έκταση αρχαία πόλη της Ελλάδας', 'error', 2000);
				}
				
				cat2value = cat2value + score;
				KitchenSink.app.navigate("Arxaia11");
				
			}
			
			//alert(model1value);
			
			
		
		}
		

    };

    return viewModel;
};