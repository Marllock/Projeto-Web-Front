import { useState } from 'react'
import api from '../services/api'
import '../styles/modal.scss'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({ login }) {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordValidated, setPasswordValidated] = useState(true)
    const [emailValidated, setEmailValidated] = useState(true)

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
        validateEmail();
        validatePassword();

        api.post('/login', {
            email: emailInput,
            password: passwordInput
        }).then(response => {
            console.log(response)
            const token = response.data.accessToken;
            localStorage.setItem('token', token)
            navigate('/monsters')
        }).catch(e => {
            console.log(e)
            toast.error(e.response.data.message,  {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
                })
            return
        })

    }

    const handleRegister = () => {
        login(false);
    }

    return (
        <main className="login">
            <ToastContainer />
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