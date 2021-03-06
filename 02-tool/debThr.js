// 防抖
// 在触发事件后n秒后函数只会执行一次，如果在n秒内重新触发，则会重新计算时间
/**
 * @param fn 函数
 * @param wait 延迟执行毫秒数，默认1秒
 */
function debounce(fn, wait) {
  let timeout;
  wait = wait || 1000;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  }
}
// 节流
// 连续触发事件但在n秒内只会触发一次，稀释事件的执行频率
/**
 * @param fn 函数
 * @param wait 延迟执行毫秒数，默认1秒
 */
function throttle(fn, wait) {
  let timeout;
  wait = wait || 1000;
  return function () {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        fn.apply(context, args);
      }, wait);
    }
  }
}