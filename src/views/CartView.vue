<script setup>
import { useStore } from '../store';
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

</script>

<template>
    <div class="cart">
        <h1>Shopping Cart</h1>
        <div class="item" v-for="([key, value]) in store.cart">
            <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" />
            <h1>{{ value.title }}</h1>
            <button @click="store.removeFromCart(key)">Remove</button>
        </div>
        <div v-if="store.checkoutCompleted" class="message">
            <p>Thank you for your purchase!</p>
        </div>
        <div class="checkout">
            <button @click="store.clearCart()">Checkout</button>
        </div>
    </div>
</template>

<style scoped>
h1 {
    color: hotpink;
    text-align: center;
}

button {
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: hotpink;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.cart {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100vw;
}

.item {
    display: flex;
    align-items: center;
    gap: 2rem;
}

img {
    width: 10%;
    border-radius: 5%;
}
</style>
