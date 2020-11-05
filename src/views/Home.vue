<template>
  <div class="filter-container">
    <h2>Menu</h2>
    <input type="text" placeholder="Search hotel" v-model="searchedHotel" @keyup="search" />
    <div>
      Filter by:
      <select class="filter" v-model="selectedOption" @change="sort($event)">
        <option value="" disabled>Select</option>
        <option value="rating">Rating</option>
        <option value="name">Name</option>
        <option value="review">Reviews</option>
      </select>
    </div>
  </div>
  <div class="hotels-container">
    <template v-for="hotel in hotels" :key="hotel.id">
      <div class="hotel-card">
        <img :src="hotel.thumbnailImage" :alt="hotel.name" />
        <h3>{{ hotel.name }}</h3>
        <p class="cuisine">
          {{ hotel.cuisines }}
        </p>
        <div class="rating">
          <template
            v-for="(rating, index) in Math.ceil(+hotel.rating)"
            :key="index"
          >
            <h4>⭐</h4>
          </template>
        </div>
        <h4>Reviews: {{ hotel.reviews }}</h4>
      </div>
    </template>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { hotels } from "../hotels.js";
export default {
  setup() {
    const selectedOption = ref("");
    const searchedHotel = ref("");
    const actualHotels = ref(hotels);

    const sort = (e) => {
      window.scrollTo(0, 0);
      console.log(1);
      if (e.target.value === "name") {
        actualHotels.value = hotels.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : b.name.toLowerCase() > a.name.toLowerCase()
            ? -1
            : 0
        );
      }
      if (e.target.value === "rating") {
        actualHotels.value = hotels.sort((a, b) => b.rating - a.rating);
      }
      if (e.target.value === "review") {
        actualHotels.value = hotels.sort((a, b) => b.reviews - a.reviews);
      }
    };

    const search = () => {
      console.log(searchedHotel.value);
      let filteredHotels = [...hotels];
      if (searchedHotel.value === "") {
        actualHotels.value = filteredHotels;
      } else {
        actualHotels.value = filteredHotels.filter((hotel) =>
          hotel.name.toLowerCase().startsWith(searchedHotel.value.toLowerCase())
        );
      }
      console.log(actualHotels.value);
    };

    return {
      hotels: actualHotels,
      selectedOption,
      sort,
      search,
      searchedHotel,
    };
  },
};
</script>

<style scoped>
.filter-container {
  padding: 0 1rem;
  background-color: springgreen;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: -webkit-fill-available;
  z-index: 1;
  height: 65px;
}
.filter {
  padding: 0.5rem;
}
.hotels-container {
  padding: 1rem;
  /* background-color: salmon; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  top: 65px;
}
.hotel-card {
  border: 1px solid #000000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 250px;
  height: 350px;
  transition: all 0.5s;
  cursor: pointer;
}
.hotel-card:hover {
  transform: scale(1.03, 1.03);
  box-shadow: 3px 2px #000000;
}
img {
  vertical-align: middle;
}
.cuisine {
  overflow: hidden;
  text-overflow: ellipsis;
}
.rating {
  display: flex;
}
h3,
h4 {
  margin-top: 0;
}
input {
  padding: 0.5rem;
  text-align: center;
}
</style>
