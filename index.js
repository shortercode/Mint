const POWERNAP = require('powernap.js');

const APP = new POWERNAP(8080);

const FILE_ENDPOINT = APP.staticEndpoint('/public/', './src');
