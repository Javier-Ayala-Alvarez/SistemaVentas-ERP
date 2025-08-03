import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SucursalClass } from '../../clases/sucursal-class';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { EmpresaClass } from '../../clases/empresa-class';
import { EmpresaServicesService } from '../../services/empresa-services.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agregar-sucursal',
  templateUrl: './agregar-sucursal.component.html',
  styleUrl: './agregar-sucursal.component.scss'
})
export class AgregarSucursalComponent {

  sucursalNuevo: SucursalClass = new SucursalClass(); // Inicialización por defecto
  empresas?: EmpresaClass[];
  @Input() sucursal?: SucursalClass; // Recibe la sucursal desde el componente principal

  constructor(public activeModal: NgbActiveModal, private sucursalServices: SucursalServicesService, private empresaServices: EmpresaServicesService, private router: Router, private datePipe: DatePipe
  ) {}

  //Valores de inicio
  ngOnInit(): void {
    if (this.sucursal) {
      this.sucursal.fecha = this.datePipe.transform(this.sucursal.fecha, 'yyyy-MM-dd') as string;
      this.sucursalNuevo = { ...this.sucursal }; // Copia los valores si está definido
    } else {
      this.sucursalNuevo = new SucursalClass(); // Asegura la inicialización
    }
    this.loadEmpresa();
  }
  

  //Guardar Sucursal
  guardar(){
    if (this.sucursal != null && this.sucursal.id != 0) {
      this.sucursalServices.modificar(this.sucursalNuevo.id ?? 0, this.sucursalNuevo).subscribe(() =>{
        this.cerrarYRecargar();
      });

    } else {
      this.sucursalServices.agregar(this.sucursalNuevo).subscribe(() =>{
        this.cerrarYRecargar();
      });
    }
    
  }
  cerrarYRecargar() {
    this.activeModal.close(); // Cierra el modal primero
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/sucursal']);
      });
    }, 200); // Retardo de 200ms para asegurarse de que el modal se cierra antes de la navegación
  }

  //mostrar datos de la empresa
  loadEmpresa() {
    this.empresaServices.buscar().subscribe(
      (dato: any) => {
        this.empresas = dato;
        // Si hay una sucursal y una empresa, la seleccionamos en el combo
        if (this.sucursalNuevo.empresa) {
          this.sucursalNuevo.empresa = this.empresas?.find(emp => emp.id === this.sucursalNuevo.empresa?.id);
        }
      }
    );
  }


}
