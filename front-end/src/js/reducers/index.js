
const reducer = (state, action) => {
   switch(action.type) {
      case "UPDATE_VIDEO":
         return {
            state,
            name: action.payload
         };
      case "UPDATE_CONTINENT":
         return {
            state,
            name: action.payload
         }
      case "UPDATE_SECTION":
         return {
            state,
            name: action.payload
         }
      default:
         return state;
   }
}

export default reducer;
