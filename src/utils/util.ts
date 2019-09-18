export const getQueryString = (name: string): any => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}

export const getElementToPageTop = (el: HTMLElement | null): number => {
  if (el && el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop
  }
  return el ? el.offsetTop : 0
}

export const toBottom = (ele: HTMLElement | null): number => {
  const totalH = window.innerHeight;
  const eleH = ele ? ele.offsetHeight : 0;
  const toTop = getElementToPageTop(ele);
  return totalH - toTop - eleH;
};

export const adaptPt = (top: HTMLElement | null, bottom: HTMLElement | null, moveTop?: HTMLElement | null) => {
  const toBot = toBottom(bottom);
  // alert(toBot)
  if (toBot > 5) {
    const padTop = toBot > 60 ? toBot / 2 : 0;
    top && (top.style.paddingTop = `${padTop}px`);
  } else { // 距底部小于10则整体上移
    top && (top.style.paddingTop = `0px`);
    if (moveTop) {
      if (toBot > 0) {
        moveTop.style.cssText = `position:relative;top: -${toBot + 5}px;`;
      } else {
        moveTop.style.cssText = `position:relative;top: ${toBot - 5}px;`;
      };
    }
  }
}

export const isToday = (date: string) => {
  return +new Date() - +new Date(date) < 86400000;
}

export const getLocal = (key: string): string => {
  const returnData = localStorage.getItem(key)
  return returnData ? returnData : '';
}

export const setLocal = (key: string, value: string) => {
  return localStorage.setItem(key, value);
}

export const clearLocal = () => {
  return localStorage.clear();
}
