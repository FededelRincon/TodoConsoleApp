const Tarea = require('./tarea');

/**
 * _listado:
    *  {
    *      'uuid-95195195191: {       //mismo id en ambos.......
    *          id: 12,                 
    *          desc: asd,              //una descripcion
    *          completadoEn: 9987987   //fecha
    *      }
    *  }
 */

class Tareas {
    
    _listado = {};

    get listadoArr() {//getter

        const listado = [];
        Object.keys( this._listado ).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea )
        })


        return listado;
    }

    constructor(  ) {
        this._listado = {};
    }

    borrarTarea ( id = '' ) {

        if ( this._listado[id] /*si existe*/ ) {
            delete this._listado[id];
        }
    }


    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( (tarea) => {
            this._listado[tarea.id] = tarea;
        })


    }

    crearTarea ( desc = '' ) {

        const tarea = new Tarea( desc );    //al instanciar, tiene las 3 cosas de la tarea (id, desc y completado)
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log(' ');
        
        // const tareas = this._listado;   //{}
        const tareas = this.listadoArr;   //[]
        
        // console.log( tareas )
        tareas.forEach( ( tarea, i )=> {
            const { desc, completadoEn } = tarea;

            const index = `${ i +1 }`.green;
            const estado = (completadoEn)   //completadoEn === null, es lo mismo 
                                ? 'Completada'.green
                                : 'Pendiente'.red; 

            //carpinteria basica = union de todo lo de arriba     //2. tarea :: Pendiente 
            console.log( `${index}. ${desc} :: ${ estado } ` )
        })
    }

    listarPendientesCompletadas( completadas = true ) {

        console.log(' ');
        
        // const tareas = this._listado;   //{}
        const tareas = this.listadoArr;   //[]
        let contador = 0;
        
        tareas.forEach( tarea => {
            const { desc, completadoEn } = tarea;

            const estado = (completadoEn)   //completadoEn === null, es lo mismo 
                                ? 'Completada'.green
                                : 'Pendiente'.red; 

                if ( completadas ) {
                    //mostar completadas
                    if (completadoEn) {
                        contador += 1;
                        console.log( `${ contador.toString().green }. ${desc} :: ${ completadoEn.green } ` )
                    }   //dame las completadas o no hagas nada
                    
                } else {
                    //mostrar sin completar
                    if ( !completadoEn ) {
                        contador += 1;
                        console.log( `${ contador.toString().green }. ${desc} :: ${ completadoEn } ` )
                    }   //dame las incompletas o no hagas nada
                }
        })        
    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {

            //guardar completadas
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        //borrar las no completadas
        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                //es lo mismo q abajo
                // const tarea = this._listado[tarea.id];
                // tarea.completadoEn = null;
                
                this._listado[tarea.id].completadoEn = null;
            }


        });

    }

}

module.exports = Tareas;



