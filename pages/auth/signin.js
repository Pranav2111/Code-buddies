import React from 'react'
import { getProviders, signIn as SignIntoProvider } from "next-auth/react"
import Navbar from '../../components/Navbar';
import logo from '/Users/pranav_patil/REACT_NXT/code-buddies/pages/auth/brandlogo.png';
import Image from 'next/image';
import Head from 'next/head'


function signin({ providers }) {
    return (
        <>
            <Head>
                <title>Code-Buddies - SignIn</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className="flex flex-col items-center">
                <Image
                    src={logo}
                    className="h-32 w-64"
                />
                <div className="-mt-5">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button
                                className="p-3 bg-blue-500 rounded-lg text-white hover:scale-110 ease-in-out duration-150"
                                onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers, },
    };
}
export default signin
