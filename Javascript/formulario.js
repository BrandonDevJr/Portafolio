document.addEventListener('DOMContentLoaded', function(){
    
    const email ={
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('.email');
    const inputAsunto = document.querySelector('.asunto');
    const inputMensaje = document.querySelector('.mensaje');
    const formulario = document.querySelector('#formulario');
    const btnsubmit = document.querySelector('#formulario button[type="submit"]')
    
    // asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    function validar(e){
        
        if(e.target.value.trim() === ''){
            mostrarError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarError('El email no es valido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.id] = e.target.value.trim().toLowerCase();
        
        //comprobar Email
        comprobarEmail();
    }

    function mostrarError(mensaje, referencia){
        limpiarAlerta(referencia);

        // Generar alerta en html 
        const error = document.createElement('P');
        error.textContent= mensaje;
        error.classList.add('bg-red-600')

        //inyectar el error el al formulario
        referencia.appendChild(error);
        
    }
    
    //comprueba si ya existe una alerta
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }

    }
    function validarEmail(email){    
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
        
    }
    
    //Comprobar Email
    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnsubmit.classList.add('opacity-50');
            btnsubmit.disabled = true;
            return;
        }
        btnsubmit.classList.remove('opacity-50');
        btnsubmit.disabled = false;
        
    }
});