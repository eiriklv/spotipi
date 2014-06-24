exports = module.exports = function (templates, api, io) {
    var socket = io.connect();

    function updateQueue () {
        api.queue.get(function (err, list) {
            $('#queue').empty().append(templates.queue.list(list));
        });
    }

    function addToQueue () {
        // get input value
        var inputField = $('#add-field');
        var inputValue = inputField.val();

        // send add event if input is present
        if(inputValue !== '') socket.emit('add', { uri: inputValue });

        // reset input field
        inputField.val('');
    }

    // bind onclick event to add button
    $('#add-button').click(function () {
        addToQueue();
    });

    // process input when pressing enter in add field
    $("#add-field").keyup(function (e) {
        if (e.keyCode == 13) addToQueue();
        e.preventDefault();
    });

    socket.on('update', updateQueue);

    updateQueue();
};