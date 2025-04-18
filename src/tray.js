const { app, Menu, nativeImage, Tray } = require('electron');
const { baseIcon } = require("./consts")
const { errorQuit } = require("./helpers")

let tray;

function createTray(win) {
    // attempt to set tray icon to the base icon
    try {
        const icon = nativeImage.createFromPath(baseIcon);
        tray = new Tray(icon);
        tray.setToolTip("The Lounge");
    } catch(error) {
        errorQuit(`Error creating tray: ${error.message}.`);
    }

    // create the context menu when right clicking on the tray icon
    const menu = Menu.buildFromTemplate([
        {
            label: 'The Lounge',
            click: () => {
                if (win) {
                    if (!win.isVisible()) {
                        win.show();
                    }
                    if (win.isMinimized()) {
                        win.restore();
                    }
                    win.focus();
                }
            }
        },
        {
            label: 'Quit',
            click: () => {
                app.quit();
            }
        },
    ]);

    // set the newly created context menu to be the menu in use
    tray.setContextMenu(menu);

    // show/hide functionality when clicking on the icon
    tray.on('click', () => {
        if (!win.isVisible()) {
            win.show();
        }
        if (win.isMinimized()) {
            win.restore();
        }
        win.focus();
    });
}

function getTray() {
    return tray;
}

module.exports = { createTray, getTray }