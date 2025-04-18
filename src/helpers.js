const { app, dialog } = require('electron');

// helper for displaying an error message and closing on config issues
function errorQuit(message) {
    dialog.showErrorBox('Error', message);
    app.quit();
}

module.exports = { errorQuit }