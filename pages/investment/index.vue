<template>
  <main>
    <NuxtLink to="/">Home page</NuxtLink>
    <NuxtLink to="/about">about page</NuxtLink>
  </main>
</template>

<script>
export default {
  name: 'InvestmentIndex',
  head: {
    title: '投資Investment | IngridKao',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  }
}
</script>
