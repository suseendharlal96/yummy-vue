<template>
  <div class="navbar">
    <div class="brand" @click="navigate('/')">Yummy~Vue🥧</div>
    <a class="nav-blocks" @click="toggle">
      <span></span>
      <span></span>
      <span></span>
    </a>
    <div :class="['nav-links', showLink ? 'active' : '']">
      <ul>
        <li @click="navigate('/')" :class="activePath === '/' ? 'active' : ''">
          Home
        </li>
        <template v-if="authData">
          <li
            @click="navigate('/orders')"
            :class="activePath === '/orders' ? 'active' : ''"
          >
            My Orders
          </li>
          <li @click="logout">Logout</li>
          <li class="email">{{ authData.email }}</li>
        </template>
        <template v-else>
          <li
            @click="navigate('/auth')"
            :class="activePath === '/auth' ? 'active' : ''"
          >
            Signin
          </li>
        </template>
        <!-- <li></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const showLink = ref(false);

    const toggle = () => {
      showLink.value = !showLink.value;
    };

    const navigate = (path) => {
      router.push(path);
      showLink.value = false;
    };

    const logout = () => {
      store.commit("auth/logout");
      router.push("/auth");
    };

    const authData = computed(() => store.getters["auth/getAuthData"]);
    const activePath = computed(() => route.path);

    return {
      router,
      activePath,
      showLink,
      toggle,
      navigate,
      authData,
      logout,
    };
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  width: -webkit-fill-available;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #333;
  padding: 0 0.6rem;
  z-index: 99;
}
.brand {
  color: #00ff7f;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}
ul {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  transition: all 0.5s;
}
li {
  padding: 0.5rem;
  color: #ffffff;
  list-style: none;
  margin: 0 5px;
  padding: 16px;
}
li:not(.email).active {
  background-color: aquamarine;
  color: #333;
}
li:not(.active):hover {
  cursor: pointer;
  background-color: #777777;
}
h1 {
  margin: 0;
}
.nav-blocks {
  display: none;
}
.email {
  color: yellow;
}
@media screen and (max-width: 550px) {
  .nav-blocks {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
  }
  .nav-links {
    display: none;
  }
  .nav-links.active {
    display: flex;
    width: 100%;
  }
  ul {
    width: 100%;
    flex-direction: column;
    background-color: #333;
    position: relative;
    top: 7px;
  }

  span {
    border: 1px solid #00ff7f;
    width: 25px;
    margin-bottom: 5px;
  }
}
</style>
