<template>
  <div class="bill-contents">
    <h3>Order Summary</h3>
    <div v-for="item in items" :key="item.id">
      <div class="order">
        {{ item.name }}<span class="price">({{ item.price }}) </span>
        <div class="controls">
          <button @click="changeQty(item.id, 'less')">-</button>
          <input type="text" disabled :value="item.quantity" />
          <button @click="changeQty(item.id, 'more')">+</button>
        </div>
      </div>
    </div>
    <h3>Total: ₹{{ total }}</h3>
    <div class="btn-container">
      <template v-if="authData">
        <button class="btn-pay" @click="navigate" :disabled="total <= 0">
          Proceed to pay ₹{{ total }}
        </button>
      </template>
      <template v-else>
        <button class="btn-login" @click="router.push('/auth')">Login</button>
      </template>
      <button class="btn-back" @click="router.push('/')">Back to Hotels</button>
    </div>
  </div>
</template>

<script>
import { reactive, watch, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import ContactForm from "./ContactForm.vue";

export default {
  props: ["billItems"],
  emits: ["show-modal"],
  setup({ billItems }, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    console.log(billItems);
    let items = reactive(billItems);
    const total = ref(0);

    const changeQty = (id, option) => {
      const index = items.findIndex((t) => t.id === id);
      if (option === "more") {
        items[index].quantity++;
      } else {
        if (items[index].quantity === 1) {
          const a = items;
          items.splice(index, 1);
        } else {
          items[index].quantity--;
        }
      }
    };

    const navigate = () => {
      emit("show-modal");
      router.push(`${route.path}/pay`);
    };

    const authData = computed(() => store.getters["auth/getAuthData"]);

    watch([items], () => {
      console.log(items);
      let sum = 0;
      items.forEach((item) => {
        sum += item.price * item.quantity;
      });
      total.value = sum;
    });
    return {
      items,
      authData,
      changeQty,
      total,
      router,
      navigate
    };
  },
  components: {
    ContactForm,
  },
};
</script>

<style scoped>
.bill-contents {
  color: #ffffff;
  padding: 1rem;
}
.controls {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
input {
  width: 50px;
  text-align: center;
}
.price::before {
  content: "₹";
}
.order {
  padding: 1rem;
  border-bottom: 1px solid brown;
}
input:disabled {
  cursor: no-drop;
}
.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
button {
  cursor: pointer;
}
button:disabled {
  cursor: no-drop;
}
.btn-pay {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
  padding: 0.5rem;
}
.btn-pay:not(:disabled):hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-login {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  padding: 0.5rem;
}
.btn-login:not(:disabled):hover {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-back {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
  padding: 0.5rem;
}
.btn-back:not(:disabled):hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
</style>
