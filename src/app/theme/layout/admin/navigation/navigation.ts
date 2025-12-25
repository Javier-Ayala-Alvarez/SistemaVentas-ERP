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
  children: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  // ===================== OPERACIONES =====================
  {
    id: 'operaciones',
    title: 'Operaciones',
    type: 'group',
    icon: 'feather icon-activity',
    roles: ['ADMIN', 'FACTURA', 'GENERAL', 'SUPERADMIN'],
    children: [
      {
        id: 'dashboard',
        title: 'Consulta Precios',
        type: 'item',
        url: '/component/dashboard',
        icon: 'feather icon-search', // Nuevo ícono más representativo
        roles: ['ADMIN', 'FACTURA', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'facturas-admin',
        title: 'Facturas Admin',
        type: 'item',
        url: '/component/administrador-factura',
        icon: 'feather icon-clipboard',
        roles: ['ADMIN', 'FACTURA', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'facturas',
        title: 'Facturas',
        type: 'item',
        url: '/component/factura',
        icon: 'feather icon-file-text',
        roles: ['ADMIN', 'FACTURA', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'cotizaciones',
        title: 'Cotizaciones',
        type: 'item',
        url: '/component/cotizaciones',
        icon: 'feather icon-edit',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'compras',
        title: 'Compras',
        type: 'item',
        url: '/component/compras',
        icon: 'feather icon-shopping-cart',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'gastos',
        title: 'Gastos',
        type: 'item',
        url: '/component/gastos',
        icon: 'feather icon-credit-card',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'cajas',
        title: 'Cajas',
        type: 'item',
        url: '/component/cajas',
        icon: 'feather icon-briefcase',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'remesas',
        title: 'Remesas',
        type: 'item',
        url: '/component/remesas',
  icon: 'fas fa-money-bill-wave',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      }
    ]
  },

  // ===================== FICHEROS =====================
  {
    id: 'ficheros',
    title: 'Ficheros',
    type: 'group',
    icon: 'feather icon-folder',
    roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
    children: [
      {
        id: 'productos',
        title: 'Productos',
        type: 'collapse',
        icon: 'feather icon-package',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: [
          {
            id: 'inventario',
            title: 'Inventario',
            type: 'item',
            url: '/component/Inventario',
            icon: 'feather icon-layers',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          },
          {
            id: 'productos-item',
            title: 'Productos',
            type: 'item',
            url: '/component/productos',
            icon: 'feather icon-list',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          },
          {
            id: 'categorias',
            title: 'Categorías',
            type: 'item',
            url: '/component/categoria',
            icon: 'feather icon-tag',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          },
          {
            id: 'unidades',
            title: 'Unidades',
            type: 'item',
            url: '/component/unidades',
            icon: 'feather icon-shuffle',
            roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
            children: []
          }
        ]
      },
      {
        id: 'clientes',
        title: 'Clientes / Crédito',
        type: 'item',
        url: '/component/clientes',
        icon: 'feather icon-user-check',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'proveedores',
        title: 'Proveedores',
        type: 'item',
        url: '/component/proveedores',
        icon: 'feather icon-truck',
        roles: ['ADMIN', 'GENERAL', 'SUPERADMIN'],
        children: []
      },
      {
        id: 'configuracion',
        title: 'Configuración',
        type: 'collapse',
        icon: 'feather icon-settings',
        roles: ['ADMIN', 'SUPERADMIN'],
        children: [
          {
            id: 'empresa',
            title: 'Empresa',
            type: 'item',
            url: '/component/empresa',
            icon: 'feather icon-briefcase',
            roles: ['ADMIN', 'SUPERADMIN'],
            children: []
          },
          {
            id: 'sucursal',
            title: 'Sucursal',
            type: 'item',
            url: '/component/sucursal',
            icon: 'feather icon-map-pin',
            roles: ['ADMIN', 'SUPERADMIN'],
            children: []
          }
        ]
      }
    ]
  },

  // ===================== REPORTES =====================
  {
    id: 'reportes',
    title: 'Reportes',
    type: 'group',
    icon: 'feather icon-bar-chart-2',
    roles: ['ADMIN', 'SUPERADMIN'],
    children: [
      {
        id: 'ventas',
        title: 'Ventas',
        type: 'collapse',
        icon: 'feather icon-shopping-bag',
        roles: ['ADMIN', 'SUPERADMIN'],
        children: [
          {
            id: 'ventas-fecha',
            title: 'Ventas por Fecha',
            type: 'item',
            url: '/component/ventas-fecha',
            icon: 'feather icon-calendar',
            roles: ['ADMIN', 'SUPERADMIN'],
            children: []
          },
          {
            id: 'kardex',
            title: 'Kardex',
            type: 'item',
            url: '/component/kardex',
            icon: 'feather icon-book',
            roles: ['ADMIN', 'SUPERADMIN'],
            children: []
          }
        ]
      }
    ]
  },

  // ===================== AUTH =====================
  {
    id: 'auth',
    title: 'Seguridad',
    type: 'group',
    icon: 'feather icon-lock',
    roles: ['ADMIN', 'SUPERADMIN'],
    children: [
      {
        id: 'usuarios',
        title: 'Usuarios',
        type: 'item',
        url: '/component/auth/signup',
        icon: 'feather icon-users',
        target: true,
        breadcrumbs: false,
        roles: ['ADMIN', 'SUPERADMIN'],
        children: []
      }
    ]
  }
];
