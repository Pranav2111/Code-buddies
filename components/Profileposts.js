import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Post from './Post';

function Profileposts() {

    const [myposts, setMyposts] = useState([]);
    const { data: session } = useSession();

    useEffect( () => 
            
            onSnapshot(query(collection(db, 'posts'),where("email","==",`${session?.user?.email}`)), snapshot => {
            setMyposts(snapshot.docs);

    }),[db]);

    return (
        <div>
                {myposts.map((mypost) => (
                    <Post
                        key={mypost.id}
                        id={mypost.id}
                        username={mypost.data().username}
                        userImg={mypost.data().userImg}
                        image={mypost.data().image}
                        description={mypost.data().description}
                        timeOfUpload={mypost.data().timestamp}
                        email={mypost.data().email}
                    />
                ))}

            </div>
    )
}

export default Profileposts
