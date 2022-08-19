import { Component } from '@angular/core';
import { RxjsService } from './services/rxjs.service';
import { delay, filter, forkJoin, from, interval, map, mergeMap, Observable, of, scan, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio-angular';
  profesores: any = [];
  cursos: any = [];
  alumnos: any[] = [];
  cursosSuscripcion: Subscription;
  cursos$: Observable<any>;



  
constructor(
  private rxjsService: RxjsService
){
  
    this.rxjsService.obtenerPromisesProfesores().then((profesores)=>{
    console.log(profesores)
    this.profesores = profesores
    }).catch((error) =>{
      console.log(error)
    })


    this.rxjsService.obtenerObservableProfesores().subscribe((profesores) => {
      console.log('Estoy desde el observable de profesores: ', profesores);
      this.profesores = profesores;
    });

    this.cursosSuscripcion = this.rxjsService.obtenerObservableCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });

    this.cursos$ = this.rxjsService.obtenerObservableCursos();

    console.log(this.cursos$);
  }

  //btn agregarProfesor
  agregarNuevoProfesor(){
    let curso = {
      id: 1,
      nombre: 'UI/UX',
      comision: '32450'
    }
    this.rxjsService.agregarNuevoCurso(curso);
  }
  
}

