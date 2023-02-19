import { token } from './utils/cookies'

export const header = {
  headers: {
    Authorization: `${token()}`,
  },
}

export const header_media = {
  headers: {
    'Content-type': 'multipart/form-data',
    Authorization: `${token()}`,
  },
}
