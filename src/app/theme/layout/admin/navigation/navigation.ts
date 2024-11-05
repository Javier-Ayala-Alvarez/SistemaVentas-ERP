export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Operaciones',
    type: 'group',
    icon: 'feather icon-activity', // Icono para operaciones generales
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/analytics',
        icon: 'feather icon-home' 
      },
      {
        id: 'FacturasAdministrador',
        title: 'Factura-Administrador',
        type: 'item',
        url: '/component/administrador-factura',
        icon: 'feather icon-file-text' // Icono relacionado con facturación
      },
      {
        id: 'Facturas',
        title: 'Facturas',
        type: 'item',
        url: '*',
        icon: 'feather icon-file-text'
      },
      {
        id: 'Compras',
        title: 'Compras',
        type: 'item',
        url: '*',
        icon: 'feather icon-shopping-cart' // Icono de carrito para compras
      },
      {
        id: 'Gastos',
        title: 'Gastos',
        type: 'item',
        url: '*',
        icon: 'feather icon-credit-card' // Icono de tarjeta para gastos
      },
      {
        id: 'Cajas',
        title: 'Cajas',
        type: 'item',
        url: '*',
        icon: 'feather icon-dollar-sign' // Icono de dinero para caja
      },
      {
        id: 'Remesas',
        title: 'Remesas',
        type: 'item',
        url: '*',
        icon: 'feather icon-dollar-sign' // Icono de dinero para caja
      }
    ]
  },
  {
    id: 'ficheros',
    title: 'Ficheros',
    type: 'group',
    icon: 'feather icon-database', // Icono de base de datos para ficheros
    children: [
      {
        id: 'basic',
        title: 'Productos',
        type: 'collapse',
        icon: 'feather icon-package', // Icono de paquete para productos
        children: [
          {
            id: 'button',
            title: 'Productos',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'badges',
            title: 'Unidades',
            type: 'item',
            url: '/component/badges'
          }
        ]
      },
      {
        id: 'basic',
        title: 'Clientes',
        type: 'collapse',
        icon: 'feather icon-users', // Icono de usuarios para clientes
        children: [
          {
            id: 'button',
            title: 'Clientes',
            type: 'item',
            url: '/component/button'
          }
        ]
      },
      {
        id: 'basic',
        title: 'Proveedores',
        type: 'collapse',
        icon: 'feather icon-truck', // Icono de camión para proveedores
        children: [
          {
            id: 'button',
            title: 'Proveedores',
            type: 'item',
            url: '/component/button'
          }
        ]
      },
      {
        id: 'basic',
        title: 'Configuración',
        type: 'collapse',
        icon: 'feather icon-package', // Icono de paquete para productos
        children: [
          {
            id: 'button',
            title: 'Empresa',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'badges',
            title: 'Sucursal',
            type: 'item',
            url: '/component/badges'
          }
        ]
      },
    ]
  },
  {
    id: 'Reportes',
    title: 'Reportes',
    type: 'group',
    icon: 'feather icon-bar-chart-2', // Icono de gráfico para reportes
    children: [
      {
        id: 'Proveedores',
        title: 'Proveedores',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'Clientes',
        title: 'Clientes',
        type: 'item',
        url: '*',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'Ventas',
        title: 'Ventas',
        type: 'collapse',
        icon: 'feather icon-shopping-bag', // Icono de bolsa de compras para ventas
        children: [
          {
            id: 'VentaFecha',
            title: 'Ventas Fecha',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'kardex',
            title: 'Kardex',
            type: 'item',
            url: 'javascript:',
            external: true
          }
        ]
      }
    ]
  },
  {
    id: 'Authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'feather icon-lock', // Icono de candado para autenticación
    children: [
      {
        id: 'Usuarios',
        title: 'Usuarios',
        type: 'item',
        url: '/auth/signup',
        icon: 'feather icon-user', // Icono de usuario para gestión de usuarios
        target: true,
        breadcrumbs: false
      }
    ]
  }
];
