export interface NavigationItem {
   id: string;
  title: string;
  type?: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  roles?: string[];
  children: NavigationItem[]; // <-- opcional aquí
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Operaciones',
    type: 'group',
    icon: 'feather icon-activity', // Icono para operaciones generales
    roles: ['ADMIN', 'FACTURA','GENERAL','SUPERADMIN'],
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',

        url: '/component/dashboard',
        icon: 'feather icon-home',
         roles: ['ADMIN', 'FACTURA','GENERAL','SUPERADMIN'],
        children: [] 
      },
      {
        id: 'FacturasAdministrador',
        title: 'Factura-Administrador',
        type: 'item',
        url: '/component/administrador-factura',
        icon: 'feather icon-file-text',
         roles: ['ADMIN', 'FACTURA','GENERAL','SUPERADMIN'],
        children: [] 
      },
      {
        id: 'Facturas',
        title: 'Facturas',
        type: 'item',
        url: '/component/factura',
        icon: 'feather icon-file-text',
         roles: ['ADMIN', 'FACTURA','GENERAL','SUPERADMIN'],
        children: [] 
      },
      {
        id: 'Cotizaciones',
        title: 'Cotizaciones',
        type: 'item',
        url: '/component/cotizaciones',
        icon: 'feather icon-file-text',
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [] 
      },
      {
        id: 'Compras',
        title: 'Compras',
        type: 'item',
        url: '/component/compras',
        icon: 'feather icon-shopping-cart' ,
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [] 
      },
      {
        id: 'Gastos',
        title: 'Gastos',
        type: 'item',
        url: '/component/gastos',
        icon: 'feather icon-credit-card',
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [] 
      },
      {
        id: 'Cajas',
        title: 'Cajas',
        type: 'item',
        url: 'component/cajas',
        icon: 'feather icon-dollar-sign',
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [] 
      },
      {
        id: 'Remesas',
        title: 'Remesas',
        type: 'item',
        url: '/component/remesas',
        icon: 'feather icon-dollar-sign',
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [] 
      }
    ]
  },
  {
    id: 'ficheros',
    title: 'Ficheros',
    type: 'group',
    icon: 'feather icon-database', // Icono de base de datos para ficheros
    roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
    children: [
      {
        id: 'basic',
        title: 'Productos',
        type: 'collapse',
        icon: 'feather icon-package', // Icono de paquete para productos
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [
          {
            id: 'button',
            title: 'Productos',
            type: 'item',
            url: '/component/productos',
         roles: ['ADMIN','GENERAL','SUPERADMIN'],
        children: [] 
          },
          
          {
            id: 'badges',
            title: 'Categoria',
            type: 'item',
            url: '/component/categoria',
         roles: ['ADMIN','GENERAL','SUPERADMIN'],
        children: [] 
          },
          {
            id: 'badges',
            title: 'Unidades',
            type: 'item',
            url: '/component/unidades',
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [] 
          }
        ]
      },
      {
        id: 'basic',
        title: 'Clientes',
        type: 'collapse',
        icon: 'feather icon-users', // Icono de usuarios para clientes
        roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [
          {
            id: 'button',
            title: 'Clientes',
            type: 'item',
            url: '/component/clientes',
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [] 
          }
        ]
      },
      {
        id: 'basic',
        title: 'Proveedores',
        type: 'collapse',
        icon: 'feather icon-truck', // Icono de camión para proveedores
        roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [
          {
            id: 'button',
            title: 'Proveedores',
            type: 'item',
            url: '/component/proveedores',
         roles: ['ADMIN', 'GENERAL','SUPERADMIN'],
        children: [] 
          }
        ]
      },
      {
        id: 'basic',
        title: 'Configuración',
        type: 'collapse',
        icon: 'feather icon-package', // Icono de paquete para productos
        roles: ['ADMIN', 'SUPERADMIN'],
        children: [
          {
            id: 'button',
            title: 'Empresa',
            type: 'item',
            url: '/component/empresa',
         roles: ['ADMIN', 'SUPERADMIN'],
        children: [] 
          },
          {
            id: 'badges',
            title: 'Sucursal',
            type: 'item',
            url: '/component/sucursal',
         roles: ['ADMIN', 'SUPERADMIN'],
        children: [] 
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
    roles: ['ADMIN','SUPERADMIN'],
    children: [
      {
        id: 'Proveedores',
        title: 'Proveedores',
        type: 'item',
        url: '/component/proveedores-reportes',
        classes: 'nav-item',
        icon: 'feather icon-sidebar',
         roles: ['ADMIN', 'SUPERADMIN'],
        children: [] 
      },
      {
        id: 'Clientes',
        title: 'Clientes',
        type: 'item',
        url: '/component/clientes-reportes',
        classes: 'nav-item',
        icon: 'feather icon-sidebar',
         roles: ['ADMIN','SUPERADMIN'],
        children: [] 
      },
      {
        id: 'Ventas',
        title: 'Ventas',
        type: 'collapse',
        icon: 'feather icon-shopping-bag', // Icono de bolsa de compras para ventas
         roles: ['ADMIN', 'SUPERADMIN'],
        children: [
          {
            id: 'VentaFecha',
            title: 'Ventas Fecha',
            type: 'item',
            url: '/component/ventas-fecha',
            external: true,
         roles: ['ADMIN', 'SUPERADMIN'],
        children: [] 
          },
          {
            id: 'kardex',
            title: 'Kardex',
            type: 'item',
            url: '/component/kardex',
            external: true,
         roles: ['ADMIN','SUPERADMIN'],
        children: [] 
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
    roles: ['ADMIN', 'SUPERADMIN'],
    children: [
      {
        id: 'Usuarios',
        title: 'Usuarios',
        type: 'item',
        url: '/component/auth/signup',
        icon: 'feather icon-user', // Icono de usuario para gestión de usuarios
        target: true,
        breadcrumbs: false,
         roles: ['ADMIN','SUPERADMIN'],
        children: [] 
      }
    ]
  }
];
