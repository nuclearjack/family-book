import { initDatabase } from '../utils/initDb'

export default defineNitroPlugin(async () => {
  await initDatabase()
})
