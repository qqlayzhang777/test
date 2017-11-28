var eventEmitter = require('events').EventEmitter

var life = new eventEmitter()   //生成一个EventEmitter实例

life.setMaxListeners(11)

function water(who){

    console.log('给' + who + '倒水')
}

life.on('求安慰',water)


life.on('求安慰',function(who){
    console.log('给' + who + '揉肩')
})

life.on('求安慰',function(who){
    console.log('给' + who + '做饭')
})

life.on('求安慰',function(who){
    console.log('给' + who + '洗衣服')
})

life.on('求安慰',function(who){
    console.log('给' + who + '。。。5')
})

life.on('求安慰',function(who){
    console.log('给' + who + '。。。6')
})

life.on('求安慰',function(who){
    console.log('给' + who + '。。。7')
})

life.on('求安慰',function(who){
    console.log('给' + who + '。。。8')
})

life.on('求安慰',function(who){
    console.log('给' + who + '。。。9')
})

life.on('求安慰',function(who){
    console.log('给' + who + '。。。10')
})
                                              //官方建议对一个事件不要设置超过10个监听器，可能导致内存泄露
life.on('求安慰',function(who){
    console.log('给' + who + '你想累死我啊！')
})


//修改监听数量极值,放到代码前面
// life.setMaxListeners(11)

//增加另外名字的事件，
life.on('求溺爱',function(who){
    console.log('给' + who + '买衣衣')
})

life.on('求溺爱',function(who){
    console.log('给' + who + '交工资')
})

life.on('求溺爱',function(who){
    console.log('给' + who + '交 话 费')
})

// life.emit('求安慰','汉子')

// life.emit('求溺爱'，'妹子')

life.removeListener('求安慰',water)  //移除监听  第二个参数调用函数名

life.removeAllListeners('求安慰')        //批量移除事件监听  无参数则删除所有监听


//查看事件是否被监听过  .emit() 时会返回一个布尔值

var hasConfortListener = life.emit('求安慰','汉子')
var hasLovedListener = life.emit('求溺爱','妹子')
// var hasPlayedListener = life.emit('求玩坏','妹子和汉子')

console.log(life.listeners('求安慰').length)    //查询事件监听  个数
console.log(life.listeners('求溺爱').length) 
console.log(eventEmitter.listenerCount(life,'求安慰'))   //查询事件监听  个数




// console.log(hasConfortListener)
// console.log(hasLovedListener)
// console.log(hasPlayedListener)
