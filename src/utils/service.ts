import { get, post } from './axios';

type luckyDraw = {
  openid: string
}

export const isSubscribe = (data: string) => {
  return get(`/nd/index?openid=${data}`)
}

export const luckyDrawInfo = (data: string, isloading: boolean = true) => {
  return get(`/nd/blessing/userInfo?openid=${data}`, undefined ,isloading)
}

export const luckyDraw = (data: luckyDraw) => {
  return post(`/nd/blessing/draw`, data)
}