import prisma from '../config/prisma.js'


export function saveGoogleLogin(googleUserData) {
    localStorage.clear(); 
    
    localStorage.setItem('authToken', googleUserData.token);
    localStorage.setItem('userProfile', JSON.stringify(googleUserData.profile));
}

export const getUserBy = async (whereCondition) => {
	console.log('User Lookup Condition:', whereCondition)
	const correctedCondition = {};
    for (const key in whereCondition) {
         if (key === 'googleId') {
            correctedCondition['googleId'] = whereCondition[key];
        } else {
            correctedCondition[key] = whereCondition[key];
        }
    }

	return await prisma.user.findFirst(
		{ where: { ...correctedCondition } }) 
}

export const createUser = async (userData) => {

	const correctedData = {};

	const isGoogleLogin = userData.googleId || userData.googleId;

	 if (isGoogleLogin) {
        // --- Logic specific to Google Login ---
        
        const googleId = userData.googleId || userData.googleId;
        const fullName = userData.name || userData.email.split('@')[0];
        const parts = fullName.split(' ');
        
        // Map Google data to Prisma required fields (Explicitly guarantee all required fields)
        correctedData.googleId = googleId; // 1. Google ID (แก้ไขตาม Schema)
        correctedData.email = userData.email; // 2. Email
        correctedData.picture = userData.picture;
        
        // 3. Guarantee REQUIRED fields for Prisma (firstName, lastName)
        // ใช้ชื่อแรกเป็น firstName, นอกนั้นเป็น lastName
        correctedData.firstName = userData.firstName || parts[0]; 
        correctedData.lastName = userData.lastName || (parts.length > 1 ? parts.slice(1).join(' ') : ' '); 
        
        // 4. Handle other required fields (password, mobile)
        if (!correctedData.password) {
            // กำหนดค่าว่างสำหรับผู้ใช้ Google (ถ้า Schema อนุญาต)
            correctedData.password = ''; 
        }

    } else {
        // --- Logic for local registration (สำรอง/ไม่ควรถูกเรียกใช้สำหรับ Google Login) ---
        // Copy all properties from userData
        Object.assign(correctedData, userData);
        
        // Final sanity check for Prisma fields 
        if (correctedData.googleId) {
            correctedData.googleId = correctedData.googleId;
            delete correctedData.googleId;
        }
    }

	return await prisma.user.create({ data: correctedData })
}

