import axios from "axios";

import router from "../../../router/router";
const actions = {
  fetchOrder: async ({ commit }, { authData }) => {
    commit("setLoading", true);
    const queryParams =
      "?auth=" +
      authData.idToken +
      '&orderBy="userId"&equalTo="' +
      authData.localId +
      '"';
    const res = await axios.get(
      "https://foodie-vue.firebaseio.com/orders.json" + queryParams
    );
    if (res) {
      commit("setLoading", false);
      const orders = [];
      for (let key in res.data) {
        orders.unshift(res.data[key]);
      }
      commit("setOrders", orders);
    } else {
      commit("setLoading", false);
      alert("Something went wrong.Please try again.");
    }
  },

  placeOrder: async ({ commit }, { order, token }) => {
    commit("setLoading", true);
    const res = await axios.post(
      "https://foodie-vue.firebaseio.com/orders.json?auth=" + token,
      order
    );
    if (res) {
      console.log(res.data);
      commit("setLoading", false);
      router.push("/success");
    } else {
      alert("Something went wrong.Please try again.");
      commit("setLoading", false);
    }
  },
};

export default actions;
