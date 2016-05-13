var socket = io();
var now = moment();

socket.on('connect', function() {
	console.log('Connected to the server!');
});

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New message: ', message.text);

	jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mma') + ' </strong>' + message.text + '</p>')
});

// Handle submitting new messages
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		timestamp: now
	});

	$message.val('');
});