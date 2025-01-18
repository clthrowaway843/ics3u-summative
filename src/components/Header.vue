<script setup>
import { RouterLink } from 'vue-router';
import { useStore } from '../store';
const registrationStore = useStore();
const store = useStore();
</script>

<template>
  <div class="header">
    <nav>
      <ul class="navlist">
        <li class="logo">Feminine Flix</li>
        <div class="buttons">
          <li v-if="$route.path === '/'">
            <RouterLink to="/login" class="button login">Login</RouterLink>
            <RouterLink to="/register" class="button register">Register</RouterLink>
          </li>
          <li v-if="$route.path === '/movies' || $route.path === '/setting' || $route.path === '/cart'">
            <h1 class="email">{{ `Hello ${store.user?.displayName}!` }}</h1>
            <RouterLink to="/setting" class="button setting">Setting</RouterLink>
            <RouterLink to="/" class="button setting">Logout</RouterLink>
            <RouterLink to="/cart" class="button cart">Cart</RouterLink>
            <RouterLink to="/movies" class="button setting">Movies</RouterLink>
          </li>
          <li v-if="$route.path === '/login' || $route.path === '/register'">
            <RouterLink to="/" class="button setting">Home</RouterLink>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.navlist {
  list-style-type: none;
  margin: 8px 8px;
  padding: 0;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 2rem;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-weight: bold;
  margin-left: 8px;
  color: hotpink;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  gap: 10px; 
}

.button {
  background-color: rgb(255, 255, 255);
  color: black;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 4px;
  font-weight: bold;
  display: inline-flex; 
  align-items: center;
}

.email {
  font-size: 1rem;
  margin-left: 20px; 
  display: inline-block; 
}
</style>
