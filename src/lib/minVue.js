/**
 *  minVue文件入口
 */


// new minVue({data:{...}, created(){}, ...})
import { Dep } from './minDep'
import Compiler from './minCompiler'

class minVue{
  constructor(options){
    this.$data = options.data
    this.$options = options

    // 遍历data中的每一个属性，进行监测
    this.observe(this.$data)

    // 编译模板
    new Compiler(options.el, this)

    // 判断并执行created钩子函数
    if(options.created){
      options.created.call(this)
    }
    
  }

  observe(obj){
    if(!obj || typeof obj !== 'object'){
      return
    }

    // 遍历每一个属性进行defineproperty绑定
    Object.keys(obj).forEach(key => {
      // 将所有的data属性代理到vm实例上
      this.proxyData(key)

      this.defineReactive(obj, key, obj[key])
    })
  }

  // 代理数据
  proxyData(key){
    this.observe(key)

    Object.defineProperty(this, key, {
      get(){
        return this.$data[key]
      },
      set(newVal){
        this.$data[key] = newVal
      }
    })
  }


  // 数据响应化
  defineReactive(obj, key, val){
    // 递归解决key嵌套
    this.observe(key)

    const dep = new Dep()

    // 属性绑定
    Object.defineProperty(obj, key, {
      get(){
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal){
        if(newVal === val){
          return
        }
        val = newVal
        dep.notify()
      }
    })
  }
}

export default minVue