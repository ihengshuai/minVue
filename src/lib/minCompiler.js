/**
 *  minVue编译模块
 */

import { Watcher } from './minDep'

class Compiler{
  constructor(el, vm){
    this.$el = document.querySelector(el)
    this.$vm = vm

    // 编译
    if(this.$el){
      // 转换dom内容为片段
      this.$fragment = this.transferFragment(this.$el)

      // 执行编译
      this.compile(this.$fragment)

      // 将编译完的html追加到宿主节点
      this.$el.appendChild(this.$fragment)
    }
  }

  // 将宿主元素中的代码片段拿出来遍历
  transferFragment(el){
    const frag = document.createDocumentFragment()
    // 将el中所有子元素搬家至frag中
    let child
    while (child = el.firstChild) {
      frag.appendChild(child)
    }
    return frag
  }
  compile(el){
      const childNodes = el.childNodes

      // 节点类型判断
      Array.from(childNodes).forEach(node => {
        if(this.isElement(node)){
          // 标签 处理指令: m- , @ , :
          const nodeAttrs = node.attributes
          Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name  // 属性名
            const attrExp= attr.value   // 属性值,也就是
            if(this.isDirective(attrName)){  // 判断是不是特殊的指令
              // m-text
              const dir = attrName.substring(2)
              // 执行指令
              this[dir] && this[dir](node, this.$vm, attrExp)
            }
            if(this.isEvent(attrName)){  // 判断是不是特殊的事件
              const dir = attrName.substring(1)  // @click => click
              this.eventHandler(node, this.$vm, attrExp, dir)
            }
          })          
        }else if(this.isInterpolation(node)){  
          // 文本节点
          this.compileText(node)
        }
        if(node.childNodes && node.childNodes.length > 0){
          this.compile(node)
        }
      })
  }

  // 更新函数  节点，vue实例，data中的某个key，指令
  update(node, vm, key, dir){
    const updateFn = this[dir + 'Updater']
    // 初始化
    updateFn && updateFn(node, vm[key])
    // 依赖收集
    new Watcher(vm, key, function(value){
      updateFn && updateFn(node, value)
    })
  }
  

  /**
   * 特殊事件的处理: @click... 
   */
  // 处理事件
  eventHandler(node, vm, attrExp, dir){
    const fn = vm.$options.methods && vm.$options.methods[attrExp]
    if(dir && fn){
      node.addEventListener(dir, fn.bind(vm, ))
    }
  }

  /**
   * 编译文本节点: {{name}}
   */
  compileText(node){
    this.update(node, this.$vm, RegExp.$1, 'text')
  }


  /**
   *  指令的实现: m-text, m-model, m-html
   */

  // 双向绑定
  model(node, vm, attrExp){
    // 指定input的value属性
    this.update(node, vm, attrExp, 'model')

    // 视图对模型影响
    node.addEventListener('input', e => {
      vm[attrExp] = e.target.value
    })
  }

  text(node, vm, attrExp){
    this.update(node, vm, attrExp, 'text')
  }
  html(node, vm, attrExp){
    this.update(node, vm, attrExp, 'html')
  }

  textUpdater(node, value){
    node.textContent = value
  }
  htmlUpdater(node, value){
    node.innerHTML = value
  }
  modelUpdater(node, value){
    node.value = value
  }



  /**
   * 判断是哪一种类型的指令？特殊事件？插值文本
   * @param {一些特殊的指令} attrName 
   */
  isDirective(attrName){
    return attrName.indexOf('m-') == 0
  }

  isEvent(attrName){
    return attrName.indexOf('@') == 0
  }

  isElement(node){
    return node.nodeType === 1
  }
  // 判断是否插值文本
  isInterpolation(node){
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}

export default Compiler