import burguer from "../Assets/menu-burger.svg"
import global from '../Assets/global.png'
import logo from '../Assets/dellLogo.png'
import search from '../Assets/search.png'
import seta from '../Assets/seta-para-baixo.png'
import shoppingCart from '../Assets/shopping-cart.png'
import user from '../Assets/user.png'
import '../styles/header.scss'
import { useState } from "react"
import ModalComponent from "./ModalComponent"
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RowButtons(props) {
    return (
        <div className="block">
            <p>{props.title}</p>
            <img src={seta} alt="seta" className="seta" />
        </div>
    )
}

function Header() {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()

    const handleOpen = () => {
        setOpenModal(true);
        // navigate('/users')
    }

    return (
        <header>
            <div className="grid-container">
                <section className="logo-container">
                    <img src={burguer} alt="burguer" className="menu-burger" />
                    <img src={logo} alt="Logo" className="logo" />
                </section>
                <span>
                    <input type="text" placeholder="Pesquisar Dell" />
                    <img src={search} alt="search" className="general-icon search" />
                </span>

                <div className="head-buttons">
                    <div className="block hidden">
                        <img src={shoppingCart} alt="ícone chato" className="head-icon" />
                        <p>Carrinho</p>
                        <img src={seta} alt="seta" className="seta" />
                    </div>
                    <div className="block hidden login">
                        <img src={user} alt="user logo" className="head-icon" />
                        <p onClick={handleOpen}>Login</p>
                        <img src={seta} alt="seta" className="seta" />
                    </div>
                    <div className="block hidden world">
                        <img src={global} alt="ícone de globo" className="head-icon" />
                        <p>BR/PT</p>
                        <img src={seta} alt="seta" className="seta" />
                    </div>
                </div>


                <div className="row-buttons">
                    <RowButtons title="APEX" />
                    <RowButtons title="Produtos" />
                    <RowButtons title="Soluções" />
                    <RowButtons title="Serviços" />
                    <RowButtons title="Suporte" />
                    <RowButtons title="Promoção" />
                    <RowButtons title="Sobre Nós" />
                </div>
            </div>
            {openModal && <ModalComponent setOpenModal={setOpenModal} />}

        </header>
    );
}

export default Header;