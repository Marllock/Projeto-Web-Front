import "../styles/monster.scss";
import api from "./../services/api";
import { useState } from "react";
import { useCookies } from "react-cookie";
import '../styles/post.scss'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Monster() {
  const [search, setSearch] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [cookies] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get("/anime", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        params: {
          search,
        },
      });

      if (response.data.length === 0) {
        toast.warning(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }

      setAnimeList(response.data);
    } catch (e) {
        toast.error('Error while searching for animes', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
    }
  };

  function handleReset() {
    setSearch("");
  }

  const handleCards = (anime) => {
    return (
      <div className="card" key={anime.id}>
        <span>
          <strong className="strong">Nome: </strong> <label className="label">{anime.animeName}</label>
        </span>
        <span>
          <strong className="strong">Descrição: </strong> <label className="label">{anime.animeDescription}</label>
        </span>
      </div>
    );
  };

  const cardList = () => {
    if (animeList.length === 0) {
      return;
    }
    return animeList.map(handleCards);
  };

  return (
    <div className="api-block">
      <header className="search-bar">
        <form className="search-container" onSubmit={handleSubmit}>
          <input
            className="monster-input"
            type="text"
            placeholder="Digite o nome do anime"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="monster-button" type="submit">
            SEARCH
          </button>
          <button className="monster-button" onClick={handleReset}>
            CLEAN RESEARCH
          </button>
          <Link className="monster-button" to="/posts">
            Posts
          </Link>
        </form>
      </header>
      {animeList.length > 0 && <div className="cardContainer">{cardList()}</div>}
    </div>
  );
}

export default Monster;
