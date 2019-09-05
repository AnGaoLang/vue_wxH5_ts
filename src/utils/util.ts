export const getQueryString = (name: string): any => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}