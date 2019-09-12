import { get, post } from './axios';

// 传入url，返回调用微信sdk的权限 
export const checkWX = (url: string) => {
  return get(`/nd/getJsApi?url=${url}`)
}

// 当前用户是否关注
// {isSubscribe: true}
export const isSubscribe = () => {
  return get(`/nd/isSubscribe`)
}

// 当前用户以获取福签的抽奖信息
// {'focaA': 0, 'focaB': 0, 'focaC': 0, 'focaD': 0, 'focaE': 0}
export const luckyDrawInfo = (data: string, isloading: boolean = true) => {
  return get(`/nd/blessing/userInfo`, undefined, isloading)
}

// 抽奖
// {"imgUrl": "", "isSubscribe": true, "prizeName": "和谐福签"， prizeType: 1}
export const luckyDraw = (data?: object) => {
  return post(`/nd/blessing/draw`, data)
}
