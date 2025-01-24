$(document).ready(function () {
  // Evento al hacer clic en el boton de mostrar todos los usuarios
  $(".bt-1").on("click", function () {
    $(".contenedor-cartas").empty();
    // Hecemos una petición AJAX
    $.ajax({
      url: "http://127.0.0.1:5000/api/users",
      method: "GET",
      success: function (users) {
        console.log("Usuario obtenido:", users);
        // Invocamos a la función de añadir todas cartas de los users
        users.forEach((user) => {
          addCard(user, `user${user.id}`);
        });
      },
      error: function (error) {
        console.error("Error al obtener el usuario:", error);
      },
    });
  });

  // Evento al hacer clic en el boton de mostrar 1 user
  $(".bt-2").on("click", function () {
    $(".contenedor-cartas").empty();
    // Hecemos una petición AJAX
    $.ajax({
      url: "http://127.0.0.1:5000/api/user1",
      method: "GET",
      success: function (user) {
        console.log("Usuario obtenido:", user);
        // Invocamos a la función de añadir carta
        addCard(user);
      },
      error: function (error) {
        console.error("Error al obtener el usuario:", error);
      },
    });
  });

  // Evento al hacer clic en el boton de mostrar el usuario segun el id
  $(".bt-3").on("click", function () {
    $(".contenedor-cartas").empty();
    let id = $(".busqueda input").val();
    // Hecemos una petición AJAX
    $.ajax({
      url: "http://127.0.0.1:5000/api/user?id=" + id,
      method: "GET",
      success: function (user) {
        console.log("Usuario obtenido:", user);
        // Invocamos a la función de añadir carta segun el id
        addCard(user);
      },
      error: function (error) {
        console.error("Error al obtener el usuario:", error);
      },
    });
  });

  // Funcion para crear y añadir la carta
  function addCard(user) {
    const cardUser = `<div class="carta" data-id={user.id}>
            <div class="carta-encabezado">
                <img src="images/icon.png" alt="Profile Image">
            </div>
            <div class="carta-cuerpo">
                <h2>Nombre: ${user.nombre}</h2>
                <p>Apellidos: ${user.apellido}</p>
                <p>Teléfono: ${user.tlfn}</p>
            </div>
        </div>`;
    // Agregamos la carta al contendor
    $(".contenedor-cartas").append(cardUser);
  }

  // Abrir modal
  $(".agregar").on("click", function () {
    openAddUserModal();
  });

  // Cerrar modal al clicar X
  $(".cerrar").on("click", function () {
    closeAddUserModal();
  });

  // Función para abrir el modal
  function openAddUserModal() {
    $("#agregarUsuario").fadeIn();
  }

  // Función cerrar modal de añadir
  function closeAddUserModal() {
    $("#agregarUsuario").fadeOut();
  }

  // Función para añadir usuarios
  $("#userForm").on("submit", function (e) {
    e.preventDefault();

    // Sacar los datos del formulario
    const nuevoUsuario = {
      nombre: $("#agregarNombre").val(),
      apellido: $("#agregarApellido").val(),
      tlfn: $("#agregarTlfn").val(),
    };

    closeAddUserModal();

    // Hacemos una petición AJAX
    $.ajax({
      url: "http://127.0.0.1:5000/api/users", 
      method: "POST",
      contentType: "application/json", 
      data: JSON.stringify(nuevoUsuario),
      success: function (response) {
        console.log("Usuario añadido exitosamente:", response);
        alert("Usuario añadido correctamente");
      },
      error: function (error) {
        console.log(nuevoUsuario);
        console.error("Error al añadir el usuario:", error);
        alert("Hubo un problema al añadir el usuario");
      },
    });
  });
});
