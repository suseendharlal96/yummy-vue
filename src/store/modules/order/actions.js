import axios from "axios";

import router from "../../../router/router";
const actions = {
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
