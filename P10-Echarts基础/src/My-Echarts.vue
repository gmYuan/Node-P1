<template>
  <div id="myChart" ref="myChart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as Echarts from 'echarts';

const myChart = ref(null);
const chartsIns = ref(null);

onMounted(() => {
  const clientWidth = document.body.clientWidth;
  myChart.value.style.width = clientWidth + 'px';
  myChart.value.style.height = clientWidth * 1.2 + 'px';
  chartsIns.value = Echarts.init(myChart.value);
  initOptions();
});

// 添加销毁逻辑
onUnmounted(() => {
  if (chartsIns.value) {
    chartsIns.value.dispose();
  }
});

const initOptions = () => {
  chartsIns.value.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        lineStyle: {
          // color: 'blue'
        },
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  });
};



</script>

<style scoped>
div {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

</style>