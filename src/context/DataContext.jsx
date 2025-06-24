import {createContext, useState, useEffect} from 'react';
import axios from 'axios';
//import spacesImagesJSON from '../assets/data/spaces.json';

export const DataContext = createContext(); // Crear el contexto de la aplicación (Se le puede dar un valor por defecto entre parentesis)

export const DataContextProvider = ({children}) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiRoutes = {
    game: import.meta.env.VITE_API_URL + "game",
    gameRelease: import.meta.env.VITE_API_URL + "gameRelease",
    guide: import.meta.env.VITE_API_URL + "guide",
    news: import.meta.env.VITE_API_URL + "news",
    languages: import.meta.env.VITE_API_URL + "language",
    userInterface: import.meta.env.VITE_API_URL + "userInterface",
  };
  //const spacesImagesString = localStorage.getItem('spacesImages');
  //const [spacesImages, setSpacesImages] = useState(spacesImagesString !== null ? JSON.parse(spacesImagesString) : false);
  
  //const spacesString = localStorage.getItem('spaces');
  //const [spaces, setSpaces] = useState(spacesString !== null ? JSON.parse(spacesString) : false);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [gameReleases, setGameReleases] = useState([]);
  const [guides, setGuides] = useState([]);
  const [news, setNews] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [userInterfaces, setUserInterfaces] = useState([]);

  useEffect(() => {
    setLoading(true); // No es necesario pero por si añado un botón para recargar los datos en un futuro

    Promise.all([
      axios.get(apiRoutes.game, {
        headers: {
          "x-api-key": apiKey,
          "Accept": "application/json"
        }
      }),
      axios.get(apiRoutes.gameRelease, {
        headers: {
          "x-api-key": apiKey,
          "Accept": "application/json"
        }
      }),
      axios.get(apiRoutes.guide, {
        headers: {
          "x-api-key": apiKey,
          "Accept": "application/json"
        }
      }),
      axios.get(apiRoutes.news, {
        headers: {
          "x-api-key": apiKey,
          "Accept": "application/json"
        }
      }),
      axios.get(apiRoutes.languages, {
        headers: {
          "x-api-key": apiKey,
          "Accept": "application/json"
        }
      }),
      axios.get(apiRoutes.userInterface, {
        headers: {
          "x-api-key": apiKey,
          "Accept": "application/json"
        }
      })
    ])
    .then(([gameRes, gameReleaseRes, guideRes, newsRes, languageRes, userInterfaceRes]) => {
      setGames(gameRes.data.data);
      setGameReleases(gameReleaseRes.data.data);
      setGuides(guideRes.data.data);
      setNews(newsRes.data.data);
      setLanguages(languageRes.data.data);
      setUserInterfaces(userInterfaceRes.data.data);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);
  console.log(games);
  console.log(gameReleases);
  console.log(guides);
  console.log(news);
  console.log(languages);
  console.log(userInterfaces);
  console.log(loading);
  return (
      <DataContext.Provider value={{ games, setGames, gameReleases, guides, setGuides, news, languages, userInterfaces, loading }}>
          {children}
      </DataContext.Provider>
  )
}

  /*useEffect(() => {
    console.log(loading);
    if (!games) {
      axios.get(apiRoutes.game, {
        headers: {
          "x-api-key": apiKey,
          "Accept": "application/json"
        }
      })
      .then(response => {
        localStorage.setItem('games', JSON.stringify(response.data.data));
        setGames(response.data.data);
      })
      .catch(error => {
        console.error(error);
      })
    }
    if (games){
      setLoading(false);
    }
  }, [games]);*/