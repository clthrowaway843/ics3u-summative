<script setup>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from "../store";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const store = useStore();


async function registerByEmail() {
  if (password1.value !== password2.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password1.value);
    const user = userCredential.user;

    await updateProfile(user, { displayName: `${name.value} ${lastName.value}` });

    store.user = user;

    router.push("/movies");
  } catch (error) {
    console.error(error);
    alert("There was an error creating a user with email!");
  }
}

async function registerByGoogle() {

  if (store.user) {
    router.push("/login");
    return; 
  }

  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;

    store.user = user;

    router.push("/movies");
  } catch (error) {
    console.error(error);
    alert("There was an error signing in with Google!");
  }
}
</script>

<template>
  <Header />
  <div class="form-container">
    <h2>Create an Account</h2>
    <form @submit.prevent="registerByEmail">
      <input type="text" placeholder="First Name" class="input-field" v-model="firstName" required />
      <input type="text" placeholder="Last Name" class="input-field" v-model="lastName" required />
      <input type="email" placeholder="Email" class="input-field" v-model="email" required />
      <input type="password" placeholder="Password" class="input-field" v-model="password" required />
      <input type="password" placeholder="Re-Enter Password" class="input-field" v-model="confirmPassword" required />
      <button type="submit" class="register">Register</button>
    </form>
  </div>
  <button @click="registerByGoogle" class="button register">Register by Google</button>
  <Footer />
</template>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 25% !important;
}

.form-container h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-container form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  gap: 15px;
}

.input-field {
  padding: 15px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: hotpink;
  outline: none;
}

.register {
  background-color: hotpink;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.register:hover {
  background-color: rgb(246, 151, 198);
  transform: scale(1.05);
}

.logo {
  font-size: 2rem;
  float: left !important;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  font-weight: bold;
  margin-left: 8px;
  color: hotpink;
}
</style>
