import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://tu-backend.up.railway.app',
  imagenesUrl: 'https://tu-backend.up.railway.app/imagenesAplicativo/'
};
