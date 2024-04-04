import { defineStore } from "pinia"

export default defineStore("modal", {
  state: () => ({
    isOpen: false,
    activeNav: 1
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : ""
    },
    getActiveNav(state) {
      return state
    }
  }
})
