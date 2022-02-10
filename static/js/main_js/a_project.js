

(function(e){
 //获得传过来的login与在数据库中对应的表单
var paras = location.search;            //search获得地址中的参数，内容为'?itemId=12'
console.log(paras)
var result = paras.match(/[^\?&]*=[^&]*/g); 
paras = {};                   
for(i in result){
    var temp = result[i].split('=');    //split()将一个字符串分解成一个数组,两次遍历result中的值分别为['itemId','xx']
    paras[temp[0]] = temp[1];
}
let  project_id = paras.project_id
  console.log(project_id)
axios.get('product/product_a',{
    params:{product_id:project_id}}).then(res=>{
        console.log(res)
    })


})()