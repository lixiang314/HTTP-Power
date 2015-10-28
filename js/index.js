var inputUrl ="";



$(document).ready(function(){

	$('#btn_enter').click(function(){
		getData();
	});
  $('ul.span').click(function(){
  $(this).next('ul').hide(300);
});
})

function getData(){
	var url = $(".inp_url").val();
	$.ajax({
			url : url,
			dataType : 'json',
			type : "get",
			async : false,
			success : function(data) {
         $('.bar_data').html(_parse(data));
			}
		});
}


/*
  json2list 可以很方便的把json数据转换为html列表
  可接受的参数类型为typeof: 'object'
  包括：[...], {...}, null
  [...] 表示数组形式的对象 typeOf: 'array'
  {...} 表示散列形式的对象 typeOf: 'object'
  null 表示什么都没有的对象 typeOf: 'null'
  在这里，null, [], {} 的输出结果都是: 'null'
  by rugby, wlxku123@gmail.com 2011.5.14
*/

function _parse(o) {
  if (isFalse(o))  // 这个实际上只检查 [...], {...}, null
    return '<span class=\"data_value grey\">null</span>'; // 如果是[],{}和null其中一个，就返回'null'字符
  else {
    var i, s = '', t = typeOf(o);
    for (i in o) {
      var s1 = '', t1 = typeof o[i];
      if (t1 === 'object')
        s1 = _parse(o[i]);
      else // 对于[...]及{...}以外的，直接字符化即可
        // s1 = '<span class=\"data_value\">' + String(o[i]) + '</span>';
          s1 = '<input type=\"text\" value=\"'+ String(o[i])+'\" class=\"data_value\" disabled>';
      if (t === 'array')
        s += '<li>' + s1 + '</li>';
      else //'object'需要加上键值
        s += '<li><span class="data_key">' + i + '</span>  ' +s1+ '</li>';
    }
  }
  return '<ul>' + s + '</ul>';

}

function typeOf(value) {
  var t = typeof value;
  if (value === null)
    t = 'null'; //null表示什么都没有,只有null===null才返回true
  if (t === 'object' && value.constructor === Array)
    t = 'array'; //如果type确实为'object'，后面才会执行
  return t;
}


function isFalse(value) {
  var i, s = true, t = typeof value;
  if (value !== null && t === 'object')
    for(i in value) return false; //如果对象是可枚举的
  else if (t === 'function')
    return isFalse(value()); //依据函数的返回值判定
  else
    s = value ? false : true;
  return s;
}








