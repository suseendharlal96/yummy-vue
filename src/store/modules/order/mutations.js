const mutations = {
  setOrders: (state, orders) => {
    state.myOrders = orders;
  },
  setLoading: (state, loading) => {
    state.loading = loading;
  },
};

export default mutations;
