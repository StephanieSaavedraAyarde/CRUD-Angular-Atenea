import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-estudiantes',
  templateUrl: './create-estudiantes.component.html',
  styleUrls: ['./create-estudiantes.component.css']
})
export class CreateEstudiantesComponent implements OnInit {

  createEstudiante: FormGroup;
  submitted = false;
  loading= false;

  constructor(private fb: FormBuilder, 
              private _estudianteService: EstudianteService, 
              private router: Router,
              private toastr: ToastrService) {

    this.createEstudiante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      ci: ['', Validators.required],
      carrera: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
    })
   }

  ngOnInit(): void {
  }

  agregarEstudiante(){
    this.submitted=true;
    this.loading=true;
    if(this.createEstudiante.invalid){
      return;
    }
    const estudiante: any = {
      nombre: this.createEstudiante.value.nombre,
      apellido: this.createEstudiante.value.apellido,
      ci: this.createEstudiante.value.ci,
      carrera: this.createEstudiante.value.carrera,
      telfono: this.createEstudiante.value.telefono,
      email: this.createEstudiante.value.email,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this._estudianteService.agregarEstudiante(estudiante).then(()=>{
      this.toastr.success("Estudiante registrado correctamente!", 'Estudiante registrado', {positionClass: 'toast-bottom-right'});
      this.router.navigate(['/list-estudiantes'])
    }).catch(error =>{
      console.log("ERROR");
    })
  }

}
