import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import MiniProfile from './MiniProfile'
import Profileposts from './Profileposts'
import logo from '/Users/pranav_patil/REACT_NXT/code-buddies/pages/auth/brandlogo.png';
import Image from 'next/image';
import { PencilIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil';
import { profilemodalState } from '../atoms/profilemodalAtom';
import { db } from '../firebase';
import { collection, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import { async } from '@firebase/util';

function Profilefeed() {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(profilemodalState);
    const [profiledata, setProfiledata] = useState([]);

    const data = [
        {
            email: "pranavpatil544@gmail.com",
            coverimage: "https://bit.ly/3pcsk3P",
            bio: "Frontend Developer | React & Redux | Data Science Entusiast"
        }
    ]

    if (session) {
        const fetchdata = async () => {


            const response = query(collection(db, "profiledata"), where("email", "==", session?.user?.email));
            const querySnapshot = await getDocs(response);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setProfiledata([...profiledata, doc.data()])
            })
            console.log(profiledata);

        }

        useEffect(() => {
            fetchdata();
        }, [db])

    }




    // const coverimage = profiledata.coverimage;
    // const bio = profiledata.bio;

    return (session ? (

        <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl
        xl:grid-cols-3 xl:max-w-6xl mx-auto">


            <section className="col-span-3">
                <div className="bg-white mt-8 border-8 rounded-3xl ">

                    {profiledata.map((pd) => (
                        <div className="flex flex-col items-center justify-center sm:text-center xs:text-center" key={pd.id}>
                        {pd.coverimage ? (<img src={pd.coverimage} alt="" className="object-cover w-full h-44 -mb-16 rounded-t-2xl" />) : (<div className="w-full h-36 bg-gradient-to-b to-white from-gray-500 -mb-16 rounded-t-2xl"></div>)}
                        <img src={session?.user?.image} alt="" className="rounded-full h-36 w-36 border-4 border-gray-400" />
                        <h1 className="font-semibold text-3xl text-gray-700">{session?.user?.name}</h1>
                        <p className="font-medium text-2xl text-gray-700 mt-3">{pd.bio}</p>
                    </div>
                    ))}

                    <PencilIcon className="h-7 w-7 m-3 cursor-pointer hover:scale-110 text-gray-600 rounded-sm" onClick={() => setOpen(true)} />

                </div>
            </section>
            <section className="col-span-2 md:mx-20 sm:mx-5 xs:mx-2">
                <div className="flex flex-col">
                    <hr className="mt-8 -mb-12 text-bold"></hr>
                    <p className="text-center mt-8 font-medium text-2xl -mb-6 text-gray-500">Posts</p>
                    <Profileposts />
                </div>


            </section >

            <section className="hidden xl:inline-grid col-span-1">
                <div className="mt-8 h-28 border border-gray-200 bg-white rounded-xl">
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

export default Profilefeed
