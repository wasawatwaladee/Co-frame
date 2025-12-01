import prisma from '../config/prisma.js'

export const getUserBy = async (whereCondition) => {
	console.log('User Lookup Condition:', whereCondition)
	// เปลี่ยนไปใช้ findFirst แทน findUnique เพื่อรองรับเงื่อนไขที่ไม่ใช่ Unique Field
	const correctedCondition = {};
    for (const key in whereCondition) {
        if (key === 'googleId') {
            correctedCondition['googleID'] = whereCondition[key]; 
        } else if (key === 'googleID') {
            correctedCondition['googleID'] = whereCondition[key];
        } else {
            correctedCondition[key] = whereCondition[key];
        }
    }

	return await prisma.user.findFirst(
		{ where: { ...correctedCondition } }) 
}

export const createUser = async (userData) => {

	const correctedData = {};

	const isGoogleLogin = userData.googleId || userData.googleID;

	 if (isGoogleLogin) {
        // --- Logic specific to Google Login ---
        
        const googleId = userData.googleId || userData.googleID;
        const fullName = userData.name || userData.email.split('@')[0];
        const parts = fullName.split(' ');
        
        // Map Google data to Prisma required fields (Explicitly guarantee all required fields)
        correctedData.googleID = googleId; // 1. Google ID (แก้ไขตาม Schema)
        correctedData.email = userData.email; // 2. Email
        correctedData.picture = userData.picture;
        
        // 3. Guarantee REQUIRED fields for Prisma (firstName, lastName)
        // ใช้ชื่อแรกเป็น firstName, นอกนั้นเป็น lastName
        correctedData.firstName = userData.firstName || parts[0]; 
        correctedData.lastName = userData.lastName || (parts.length > 1 ? parts.slice(1).join(' ') : ' '); 
        
        // 4. Handle other required fields (password, mobile)
        // ⚠️ ASSUMPTION: Password และ Mobile ถูกกำหนดให้ REQUIRED ใน Prisma Schema
        if (!correctedData.password) {
            // กำหนดค่าว่างสำหรับผู้ใช้ Google (ถ้า Schema อนุญาต)
            correctedData.password = ''; 
        }
        if (!correctedData.mobile) {
            // กำหนดค่าเริ่มต้นสำหรับฟิลด์บังคับ
            correctedData.mobile = '0000000000'; 
        }

    } else {
        // --- Logic for local registration (สำรอง/ไม่ควรถูกเรียกใช้สำหรับ Google Login) ---
        // Copy all properties from userData
        Object.assign(correctedData, userData);
        
        // Final sanity check for Prisma fields 
        if (correctedData.googleId) {
            correctedData.googleID = correctedData.googleId;
            delete correctedData.googleId;
        }
    }

	return await prisma.user.create({ data: correctedData })
}

