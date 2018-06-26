// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-awesome/icons';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import Icon from 'vue-awesome/components/Icon';

Vue.component('icon', Icon)
Vue.use(BootstrapVue);
Vue.config.productionTip = process.env.NODE_ENV === 'production';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

/**
 * Asserts a condition is true and prints a message to console otherwise.
 * Becomes a null operation when in a production deployment
 * @param {Boolean} condition The condition to be verified
 * @param {String} message Message to print out on failure
 */
export function assert(condition, message) {
  if (!Vue.config.productionTip && !condition) {
    // eslint-disable-next-line no-console
    console.log(`ASSERT failed: ${message}`);
  }
}
