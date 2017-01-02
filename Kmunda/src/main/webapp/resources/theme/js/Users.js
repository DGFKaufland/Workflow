$(function(){ 
   
	var host = window.location.origin;
	
///////// Navigation ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.nav li a').click(function(){
        $('.nav li a').removeClass('active')
        $(this).addClass('active') 
    });

    	
	//Userdaten INITIAL IN DATENBANK EINTRAGEN
	
	$('#btnCreateUser').unbind('click').click(function(){		
        $('#anzfeld').load('Users_WebContent/createUser.html');
    });
	
	 $('#btnWriteUserInDB').unbind('click').click(function() {
		 writeStoreInDB();
  	   	 });

  	   	 function writeStoreInDB() {
  	   		 var user_country = $( "#selectCountry option:selected").text();
  	   		 var salutation = $( "#selectAnrede option:selected").text();
  	   		 var user_firstname = document.getElementById("user_firstname").value;
  	   		 var user_lastname = document.getElementById("user_lastname").value;
  	   		 var user_email = document.getElementById("user_email").value;
  	   		 var phone = document.getElementById("user_phone").value;
  	   		 var role = $( "#selectRole option:selected").text();
  	   	
  	   		//alert (salutation + user_firstname + user_lastname + user_email + role );
  	   			
  	   		
  	   	 $.ajax({
  	   	   	 type: 'POST',
  	   	   	 contentType: 'application/json',
  	   	   	 url: host+'/services/users/createUser',
  	   	   	 dataType: "json",
  	   	   	 data: JSON.stringify({
  	   	   		 "country": user_country,
  	   	   		 "salutation": salutation,
  	   	   		 "firstname": user_firstname,
  	   	   		 "lastname": user_lastname,
  	   	   		 "email": user_email,
  	   	   		 "phone": phone,
  	   	   		 "role": role
  		 		}),
  	   	   	 success: function(data){   	   	
  	   	   		 
  	   	   	$('#anzfeld').load('home.html');

  	   	   	 },
  	   	   	 error: function(jqXHR, textStatus, errorThrown){
  	   	   	 alert('User anlegen error: ' + textStatus);
  	   	   	 }
  	   	   	 });
  	  }
	
  	   	 
  	   	 
  	   	 
	/////////////////////Stores aus der DB Laden für die Anzeigeauswahl////////////////////////
	
  	   $('#btnEditShowUsers').unbind('click').click(function(){		
  		   //editUsersShowContent(); 
  		   $('#anzfeld').load('Users_WebContent/editShowUsers.html');
  	    });	 
  	   	 
  	   
  	   	/* 
  	   function editUsersShowContent() {
	        
	        $.ajax({
	 		    dataType: 'json',
	 		    success: function(data) {
	 		    	$('#editShowUsers').find('option').remove().end();
	 		    	for(var i=0;i<data.getAllUsers.length;i++){
	 		    		$("#editShowUsers").append($("<option value='"+data.getAllUsers[i].ID+"'>"+data.getAllUsers[i].firstname +" " + data.getAllUsers[i].lastname +"</option><br>"));
	 		    	}
	 		    },
	 		    	url: host+'/services/users/getAllUsers'
	        });
	        
	     } 
  	   */
  	$('#btnEditUser').unbind('click').click(function(){		
  		   editUser();   		  
  	    });	 
  	   	  
function editUser(){
    	   	
    	 var editUserID = $( "#editShowUsersToCountry option:selected").val();
    	 //alert(editUserID);   		   	 
    	
    	 $.ajax({
           	 type: 'POST',
           	 contentType: 'application/json',
           	 url: host+'/services/users/editShowUser',
           	 dataType: "json",
           	 data: JSON.stringify({"id": editUserID
           	 		}),
           	 success: function(data){

           		var editUserID = data.id;
           		var editCountry = data.country;
           		var Anrede = data.salutation;
           		var Vorname = data.firstname;
           		var Nachname = data.lastname;
           		var Email = data.email;
           		var Telefon = data.phone;
           		var Role = data.role;
           		
           		localStorage.setItem("editUserID", editUserID);
           		localStorage.setItem("editCountryID", editCountry);
            	localStorage.setItem("editAnrede", Anrede);
            	localStorage.setItem("editVorname", Vorname);
            	localStorage.setItem("editNachname", Nachname);
            	localStorage.setItem("editEmail", Email);
            	localStorage.setItem("editTelefon", Telefon);
            	localStorage.setItem("editRole", Role);
            	

            	$('#anzfeld').load('Users_WebContent/editUser.html'); 
      
           	 },
           	 error: function(textStatus){
           	 alert('Problem beim Oeffnen des Editierens von Users: ' + textStatus);
           	 }
           	 });   	 
     }
  	   



	$('#btnEditUserInDB').unbind('click').click(function(){		
		   editUserInDB(); 
		  
	    });	 
	   	  
	function editUserInDB(){
 	   	
			 var editID = document.getElementById("editUserId").value;
			 var editUser_country = $( "#editSelectCountry option:selected").text();
			 var salutation = $( "#editSelectAnrede option:selected").text();
	   		 var user_firstname = document.getElementById("editUser_firstname").value;
	   		 var user_lastname = document.getElementById("editUser_lastname").value;
	   		 var user_email = document.getElementById("editUser_email").value;
	   		 var phone = document.getElementById("editUser_phone").value;
	   		 var role = $( "#editSelectRole option:selected").text();
	
 		   	 
 	 $.ajax({
        	 type: 'POST',
        	 contentType: 'application/json',
        	 url: host+'/services/users/editUser',
        	 dataType: "json",
        	 data: JSON.stringify({"id": editID,
        		 "country": editUser_country,
        		 "salutation": salutation,
  	   	   		 "firstname": user_firstname,
  	   	   		 "lastname": user_lastname,
  	   	   		 "email": user_email,
  	   	   		 "phone": phone,
  	   	   		 "role": role
        	 		}),
        	 success: function(data){
        		 
        		localStorage.removeItem("editUserID");
        		localStorage.removeItem("editCountryID");
             	localStorage.removeItem("editAnrede");
             	localStorage.removeItem("editVorname");
             	localStorage.removeItem("editNachname");
             	localStorage.removeItem("editEmail");  
             	localStorage.removeItem("editTelefon");      	
             	localStorage.removeItem("editRole");      	

         	$('#anzfeld').load('home.html'); 
   
        	 },
        	 error: function(textStatus){
        	 alert('Problem beim User editieren: ' + textStatus);
        	 }
        	 });
 	 
  }


  	   
  	 //LÖSCHEN VON SENSORDATEN
  	   
  	 $('#btnDeleteUser').unbind('click').click(function(){		
  		//deleteUserShowContent();
  		 $('#anzfeld').load('Users_WebContent/deleteShowUser.html');
     });	   
  	   
	/*
  	function deleteUserShowContent() {
        $.ajax({
 		    dataType: 'json',
 		    success: function(data) {
 		    	$('#deleteShowUsers').find('option').remove().end();
 		    	for(var i=0;i<data.getAllUsers.length;i++){
 		    		$("#deleteShowUsers").append($("<option value='"+data.getAllUsers[i].ID+"'>"+data.getAllUsers[i].firstname +" " + data.getAllUsers[i].lastname +"</option><br>"));
 		    	}
 		    },
 		    	url: host+'/services/users/getAllUsers'
        });
     } 
  	*/
  	
	 $('#btnDeleteUserFromDB').unbind('click').click(function() {
    	 delUserFromDB();
		 return false;
    	 });

    	 function  delUserFromDB(){
    		 
    	 var UserIdToDelete = $('#deleteShowUsersToCountry option:selected').val();
    		 

    		if(confirm("Wollen Sie diesen Nutzer wirklich loeschen!!!!")){
    			   			 
    	    	 $.ajax({
    	    	 type: 'POST',
    	    	 contentType: 'application/json',
    	    	 url: host+'/services/users/deleteUser',
    	    	 dataType: "json",
    	    	 data: JSON.stringify({"id": UserIdToDelete
    			 		}),
    	    	 success: function(data, textStatus, jqXHR){
    	    	 alert('User wurde erfolgreich geloescht');

    	    	 },
    	    	 error: function(jqXHR, textStatus, errorThrown){
    	    	 alert('User Loeschen error: ' + textStatus);
    	    	 }
    	    	 });
    	    	 $('#anzfeld').load('home.html');
    			    	}
    		return false;  
    	 }
 
    	 
    	 
//////////////////////////////
// ENDE  	 
        		
});

