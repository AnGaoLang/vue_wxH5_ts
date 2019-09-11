import { get, post } from './axios';

// 传入url，返回调用微信sdk的权限 
export const checkWX = (url: string) => {
  return get(`/nd/getJsApi?url=${url}`)
}

// 当前用户是否关注
export const isSubscribe = () => {
  return get(`/nd/isSubscribe`)
}

// 当前用户以获取福签的抽奖信息
export const luckyDrawInfo = (data: string, isloading: boolean = true) => {
  return get(`/nd/blessing/userInfo`, undefined, isloading)
}

// 抽奖
export const luckyDraw = (data?: object) => {
  return post(`/nd/blessing/draw`, data)
}
