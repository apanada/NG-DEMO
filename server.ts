const RestProxy = require('sp-rest-proxy');
import { IProxySettings } from 'sp-rest-proxy/dist/RestProxy';

const settings: IProxySettings = {
    configPath: './config/private.json',
    port: 8080 // Local server port
};
const restProxy = new RestProxy(settings);
restProxy.serve();

const commonSettings: IProxySettings = {
    configPath: './config/common.json',
    port: 8081 // Local server port
};

const commonRestProxy = new RestProxy(commonSettings);
commonRestProxy.serve();