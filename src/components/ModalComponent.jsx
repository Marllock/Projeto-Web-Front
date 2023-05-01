import { useEffect, useState } from "react";
import "../styles/modal.scss";
import Login from './Login';
import Register from "./Register";
import { ToastContainer } from 'react-toastify';

function ModalComponent({ setOpenModal }) {
    const [isLogin, setLogin] = useState(true)

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                {isLogin ? <Login login={setLogin} /> : <Register login={setLogin} />}
            </div>
        </div>
    );
}

export default ModalComponent;