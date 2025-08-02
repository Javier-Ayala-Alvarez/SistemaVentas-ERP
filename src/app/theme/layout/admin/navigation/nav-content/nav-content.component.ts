// angular import
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

// project import
import { environment } from 'src/environments/environment';
import { NavigationItem, NavigationItems } from '../navigation';
import { LoginServicesService } from 'src/app/demo/ui-element/services/login-services.service';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  // public props
  navigations: NavigationItem[] = [];
  wrapperWidth!: number;
  windowWidth: number;

  @Output() NavMobCollapse = new EventEmitter();

  // constructor
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private loginService: LoginServicesService
  ) {
    this.windowWidth = window.innerWidth;
    const userRole = this.loginService.getUserRole(); // Obtener rol actual del usuario
    this.navigations = this.filterNavigationItems(NavigationItems, userRole!);
  }

  // life cycle event
  ngOnInit() {
    if (this.windowWidth < 992) {
      document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
    }
  }

  // Método para colapsar el menú en dispositivos móviles
  navMob() {
    if (
      this.windowWidth < 992 &&
      document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')
    ) {
      this.NavMobCollapse.emit();
    }
  }

  // Método para activar el ítem del menú actual
  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('pcoded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('pcoded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('pcoded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  // Método para filtrar los ítems del menú según el rol del usuario
  private filterNavigationItems(items: NavigationItem[], role: string): NavigationItem[] {
    return items
      .map(item => {
        // Asegurarse de que 'children' sea siempre un array vacío si no está definido
        const children = item.children ? this.filterNavigationItems(item.children, role) : [];
  
        // Determinamos si el ítem debe ser visible en función del rol
        const isVisible = !item.roles || item.roles.includes(role);
  
        // Si es visible o tiene hijos visibles, lo devolvemos con los hijos filtrados
        if (isVisible || children.length > 0) {
          return {
            ...item,
            // Siempre asignamos 'children' como un array (vacío si no tiene hijos)
            children: children.length > 0 ? children : undefined
          };
        }
  
        // Si no es visible ni tiene hijos, devolvemos null
        return null;
      })
      // Filtramos los valores nulos y aseguramos que el tipo sea NavigationItem
      .filter((item): item is NavigationItem => item !== null);
  }
  
  
  
  
  
}
