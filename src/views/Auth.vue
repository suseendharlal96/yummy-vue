<template>
  <div class="form-container">
    <div class="faded-container">
      <h2>{{ isSignup ? "Signup" : "Signin" }}</h2>
      <form class="form" @submit.prevent="onSubmit">
        <div>
          <label for="email">Email</label>
          <input
            class="input-container"
            type="text"
            v-model.lazy.trim="form.email"
            placeholder="example@email.com"
            id="email"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            class="input-container"
            type="password"
            v-model.lazy.trim="form.password"
            placeholder="Password(min 6 charac)"
            id="password"
          />
        </div>
        <template v-if="isSignup">
          <div>
            <label for="confirmPassword">Confirm Password</label>
            <input
              class="input-container"
              type="password"
              v-model.lazy.trim="form.confirmPassword"
              placeholder="Retype your password"
              id="confirmPassword"
            />
          </div>
        </template>
        <div class="btn-container">
          <button
            class="btn-mode"
            :disabled="loading"
            type="button"
            @click="changeMode"
          >
            Switch to {{ isSignup ? "Signin" : "Signup" }}
          </button>
          <button class="btn-primary" :disabled="loading" type="submit">
            {{
              isSignup
                ? loading
                  ? "Please wait.."
                  : "Signup"
                : loading
                ? "Please wait"
                : "Signin"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    const form = reactive({
      email: "",
      password: "",
      confirmPassword: "",
    });

    const isSignup = ref(false);

    const onSubmit = () => {
      console.log(form);
      const authData = {
        email: form.email,
        password: form.password,
        returnSecureToken: true,
      };
      store.dispatch("auth/authenticate", { isSignup, authData });
    };

    const changeMode = () => {
      isSignup.value = !isSignup.value;
    };

    const loading = computed(() => store.getters["auth/getLoader"]);

    return {
      form,
      onSubmit,
      changeMode,
      isSignup,
      loading,
    };
  },
};
</script>

<style scoped>
.form-container {
  background: url("https://b.zmtcdn.com/data/res_imagery/71799_RESTAURANT_1422bd9c0916341e29b9df6cf03b213d.jpg");
  background-position: 50% 50%;
  /* background-attachment: scroll; */
  object-fit: contain;
  height: 600px;
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
  background: rgba(0, 0, 0, 0.55);
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
.smoke-effect {
  background-image: linear-gradient(transparent, rgba(37, 37, 37, 0.61), #111);
  height: 172px;
}
</style>
