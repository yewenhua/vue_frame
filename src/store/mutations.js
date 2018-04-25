import * as types from './types.js'

export default {
    [types.HIDELOADING]: ( state )=>{
        state.loading = false;
    },
    [types.SHOWLOADING]: ( state )=>{
        state.loading = true;
    },
    [types.LOGIN]: ( state, param )=>{
        state.token = param.token;
    },
    [types.LOGOUT]: ( state )=>{
        state.token = '';
    },
    [types.REGIST]: ( state )=>{
        state.token = '9527';
    },
    [types.INCREASE_CART]: ( state, param )=>{
        state.ball = param;
    },
    [types.DECREASE_CART]: ( state, param )=>{

    },
}
