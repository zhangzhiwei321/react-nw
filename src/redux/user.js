let initialState = {
    user: 10000,
    bbb:'bbb'
}

//这是reducer
const user = (state = initialState, action) => {
    switch (action.type) {
        case '涨工资':
            return { ...state, user: action.value };
        case '扣工资':
            return { ...state, user: action.value };
        default:
            return state;
    }
}
export default user