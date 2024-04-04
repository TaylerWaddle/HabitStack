<template>
  <div class="h-full w-auto bg-gray1 mb-0">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
  <app-auth></app-auth>
</template>

<script>
import AppAuth from "@/components/AppAuth.vue"
import NavBar from "@/components/NavBar.vue"
import { mapWritableState } from "pinia"
import useUserStore from "@/stores/user"
import useModalStore from "@/stores/modal"
import { auth } from "./includes/firebase"

export default {
  name: "App",
  components: {
    NavBar,
    AppAuth
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
    ...mapWritableState(useModalStore, ["activeNav"])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>
