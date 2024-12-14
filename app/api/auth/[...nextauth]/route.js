import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/Models/User";
import connectDB from "@/app/Database/mongodb"
const handler = NextAuth({
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user, account}) {
            if (account.provider == 'github' || account.provider == 'google') {
                try {
                    await connectDB();
                    const currentUser = await User.findOne({ email: user.email });
                    if (!currentUser) {
                        const newUser = await User.create({
                            name:user.name,
                            email: user.email,
                            username: user.email.split('@')[0],
                        });
                    }
                    return true;
                } catch (error) {
                    console.error('Error signing in:', error);
                    return false;
                }
            }
            return true;
        },
    secret:process.env.NEXTAUTH_SECRET
}
})
export { handler as GET, handler as POST }