import { get, post, upload } from './axios';

interface IfindAll {
  memberId: string
  pageNum: number
  pageSize: number
}

export const checkWX = (url: string) => {
  return get(`/nd/getJsApi?url=${url}`, undefined, false)
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

export const findAll = (data: IfindAll) => {
  return get(`/nd/dream/findAll?memberId=${data.memberId}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}

export const like = (data: object) => {
  return post(`/nd/dream/like`, data)
}
