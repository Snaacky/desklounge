const path = require('path');

// icons for windows taskbar and system tray
const baseIcon = path.join(__dirname, '..', 'assets', 'base.ico');
const unreadIcon = path.join(__dirname, '..', 'assets', 'unread.ico');

module.exports = { baseIcon, unreadIcon }