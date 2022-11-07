const FECHA_LIMITE = document.getElementById('fecha-limite');
const DESCRIPCION = document.getElementById('descripcion');
const AGREGAR = document.getElementById('agregar');
const ERROR = document.getElementById('error');
const TAREAS = document.getElementById('tareas');

AGREGAR.addEventListener('click', agregarTarea);

function agregarTarea(e) {

    let fecha = FECHA_LIMITE.value;
    let descripcion = DESCRIPCION.value;
    if (fecha != '' && descripcion != '') {
        let tarea = {
            fecha, // dato fecha
            descripcion // descripcion
        };

        if (localStorage.getItem('tareas') === null) {
            let tareas = [];
            tareas.push(tarea);
            localStorage.setItem('tareas', JSON.stringify(tareas));
        } else {
            let tareas = JSON.parse(localStorage.getItem('tareas'));
            tareas.push(tarea);
            localStorage.setItem('tareas', JSON.stringify(tareas));
        }

        escribirTareas();
        document.getElementById('seccion-agregar').reset();
        e.preventDefault();
    } else {
        // Si hay error
        ERROR.style.display = 'block';
        setTimeout(() => {
            ERROR.style.display = 'none';
        }, 5000);
        e.preventDefault();
    }
}

function eliminarTarea(descripcion) {

    let tareas = JSON.parse(localStorage.getItem('tareas'));
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].descripcion == descripcion) {
            tareas.splice(i, 1);
        }
    }

    localStorage.setItem('tareas', JSON.stringify(tareas));
    escribirTareas();


}

function escribirTareas() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    let vistaTareas = document.getElementById('tareas');
    vistaTareas.innerHTML = '';
    for (let i = 0; i < tareas.length; i++) {
        let fecha = tareas[i].fecha;
        let descripcion = tareas[i].descripcion;

        vistaTareas.innerHTML += `
        <div class='tarea'>
            <span>${fecha}</span>
            <p>${descripcion}</p>
            <button onclick="eliminarTarea('${descripcion}')" class='eliminar'>X</button>
        </div>`;
    }
}

escribirTareas();