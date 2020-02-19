/**
 *  minVue依赖收集模块
 */

class Dep{
  constructor(){
    // 收集依赖
    this.deps = []
  }
  
  addDep(dep){
    this.deps.push(dep)
  }

  notify(){
    this.deps.forEach(dep => dep.update())
  }
}

class Watcher{
  constructor(vm, key, cb){
    this.key = key
    this.vm = vm
    this.cb = cb

    // 将当前key的Watcher执行实例Dep静态属性target
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }
  update(){
    this.cb.call(this.vm, this.vm[this.key])
  }
}

export { Dep, Watcher }