function test() {
  var a = '起风了';
  var b = a;
  b = "心动了";
  var c = { "name": "张三" };
  var d = c;
  d.name = "李四";
}
test();