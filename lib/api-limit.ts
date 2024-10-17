import { auth } from '@clerk/nextjs/server';
import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        console.log("No userId found in auth");
        return;
    }

    try {
        const userApiLimit = await prismadb.userApiLimit.findUnique({
            where: {
                userId
            }
        });

        if (userApiLimit) {
            await prismadb.userApiLimit.update({
                where: { userId: userId },
                data: { count: userApiLimit.count + 1 },
            });
            console.log(`Updated API limit for user ${userId}. New count: ${userApiLimit.count + 1}`);
        } else {
            await prismadb.userApiLimit.create({
                data: { userId: userId, count: 1 }
            });
            console.log(`Created new API limit for user ${userId}`);
        }
    } catch (error) {
        console.error("Error in increaseApiLimit:", error);
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();
    if (!userId) {
        console.log("No userId found in auth for checkApiLimit");
        return false;
    }

    try {
        const userApiLimit = await prismadb.userApiLimit.findUnique({
            where: {
                userId: userId
            }
        });

        if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
            console.log(`API limit check passed for user ${userId}. Current count: ${userApiLimit ? userApiLimit.count : 0}`);
            return true;
        } else {
            console.log(`API limit exceeded for user ${userId}. Current count: ${userApiLimit.count}`);
            return false;
        }
    } catch (error) {
        console.error("Error in checkApiLimit:", error);
        return false;
    }
};

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) {
        console.log("No userId found in auth for getApiLimitCount");
        return 0;
    }

    try {
        const userApiLimit = await prismadb.userApiLimit.findUnique({
            where: {
                userId
            }
        });

        if (!userApiLimit) {
            console.log(`No API limit found for user ${userId}`);
            return 0;
        }

        console.log(`API limit count for user ${userId}: ${userApiLimit.count}`);
        return userApiLimit.count;
    } catch (error) {
        console.error("Error in getApiLimitCount:", error);
        return 0;
    }
}