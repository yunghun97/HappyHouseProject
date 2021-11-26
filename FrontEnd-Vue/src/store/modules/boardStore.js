import { selectBoard } from "@/api/board.js";
const boardStore = {
    namespaced: true,
    state:{
        boards:[],
    },
    mutations:{
        SET_BOARD(state,data){
            state.boards = data;
        }
    },
    actions: {
        getBoard: ({commit})=>{
            selectBoard(
                (response) => {        
                  commit("SET_BOARD",response.data);                  
                },
                (error) => {
                  console.log(error);
                }
              );  
        }
    }
}
export default boardStore;
