import {
  changeFilter, fetchFilters,
  heroesFetchingError,
  heroesFilters
} from "../../actions";
import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";

const HeroesFilters = () => {
    const {filters, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch()
    const {request} = useHttp();

    useEffect(() => {
      dispatch( fetchFilters(request))
    }, []);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                 <div className="btn-group">
                    {filters.length === 0 ? "" : filters.map(f => <button
                      key={f.name}
                      onClick={()=> dispatch(changeFilter(f.name))}
                      className={`btn 
                      ${activeFilter === f.name ? 'active' : ''} 
                      ${f.class} `}>
                      {f.name}
                    </button>)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;