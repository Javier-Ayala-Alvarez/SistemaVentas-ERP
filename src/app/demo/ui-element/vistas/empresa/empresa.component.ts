import { Component } from '@angular/core';
import { EmpresaClass } from '../../clases/empresa-class';
import { EmpresaServicesService } from '../../services/empresa-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent {
  empresas: EmpresaClass[] = []; 
  empresa: EmpresaClass = new EmpresaClass();
  selectedLogo: File | undefined ; // Para almacenar el archivo de logo seleccionado


  constructor(private empresaServices: EmpresaServicesService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmpresa();
  }

  loadEmpresa() {
    this.empresaServices.buscar().subscribe((dato: any) => {
      this.empresas = dato || [];  
      this.empresa = this.empresas[0];  
      console.log(this.empresa);
    });
  }
 
  

 

  guardar() {
    const formData = new FormData();
  
    // Verificar que selectedLogo no sea null y sea de tipo File
    if (this.selectedLogo) {
      formData.append('logo', this.selectedLogo);
    } else {
      // Si no hay archivo, puedes mostrar un mensaje o manejarlo de otra manera
      console.error('No se ha seleccionado un archivo');
      return;
    }
    this.empresaServices.modificar(this.empresa, formData).subscribe(
      (dato: any) => {
        this.loadEmpresa();
      }
    );
   
  }

  
  
  onLogoSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedLogo = input.files[0]; // Guardar el archivo seleccionado
    }
  }
}
