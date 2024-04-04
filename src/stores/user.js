import { defineStore } from "pinia"
import { auth, usersCollection, profilesCollection } from "@/includes/firebase"

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

      // creates user document
      await usersCollection.doc(userCred.user.uid).set({
        username: values.username,
        email: values.email,
        age: values.age,
        uid: userCred.user.uid,
        date: new Date().getDate()
      })

      // creates profile document
      await profilesCollection.doc(userCred.user.uid).set({
        username: values.username,
        uid: userCred.user.uid,
        bio: "",
        quote: "",
        totalCompleted: "",
        mostCompleted: [],
        activeGoals: [],
        friends: []
      })

      await userCred.user.updateProfile({
        displayName: values.username
      })

      this.userLoggedIn = true
      this.userCred = userCred
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)

      this.userLoggedIn = true
    },

    async signOut() {
      await auth.signOut()

      this.userLoggedIn = false
      location.reload()
    }
  }
})
