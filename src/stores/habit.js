import { defineStore } from "pinia"
// import { habitsCollection } from "@/includes/firebase"
// import { auth } from "@/includes/firebase"

export default defineStore("habit", {
  state: () => ({
    completedListOpen: false,
    lifetimeCount: 0,
    newHabitContent: "",
    habits: []
  }),
  getters: {
    hiddenCompletedList(state) {
      return !state.completedListOpen ? "" : "hidden"
    }
  },
  actions: {
    toggleCompletedList() {
      this.completedListOpen = !this.completedListOpen
    }
  }
})
