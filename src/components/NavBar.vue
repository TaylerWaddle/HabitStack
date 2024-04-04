<template>
  <nav class="bg-gray2 w-auto mb-0">
    <div class="bg-gray2 shadow-xl flex justify-between px-8 h-24 items-center">
      <!-- Logo -->
      <router-link :to="{ name: 'home' }" exact-active-class="no-active">
        <div class="flex">
          <h1 class="text-logo_white text-5xl font-medium">Habit</h1>
          <h1 class="text-outline_green/60 text-5xl font-extralight">Stack</h1>
        </div>
      </router-link>
      <!-- NavBar Desktop -->
      <!-- Link Buttons -->
      <div class="hidden lg:flex justify-end items-center">
        <ul class="flex justify-end text-nowrap">
          <li
            class="py-3 px-6 text-md text-white rounded-lg hover:text-outline_green hover:text-opacity-60 w-full"
          >
            <router-link :to="{ name: 'home' }">Dashboard</router-link>
          </li>
          <li
            class="py-3 px-6 text-md text-white rounded-lg hover:text-outline_green hover:text-opacity-60 w-full"
          >
            <router-link :to="{ name: 'profile' }">Profile</router-link>
          </li>
          <li
            class="py-3 px-6 text-md text-white rounded-lg hover:text-outline_green hover:text-opacity-60 w-full"
          >
            <router-link :to="{ name: 'performance' }">Performance</router-link>
          </li>
          <li
            class="py-3 px-6 text-md text-white rounded-lg hover:text-outline_green hover:text-opacity-60 w-full"
          >
            <router-link :to="{ name: 'badges' }">Badges</router-link>
          </li>
        </ul>
        <!-- Login/Register Button -->
        <div v-if="!userStore.userLoggedIn">
          <a
            class="py-3 px-6 flex text-md text-white rounded-lg hover:text-outline_green hover:text-opacity-60 w-full hidden lg:flex"
            href="#"
            @click.prevent="toggleAuthModal()"
            >Login / Register</a
          >
        </div>
        <div v-else>
          <a
            class="py-3 px-6 flex text-md text-white rounded-lg hover:text-outline_green hover:text-opacity-60 w-full hidden lg:flex"
            href="#"
            @click.prevent="userStore.signOut"
            >Logout</a
          >
        </div>
      </div>
      <!-- Nav Button -->
      <button
        @click="navIsOpen = !navIsOpen"
        type="button"
        class="25px py-1 px-2 rounded items-center text-white bg-inherit hidden sm:flex lg:hidden"
      >
        <a href="#"></a
        ><svg
          class="fill-slate-100"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path
            d="M148.078-261.078v-55.96h663.844v55.96H148.078Zm0-191.346v-55.96h663.844v55.96H148.078Zm0-191.346v-55.96h663.844v55.96H148.078Z"
          />
        </svg>
      </button>
    </div>
    <!-- NavBar Medium Screens - SideNav -->
    <div
      :class="navIsOpen ? 'flex' : 'hidden'"
      class="absolute right-0 text-white z-40 bg-inherit w-64 h-full flex-wrap flex-col items-start"
    >
      <!-- Links -->
      <li
        class="py-3 px-8 flex text-lg text-white rounded-lg hover:bg-zinc-700 hover:text-outline_green hover:text-opacity-60 w-full"
      >
        <router-link
          :to="{ name: 'home' }"
          @click.prevent="(navIsOpen = !navIsOpen), (activeNav = 1)"
          >Dashboard</router-link
        >
      </li>
      <li
        class="py-3 px-8 flex text-lg text-white rounded-lg hover:bg-zinc-700 hover:text-outline_green hover:text-opacity-60 w-full"
      >
        <router-link
          :to="{ name: 'profile' }"
          @click.prevent="(navIsOpen = !navIsOpen), (activeNav = 2)"
          >Profile</router-link
        >
      </li>
      <li
        class="py-3 px-8 flex text-lg text-white rounded-lg hover:bg-zinc-700 hover:text-outline_green hover:text-opacity-60 w-full"
      >
        <router-link
          :to="{ name: 'performance' }"
          @click.prevent="(navIsOpen = !navIsOpen), (activeNav = 3)"
          >Performance</router-link
        >
      </li>
      <li
        class="py-3 px-8 flex text-lg text-white rounded-lg hover:bg-zinc-700 hover:text-outline_green hover:text-opacity-60 w-full"
      >
        <router-link
          :to="{ name: 'badges' }"
          @click.prevent="(navIsOpen = !navIsOpen), (activeNav = 4)"
          >Badges</router-link
        >
      </li>
      <!-- Login/Register Button -->
      <div v-if="!userStore.userLoggedIn">
        <a
          class="50px py-3 px-8 flex text-lg text-white rounded-lg hover:bg-zinc-700 hover:text-outline_green hover:text-opacity-60 w-48"
          href="#"
          @click.prevent="toggleAuthModal(), (navIsOpen = !navIsOpen)"
          >Login / Register</a
        >
      </div>
      <div v-else>
        <a
          class="50px py-3 px-8 flex text-lg text-white rounded-lg hover:bg-zinc-700 hover:text-outline_green hover:text-opacity-60 w-48"
          href="#"
          @click.prevent="userStore.signOut"
          >Logout</a
        >
      </div>
    </div>
    <!-- Bottom NavBar Mobile Screens -->
    <div
      class="fixed bottom-0 w-full h-14 bg-gray2 z-50 flex justify-between items-center sm:hidden"
    >
      <router-link
        :to="{ name: 'home' }"
        class="h-full w-full flex justify-center items-center"
        @click.prevent="activeNav = 1"
      >
        <svg
          class="fill-outline_green/60"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path
            d="M649.615-221.925 521.847-349.693l41.768-41.768 85 85 170-170 41.768 42.768-210.768 211.768Zm0-304.614L521.847-654.307l41.768-41.768 85 85 170-170 41.768 42.768-210.768 211.768ZM100.001-297.694v-59.998H440v59.998H100.001Zm0-304.614v-59.998H440v59.998H100.001Z"
          />
        </svg>
      </router-link>

      <router-link
        :to="{ name: 'performance' }"
        class="h-full w-full flex justify-center items-center"
        @click.prevent="activeNav = 2"
      >
        <svg
          class="fill-outline_green/60"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path
            d="m382.616-356.001 97.384-74 95.384 73.23-36.615-118.306 98.922-77.23H518.615L480-671.383l-38.615 119.076H322.309l96.922 77.23-36.615 119.076ZM480-100.771q-129.769-35.384-214.884-152.768Q180.001-370.924 180.001-516v-230.153L480-858.46l299.999 112.307V-516q0 145.076-85.115 262.461Q609.769-136.155 480-100.771ZM480-164q104-33 172-132t68-220v-189l-240-89.615L240-705v189q0 121 68 220t172 132Zm0-315.615Z"
          />
        </svg>
      </router-link>
      <!-- Mobile Add Button -->
      <router-link
        :to="{ name: 'home' }"
        class="h-full w-full flex justify-center items-center"
        exact-active-class="no-active"
        @click.prevent=""
      >
        <svg
          class="fill-outline_green/60"
          xmlns="http://www.w3.org/2000/svg"
          height="52"
          viewBox="0 -960 960 960"
          width="52"
        >
          <path
            d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160Zm20.134 180q-74.673 0-140.41-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120-405.194 120-479.866q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194-840 479.866-840q74.673 0 140.41 28.339 65.737 28.34 114.365 76.922 48.627 48.582 76.993 114.257Q840-554.806 840-480.134q0 74.673-28.339 140.41-28.34 65.737-76.922 114.365-48.582 48.627-114.257 76.993Q554.806-120 480.134-120ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
          />
        </svg>
      </router-link>

      <router-link
        :to="{ name: 'badges' }"
        class="h-full w-full flex justify-center items-center"
        @click.prevent="activeNav = 3"
        ><svg
          class="fill-outline_green/60"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path
            d="M267.694-60.002v-303.613L134.233-580l172.691-279.999h346.152L825.767-580 692.306-363.615v303.613L480-131.924 267.694-60.001Zm59.999-84.844L480-195.538l152.307 50.692v-155.155H327.693v155.155ZM340.385-800l-136 220 136 220h279.23l136-220-136-220h-279.23ZM438-431.232 310.232-558 353-600.768l85 85 169-170L649.768-644 438-431.232ZM327.693-300.001h304.614-304.614Z"
          />
        </svg>
      </router-link>

      <router-link
        :to="{ name: 'profile' }"
        class="h-full w-full flex justify-center items-center"
        @click.prevent="activeNav = 4"
        ><svg
          class="fill-outline_green/60"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path
            d="M240.924-268.307q51-37.846 111.115-59.769Q412.154-349.999 480-349.999t127.961 21.923q60.115 21.923 111.115 59.769 37.308-41 59.116-94.923Q800-417.154 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.846 21.808 116.77 21.808 53.923 59.116 94.923Zm239.088-181.694q-54.781 0-92.396-37.603-37.615-37.604-37.615-92.384 0-54.781 37.603-92.396 37.604-37.615 92.384-37.615 54.781 0 92.396 37.603 37.615 37.604 37.615 92.384 0 54.781-37.603 92.396-37.604 37.615-92.384 37.615Zm-.012 350q-79.154 0-148.499-29.77-69.346-29.769-120.654-81.076-51.307-51.308-81.076-120.654-29.77-69.345-29.77-148.499t29.77-148.499q29.769-69.346 81.076-120.654 51.308-51.307 120.654-81.076 69.345-29.77 148.499-29.77t148.499 29.77q69.346 29.769 120.654 81.076 51.307 51.308 81.076 120.654 29.77 69.345 29.77 148.499t-29.77 148.499q-29.769 69.346-81.076 120.654-51.308 51.307-120.654 81.076-69.345 29.77-148.499 29.77ZM480-160q54.154 0 104.423-17.423 50.27-17.423 89.27-48.731-39-30.154-88.116-47Q536.462-290.001 480-290.001q-56.462 0-105.77 16.654-49.308 16.654-87.923 47.193 39 31.308 89.27 48.731Q425.846-160 480-160Zm0-349.999q29.846 0 49.924-20.077 20.077-20.078 20.077-49.924t-20.077-49.924Q509.846-650.001 480-650.001t-49.924 20.077Q409.999-609.846 409.999-580t20.077 49.924q20.078 20.077 49.924 20.077ZM480-580Zm0 355Z"
          />
        </svg>
      </router-link>
    </div>
  </nav>
</template>
<script>
import { mapStores } from "pinia"
import useModalStore from "@/stores/modal"
import useUserStore from "@/stores/user"

export default {
  name: "NavBar",
  data() {
    return {
      navIsOpen: false
    }
  },
  computed: {
    ...mapStores(useModalStore, useUserStore)
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
    }
  }
}
</script>
