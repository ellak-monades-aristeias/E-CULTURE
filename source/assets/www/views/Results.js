KitchenSink.Results = function(params) {


    var viewModel = {
			
		
    resultfunc: function () {
		

		if (typeof cat1value === 'undefined')
		{
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Μνημεία: N/A</div></div>');
		}
		else
		{
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Μνημεία: '+cat1value+'/7</div></div>');
		}

		if (typeof cat2value === 'undefined')
		{		
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Αρχαία Ήπειρος: N/A</div></div>');
		}
		else
		{
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Αρχαία Ήπειρος: '+cat2value+'/15</div></div>');
		}
		
		if (typeof cat3value === 'undefined')
		{
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Ιστορία: N/A</div></div>');
		}
		else
		{
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Ιστορία: '+cat3value+'/10</div></div>');
		}
		
		if (typeof cat4value === 'undefined')
		{	
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Λαογραφία: N/A</div></div>');
		}
		else
		{
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Λαογραφία: '+cat4value+'/9</div></div>');
		}
		
		if (typeof cat5value === 'undefined')
		{	
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Πολιτισμός: N/A</div></div>');
		}
		else
		{
			$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Πολιτισμός: '+cat5value+'/8</div></div>');
		}
		
	/*	
	if ( cat1value != "undefined" )
	{
		//$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Μνημεία: N/A</div></div>');
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label" style="width:100%">Κατηγορία Μνημεία: '+cat1value+'</div></div>');
	}
	else
	{
		//$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Μνημεία: '+cat1value+'</div></div>');
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Μνημεία: N/A</div></div>');
	}
	
	if ( cat2value != "undefined" )
	{
		//$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Αρχαία Ήπειρος: N/A</div></div>');
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Αρχαία Ήπειρος: '+cat2value+'</div></div>');
	}
	else
	{
		//$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Αρχαία Ήπειρος: '+cat2value+'</div></div>');
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Αρχαία Ήπειρος: N/A</div></div>');
	}	
	
	if ( cat3value == "undefined" )
	{
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Ιστορία: N/A</div></div>');
	}
	else
	{
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Ιστορία: '+cat3value+'</div></div>');
	}	

	if ( cat4value == "undefined" )
	{
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Λαογραφία: N/A</div></div>');
	}
	else
	{
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Λαογραφία: '+cat4value+'</div></div>');
	}	

	if ( cat5value == "undefined" )
	{
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Πολιτισμός: N/A</div></div>');
	}
	else
	{
		$("#projectid").append('<div class="dx-field"><div class="dx-field-label">Κατηγορία Πολιτισμός: '+cat5value+'</div></div>');
	}		
	*/	
		//KitchenSink.app.navigate("Category");

    },
	
	returnfunc: function () {
	
		KitchenSink.app.navigate("Category");

    }

    };

    return viewModel;
};