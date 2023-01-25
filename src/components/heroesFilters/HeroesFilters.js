
// Задача для этого компонента:
//!! Фильтры должны формироваться на основании загруженных данных
//!! Фильтры должны отображать только нужных героев при выборе
//!! Активный фильтр имеет класс active
//!! Изменять json-файл для удобства МОЖНО!
//!! Представьте, что вы попросили бэкенд-разработчика об этом

import {
  changeFilter,
  heroesFetchingError,
  heroesFilters
} from "../../actions";
import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";

const HeroesFilters = () => {
    const {filters, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch()
    const {request} = useHttp();

  const colorBtn = (color)=>{
    let elementClassName;
    switch (color) {
      case 'Все':
        elementClassName = 'btn-outline-dark';
        break;
      case 'Огонь':
        elementClassName = 'btn-danger';
        break;
      case 'Вода':
        elementClassName = 'btn-primary';
        break;
      case 'Воздух':
        elementClassName = 'btn-success';
        break;
      case 'Земля':
        elementClassName = 'btn-secondary';
        break;
      default:
        elementClassName = 'btn';
    }
    return elementClassName
  }

const activeBtn = (f)=> activeFilter === f ? 'active' : colorBtn(f);

    useEffect(() => {
            request("http://localhost:3001/filters")
              .then(data => dispatch(heroesFilters(data)))
              .catch(() => dispatch(heroesFetchingError()))

    }, []);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                 <div className="btn-group">
                    {filters.length === 0 ? "" : filters.map((f,i) => <button
                      key={f}
                      onClick={()=> dispatch(changeFilter(f))}
                      className={`btn ${activeBtn(f)} `}>{f}</button>)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;