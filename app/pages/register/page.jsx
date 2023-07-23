'use client';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { AuthLayout } from '@/app/components/AuthLayout';
import { Button } from '@/app/components/Button';
import { SelectField, TextField } from '@/app/components/main/Fields';

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';

import google from '../../images/logos/google.svg';

export default function Register() {
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
                <title>Sign Up - TaxPal</title>
            </Head>
            <AuthLayout>
                <div className="flex flex-col">
                    <Link href="/" aria-label="Home" className="text-xl">
                        lecturit.ai
                    </Link>
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold ">
                            Get started for free
                        </h2>
                        <p className="mt-2 text-sm ">
                            Already registered?{' '}
                            <Link
                                href="/pages/login"
                                className="font-medium text-blue-600 hover:underline dark:text-violet-400"
                            >
                                Sign in
                            </Link>{' '}
                            to your account.
                        </p>
                    </div>
                </div>
                <form
                    action="#"
                    className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
                >
                    <TextField
                        label="First name"
                        id="first_name"
                        name="first_name"
                        type="text"
                        autoComplete="given-name"
                        required
                    />
                    <TextField
                        label="Last name"
                        id="last_name"
                        name="last_name"
                        type="text"
                        autoComplete="family-name"
                        required
                    />
                    <TextField
                        className="col-span-full"
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <TextField
                        className="col-span-full"
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                    />
                    <SelectField
                        className="col-span-full"
                        label="How did you hear about us?"
                        id="referral_source"
                        name="referral_source"
                    >
                        <option>AltaVista search</option>
                        <option>Super Bowl commercial</option>
                        <option>Our route 34 city bus ad</option>
                        <option>The “Never Use This” podcast</option>
                    </SelectField>
                    <div className="col-span-full">
                        <Button
                            type="submit"
                            variant="solid"
                            color="blue"
                            className="w-full"
                        >
                            <span>
                                Sign up <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
                <div className="pointer mt-10 flex items-center gap-4">
                    {providers &&
                        Object.values(providers).map((provider) => {
                            console.log(provider);

                            return (
                                <button
                                    type="button"
                                    className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center gap-4 rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:bg-violet-600"
                                    onClick={() =>
                                        signIn(provider.id, {
                                            callbackUrl:
                                                'http://localhost:3000/pages/new-summary/with-file',
                                        })
                                    }
                                >
                                    <Image
                                        key={provider.name}
                                        src={google}
                                        alt={'google'}
                                        width={35}
                                        height={35}
                                        className="rounded-full bg-white p-0.5"
                                    />
                                    Sign up with Google
                                </button>
                            );
                        })}
                </div>
            </AuthLayout>
        </>
    );
}
