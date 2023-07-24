import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';

import { connectToDb } from '@/utils/database';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            });

            session.user.id = String(sessionUser._id);

            return session;
        },

        async signIn({ profile }) {
            try {
                // await connectToDb();

                // const userExists = await User.findOne({
                //     email: profile.email,
                // });

                // if (!userExists) {
                //     await User.create({
                //         email: profile.email,
                //         username: profile.name.replace(' ', '').toLowerCase(),
                //         image: profile.picture,
                //     });
                // }

                return true;
            } catch (error) {
                console.error(
                    `Error while trying to Sign In: ${error.message}`,
                );

                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
