import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../styles/post.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Post = () => {
    const [animeName, setAnimeName] = useState("");
    const [animeDescription, setAnimeDescription] = useState("");
    const navigate = useNavigate();
    const handlePost = async () => {
        try {
            if(!animeName || !animeDescription ) {
                toast.error('All fields must be filled',  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored"
                })
            }
            
            const response = await api.post('/anime', {
                animeName,
                animeDescription,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem.token}`,
                }
            })
            
            if(response.status === 201) {
                toast.success('anime registered successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    draggable: false,
                    progress: undefined,
                    theme: "light"
        });
    } 
    
    navigate('/monsters');
} catch(e) {
    toast.error('Failed to register anime',  {
        position: "top-right",
        autoClose: 5000,
        draggable: false,
        progress: undefined,
        theme: "colored"
    })
}
}

return (
    <div className="containerPublication">
    <p className="label">Publicação de anime</p>
    <div className="content">
    <ToastContainer />
      <input className="input"
        type="text"
        placeholder="Digite o nome do anime"
        value={animeName}
        onChange={(e) => [setAnimeName(e.target.value)]}
        />
       
      <input className="input"
        type="text"
        placeholder="Digite a descrição"
        value={animeDescription}
        onChange={(e) => [setAnimeDescription(e.target.value)]}
        />
      <button className="button" onClick={handlePost}>Cadastrar</button>
    </div>
  </div>
);
}

export default Post;