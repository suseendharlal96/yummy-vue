import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const orderModule = {
  state: () => ({
    tempOrders: null,
    loading: false,
    myOrders:null
  }),
  getters,
  mutations,
  actions,
};

export default orderModule;
