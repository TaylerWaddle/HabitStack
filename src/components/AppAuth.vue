<template>
  <div class="fixed z-40 inset-0" id="modal" :class="hiddenClass">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="w-96 inline-block align-bottom bg-gray2 rounded-lg text-left text-white overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold text-white">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="modalVisibility = false">
              <svg
                class="fill-lime-500"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                />
              </svg>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4 text-black bg-inherit">
            <li class="flex-auto text-center">
              <a
                class="block py-2 px-4 transition rounded-l-full"
                href="#"
                :class="{
                  'hover:text-black bg-outline_green opacity-70': tab === 'login',
                  'hover:text-logo_green bg-white': tab === 'register'
                }"
                @click.prevent="tab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block py-2 px-4 transition rounded-r-full"
                href="#"
                :class="{
                  'hover:text-black bg-outline_green opacity-70': tab === 'register',
                  'hover:text-logo_green bg-white': tab === 'login'
                }"
                @click.prevent="tab = 'register'"
                >Register</a
              >
            </li>
          </ul>
          <app-login-form v-if="tab === 'login'" />
          <app-register-form v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from "pinia"
import useModalStore from "@/stores/modal"
import AppLoginForm from "@/components/LoginForm.vue"
import AppRegisterForm from "@/components/RegisterForm.vue"

export default {
  name: "AppAuth",
  components: {
    AppLoginForm,
    AppRegisterForm
  },
  data() {
    return {
      tab: "login"
    }
  },
  computed: {
    ...mapState(useModalStore, ["hiddenClass"]),
    ...mapWritableState(useModalStore, {
      modalVisibility: "isOpen"
    })
  },
  methods: {}
}
</script>
