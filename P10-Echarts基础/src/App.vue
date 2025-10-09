<template>
  <div>
    <p class="greeting">{{ greeting }}</p>
    <My-Echarts></My-Echarts>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MyEcharts from './My-Echarts.vue'
const greeting = ref('Hello World!')
</script>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>