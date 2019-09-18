import { get, post, upload } from './axios';

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

export const uploadPic = (data: any) => {
  return upload(`/nd/dreaming/upload`, data)
}

export const getMyWorks = () => {
  return get(`/nd/dreaming/one`)
}

export const joinMyWorks = (data: object) => {
  return post(`/nd/dreaming/enter`, data)
}

export const delMyWorks = (data: object) => {
  return post(`/nd/dreaming/delete`, data)
}
