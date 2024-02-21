const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "API_ERROR":
      return { ...state, isLoading: false, isError: true };

    case "SET_API_DATA": {
      const featuredData = action.payload.filter((currItem) => {
        return currItem.featured === true;
      });

      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
        featureProducts: featuredData,
      };
    }
    default:
      return state;
  }
};
export default productReducer;
