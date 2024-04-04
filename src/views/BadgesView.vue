<template>
  <div class="flex z-30 justify-center mt-6 ml-1 mr-1">
    <div class="min-h-screen h-full w-full lg:px-48 md:px-32 sm:px-16 text-white">
      <div class="flex flex-col mx-4 my-12">
        <div class="mb-8 rounded-xl">
          <p class="text-3xl text-white">Streaks</p>
          <div class="flex bg-gray2 h-24 w-full shadow-2xl rounded-xl my-4">
            <div class="flex-none h-24 w-24">
              <img src="@/assets/Gold2.png" class="h-full w-full rounded-l-xl" />
            </div>
            <div class="flex flex-col justify-center m-3">
              <p class="text-xl">Badge Title</p>
              <p class="text-wrap">Complete any habit 360 days in a row</p>
            </div>
          </div>
          <div class="flex bg-gray2 h-24 w-full shadow-2xl rounded-xl my-4">
            <div class="flex-none h-24 w-24">
              <img src="@/assets/Silver2.png" class="h-full w-full rounded-l-xl" />
            </div>
            <div class="flex flex-col justify-center m-3">
              <p class="text-xl">Badge Title</p>
              <p class="text-wrap">Complete any habit 90 days in a row</p>
            </div>
          </div>
          <div class="flex bg-gray2 h-24 w-full shadow-2xl rounded-xl my-4">
            <div class="flex-none h-24 w-24">
              <img src="@/assets/Bronze1.png" class="h-full w-full rounded-l-xl" />
            </div>
            <div class="flex flex-col justify-center m-3">
              <p class="text-xl">Badge Title</p>
              <p class="text-wrap">Complete any habit 30 days in a row</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BadgesView"
}
</script>
