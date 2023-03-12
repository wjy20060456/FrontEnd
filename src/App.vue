<script setup>

</script>

<template>
  <div class="home-box">
    <el-container>
      <el-header class="Navigation" style="background-color:Azure;height: 65px;">
        <el-row>
          <el-col :span="5" class="text"><div class="grid-content ep-bg-purple" />
            <router-link to="/home" style="color: Black">HomePage</router-link>
          </el-col>
          <el-col :span="9" class="textinput"><div class="grid-content ep-bg-purple-light" />
            <el-input
                style="height:40px;"
                v-model="inputText"
                class="w-50 m-2"
                placeholder="在这里搜索笔记内容，如：资本成本"
                :prefix-icon="Search"
            />
          </el-col>
          <el-col :span="4" class="text"><div class="grid-content ep-bg-purple-light" />
            <router-link to="/note" style="color: darkslateblue">笔记</router-link>
          </el-col>
          <el-col :span="2" class="text"><div class="grid-content ep-bg-purple" />
            <router-link to="/chart" style="color: darkslateblue">数据</router-link>
          </el-col>
          <el-col :span="4" class="text"><div class="grid-content ep-bg-purple-light" />
            <router-link to="/login" style="color: Black">登录</router-link>
          </el-col>
        </el-row>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<style scoped>
.home-box {
  width:100%;
  height: 100%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.text {
  margin-top: 20px;
}
.textinput {
  margin-top: 12px;
}
</style>
