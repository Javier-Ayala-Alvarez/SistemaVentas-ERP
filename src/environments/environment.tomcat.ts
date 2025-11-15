import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'http://192.168.0.100:8080/venta-0.0.1-SNAPSHOT',
  imagenesUrl: 'http://192.168.0.100:8080/venta-0.0.1-SNAPSHOT/imagenesAplicativo/'
};
