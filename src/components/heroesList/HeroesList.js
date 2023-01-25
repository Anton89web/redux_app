import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {heroesFetching, heroesFetched, heroesFetchingError, deleteHeroes} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
    const {heroes, heroesLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request("http://localhost:3001/heroes")
          .then(data => dispatch(heroesFetched(data)))
          .catch(() => dispatch(heroesFetchingError()))
        dispatch(heroesFetching());

        // eslint-disable-next-line
    }, []);

    const deleteHero = (id) => {
        request( `http://localhost:3001/heroes/${id}`, "DELETE")
          .then(dispatch(deleteHeroes(id)))
          .catch(() => dispatch(heroesFetchingError()))
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }else if (activeFilter === 'Все'){
            return arr.map(({id, ...props})=><HeroesListItem key={id} {...props} del={()=> deleteHero(id)}/>)
        } else {
            return arr.filter(h => h.element === activeFilter).map(({id, ...props}) => <HeroesListItem key={id} {...props} del={()=> deleteHero(id)}/>)
        }
            return <h5 className="text-center mt-5">Героев c таким элементом нет</h5>
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;