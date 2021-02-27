export default function throttle(fn, wait = 100) {
  let prev = new Date();
  return function() {
    let now = new Date();
    if (now - prev > wait) {
      fn.apply(this, arguments);
      prev = new Date();
    }
  };
}
