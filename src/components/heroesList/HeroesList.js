import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createSelector} from "reselect";
import {heroesFetchingError, deleteHeroes, fetchHeroes} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
    const FiltersHeroeseSelector = createSelector(
      (state)=> state.filters.activeFilter,
      (state)=> state.heroes.heroes,
      (activeFilter, heroes) => ({activeFilter, heroes})
    )
    const {heroes, activeFilter} = useSelector(FiltersHeroeseSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();
    console.log(heroes, activeFilter)

    useEffect(() => {
        dispatch(fetchHeroes(request))
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
            const filterHero =  arr.filter(h => h.element === activeFilter)
            return filterHero.length ?
              filterHero.map(({id, ...props}) => <HeroesListItem key={id} {...props} del={()=> deleteHero(id)}/>)
              :
              <h5 className="text-center mt-5">Героев c таким элементом нет</h5>
        }
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;