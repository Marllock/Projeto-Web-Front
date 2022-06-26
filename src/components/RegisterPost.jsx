import api from "../services/api";
import { useState } from 'react';
import { useCookies } from "react-cookie";

function RegisterPost({ setPosts, posts }) {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [file, setFile] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['token']);


    function handleSubmit(e) {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('text', text)
        formData.append('file', file)
        formData.append('id', cookies.id)

        e.preventDefault()
        api.post('/posts', formData, {
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
                "Content-Type": 'multipart/form-data'
            }
        })
        setPosts(posts + 1)
    }

    return (
        <div className="card-publi">
            <h1>Criar publicação</h1>
            <form onSubmit={handleSubmit} className="card-publi ">
                <input className="monster-input" type="title" name="title" id="title" placeholder="Digite o titulo da publicação" onChange={(e) => setTitle(e.target.value)} value={title} />
                <textarea className="monster-input" name="text" cols="30" rows="10" onChange={(e) => setText(e.target.value)} value={text} />
                <input className="monster-input" type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit" value="Publicar">Enviar</button>
            </form>
        </div>
    );
}

export default RegisterPost;