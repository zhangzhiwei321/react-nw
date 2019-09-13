let initialState = {
    music: 10000,
    aaa: 'aaa'
}

//这是reducer
const music = (state = initialState, action) => {
    switch (action.type) {
        case '涨工资':
            return { ...state, music: state.music += action.value };
        case '扣工资':
            return { ...state, music: state.music -= action.value };
        default:
            return state;
    }
}
export default music