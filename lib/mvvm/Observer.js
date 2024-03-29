function Observe(data) {
  if (data === undefined || typeof data !== 'object') return

  // 取出所有属性遍历
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  })
}

function defineReactive(data, key, val) {
  const dep = new Dep()
  Observe(val); // 监听子属性
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能再define
    get: function () {
      // 由于需要在闭包内添加watcher，所以通过Dep定义一个静态target属性，暂存watcher, 添加完移除
      Dep.target && dep.addSub(Dep.target)
      return val
    },
    set: function (newVal) {
      if (val === newVal) return
      console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal)
      val = newVal
      console.log(dep)
      dep.notify() // 通知所有订阅者
    }
  })
}

function Dep() {
  // this.watchers = []
  this.subs = []
}
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  }
}