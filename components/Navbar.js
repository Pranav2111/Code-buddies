import React, { useRef } from 'react';
import Image from 'next/image';
import onlyLogo from '/Users/pranav_patil/REACT_NXT/code-buddies/components/OL.png';
import logoWithName from '/Users/pranav_patil/REACT_NXT/code-buddies/components/LWN.png';
import { SearchIcon, PlusCircleIcon, PaperAirplaneIcon, UserGroupIcon } from '@heroicons/react/outline'
import { HomeIcon, MenuIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { useRouter } from 'next/router';
import { Menu } from '@headlessui/react'


function Navbar() {

    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();

    const { data: session } = useSession();
    const dropDownMenu = useRef(null);


    return (
        <div className="bg-gray-300 shadow-md sticky top-0 z-50">
            <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">

                {/* Logo */}
                <div className="relative hidden lg:inline-grid h-14 w-48 cursor-pointer" onClick={() => router.push('/')}>
                    <Image
                        src={logoWithName}
                        layout="fill"
                        objectFit="contains"
                        className="hover:scale-105 ease-out"

                    />
                </div>
                <div className="relative w-14 h-14 lg:hidden cursor-pointer" onClick={() => router.push('/')}>
                    <Image
                        src={onlyLogo}
                        layout="fill"
                        objectFit="contains"
                        className="hover:scale-105 ease-out"
                    />
                </div>

                {/* Search-Box */}
                <div className="hidden md:flex my-1  flex-row items-center bg-white rounded-3xl border border-black">
                    <div className="px-2">
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="items-center ">
                        <input className="bg-none rounded-3xl focus:outline-none focus:ring-0 focus:border-transparent" type="text" placeholder="Search" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end space-x-4">
                    <HomeIcon className="navBtn" onClick={() => router.push('/')} />
                    <MenuIcon className="h-8 md:hidden cursor-pointer hover:scale-125 ease-out" 
                      onClick={()=>dropDownMenu.current.click()}
                    />

                    {session ? (
                        <>
                            <PaperAirplaneIcon className="navBtn rotate-45" />
                            <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                            <UserGroupIcon className="navBtn" />
                            <img
                                onClick={() => router.push('/profile')}
                                src={session?.user?.image}
                                alt="PP"
                                className="h-10 w-10 rounded-full cursor-pointer hover:scale-105 ease-out"
                            />
                        </>
                    ) : (
                        <button onClick={signIn}>Sign In</button>
                    )}
                </div>
            </div>

            <div>
            <Menu>
                    <Menu.Button ref={dropDownMenu} className="hidden"></Menu.Button>
                    <Menu.Items
                        className="flex flex-col text-gray-700 text-semibold text-semibold 
                                   focus:outline-none focus:ring-0 py-2 items-center cursor-pointer"
                    >
                        <Menu.Item className="hover:scale-125">
                            <span onClick={() => router.push('/')}>Home</span>
                        </Menu.Item>
                        <Menu.Item className="hover:scale-125">
                            <span onClick={() => router.push('/profile')}>User Profile</span>
                        </Menu.Item>
                        <Menu.Item className="hover:scale-125">
                            <span><button onClick={signOut}>SignOut</button></span>
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>
        </div>
    )
}

export default Navbar
