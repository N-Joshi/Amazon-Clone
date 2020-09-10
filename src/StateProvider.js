import React , { createContext , useContext , useReducer} from 'react'

//Prepares Data Layer
export const StateContext = createContext();

//Wrap your app and provide Data Layer to everyComponent
export const StateProvider = ({reducer,initialState,children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)

//Pull Info from the datalayer
export const useStateValue = () => useContext(StateContext);