const fs = require('fs');
const path = require('path');
const secret = require('secret');

module.exports = () => {
    const data = fs.readFileSync(path.resolve(__dirname, '../secrets/keys.json'), 'utf8');
    const parsedData = JSON.parse(data);

    secret.set('connString', parsedData.localConnString);
    secret.set('hashSecret', parsedData.hashSecret);
    
    secret.set('app_id', parsedData.app_id);
    secret.set('app_key', parsedData.app_key);
    
    secret.set('admin_email', parsedData.admin_email);
    secret.set('admin_name', parsedData.admin_name);
    secret.set('admin_password', parsedData.admin_password);
}