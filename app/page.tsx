import HomePage from "./homepage/page";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();

    if (session?.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const role = (session.user as any).role;
        if (role === "ORANGTUA") {
            redirect("/lansia");
        }
    }

    return <HomePage />;
}