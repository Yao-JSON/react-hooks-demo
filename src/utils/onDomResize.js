let passiveEvents = false
try {
  var opts = Object.defineProperty({}, 'passive', {
    get:() => {
      passiveEvents = { passive: true }
    }
  })
  window.addEventListener('test', null, opts)
} catch (e) {}

export default function onDomResize(el, handler) {
  if(!(el instanceof HTMLElement)) {
    throw new TypeError("Parameter 1 is not instance of 'HTMLElement'.")
  }
  if (/^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|script|style|textarea|title)$/i.test(el.tagName)) {
    throw new TypeError('Unsupported tag type. Change the tag or wrap it in a supported tag(e.g. div).')
  }
  if (typeof handler !== 'function') { throw new TypeError("Parameter 2 is not of type 'function'.") }


  let lastWidth = el.offsetWidth || 1;
  let lastHeight = el.offsetHeight || 1;
  const maxWidth = 10000 * (lastWidth);
  const maxHeight = 10000 * (lastHeight);

  const expand = document.createElement('div');
  expand.style.cssText = 'position:absolute;top:0;bottom:0;left:0;right:0;z-index=-10000;overflow:hidden;visibility:hidden;';

  const shrink = expand.cloneNode(false)

  const expandChild = document.createElement('div');
  expandChild.style.cssText = 'transition:0s;animation:none;';
  const shrinkChild = expandChild.cloneNode(false);

  expandChild.style.width = maxWidth + 'px';
  expandChild.style.height = maxHeight + 'px';
  shrinkChild.style.width = '250%';
  shrinkChild.style.height = '250%';

  expand.appendChild(expandChild);
  shrink.appendChild(shrinkChild);
  el.appendChild(expand);
  el.appendChild(shrink);

  if (expand.offsetParent !== el) {
    el.style.position = 'relative';
  }

  expand.scrollTop = shrink.scrollTop = maxHeight;
  expand.scrollLeft = shrink.scrollLeft = maxWidth;

  let newWidth = 0
  let newHeight = 0

  function onResize () {
    if (newWidth !== lastWidth || newHeight !== lastHeight) {
      lastWidth = newWidth
      lastHeight = newHeight
      handler({
        width: lastWidth,
        height: lastHeight
      })
    }
  }

  function onScroll () {
    newWidth = el.offsetWidth || 1
    newHeight = el.offsetHeight || 1
    if (newWidth !== lastWidth || newHeight !== lastHeight) {
      requestAnimationFrame(onResize)
    }
    expand.scrollTop = shrink.scrollTop = maxHeight;
    expand.scrollLeft = shrink.scrollLeft = maxWidth;
  }
  
  expand.addEventListener('scroll', onScroll, passiveEvents)
  shrink.addEventListener('scroll', onScroll, passiveEvents)
}
