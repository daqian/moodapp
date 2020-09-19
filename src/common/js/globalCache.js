/**
 * 计数器对象
 */
function Counter () {
    this.count = 0
}

Counter.prototype.next = function() {
    return ++this.count
}

/**
 * 单例对象
 */
function Sequence () {
    if (Sequence.instance) { 
        return Sequence.instance 
    }
    return Sequence.instance = new Counter()
}

Sequence.instance = null

/**
 * 获取全局缓存计数
 */
export function getSequence() {
    let sequence = new Sequence()
    return sequence.next()
}