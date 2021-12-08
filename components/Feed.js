import React from 'react'
import MiniProfile from './MiniProfile'
import { signIn, useSession } from 'next-auth/react';
import logo from '/Users/pranav_patil/REACT_NXT/code-buddies/pages/auth/brandlogo.png';
import Image from 'next/image';

import Posts from './Posts'

function Feeds() {
    const { data: session } = useSession();

    return (session ? (
        <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl
        xl:grid-cols-3 xl:max-w-6xl mx-auto">


            <section className="col-span-2 md:mx-12 sm:mx-5 xl:mx-15">

                {/* Posts */}
                <Posts />

            </section >

            <section className="hidden xl:inline-grid col-span-1">
                <div className="fixed top-20 mt-5 border border-gray-200 bg-white pr-4 rounded-xl">
                    <MiniProfile />
                </div>
            </section>
        </main>
    ) : (
        <div className="flex flex-col items-center">
            <Image
                src={logo}
                className="h-32 w-64"
            />
            <div className="-mt-5">
                <button
                    className="p-3 bg-green-100 border border-black rounded-lg text-gray-600 hover:scale-110 ease-in-out duration-150"
                    onClick={signIn}>
                    Go To SignIn Page
                </button>
            </div>
        </div>
    )
    )
}

export default Feeds
