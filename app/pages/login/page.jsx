import Head from 'next/head';
import Link from 'next/link';

import { AuthLayout } from '@/app/components/AuthLayout';
import { Button } from '@/app/components/Button';
import { TextField } from '@/app/components/Fields';

export default function Login() {
    return (
        <>
            <Head>
                <title>Sign In - TaxPal</title>
            </Head>
            <AuthLayout>
                <div className="flex flex-col">
                    <Link
                        href="/"
                        aria-label="Home"
                        className="from-light-auth via-light-auth to-light-auth bg-gradient-to-r text-xl"
                    >
                        lecturit.ai
                    </Link>
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold ">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm ">
                            Don’t have an account?{' '}
                            <Link
                                href="/register"
                                className="font-medium text-blue-600 hover:underline dark:text-violet-400"
                            >
                                Sign up!
                            </Link>
                            {/* for a free trial. */}
                        </p>
                    </div>
                </div>
                <form action="#" className="bg-gray-50 dark:bg-gray-950 bgmt-10 grid grid-cols-1 gap-y-8">
                    <TextField
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <TextField
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    <div>
                        <Button
                            type="submit"
                            variant="solid"
                            color="blue"
                            className="w-full"
                        >
                            <span>
                                Sign in <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </AuthLayout>
        </>
    );
}