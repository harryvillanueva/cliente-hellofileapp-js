
document.addEventListener('DOMContentLoaded', () => {
    
    
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const messageContainer = document.getElementById('message-container');

    uploadForm.addEventListener('submit', async (event) => {
        
        event.preventDefault();
        messageContainer.innerHTML = '';
        const formData = new FormData();
        formData.append('file', fileInput.files[0]); 

        try {
            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                body: formData, 
            });

            
            const responseText = await response.text();
            if (response.ok) {
             
                showMessage(responseText, 'success');
            } else {
               
                showMessage(responseText, 'error');
            }

        } catch (error) {
            
            console.error('Error de red:', error);
            showMessage('Error de conexión con el servidor.', 'error');
        }
    });

    function showMessage(message, type) {
        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
    }
});