//전역변수 출력
console.log('filename:',__filename);
console.log('dirname:'+__dirname);
//console 전역객체 사용
console.log('숫자:%d + %d = %d', 273, 52, 273+52);
console.log('문자열:%s', 'Hello world ....! ', '특수기호와 상관없음');
console.log('JSON: %j', {name:'Hong'});

var obj = {name:'hong'};
obj = JSON.stringify(obj); // 객체 -> 문자열 변환
obj = JSON.parse(obj); // 문자열-> 객체로 전환

console.time('alpha');
var ouput = 1;
for (var i = 1; i <= 10 ; i++){
	ouput*= i ;

}
console.log('Result='+ouput);
console.timeEnd('alpha');


var module = require('./module.js');
console.log('abs(-273)='+module.abs(-273));
console.log('circle(3)='+module.circleArea(3));
