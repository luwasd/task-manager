/*const AGREGAR_TAREA = document.getElementById('agregar-tarea');
const VER_TAREAS = document.getElementById('ver-tareas');

const FECHA_LIMITE = document.getElementById('fecha-limite');
const OPCIONES_LISTA = document.getElementById('opciones-de-agregar');
const DESCRIPCION = document.getElementById('descripcion');
const SALIR_DE_AGREGAR = document.getElementById('salir-de-agregar');
const AGREGAR_A_LISTA = document.getElementById('agregar-a-la-lista');

const OPCIONES_LISTA_TAREAS = document.getElementById('opciones-lista-con-tareas');
const SALIR_DE_VER_TAREAS = document.getElementById('salir-de-ver-tareas');

const SHEET_ID = "1pGtv8U2P3AOv4Xrkmo_tPVDCzUxakuIl5FBfmy6dOas";



AGREGAR_TAREA.addEventListener('click', () => {
    document.getElementById('seccion-agregar').style.display = 'block';
    document.getElementById('seccion-inicio').style.display = 'none';

    const ACCESS_TOKEN = 'ya29.a0Aa4xrXNptgUnSas_HxwOe9k8u4PPSN4VDbOv9voD0E8ouUfB3HU3NHESsYF_OrnPD8o6iep0V2oimJHrlg3IwdH7WScuVVopNFXaCqEl5St2ODPdQV5X6pQ29d_a4bjWaN9iLzoCVLwz67jDNFmOk1Tv9s60aCgYKATASARISFQEjDvL9Ej2fk3p6Qi-j88sKN_QtGQ0163';

    fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/doctores!A2:A`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        }
    ).then(function (response) {
        response.json().then(function (data) {
            const values = data.values;
            for (var i = 0; i < values.length; i++) {
                const SELECCION = document.createElement('option');
                SELECCION.innerHTML = values[i][0];
                OPCIONES_LISTA.appendChild(SELECCION);
            }
        })
    })
    AGREGAR_A_LISTA.addEventListener('click', () => {

        const ACCESS_TOKEN2 = 'ya29.a0Aa4xrXPNfQQ9Jjb57HCvB2eclKHvaWDTu4wHiKwprAPYQiem-7oePRoymnbHqu3S9JMmGycnPA7wPJEjm1BQ5IhzQHJgLT2JapUpbeUunr1evJbvaxIeLOOm1OvifwLO0ppH8OM3D8VE9ExwgwfzHwcoZW8paCgYKATASARMSFQEjDvL9FE31inyu-Hta6r-Th7lNxw0163';

        let data = {};
        let values = [];
        let fila = [FECHA_LIMITE, OPCIONES_LISTA, DESCRIPCION];

        values.push(fila);
        data.range = "tareas";
        data.majorDimension = "ROWS";
        data.values = values;
        fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/tareas:append?valueInputOption=USER_ENTERED`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN2}`,
                },
                body: JSON.stringify(data)
            }
        ).then(function (response) {
            response.json().then(function (data) {

            });
        });

    })
    SALIR_DE_AGREGAR.addEventListener('click', () => {
        document.getElementById('seccion-agregar').style.display = 'none';
        document.getElementById('seccion-inicio').style.display = 'block';
        OPCIONES_LISTA.innerHTML = '';
    })

})*/

const FECHA_LIMITE = document.getElementById('fecha-limite');
const DESCRIPCION = document.getElementById('descripcion');
const AGREGAR = document.getElementById('agregar');
const TAREAS = document.getElementById('tareas');
const ERROR = document.getElementById('error');



const SHEET_ID = "1pGtv8U2P3AOv4Xrkmo_tPVDCzUxakuIl5FBfmy6dOas";

const ACCESS_TOKEN = "ya29.a0Aa4xrXMdnro-xx3QI1392TyJo-kMsU6p-OyyUQSFrOgbHpzl55YefUyQuAt4YnIGJQl-0No4jOGLI_8fogkPEh2teG1HcxwFNG930gmk5p5IRyxcUC8yWVDSwk4FiLCcrq6Skm27KMAtgc1HBrIvh6sWrwjsaCgYKAagSARMSFQEjDvL9sfGXsVjY31p16ncM86_yYQ0163";

listaTareas();

function listaTareas() {

    fetch(
        //Obtenemos los datos de la planilla, de la hojaTareas, columnas A y B desde la segunda fila
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/tareas!A2:C`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`
            },
        }
    ).then(function (response) {
        //esperamos el json del response para poder utilizarlo
        response.json().then(function (data) {
            const values = data.values;

            //Obtenemos el elemento del dom

            for (let i = 0; i < values.length; i++) {
                //Div que va a contener los datos de la tarea
                const TAREA = document.createElement('div');
                TAREA.className = 'tarea';

                //Fecha de la tarea
                const FECHA = document.createElement('span');
                FECHA.innerHTML = values[i][0];

                //Descripcion de la tarea
                const TAREA_DESCRIPCION = document.createElement('p');
                TAREA_DESCRIPCION.innerHTML = values[i][1];

                //Boton eliminar
                const BOTON_ELIMINAR = document.createElement('button');
                BOTON_ELIMINAR.className = 'eliminar';
                BOTON_ELIMINAR.innerText = 'X';

                //Agregamos todos los elementos al div de producto
                TAREA.appendChild(FECHA);
                TAREA.appendChild(TAREA_DESCRIPCION);
                TAREA.appendChild(BOTON_ELIMINAR);

                //Agregamos la tarea a la lista
                TAREAS.appendChild(TAREA);

                BOTON_ELIMINAR.addEventListener('click', () => {

                });
            }
        })
    });
}

function onRegistrarTareas() {
    //Obtenemos los datos del formulario
    //Creamos el JSOn que espera nuestra API
    let data = {};
    let values = [];
    let fila = [FECHA_LIMITE.value, DESCRIPCION.value];

    values.push(fila);

    //Verificar que coincida con el nombre de la hoja de nuestro sheet
    data.range = "tareas";
    data.majorDimension = "ROWS";
    data.values = values;

    //Invocamos al método POST de la API
    fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/tareas:append?valueInputOption=USER_ENTERED`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify(data)
        }
    ).then(function (response) {
        TAREAS.innerHTML = '';
        listaTareas();
        response.json().then(function (data) {

        });
    });

    //Limpiamos los campos del formulario para permitir cargar una nueva tarea
    FECHA_LIMITE.value = '';
    DESCRIPCION.value = '';

}

AGREGAR.addEventListener('click', () => {

    if (FECHA_LIMITE.value !== '' && DESCRIPCION.value !== '') {
        // Escribir la hoja
       
        onRegistrarTareas();
       
    } else {
        // Mensaje de error
        ERROR.style.display = 'block';
        setTimeout(() => {
            ERROR.style.display = 'none';
        }, 5000);
    }
});
