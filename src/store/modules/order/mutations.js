import router from "../../../router/router";
const mutations = {
  // storeAuthData: (state, authData) => {
  //   state.authData = authData;
  //   console.log(state);
  //   router.push("/");
  // },

  setLoading: (state, loading) => {
    state.loading = loading;
  },
};

export default mutations;
