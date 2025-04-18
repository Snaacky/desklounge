const fs = require('fs');
const path = require('path');
const helpers = require("./helpers");

// attempts to load and parse the config.json from the relative path
function loadConfig() {
    const configPath = path.join(path.resolve("."), 'config.json');
    if (!fs.existsSync(configPath)) helpers.errorQuit(`config.json not found at ${configPath}.`);

    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (!config.url) helpers.errorQuit('config.json is missing the "url" key-value.');
        if (!config.width) helpers.errorQuit('config.json is missing the "width" key-value.');
        if (!config.height) helpers.errorQuit('config.json is missing the "height" key-value.');
        return config;
    } catch (error) {
        helpers.errorQuit(`Failed to parse config.json: ${error.message}.`);
    }
}

module.exports = { loadConfig }