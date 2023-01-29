export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
      .then(data => dispatch(heroesFilters(data)))
      .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const deleteHeroes = (id) => {
    return{
        type: "HEROES_DELETE",
        payload: id
    }
}

export const heroesFilters = (filters) => {
    return{
        type: "FILTERS_FETCHED",
        payload: filters
    }
}

export const changeFilter = (filter) => {
    return{
        type: "FILTERS_CHANGE",
        payload: filter
    }
}

// export const changeFilter = (filter) => (dispatch) => {
//     setTimeout(()=>{
//         dispatch({
//             type: "FILTERS_CHANGE",
//             payload: filter
//         })
//     }, 1000)
// }

export const addHero = (hero) => {
    return{
        type: "ADD_HERO",
        payload: hero
    }
}
