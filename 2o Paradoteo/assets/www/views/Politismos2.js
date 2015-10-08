KitchenSink.Politismos2 = function(params) {

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
			{ text: "οι κάτοικοι άρχιζαν να χτίζουν το γεφύρι μετά από τουρκική διαταγή για να περάσει τουρκικός στρατός, αλλά το βράδυ το γκρέμιζαν στα κρυφά ", value: "1" },
			{ text: "κάποιοι κάτοικοι ζηλοφθονούσαν τους τεχνίτες για το υπέροχο έργο τους και για το λόγο αυτό το βράδυ το γκρέμιζαν στα κρυφά", value: "2" },
			{ text: "υπήρχε επιδρομή κοπαδιών, τα οποία εμφανίζονταν κατά τη διάρκεια της νύχτας με αποτέλεσμα να καταστρέφουν το γεφύρι", value: "3" },
			{ text: "Οι Τούρκοι γκρέμιζαν το γεφύρι κάθε βράδυ για να παιδεύουν τους τεχνίτες ", value: "4" }
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
					DevExpress.ui.notify('Δώσατε λανθασμένη απάντηση. Η σωστή απάντηση ήταν οι κάτοικοι άρχιζαν να χτίζουν το γεφύρι μετά από τουρκική διαταγή για να περάσει τουρκικός στρατός, αλλά το βράδυ το γκρέμιζαν στα κρυφά', 'error', 2000);
				}
				
				cat5value = cat5value + score;
				KitchenSink.app.navigate("Politismos3");
				
			}
			
			//alert(model1value);
			
			
		
		}
		

    };

    return viewModel;
};