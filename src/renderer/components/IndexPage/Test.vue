<template>
    <v-select v-bind:items="items" ></v-select>
</template>
<script>
  module.exports =  {
    name: 'test',
    data: () => ({
      items: [
        { text: 'State 1' },
        { text: 'State 2' },
      ],
    })
 }
</script>