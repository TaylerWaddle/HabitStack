import { createRouter, createWebHistory } from "vue-router"
import useUserStore from "@/stores/user"

const Home = () => import("@/views/HomeView.vue")
const Profile = () => import("@/views/ProfileView.vue")
const Badges = () => import("@/views/BadgesView.vue")
const Performance = () => import("@/views/PerformanceView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/badges",
      name: "badges",
      component: Badges
    },
    {
      path: "/performance",
      name: "performance",
      component: Performance
    },
    {
      path: "/:catchAll(.*)*",
      redirect: { name: "home" }
    }
  ],
  linkExactActiveClass: "bg-gray3"
})

router.beforeEach((to, from, next) => {
  // checking if the page the user is trying to navigate to requires authentication, if it does not, we call the next function, allowing the user to proceed
  if (!to.meta.requiresAuth) {
    next() //the next function does not return the function so we must return it
    return
  }
  //checking the store for the user's authentication status
  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: "home" })
  }
})

export default router
