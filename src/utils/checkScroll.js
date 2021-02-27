export default function checkScroll(fn) {
  return function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // console.log('距顶部' + scrollTop + '可视区高度' + windowHeight + '滚动条总高度' + scrollHeight);
    if (Math.round(scrollTop + windowHeight) > scrollHeight - 300) {
      fn();
    }
  };
}