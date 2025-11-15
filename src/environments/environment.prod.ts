import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://sistema-de-venta-erp-back-production.up.railway.app/',
  imagenesUrl: 'https://sistema-de-venta-erp-back-production.up.railway.app/imagenesAplicativo/'
};
