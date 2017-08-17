import Hammer from 'hammerjs';

export default function() {
  this.init = (settings) => {
    this.element = document.querySelector(settings.body);
    this.ptr = document.querySelector(settings.ptr);
    this.callback = settings.callback;

    this.h = new Hammer(this.element, {
      touchAction: 'auto',
    });
    
    this.h.get('pan').set({ 
      direction: Hammer.DIRECTION_VERTICAL
    });
    
    this.h.on('pan', () => {
      if (this.loading)
        return;

      const scrollTop = document.body.scrollTop;

      if (scrollTop < 0) {
        this.ptr.style.height = `${-scrollTop / 2}px`;
    
        if (scrollTop < -32) {
          this.ptr.classList.add('ptr-ready');
          this.ptr.classList.remove('ptr-pulling');
        } else if (scrollTop > -32) {
          this.ptr.classList.add('ptr-pulling');
          this.ptr.classList.remove('ptr-ready');
        }
      }
    });
    
    this.h.on('panstart', () => {
      if (this.loading)
        return;

      this.ptr.classList.remove('ptr-done');
    });
    
    this.h.on('panend', () => {
      if (this.loading)
        return;

      this.ptr.classList.add('ptr-done');
      this.ptr.classList.remove('ptr-ready');
    
      if (document.body.scrollTop <= -32) {
        this.loading = true;
        this.ptr.classList.add('ptr-loading');
        
        this.callback().then(() => {
          this.loading = false;
          this.ptr.style.height = '';
          this.ptr.classList.remove('ptr-loading');
          return;
        });
      } else {
        this.ptr.style.height = '';
      }
    });
  }
}