import { get, post } from './axios';

export const checkWX = (url: string) => {
  return get(`/nd/getJsApi?url=${url}`)
}

export const isSubscribe = () => {
  return get(`/nd/isSubscribe`)
}

export const luckyDrawInfo = (data: string, isloading: boolean = true) => {
  return get(`/nd/blessing/userInfo`, undefined, isloading)
}

export const luckyDraw = (data?: object) => {
  return post(`/nd/blessing/draw`, data)
}
