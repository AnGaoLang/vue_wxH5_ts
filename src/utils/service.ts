import { get, post } from './axios';

interface LuckyDraw {
  openid: string
}

export const isSubscribe = (data: string) => {
  return get(`/nd/isSubscribe?openid=${data}`)
}

export const luckyDrawInfo = (data: string, isloading: boolean = true) => {
  return get(`/nd/blessing/userInfo?openid=${data}`, undefined, isloading)
}

export const luckyDraw = (data: LuckyDraw) => {
  return post(`/nd/blessing/draw`, data)
}
