//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Listeners
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', iniciarApp);
  //Campos del fomrulario
  inputEmail.addEventListener('blur', validarForm);
  inputAsunto.addEventListener('blur', validarForm);
  inputMensaje.addEventListener('blur', validarForm);
  formulario.addEventListener('submit', enviarEmail);
  btnReset.addEventListener('click', resetForm);
}
//Funciones
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}
function borrarErrores() {
  const error = document.querySelector('.error');
  console.log(error);
  if (error) {
    error.remove();
  }
}
function validarForm(e) {
  if (e.target.value.length > 0) {
    //Eliminar errores
    borrarErrores();
    e.target.classList.remove('border-red-500');
    e.target.classList.add('border', 'border-green-500');
  } else {
    mostrarError('Todos los campos son obligatorios');
    e.target.classList.remove('border-green-500');
    e.target.classList.add('border', 'border-red-500');
  }
  if (e.target.type === 'email') {
    if (er.test(e.target.value)) {
      e.target.classList.remove('border-red-500');
      e.target.classList.add('border', 'border-green-500');
    } else {
      e.target.classList.remove('border-green-500');
      e.target.classList.add('border', 'border-red-500');
      mostrarError('Email no valido');
    }
  }
  if (
    er.test(inputEmail.value) &&
    inputAsunto.value !== '' &&
    inputMensaje.value !== ''
  ) {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
  } else {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
  }
}
function mostrarError(mensaje) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    'bg-red-500',
    'text-white',
    'p-3',
    'mb-5',
    'text-center',
    'font-bold',
    'error'
  );

  const error = document.querySelectorAll('.error');

  if (error.length === 0) {
    formulario.insertBefore(mensajeError, spinner);
  }
}
function enviarEmail(e) {
  e.preventDefault();

  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';

  setTimeout(() => {
    spinner.style.display = 'none';
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envio correctamente';
    parrafo.classList.add(
      'bg-green-500',
      'p-3',
      'mb-5',
      'text-center',
      'text-white',
      'font-bold'
    );
    formulario.insertBefore(parrafo, spinner);
    resetForm(e);

    setTimeout(() => {
      parrafo.remove();
    }, 3000);
  }, 3000);
}

function resetForm(e) {
  e.preventDefault();
  borrarErrores();
  formulario.reset();
  iniciarApp();
}
