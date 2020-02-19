/**
 * 用户程序入口
 */

import mianfest from './note.json'
let str = ''
Object.keys(mianfest).forEach(key => {
  str += `<p><span class='tag'>${key}</span>:<span class='tagval'>${mianfest[key]}</span></p>`
})


// 引入minVue
import minVue from './lib/minVue'

const vm = new minVue({
  el: "#app",
  data: {
    asyncTitle: 'asynctitle',
    name: 'minVue',
    age: 18,
    mtext: '我是m-text实现的',
    mhtml: "<button @click='clearName'>我是m-html渲染出来的button(点击清空name)</button>",
    foo: {
      bar: 'bar'
    },
    keyword:'',
    notes:'sss'
  },
  created() {
    this.notes = str
    setTimeout(() => {
      this.asyncTitle = '实现迷你版Vue'
      console.log('created()钩子执行完毕')
    }, 1000)
  },
  methods: {
    addage(){
      this.age += 1
      console.log('当前年龄:' + this.age)
    },
    reduceage(){
      this.age -= 1
      console.log('当前年龄:' + this.age)
    },
    clearName(){
      this.name = ''
    },
    presskey(e){
      this.keyword = e.key + '键'
    }
  }
})

console.log(vm)


import './style/init.styl'


let flag = true
const collese = document.querySelector('.collese')
collese.addEventListener('click', function() {
  flag ? this.style.height = 'auto' : this.style.height = 30 + 'px'
  flag = !flag
})


