import { useState } from 'react';

// FilePond dependencies
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const FilePondUploader = () => {
    const [files, setFiles] = useState<any>([])
    return (
        <div className='App'> 
        <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={5}
            server="http://localhost:8000/api/katas/uploadFile"
            name="files"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
        </div>
    )
}

