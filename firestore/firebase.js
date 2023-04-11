
const fs = require('firebase-admin');
const serviceAccount = require('../secrets/sa-beeerlian.json');

fs.initializeApp({
       credential: fs.credential.cert(serviceAccount)
});

module.exports = fs