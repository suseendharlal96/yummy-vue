<template>
  <div class="container" v-if="!loading">
    <template v-if="orders && orders.length > 0">
      <template v-for="(order, index) in orders" :key="index">
        <div class="order-item">
          <h3>
            {{ order && order?.orderData?.name }}
          </h3>
          <p>
            Total: ₹{{ order?.orderData?.total }} on
            <b>
              {{ dayjs(order.orderDate).format("MMM D, YYYY h:mm A") }}
            </b>
          </p>
          <div class="menu-items">
            <template
              v-for="(item, index) in order?.orderData?.menu"
              :key="item.id"
            >
              <div>
                {{ index + 1 }}. {{ item?.name }} ₹{{ item?.price }} *
                {{ item?.quantity }} = ₹
                {{ item?.price * item?.quantity }}
              </div>
            </template>
          </div>
          <template v-if="index + 1 === activeIndex"
            ><button class="btn-hide" @click="more(-1)">Hide</button>
          </template>
          <template v-else>
            <button class="btn-more" @click="more(index + 1)">More</button>
          </template>
          <div :class="[index + 1 === activeIndex ? 'show' : 'hide']">
            <p><b>Customer Details:</b></p>
            <p><b>Name:</b> {{ order?.customerDetails?.name }}</p>
            <p><b>Email:</b> {{ order?.customerDetails?.email }}</p>
            <p><b>Street:</b> {{ order?.customerDetails?.street }}</p>
            <p><b>Pin:</b> {{ order?.customerDetails?.zipCode }}</p>
            <p><b>Country:</b> {{ order?.customerDetails?.country }}</p>
            <p>
              <b>Delivery Mode:</b> {{ order?.customerDetails?.deliverymode }}
            </p>
          </div>
        </div>
      </template>
    </template>
    <template v-else> No orders </template>
  </div>
  <div class="container" v-else>
    <p>loading..</p>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = computed(() => store.getters["order/getLoading"]);
    const orders = computed(() => store.getters["order/getMyOrders"]);
    const activeIndex = ref(0);
    const more = (i) => {
      activeIndex.value = i;
    };
    onMounted(() => {
      const authData = computed(() => store.getters["auth/getAuthData"]);
      if (authData.value && authData.value.email) {
        store.dispatch("order/fetchOrder", { authData: authData.value });
      } else {
        router.push("/auth");
      }
    });
    return {
      loading,
      orders,
      dayjs,
      activeIndex,
      more,
    };
  },
};
</script>

<style scoped>
p {
  margin-top: 0;
}
h3 {
  margin-top: 0;
}
.order-item {
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.5s;
}
.show {
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.5s;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
}
.hide {
  display: none;
}
.order-item:hover {
  transform: scale(1.03, 1.03);
  box-shadow: 2px 2px;
}
.container {
  padding: 4rem;
}
.menu-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.btn-hide {
  margin-bottom: 10px;
}
button {
  cursor: pointer;
  border-radius: 5px;
  /* box-shadow: 2px 3px #000000; */
  padding: 6px 12px;
  font-weight: 400;
}
.btn-more {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-more:hover {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-hide {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-hide:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
</style>
