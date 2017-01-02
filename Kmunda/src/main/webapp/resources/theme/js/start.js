function start(){
	
	deleteButtonId = 0;
	actualDiv = "",
	onoffswitchNumber = 0;

		require(["dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel", "dijit/Tree", "dojox/layout/GridContainer", "dijit/form/HorizontalSlider",
	"dijit/form/Button", "dijit/Dialog", "dijit/form/TextBox", "dijit/form/ComboBox", "dojox/layout/ExpandoPane"], 
	function(BorderContainer, ContentPane, Memory, ObjectStoreModel, Tree, GridContainer, HorizontalSlider, Button, Dialog, TextBox, ComboBox, ExpandoPane){
	
		window.onresize = function() {
			console.log("bla")
			dijit.byId(actualDiv.id + "-Gerät").set("style", {width: "100%"})
			dijit.byId(actualDiv.id + "-Szenario").set("style", {width: "100%"})
			dijit.byId(actualDiv.id + "-Status-Switch").set("style", {height: ""});
			dijit.byId(actualDiv.id + "-Status-Switch").set("style", {width: ""});
			console.log("blu")
		}
		ebenenNummer = 0;
		TreeData = [{name: "All", link: "http://" + window.location.host + "/rest/items/All", id: "All", ebene: ebenenNummer}];
		Rooms = [];
		Items = [];
		ebenenNummer++
		
		function getData(Url){
			var xhrArgs = {
				url: Url,
				handleAs: "xml",
				load: function(data){
				  //console.log(data);
				  var childs = data.children[0].children
				  for (var i = 0; i < childs.length; i++){
						if (childs[i].localName == "members") {
							if (childs[i].children[0].innerHTML == "GroupItem") {
								TreeData.push({name: childs[i].children[1].innerHTML, link: childs[i].children[3].innerHTML, id: childs[i].children[1].innerHTML, parent: childs[1].innerHTML, ebene: ebenenNummer});
							} else {
								var alreaddyRegistered = false;
								for (var n = 0; n < Rooms.length; n++){
									if (Rooms[n].name == childs[1].innerHTML){
										alreaddyRegistered = true
									}
								}
								if (alreaddyRegistered == false){
									Rooms.push({name: childs[1].innerHTML});
									Items.push({room: childs[1].innerHTML, name: childs[i].children[1].innerHTML, link: childs[i].children[3].innerHTML, type: childs[i].children[0].innerHTML, status: childs[i].children[2].innerHTML})
								} else {
									Items.push({room: childs[1].innerHTML, name: childs[i].children[1].innerHTML, link: childs[i].children[3].innerHTML, type: childs[i].children[0].innerHTML, status: childs[i].children[2].innerHTML})
								}
							}
						}
				  }
				  for (var l = 0; l < TreeData.length; l++){
						if (TreeData[l].ebene == ebenenNummer) {
							getData(TreeData[l].link);
						}
				  }
				  ebenenNummer++
				  //console.log(TreeData);
				},
				error: function(error){
				  console.log(error);
				}
			  }

		  // Call the asynchronous xhrGet
		  return dojo.xhrGet(xhrArgs);
	  }
	  
	  var deffered = getData("http://" + window.location.host + "/rest/items/All");
		
			var mainContainer = new BorderContainer({
			style: "width: 100%; height: 100%"}, "all");
			mainContainer.startup();
			
			var headerPane = new ContentPane({
			region: "top",
			style: "height: 60px;width: 100%;"});
			
			mainContainer.addChild(headerPane);
			
			var logoPane = new ContentPane({
			content: "<img style='height: 60px' src='img/hhn.jpg'>",
			style: "padding: 0px; display: inline-block"
			})
			
			var addButton = new Button({
				label: "<img src='img/add-icon-small.png'>",
				onClick: function(){
					addDialog.show();
				},
				style: "float: right;"
			});
			
			var dndButton = new Button({
				label: "<img src='img/schloss-zu.png'>",
				onClick: function(){
					if(dragAndDrop){
						this.setLabel("<img src='img/schloss-zu.png'>");
						dijit.byId(actualDiv.id + "-Gerät").disableDnd();
						dijit.byId(actualDiv.id + "-Szenario").disableDnd();
						dragAndDrop = false;
						for (var i = 0; i < deleteButtonId; i++){
							if(dijit.byId("deleteButton" + i)){
								dijit.byId("deleteButton" + i).set("style", {"display": "none"})
							}
						};
					}else{
						this.setLabel("<img src='img/schloss-offen.png'>");
						dijit.byId(actualDiv.id + "-Gerät").enableDnd();
						dijit.byId(actualDiv.id + "-Szenario").enableDnd();
						dragAndDrop = true;
						for (var i = 0; i < deleteButtonId; i++){
							if(dijit.byId("deleteButton" + i)){
								dijit.byId("deleteButton" + i).set("style", {"display": ""})
							}
						};
					}
				},
				style: "float: right;"
			});
			
			headerPane.addChild(logoPane);
			headerPane.addChild(addButton);
			headerPane.addChild(dndButton);
			
			addDialog = new Dialog({
				title: "Neues Gerät",
				style: "width: 400px"
			});
			
			var fieldsDialogPane = new ContentPane({
			style:"height: 150px;"
			})
			
			//no need now - for later use
			//label and Combobox for group
			// var groupComboBoxLabel = new ContentPane({
			// content: "Gruppe:",
			// style: "width: 30%;display:inline-block"
			// })
			
			 // var groupStore = new Memory({
				// data: [
					// {name:"Gerät"},
					// {name:"Gruppe"},
					// {name:"Szenario"}
				// ]
			// });

			// var groupComboBox = new ComboBox({
				// name: "typeComboBox",
				// value: "Gerät",
				// store: groupStore,
				// style: "display:inline-block; width: 200px; float: right;",
				// searchAttr: "name"
			// });
			
			//label and Combobox for type
			var typeComboBoxLabel = new ContentPane({
			content: "Type:",
			style: "width: 30%;display:inline-block"
			})
			
			 var typeStore = new Memory({
				data: [
					{name:"Light"},
					{name:"Heating"},
					{name:"Shutter"},
					{name:"Temperature"},
					{name:"Window"},
					{name:"Date"}
				]
			});

			var typeComboBox = new ComboBox({
				name: "typeComboBox",
				value: "Light",
				store: typeStore,
				style: "display:inline-block; width: 200px; float: right;",
				searchAttr: "name"
			});
			
			
			
			var nameTextBoxLabel = new ContentPane({
				content: "Name:",
				style: "width: 30%;display:inline-block"
			})
			
			var nameTextBox = new TextBox({
				name: "name",
				value: "",
				maxLength: 12,
				style: "display:inline-block; width: 200px; float: right;",
				placeHolder: "Name des Objekts"
			});
			
			var buttontypeComboBoxLabel = new ContentPane({
				content: "SchalterType:",
				style: "width: 30%;display:inline-block"
			})
			
			var buttontypeStore = new Memory({
				data: [
					{name:"Switch"},
					{name:"Rollershutter"},
					{name:"Contact"},
					{name:"Dimmer"},
					{name:"DateTime"},
					{name:"Color"},
					{name:"Number"}
				]
			});

			var buttontypeComboBox = new ComboBox({
				name: "typeComboBox",
				value: "Switch",
				store: buttontypeStore,
				style: "display:inline-block; width: 200px; float: right;",
				searchAttr: "name"
			});
			
			var buttonsDialogPane = new ContentPane({
			style:"height: 30px; width: 130px; float: center; position: relative; left: 125px"
			})
			
			var okButton = new Button({
				label: "OK",
				onClick: function(){
					addSomething("Gerät", typeComboBox.value, nameTextBox.value, buttontypeComboBox.value + "Item", actualDiv.id, "", "http://" + window.location.host + "/rest/items/" + typeComboBox.value + "_" + nameTextBox.value);
					var xhrArgs = {
								  url: "../itemconfiguration/ItemAdd",
								  content: {datentyp: buttontypeComboBox.value, itemname: typeComboBox.value + "_" + nameTextBox.value, itemstatus: "[%s]", itemgruppe: actualDiv.id},
								  handleAs: "xml",
								  headers: { "Content-Type": "text/plain" },
								  load: function(data){
								  console.log("success");
								},
								error: function(error){
								  console.log("fuck off");
								  console.log(error);
								  }
								}
								
					// Call the asynchronous xhrGet
					dojo.xhrGet(xhrArgs);
					addDialog.hide();
				},
				style: "float: middle;"
			});
			
			var cancelButton = new Button({
				label: "Cancel",
				onClick: function(){
					addDialog.hide();
				},
				style: "float: middle;"
			});
			
			addDialog.addChild(fieldsDialogPane);
			addDialog.addChild(buttonsDialogPane);
			// fieldsDialogPane.addChild(groupComboBoxLabel)
			// fieldsDialogPane.addChild(groupComboBox)
			fieldsDialogPane.addChild(typeComboBoxLabel)
			fieldsDialogPane.addChild(typeComboBox)
			fieldsDialogPane.addChild(nameTextBoxLabel)
			fieldsDialogPane.addChild(nameTextBox)
			fieldsDialogPane.addChild(buttontypeComboBoxLabel)
			fieldsDialogPane.addChild(buttontypeComboBox)
			
			buttonsDialogPane.addChild(okButton);
			buttonsDialogPane.addChild(cancelButton);
			
			var centerPane = new ContentPane({
			region: "center",
			style: "height: auto;width: auto;"});
			
			mainContainer.addChild(centerPane);
			
			var navigationPane = new ContentPane({
			id: "navigationPane",
			region: "left",
			style: "height: auto;width: 200px;"});
			
			mainContainer.addChild(navigationPane);
				
			deffered.then(function(data){
			setTimeout(function(){
			for (var i = 0; i < Rooms.length; i++){
			
				var cp1 = new ContentPane({
				id: Rooms[i].name,
				style: "height: auto; display: none;"
				});
				
				actualDiv = cp1;
				
				centerPane.addChild(cp1);
			
				 var raumStatusPane = new ContentPane({
						content: "Raum: " + Rooms[i].name,
						id: Rooms[i].name + "-Status",
						style: "height: 30px; background-color: #ff0000;"					
				 });
			 
				var checkbox = document.createElement('input');
				checkbox.type = "checkbox";
				checkbox.className = "onoffswitch-checkbox";
				checkbox.checked = "";
				checkbox.id = "onoffswitch" + onoffswitchNumber;

				this.checkbox = checkbox;

				var label = document.createElement('label');
				label.className = "onoffswitch-label";
				label.htmlFor = "onoffswitch" + onoffswitchNumber;

				var innerDiv = document.createElement('div');
				innerDiv.className = "onoffswitch-inner-status";

				var switchDiv = document.createElement('div');
				switchDiv.className = "onoffswitch-switch";

				label.appendChild(innerDiv);
				label.appendChild(switchDiv);

				var outerPane = new dijit.layout.ContentPane({
					'class': 'onoffswitch',
					id: Rooms[i].name + "-Status-Switch",
					style: "padding: 0px; float: right; position: relative; width: 90px; display: inline-block"

				});
				
				label.addEventListener('click', function onElementClick() {
					  var checkbox = dojo.byId(this.htmlFor);
					  if (checkbox.checked) {
						this.parentNode.parentNode.style.backgroundColor ="#FF0000"
					  } else {
						this.parentNode.parentNode.style.backgroundColor ="#00FF00"
					  }
					});
				
				outerPane.domNode.appendChild(checkbox);
				outerPane.domNode.appendChild(label);

			
				var switchdiv = "<div id='myonoffswitch" + onoffswitchNumber + "Div' class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='myonoffswitch" + onoffswitchNumber + "' checked>\
					<label class='onoffswitch-label' for='myonoffswitch" + onoffswitchNumber + "'><div class='onoffswitch-inner'></div><div class='onoffswitch-switch'></div></label></div>";
				onoffswitchNumber++;
				
				outerPane.placeAt(raumStatusPane);
		
			 var gridContainerGerät = new GridContainer({
					id: Rooms[i].name + "-Gerät",
					nbZones: 3,
					hasResizableColumns: false,
					allowAutoScroll: false,
					withHandles: true,
					dragHandleClass: 'dijitTitlePaneTitle',
					style: {height: "auto", width: "100%"},
					acceptTypes: ['Gerät']
				});
				
				var gridContainerSzenario = new GridContainer({
					id: Rooms[i].name + "-Szenario",
					nbZones: 3,
					hasResizableColumns: false,
					allowAutoScroll: false,
					withHandles: true,
					dragHandleClass: 'dijitTitlePaneTitle',
					style: {height: "auto", width: "100%"},
					acceptTypes: ['Szenario']
				});				
				
				cp1.addChild(raumStatusPane);
				cp1.addChild(gridContainerSzenario);
				cp1.addChild(gridContainerGerät);
				
				gridContainerGerät.startup();
				gridContainerGerät.resize();
				
				gridContainerSzenario.startup();
				gridContainerSzenario.resize();
				
				gridContainerGerät.disableDnd(); 
				gridContainerSzenario.disableDnd();
				
			}
			}, 1000);
			
			setTimeout(function(){
			for (var l = 0; l < Items.length; l++){
				addSomething("Gerät", Items[l].name.split("_")[0], Items[l].name, Items[l].type, Items[l].room, Items[l].status, Items[l].link)
			}
			}, 3000);
				
				dragAndDrop = false;
			var myStore = new Memory({
        data: TreeData,
        getChildren: function(object){
            return this.query({parent: object.id});
        }
    });

    // Create the model
    var myModel = new ObjectStoreModel({
        store: myStore,
        query: {id: 'All'}
    });

    // Create the Tree.
    var tree = new Tree({
        model: myModel,
		openOnClick: true,
		onClick: function(item, node, evt){
				if(actualDiv == dijit.byId(item.name)){return;}
				if (dijit.byId(item.name)){
					dijit.byId(item.name).set("style", {display: ""});
					actualDiv.set("style", {display: "none"});
					actualDiv = dijit.byId(item.name);
					dijit.byId(item.name + "-Gerät").set("style", {width: "100%"})
					dijit.byId(item.name + "-Szenario").set("style", {width: "100%"})
				}
		},
		showRoot: false
    });
    tree.placeAt("navigationPane");
	
	})

		})
	};
