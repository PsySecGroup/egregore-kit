require('dotenv').config()

export const HOSTNAME = (process.env.HOSTNAME as string) || '0.0.0.0'

export const PORT = parseInt(process.env.PORT as string) || 3000
