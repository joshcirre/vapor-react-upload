import useVaporUpload from '@/Composables/VaporUpload';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function Welcome() {
    const fileInputRef = useRef(null);
    const { store } = useVaporUpload(); // Destructure the store function from useVaporUpload
    const [file, setFile] = useState({
        media_type: 'image/png',
        file_path: '',
        filename: '',
        uploading: false
    });

    const handleFileChange = async (e) => {
        const selectedFile = fileInputRef.current.files[0];
        setFile({ ...file, uploading: true });

        try {
             const response = await store(selectedFile, {});

             setFile({
                 ...file,
                 file_path: response.key,
                 filename: response.extension,
                 uploading: false
             });
        } catch (error) {
             console.error("File upload failed:", error);
             setFile({ ...file, uploading: false });
        }
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center h-screen max-w-full m-auto bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
               <input type="file" id="file" onChange={handleFileChange} ref={fileInputRef} />
            </div>
            <div>
                {file.uploading ? <div>Uploading...</div> : null}
            </div>
        </>
    );
}
