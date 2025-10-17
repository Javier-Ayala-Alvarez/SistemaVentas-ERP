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
    icon: 'feather icon-activity',
    roles: ['ADMIN', 'FACTURA', 'GENERAL', 'SUPERADMIN'],
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/component/dashboard',
        icon: 'feather icon-pie-chart', // más representativo para dashboard
        roles: ['ADMIN', 'FACTURA', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'FacturasAdministrador',
        title: 'Factura-Administrador',
        type: 'item',
        url: '/component/administrador-factura',
        icon: 'feather icon-clipboard', // representa gestión documental
        roles: ['ADMIN', 'FACTURA', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'Facturas',
        title: 'Facturas',
        type: 'item',
        url: '/component/factura',
        icon: 'feather icon-file-text',
        roles: ['ADMIN', 'FACTURA', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'Cotizaciones',
        title: 'Cotizaciones',
        type: 'item',
        url: '/component/cotizaciones',
        icon: 'feather icon-file', // representa un documento general
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'Compras',
        title: 'Compras',
        type: 'item',
        url: '/component/compras',
        icon: 'feather icon-shopping-cart',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'Gastos',
        title: 'Gastos',
        type: 'item',
        url: '/component/gastos',
        icon: 'feather icon-credit-card',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'Cajas',
        title: 'Cajas',
        type: 'item',
        url: 'component/cajas',
        icon: 'feather icon-box', // más intuitivo para “Caja”
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'Remesas',
        title: 'Remesas',
        type: 'item',
        url: '/component/remesas',
        icon: 'feather icon-send', // mejor para remesas/envíos
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      }
    ]
  },
  {
    id: 'ficheros',
    title: 'Ficheros',
    type: 'group',
    icon: 'feather icon-archive', // mejor que database para ficheros
    roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
    children: [
      {
        id: 'basic',
        title: 'Productos',
        type: 'collapse',
        icon: 'feather icon-package',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: [
          {
            id: 'button',
            title: 'Inventario',
            type: 'item',
            url: '/component/Inventario',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          },
          {
            id: 'button',
            title: 'Productos',
            type: 'item',
            url: '/component/productos',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          },
          {
            id: 'badges',
            title: 'Categoria',
            type: 'item',
            url: '/component/categoria',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          },
          {
            id: 'badges',
            title: 'Unidades',
            type: 'item',
            url: '/component/unidades',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          }
        ]
      },
      {
        id: 'basic',
        title: 'Clientes',
        type: 'collapse',
        icon: 'feather icon-user-check', // más específico para clientes
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: [
          {
            id: 'button',
            title: 'Clientes',
            type: 'item',
            url: '/component/clientes',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          }
        ]
      },
      {
        id: 'basic',
        title: 'Proveedores',
        type: 'collapse',
        icon: 'feather icon-truck',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: [
          {
            id: 'button',
            title: 'Proveedores',
            type: 'item',
            url: '/component/proveedores',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          }
        ]
      },
      {
        id: 'basic',
        title: 'Configuración',
        type: 'collapse',
        icon: 'feather icon-settings', // mejor que package para configuración
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
      }
    ]
  },
  {
    id: 'Reportes',
    title: 'Reportes',
    type: 'group',
    icon: 'feather icon-bar-chart-2',
    roles: ['ADMIN', 'SUPERADMIN'],
    children: [
      {
        id: 'Proveedores',
        title: 'Proveedores',
        type: 'item',
        url: '/component/proveedores-reportes',
        classes: 'nav-item',
        icon: 'feather icon-truck',
        roles: ['ADMIN', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'Clientes',
        title: 'Clientes',
        type: 'item',
        url: '/component/clientes-reportes',
        classes: 'nav-item',
        icon: 'feather icon-user-check',
        roles: ['ADMIN', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'Ventas',
        title: 'Ventas',
        type: 'collapse',
        icon: 'feather icon-shopping-bag',
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
            external: false,
            roles: ['ADMIN', 'SUPERADMIN'],
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
    icon: 'feather icon-lock',
    roles: ['ADMIN', 'SUPERADMIN'],
    children: [
      {
        id: 'Usuarios',
        title: 'Usuarios',
        type: 'item',
        url: '/component/auth/signup',
        icon: 'feather icon-users', // plural para gestión de usuarios
        target: true,
        breadcrumbs: false,
        roles: ['ADMIN', 'SUPERADMIN'],
        children: []
      }
    ]
  }
];
