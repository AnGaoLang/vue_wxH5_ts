import { get, post } from './axios';

export const isSubscribe = (data: string) => {
  return get(`/nd/index?openid=${data}`)
}