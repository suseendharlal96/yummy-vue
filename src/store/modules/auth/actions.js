import axios from "axios";

const actions = {
  authenticate: async ({ commit }, { isSignup, authData }) => {
    commit("setError", null);
    commit("setLoader", true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlMoiTr7TXkCCtEd3wNNDpSp5RX76jGzw";
    if (isSignup.value) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlMoiTr7TXkCCtEd3wNNDpSp5RX76jGzw";
    }
    try {
      const res = await axios.post(url, authData);
      if (res) {
        commit("setLoader", false);
        commit("setError", null);
        commit("storeAuthData", res.data);
      }
    } catch (err) {
      commit("setError", err.response.data.error.message);
      commit("setLoader", false);
      alert("Something went wrong.Please try again.");
    }
  },
};

export default actions;
