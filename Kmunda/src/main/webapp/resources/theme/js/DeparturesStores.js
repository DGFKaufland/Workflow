$(function(){ 
   
	var host = window.location.origin;
	
///////// Navigation ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.nav li a').click(function(){
        $('.nav li a').removeClass('active')
        $(this).addClass('active') 
    });

    	
	//Marktdaten INITIAL IN DATENBANK EINTRAGEN
	
	//createAbteilung html oeffnen und Marktdaten inital einladen
	$('#btnCreateAbteilungZuMarkt').unbind('click').click(function(){
		buildCountriesContent();
        $('#anzfeld').load('DeparturesStores_WebContent/createDeparture.html');
    });
	
	function buildCountriesContent() {
	    $.ajax({
			    dataType: 'json',
			    success: function(data) {
			    	$('#selectCountry').find('option').remove().end();
			    	for(var i=0;i<data.getAllCountries.length;i++){
			    		$("#selectCountry").append($("<option>"+data.getAllCountries[i].country_code+"</option><br>"));
			    	}
			    	$("#selectCountry").append("<option selected>Bitte Land auswaehlen</option>");	
			    },
			    	url: host+'/services/stores/getAllCountries'
	    });
	 }		
	 
	
	 $('#btnWriteAbteilungZuMarktInDB').unbind('click').click(function() {
		 writeAbteilungZuMarktInDB();
  	   	 });

  	   	 function writeAbteilungZuMarktInDB() {
  	   		 
  	   		 //var store_country = $( "#selectCountry option:selected").text();
  	   		 var store_numberID = $( "#selectStore_number option:selected").val();
  	   		 var departure_id = $( "#selectDeparture option:selected").val();
  	   		 //var departure_name = $( "#selectDeparture option:selected").text();
  	   		 var departure_WBL_id = $( "#selectDeparture_WBL option:selected").val();
  	   		 //var departure_WBL_name = $( "#selectDeparture_WBL option:selected").text();
  	   		 var server_address = document.getElementById("selectServer_address").value;
  	   	
  	   		//alert (store_numberID + departure + limit_value + server_address);
  	   			
  	   		var objDeparture = new Object();
  	   		var arrDeparture = [];
  	   		
  	   		objDeparture.Departures_store_id = store_numberID;
  	   		objDeparture.Departures_departure_id = departure_id; 	   		
  	   		//objDeparture.Departures_name = departure;
  	   		objDeparture.departure_WBL_id = departure_WBL_id;
  	   		//objDeparture.departure_WBL_name = departure_WBL_name; 	   		
  	   		objDeparture.Servers_name = server_address;
  	   		
  	   		DepartureString = JSON.stringify(objDeparture);
  	   		arrDeparture.push(DepartureString);

  	   	 $.ajax({
  	   	   	 type: 'POST',
  	   	   	 contentType: 'application/json',
  	   	   	 url: host+'/services/departures/createDepartureToStore',
  	   	   	 dataType: "json",
  	   	   	 data: JSON.stringify(arrDeparture),  	   	   		
  	   	   	 success: function(data, textStatus, jqXHR){   	   	

  	   			$('#anzfeld').load('home.html');

  	   	   	 },
  	   	   	 error: function(jqXHR, textStatus, errorThrown){
  	   	   	 alert('Abteilung anlegen error: ' + textStatus);
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

  	   	 
  	   $('#btnEditShowAbteilungZuMarkt').unbind('click').click(function(){		
  		 buildEditCountriesContent(); 
  		   $('#anzfeld').load('DeparturesStores_WebContent/editShowDeparture.html');
  	    });	 
  	   	 

  	 function buildEditCountriesContent() {
 	    $.ajax({
 			    dataType: 'json',
 			    success: function(data) {
 			    	$('#editShowCountries').find('option').remove().end();
 			    	for(var i=0;i<data.getAllCountries.length;i++){
 			    		$("#editShowCountries").append($("<option>"+data.getAllCountries[i].country_code+"</option><br>"));
 			    	}
 			    	$("#editShowCountries").append("<option selected>Bitte Land auswaehlen</option>");	
 			    },
 			    	url: host+'/services/stores/getAllCountries'
 	    });
 	 }		 	
  	   
  	   
  	$('#btnEditDeparturesToStore').unbind('click').click(function(){		
  		 editDeparture();
  		 editGetAllWBLForCountry();
  	     $('#anzfeld').load('DeparturesStores_WebContent/editDeparture.html');
  	    });	 
  	   	  
function editDeparture(){
    	   	
    	 var editStoreID = $( "#editShowStores option:selected").val();
    	 var editStoreName = $( "#editShowStores option:selected").text();
    	 var editDepartureID = $( "#editShowDepartures option:selected").val();
    	 var editDepartureName = $( "#editShowDepartures option:selected").text();
    	 
    	localStorage.setItem("editStoreID", editStoreID);
     	localStorage.setItem("editStoreName", editStoreName);
     	localStorage.setItem("editDepartureID", editDepartureID);
     	localStorage.setItem("editDepartureName", editDepartureName);
    	 
     	/*
    	 alert("editStoreID "+editStoreID + " editDepartureID " + editDepartureID +
    			" editStoreName " + editStoreName +  " editDepartureName " + editDepartureName);
     	 */
    	 
     	$.ajax({
           	 type: 'POST',
           	 contentType: 'application/json',
           	 url: host+'/services/departures/editShowDepartureToStore',
           	 dataType: "json",
           	 data: JSON.stringify({
           		"id": editDepartureID
           	 		}),
           	 success: function(data){
           		 
           		var editDepartureTypeID = data.departure_type_id;
           		var editCountry = data.country;
           		var editWbl_id = data.wbl_id;
           		var editWbl_name = data.wbl_name;
           		var editServer = data.server;
           		
           		
           		localStorage.setItem("editDepartureTypeID", editDepartureTypeID);
           		localStorage.setItem("editCountry", editCountry);           		
           		localStorage.setItem("editWbl_id", editWbl_id);
           		localStorage.setItem("editWbl_name", editWbl_name);
           		localStorage.setItem("editServer", editServer);
           	 },
           	 error: function(textStatus){
           	 alert('Problem beim Oeffnen des Editierens von Abteilungen: ' + textStatus);
           	 }
           	 });   	
    	 
 
     }

function editGetAllWBLForCountry(){
	
	var country =  $( "#editShowCountries option:selected").text();

 $.ajax({
	 type: 'POST',
	 contentType: 'application/json',
	 url: host+'/services/users/getAllWBLForCountry',
	 dataType: "json",
	 data: JSON.stringify({"country": country
	 		}),
	 success: function(data){

		 $('#editSelectDeparture_WBL').find('option').remove().end();
	    	for(var i=0;i<data.length;i++){
	    		$("#editSelectDeparture_WBL").append($("<option value='"+data[i].id+"'>"+data[i].firstname + " " + data[i].lastname +"</option><br>"));
	    		//alert(data[i].id + "    " + data[i].firstname + " " + data[i].lastname);
	    	}
	    	$("#editSelectDeparture_WBL").append("<option selected>Bitte WBL auswaehlen</option>");

	 },
	 error: function(jqXHR, textStatus, errorThrown){
	 alert('UserWBL laden error: ' + textStatus);
	 }
	 });
  	   
}






	$('#btnEditDepartureToStoreInDB').unbind('click').click(function(){		
		   editDepartureToStoreInDB(); 		  
	    });	 
	   	  
	function editDepartureToStoreInDB(){

   		var editServer= document.getElementById("editServer").value;
   		var editStoreId = document.getElementById("editStoreId").value;
   		var editDepartureId = document.getElementById("editDepartureId").value;
   		var editDepartureTypeId = document.getElementById("editDepartureTypeId").value;
   		
   		var editWbl_id = $( "#editSelectDeparture_WBL option:selected").val();
   		
 		 /*
   		alert("editStoreID "+editStoreId + " editDepartureID " + editDepartureId +
    			" editServer_address " + editServer_address +  " editLimit_value " + editLimit_value +  			
    			"editServerId " + editServerId + "editLimit_valueId " +editLimit_valueId +
    			"WBL_id " + WBL_id + "WBL_name " +WBL_name);
   		*/   		
     
   		$.ajax({
       	 type: 'POST',
       	 contentType: 'application/json',
       	 url: host+'/services/departures/editDepartureToStore',
       	 dataType: "json",
       	 data: JSON.stringify({
       		 "id": editDepartureId,
       		 "store_id": editStoreId, 
       		 "departure_type_id": editDepartureTypeId, 
       		 "wbl_id": editWbl_id, 
       		 "server": editServer,    		 
       	 		}),
       	 success: function(data){
       		 
       		localStorage.removeItem("editStoreID");
 			localStorage.removeItem("editStoreName");
 			localStorage.removeItem("editDepartureID");
 	     	localStorage.removeItem("editDepartureName");                 	     	
 			localStorage.removeItem("editDepartureTypeID");
       		localStorage.removeItem("editCountry");           		
       		localStorage.removeItem("editWbl_id");
       		localStorage.removeItem("editWbl_name");
       		localStorage.removeItem("editServer");
       		
       		$('#anzfeld').load('home.html');
  
       	 },
       	 error: function(textStatus){
       	 alert('Problem bei Abteilungen editieren: ' + textStatus);
        }
    }); 
   		
}

	
  	 //LÖSCHEN VON Abteilungen inkl. aller zugehörigen Daten
  	   
  	 $('#btnDeleteAbteilungZuMarkt').unbind('click').click(function(){		
  		buildDeleteCountriesContent();
  		 $('#anzfeld').load('DeparturesStores_WebContent/deleteDeparture.html');
     });	    	
  	 
  	function buildDeleteCountriesContent() {
	    $.ajax({
			    dataType: 'json',
			    success: function(data) {
			    	$('#selectDeleteCountry').find('option').remove().end();
			    	for(var i=0;i<data.getAllCountries.length;i++){
			    		$("#selectDeleteCountry").append($("<option>"+data.getAllCountries[i].country_code+"</option><br>"));
			    	}
			    	$("#selectDeleteCountry").append("<option selected>Bitte Land auswaehlen</option>");	
			    },
			    	url: host+'/services/stores/getAllCountries'
	    });
	 }
  	 
  	
	 $('#btnDeleteDeparturesToStore').unbind('click').click(function() {
    	 delDepartureFromDB();
		 return false;
    	 });

    	 function  delDepartureFromDB(){
    		 
    	 var DepartureIdToDelete = $('#deleteShowDepartures option:selected').val();
    		 

    		if(confirm("Wollen Sie diese Abteilung/Markt Zuordnung wirklich loeschen?")){
    			   			 
    	    	 $.ajax({
    	    	 type: 'POST',
    	    	 contentType: 'application/json',
    	    	 url: host+'/services/departures/deleteDepartureToStore',
    	    	 dataType: "json",
    	    	 data: JSON.stringify({"id": DepartureIdToDelete
    			 		}),
    	    	 success: function(data, textStatus, jqXHR){
    	    	 alert('Abteilung wurde erfolgreich geloescht');

    	    	 },
    	    	 error: function(jqXHR, textStatus, errorThrown){
    	    	 alert('Markt Loeschen error: ' + textStatus);
    	    	 }
    	    	 });
    	    	 $('#anzfeld').load('home.html');
    			    	}
    		return false;  
    	 }
 

//////////////////////////////
// ENDE  	 
        		
});

