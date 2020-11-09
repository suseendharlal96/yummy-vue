<template>
  <div class="container" v-if="!loading">
    <template v-if="orders && orders.length > 0">
      <div class="filter-container">
        <div class="filter-contents">
          <div class="item">
            <b> Date </b>
            <input
              @change="sortDate"
              value="asc"
              v-model="dateSort"
              type="radio"
              name="sort"
              id="asc"
            />
            <label for="asc">old to new</label>
            <input
              @change="sortDate"
              v-model="dateSort"
              value="desc"
              type="radio"
              name="sort"
              id="desc"
            />
            <label for="desc">new to old</label>
          </div>
          <div class="item">
            <b> Hotel </b>
            <input
              @change="sortHotel"
              value="asc"
              v-model="hotelSort"
              type="radio"
              name="sort"
              id="hotelasc"
            />
            <label for="hotelasc">A-Z</label>
            <input
              @change="sortHotel"
              v-model="hotelSort"
              value="desc"
              type="radio"
              name="sort"
              id="hoteldesc"
            />
            <label for="hoteldesc">Z-A</label>
          </div>
        </div>
      </div>
      <div class="order-container">
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
      </div>
    </template>
    <template v-else> No orders </template>
  </div>
  <div class="container" v-else>
    <p>loading..</p>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = computed(() => store.getters["order/getLoading"]);
    const orders = computed(() => store.getters["order/getMyOrders"]);
    let actualOrders = reactive(orders);
    const activeIndex = ref(0);
    const dateSort = ref("");
    const hotelSort = ref("");
    const more = (i) => {
      activeIndex.value = i;
    };
    const sortDate = () => {
      if (dateSort.value === "asc") {
        actualOrders.value.sort(
          (a, b) =>
            new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
        );
      } else {
        actualOrders.value.sort(
          (a, b) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
      }
    };
    const sortHotel = () => {
      if (hotelSort.value === "asc") {
        actualOrders.value.sort((a, b) =>
          a.orderData.name.toLowerCase() < b.orderData.name.toLowerCase()
            ? -1
            : a.orderData.name.toLowerCase() > b.orderData.name.toLowerCase()
            ? 1
            : 0
        );
      } else {
        actualOrders.value.sort((a, b) =>
          a.orderData.name.toLowerCase() > b.orderData.name.toLowerCase()
            ? -1
            : a.orderData.name.toLowerCase() < b.orderData.name.toLowerCase()
            ? 1
            : 0
        );
      }
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
      orders: actualOrders,
      dayjs,
      activeIndex,
      more,
      sortDate,
      dateSort,
      sortHotel,
      hotelSort,
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
  display: flex;
  /* flex-wrap: wrap; */
  /* justify-content: ; */
}
.filter-container {
  width: 30%;
  margin-right: 0.5rem;
  float: left;
}
.filter-contents {
  background-color: sandybrown;
  position: fixed;
  width: 250px;
  padding: 0.5rem;
  text-align: start;
}
.item {
  margin-bottom: 10px;
}
.order-container {
  width: 70%;
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
@media screen and (max-width: 550px) {
  .filter-contents {
    position: relative;
    width: 250px;
  }
  .container {
    flex-wrap: wrap;
  }
}
</style>
