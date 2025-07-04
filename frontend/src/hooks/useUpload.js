import { useState } from "react";
import axios from "axios";

// Reference: https://github.com/LearnWebCode/cloudinary-finished-reference/blob/main/public/client-side.js
// https://cloudinary.com/documentation/upload_images
export function useUpload() {

    async function uploadFile({file, config={}}) {
        const UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL
        const form = new FormData();
        form.append('file', file);

        if (import.meta.env.MODE === 'development') {
            const preset = config?.product_upload ? import.meta.env.VITE_CLOUDINARY_PRODUCTS_UPLOAD_PRESET
                : import.meta.env.VITE_CLOUDINARY_PROFILE_UPLOAD_PRESET
            form.append('upload_preset', preset)
        } else {
            // TO DO:
            // Get signature for signed uploads in production environment
            //via backend for security
        }
        
        // https://cloudinary.com/documentation/upload_images#upload_response
        try {
            const response = await axios.post(
                UPLOAD_URL,
                form,
                { 
                    onUploadProgress: function (_progressEvent) {},
                }
            ); 
            return response.data;
        } catch (error) {
            throw new Error(error.data);
        }
    }

    return { uploadFile };
}