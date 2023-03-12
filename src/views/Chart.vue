<template>
  <div class="common-layout">
    <el-container>
      <el-header id="chartHeader" style="background-color:Gainsboro;height:100px">
        <el-button type="primary" plain id="chartButton">10年期国债利率</el-button>
        <el-button type="primary" plain id="chartButton" disabled>其他（暂无）</el-button>
      </el-header>
      <el-main>
        <div class="common-layout">
          <el-container>
            <el-aside width="700px">
              <div class="mb-2 flex items-center text-sm">
                <el-radio-group v-model="radio">
                  <el-radio label="days" size="large">显示一个月</el-radio>
                  <el-radio label="months" size="large">显示两年</el-radio>
                </el-radio-group>
              </div>
              <el-button type="primary" plain id="setButton" @click="getData">提取数据</el-button>
              <el-table :data="tableData" height="450" style="width: 100%">
<!--                <el-table-column prop="id" label="Id" width="180" />-->
                <el-table-column prop="date" label="Date" width="400" />
                <el-table-column prop="rate" label="Rate" />
              </el-table>
            </el-aside>
            <el-main>
              <div id="myEChart"></div>

            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { bondStore } from '../store/index'



let store = bondStore()
store.$subscribe((mutation, state) => {
  // console.log(mutation, state)
  var myChart = echarts.init(document.getElementById('myEChart'));
  myChart.setOption({
    title: {
      text: state.name
    },
    tooltip: {},
    xAxis: {
      data: state.date
    },
    yAxis: {},
    series: [
      {
        // name: '销量',
        type: 'line',
        data: state.rate
      }
    ]
  });
})

export default {
  data(){
    return {
      date: store.date,
      radio: 'days',
      tableData: null
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('myEChart'));

    myChart.setOption({
      title: {
        // text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['', '', '', '', '', '']
      },
      yAxis: {},
      series: [
        {
          // name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  },
  methods: {
    getData() {
      store.radio = this.radio
      store.getAsyncData()
      this.tableData = store.tableData
      console.log(this.tableData)
    }
  },
}
</script>

<style scoped>
#chartButton {
  margin: 20px;
  margin-top: 35px;
}

#setButton {
  margin: 20px;
}

#myEChart {
  width: 700px;
  height: 600px;
}
</style>
