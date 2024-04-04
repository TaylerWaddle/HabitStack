<template>
  <div class="flex z-30 justify-center mt-6 ml-1 mr-1 mb-0">
    <div class="flex min-h-screen h-full relative flex-col w-full lg:px-48 md:px-32 sm:px-16 mb-20">
      <div class="flex flex-col items-center px-6">
        <p class="py-2 italic text-outline_green/70">{{ quotes[randomNumber].quote }}</p>
        <p class="py-2 italic text-outline_green/70">- {{ quotes[randomNumber].author }}</p>
      </div>

      <!-- Add Habit Form -->
      <div class="flex justify-center m-3 hidden sm:flex">
        <form @submit.prevent="addHabit()">
          <input
            type="text"
            placeholder="Add Habit"
            class="block w-48 py-1.5 px-3 text-black border border-gray-300 focus:outline-none focus:border-black rounded"
            v-model="newHabitContent"
          />
        </form>
      </div>
      <!-- NonCompleted Habit List -->
      <div class="flex flex-col w-full" v-for="habit in incompleteHabits" :key="habit">
        <div
          class="mx-2 h-20 px-5 mt-5 bg-zinc-800 rounded-xl shadow-md shadow-zinc-600/40 justify-between items-center inline-flex"
        >
          <div
            class="h-10 mix-blend-hard-light text-white text-opacity-90 text-3xl font-normal font-['Inter']"
          >
            {{ habit.content }}
          </div>
          <!-- Mark Complete Button -->
          <div>
            <button
              @click.prevent="
                (habit.isComplete = true), markComplete(habit), incrementTimesCompleted(habit)
              "
              class="w-10 m-3 h-10 bg-zinc-700/50 rounded-full border-2 border-outline_green border-opacity-30"
            ></button>
          </div>
        </div>
      </div>
      <!-- Completed Dropdown -->
      <div class="flex items-center">
        <h1 class="p-2 text-white">Completed</h1>
        <button v-if="hiddenCompletedList" type="button" @click.prevent="toggleCompletedList">
          <svg
            class="fill-lime-500"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </button>
        <button v-else type="button" @click.prevent="toggleCompletedList">
          <svg
            class="fill-lime-500"
            xmlns="http://www.w3.org/2000/svg"
            height="28"
            viewBox="0 -960 960 960"
            width="28"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </button>
      </div>
      <!-- Completed Habit List -->
      <div v-if="hiddenCompletedList" class="mb-24">
        <div class="flex flex-col w-full" v-for="habit in completeHabits" :key="habit">
          <div
            class="mx-2 h-20 px-5 mt-5 bg-zinc-800 rounded-xl shadow-md shadow-outline_green/20 justify-between items-center inline-flex"
          >
            <div
              class="h-10 mix-blend-hard-light text-white text-opacity-90 text-3xl font-normal font-['Inter']"
            >
              {{ habit.content }}
            </div>
            <button
              v-if="hiddenCompletedList"
              @click.prevent="(habit.isComplete = false), markIncomplete(habit)"
              class="w-9 m-3 h-9 bg-inherit rounded-xl border border-outline_green border-opacity-30 shadow-sm shadow-outline_green/70"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia"
import { mapWritableState } from "pinia"
import { mapActions } from "pinia"
import useHabitStore from "@/stores/habit"
import { firestore, habitsCollection, profilesCollection } from "@/includes/firebase"
import { auth } from "@/includes/firebase"
import useUserStore from "@/stores/user"

export default {
  name: "HabitList",
  data() {
    return {
      newHabitContent: "",
      randomNumber: null,
      quotes: [
        {
          quote: "When you have a dream, you've got to grab it and never let go.",
          author: "Carol Burnett",
          id: 1
        },
        {
          quote: "Nothing is impossible. The word itself says 'I'm possible!'",
          author: "Audrey Hepburn",
          id: 2
        },
        {
          quote: "There is nothing impossible to they who will try.",
          author: "Alexander the Great",
          id: 3
        },
        {
          quote: "The bad news is time flies. The good news is you're the pilot.",
          author: "Michael Altshuler",
          id: 4
        },
        {
          quote:
            "Life has got all those twists and turns. You've got to hold on tight and off you go.",
          author: "Nicole Kidman",
          id: 5
        },
        {
          quote: "Keep your face always toward the sunshine, and shadows will fall behind you.",
          author: "Walt Whitman",
          id: 6
        },
        {
          quote:
            "Success is not final, failure is not fatal: it is the courage to continue that counts.",
          author: "Winston Churchill",
          id: 7
        },
        {
          quote: "You define your own life. Don't let other people write your script.",
          author: "Oprah Winfrey",
          id: 8
        },
        {
          quote:
            "At the end of the day, whether or not those people are comfortable with how you're living your life doesn't matter. What matters is whether you're comfortable with it.",
          author: "Dr. Phil",
          id: 9
        },
        {
          quote:
            "Do not allow people to dim your shine because they are blinded. Tell them to put some sunglasses on.",
          author: "Lady Gaga",
          id: 10
        }
      ]
    }
  },

  created() {
    // Listens for mouse click each time the page is loaded. Updates the isComplete value of each habit, each day
    var today = new Date(),
      lastUpdate

    window.addEventListener("mousemove", function () {
      var time = new Date()
      // If we haven't checked yet, or if it's been more than 30 seconds since the last check
      if (!lastUpdate || time.getTime() - lastUpdate.getTime() > 30000) {
        // Set the last time we checked, and then check if the date has changed.
        lastUpdate = time
        if (time.getDate() !== today.getDate()) {
          // If the date has changed, set the date to the new date, and refresh stuff.
          today = time

          habitsCollection.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              habitsCollection.doc(doc.id).update({
                isComplete: false
              })
            })
          })
        }
      }
    })
    // Queries the database and adds the database habits to the local habits array. Also listens for chnages to the database
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
    this.randomQuote()
  },
  computed: {
    ...mapState(useHabitStore, ["hiddenCompletedList", "toggleCompletedList"]),
    ...mapState(useUserStore, ["userLoggedIn"]),
    ...mapWritableState(useHabitStore, ["habits"]),
    // filters the habits array into two seperate arrays based on completion status
    incompleteHabits() {
      return this.habits.filter((newHabit) => {
        return newHabit.isComplete != true
      })
    },
    completeHabits() {
      return this.habits.filter((newHabit) => {
        return newHabit.isComplete != false
      })
    }
  },
  methods: {
    ...mapActions(useHabitStore, ["getHabits", "completeHabit"]),
    async addHabit() {
      if (this.newHabitContent.length === 0) {
        return
      }

      habitsCollection.add({
        content: this.newHabitContent,
        isComplete: false,
        uid: auth.currentUser.uid,
        timesCompleted: 0
      })

      this.newHabitContent = ""
    },

    async incrementTimesCompleted(habit) {
      await habitsCollection
        .doc(habit.docID)
        .update({ timesCompleted: firestore.FieldValue.increment(1) })
    },

    async markComplete(habit) {
      await habitsCollection.doc(habit.docID).update({ isComplete: true })
      await profilesCollection
        .doc(auth.currentUser.uid)
        .update({ totalCompleted: firestore.FieldValue.increment(1) })
    },

    async markIncomplete(habit) {
      await habitsCollection.doc(habit.docID).update({ isComplete: false })
    },

    randomQuote() {
      var randomNumber = Math.floor(Math.random() * this.quotes.length)
      console.log(randomNumber)
      this.randomNumber = randomNumber
    }
  }
}
</script>
