import { useReducer, useEffect } from "react";
import api from "../services/api";

// Função pura (mais fácil de testar)
const reducer = (state, action) => {
  if (action.type === "REQUEST") {
    return {
      ...state,
      loading: true
    };
  }
  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      data: action.data
    };
  }

  return state;
};

const useGet = url => {
  // HOOKS: useReduer
  const [data, dispatch] = useReducer(reducer, {
    loading: true,
    data: {}
  });

  // HOOKS: useEffect
  useEffect(() => {
    dispatch({ type: "REQUEST" });
    api.get(url).then(res => {
      dispatch({ type: "SUCCESS", data: res.data });
    });
  }, []);

  return data;
};

export default useGet;
