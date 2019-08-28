//init template aggiunta film dei risultati con Handlebars.js
var source   = document.getElementById("item-template").innerHTML;
var template = Handlebars.compile(source);
var content;

$(document).ready(init);

function init() {
    //Modalità READ : Carico tutti i Todo del server
    loadTodo();

    //Modalità CREATE
    $("#addTodo").click(createTodo);

    //Modalità DELETE
    $(document).on("click", ".delete", deleteTodo);
}

function clearTodo() {
	$(".box").remove();
}

function loadTodo() {
	//tolgo tutto quello che c'era prima
	clearTodo();

	//richiedo i dati aggiornati
	$.ajax({
		url: "http://157.230.17.132:3004/todos",
		method: "GET",
		success: function(data) {
			printTodo(data);
		},
		error: function() {
			console.log("Errore");
		}
	});
}

function printTodo (data) {
	console.log(data);

	//dove stampare i Todo
	var target = $(".results");

	//inserisco tutti i todo nel template per visualizzarli
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
	//bottone X che l'utente ha premuto
	var pressedButton = $(this);
	//tutto il todo (box + X + attività)
	var todoItem = pressedButton.parent();
	//ID di quell'elemento
	var id = todoItem.data("id");

	//cancello il todo passando l'ID giusto
	$.ajax({
		url: "http://157.230.17.132:3004/todos/" + id,
		method: "DELETE",
		success: function(data) {
			showInfoMessage("Elemento rimosso", "red");
			//rimuovo l'elemento intero dall'HTML
			todoItem.remove();
		},
		error: function() {
			console.log("Errore");
		}
	});
}

function createTodo() {
	//acquisisco il todo da inserire
	var input = prompt("Inserisci il To-do:");

	//spedisco il testo all'API che crea un nuovo todo
	$.ajax({
		url: "http://157.230.17.132:3004/todos/",
		method: "POST",
		data: {
			text: input
		},
		success: function(data) {
			showInfoMessage("Elemento aggiunto", "green");
			//chiedo la lista aggiornata dei todo
			loadTodo();
		},
		error: function() {
			console.log("Errore");
		}
	});
}

function showInfoMessage (message, color) {
	var duration = 2000;

	//coloro il messaggio
	$("#infoMessage").css("color", color);

	//lo mostro
	$("#infoMessage").text(message);

	//nascondilo dopo che passa il tempo di duration (ms)
	setTimeout(function() {
		$("#infoMessage").text("");
	}, duration);

}