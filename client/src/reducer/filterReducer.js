const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS": {
      let priceArr = action.payload.map((currElem) => currElem.price);
      const maxPrice = Math.max(...priceArr);

      return {
        ...state,
        filter_Products: [...action.payload],
        all_Products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    }
    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORT_PRODUCTS":
      let newSortedData;

      const { filter_Products, sorting_value } = state;

      const sortProducts = (a, b) => {
        if (sorting_value === "a-z") return a.name.localeCompare(b.name);
        if (sorting_value === "z-a") return b.name.localeCompare(a.name);
        if (sorting_value === "lowToHigh") return a.price - b.price;
        if (sorting_value === "highToLow") return b.price - a.price;
      };

      newSortedData = [...filter_Products].sort(sortProducts);
      return {
        ...state,
        filter_Products: newSortedData,
      };

    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS": {
      const { text, category, company, price } = state.filters;
      const { all_Products } = state;
      let newProductsList = [...all_Products];

      if (text) {
        newProductsList = newProductsList.filter((currElem) =>
          currElem.name.toLowerCase().includes(text.toLowerCase())
        );
      }

      if (category !== "All") {
        newProductsList = newProductsList.filter(
          (currElem) => currElem.category === category
        );
      }
      if (company !== "All") {
        newProductsList = newProductsList.filter(
          (currElem) => currElem.brand === company
        );
      }
      if (price === 0) {
        newProductsList = newProductsList.filter(
          (currElem) => currElem.price === price
        );
      } else {
        newProductsList = newProductsList.filter(
          (currElem) => currElem.price <= price
        );
      }
      return {
        ...state,
        filter_Products: newProductsList,
      };
    }

    case "CLEAR_FILTER":
      return {
        ...state,
        filters: {
          text: "",
          category: "All",
          company: "All",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: 0,
        },
      };

    default:
      return state;
  }
};
export default filterReducer;
