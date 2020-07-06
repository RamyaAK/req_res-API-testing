/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const fs = require('fs-extra');
const path = require('path');

function getCongByFile(file) {
  const pathToCongFile = path.resolve('cypress/', 'config', `${file}.json`);
  return fs.readJson(pathToCongFile)
}

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      launchOptions.args.push('--auto-open-devtools-for-tabs');
      return launchOptions;
    }
    config=>{
      const file = config.env.configFile;
      return getCongByFile(file);
    }
  });
};
