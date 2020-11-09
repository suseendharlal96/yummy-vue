import router from "../../../router/router";
const mutations = {
  storeAuthData: (state, authData) => {
    state.authData = authData;
    router.push("/");
  },

  setLoader: (state, loading) => {
    state.loading = loading;
  },

  logout: (state) => {
    state.authData = null;
  },

  setError: (state, error) => {
    state.errors = error;
  },
};

export default mutations;
