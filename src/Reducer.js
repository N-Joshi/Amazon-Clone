export const initialState = {
    basket:[],
    user:null
}


 //Selector
 export const getBasketPrice = (basket) =>
    basket?.reduce((amount,item)=> item.price + amount,0)


const reducer = (state,action) =>{

    console.log(action)
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket:[...state.basket,action.item]
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            )
            let newBasket = [...state.basket]

            if(index >= 0){
                newBasket.splice(index,1);
            }else{
                console.warn(`Cant Remove the item (id: ${action.id}) as has not been added or already removed`)
            }
            return{
                ...state,        
                basket:newBasket
            }   

        case "SET_USER":
            return{
                ...state,
                user:action.user
            }

        case "EMPTY_BASKET":
            return{
                ...state,
                basket:[]
            }

        default:
            return state;
    }
}

export default reducer