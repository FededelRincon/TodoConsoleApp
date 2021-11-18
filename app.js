require ('colors');

const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput( 'Descripcion:' )  //lo q el user escribe, lo muestra en pantalla 
                console.log(desc)
                tareas.crearTarea( desc );      //y lo manda a crarTarea
            break;
        
            case '2':   //listar
                tareas.listadoCompleto();
            break;
        
            case '3':   //listar completadas
                tareas.listarPendientesCompletadas(true);
            break;
        
            case '4':   //listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;
        
            case '5':   //completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                // console.log(ids);
                tareas.toggleCompletadas( ids );
            break;
        
            case '6':   //Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar( '¿Estas seguro de querer borrar' );
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente');
                    }
                }

            break;
        
        }

        // guardar en la "db"
        guardarDB( tareas.listadoArr );


        
        // await pausa();
        if( opt !== '7' ){  
            await pausa();
        };

        
    } while ( opt !== '7' );    //mientras opt no sea 0, segui lanzando el inquirerMenu()

}


main();










