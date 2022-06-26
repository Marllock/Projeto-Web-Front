import { useState } from 'react'
import { useCookies } from 'react-cookie'
import api from '../services/api'
import '../styles/modal.scss'
import { useNavigate } from 'react-router-dom';

function Login({ login }) {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordValidated, setPasswordValidated] = useState(true)
    const [emailValidated, setEmailValidated] = useState(true)
    const [cookies, setCookies] = useCookies();

    const navigate = useNavigate();

    function HandleError(type) {
        if (type === 'password') {
            return (
                <p>Senha Inválida</p>
            )
        }
        if (type === 'email') {
            return (
                <p>Email Inválido</p>
            )
        }
    }

    function validateEmail() {
        const regex = /^\d+@\d+\.[a-z]+\.([a-z]+)?$/i
        if (!regex.test(emailInput)) {
            setEmailValidated(false)
            setEmailInput('')
        }
    }

    function validatePassword() {
        const regex = /[A-Za-z\d@$!%*#?&]{3,}/g
        if (!regex.test(passwordInput)) {
            setPasswordValidated(false)
            setPasswordInput('')
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(emailInput)
        validateEmail();
        validatePassword();

        api.post('users/login', {
            email: emailInput,
            password: passwordInput
        }).then(response => {
            const token = response.data.token;
            setCookies('token', token)
            setCookies('id', response.data.id)
        }).catch(e => {
            console.log(e.message)
            return
        })

        navigate('/monsters')
    }

    const handleRegister = () => {
        console.log(`teste`);
        login(false);
    }

    return (
        <main className="login">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>

                    <h1 className="login-title">Login</h1>
                    <input className="login-input" type="email" placeholder="E-mail" onChange={(e) => setEmailInput(e.target.value)} />
                    {!emailValidated && <HandleError type="email" />}
                    <span className="login-input-border"></span>
                    <input className="login-input" type="password" placeholder="Senha" onChange={(e) => setPasswordInput(e.target.value)} />
                    {!passwordValidated && <HandleError type="password" />}
                    <span className="login-input-border"></span>
                    <button className="login-submit" type="submit">Login</button>

                </form>
                <p onClick={handleRegister} className="return">Criar Conta</p>
            </div>
        </main>
    );
}

export default Login;