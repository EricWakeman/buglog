<template>
  <header>
    <Navbar />
  </header>
  <main class="main-display">
    <router-view />
  </main>
  <footer>
    <div class="bg-primary text-dark text-center p-4">
      Made with 💖 by Gremlins
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.main-display{
  background-image: url('./assets/img/bugbackground.jpg');
}
</style>
