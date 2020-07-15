import { initStore } from "./store";
import * as cts from "../utility/constants";

const configureStore = () => {
  const actions = {
    SET_ALGO: async (state, action) => {
      state.algorithm = action.algo;
      return { ...state, algorithm: action.algo };
    },
    SET_INFO: async (state, action) => {
      state.info = action.info;
      return { ...state, info: action.info };
    },
  };
  initStore(actions, { algorithm: cts.DIJKSTRA, info: cts.DIJKSTRA });
};

export default configureStore;
