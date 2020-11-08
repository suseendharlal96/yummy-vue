<template>
  <div class="success-container">
    <div class="faded">
      <div class="content">
        <h2>👉Your Order has been successfully placed👈</h2>
        <div class="btn-container">
          <button class="btn-success" @click="router.push('/')">
            Place new order</button
          ><button class="btn-primary" @click="router.push('/')">
            My Orders
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.success-container {
  background-image: url("https://b.zmtcdn.com/data/pictures/8/18567908/dff65b2537f5002ef55ed617d7690fac.jpg?output-format=webp");
  background-size: cover;
  height: 607px;
}
.faded {
  background-color: rgba(0, 0, 0, 0.85);
  height: 100%;
}
.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 50px;
}
.content {
  margin: 0 auto;
  padding: 5rem;
  color: #ffffff;
}
button {
  cursor: pointer;
  border-radius: 5px;
  padding: 6px 12px;
  font-weight: 400;
}
.btn-success {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
  padding: 0.5rem;
}
.btn-success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  padding: 0.5rem;
}
.btn-primary:hover {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
h2 {
  margin-top: 0;
}
</style>
