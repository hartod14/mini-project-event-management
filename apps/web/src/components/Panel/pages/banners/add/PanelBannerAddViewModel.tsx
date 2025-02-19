import { LoadingContext } from '@/context/LoadingContext';
import { uploadImage } from '@/helpers/handlers/upload';
import { useRouter } from 'next/navigation';
import React, { useCallback, useContext, useRef, useState } from 'react'

export default function PanelBannerAddViewModel() {
   const [isLoading, setIsLoading] = useState(false);
    const loading = useContext(LoadingContext);
    const router = useRouter();
     const [image, setImage] = useState<string>("")
        const refImage = useRef<HTMLInputElement>(null);
         const upload = useCallback(
                async (
                    e: React.ChangeEvent<HTMLInputElement>,
                    setFieldValue: (field: string, value: any) => void
                ) => {
                    setIsLoading(true);
                    if (e.target.files?.length) {
                        const image: File = e.target.files[0];
                        const form = new FormData();
                        form.append("image", image);
        
                        const resImage = await uploadImage(form);
        
                        setFieldValue("image", resImage.data);
                        setImage(resImage.data);
                    }
                    setIsLoading(false);
                },
                []
            );
    return { isLoading, setIsLoading, router, loading ,refImage,image,setImage,upload};
}
