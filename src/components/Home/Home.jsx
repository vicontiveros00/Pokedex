import axios from 'axios';
import { useState, useEffect } from 'react';
import PokeList from '../PokeList/PokeList';
import Pagination from '../Pagination/Pagination';

function Home() {
  const [ pokedata, setPokedata ] = useState([]);
  const [ pokecount, setPokecount ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [ nextPage, setNextPage ] = useState();
  const [ previousPage, setPreviousPage ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let cancelRequest = null;
    axios.get(currentPage, {
      cancelToken: new axios.CancelToken((cancel) => {
        cancelRequest = cancel;
      })
    }).then((res) => {
      setIsLoading(false);
      setPokecount(res.data.count);
      setNextPage(res.data.next);
      setPreviousPage(res.data.previous);
      setPokedata(res.data.results);
    })

    return () => cancelRequest();

  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage(nextPage);
  }

  const goToPreviousPage = () => {
    setCurrentPage(previousPage);
  }

  return (
    <>
      {isLoading ? 
        'Getting Pokédata...' 
        :
        <>
          <p>Showing 20 of {pokecount} Pokémon</p>
          {/*put a searchbar here*/}
          <PokeList pokedata = {pokedata} />
          <Pagination 
            goToNextPage = {nextPage ? goToNextPage : null}
            goToPreviousPage = {previousPage ? goToPreviousPage : null}
          />
          <a className='link' href="https://github.com/vicontiveros00">github/vicontiveros00</a>
        </>}
    </>
  )
}

export default Home;