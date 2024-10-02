import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SettingsClient from "./page";
import { revalidatePath } from 'next/cache';

async function fetchUserData() {
    const clerkuser = await currentUser();

    if (!clerkuser) {
        redirect("/sign-in");
        return null; // Ensure function returns null if redirecting
    }

    // find user in database by Clerk ID or email
    let user = await prisma.user.findFirst({
        where: {
            OR: [
                { id: clerkuser.id },
                { email: clerkuser.emailAddresses[0]?.emailAddress || "" }
            ]
        },
    });

    return user;
}

async function fetchUserMatches() {
    const clerkuser = await currentUser();

    if (!clerkuser) {
        redirect("/sign-in");
        return null; // Ensure function returns null if redirecting
    }

    let matches = await prisma?.match.findMany({
        where: {
            userId: clerkuser.id
        }
    });

    return matches;
}

async function fetchQuestions() {
    const clerkuser = await currentUser();

    if (!clerkuser) {
        redirect("/sign-in");
        return null; // Ensure function returns null if redirecting
    }

    let questions = await prisma?.quizAnswer.findMany({
        where: {
            userId: clerkuser.id
        }
    });

    revalidatePath('/');
    revalidatePath('/quiz');
    revalidatePath('/match');
    revalidatePath('/explore');

    if (questions.length < 1) {
        redirect("/quiz");
    }

    return questions;
}

export default async function SettingsServer() {
    const data = await fetchUserData();
    const matches = await fetchUserMatches();
    const questions = await fetchQuestions();

        return (
            <>
            <SettingsClient clerkdata={data} matches={matches} questions={questions} />
            </>
        );

}