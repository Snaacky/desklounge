# desklounge
An unofficial desktop app wrapper for TheLounge

## Features
* Desktop-esque user experience for TheLounge
* Close to system tray
* System tray notification icon
* Open links in native web browser

## Setup
Fill out the following `config.json` and place it in the same folder as the application:
```json
{
    "url": "https://thelounge.domain.tld",
    "width": 1200, 
    "height": 800
}
```

## Screenshot
![LP4Py41dhm](https://github.com/user-attachments/assets/681de4fe-d63b-4710-9c99-9fc544217e19)

## Dependencies
* Windows
* NodeJS
* Electron
* Electron-Forge

## Build
1. `git clone git@github.com:Snaacky/desklounge.git`
2. `cd desklounge`
3. `npm install`
4. `npx electron-forge make`
