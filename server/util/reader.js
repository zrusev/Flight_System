const fs = require('fs');
const path = require('path');
const secret = require('secret');

module.exports = () => {
    const data = fs.readFileSync(path.resolve(__dirname, '../secrets/keys.json'), 'utf8');
    const parsedData = JSON.parse(data);

    secret.set('app_id', parsedData.app_id);
    secret.set('app_key', parsedData.app_key);
}