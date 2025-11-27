import prisma from '../config/prisma.js'

export const getUserBy = async (whereCondition) => {
	console.log('User Lookup Condition:', whereCondition)
	return await prisma.user.findUnique(
		{ where : {...whereCondition} })
}

export const createUser = async (userData) => {
	return await prisma.user.create({data : userData})
}

