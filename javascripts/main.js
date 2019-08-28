//init template aggiunta film dei risultati con Handlebars.js
var source   = document.getElementById("item-template").innerHTML;
var template = Handlebars.compile(source);
var content;

$(document).ready(init);

function init() {
    //Carico tutti i Todo del server
    loadTodo();

    //Modalità DELETE
    $(document).on("click", ".delete", deleteTodo);

    //Modalità CREATE
    $("#addTodo").click(createTodo);
}


function loadTodo() {
	$.ajax({
		url: "http://157.230.17.132:3004/todos",
		method: "GET",
		success: function(data) {
			printTodo(data);
		},
		error: function() {
			alert("Errore");
		}
	});
}

function printTodo (data) {
	console.log(data);

	//dove stampare i Todo
	var target = $(".results");

	for (var i in data) {
		var content = {
			id: data[i].id,
			text: data[i].text
		}
		var html = template(content);
		target.append(html);
	}
}

function deleteTodo() {
	//bottone premuto
	var pressedButton = $(this);
	//tutto il box (X + attività)
	var todoItem = pressedButton.parent();
	//ID di quell'elemento
	var id = todoItem.data("id");

	$.ajax({
		url: "http://157.230.17.132:3004/todos/" + id,
		method: "DELETE",
		success: function(data) {
			console.log("elemento rimosso");
			//rimuovo l'elemento intero dall'HTML
			todoItem.remove();
		},
		error: function() {
			console.log("Errore");
		}
	});
}

function createTodo() {
	var input = prompt("Inserisci il To-do:");

	$.ajax({
		url: "http://157.230.17.132:3004/todos/",
		method: "POST",
		data: {
			text: input
		},
		success: function(data) {
			console.log("elemento aggiunto");
			//setto il template per stampare a schermo
			var content = {
				id: data.id,
				text: data.text
			}
			var html = template(content);
			$(".results").append(html);
		},
		error: function() {
			alert("Errore");
		}
	});
}