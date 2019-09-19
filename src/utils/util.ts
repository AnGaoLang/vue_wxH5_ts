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

export const getImgSize =  (str: string) => {
  let base64 = str.split('base64,')[1];
  let strLength: number = Number(base64.length);
  let fileLength = parseInt((strLength - (strLength / 8) * 2).toFixed(2));
  return parseInt((fileLength / 1024).toFixed(2));
}

export const base64ToBlob = (urlData: string) => {
  let bytes = window.atob(urlData.split(',')[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg'});
}

export const getBase64Image = (img: any, callback: any) => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  let newImg = new Image();
  newImg.src = img;
  canvas.width = newImg.width;
  canvas.height = newImg.height;
  let ext = newImg.src.substring(newImg.src.lastIndexOf('.') + 1).toLowerCase();
  newImg.onload = () => {
    ctx && ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height);
    let dataURL = canvas.toDataURL(`image/png`);
    callback && callback(dataURL);
  };
}
