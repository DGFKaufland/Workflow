$(function(){ 
   
	var host = window.location.origin;
	
///////// Navigation ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.nav li a').click(function(){
        $('.nav li a').removeClass('active')
        $(this).addClass('active') 
    });

    	
	//Marktdaten INITIAL IN DATENBANK EINTRAGEN
	
	//createAbteilung html oeffnen und Marktdaten inital einladen
	$('#btnCreateAbteilungstyp').unbind('click').click(function(){		
        $('#anzfeld').load('DeparturesType_WebContent/createDeparture_type.html');
    });
	 
	 
	 
	 $('#btnWriteAbteilungstypInDB').unbind('click').click(function() {
		 writeAbteilungstypInDB();
  	   	 });

  	   	 function writeAbteilungstypInDB() {
  	   		 var limit_value = document.getElementById("selectLimit_value").value;
	   		 var description = document.getElementById("selectDescription").value;
  	   		 var departuretype_country = $( "#departureTypeCountries option:selected").text();
  	   		 
  	// alert(limit_value + description + departuretype_country);
  	   		
  	   	$.ajax({
          	 type: 'POST',
          	 contentType: 'application/json',
          	 url: host+'/services/departurestype/createDepartureType',
          	 dataType: "json",
          	 data: JSON.stringify({
          		"country": departuretype_country,
          		"description": description,
          		"limit_value": limit_value
          	 		}),
          	 success: function(data){
          		$('#anzfeld').load('home.html'); 

          	 },
          	 error: function(textStatus){
          	 alert('Problem beim Oeffnen des Editierens von Abteilungstypen: ' + textStatus);
          	 }
          	 });   	
          	 
          	
 
  	  }
  	 

  	   	 ///JSON BEISPIEL für mehrere Objekte///
  	/**   	 
  	   {
   	   		 "Departures": {
 	           "store_id": store_numberID,
 	           "name": departure
 	         },
   	         "Limit_Values": {
   	           "limit_value": limit_value
   	         },
   	         "Servers": {
 	           "name": server_address
 	         }
   	   	 }
  	 **/
  	   	 
  	   	 
	/////////////////////Stores aus der DB Laden für die Anzeigeauswahl////////////////////////

  	   	 
  	   $('#btnEditShowAbteilungstyp').unbind('click').click(function(){		
  		   $('#anzfeld').load('DeparturesType_WebContent/editShowDeparture_type.html');
  	    });	 
  	   	 


  	$('#btnEditDepartureType').unbind('click').click(function(){		
  		 editDeparture();
  	    });	 
  	
function editDeparture(){
    	   	
    	 var editDepartureTypeID = $( "#editShowDepartureTypesToCountry option:selected").val();
    	 
    	 localStorage.setItem("editDepartureTypeID", editDepartureTypeID);
    	 
     	$.ajax({
           	 type: 'POST',
           	 contentType: 'application/json',
           	 url: host+'/services/departurestype/editShowDepartureType',
           	 dataType: "json",
           	 data: JSON.stringify({
           		"id": editDepartureTypeID
           	 		}),
           	 success: function(data){
           		var editCountry = data.country;
           		var editDescription = data.description;
           		var editLimit_value = data.limit_value;
           		
           		localStorage.setItem("editCountry", editCountry);
           		localStorage.setItem("editDescription", editDescription);
           		localStorage.setItem("editLimit_value", editLimit_value);
           		
           		
           		$('#anzfeld').load('DeparturesType_WebContent/editDeparture_type.html'); 
           	 },
           	 error: function(textStatus){
           	 alert('Problem beim Oeffnen des Editierens von Abteilungstypen: ' + textStatus);
           	 }
           	 });   	
 
     }
  	   


	$('#btnEditDepartureTypeInDB').unbind('click').click(function(){		
		   editDepartureTypeInDB(); 		  
	    });	 
	   	  
	function editDepartureTypeInDB(){
		
		var editCountry = $( "#editShowCountries option:selected").text();
   		var editDescription = document.getElementById("editDepartureTypeDescription").value;
   		var editLimit_value = document.getElementById("editDepartureTypeLimit_value").value;
   		var editDepartureTypeID = document.getElementById("editDepartureTypeId").value;

   		//alert(editDepartureTypeID + editCountry + editDescription + editLimit_value);

   	 $.ajax({
    	 type: 'POST',
    	 contentType: 'application/json',
    	 url: host+'/services/departurestype/editDepartureType',
    	 dataType: "json",
    	 data: JSON.stringify({"id": editDepartureTypeID,
    		 "country": editCountry,
    		 "description": editDescription,
    		 "limit_value": editLimit_value
    	 		}),
    	 success: function(data){
    		
    		localStorage.removeItem("editDepartureTypeID");
 			localStorage.removeItem("editCountry");
 			localStorage.removeItem("editDescription");
 			localStorage.removeItem("editLimit_value");

 			$('#anzfeld').load('home.html'); 

    	 },
    	 error: function(textStatus){
    	 alert('Problem bei Abteilungstyp editieren: ' + textStatus);
    	 }
    	 }); 
   		
}

	
  	 //LÖSCHEN VON Abteilungen inkl. aller zugehörigen Daten
  	   
  	 $('#btnDeleteAbteilungstyp').unbind('click').click(function(){		
  		 $('#anzfeld').load('DeparturesType_WebContent/deleteDeparture_type.html');
     });	    	
  	 	
  	 
	 $('#btnDeleteDepartureType').unbind('click').click(function() {
    	 delDepartureFromDB();
		 return false;
    	 });

    	 function  delDepartureFromDB(){
    		 
    	 var DepartureTypeIdToDelete = $('#deleteShowDepartureTypesToCountry option:selected').val();
    		 

    		if(confirm("Wollen Sie diesen Abteilungstyp wirklich loeschen!!!!")){
    			   			 
    	    	 $.ajax({
    	    	 type: 'POST',
    	    	 contentType: 'application/json',
    	    	 url: host+'/services/departurestype/deleteDepartureType',
    	    	 dataType: "json",
    	    	 data: JSON.stringify({"id": DepartureTypeIdToDelete
    			 		}),
    	    	 success: function(data, textStatus, jqXHR){
    	    	 alert('Abteilung wurde erfolgreich geloescht');

    	    	 },
    	    	 error: function(jqXHR, textStatus, errorThrown){
    	    	 alert('Abteilungstyp Loeschen error: ' + textStatus);
    	    	 }
    	    	 });
    	    	 $('#anzfeld').load('home.html');
    			    	}
    		return false;  
    	 } 	 
    	 
    	 
    	 
//////////////////////////////
// ENDE  	 
        		
});

