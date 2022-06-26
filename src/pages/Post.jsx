
import RegisterPost from './../components/RegisterPost';
import SearchPost from './../components/SearchPost';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import api from '../services/api';

function Post() {
    const [post, setPost] = useState('')
    const [requestedPost, setRequestedPost] = useState({})
    const [numberViews, setNumberViews] = useState(0)
    const [postsCreated, setPostsCreated] = useState(0)
    const [cookies, setCookies] = useCookies(['token']);

    useEffect(() => {
        setCookies('numberViews', numberViews)
        setCookies('postsCreated', postsCreated)

    }, [numberViews, postsCreated])

    async function handleSubmit(e) {
        e.preventDefault()

        const postReturn = await api.get('/posts', {
            params: {
                title: post,
                id: cookies.id
            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`
            }
        })
        setRequestedPost(postReturn)
        setNumberViews(numberViews + 1)
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
                    <p className='post-view'>Número de visualizações: {numberViews}</p>
                    <p className='post-view'>Quantidade de posts Criados: {postsCreated}</p>
                </form>
            </header>

            <RegisterPost setPosts={setPostsCreated} posts={postsCreated} />
            <HandleSearch />
        </div>
    );
}

export default Post;