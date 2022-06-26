import Header from "../components/Header";

import dell from '../Assets/img-dell.png'
import notebook from '../Assets/icons8-notebook-30.png'
import desktop from '../Assets/icons8-desktop-30.png'
import servidor from '../Assets/icons8-servidor-30.png'
import monitor from '../Assets/icons8-monitor-30.png'
import pilha from '../Assets/icons8-pilha-30.png'
import fone from '../Assets/icons8-fones-de-ouvido-30.png'
import { useNavigate } from "react-router-dom";

import '../styles/main.scss'

function Icons(props) {
    const navigate = useNavigate();
    return (
        <div className="icons">
            <img src={props.icon} alt="" />
            <p>{props.title}</p>
        </div>
    )
}

function Main() {
    return (
        <div>
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <h3>OFERTAS DO CONSUMIDOR</h3>
                        <h2>ÚLTIMOS DIAS</h2>
                        <p>
                            Sua oportunidade de comprar tecnologia de ponta com descontos de
                            até R$2350. 10x sem juros e frete grátis.
                        </p>
                        <button>Para Uso Pessoal</button>
                        <button>Para Uso Profissional</button>
                    </div>
                    <img src={dell} alt="" className="img-responsive" />
                </div>

                <div className="icons-bar">
                    <Icons title='Notebooks' icon={notebook} />
                    <Icons title='Desktop' icon={desktop} />
                    <Icons title='Workstations' icon={servidor} />
                    <Icons title='Monitores' icon={monitor} />
                    <Icons title='Servidores e Storage' icon={pilha} />
                    <Icons title='Acessórios' icon={fone} />
                </div>

                <h3 className="title">Explore a Dell Technologies</h3>
            </main>
        </div>
    );
}

export default Main;