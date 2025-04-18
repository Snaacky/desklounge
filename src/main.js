const { app, BrowserWindow, nativeImage, shell } = require('electron');
const { loadConfig } = require("./config")
const { baseIcon, unreadIcon } = require("./consts")
const { errorQuit } = require("./helpers")
const { createTray, getTray } = require("./tray")

const config = loadConfig();

function createWindow() {
    // create new browser window object
    win = new BrowserWindow({
        title: "The Lounge",
        width: config.width,
        height: config.height,
        autoHideMenuBar: true,
        icon: baseIcon,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    // load thelounge url in electron browser
    win.loadURL(config.url);
    
    // scrape notification count from <title> and update systray icon when necessary
    win.webContents.on('page-title-updated', (_event, title) => {
        const count = parseInt((title.match(/^\((\d+)\)/) || [])[1]) || 0;
        const tray = getTray();
        tray.setToolTip(title);
        tray.setImage(nativeImage.createFromPath(count > 0 ? unreadIcon : baseIcon));
        tray.setTitle('');
    });

    // open links in the default os browser, not in electron
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
      
    // minimize to tray on close instead of actually closing
    win.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            win.hide();
        }
    });

    // only allow one instance of the app to run at a time
    // force close any additional ones and focus on the first instance instead
    const isFirstInstance = app.requestSingleInstanceLock();
    if (!isFirstInstance) {
        app.quit();
    } else {
        app.on('second-instance', (_event, _commandLine, _workingDirectory) => {
            if (win.isMinimized()) {
                win.restore();
            }
            win.focus();
        });
    }

    return win;
}

// initalize application
app.whenReady().then(() => {
    win = createWindow();
    createTray(win);
}).catch(error => {
    errorQuit(`Application failed to initialize: ${error.message}`);
});

// event listener required so it actually quits when we quit
app.on('before-quit', () => { app.isQuiting = true; });
