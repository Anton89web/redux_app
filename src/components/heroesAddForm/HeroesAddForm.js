

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addHero, heroesFetched, heroesFetchingError} from "../../actions";
import {useHttp} from "../../hooks/http.hook";

const HeroesAddForm = () => {
  const {filters, heroes} = useSelector(state => state.filters);
  const dispatch = useDispatch()
  const {request} = useHttp();
  const [heroesForm, setHeroesForm] = useState({
    id: '',
    name: '',
    description: '',
    element: '',
  });

  const AddHero = (e, heroesForm) => {
    e.preventDefault()
    setHeroesForm({
      name: "",
      description: "",
      element: ""
    })

      request( `http://localhost:3001/heroes/`, "Post", JSON.stringify(heroesForm))
        .then(dispatch(addHero(heroesForm)))
        .catch(e=>alert(e))
  }

  return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">

                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    value={heroesForm.name}
                    onChange={(e)=>setHeroesForm({
                      ...heroesForm,
                      name: e.target.value,
                      id: heroes.length + 1
                    })}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    value={heroesForm.description}
                    onChange={(e)=>setHeroesForm({
                      ...heroesForm,
                      description: e.target.value
                    })}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                  value={heroesForm.element}
                  onChange={(e)=>setHeroesForm({
                    ...heroesForm,
                    element: e.target.value
                  })}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                  {filters.slice(1).map(f =>  <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
            </div>

            <button type="submit"  className="btn btn-primary"
                    onClick={(e)=> AddHero(e, heroesForm)}
            >Создать</button>
        </form>
    )
}

export default HeroesAddForm;