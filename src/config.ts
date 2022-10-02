require('dotenv').config()
import { resolve } from 'path'

export const HOSTNAME = (process.env.HOSTNAME as string) || '0.0.0.0'

export const PORT = parseInt(process.env.PORT as string) || 3000

export const REPORT_DIR = (process.env.REPORT_DIR as string) || resolve(__dirname, '../reports')
