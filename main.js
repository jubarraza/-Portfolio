document.addEventListener('DOMContentLoaded', async function () {
    const form = document.getElementById('form-contacto');
    const modalMessage = document.getElementById('modalMessage');
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal')); // Inicializar el modal

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Cargar datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            asunto: document.getElementById('asunto').value,
        };

        // Enviar el formulario con EmailJS
        emailjs.send('service_u0fr5ec', 'template_glezl2p', formData)
            .then(function (response) {
                console.log('Correo enviado con éxito', response.status, response.text);
                modalMessage.setAttribute('data-translate', 'modal-message-success'); // Cambiar clave de traducción
                applyTranslations(translations[currentLanguage]); // Aplicar traducción
                modal.show();

                // Limpiar el formulario al cerrar el modal
                document.getElementById('confirmationModal').addEventListener('hidden.bs.modal', function () {
                    form.reset();
                });
            })
            .catch(function (error) {
                console.log('Falló el envío', error);
                modalMessage.setAttribute('data-translate', 'modal-message-error'); // Cambiar clave de traducción
                applyTranslations(translations[currentLanguage]); // Aplicar traducción
                modal.show();
            });
    });

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    let isDarkMode = true;
    let translations = {}; 
    let currentLanguage = 'es'; // Idioma inicial

    // Función para cargar las traducciones desde el archivo JSON
    const loadTranslations = async (lang) => {
        try {
            const response = await fetch('translations.json');
            translations = await response.json();
        } catch (error) {
            console.error('Error al cargar las traducciones:', error);
        }
    };

    // Actualizar el texto del botón de modo en función del idioma y estado
    const updateTheme = () => {
        const darkModeText = translations[currentLanguage]['dark-mode'];
        const lightModeText = translations[currentLanguage]['light-mode'];

        if (isDarkMode) {
            body.style.backgroundColor = '#1c1c1c';
            body.style.color = '#dfd5e0';
            document.documentElement.style.setProperty('--modal-bg-color', '#1c1c1c');
            document.documentElement.style.setProperty('--modal-text-color', '#dfd5e0');
            themeToggle.innerHTML = `<i class="fas fa-sun me-2"></i><span class="d-none d-sm-inline">${lightModeText}</span>`;
        } else {
            body.style.backgroundColor = '#fffcfe';
            body.style.color = '#28022b';
            document.documentElement.style.setProperty('--modal-bg-color', '#fffcfe');
            document.documentElement.style.setProperty('--modal-text-color', '#28022b');
            themeToggle.innerHTML = `<i class="fas fa-moon me-2"></i><span class="d-none d-sm-inline">${darkModeText}</span>`;
        }
    };

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode; // Alternar el estado
        updateTheme(); 
    });

    const languageToggle = document.getElementById('languageToggle');

    // Función para aplicar traducciones
    const applyTranslations = (texts) => {
        const elements = document.querySelectorAll('[data-translate]'); // Buscar elementos con data-translate
        elements.forEach((element) => {
            const key = element.getAttribute('data-translate'); // Obtener la clave
            if (texts[key]) {
                element.innerHTML = texts[key]; // Usar innerHTML para procesar etiquetas HTML
            }
        });

        // Actualizar el atributo "lang" del HTML
        document.documentElement.lang = currentLanguage;
    };

    // Función para actualizar el enlace del CV según el idioma actual
    const updateCVLink = () => {
        const cvLinkElement = document.querySelector('[data-translate="download-cv"]').parentElement;
        const cvLink = translations[currentLanguage]['cv-link'];
        cvLinkElement.setAttribute('href', cvLink);
    };

    // Alternar idioma y actualizar traducciones
    languageToggle.addEventListener('click', async () => {
        currentLanguage = currentLanguage === 'es' ? 'en' : 'es'; // Cambiar idioma
        await loadTranslations(currentLanguage);
        applyTranslations(translations[currentLanguage]);
        updateTheme(); // Actualizar texto del botón de modo oscuro
        updateCVLink(); // Actualizar el enlace del CV
    });

    // Cargar las traducciones iniciales y configurar el tema
    await loadTranslations(currentLanguage);
    applyTranslations(translations[currentLanguage]);
    updateTheme();
    updateCVLink(); // Actualizar el enlace al cargar
});
