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
    return {
        type: SET_USER,
        payload: user
    }
}


//reducer
export default (state = initialState, action) => {
    const {type, payload} = action
        switch (type) {
            case SET_USER:
                const {username, password, profile_img: profileimg} = payload
                return {...state, username, password, profileimg}
            default : return state
        }
}