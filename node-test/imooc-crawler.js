// var http=require('http')
// var url='http://www.imooc.com/learn/348'
// // var url='file:///F:/mcoui/qqyy/yuan/55f0084e0001716b00000000/canvas时钟时间效果.html'

// http.get(url,function(res){
//  var html=''
//  res.on('data',function(data){
//      html+=data
//  })
//  res.on('end',function(){
//      console.log(html)
//  })
// }).on('error',function(){
//  console.log('获取课程数据出错！')
// })

// http.createServer(function(req,res){
//  res.writeHead('Content-Type':'text/plain')
//  res.write()
//  res.end()
// }).listen()
// console.log('Server is start')


var http=require('http')
var cheerio = require('cheerio')
var url='http://www.imooc.com/learn/348'
// var url='file:///F:/mcoui/qqyy/yuan/55f0084e0001716b00000000/canvas时钟时间效果.html'

function filterChapters(html){
    var $ = cheerio.load(html)

    var chapters = $('.chapter')

    // [{
    //  chapterTitle:'',
    //  videos:[
    //      title:'',
    //      id:''
    //  ]
    // }]

    var courseData = []

    chapters.each(function(item){
        var chapter = $(this)
        var chapterTitle = chapter.find().text()
        var videos = chapter.find('.video').children('li')
        var chapterData={
            chapterTitle:chapterTitle,
            videos : []
        }

        videos.each(function(item){
            var video = $(this).find('.J-media-item')
            var videoTitle = video.text()
            var id = video.attr('href').split('video/')[1]

            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })

        courseData.push(chapterData)
    })
    return courseData
}

function printCourseInfo(courseData){
    courseData.forEach(function(item){
        var chapterTitle = item.chapterTitle

        console.log(chapterTitle)

        item.videos.forEach(function(video){
            console.log('【' + video.id + '】' + video.title)
        })
    })
}

http.get(url,function(res){
    var html=''
    res.on('data',function(data){
        html+=data
    })
    res.on('end',function(){
        var courseData = filterChapters(html)

        printCourseInfo(courseData)
    })
}).on('error',function(){
    console.log('获取课程数据出错！')
})



