import Vue from 'vue/dist/vue.esm';
import PullToRefresh from './typtr';
import bikeshed from '@jxnblk/bikeshed';
import hello from 'hello-color'

new Vue({
  el: '#app',
  data: {
    style: {
      primary: '#FFF',
      secondary: '#000'
    },
    isTouch: 'ontouchstart' in window || navigator.msMaxTouchPoints,
    ptr: new PullToRefresh()
  },
  mounted() {
    this.setStyle();

    this.ptr.init({
      body: '.content',
      ptr: '.ptr',
      callback: this.refresh
    });
  },
  methods: {
    setStyle() {
      const color = hello(bikeshed());

      document.body.style['background-color'] = color.hues[2];

      this.style = {
        primary: color.base,
        secondary: color.color
      }
    },
    refresh() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.setStyle();
          resolve();
        }, 1500);
      });
    }
  }
});
