import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";

export const useStore = defineStore('store', () => {
  const user = ref(null);
  const cart = ref(new Map());
  const checkoutCompleted = ref(false);
  const router = useRouter(); // You can use the router for redirection after logout

  // Watch for Firebase auth state changes and update the store
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
      const storedCart = localStorage.getItem(`cart_${firebaseUser.email}`);
      cart.value = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
    } else {
      user.value = null;
      cart.value = new Map();
    }
  });

  function addToCart(id, movieData) {
    cart.value.set(id, movieData);
    saveCartToLocalStorage();
  }

  function removeFromCart(id) {
    cart.value.delete(id);
    saveCartToLocalStorage();
  }

  function clearCart() {
    cart.value.clear();
    saveCartToLocalStorage();
    console.log("Checkout started:", checkoutCompleted.value);
    checkoutCompleted.value = true;

    setTimeout(() => {
      checkoutCompleted.value = false;
      console.log("Checkout reset:", checkoutCompleted.value);
    }, 3000);
  }

  // Save cart to localStorage for the current user
  function saveCartToLocalStorage() {
    if (user.value && user.value.email) {
      localStorage.setItem(`cart_${user.value.email}`, JSON.stringify(Object.fromEntries(cart.value)));
    }
  }

  // Logout function
  const logout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Optionally, clear the cart from localStorage as well
      localStorage.removeItem(`cart_${user.value?.email}`);

      // Redirect user to login page or home page
      router.push("/"); // Or to '/' if you prefer the home page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const userAuthorized = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
        const storedCart = localStorage.getItem(`cart_${firebaseUser.email}`);
        cart.value = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
        resolve();
      } else {
        user.value = null;
        cart.value = new Map();
        resolve();
      }
    }, reject);
  });

  return { user, cart, addToCart, removeFromCart, logout, userAuthorized};
});

