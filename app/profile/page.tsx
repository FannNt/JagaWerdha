import {getUserProfile} from "@/services/profile.service";
import {auth} from "@/auth";

export default async function ProfilePage() {
    const userId = Number((await auth())?.user.id)
    console.log("userId ", userId);
    const profileData = await getUserProfile(userId);
    console.log("data ",profileData);
    return <div></div>
}