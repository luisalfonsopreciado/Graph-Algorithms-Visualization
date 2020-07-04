import { initStore } from "./store";
import * as cts from "../utility/constants";

const configureStore = () => {
  const actions = {
    SET_ALGO: async (state, action) => {
      
      state.algorithm = action.algo;
      return { ...state, algorithm: action.algo};
    },
  };
  initStore(actions, { algorithm: cts.DIJKSTRA });
};

export default configureStore;
