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

type IProps = {
  isOpen: boolean,
  handleOnClose: () => void,

}

const ImageUploadDialog = ({ isOpen, handleOnClose }: IProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chooseImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageUpload = (event:React.ChangeEvent) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      try {
        const publicUrl = await uploadImage(file, 'your-bucket-name', `uploads/${file.name}`);
        console.log('Image uploaded! Public URL:', publicUrl);
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
          <div className="py-4">
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