// ======================================
//  First File  created as reducer
// ======================================

const initial_data = {
    counter : 2
}

export const counter_reducer = (state = initial_data,  action) => {
    switch(action.type){
        case 'INC':
            return {...state, counter : state.counter + action.add_plus };
        case  'DEC' :
            return {...state, counter : state.counter - action.add_minus}
        default : 
            return state;
    }
}