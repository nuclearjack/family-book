export default defineEventHandler(async (event) => {
  await clearUserSession(event)
  return { success: true, message: 'Вы вышли из системы' }
})
