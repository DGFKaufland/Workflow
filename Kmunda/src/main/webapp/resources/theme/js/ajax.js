testHost = "winsrv212.win.hs-heilbronn.de:8080";
urlTestStandard = "http://winsrv212.win.hs-heilbronn.de:8080/rest/items/";
urlStandard = "http://" + window.location.host + "/rest/items/";
running = undefined;

ebenenNummer = 0;

TreeData = [ {
	name : "All",
	// link : "http://" + window.location.host + "/rest/items/",
	link : "http://" + testHost + "/rest/items",
	id : "All",
	ebene : ebenenNummer
} ];

groups = [];
Rooms = [];
Items = [];
Data = [];
ebenenNummer++;

$(document).ready(function() {
	// getItems();
});

function getItems(urlRest) {

	try {

		if ((!typeof urlRest === 'string' && !urlRest instanceof String)
				|| urlRest === null) {
			urlRest = urlStandard;
		}

		$
				.ajax({
					type : "GET",
					url : urlRest,
					data : {},
					headers : {},
					success : function(result) {
						if (!result.children) {
							// console.log("only result");
							// console.log(result);
							return;
						}
						var children = result.children[0].children;
						for (var i = 0; i < children.length; i++) {
							// members if its a group, not an item
							// if (children[i].localName == "members") {
							if (children[i].localName == "item") {

								if (children[i].children[0].innerHTML == "GroupItem") {
									TreeData
											.push({
												name : children[i].children[1].innerHTML,
												link : children[i].children[3].innerHTML,
												id : children[i].children[1].innerHTML,
												parent : children[1].innerHTML,
												ebene : ebenenNummer
											});
									if (groups
											.indexOf(children[i].children[1].innerHTML) === -1) {
										groups
												.push(children[i].children[1].innerHTML);

										var countRows = $('ul.dropdown-menu li')
												.size();
										$('.dropdown-menu')
												.append(
														'<li><a href="#" id="dropdown-link'
																+ children[i].children[1].innerHTML
																+ '">'
																+ children[i].children[1].innerHTML
																+ '</a></li>');
										countRows++;

										$('#dropdown-link1')
												.click(
														function(e) {
															e.preventDefault();
															getItemsForGroup(children[i].children[1].innerHTML);
														});

									}
								} else {
									var alreadyRegistered = false;
									for (var n = 0; n < Rooms.length; n++) {
										if (Rooms[n].name == children[1].innerHTML) {
											alreadyRegistered = true;
										}
									}
									// necessary for us if query with /All
									// var dataObj = {
									// room : children[1].innerHTML,
									// name : children[i].children[1].innerHTML,
									// link : children[i].children[3].innerHTML,
									// type : children[i].children[0].innerHTML,
									// status :
									// children[i].children[2].innerHTML
									// };

									// like this if query without /All

									if (children[i].children[1].innerHTML === "ctrl_systemstart"
											&& children[i].children[2].innerHTML === "Uninitialized") {
										running = false;

										var table = document
												.getElementById("itemsTable");
										var row = table
												.insertRow(table.children.length - 1);

										var cell1 = row.insertCell(0);

										cell1.innerHTML = "Openhab is not running!";

										return;
									}

									var dataObj = {
										room : children[1].innerHTML,
										name : children[i].children[1].innerHTML,
										link : children[i].children[3].innerHTML,
										type : children[i].children[0].innerHTML,
										status : children[i].children[2].innerHTML
									};

									if (!containsObject(dataObj, Data)) {
										Data.push(dataObj);
										addRow(createTableContent(dataObj));
									}

									if (alreadyRegistered == false) {
										Rooms.push({
											name : children[1].innerHTML
										});
										Items
												.push({
													room : children[1].innerHTML,
													name : children[i].children[1].innerHTML,
													link : children[i].children[3].innerHTML,
													type : children[i].children[0].innerHTML,
													status : children[i].children[2].innerHTML
												});
									} else {
										Items
												.push({
													room : children[1].innerHTML,
													name : children[i].children[1].innerHTML,
													link : children[i].children[3].innerHTML,
													type : children[i].children[0].innerHTML,
													status : children[i].children[2].innerHTML
												});
									}
								}
							}
						}
						for (var l = 0; l < TreeData.length; l++) {
							if (TreeData[l].ebene == ebenenNummer) {
								getItems(TreeData[l].link);
							}
						}
						ebenenNummer++;
						console.log(TreeData);
					}
				});
	} catch (e) {
		console.log(e);
	}
};

function getItemsforGroup(group) {

	try {
		$
				.ajax({
					type : "GET",
					url : urlStandard + group,
					data : {},
					headers : {},
					success : function(result) {
						if (!result.children) {
							// console.log("only result");
							// console.log(result);
							return;
						}
						var children = result.children[0].children;
						for (var i = 0; i < children.length; i++) {
							// members if its a group, not an item
							// if (children[i].localName == "members") {
							if (children[i].localName == "item") {

								if (children[i].children[0].innerHTML == "GroupItem") {
									TreeData
											.push({
												name : children[i].children[1].innerHTML,
												link : children[i].children[3].innerHTML,
												id : children[i].children[1].innerHTML,
												parent : children[1].innerHTML,
												ebene : ebenenNummer
											});
								} else {
									var alreadyRegistered = false;
									for (var n = 0; n < Rooms.length; n++) {
										if (Rooms[n].name == children[1].innerHTML) {
											alreadyRegistered = true;
										}
									}
									if (children[i].children[1].innerHTML === "ctrl_systemstart"
											&& children[i].children[2].innerHTML === "Uninitialized") {
										running = false;

										var table = document
												.getElementById("itemsTable");
										var row = table
												.insertRow(table.children.length - 1);

										var cell1 = row.insertCell(0);

										cell1.innerHTML = "Openhab is not running!";

										return;
									}

									var dataObj = {
										room : children[1].innerHTML,
										name : children[i].children[1].innerHTML,
										link : children[i].children[3].innerHTML,
										type : children[i].children[0].innerHTML,
										status : children[i].children[2].innerHTML
									};

									if (!containsObject(dataObj, Data)) {
										Data.push(dataObj);
										addRow(createTableContent(dataObj));
									}

									if (alreadyRegistered == false) {
										Rooms.push({
											name : children[1].innerHTML
										});
										Items
												.push({
													room : children[1].innerHTML,
													name : children[i].children[1].innerHTML,
													link : children[i].children[3].innerHTML,
													type : children[i].children[0].innerHTML,
													status : children[i].children[2].innerHTML
												});
									} else {
										Items
												.push({
													room : children[1].innerHTML,
													name : children[i].children[1].innerHTML,
													link : children[i].children[3].innerHTML,
													type : children[i].children[0].innerHTML,
													status : children[i].children[2].innerHTML
												});
									}
								}
							}
						}
						for (var l = 0; l < TreeData.length; l++) {
							if (TreeData[l].ebene == ebenenNummer) {
								console.log(Rooms);
								getItems(TreeData[l].link);
							}
						}
						ebenenNummer++;
						console.log(ebenenNummer);
					}
				});
	} catch (e) {
		console.log(e);
	}
};


// ajax-call to change states
function sendChanges(name, value) {

	console.log(urlStandard + name + "/state");
	console.log(value);

	$.ajax({
		type : "PUT",
		url : urlStandard + name + "/state",
		data : value,
		headers : {
			'Content-Type' : 'text/plain'
		},
		success : function(content) {
			console.log("Hey Mum, I'm on TV!");
			console.log(content);
		},
		error : function(err) {
			console.log("I got a horse, the horse is amazing");
			console.log(err);
		}
	});

	return false;
}
function sendCommand(name, value) {

	console.log(urlStandard + name + "/state");
	console.log(value);

	$.ajax({
		type : "POST",
		url : urlStandard + name,
		data : value,
		headers : {
			'Content-Type' : 'text/plain'
		},
		success : function(content) {
			console.log("Hey Mum, I'm on TV!");
			console.log(content);
		},
		error : function(err) {
			console.log("I got a horse, the horse is amazing");
			console.log(err);
		}
	});

	return false;
}


function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (list[i] === obj) {
			return true;
		}
	}

	return false;
}

function addRow(content) {

	var type = content[2];

	console.log(type);

	if (!document.getElementsByTagName)
		return;
	var table = document.getElementById("itemsTable");
	var row = table.insertRow(table.children.length - 1);

	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);

	cell1.innerHTML = content[0];

	if (content[1] === "Uninitialized") {
		cell2.innerHTML = "<p><img src=\"img/fragezeichen.png\" alt=\"Uninitialized\" width=\"50%\"></p>";
	}

	if (type === "SwitchItem") {
		if (content[1] === "ON") {
			cell2.innerHTML = "<p><img src=\"img/lightOn.png\" alt=\"On\" width=\"50%\"></p>";
			cell3.innerHTML = "<input type=\"checkbox\" id=\"" + content[0]
					+ "\" name=\"" + content[0] + "\" checked>";

			initialiseToggleButton(content[0]);

		} else if (content[1] === "OFF") {
			cell2.innerHTML = "<p><img src=\"img/lightOff.png\" alt=\"Off\" width=\"50%\"></p>";
			cell3.innerHTML = "<input type=\"checkbox\" id=\"" + content[0]
					+ "\" name=\"" + content[0] + "\">";

			initialiseToggleButton(content[0]);

		}
	} else if (type === "NumberItem" || type === "StringItem") {
		cell3.innerHTML = "<div class=\"input-group\">"
				+ "<input type=\"text\" class=\"form-control\" placeholder=\""
				+ content[1] + "\" aria-describedby=\"basic-addon2\" id=\""
				+ content[0] + "\">" + "</div>";

		initialiseKeyListener(content[0]);

	} else if (type === "DateTimeItem") {

		if (content[1] !== "Uninitialized") {
			cell2.innerHTML = "<p><img src=\"img/clock.png\" alt=\"Uninitialized\" width=\"50%\"></p>";
		}

		cell3.innerHTML = "<div class=\"form-group\">"
				+ "<div class='input-group date' id='"
				+ content[0]
				+ "'>"
				+ "<input type='text' class=\"form-control\" id='"
				+ content[0]
				+ "'/>"
				+ "<span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-calendar\"></span>"
				+ "</span>" + "</div>"
				+ "<button type=\"button\" class=\"btn btn-default\" name=\""
				+ content[0]
				+ "\"onClick=\"getDateChanges(this.name)\">Send</button>"
				+ "</div>";

		$(function() {
			$('#' + content[0]).datetimepicker();
		});

	}

	// cell1.appendChild(textnode1);
	// cell2.appendChild(textnode2);
	// cell3.appendChild(textnode3);
	// cell4.appendChild(textnode4);
	// cell5.appendChild(textnode5);
	// cell6.appendChild(textnode6);
	// cell7.appendChild(textnode7);
	// cell8.appendChild(textnode8);
	// cell9.appendChild(textnode9);
	//
	//
	// row.appendChild(cell1);
	// row.appendChild(cell2);
	// row.appendChild(cell3);
	// row.appendChild(cell4);
	// row.appendChild(cell5);
	// row.appendChild(cell6);
	// row.appendChild(cell7);
	// row.appendChild(cell8);
	// row.appendChild(cell9);
	//         
	// tabBody.appendChild(row);

}

function createTableContent(dataObj) {
	// 0 = name, 1 = OnOff, 2 Increase/Decrease, 3 Percent, 4 Open/Closed, 5
	// Decimal, 6 Up/Down, 7 Stop/Move, 8 String

	console.log(dataObj);

	var content = new Array();
	content[0] = dataObj.name;
	content[1] = dataObj.status;
	content[2] = dataObj.type;
	content[3] = "-";
	content[4] = "-";
	content[5] = "-";
	content[6] = "-";
	content[7] = "-";
	content[8] = "-";

	return content;
}

function getDateChanges(name) {
	var date = $("#" + name).find("input").val();
	console.log(date);
	if (date === "") {
		alert("Bitte geben Sie ein Datum an!");
		return;
	}
	sendChanges(name, date);
}

function initialiseKeyListener(name) {

	$("#" + name).keyup(function(event) {
		if (code !== 13) {
			console.log("uh oh");
			e.preventDefault();
		} else {
			console.log("got demm enter key");
		}
	});
}

function initialiseToggleButton(name) {
	$(function() {
		$("[name='" + name + "']").bootstrapSwitch();

		$("#" + name).on('switchChange.bootstrapSwitch',
				function(event, state) {

					var item = event.currentTarget.id;
					var itemState = undefined;
					if (state) {
						itemState = "ON";
					} else {
						itemState = "OFF";
					}

					sendCommand(item, itemState);
				});
	});
}

function initialiseTree() {
	$(function() {
		$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr(
				'title', 'Collapse this branch');
		$('.tree li.parent_li > span').on(
				'click',
				function(e) {
					var children = $(this).parent('li.parent_li').find(
							' > ul > li');
					if (children.is(":visible")) {
						children.hide('fast');
						$(this).attr('title', 'Expand this branch')
								.find(' > i').addClass('icon-plus-sign')
								.removeClass('icon-minus-sign');
					} else {
						children.show('fast');
						$(this).attr('title', 'Collapse this branch').find(
								' > i').addClass('icon-minus-sign')
								.removeClass('icon-plus-sign');
					}
					e.stopPropagation();
				});
	});
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1);
		if (c.indexOf(name) == 0)
			return c.substring(name.length, c.length);
	}
	return "";
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}