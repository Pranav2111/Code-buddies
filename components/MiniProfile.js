import React from 'react'
import { signOut, useSession } from 'next-auth/react';

function MiniProfile() {
    const { data: session} = useSession();
    return (
        
        <div className="flex items-center justify-between my-5 mx-3">
            <img 
            className="rounded-full border p-[2px] w-16 h-16 border-gray-500" 
            src={session?.user?.image}
            alt=""
            />
            <div className="flex-1 m-4">
                <h2 className="font-bold">{session?.user?.name}</h2>
                <h3 className="text-sm text-gray-500">{session?.user?.email}</h3>
            </div>
            <button onClick={signOut} className="text-blue-400 text-sm font-semibold 
            bg-gray-100 p-2 border border-gray-300 rounded-xl hover:scale-110 duration-150 hover:bg-gray-200">Sign Out</button>
        </div>
    )
}

export default MiniProfile
