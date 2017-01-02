$(function(){ 
   
	var host = window.location.origin;
	
///////// Navigation ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.nav li a').click(function(){
        $('.nav li a').removeClass('active')
        $(this).addClass('active') 
    });

    	
	//Marktdaten INITIAL IN DATENBANK EINTRAGEN
	
	//createAbteilung html öffnen und Marktdaten inital einladen
	$('#btnCreateSensor').unbind('click').click(function(){		
		buildCountriesContent();
        $('#anzfeld').load('Sensors_WebContent/createSensor.html');
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
	
	 $('#btnWriteSensorInDB').unbind('click').click(function() {
		 writeSensorInDB();
  	   	 });

  	   	 function writeSensorInDB() {
     		 
  	   		 var store_number = $( "#selectStore_number option:selected").val();
  	   		 var departure_number = $( "#selectDeparture_number option:selected").val();
  	   		 var manufacturer = $( "#selectManufacturer option:selected").val();
  	   		 var sensortype = $( "#selectSensortype option:selected").val();
  	   		 
  	   		 var hardware_id = document.getElementById("selectHardwareID").value;
  	   		 var logical_id = document.getElementById("selectLogicalID").value;
  	   		 
  	   		 var stati = $( "#selectStati option:selected").val();
  	   	     var gateway = $( "#selectGateway option:selected").val();
  	   	
  	   		//alert (store_numberID + departure + limit_value + server_address);
  
  	   	 $.ajax({
  	   	   	 type: 'POST',
  	   	   	 contentType: 'application/json',
  	   	   	 url: host+'/services/sensors/createSensor',
  	   	   	 dataType: "json",
  	   	   	 data: JSON.stringify({
  	   	   		 "store_id": store_number,
  	   	   		 "departure_id": departure_number,
  	   	   		 "manufacturer": manufacturer,
  	   	   		 "sensor_type": sensortype,
  	   	   		 "hardware_id": hardware_id,
  	   	   		 "logical_id": logical_id,
  	   	   		 "status": stati,
  	   	   		 "gateway": gateway
  	   	   	 }),  	   	   		
  	   	   	 success: function(data, textStatus, jqXHR){   	   	

  	   			$('#anzfeld').load('home.html');

  	   	   	 },
  	   	   	 error: function(jqXHR, textStatus, errorThrown){
  	   	   	 alert('Sensor anlegen Fehler: ' + textStatus);
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

  	   	 
  	   $('#btnEditShowSensor').unbind('click').click(function(){		
  		   buildEditCountriesContent(); 
  		   $('#anzfeld').load('Sensors_WebContent/editShowSensors.html');
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
  	   
  	$('#btnEditSensors').unbind('click').click(function(){		
  		 editSensors(); 
  	     $('#anzfeld').load('Sensors_WebContent/editSensor.html');
  	    }); 

  	
function editSensors(){
	     
	
	     var editSensorID = $( "#editShowSensors option:selected").val();  	
    	 var editStoreID = $( "#editShowStores option:selected").val();
    	 var editDepartureID = $( "#editShowDepartures option:selected").val();
    	 
    	 var editStoreName_init = $( "#editShowStores option:selected").text();
    	 var editStoreName = editStoreName_init.substring(editStoreName_init.indexOf(":")+1,editStoreName_init.length);
    	 var editDepartureName = $( "#editShowDepartures option:selected").text();
    	 var editSensorsName = $( "#editShowSensors option:selected").text();
    	 
    	localStorage.setItem("editSensorID", editSensorID); 
    	localStorage.setItem("editStoreID", editStoreID);
     	localStorage.setItem("editDepartureID", editDepartureID);
    	
     	localStorage.setItem("editStoreName", editStoreName);
     	localStorage.setItem("editDepartureName", editDepartureName);
     	localStorage.setItem("editSensorName", editSensorsName);
    	 
    	 //alert("editStoreID "+editStoreID + " editDepartureID " + editDepartureID +
    	//		" editSensorID " + editSensorID );
    	 
    	 $.ajax({
           	 type: 'POST',
           	 contentType: 'application/json',
           	 url: host+'/services/sensors/getSensorToStoreDepartment',
           	 dataType: "json",
           	 data: JSON.stringify({
           		"id": editSensorID
           	 		}),
           	 success: function(data){
 
           		var manufacturer = data.manufacturer;    
           	    var sensor_type = data.sensor_type;
           	    var hardware_id = data.hardware_id;
           	    var logical_id = data.logical_id;    
           	    var status = data.status;
           	    var gateway = data.gateway;
           	    
           	    //alert (manufacturer + sensor_type + hardware_id + logical_id + status);

           		localStorage.setItem("editManufacturer", manufacturer);
           		localStorage.setItem("editSensorType", sensor_type);
           		localStorage.setItem("editHardwareID", hardware_id);
           		localStorage.setItem("editLogicalID", logical_id);
           		localStorage.setItem("editStatus", status);
           		localStorage.setItem("editGateway", gateway);
           	 },
           	 error: function(textStatus){
           	 alert('Problem beim getAllSensorsToStoreDepartment Service: ' + textStatus);
           	 }
           	 });   	
    	 
    	 /*
    	 alert("editSensorID  " +localStorage.getItem("editSensorID") +"\n" 
    			 + "editStoreID  " +localStorage.getItem("editStoreID") + "\n" +
    			 "editDepartureID  " +localStorage.getItem("editDepartureID") + "\n" +
    			 "editManufacturer  " + localStorage.getItem("editManufacturer") + "\n" +
    			 "editSensorType  " +localStorage.getItem("editSensorType") + "\n" +
    			 "Hardware_ID  " +localStorage.getItem("editHardwareID") + "\n" +
    			 "LogicalID  " + localStorage.getItem("editLogicalID") + "\n" +
    			 "editStatus  " + localStorage.getItem("editStatus") + "\n" +
    			 "editStoreName  " +localStorage.getItem("editStoreName") + "\n" +
    			 "editDepartureName  " + localStorage.getItem("editDepartureName") + "\n" +
    			 "SensorName  " + localStorage.getItem("editSensorName"));
    	  	*/
   }
  	   


	$('#btnEditSensorInDB').unbind('click').click(function(){		
		   editSensorInDB(); 
		  
	    });	 
	   	  
	function editSensorInDB(){
		
		var SensorID = document.getElementById("editSensorId").value;
		
		var editManufacturer = $( "#editManufacturer option:selected").val();
		var editSensortype = $( "#editSensortype option:selected").val();
		
		var editHardwareID = document.getElementById("editHardwareID").value;
		var editLogicalID = document.getElementById("editLogicalID").value;
		
		var editStati = $( "#editStati option:selected").val();
		var editGateway = $( "#editGateway option:selected").val();
		
	 
   		$.ajax({
       	 type: 'POST',
       	 contentType: 'application/json',
       	 url: host+'/services/sensors/editSensor',
       	 dataType: "json",
       	 data: JSON.stringify({"id": SensorID,
       		"manufacturer": editManufacturer,
       		"sensor_type": editSensortype,
       		"hardware_id": editHardwareID,
       		"logical_id": editLogicalID,
       		"status": editStati,
       		"gateway": editGateway
       	 		}),
       	 success: function(data){
       		 	
       		    localStorage.removeItem("editSensorID"); 
       	    	localStorage.removeItem("editStoreID");
       	     	localStorage.removeItem("editDepartureID");
       	    	
       	     	localStorage.removeItem("editStoreName");
       	     	localStorage.removeItem("editDepartureName");
       	     	localStorage.removeItem("editSensorName");
       		 
       		 	localStorage.removeItem("editManufacturer");
           		localStorage.removeItem("editSensorType");
           		localStorage.removeItem("editHardwareID");
           		localStorage.removeItem("editLogicalID");
           		localStorage.removeItem("editStatus");
           		localStorage.removeItem("editGateway");
       		 
        	$('#anzfeld').load('home.html'); 
  
       	 },
       	 error: function(textStatus){
       	 alert('Problem bei Server editieren: ' + textStatus);
       	 }
       	 }); 
   		
  }

	
	
	
	
	
  	 //LÖSCHEN VON Sensoren inkl
  	   
  	 $('#btnDeleteSensor').unbind('click').click(function(){		
  		buildDeleteCountriesContent();
  		 $('#anzfeld').load('Sensors_WebContent/deleteSensor.html');
     });	    	
  	 
  	function buildDeleteCountriesContent() {
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
  	 
  	 
	 $('#btnDeleteSensorFromDB').unbind('click').click(function() {
    	 delSensorFromDB();
		 return false;
    	 });

    	 function  delSensorFromDB(){
    		 
    	 var SensorIdToDelete = $('#editShowSensors option:selected').val();
    		 

    		if(confirm("Wollen Sie diesen Sensor wirklich loeschen!!!!")){
    			   			 
    	    	 $.ajax({
    	    	 type: 'POST',
    	    	 contentType: 'application/json',
    	    	 url: host+'/services/sensors/deleteSensor',
    	    	 dataType: "json",
    	    	 data: JSON.stringify({"id": SensorIdToDelete
    			 		}),
    	    	 success: function(data, textStatus, jqXHR){
    	    	 alert('Sensor wurde erfolgreich geloescht');

    	    	 },
    	    	 error: function(jqXHR, textStatus, errorThrown){
    	    	 alert('Sensor Loeschen error: ' + textStatus);
    	    	 }
    	    	 });
    	    	 $('#anzfeld').load('home.html');
    			    	}
    		return false;  
    	 }

    	 
//////////////////////////////
// ENDE  	 
        		
});

