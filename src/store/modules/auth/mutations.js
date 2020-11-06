import router from "../../../router/router";
const mutations = {
  storeAuthData: (state, authData) => {
    state.authData = authData;
    console.log(state);
    router.push("/");
  },

  setLoader: (state, loading) => {
    state.loading = loading;
  },

  logout: (state) => {
    state.authData = null;
  },
};

export default mutations;
