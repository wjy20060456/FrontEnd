<template>
  <canvas width="300" height="300" id="myCanvas"></canvas>
  <br/>
  <br/>
  <br/>
  <p>欢迎访问Jerry的个人主页，在这里你可以</p>
  <br/>
  <ul>
    <li>浏览财务管理课程的相关笔记</li>
    <li>查询重要的历史宏观数据</li>
    <li>登录后查看后端提供的接口</li>
    <li></li>
    <li>甚至可以在下方区域尝试手写数字识别</li>
  </ul>
  <br/>
  <p>让我们开始吧！</p>
  <el-row class="mb-4" id="myButton">
    <el-button type="warning" round @click="myGetData()">侧栏</el-button>
    <el-button type="primary" round @click="myClear()">清除</el-button>
    <el-button type="primary" round @click="myPrediction()">预测</el-button>
  </el-row>
</template>margin

<script>
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { MnistData } from '../mnist/data';

export default {
  data() {
    return {
      data: null,
      model: null,
    }
  },
  created() {
    this.data = new MnistData();
    // this.model = tf.sequential();

  },
  mounted() {
  },
  updated() {
  },
  methods: {
    myGetData: async function() {
      await this.data.load();
      const examples = this.data.nextTestBatch(20);
      const surface = tfvis.visor().surface({ name: '输入示例' });
      for (let i = 0; i < 20; i += 1) {
        const imageTensor = tf.tidy(() => {
          return examples.xs.slice([i, 0], [1, 784]).reshape([28, 28, 1]);
        });
        const canvas = document.createElement('canvas');
        canvas.width = 28;
        canvas.height = 28;
        canvas.style = 'margin: 4px';
        await tf.browser.toPixels(imageTensor, canvas);
        surface.drawArea.appendChild(canvas);
      }
    },
    myClear: async function() {
      const canvas = document.querySelector('canvas');
      canvas.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) {
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'rgb(255,255,255)';
          ctx.fillRect(e.offsetX, e.offsetY, 15, 15);
        }
      });
      window.clear = () => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, 300, 300);
      };
      clear();
    },
    myPrediction: async function() {
      const canvas = document.querySelector('canvas');

      const model = tf.sequential();
      model.add(tf.layers.conv2d({
        inputShape: [28, 28, 1],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      }));
      model.add(tf.layers.maxPool2d({
        poolSize: [2, 2],
        strides: [2, 2]
      }));
      model.add(tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      }));
      model.add(tf.layers.maxPool2d({
        poolSize: [2, 2],
        strides: [2, 2]
      }));
      model.add(tf.layers.flatten());
      model.add(tf.layers.dense({
        units: 10,
        activation: 'softmax',
        kernelInitializer: 'varianceScaling'
      }));
      model.compile({
        loss: 'categoricalCrossentropy',
        optimizer: tf.train.adam(),
        metrics: ['accuracy']
      });
      const [trainXs, trainYs] = tf.tidy(() => {
        const d = this.data.nextTrainBatch(1000);
        return [
          d.xs.reshape([1000, 28, 28, 1]),
          d.labels
        ];
      });
      const [testXs, testYs] = tf.tidy(() => {
        const d = this.data.nextTestBatch(200);
        return [
          d.xs.reshape([200, 28, 28, 1]),
          d.labels
        ];
      });
      await model.fit(trainXs, trainYs, {
        validationData: [testXs, testYs],
        batchSize: 500,
        epochs: 50,
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss', 'val_loss', 'acc', 'val_acc'],
            { callbacks: ['onEpochEnd'] }
        )
      });

      const input = tf.tidy(() => {
        return tf.image.resizeBilinear(
            tf.browser.fromPixels(canvas),
            [28, 28],
            true
        ).slice([0, 0, 0], [28, 28, 1])
            .toFloat().div(255)
            .reshape([1, 28, 28, 1])

      });
      const pred = model.predict(input).argMax(1);
      alert(`预测结果为 ${pred.dataSync()[0]}`);
    }
  }
}
</script>

<style scoped>
#myCanvas {
  position: absolute;
  border: 2px solid #666;
  margin: 10px;
  left:50%;
  top:65%;
  transform: translate(-50%, -50%);
}

#myButton {
  margin-top: 370px;
  margin-left: 625px;
}
</style>
