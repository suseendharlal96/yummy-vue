<template>
  <div class="form-container">
    <div class="faded-container">
      <h2>Place your Order</h2>
      <form class="form" @submit.prevent="onSubmit">
        <div>
          <label for="name">Name</label>
          <input
            class="input-container"
            type="text"
            v-model.lazy.trim="form.name"
            placeholder="John Doe.."
            id="name"
          />
        </div>
        <div>
          <label for="street">Street</label>
          <input
            class="input-container"
            type="text"
            v-model.lazy.trim="form.street"
            placeholder="Street Name"
            id="street"
          />
        </div>
        <div>
          <label for="pin">Pin Code</label>
          <input
            class="input-container"
            type="text"
            v-model.lazy.trim="form.pin"
            placeholder="Pincode"
            id="pin"
            minlength="6"
            maxlength="6"
          />
        </div>
        <div>
          <label for="country">Country</label>
          <input
            class="input-container"
            type="text"
            v-model.lazy.trim="form.country"
            placeholder="Country"
            id="country"
          />
        </div>
        <div>
          <select v-model="form.payment">
            <option value="" disabled>Select mode</option>
            <option value="fast">Fast</option>
            <option value="cheap">Cheapest</option>
          </select>
        </div>
        <div class="btn-container">
          <button
            class="btn-mode"
            :disabled="loading"
            type="button"
            @click="$emit('cancel')"
          >
            Cancel
          </button>
          <button
            class="btn-primary"
            :disabled="loading || !isValid"
            type="submit"
          >
            {{ loading ? "Please wait.." : "Place Order" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  emits: ["cancel"],
  props: ["orderItems"],
  setup({ orderItems }) {
    console.log(orderItems);
    // const selectedOption = ref("");
    const valid = ref(false);
    const store = useStore();
    const form = reactive({
      name: "",
      pin: "",
      street: "",
      country: "",
      payment: "",
    });

    const isValid = computed(() => {
      valid.value =
        form.name !== "" &&
        form.pin !== "" &&
        form.pin.length === 6 &&
        form.street !== "" &&
        form.country !== "" &&
        form.payment !== "";
      return valid.value;
    });

    const authData = computed(() => store.getters["auth/getAuthData"]);
    const loading = computed(() => store.getters["order/getLoading"]);

    const onSubmit = () => {
      let total = 0;
      orderItems.menu.forEach((m) => {
        total += m.price * m.quantity;
      });
      const orderData = {
        name: orderItems.hotel.name,
        id: orderItems.hotel.id,
        address: orderItems.hotel.address,
        total,
        menu: orderItems.menu,
      };
      const order = {
        orderData,
        customerDetails: {
          name: form.name,
          street: form.street,
          zipCode: form.pin,
          country: form.country,
          email: authData.value.email,
          deliverymode: form.payment,
        },
        orderDate: new Date().toISOString(),
        userId: authData.value.localId,
      };
      console.log(order);
      const token = authData.value.idToken;
      store.dispatch("order/placeOrder", { order, token });
    };

    return {
      form,
      isValid,
      onSubmit,
      loading,
    };
  },
};
</script>

<style scoped>
.form-container {
  position: absolute;
  top: 0;
  width: 70%;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 5rem;
  width: 325px;
  margin: 0 auto;
}
.faded-container {
  background: rgba(0, 0, 0, 0.85);
  height: 605px;
}
.input-container {
  width: 315px;
  height: 30px;
  margin-bottom: 20px;
  padding: 0 10px;
}
.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: inherit;
}
button {
  cursor: pointer;
  border-radius: 5px;
  /* box-shadow: 2px 3px #000000; */
  padding: 6px 12px;
  font-weight: 400;
}
button:disabled {
  cursor: no-drop;
}
.btn-mode {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-mode:not(:disabled):hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary:not(:disabled):hover {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
label {
  color: #ffffff;
}
label::after {
  content: "*";
  color: #ff0000;
}
h2 {
  margin: 0;
  color: #ffffff;
}
</style>
