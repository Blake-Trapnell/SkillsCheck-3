//initialState
const initialState = {
    username: '',
    profileimg: '',
    password: '',
    search: '',
    user_id: '',

}


//Action constants
const SET_USER = "SET_USER"
const SEARCH_POSTS = "SEARCH_POSTS"
const KEEP_USER = "KEEP_USER"


//action builderes
export function setUser (user) {
    return {
        type: SET_USER,
        payload: user
    }
}
export function search (searchterm) {
    return {
        type: SEARCH_POSTS,
        payload: searchterm
    }
}
export function keepUser (user) {
    return {
        type: KEEP_USER,
        payload: user
    }
}


//reducer
export default (state = initialState, action) => {
    const {type, payload} = action
        switch (type) {
            case SET_USER:
                const {username, user_id, profile_img: profileimg} = payload
                return {...state, username, user_id, profileimg}
            case SEARCH_POSTS:
                return {...state, search: payload}
            // case KEEP_USER:
            //     const {username, profile_img: profileimg} = payload
            //     return{...state, username, profileimg }
            default : return state
        }
}