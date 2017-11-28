string=['0102030405']
var str=string.join().split('');
var c=[],d=[],f=[];
for(var i=0;i<str.length;i++){
   if(i%2==0){
      c.push(str[i]);
   }else{
      d.push(str[i]);
   }   
}

for(var j=0;j<c.length;j++){

   if(d[j]==undefined){
      f.push(c[j]);
   }else{
      f.push(c[j]+d[j]);
   }
};f;

//["01", "02", "03", "04", "05"]


var string = "前二直选:03|05&前三组选:03 06 09&前二组选:08 11&任选七:02 03 04 05 06 08 11";
var str=string.split('&');
var c=[];
for(var i=0;i<str.length;i++){
   c.push(str[i].split(':'));
}
var d=[],f=[];
for(var i=0;i<c.length;i++){
   for(var j=0;j<c[i].length;j++){
      if(j%2==0){
         d.push(c[i][j]);
      }else{
         f.push(c[i][j]);
      }
   }
};d;f;


var e=[],g=[];
e=f[0].split('|');
for(var i=1;i<c.length;i++){
  g.push(f[i].split(' '))
}

var w=g[0],r=g[1],t=g[2];e;




// 处理成 ['前二直选','前三组选','前三组选','任选七']
// var string = "前二直选:03|05&前三组选:03 06 09&前二组选:08 11&任选七:02 03 04 05 06 08 11";  这个是处理成两个数组 一个存放玩法 一个存放投注的数字




