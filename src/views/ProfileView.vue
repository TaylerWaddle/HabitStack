<template>
  <div class="flex relative flex-col w-full lg:px-48 md:px-32 sm:px-16 mt-10">
    <!-- Banner Image -->
    <div class="absolute top-0 z-0 bg-center bg-no-repeat bg-cover h-1/2">
      <!-- <img src="/liqid.jpeg" /> -->
    </div>
    <div class="text-white p-3 z-10">
      <!-- Profile Image and Username -->

      <!-- Profile Details -->
      <div class="px-3" v-for="user in userProfile" :key="user">
        <div class="flex flex-col items-center">
          <img
            src="/liqid.jpeg"
            class="w-40 h-40 mb-12 rounded-full border-2 border-white border-opacity-40"
          />
          <p class="text-3xl mb-12">{{ user.username }}</p>
        </div>

        <div class="flex justify-between items-center mb-6">
          <p class="">Lifetime Completions: {{ user.totalCompleted }}</p>
          <div
            class="flex bg-gray2 h-8 w-32 rounded-full border border-lime-500 border-opacity-50 justify-between items-center divide-x-2 divide-lime-500 divide-opacity-50"
          >
            <button
              @click.prevent="editProfile()"
              class="text-xs text-gray-200 ml-3 hover:text-logo_green"
            >
              Edit Profile
            </button>
            <button @click.prevent="goToSettings()" class="mr-2 pl-2">
              <svg
                class="fill-white opacity-80 border-left-2 hover:fill-logo_green hover:opacity-80"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="px-3 mb-12">
        <h1 class="text-xl text-outline_green/60">Most Completed Habits</h1>
        <div class="flex flex-wrap w-full mt-3">
          <ul v-for="habit in mostCompleted" :key="habit">
            <li
              class="flex bg-gray2 w-80 h-12 items-center justify-between px-6 mt-3 mr-2 border border-lime-500 border-opacity-20 shadow-sm shadow-outline_green/40 rounded-lg"
            >
              <p class="text-white">{{ habit.content }}</p>
              <div class="flex">
                <p class="text-white px-2">78%</p>
                <p class="text-white px-2">{{ habit.timesCompleted }}x</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="px-3 mb-12">
        <h2 class="text-xl text-outline_green/60">Badges Obtained</h2>
        <ul>
          <li>Complete 500 Habits This Year</li>
          <li>Hit a 30day streak on a single habit</li>
          <li>Hit 75% weekly completion</li>
        </ul>
      </div>
      <div class="px-3 mb-12">
        <div class="flex justify-between w-full">
          <h1 class="text-xl text-outline_green/60">Friends</h1>
          <p class="text-lg text-outline_green/60 pr-3">Week / Total</p>
        </div>
        <button
          class="text-sm text-white/90 bg-gray2 border border-lime-500 border-opacity-60 h-8 w-24 rounded-full mt-5 mb-2 hover:text-logo_green"
        >
          Add Friend
        </button>
        <div class="flex w-full flex-wrap" v-for="friend in friendsList" :key="friend">
          <li
            class="w-full h-12 flex justify-between p-3 my-2 mr-2 border-b rounded border-outline_green border-opacity-30"
          >
            <p class="">{{ friend.name }}</p>
            <div class="flex">
              <p class="w-12 text-left">{{ friend.weeklyTotal }}</p>
              <p class="w-12 text-left">{{ friend.lifetimeTotal }}</p>
            </div>
          </li>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center mb-28">
      <button
        type="button"
        class="text-sm text-white/90 hover:text-outline_green/60 bg-gray2 border border-lime-500 border-opacity-60 h-8 w-24 rounded-full"
      >
        Logout
      </button>
    </div>
  </div>
  <div></div>
</template>

<script>
// import { usersCollection } from "@/includes/firebase"
import useUserStore from "@/stores/user"
import useHabitStore from "@/stores/habit"
import { mapState } from "pinia"
import { mapWritableState } from "pinia"
import { auth } from "@/includes/firebase"
import { profilesCollection } from "@/includes/firebase"
import { habitsCollection } from "@/includes/firebase"

export default {
  name: "ProfileView",
  data() {
    return {
      userProfile: {},
      friendsList: [
        { name: "friend1", weeklyTotal: "1", lifetimeTotal: "57" },
        { name: "friend2", weeklyTotal: "12", lifetimeTotal: "700" },
        { name: "friend3", weeklyTotal: "25", lifetimeTotal: "1080" },
        { name: "friend4", weeklyTotal: "0", lifetimeTotal: "12" },
        { name: "friend5", weeklyTotal: "9", lifetimeTotal: "432" }
      ]
    }
  },
  async created() {
    // querying profiles database
    profilesCollection
      .where("uid", "==", auth.currentUser.uid)
      .get()
      .then((querySnapshot) => {
        let user = []

        querySnapshot.forEach((doc) => {
          const profile = {
            ...doc.data(),
            docID: doc.id
          }
          user.push(profile)
        })
        this.userProfile = user
      })

    // querying habits database
    if (this.userLoggedIn === true) {
      habitsCollection.where("uid", "==", auth.currentUser.uid).onSnapshot((querySnapshot) => {
        var snapshotHabits = []
        querySnapshot.forEach((document) => {
          const habit = {
            docID: document.id,
            content: document.data().content,
            isComplete: document.data().isComplete,
            timesCompleted: document.data().timesCompleted
          }
          snapshotHabits.push(habit)
        })

        this.habits = snapshotHabits
      })
    } else {
      return
    }
    //  finding the most completed habits on page creation
    this.updateProfileDoc()
  },
  computed: {
    ...mapState(useUserStore, ["userLoggedIn", "userCred"]),
    ...mapWritableState(useHabitStore, ["habits"]),
    mostCompleted() {
      const sortedHabits = this.habits
      sortedHabits.sort((b, a) => {
        return a.timesCompleted - b.timesCompleted
      })
      return sortedHabits.slice(0, 3)
    }
  },
  methods: {
    async updateProfileDoc() {
      await profilesCollection.doc(auth.currentUser.uid).update({ mostCompleted: this.habits })
    },
    editProfile() {
      console.log("edit profile button")
    },
    goToSettings() {
      console.log("settings button")
    },
    showFriendModal() {
      console.log("friend modal")
    }
  }
}

// }
</script>
