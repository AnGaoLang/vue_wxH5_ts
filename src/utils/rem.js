(function (doc, win, baseWidth) {
  // 禁止网页字体被放大
  function handleFontSize() {
    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
    });
  }
  if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", handleFontSize);
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
  }

  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          // if (clientWidth >= baseWidth) {
          //   docEl.style.fontSize = '100px';
          // } else {
            docEl.style.fontSize = 100 * (clientWidth / baseWidth) + 'px'; 
          // }
      };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window, 750);