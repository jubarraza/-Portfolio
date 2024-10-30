document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('form-contacto').addEventListener('submit', function (event) {
        event.preventDefault(); // evita que se recargue la página

        // cargar de datos del form
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            asunto: document.getElementById('asunto').value,
        };

        // enviar el formulario con EmailJS
        emailjs.send('service_u0fr5ec', 'template_glezl2p', formData)

            //manejo de respuesta
            .then(function (response) {
                console.log('Correo enviado con éxito', response.status, response.text);
                alert('El mensaje fue enviado con éxito.');
            }, function (error) {
                console.log('Falló el envío', error);
                alert('Hubo un error al enviar el mensaje.');
            });
    });

    // ajustar el padding-top dinamicamente
    const header = document.querySelector('header');
    const secciones = document.querySelectorAll('.seccion');
    const navLinks = document.querySelectorAll('nav.menu a'); 


    function actualizarPaddingTop() {
        const headerHeight = header.offsetHeight + 5; //obtiene altura del header
        
        secciones.forEach(function(seccion) {
            seccion.style.paddingTop = headerHeight + 'px';//Aplica al padding-top
        });
    }

    //ejecuta la función al cargar la pagina con un delay de 100 milisegundos (para que termine de cargar)
    setTimeout(actualizarPaddingTop, 100); 

    //si cambia el tamaño de la ventana, recalcula la altura
    window.addEventListener('resize', actualizarPaddingTop);

    //recalcula el padding-top al cambiar la orientación del celu
    window.addEventListener('orientationchange', actualizarPaddingTop);

    //actualiza el padding-top tambien cuando se hace clic en el menú
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            actualizarPaddingTop(); 
        });
    });
});
