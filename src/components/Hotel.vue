<template>
  <template v-if="hotel">
    <div class="hotel-container">
      <div
        class="menu-container"
        :style="{
          backgroundImage: featureImage,
          backgroundSize: 'cover',
        }"
      >
        <div class="faded">
          <div class="hotel-info">
            <h2>{{ hotel.name }}</h2>
            <h3>{{ hotel.address }}</h3>
          </div>
          <div class="menu">
            <template v-for="item in hotel.menu" :key="item.id">
              <div class="menu-item">
                <h4>{{ item.name }}</h4>
                <span class="price"
                  >{{ item.price }}
                  <button @click="addItems(item)">Add</button></span
                >
                <p>{{ item.desc }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="bill-container">
        <Bill :billItems="orderItems" @show-modal="showModal = true" />
      </div>
    </div>
    <template v-if="showModal">
      <ContactForm @cancel="navigate" />
    </template>
  </template>
  <template v-else>
    <p>loading..</p>
  </template>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { hotels } from "../hotels";
import Bill from "./Bill.vue";
import ContactForm from "./ContactForm.vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hotel = ref(null);
    const showModal = ref(false);
    let orderItems = reactive([]);
    const featureImage = ref();
    const addItems = (item) => {
      if (orderItems && orderItems.length > 0) {
        const index = orderItems.findIndex((o) => o.id === item.id);
        if (index === -1) {
          orderItems.push({ ...item, quantity: 1 });
        } else {
          orderItems[index] = {
            ...orderItems[index],
            quantity: orderItems[index].quantity + 1,
          };
        }
      } else {
        orderItems.push({ ...item, quantity: 1 });
      }
      console.log(orderItems);
    };

    const navigate = () => {
      router.back();
      showModal.value = false;
    };

    onMounted(() => {
      console.log(route.params);
      const selectedHotel = hotels.find((h) => h.id === route.params.id);
      hotel.value = selectedHotel;
      featureImage.value = `url(${selectedHotel.featureImage})`;
      console.log(hotel);
    });
    return {
      hotel,
      addItems,
      orderItems,
      featureImage,
      showModal,
      router,
      navigate,
    };
  },
  components: {
    Bill,
    ContactForm,
  },
};
</script>

<style scoped>
.hotel-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.menu-container {
  width: 70%;
  color: #ffffff;
}
.menu {
  height: 550px;
  overflow: auto;
}
.bill-container {
  width: 30%;
  background-color: goldenrod;
  height: 600px;
  overflow: auto;
}
h2,
h3 {
  margin: 0;
}
.hotel-info {
  border-bottom: 1px solid goldenrod;
  border-right: 1px solid goldenrod;
}
.menu-item {
  border-bottom: 1px solid honeydew;
  padding: 0.5rem;
}
.price::before {
  content: "₹";
}
.faded {
  background-color: rgba(0, 0, 0, 0.65);
}
</style>
