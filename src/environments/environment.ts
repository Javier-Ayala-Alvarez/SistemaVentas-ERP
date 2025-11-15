import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiUrl: 'http://localhost:8181',
  imagenesUrl: 'http://localhost:8181/imagenesAplicativo/'
};
