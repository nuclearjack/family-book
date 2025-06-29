export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session) {
    throw createError({ statusCode: 401, message: 'Вы не авторизованы' })
  }
  return { success: true, session }
})
