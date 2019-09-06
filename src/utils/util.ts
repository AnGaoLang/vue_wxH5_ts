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
  // alert(eleH)
  // alert(toTop)
  return totalH - toTop - eleH;
};

export const adaptPt = (top: HTMLElement | null, bottom: HTMLElement | null, moveTop?: HTMLElement | null) => {
  const toBot = toBottom(bottom);
  // alert(toBot)
  if (toBot > 0) {
    const padTop = toBot > 60 ? toBot / 2 : 0;
    top && (top.style.paddingTop = `${padTop}px`);
  } else {
    if (moveTop) {
      moveTop.style.cssText = `position:relative;top: ${toBot}px;`
    }
  }
}
