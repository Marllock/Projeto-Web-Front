
import RegisterPost from './../components/RegisterPost';
import SearchPost from './../components/SearchPost';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import api from '../services/api';

function Post() {
    const [post, setPost] = useState('')
    const [requestedPost, setRequestedPost] = useState({})
    const [cookies] = useCookies(['token']);

    async function handleSubmit(e) {
        e.preventDefault()

        const postReturn = await api.get('/posts', {
            params: {
                title: post
            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`
            }
        })
        setRequestedPost(postReturn)
    }

    function HandleSearch() {
        if (requestedPost !== {} && requestedPost !== undefined && requestedPost !== null) {
            return (
                <SearchPost post={requestedPost.data} />
            )
        }
    }
    return (
        // Temporário
        <div className="api-block">
            <header className="search-bar">
                <form className="search-container" onSubmit={handleSubmit}>
                    <input className="monster-input" type="text" placeholder="Digite o nome da criatura a ser buscada" onChange={e => setPost(e.target.value)} value={post} />
                    <button type='submit' className="monster-button">SEARCH</button>
                </form>
            </header>

            <RegisterPost />
            <HandleSearch />
        </div>
    );
}

export default Post;