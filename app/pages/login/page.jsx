'use client';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';

import { AuthLayout } from '@/app/components/AuthLayout';
import { Button } from '@/app/components/Button';
import { TextField } from '@/app/components/main/Fields';

import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

import google from '../../images/logos/google.svg';

export default function Login() {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const getAndSetProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        };

        getAndSetProviders();
    }, []);

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
                                href="/pages/register"
                                className="font-medium text-blue-600 hover:underline dark:text-violet-400"
                            >
                                Sign up!
                            </Link>
                            {/* for a free trial. */}
                        </p>
                    </div>
                </div>
                <form
                    action="#"
                    className="bgmt-10 grid grid-cols-1 gap-y-8 bg-gray-50 dark:bg-gray-950"
                >
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
                <div className="pointer mt-10 flex items-center gap-4">
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                class="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center gap-4 rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:bg-violet-600"
                            >
                                <Image
                                    onClick={() => signIn(provider.id)}
                                    key={provider.name}
                                    src={google}
                                    width={35}
                                    height={35}
                                    className="rounded-full bg-white p-0.5"
                                />
                                Sign up with Google
                            </button>
                        ))}
                </div>
            </AuthLayout>
        </>
    );
}
