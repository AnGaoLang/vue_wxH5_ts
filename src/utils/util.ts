// 获取url的参数。而不是vue路由的参数
export const getQueryString = (name: string): any => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}

// 获取目标元素到顶部的高度
export const getElementToPageTop = (el: HTMLElement | null): number => {
  if (el && el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop
  }
  return el ? el.offsetTop : 0
}

// 获取目标元素到底部的距离
export const toBottom = (ele: HTMLElement | null): number => {
  const totalH = window.innerHeight;
  const eleH = ele ? ele.offsetHeight : 0;
  const toTop = getElementToPageTop(ele);
  // 屏幕高度 - 最底部元素到顶部的距离 - 最底部元素自身高度  得到最底部元素到屏幕底部的距离
  return totalH - toTop - eleH;
};

/**
 * 
 * @param top 给予padding-top的最外层元素
 * @param bottom 最底部的元素
 * @param moveTop 能整体移动页面内容的包裹元素
 */
export const adaptPt = (top: HTMLElement | null, bottom: HTMLElement | null, moveTop?: HTMLElement | null) => {
  const toBot = toBottom(bottom);
  // 如果据底部的距离大于 0
  if (toBot > 0) {
    const padTop = toBot > 60 ? toBot / 2 : 0; // 且大于60
    top && (top.style.paddingTop = `${padTop}px`); // 给予外层 padding-top 一半的底部距离
  } else {
    // 如果据底部的距离小于 0
    if (moveTop) {
      // 将页面整体往上移动相应距离
      moveTop.style.cssText = `position:relative;top: ${toBot}px;`
    }
  }
}
