import React, { useEffect, useState } from 'react'
import Post from './Post';
import { PencilIcon, PhotographIcon, CalendarIcon, DocumentTextIcon, VideoCameraIcon } from '@heroicons/react/outline'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db } from '../firebase';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';


function Posts() {
    
    const [open,setOpen] = useRecoilState(modalState);
    const [posts, setPosts] = useState([]);

    useEffect( () => 
            
            onSnapshot(query(collection(db, 'posts'), orderBy('timestamp','desc')), snapshot => {
            setPosts(snapshot.docs);

    }),[db]);


    return (
        <>
            <div className="flex flex-col p-1 px-4 bg-white mt-8 border-8 rounded-3xl md:p-6 md:px-14">

                <div className="flex flex-row items-center bg-white rounded-3xl border border-black">

                    <button onClick={()=> setOpen(true)} className="pl-5 flex items-center w-full bg-white text-gray-600 text-2xl rounded-full focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer hover:bg-blue-50"><PencilIcon className="h-5 w-5 text-gray-600" />&nbsp;&nbsp;Create Post...</button>

                </div>

                <div className="flex w-full justify-evenly mt-2">
                    <div className="flex flex-col items-center justify-items-center" onClick={()=> setOpen(true)}>
                        <PhotographIcon className="postboxBtn stroke-current text-blue-400" />
                        <h3 className="text-gray-600">Photo</h3>
                    </div>
                    <div className="flex flex-col items-center justify-items-center" onClick={()=> setOpen(true)}>
                        <CalendarIcon className="postboxBtn stroke-current text-green-500" />
                        <h3 className="text-gray-600">Event</h3>
                    </div>
                    <div className="flex flex-col items-center justify-items-center" onClick={()=> setOpen(true)}>
                        <DocumentTextIcon className="postboxBtn stroke-current text-purple-500" />
                        <h3 className="text-gray-600">Article</h3>
                    </div>
                    <div className="flex flex-col items-center justify-items-center" onClick={()=> setOpen(true)}>
                        <VideoCameraIcon className="postboxBtn stroke-current text-red-400" />
                        <h3 className="text-gray-600">Video</h3>
                    </div>
                </div>
            </div>
            <div>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        username={post.data().username}
                        userImg={post.data().userImg}
                        image={post.data().image}
                        description={post.data().description}
                        timeOfUpload={post.data().timestamp}
                    />
                ))}

            </div>
        </>
    )
}

export default Posts;
