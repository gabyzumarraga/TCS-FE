import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Asset, AssetType } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
  styleUrls: ['./new-asset.component.css']
})
export class NewAssetComponent implements OnInit {

  areas!: AssetType[];
  tipos!: AssetType[];
  pisos: string[] = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  edificios: string[] = ['Centrum', 'Inluxor'];

  nuevoActivoForm: FormGroup = this.fb.group(
    {
      area: ['CTB', Validators.required],
      tipo: ['CPU/Portatil', Validators.required],
      edificio: ['Inluxor', Validators.required],
      piso: ['Piso 1', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      serie: ['', Validators.required],
      codigo_barras: ['', Validators.required],
      hostname: ['', Validators.required],
      direccion_mac: ['', [Validators.required, Validators.pattern('^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$')]],
      direccion_ip: ['', [Validators.required, Validators.pattern("^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\\d)|1?\\d?\\d)){4}$")]],
      reservada_ip: ['false', Validators.required],
      fecha_entrega: ['', Validators.required]
    }
  );

  activo: Asset = {};

  constructor(
    private activosService: ActivosService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewAssetComponent>
  ) { }

  ngOnInit(): void {
    // Areas
    this.activosService.getAreas()
      .subscribe({
        next: resp => this.areas = resp
      });

    // Types
    this.activosService.getTypes()
      .subscribe({
        next: resp => this.tipos = resp
      });
  }

  getCtrl(controlName: string) {
    return this.nuevoActivoForm.get(controlName);
  }

  clickMe() {
    this.activosService.sendClickEvent();
  }

  saveAsset() {

    if (this.nuevoActivoForm.get('tipo')?.value !== 'CPU/Portatil') {
      this.nuevoActivoForm.get('hostname')?.clearValidators();
      this.nuevoActivoForm.get('hostname')?.updateValueAndValidity();
      this.nuevoActivoForm.get('direccion_mac')?.clearValidators();
      this.nuevoActivoForm.get('direccion_mac')?.updateValueAndValidity();
      this.nuevoActivoForm.get('direccion_ip')?.clearValidators();
      this.nuevoActivoForm.get('direccion_ip')?.updateValueAndValidity();
      this.nuevoActivoForm.get('reservada_ip')?.clearValidators();
      this.nuevoActivoForm.get('reservada_ip')?.updateValueAndValidity();
    } else {
      this.nuevoActivoForm.get('hostname')?.setValidators([Validators.required]);
      this.nuevoActivoForm.get('hostname')?.updateValueAndValidity();
      this.nuevoActivoForm.get('direccion_mac')?.setValidators([Validators.required, Validators.pattern('^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$')]);
      this.nuevoActivoForm.get('direccion_mac')?.updateValueAndValidity();
      this.nuevoActivoForm.get('direccion_ip')?.setValidators([Validators.required, Validators.pattern("^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\\d)|1?\\d?\\d)){4}$")]);
      this.nuevoActivoForm.get('direccion_ip')?.updateValueAndValidity();
      this.nuevoActivoForm.get('reservada_ip')?.setValidators([Validators.required]);
      this.nuevoActivoForm.get('reservada_ip')?.updateValueAndValidity();
    }

    alert(this.nuevoActivoForm.valid);

    if (this.nuevoActivoForm.invalid) {
      this.nuevoActivoForm.markAllAsTouched();
      alert('xD!!!');
    } else {
      this.activo = this.nuevoActivoForm.value;
      const userC: User = this.userService.getUserData();
      this.activo.id_ultimatix = userC.id_numero_Ultimatix;

      Swal.fire({
        title: '¿Estás seguro de registrar el activo?',
        text: "",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.activosService
            .register(this.activo)
            .subscribe(
              {
                next: () => {
                  this.clickMe();
                  this.resetForm();
                  this.dialogRef.close();
                  Swal.fire('¡Éxito!', 'Activo registrado con éxito.', 'success');
                },
                error: err => Swal.fire('¡Error!', err.error.mensaje, 'error')
              }
            );
        }
      })
    }
  }

  resetForm() {
    this.nuevoActivoForm.reset(
      {
        area: ['CTB'],
        tipo: 'Computador',
        edificio: ['Inluxor'],
        piso: ['Piso 1'],
        reservada_ip: ['false'],
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
