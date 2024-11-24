import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { EmpresaClass } from '../../clases/empresa-class';
import { EmpresaServicesService } from '../../services/empresa-services.service';

@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrl: './agregar-sucursal.component.scss'
})
export class AgregarSucursalComponent {

  sucursal: SucursalClass = new SucursalClass(); // Inicialización por defecto
  empresas?: EmpresaClass[];
  @Input() sucursalEditar?: SucursalClass; // Recibe la sucursal desde el componente principal

  constructor(public activeModal: NgbActiveModal, private sucursalServices: SucursalServicesService, private empresaServices: EmpresaServicesService) {}

  //Valores de inicio
  ngOnInit(): void {
    if (this.sucursalEditar) {
      this.sucursal = { ...this.sucursalEditar }; // Clonar para evitar modificar directamente el objeto original
    }
    this.loadEmpresa();
  }

  //Guardar Sucursal
  guardar(){
    if (this.sucursalEditar != null) {
      this.sucursalServices.modificar(this.sucursal.id ?? 0, this.sucursal).subscribe();
    } else {
      this.sucursalServices.agregar(this.sucursal).subscribe();
    }
  }

  //mostrar datos de la empresa
  loadEmpresa() {
    this.empresaServices.buscar().subscribe(
      (dato: any) => {
      this.empresas = dato;
      }
    );
  }


}
