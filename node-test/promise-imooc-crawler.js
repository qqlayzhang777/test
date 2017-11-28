// var http=require('http')
// var url='http://www.imooc.com/learn/348'

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
var promise = require('bluebird')
var cheerio = require('cheerio')
var baseUrl = 'http://www.imooc.com/learn/'
// var url='http://www.imooc.com/learn/348'
var videoIds = [348,259,197,134,75]
// var url='file:///F:/mcoui/qqyy/yuan/55f0084e0001716b00000000/canvas时钟时间效果.html'

function filterChapters(html){
    var $ = cheerio.load(html)

    var chapters = $('.chapter')
    var title = $('.course-infos .path span').text()
    var number = $('.statics .js-learn-num').text()
    console.log(number)
         // .trim  拿掉多余的空格 

    // courseData = {
    //  title: title,
    //  number: number,
    //  videos: [{
    //   chapterTitle:'',
    //   videos:[
    //       title:'',
    //       id:''
    //   ]
    //  }]
    // }

    var courseData = {
        title:title,
        number:number,
        videos:[]
    }

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

        courseData.videos.push(chapterData)
    })
    return courseData
}

function printCourseInfo(coursesData){
    coursesData.forEach(function(courseData){
        console.log(courseData.number + ' 人学过 ' + courseData.title + '\n')
    })

    coursesData.forEach(function(courseData){
        console.log('### ' + courseData.title + '\n')
        courseData.videos.forEach(function(item){
            var chapterTitle = item.chapterTitle
            console.log(chapterTitle)
            item.videos.forEach(function(video){
                console.log('【' + video.id + '】' + video.title)
            })
        })
    })
}

function getPageAsync(url){
    return new promise(function(resolve,reject){
        console.log('正在爬取：' + url)

        http.get(url,function(res){
            var html=''
            res.on('data',function(data){
                html+=data
            })
            res.on('end',function(){
                resolve(html)
                // var courseData = filterChapters(html)

                // printCourseInfo(courseData)
            })
        })
        
        .on('error',function(e){
            reject(e)
            console.log('获取课程数据出错！')
        })          
    })
}

var fetchCourseArray = []

videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl + id))
})

promise.all(fetchCourseArray)
    .then(function(pages){
        var coursesData = []

        pages.forEach(function(html){
            var courses = filterChapters(html)

            coursesData.push(courses)
        })

        coursesData.sort(function(a,b){      //排序
            return a.number < b.number
        })        

        printCourseInfo(coursesData)
    })


