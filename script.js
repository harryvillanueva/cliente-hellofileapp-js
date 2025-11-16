// Espera a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Obtenemos referencias a los elementos del HTML
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const messageContainer = document.getElementById('message-container');

    // 2. Añadimos un "escuchador" al evento 'submit' del formulario
    uploadForm.addEventListener('submit', async (event) => {
        
        // 3. ¡MUY IMPORTANTE! Evita que el formulario se envíe de la forma tradicional
        event.preventDefault();

        // 4. Limpiamos mensajes anteriores
        messageContainer.innerHTML = '';

        // 5. Creamos un objeto FormData y añadimos el fichero
        const formData = new FormData();
        // 'file' debe coincidir con el @RequestParam("file") del controlador
        formData.append('file', fileInput.files[0]); 

        try {
            // 6. Usamos 'fetch' para enviar los datos al backend (a la raíz "/")
            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                body: formData, // El FormData se envía como 'multipart/form-data'
            });

            // 7. Obtenemos el texto de la respuesta (nuestro mensaje de éxito o error)
            const responseText = await response.text();

            // 8. Comprobamos si la respuesta fue un 200 OK
            if (response.ok) {
                // Éxito: mostramos el mensaje en verde
                showMessage(responseText, 'success');
            } else {
                // Error: mostramos el mensaje en rojo
                showMessage(responseText, 'error');
            }

        } catch (error) {
            // Error de red o si el servidor está caído
            console.error('Error de red:', error);
            showMessage('Error de conexión con el servidor.', 'error');
        }
    });

    // Función simple para mostrar mensajes en el HTML
    function showMessage(message, type) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
    }
});