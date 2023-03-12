<template>
  <el-container style="background-color:beige;height: 756px">
    <el-aside width="350px" style="background-color:Gainsboro">
      <el-card class="box-card">
        <div class="text item">python学习</div>
      </el-card>
      <div id="floating">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      </div>
    </el-aside>
    <el-main>
      <iframe src="../../public/Python学习.html" width="100%" height="100%"></iframe>
    </el-main>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
      data:[
        {
          label: '数据分析',
        },
        {
          label: 'Python97讲',
          children: [
            {
              label: '第三章 魔法函数',
            },
            {
              label: '第四章 深入类和对象',
            },
            {
              label: '第五章 自定义序列类',
            },
            {
              label: '第六章 深入python的set和dict',
            },
            {
              label: '第八章 元类编程',
            },
            {
              label: '第九章 迭代器和生成器',
            },
            {
              label: '第十一章 多线程、多进程和线程池编程',
            },
            {
              label: '第十二章 协程和异步io',
            },
            {
              label: '第十三章 asyncio并发编程',
            }
          ],
        },
        {
          label: 'Python进阶',
          children: [
            {
              label: '第二章 数据结构与算法相关问题与解决技巧',
            },
            {
              label: '第三章 字符串处理相关问题与解决技巧',
            },
            {
              label: '第四章 对象迭代与反迭代相关问题与解决技巧',
            },
            {
              label: '第五章 文件IO效率相关问题与解决技巧',
            },
            {
              label: '第六章 数据解析与构建相关问题与解决技巧',
            },
            {
              label: '第七章 类与对象深度问题与解决技巧',
            },
            {
              label: '第八章 多线程并发相关问题与解决技巧',
            },
            {
              label: '第九章 装饰器使用问题与技巧',
            }
          ],
        },
        {
          label: '网络爬虫',
          children: [
            {
              label: 'selenium',
            }
          ],
        },
        {
          label: 'Python操作数据库',
        },
        // {
        //   label: 'Machine Learning',
        //   children: [
        //     {
        //       label: '梯度下降法',
        //     }
        //   ],
        // },
        {
          label: '附录',
          children: [
            {
              label: 'Anaconda',
            }
          ],
        },
      ]
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
