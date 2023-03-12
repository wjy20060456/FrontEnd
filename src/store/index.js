import { defineStore } from 'pinia'
import axios from 'axios';
export const bondStore = defineStore('bond', {
  state: () => {
    return {
      name: "10年期国债利率",
      radio: null,
      date: null,
      rate: null,
      tableData: null
    }
  },
  getters: {

  },
  actions: {
    async getAsyncData(){
      let store = bondStore()
      let url;
      if(store.radio==='months'){
        url = 'http://localhost:8080/bond?byMonth=1&byDay=0'
      }else if(store.radio==='days'){
        url = 'http://localhost:8080/bond?byMonth=0&byDay=1'
      }
      await axios.get(url)
        .then(function (response) {
          // console.log(response.data)
          store.tableData = response.data

          var temp1 = response.data.map(obj => {
            return obj.date;
          });
          store.date = temp1

          var temp2 = response.data.map(obj => {
            return obj.rate;
          });
          store.rate = temp2
        })
    }
  }
})
