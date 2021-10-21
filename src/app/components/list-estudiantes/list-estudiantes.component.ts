import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.css']
})
export class ListEstudiantesComponent implements OnInit {
  estudiantes: any[] = [];
  

  constructor(private _estudianteService: EstudianteService) {
    
  }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(){
    this._estudianteService.getEstudiantes().subscribe(data =>{
      this.estudiantes = [];
      data.forEach((element:any) => {
        this.estudiantes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.estudiantes);
    })
  }

}
