const hora = document.getElementById('hora');
const fecha = document.getElementById('fecha');

function actualizarFechaHora() {
  const now = new Date();
  const horas = now.getHours().toString().padStart(2, '0');
  const minutos = now.getMinutes().toString().padStart(2, '0');
  const dia = now.getDate().toString().padStart(2, '0');
  const mes = (now.getMonth() + 1).toString().padStart(2, '0');
  const anio = now.getFullYear();
  hora.textContent = `${horas}:${minutos}`;
  fecha.textContent = `${dia}/${mes}/${anio}`;
}

actualizarFechaHora();
setInterval(actualizarFechaHora, 60000);

//registro

let usuarios = [
  { id: 1, nombre: "Juan", contrasena: "28heuhfd7hfdh", rol: "admin", fecha: "20/04/2025" },
];

function renderUsuarios() {
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = "";
  usuarios.forEach((user, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.contrasena}</td>
        <td>${user.rol}</td>
        <td>${user.fecha}</td>
        <td>
          <button class="btn" onclick="editarUsuario(${index})">editar</button>
          <button class="btn" onclick="eliminarUsuario(${index})">eliminar</button>
        </td>
      </tr>
    `;
  });
}

function mostrarModalRegistro() {
  document.getElementById("modalUsuario").style.display = "block";
}

function cerrarModalRegistro() {
  document.getElementById("modalUsuario").style.display = "none";
}

function agregarUsuario(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const rol = document.getElementById("rol").value;

  if (nombre && apellidos && rol) {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: `${nombre} ${apellidos}`,
      contrasena: Math.random().toString(36).substr(2, 10),
      rol: rol,
      fecha: new Date().toLocaleDateString(),
    };
    usuarios.push(nuevoUsuario);
    cerrarModal();
    renderUsuarios();
    document.getElementById("formUsuario").reset();
  }
}

function eliminarUsuario(index) {
  if (confirm("¿Estás seguro de eliminar este usuario?")) {
    usuarios.splice(index, 1);
    renderUsuarios();
  }
}

function editarUsuario(index) {
  alert("Funcionalidad de edición en desarrollo para el usuario: " + usuarios[index].nombre);
}

window.onload = renderUsuarios;
;

//fin registro 


//areas 
let areas = []; // Array para almacenar las áreas

function mostrarModalAreas() {
  document.getElementById("modalArea").style.display = "block"; // Mostrar el modal para agregar área
}

function cerrarModalArea() {
  document.getElementById("modalArea").style.display = "none"; // Cerrar el modal
}

function agregarArea(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  const nombreArea = document.getElementById("nombreArea").value; // Obtener el nombre del área
  const descripcionArea = document.getElementById("descripcionArea").value; // Obtener la descripción del área

  if (nombreArea && descripcionArea) {
    const nuevaArea = {
      id: areas.length + 1, // Asignar un ID único
      nombre: nombreArea,
      descripcion: descripcionArea,
    };
    areas.push(nuevaArea); // Agregar el nuevo área al array
    cerrarModal(); // Cerrar el modal
    renderAreas(); // Renderizar la lista de áreas
    document.getElementById("formArea").reset(); // Reiniciar el formulario
  }
}

function renderAreas() {
  const tablaAreas = document.getElementById("tablaAreas");
  tablaAreas.innerHTML = ""; // Limpiar la tabla antes de renderizar

  areas.forEach((area, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${area.id}</td>
      <td>${area.nombre}</td>
      <td>${area.descripcion}</td>
      <td>
        <button class="btn btn-danger" onclick="eliminarArea(${index})">Eliminar</button>
      </td>
    `;
    tablaAreas.appendChild(fila); // Agregar la fila a la tabla
  });
}

function eliminarArea(index) {
  if (confirm("¿Estás seguro de eliminar esta área?")) {
    areas.splice(index, 1); // Eliminar el área del array
    renderAreas(); // Renderizar la lista de áreas
  }
}


//estadisticas
document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo (puedes reemplazar esto con una llamada a una API)
    const data = [
        { nombre: "Archivo1.pdf", dia: 1, mes: 6, usuario: "Juan", año: 2025 },
        { nombre: "Archivo2.pdf", dia: 2, mes: 6, usuario: "Ana", año: 2025 }
    ];

    // Función para llenar la tabla
    function llenarTabla(datos) {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Limpiar la tabla
        datos.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.dia}</td>
                <td>${item.mes}</td>
                <td>${item.usuario}</td>
                <td>${item.año}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Llenar la tabla al cargar la página
    llenarTabla(data);

    // Filtrar datos al hacer clic en "Buscar"
    document.querySelector('.btn-primary').addEventListener('click', function() {
        const area = document.querySelector('#area').value;
        const nombre = document.querySelector('input[placeholder="Nombre del archivo"]').value.toLowerCase();
        const dia = document.querySelector('input[placeholder="Día"]').value;
        const mes = document.querySelector('input[placeholder="Mes"]').value;
        const usuario = document.querySelector('input[placeholder="Usuario"]').value.toLowerCase();
        const año = document.querySelector('input[placeholder="Año"]').value;

        const filteredData = data.filter(item => {
            return (!area || item.area === area) &&
                   (!nombre || item.nombre.toLowerCase().includes(nombre)) &&
                   (!dia || item.dia == dia) &&
                   (!mes || item.mes == mes) &&
                   (!usuario || item.usuario.toLowerCase().includes(usuario)) &&
                   (!año || item.año == año);
        });

        llenarTabla(filteredData);
    });
});