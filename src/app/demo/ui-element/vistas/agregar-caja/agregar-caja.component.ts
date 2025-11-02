// component/cajas/agregar-caja/agregar-caja.component.ts
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { CajaClass } from '../../clases/caja-class';
import { CajasServicesService } from '../../services/cajas-services.service';
import { SucursalServicesService } from '../../services/sucursal-services.service';
import { SucursalClass } from '../../clases/sucursal-class';

@Component({
  selector: 'app-agregar-caja',
  templateUrl: './agregar-caja.component.html',
  styleUrls: ['./agregar-caja.component.scss']
})
export class AgregarCajaComponent implements OnInit {

  @Input() caja?: CajaClass;       // si viene desde el padre es edición

  modoEdicion = false;
  sucursales: SucursalClass[] = [];

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group(
    {
      id: [0],
      sucursal: [null as SucursalClass | null, [Validators.required]],

      fechaInicio: [null as string | null, [Validators.required]],
      horaInicio: [null as string | null, [Validators.required, this.hhmm24()]],

      fechaCierre: [null as string | null], // required dinámico en edición
      horaCierre: [null as string | null, this.hhmm24OrEmpty()],

      efectivoApertura: [null as number | null, [Validators.required, Validators.min(0)]],
      efectivoCierre: [null as number | null], // required dinámico en edición

      estado: [null as string | null]
    },
    {
      validators: [this.cierreDespuesDeInicio()]
    }
  );

  constructor(
    public activeModal: NgbActiveModal,
    private cajaService: CajasServicesService,
    private router: Router,
    private sucursalServices: SucursalServicesService
  ) {}

  ngOnInit(): void {
    this.modoEdicion = !!this.caja && !!this.caja.id;

    // Cargar sucursales y luego setear el valor correcto si es edición
    this.loadSucursal();

    // Inicializar el formulario con los datos (edición) o default (creación)
    if (this.modoEdicion && this.caja) {
      this.form.patchValue({
        id: this.caja.id ?? 0,
        sucursal: this.caja.sucursal ?? null,
        fechaInicio: this.toISODate(this.caja.fechaInicio),
        horaInicio: this.caja.horaInicio ?? null,
        fechaCierre: this.toISODate(this.caja.fechaCierre),
        horaCierre: this.caja.horaCierre ?? null,
        efectivoApertura: this.caja.efectivoApertura ?? null,
        efectivoCierre: this.caja.efectivoCierre ?? null,
        estado: this.caja.estado ?? null
      });
    } else {
      // valores por defecto en creación
      const hoyISO = this.toISODate(new Date());
      this.form.patchValue({
        fechaInicio: hoyISO,
        efectivoApertura: 0
      });
      // limpiar campos de cierre
      this.form.patchValue({
        fechaCierre: null,
        horaCierre: null,
        efectivoCierre: null
      });
    }

    // Aplicar validadores condicionales según modo
    this.actualizarValidadoresPorModo();
  }

  // ---------- VALIDADORES REUSABLES ----------

  private hhmm24(): ValidatorFn {
    const re = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return (c: AbstractControl): ValidationErrors | null => {
      const v = c.value;
      if (v == null || v === '') return { required: true };
      return re.test(v) ? null : { hhmm: true };
    };
  }

  private hhmm24OrEmpty(): ValidatorFn {
    const re = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return (c: AbstractControl): ValidationErrors | null => {
      const v = c.value;
      if (v == null || v === '') return null;
      return re.test(v) ? null : { hhmm: true };
    };
  }

  /** Validador a nivel de grupo: si es edición, exige cierre > inicio y presencia de campos de cierre */
  private cierreDespuesDeInicio(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const fg = group as FormGroup;
      // Podemos leer this.modoEdicion porque el validador es un método de instancia
      if (!this.modoEdicion) return null;

      const fi = fg.get('fechaInicio')?.value as string | null;
      const hi = fg.get('horaInicio')?.value as string | null;
      const fc = fg.get('fechaCierre')?.value as string | null;
      const hc = fg.get('horaCierre')?.value as string | null;

      // presencia de valores en edición
      if (!fi || !hi || !fc || !hc) {
        return { cierreInvalido: true }; // faltan datos de cierre o inicio
      }

      // formato hora ya validado en controles, igual verificamos parse
      const dIni = this.combine(fi, hi);
      const dFin = this.combine(fc, hc);
      if (!dIni || !dFin) return { cierreInvalido: true };

      return dFin > dIni ? null : { cierreNoPosterior: true };
    };
  }

  private combine(fechaISO: string, hhmm: string): Date | null {
    // fechaISO: 'YYYY-MM-DD'
    const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(hhmm ?? '');
    if (!m) return null;
    const d = new Date(fechaISO);
    if (isNaN(d.getTime())) return null;
    d.setHours(+m[1], +m[2], 0, 0);
    return d;
  }

  private toISODate(v: Date | string | null | undefined): string | null {
    if (!v) return null;
    const d = v instanceof Date ? v : new Date(v);
    if (isNaN(d.getTime())) return null;
    // a 'YYYY-MM-DD'
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
    // (si tu backend necesita zona/offset, maneja aparte)
  }

  // ---------- LÓGICA DE MODO Y VALIDADORES DINÁMICOS ----------

  private actualizarValidadoresPorModo(): void {
    const fechaCierre = this.form.get('fechaCierre');
    const horaCierre = this.form.get('horaCierre');
    const efectivoCierre = this.form.get('efectivoCierre');

    if (this.modoEdicion) {
      fechaCierre?.setValidators([Validators.required]);
      horaCierre?.setValidators([Validators.required, this.hhmm24()]);
      efectivoCierre?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      fechaCierre?.clearValidators();
      horaCierre?.clearValidators();
      efectivoCierre?.clearValidators();
      this.form.patchValue({
        fechaCierre: null,
        horaCierre: null,
        efectivoCierre: null
      });
    }

    fechaCierre?.updateValueAndValidity();
    horaCierre?.updateValueAndValidity();
    efectivoCierre?.updateValueAndValidity();

    // Revalidar el grupo por el validador cruzado
    this.form.updateValueAndValidity();
  }

  // ---------- SERVICIOS & ACCIONES ----------

  loadSucursal(): void {
    this.sucursalServices.buscar().subscribe((dato: SucursalClass[]) => {
      this.sucursales = dato;
      // si estamos en edición y ya teníamos id de sucursal, resincronizar objeto
      if (this.modoEdicion && this.caja?.sucursal?.id) {
        const sel = this.sucursales.find(s => s.id === this.caja!.sucursal!.id) ?? null;
        this.form.patchValue({ sucursal: sel });
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire('Campos requeridos', 'Por favor, corrige los campos marcados.', 'warning');
      return;
    }

    const payload: CajaClass = {
      ...this.caja, // conserva id si existía
      ...this.form.value
    };

    if (this.modoEdicion) {
      this.cajaService.modificar(payload.id ?? 0, payload).subscribe(() => {
        Swal.fire('Caja actualizada', 'La caja se modificó correctamente.', 'success');
        this.cerrarYRecargar();
      });
    } else {
      this.cajaService.agregar(payload).subscribe(() => {
        Swal.fire('Caja creada', 'La nueva caja se creó correctamente.', 'success');
        this.cerrarYRecargar();
      });
    }
  }

  cerrarYRecargar(): void {
    this.activeModal.close();
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/component/cajas']);
      });
    }, 200);
  }

  // ---------- GETTERS ÚTILES EN TEMPLATE ----------
  get f() { return this.form.controls; }
}
