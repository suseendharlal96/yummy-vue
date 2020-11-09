import router from "../../../router/router";
const mutations = {
  // storeAuthData: (state, authData) => {
  //   state.authData = authData;
  //   console.log(state);
  //   router.push("/");
  // },
  setOrders: (state, orders) => {
    state.myOrders = orders;
  },
  setLoading: (state, loading) => {
    state.loading = loading;
  },
};

export default mutations;
