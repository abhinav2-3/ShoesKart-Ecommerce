const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { id, amount, product } = action.payload;
      const existingProduct = [...state.cart].find(
        (currElem) => currElem.id === id
      );
      if (existingProduct) {
        const updatedProduct = [...state.cart].map((currElem) => {
          if (currElem.id === id) {
            let newAmount = currElem.amount + amount;
            if (newAmount >= currElem.max) newAmount = currElem.max;
            return {
              ...currElem,
              amount: newAmount,
            };
          } else {
            return currElem;
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct = {
          id,
          amount,
          name: product.name,
          image: product.image[0],
          price: product.price,
          max: product.countInStock,
        };
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    }

    case "SET_INCREMENT": {
      let updatedProduct = [...state.cart].map((currElem) => {
        if (currElem.id === action.payload) {
          let incAmount = currElem.amount + 1;
          if (currElem.amount >= currElem.max) incAmount = currElem.max;
          return {
            ...currElem,
            amount: incAmount,
          };
        } else {
          return currElem;
        }
      });

      return {
        ...state,
        cart: updatedProduct,
      };
    }

    case "SET_DECREMENT": {
      let updatedProduct = [...state.cart].map((currElem) => {
        if (currElem.id === action.payload) {
          let decAmount = currElem.amount - 1;
          if (currElem.amount <= 1) decAmount = 1;
          return {
            ...currElem,
            amount: decAmount,
          };
        } else {
          return currElem;
        }
      });

      return {
        ...state,
        cart: updatedProduct,
      };
    }

    case "REMOVE_PRODUCT": {
      const newProductList = [...state.cart].filter(
        (currElem) => currElem.id !== action.payload
      );
      return {
        ...state,
        cart: newProductList,
      };
    }

    case "SET_TOTAL_PRICE": {
      const total_price = [...state.cart].reduce((initialValue, currElem) => {
        let { price, amount } = currElem;
        initialValue += price * amount;
        if (initialValue < 600000) {
          initialValue += state.shipping_fee;
        }
        return initialValue;
      }, 0);
      return {
        ...state,
        total_price,
      };
    }

    case "PLACE_ORDER":
      return {
        ...state,
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
