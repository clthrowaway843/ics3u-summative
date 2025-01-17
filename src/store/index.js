import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());

  function addToCart(id, movieData) {
    cart.value.set(id, movieData);
    saveCartToLocalStorage();
  }


  function removeFromCart(id) {
    cart.value.delete(id);
    saveCartToLocalStorage();
  }

  function saveCartToLocalStorage() {
     cart.value = {}; 
     saveCartToLocalStorage();  
  }

  function clearCart() {
    cart.value.clear(); 
    saveCartToLocalStorage(); 
  }  

  return { user, cart, addToCart, removeFromCart, clearCart };
});

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, user => {
    try {
      const store = useStore();
      store.user = user;
      const storedCart = localStorage.getItem(`cart_${store.user.email}`);

      store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
      resolve();
    } catch (error) {
      reject();
    }
  })
});
