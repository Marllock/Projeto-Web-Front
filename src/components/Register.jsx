import { useState } from 'react'
import api from '../services/api'
import '../styles/modal.scss'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Register({ login }) {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();

        api.post('/register', {
            email: emailInput,
            password: passwordInput
        }).then(response => {
            const token = response.data.accessToken;
            localStorage.setItem('token', token)
            localStorage.setItem('id', response.data.id)
            navigate('/monsters')
        }).catch((e) => {
            if(e.response.data.statusCode === 409) {
                toast.error(e.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    draggable: false,
                    progress: undefined,
                    theme: "colored"
                    });
            }
            if(e.response.data.statusCode === 400) {
                e.response.data.message.forEach(er => {
                    toast.error(er, {
                        position: "top-right",
                        autoClose: 5000,
                        draggable: false,
                        progress: undefined,
                        theme: "colored"
                    });
                })
            }
            return
        })
    }

    function handleLogin() {
        login(true)
    }

    return (
        <main className="login">
            <ToastContainer />
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>

                    <h1 className="login-title">Registro</h1>

                    <input className="login-input" type="email" placeholder="E-mail" onChange={(e) => setEmailInput(e.target.value)} />
                    <span className="login-input-border"></span>

                    <input className="login-input" type="password" placeholder="Senha" onChange={(e) => setPasswordInput(e.target.value)} />
                    <span className="login-input-border"></span>

                    <button className="login-submit" type="submit">Registrar</button>

                </form>
                <p onClick={handleLogin} className="return">Voltar ao login</p>
            </div>
        </main>
    );
}

export default Register;