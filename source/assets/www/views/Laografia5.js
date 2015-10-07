KitchenSink.Laografia5 = function(params) {

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
			{ text: "απευθύνεται σε πονηρούς και αχάριστους προς τους ευεργέτες", value: "1" },
			{ text: "αναφέρεται στην περίπτωση που κάποιος δεν μπορεί να πάρει τα δανεικά πίσω", value: "2" },
			{ text: "καθένας ανάλογα της αξίας και της κοινωνικής θέσης του", value: "3" },
			{ text: "αναφέρεται σε εκείνους που επιδεικνύονται περισσότερο από ό,τι αξίζουν", value: "4" }
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
				
				if (mygender == "3")
				{
					score = 1;
					DevExpress.ui.notify('Συγχαρητήρια. Δώσατε τη σωστή απάντηση!', 'success', 2000);
				}
				else
				{
					score = 0;
					DevExpress.ui.notify('Δώσατε λανθασμένη απάντηση. Η σωστή απάντηση ήταν καθένας ανάλογα της αξίας και της κοινωνικής θέσης του', 'error', 2000);
				}
				
				cat4value = cat4value + score;
				KitchenSink.app.navigate("Laografia6");
				
			}
			
			//alert(model1value);
			
			
		
		}
		

    };

    return viewModel;
};