$(function(){ 
   
	var host = window.location.origin;
	
///////// Navigation ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.nav li a').click(function(){
        $('.nav li a').removeClass('active')
        $(this).addClass('active') 
    });

    	
	//Marktdaten INITIAL IN DATENBANK EINTRAGEN
	
	$('#btnCreateStore').unbind('click').click(function(){
        $('#anzfeld').load('Stores_WebContent/createStore.html');
    });
	

	
	 $('#btnWriteStoreInDB').unbind('click').click(function() {
		 writeStoreInDB();
  	   	 });

  	   	 function writeStoreInDB() {
  	   		 var country_code = $( "#selectCountry_code option:selected").text();
  	   		 var store_number = $( "#selectStore_number option:selected").text();
  	   		 var opening_hours_from = document.getElementById("timepicker_from").value;
  	   		 var opening_hours_to = document.getElementById("timepicker_to").value;
  	   		 var store_manager_id = $( "#selectStore_manager option:selected").val();
  	   		 //var store_manager_name = $( "#selectStore_manager option:selected").text();
  	   		 var sales_manager_id = $( "#selectSales_manager option:selected").val();
  	   		// var sales_manager_name = $( "#selectSales_manager option:selected").text();
  	   		 var store_leitstand_id = $( "#selectStore_leitstand option:selected").val();
	   		 //var store_leitstand_name = $( "#selectStore_leitstand option:selected").text();
  	   		 
  	   	//	alert (country_code + store_number + store_manager + sales_manager );
  	   			
  	   	 $.ajax({
  	   	   	 type: 'POST',
  	   	   	 contentType: 'application/json',
  	   	   	 url: host+'/services/stores/createStore',
  	   	   	 dataType: "json",
  	   	   	 data: JSON.stringify({"country_code": country_code,
  	   	   		 "store_number": store_number,
  	   	   		 "opening_hours_from": opening_hours_from,
  	   	   		 "opening_hours_to": opening_hours_to,
  	   	   		 "store_manager_id": store_manager_id,
  	   	   		 //"store_manager_name": store_manager_name,
  	   	   		 "sales_manager_id": sales_manager_id,
  	   	   		 //"sales_manager_name": sales_manager_name,
  	   	   		 "store_leitstand_id": store_leitstand_id, 	   	
  	   	   		 //"store_leitstand_name": store_leitstand_name
  		 		}),
  	   	   	 success: function(data, textStatus, jqXHR){   	   	

  	   			$('#anzfeld').load('home.html');

  	   	   	 },
  	   	   	 error: function(jqXHR, textStatus, errorThrown){
  	   	   	 alert('Store anlegen error: ' + textStatus);
  	   	   	 }
  	   	   	 });
  	   	   	 
  	  }
	
  	   	 
  	   	 
  	   	 
	/////////////////////Stores aus der DB Laden für die Anzeigeauswahl////////////////////////
	
  	   $('#btnEditShowStores').unbind('click').click(function(){		
  		  // editStoresShowContent(); 
  		   $('#anzfeld').load('Stores_WebContent/editShowStores.html');
  	    });	 
  	   	 
  	   	/*
  	   function editStoresShowContent() {
	        $.ajax({
	 		    dataType: 'json',
	 		    success: function(data) {
	 		    	$('#editShowStores').find('option').remove().end();
	 		    	for(var i=0;i<data.getAllStores.length;i++){
	 		    		$("#editShowStores").append($("<option value='"+data.getAllStores[i].ID+"'>"+data.getAllStores[i].country_code +" " + data.getAllStores[i].store_number +"</option><br>"));
	 		    	}
	 		    },
	 		    	url: host+'/services/stores/getAllStores'
	        });
	     }
  	   	 */
  	   
  	   
  	   
  	   
  	$('#btnEditStore').unbind('click').click(function(){
  		   editStores();   		  
  	    });	 
  	   	  
function editStores(){
    	   	
    	 var editStoreID = $( "#editShowStoresToCountry option:selected").val();
    	// alert(editStoreID);
    		   	 
    	 $.ajax({
           	 type: 'POST',
           	 contentType: 'application/json',
           	 url: host+'/services/stores/editShowStore',
           	 dataType: "json",
           	 data: JSON.stringify({"id": editStoreID
           	 		}),
           	 success: function(data){
    	   		 
           		var editID = data.id;
           		var Laenderkuerzel = data.country_code;
           		var Marktnummer = data.store_number;
           		var Oeffnungszeiten_von = data.opening_hours_from;
           		var Oeffnungszeiten_bis = data.opening_hours_to;
           		var Marktleiter_id = data.store_manager_id;
           		//var Marktleiter_name = data.store_manager_name;
           		var Verkaufsleiter_id = data.sales_manager_id;
           		//var Verkaufsleiter_name = data.sales_manager_name;
           		var Leitstand_id = data.store_leitstand_id;
           		//var Leitstand_name = data.store_leitstand_name;
           		/*
           		alert(editID +Laenderkuerzel+ Marktnummer+Oeffnungszeiten_von+
           				Oeffnungszeiten_bis+Marktleiter_id+Marktleiter_name+Verkaufsleiter_id+
           				Verkaufsleiter_name+Leitstand);
           		*/
           		
           		localStorage.setItem("editID", editID);
            	localStorage.setItem("editLaenderkuerzel", Laenderkuerzel);
            	localStorage.setItem("editMarktnummer", Marktnummer);
            	localStorage.setItem("editOeffnungszeiten_von", Oeffnungszeiten_von);
            	localStorage.setItem("editOeffnungszeiten_bis", Oeffnungszeiten_bis);
            	localStorage.setItem("editMarktleiter_id", Marktleiter_id);
            	//localStorage.setItem("editMarktleiter_name", Marktleiter_name);
            	localStorage.setItem("editVerkaufsleiter_id", Verkaufsleiter_id);
            	//localStorage.setItem("editVerkaufsleiter_name", Verkaufsleiter_name);
            	localStorage.setItem("editLeitstand_id", Leitstand_id);
            	//localStorage.setItem("editLeitstand_name", Leitstand_name);

            	$('#anzfeld').load('Stores_WebContent/editStore.html'); 
      
           	 },
           	 error: function(textStatus){
           	 alert('Problem beim Oeffnen des Editierens von Maerkten: ' + textStatus);
           	 }
           	 });   	 
     }
  	  

	$('#btnEditStoreInDB').unbind('click').click(function(){		
		   editStoreInDB(); 
		  
	    });	 
	   	  
	function editStoreInDB(){
 	   	
		 var editID = document.getElementById("editStoreId").value;
   		 //var Laenderkuerzel = $( "#editSelectCountry_code option:selected").text();
   		 //var Marktnummer = $( "#editStore_number option:selected").text();  		
 		 var opening_hours_from = document.getElementById("editTimepicker_from").value;
 		 var opening_hours_to = document.getElementById("editTimepicker_to").value;
 		 var store_manager_id = $( "#selectEditStore_manager option:selected").val();
 		 //var store_manager_name = $( "#selectEditStore_manager option:selected").text();
 		 var sales_manager_id = $( "#selectEditSales_manager option:selected").val();
 		 //var sales_manager_name = $( "#selectEditSales_manager option:selected").text();
		 var store_leitstand_id = $( "#selectEditStore_leitstand option:selected").val();
		 //var store_leitstand_name = $( "#selectEditStore_leitstand option:selected").text();
   		
 		   	 
 	 $.ajax({
        	 type: 'POST',
        	 contentType: 'application/json',
        	 url: host+'/services/stores/editStore',
        	 dataType: "json",
        	 data: JSON.stringify({"id": editID,
        		 //"country_code": Laenderkuerzel,
        		 //"store_number":Marktnummer,
        		 "opening_hours_from": opening_hours_from,
  	   	   		 "opening_hours_to": opening_hours_to,
  	   	   		 "store_manager_id": store_manager_id,
  	   	   		 //"store_manager_name": store_manager_name,
  	   	   		 "sales_manager_id": sales_manager_id,
  	   	   		 //"sales_manager_name": sales_manager_name,
  	   	   		 "store_leitstand_id": store_leitstand_id,
  	   	   		 //"store_leitstand_name": store_leitstand_name
        	 		}),
        	 success: function(data){
        		 
        		localStorage.removeItem("editID");
             	localStorage.removeItem("editLaenderkuerzel");
             	localStorage.removeItem("editMarktnummer");
             	localStorage.removeItem("editOeffnungszeiten_von");
             	localStorage.removeItem("editOeffnungszeiten_bis");
             	localStorage.removeItem("editMarktleiter_id");
             	//localStorage.removeItem("editMarktleiter_name");
             	localStorage.removeItem("editVerkaufsleiter_id");
             	//localStorage.removeItem("editVerkaufsleiter_name");
             	localStorage.removeItem("editLeitstand_id"); 
             	//localStorage.removeItem("editLeitstand_name");

         	$('#anzfeld').load('home.html'); 
   
        	 },
        	 error: function(textStatus){
        	 alert('Problem beim Markt editieren: ' + textStatus);
        	 }
        	 });
 	 
  }


  	   
  	 //LÖSCHEN VON SENSORDATEN
  	   
  	 $('#btnDeleteStore').unbind('click').click(function(){		
  		//deleteStoreShowContent();
  		 $('#anzfeld').load('Stores_WebContent/deleteShowStores.html');
     });	   
  	   
	/*
  	function deleteStoreShowContent() {
        $.ajax({
 		    dataType: 'json',
 		    success: function(data) {
 		    	$('#deleteShowStores').find('option').remove().end();
 		    	for(var i=0;i<data.getAllStores.length;i++){
 		    		$("#deleteShowStores").append($("<option value='"+data.getAllStores[i].ID+"'>"+data.getAllStores[i].country_code +" " + data.getAllStores[i].store_number +"</option><br>"));
 		    	}
 		    	$("#deleteShowStores").append("<option selected>Bitte Markt auswaehlen</option>");
 		    },
 		    	url: host+'/services/stores/getAllStores'
        });
     } 
  	*/
  	
	 $('#btnDeleteStoreFromDB').unbind('click').click(function() {
    	 delStoreFromDB();
		 return false;
    	 });

    	 function  delStoreFromDB(){
    		 
    	 var StoreIdToDelete = $('#deleteShowStoresToCountry option:selected').val();
    		 

    		if(confirm("Wollen Sie diesen Markt wirklich loeschen!!!!")){
    			   			 
    	    	 $.ajax({
    	    	 type: 'POST',
    	    	 contentType: 'application/json',
    	    	 url: host+'/services/stores/deleteStore',
    	    	 dataType: "json",
    	    	 data: JSON.stringify({"id": StoreIdToDelete
    			 		}),
    	    	 success: function(data, textStatus, jqXHR){
    	    	 alert('Markt wurde erfolgreich geloescht');

    	    	 },
    	    	 error: function(jqXHR, textStatus, errorThrown){
    	    	 alert('Markt Loeschen error: ' + textStatus);
    	    	 }
    	    	 });
    	    	 $('#anzfeld').load('home.html');
    			    	}
    		return false;  
    	 }
    	 
  ///////// Uhr anzeigen fuer time  /////////////////////////////////////////////////////////////////////////////////////////////////////


 		$('#timepicker_from').clockpicker({
 			donetext: 'Fertig',
 			'default': 'now',			
 		});
 		
 		
 		$('#timepicker_to').clockpicker({
 			donetext: 'Fertig',
 			'default': 'now',			
 		});
 		
 		$('#editTimepicker_from').clockpicker({
 			donetext: 'Fertig',
 			'default': 'now',			
 		});
 		
 		
 		$('#editTimepicker_to').clockpicker({
 			donetext: 'Fertig',
 			'default': 'now',			
 		});
    	 
//////////////////////////////
// ENDE  	 
        		
});

