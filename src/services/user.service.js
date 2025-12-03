import prisma from '../config/prisma.js'

export const getUserBy = async (whereCondition) => {
	console.log('User Lookup Condition:', whereCondition)
	return await prisma.user.findUnique(
		{ where : {...whereCondition} })
}

export const createUser = async (userData) => {
	return await prisma.user.create({data : userData})
}

export async function getMe(id) {
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  return user;
}