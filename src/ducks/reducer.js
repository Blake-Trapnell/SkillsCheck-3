//initialState
const initialState = {
    username: '',
    profileimg: '',
    password: '',

}


//Action constants
const SET_USER = "SET_USER"


//action builderes
export function setUser (user) {
    console.log('hit')
    return {
        type: SET_USER,
        payload: user
    }
}
export function testing(string1, string2, string3) {
    console.log('connected', string1, string2, string3)
}


//reducer
export default (state = initialState, action) => {
    const {type, payload} = action
        switch (type) {
            case SET_USER:
                const {username, password, profileimg} = payload
                return {...state, username, password, profileimg}
            default : return state
        }
}