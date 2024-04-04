<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Username</label>
      <vee-field
        name="username"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Username"
      />
      <ErrorMessage class="text-red-600" name="name"></ErrorMessage>
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email"></ErrorMessage>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age"></ErrorMessage>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password"></ErrorMessage>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label><br />
      <ErrorMessage class="text-red-600" name="tos"></ErrorMessage>
    </div>
    <button
      type="submit"
      class="block w-full bg-outline_green opacity-70 text-black py-1.5 px-3 rounded-full transition hover:opacity-50"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions, mapWritableState } from "pinia"
import useUserStore from "@/stores/user"

export default {
  name: "RegisterForm",
  data() {
    return {
      tab: "login",
      schema: {
        username: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:130",
        password: "required|min:9|max:100|excluded:password",
        confirm_password: "passwords_mismatch:@password",
        tos: "tos"
      },
      reg_in_submission: false, // keeps track of if the regisatrtion form is in submission. We'll want to disable form if the request is still processing
      reg_show_alert: false, // we will use this to toggle the alert box visibility
      reg_alert_variant: "bg-blue-500", // We will use color blue to indidcate form submission is in progress
      reg_alert_msg: "Please wait! Your account is being created." // this iwll be used for the inner content of the alert box
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"])
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register"
    }),

    async register(values) {
      // This is the inital state of the alert component
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = "bg-blue-500"
      this.reg_alert_message = "Please wait! Your account is being created."

      // Registering the User
      try {
        await this.createUser(values)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = "bg-red-500"
        this.reg_alert_msg = "An unexpected error occured. Please try again later."
        return
      }
      this.reg_alert_variant = "bg-green-500"
      this.reg_alert_msg = "Your account has been successfully created"
      window.location.reload()

      this.userLoggedIn = true
    }
  }
}
</script>
