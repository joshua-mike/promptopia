import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

console.log({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({ session })
    {
    },
    async signIn({ profile })
    {
        try
        {
            await connectToDB();
            if (this.session.user.email === profile.email)
            {
                return true;
            }
            else
            {
                createNewUser(profile);
            }
            return true;
        }
        catch (error)
        {
            console.error("Error connecting to MongoDB", error);
            return false;
        }
    }
});

export { handler as GET, handler as POST };