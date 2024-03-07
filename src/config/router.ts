const isDev = process.env.NODE_ENV === 'development'

const BASE_NAME_DEV = ''
const BASE_NAME_PROD = '/react-spa-blockchain'

export const baseName = isDev ? BASE_NAME_DEV : BASE_NAME_PROD
