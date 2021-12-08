import { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/solid'
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from '@firebase/firestore'
import { useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import { profilemodalState } from '../atoms/profilemodalAtom'

function Profilemodal() {

    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(profilemodalState);
    const picPickerRef = useRef(null);
    const [selectedcoverpic, setSelectedcoverpic] = useState(null);
    const [loading, setLoading] = useState(false);
    const bioRef = useRef(null);

    const updateProfile = async () => {
        if (loading) return;

        setLoading(true);

        // create a post and add to firestore 'Posts' collection
        // Get the post ID for new created post
        // Upload the img to firebase storage with post ID
        // Get a download URL from firebase storage and update to original post 
        const docRef = await addDoc(collection(db, 'profiledata'), {
            username: session.user.name,
            bio: bioRef.current.value,
            email: session.user.email,
        })

        const coverimageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(coverimageRef, selectedcoverpic, "data_url").then(async snapshot => {
            const downloadUrl = await getDownloadURL(coverimageRef);

            await updateDoc(doc(db, 'profiledata', docRef.id), {
                coverimage: downloadUrl
            })
        });

        setOpen(false);
        setLoading(false);
        setSelectedcoverpic(null);

    }
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedcoverpic(readerEvent.target.result);
        };

    }


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>

                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center
                                sm:block sm:p-0">

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                    </Transition.Child>

                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left
                                       overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>


                                {selectedcoverpic ? (
                                    <img src={selectedcoverpic}
                                        className="w-full object-contain cursor-pointer"
                                        onClick={() => setSelectedcoverpic(null)}
                                        alt="Error"
                                    />

                                ) : (
                                    <div
                                        onClick={() => picPickerRef.current.click()}
                                        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100
                                  cursor-pointer"
                                    >
                                        <CameraIcon
                                            className="h-6 w-6 text-blue-600"
                                            aria-hidden="true"
                                        />

                                    </div>

                                )}


                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg leading-6 font-medium text-gray-900"
                                        >
                                            Upload Cover Photo
                                        </Dialog.Title>
                                        <div>
                                            <input
                                                ref={picPickerRef}
                                                type="file"
                                                hidden
                                                onChange={addImageToPost}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <textarea
                                                className="border-none p-2 focus:ring-0 w-full bg-gray-100"
                                                ref={bioRef}
                                                rows="3"
                                                placeholder=" Please write Bio here.."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>


                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        disabled={!selectedcoverpic}
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
                                      px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-500 focus:outline-none
                                      focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:text-sm disabled:bg-gray-300
                                      disabled:cursor-not-allowed disabled\:bg-gray-300"
                                        onClick={updateProfile}
                                    >
                                        {loading ? "Updating..." : "Update Profile"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </Transition.Child>

                </div>

            </Dialog>
        </Transition.Root>
    )
}

export default Profilemodal
