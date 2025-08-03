import { Component } from '@angular/core';
import { EmpresaClass } from '../../clases/empresa-class';
import { EmpresaServicesService } from '../../services/empresa-services.service';
import { Router } from '@angular/router';
import { loadConfig, baseUrl, imagenes } from '../../services/helper';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent {
  empresas: EmpresaClass[] = []; 
  empresa: EmpresaClass = new EmpresaClass();
  selectedLogo: File | undefined; // Para almacenar el archivo de logo seleccionado
  imagenPreview: string | null = null; // Variable para almacenar la vista previa
  imagenRuta: string = "";
  constructor(private empresaServices: EmpresaServicesService, private router: Router) {}

  ngOnInit(): void {
   
    
    this.loadConfigAndEmpresa();
  }

  async loadConfigAndEmpresa(): Promise<void> {
    try {
      await loadConfig(); // Esperar que la configuración se cargue
      this.loadEmpresa(); // Ahora cargar la empresa después de la configuración
    } catch (error) {
      console.error("Error al cargar la configuración:", error);
    }
  }

  loadEmpresa(): void {
    this.imagenRuta = "";
    this.imagenRuta = imagenes;
    this.empresaServices.buscar().subscribe((dato: any) => {
      this.empresas = dato || [];  
      this.empresa = this.empresas[0] || new EmpresaClass(); // Asegurarse de que 'empresa' siempre tenga un valor válido
      // Si ya existe un logo en la base de datos, mostrarlo
      if (this.empresa.direccionLogo) {
        // Log para ver la URL generada
        this.imagenPreview = this.imagenRuta+this.empresa.direccionLogo; // Asignar la vista previa desde la base de datos

      }
    }, (error) => {
      console.error("Error al cargar los datos de la empresa:", error);
    });
  }

  guardar(): void {
    const formData = new FormData();
    // Verificar que selectedLogo no sea null y sea de tipo File
    if (this.selectedLogo) {
      formData.append('logo', this.selectedLogo);
    }
    this.empresaServices.modificar(this.empresa, formData).subscribe(
      (dato: any) => {
        this.empresas = dato || [];  
        this.empresa = this.empresas[0] || new EmpresaClass(); // Asegurarse de que 'empresa' siempre tenga un valor válido
        // Si ya existe un logo en la base de datos, mostrarlo
        if (this.empresa.direccionLogo) {
          // Log para ver la URL generada
          this.imagenPreview = this.imagenRuta+this.empresa.direccionLogo; // Asignar la vista previa desde la base de datos
  
        }      },
      (error) => {
      }
    );
  }

  onLogoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.selectedLogo = input.files[0]; // Guardar el archivo seleccionado
      // Leer el archivo y generar una vista previa
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = e.target?.result as string; // Asignar la vista previa del archivo
      };
      reader.readAsDataURL(this.selectedLogo);
    }
  }
}
