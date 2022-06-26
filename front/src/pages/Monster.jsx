import '../styles/monster.scss'
import api from './../services/api';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
function Locations({ monster }) {
    if (monster.locations) {
        return (

            <ul>
                <li><span className="ul-title">Locations: </span></li>
                {monster.locations.map((l, index) => <li key={index}><span className="ul-subtitle">Name: </span>{l.name}</li>)}
            </ul>
        )
    }
}
function Resistances({ monster }) {
    console.log(monster)
    if (monster?.resistances) {
        return (
            <ul>
                <li><span className="ul-title">Resistances: </span></li>
                {monster.resistances.map((l, index) => <li key={index}><span className="ul-subtitle">Element: </span>{l.element}</li>)}
            </ul>
        )
    }
}
function Weaknesses({ monster }) {
    if (monster.weaknesses) {
        return (

            <ul>
                <li><span className="ul-title">Weaknesses: </span></li>
                {monster.weaknesses.map((l, index) => <li key={index}><span className="ul-subtitle">Element: </span>{l.element}</li>
                )}
            </ul>
        )
    }
}

//#######################################################
function MonsterTemplate({ monster }) {
    console.log(monster)
    if (monster !== null) {
        return (
            <div className="monster">
                <h1>{monster.name}</h1>
                <p><span className="title">Description: </span> {monster.description}</p>
                <p><span className="title">Type: </span> {monster.type}</p>
                <p><span className="title">Species: </span> {monster.species}</p>
                <Locations monster={monster} />
                <Resistances monster={monster} />
                <Weaknesses monster={monster} />
            </div>
        )
    }
    return <p style={{ textAlign: 'center', marginTop: '30px' }}>Nenhum Monstro encontrado</p>
}



function Monster() {
    const [search, setSearch] = useState('')
    const [monster, setMonster] = useState(null)
    const [message, setMessage] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    function handleSubmit(e) {
        e.preventDefault()

        if (search !== '') {
            api.get('/monsters', {
                params: {
                    search
                },
                headers: {
                    'Authorization': `Bearer ${cookies.token}`
                }
            }).then(monst => {
                setMonster(monst.data)
            }).catch(e => {
                setMonster(undefined)
                setMessage('Nenhum monstro encontrado')
            })
        }
        console.log(monster)
    }

    function handleReset() {
        setSearch('')
        setMonster(null)
    }

    return (
        <div className="api-block">
            <header className="search-bar">
                <form className="search-container" onSubmit={handleSubmit}>
                    <input className="monster-input" type="text" placeholder="Digite o nome da criatura" onChange={
                        e => setSearch(e.target.value)
                    } value={search} />
                    <button className="monster-button" type='submit'>SEARCH</button>
                    <button className="monster-button" onClick={handleReset}>CLEAN RESEARCH</button>
                    <Link className="monster-button" to='/posts'>Posts</Link>
                </form>
            </header>
            <main className="api-content">
                <MonsterTemplate monster={monster} />
            </main>
        </div>
    );
}

export default Monster;