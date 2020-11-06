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
  </div>
</template>

<script>
import { reactive, watch, ref } from "vue";
export default {
  props: ["billItems"],
  setup({ billItems }) {
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
      changeQty,
      total,
    };
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
</style>
