import Vue from 'vue';

function message(type, message) {
  Vue.prototype.$message({
    type: type,
    message: message,
  });
}

export { message };
