import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify';
import api from '../services/api'
import '../styles/modal.scss'
import { useNavigate } from 'react-router-dom';

function Register({ login }) {
    const [emailInput, setEmailInput] = useState('')
    const [emailValidated, setEmailValidated] = useState(true)
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordValidated, setPasswordValidated] = useState(true)
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('')
    const [passwordConfirmationValidated, setPasswordConfirmationValidated] = useState(true)
    const [emailConfirmationInput, setEmailConfirmationInput] = useState('')
    const [emailConfirmationValidated, setEmailConfirmationValidated] = useState(true)
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate()

    function validateEmail() {
        const regex = /^\d+@\d+\.[a-z]+\.([a-z]+)?$/i
        if (!regex.test(emailInput)) {
            setEmailValidated(false)
            setEmailInput('')
        }
    }

    function validateEmailConfirmation() {
        if (emailInput !== emailConfirmationInput) {
            setEmailConfirmationValidated(false)
            setEmailConfirmationInput('')
        }
    }

    function validatePassword() {
        const regex = /[A-Za-z\d@$!%*#?&]{3,}/g
        if (!regex.test(passwordInput)) {
            setPasswordValidated(false)
            setPasswordInput('')
        }
    }
    function validatePasswordConfirmation() {
        if (passwordInput !== passwordConfirmationInput) {
            setPasswordConfirmationValidated(false)
            setPasswordInput('')
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        validateEmail();
        validateEmailConfirmation();
        validatePassword();
        validatePasswordConfirmation();

        api.post('/users/register', {
            email: emailInput,
            name: usernameInput,
            password: passwordInput
        }).then(response => {
            const token = response.token;
            setCookies('token', token)
            setCookies('email', emailInput)
        }).catch((e) => {
            console.log(e.message)
        })
        navigate('/monsters')
    }

    function handleLogin() {
        login(true)
        console.log('login')
    }

    return (
        <main className="login">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>

                    <h1 className="login-title">Registro</h1>
                    <input className="login-input" type="text" placeholder="Nome de usuário" onChange={(e) => setUsernameInput(e.target.value)} />
                    <span className="login-input-border"></span>

                    <input className="login-input" type="email" placeholder="E-mail" onChange={(e) => setEmailInput(e.target.value)} />
                    <span className="login-input-border"></span>
                    {!emailValidated && <p className='error'>Email inválido</p>}

                    <input className="login-input" type="email" placeholder="Confirmar E-mail" onChange={(e) => setEmailConfirmationInput(e.target.value)} />
                    <span className="login-input-border"></span>
                    {!emailConfirmationValidated && <p className='error'>Os emails devem ser iguais</p>}

                    <input className="login-input" type="password" placeholder="Senha" onChange={(e) => setPasswordInput(e.target.value)} />
                    <span className="login-input-border"></span>
                    {!passwordValidated && <p className='error'>A senha deve conter no mínimo 3 caracteres</p>}

                    <input className="login-input" type="password" placeholder="Confirmação de Senha" onChange={(e) => setPasswordConfirmationInput(e.target.value)} />
                    <span className="login-input-border"></span>
                    {!passwordConfirmationValidated && <p className='error'>As senhas devem ser iguais</p>}

                    <button className="login-submit" type="submit">Registrar</button>

                </form>
                <p onClick={handleLogin} className="return">Voltar ao login</p>
            </div>
        </main>
    );
}

export default Register;