import { Injectable } from '@angular/core';
import { Observable, Subject, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {
  profesores: any[] = [
    {id: 1, nombre: 'ivo', curso:'gym'},
    {id: 2, nombre: 'Karla', curso:'UX/UI'},
    {id: 3, nombre: 'luquitas', curso:'DJ'}
  ]
  cursos:any[] = []
  cursosSubject: Subject<any>
  alumnos: any[]=[
    {id:1, nombre: 'juan', curso:'UX/UI'},
    {id:2, nombre:'Fede', curso:'GYM'},
    {id:3,  nombre: 'Julian', curso:'DJ'}
  ]

  profesoresObservable: Observable<any>

  constructor() {
    this.cursosSubject = new Subject();
    
    this.profesoresObservable = new Observable<any>((suscriptor)=>{
      suscriptor.next(this.profesores)

      setTimeout(()=>{
        this.profesores.push({id: 4, nombre: 'Maxi', curso: 'Hipertrofia' },
        {id:5, nombre:'Rodrigo', curso:'DJ'});
        suscriptor.next(this.profesores);
      }, 3000)
    });
    }
    //promesas
    
  obtenerPromisesProfesores(){ 
    return new Promise((resolve, reject)=>{
      if(this.profesores.length > 0){
        console.log(this.profesores)
      }else{
        reject({
          codigo: 0,
        mensaje: 'No hay profesores'
        })
      }
    });
  }

  //observables

  obtenerObservableProfesores(){
    return this.profesoresObservable;
  }

  obtenerObservableCursos(){
    return this.cursosSubject.asObservable();
  }

  agregarNuevoCurso(curso: any){
    this.cursos.push(curso);
    this.cursosSubject.next(this.cursos);
    console.log(this.cursos);
  }

  obtenerObservableAlumnos(){
    return of(this.alumnos);
  }
}
