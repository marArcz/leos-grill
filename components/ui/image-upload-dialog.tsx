import React, { useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './button'
import { useUploadImage } from '@/app/lib/react-query/queriesAndMutations'

type IProps = {
    isOpen: boolean,
    handleOnClose: () => void,
    bucket: string,
    onFinishUpload: (publicUrl:string) => void
}

const ImageUploadDialog = ({ isOpen, handleOnClose, bucket,onFinishUpload }: IProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutateAsync: uploadImage, isPending: isUploadingImage } = useUploadImage();

    const chooseImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleImageUpload = async (event: React.ChangeEvent) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            try {
                const publicUrl = await uploadImage({ file, bucket, path: `uploads/${file.name}` });
                console.log('Image uploaded! Public URL:', publicUrl);

                if(publicUrl){
                    onFinishUpload(publicUrl as string);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => handleOnClose()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Image</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 relative">
                        {isUploadingImage && (
                            <div className="absolute w-full h-full bg-zinc-800 bg-opacity-70 flex justify-center items-center">
                                <span className=' text-lg'>Uploading...</span>
                            </div>
                        )}
                        <img src="/images/placeholder.jpeg" className='w-full object-cover' alt="" />
                        <input onChange={handleImageUpload} type="file" className=' hidden' aria-hidden ref={fileInputRef} />
                        <button onClick={chooseImage} className='btn bg-dark_2 w-full py-3 px-2 mt-2'>Choose Image</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ImageUploadDialog