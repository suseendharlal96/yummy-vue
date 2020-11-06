import axios from "axios";

const actions = {
  authenticate: async ({ commit }, { isSignup, authData }) => {
    console.log(isSignup);
    commit("setLoader", true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlMoiTr7TXkCCtEd3wNNDpSp5RX76jGzw";
    if (isSignup.value) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlMoiTr7TXkCCtEd3wNNDpSp5RX76jGzw";
    }
    const res = await axios.post(url, authData);
    console.log(res);
    if (res) {
      commit("setLoader", false);
      commit("storeAuthData", res.data);
    } else {
      commit("setLoader", false);
      alert("Something went wrong.Please try again.");
    }
  },
};

export default actions;
