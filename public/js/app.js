var socket = io();
var now = moment();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');


console.log(name, room); 

socket.on('connect', function() {
	console.log('Connected to the server!');
});

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	$message = jQuery('.messages');

	console.log('New message: ', message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mma') + ' </strong>' + '</p>');
	$message.append('<p>' + message.text + '<hr></p>');
});

// Handle submitting new messages
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		name: name
	});

	$message.val('');
});