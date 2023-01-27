const initialState = {
    filters: [],
    activeFilter: "Все"
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
            }
        case 'FILTERS_CHANGE':
            return {
                ...state,
                activeFilter:  action.payload,
            }
        default: return state
    }
}

export default filters;