import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            const aviso = document.createElement('p');
            aviso.textContent = 'Senha precisa ter entre 3 e 50 caracteres';
            aviso.classList.add('text-danger');
            aviso.classList.add('my-3');
            el.insertAdjacentElement('afterend', aviso);
            error = true;
        }

        if(!validator.isEmail(emailInput.value)) {
            const aviso = document.createElement('p');
            aviso.textContent = 'E-mail inválido';
            aviso.classList.add('text-danger');
            aviso.classList.add('my-3');
            el.insertAdjacentElement('afterend', aviso);
            error = true;
        }

        if(!error) el.submit();
    }
}