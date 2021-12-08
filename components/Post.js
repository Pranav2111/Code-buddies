import React, { useEffect, useRef, useState } from 'react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { ThumbUpIcon, ChatIcon, PaperAirplaneIcon, ShareIcon, EmojiHappyIcon } from '@heroicons/react/outline'
import { async } from '@firebase/util';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import Moment from 'react-moment';
import { Menu } from '@headlessui/react'
import {
    FacebookShareButton,
    InstapaperShareButton,
    WhatsappIcon,
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    PinterestShareButton,
    InstapaperIcon,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

function Post({ id, username, userImg, image, description, timeOfUpload }) {

    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState([]);
    const [hasliked, setHasliked] = useState(false);
    const inputElement = useRef(null);
    const shareMenu = useRef(null);



    useEffect(() =>
        onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'),
                orderBy('timestamp', 'desc')
            ),
            snapshot => setComments(snapshot.docs)
        ),
        [db, id])



    useEffect(() =>
        onSnapshot(

            collection(db, 'posts', id, 'likes'),
            snapshot => setLikes(snapshot.docs)
        ),
        [db, id])



    useEffect(() => {

        var check = false;
        for (var i = 0; i < likes.length; ++i) {
            if (likes[i].id === session?.user?.email) {
                check = true
            }
        }
        setHasliked(check);
    }, [likes])



    const likePost = async () => {

        if (hasliked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.email))
        }
        else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.email), {
                username: session.user.name,
            })
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.name,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
        })

    }

    return (
        <div className="bg-white my-7 border rounded-lg">

            {/* header */}
            <div className="flex items-center p-5 border-b-2">
                <img src={userImg} className="h-12 w-12 rounded-full object-contain border border-gray-400 p-1 mr-3" alt="" />
                <div className="flex-1 flex flex-col">
                    <p className="text-xl font-bold">{username}</p>
                    <span className="text-sm text-gray-500">
                        <Moment fromNow>
                            {timeOfUpload?.toDate()}
                        </Moment>
                    </span>
                </div>
                <DotsHorizontalIcon className="h-5" />
            </div>

            {/* descriptiom */}
            <div>
                <p className="p-5">
                    {description}
                </p>
            </div>

            {/* img */}
            <img src={image} className="object-cover w-full border-b-2" alt="" />

            {/* buttons */}
            {hasliked &&
                <p className="flex items-center border-t-2 border-b-2 border-gray-400 font-bold my-1 mx-5 px-4">{likes.length}{" Likes"}{<ThumbUpIcon className="h-5 w-5 ml-1" fill="#619eff" />}</p>
            }
            <div className="flex justify-evenly mt-4">
                <div className="flex items-center space-x-2">
                    {hasliked ? (
                        <><ThumbUpIcon className="LCSBtn" fill="#619eff" onClick={likePost} /><h3>{"Likes  ("}{likes.length}{")"}</h3></>
                    ) : (
                        <><ThumbUpIcon className="LCSBtn" onClick={likePost} /><h3>{"Likes  ("}{likes.length}{")"}</h3></>
                    )}
                </div>
                <div className="flex items-center space-x-2"><ChatIcon className="LCSBtn" onClick={() => inputElement.current.focus()} /><h3>Comment</h3></div>
                <div className="flex items-center space-x-2"><PaperAirplaneIcon className="LCSBtn rotate-45" /><h3>Send</h3></div>
                <div className="flex items-center space-x-2" onClick={() => shareMenu.current.click()}><ShareIcon className="LCSBtn" /><h3>Share</h3></div>


            </div>

            <div className="bg-gray-200 px-3 mx-3 rounded-3xl">
                <Menu>
                    <Menu.Button ref={shareMenu} className="hidden"></Menu.Button>
                    <Menu.Items
                        className="flex justify-evenly text-gray-500 text-sm text-semibold 
                                   focus:outline-none focus:ring-0 py-2"
                    >
                        <Menu.Item className="hover:scale-125 hover:animate-bounce">
                            <span><FacebookShareButton
                                url={image}
                                quote={description}
                                hashtag={'#Code-Buddies...'}
                            >
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                            </span>
                        </Menu.Item>
                        <Menu.Item className="hover:scale-150 hover:animate-bounce">
                            <span>
                                <WhatsappShareButton
                                    url={image}
                                    quote={description}
                                    hashtag={'#Code-Buddies...'}
                                >
                                    <WhatsappIcon size={40} round={true} />
                                </WhatsappShareButton></span>
                        </Menu.Item>
                        <Menu.Item className="hover:scale-125 hover:animate-bounce">
                            <span>
                                <InstapaperShareButton
                                    url={image}
                                    quote={description}
                                    hashtag={'#Code-Buddies...'}>
                                    <InstapaperIcon size={40} round={true} />
                                </InstapaperShareButton>
                            </span>
                        </Menu.Item>
                        <Menu.Item className="hover:scale-125 hover:animate-bounce">
                            <span>
                                <TwitterShareButton
                                    url={image}
                                    quote={description}
                                    hashtag={'#Code-Buddies...'}>
                                    <TwitterIcon size={40} round={true} />
                                </TwitterShareButton>
                            </span>
                        </Menu.Item>
                        <Menu.Item className="hover:scale-125 hover:animate-bounce">
                            <span>
                                <RedditShareButton
                                    url={image}
                                    quote={description}
                                    hashtag={'#Code-Buddies...'}>
                                    <RedditIcon size={40} round={true} />
                                </RedditShareButton>
                            </span>
                        </Menu.Item>
                        <Menu.Item className="hover:scale-125 hover:animate-bounce">
                            <span>
                                <TelegramShareButton
                                    url={image}
                                    quote={description}
                                    hashtag={'#Code-Buddies...'}>
                                    <TelegramIcon size={40} round={true} />
                                </TelegramShareButton>
                            </span>
                        </Menu.Item>
                        <Menu.Item className="hover:scale-125 hover:animate-bounce">
                            <span>
                                <PinterestShareButton
                                    url={image}
                                    quote={description}
                                    hashtag={'#Code-Buddies...'}>
                                    <PinterestIcon size={40} round={true} />
                                </PinterestShareButton>
                            </span>
                        </Menu.Item>
                    </Menu.Items>
                </Menu>

            </div>
            {/* comment */}
            {comments.length > 0 && (
                <div className="ml-2 mr-2 pl-8 h-20 overflow-y-scroll 
                scrollbar-thumb-black scrollbar-thin border border-gray-300 rounded-lg">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex items-center space-x-3 mb-3">
                            <img
                                className="h-7 rounded-full border border-gray-600"
                                src={comment.data().userImg}
                                alt=""
                            />
                            <p className="text-sm flex-1"><span className="font-bold">{comment.data().username}</span>{" "}{comment.data().comment}</p>

                            <Moment fromNow className="text-xs text-gray-500 pr-3">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}

            {/* input box */}
            <form className="flex items-center p-4 m-4 border border-gray-400 rounded-full">
                <EmojiHappyIcon className="h-7 cursor-pointer" />
                <input ref={inputElement} type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." className="border-none flex-1 focus:ring-0 outline-none ml-2" />
                <button type="submit" disabled={!comment.trim()} onClick={sendComment} className="font-semibold text-blue-400">Post</button>
            </form>
        </div>
    )
}

export default Post;
