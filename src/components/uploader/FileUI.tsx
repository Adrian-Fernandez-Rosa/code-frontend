import {
    Dropzone,
    ExtFile,
    FileMosaic,
    FileMosaicProps,
    FullScreen,
    ImagePreview,
    VideoPreview,
   } from "@files-ui/react";
   import { useState } from "react";
   const BASE_URL =
   "http://127.0.0.1:8000/api/katas/uploadFile";
   
  export const FileUI = () => {
   const [extFiles, setExtFiles] = useState<ExtFile[]>([]);
   const [imageSrc, setImageSrc] = useState<File | string | undefined>(
     undefined
   );
   const [videoSrc, setVideoSrc] = useState<File | string | undefined>(
     undefined
   );
   const updateFiles = (incommingFiles: ExtFile[]) => {
     console.log("incomming files", incommingFiles);
     setExtFiles(incommingFiles);
   };
   const onDelete = (id: FileMosaicProps["id"]) => {
     setExtFiles(extFiles.filter((x) => x.id !== id));
   };
   const handleSee = (imageSource: File | string | undefined) => {
     setImageSrc(imageSource);
   };
   const handleWatch = (videoSource: File | string | undefined) => {
     setVideoSrc(videoSource);
   };
   const handleStart = (filesToUpload: ExtFile[]) => {
     console.log("advanced demo start upload", filesToUpload);
   };
   const handleFinish = (uploadedFiles: ExtFile[]) => {
     console.log("advanced demo finish upload", uploadedFiles);
   };
   const handleAbort = (id: FileMosaicProps["id"]) => {
     setExtFiles(
       extFiles.map((ef) => {
         if (ef.id === id) {
           return { ...ef, uploadStatus: "aborted" };
          } else return { ...ef };
        })
      );
   };
   const handleCancel = (id: FileMosaicProps["id"]) => {
     setExtFiles(
       extFiles.map((ef) => {
         if (ef.id === id) {
           return { ...ef, uploadStatus: undefined };
          } else return { ...ef };
        })
      );
   };
   return (
      <>
        <Dropzone
         onChange={updateFiles}
         minHeight="195px"
         value={extFiles}
         maxFiles={5}
          // FmaxFileSize={2998000 * 20}
         label="Drag'n drop files here or click to browse"
          // accept=".png,image/*, video/*"
         uploadConfig={{
            // autoUpload: true
        //   url: BASE_URL + "/file/28048465460",
            url: BASE_URL,
           cleanOnUpload: true,
         }}
         onUploadStart={handleStart}
         onUploadFinish={handleFinish}
        //  fakeUpload
         actionButtons={{
           position: "after",
           abortButton: {},
           deleteButton: {},
           uploadButton: {},
         }}
        >
          {extFiles.map((file) => (
            <FileMosaic
              {...file}
             key={file.id}
             onDelete={onDelete}
             onSee={handleSee}
             onWatch={handleWatch}
             onAbort={handleAbort}
             onCancel={handleCancel}
             resultOnTooltip
             alwaysActive
             preview
             info
            />
          ))}
        </Dropzone>
        <FullScreen
         open={imageSrc !== undefined}
         onClose={() => setImageSrc(undefined)}
        >
          <ImagePreview src={imageSrc} />
        </FullScreen>
        <FullScreen
         open={videoSrc !== undefined}
         onClose={() => setVideoSrc(undefined)}
        >
          <VideoPreview src={videoSrc} autoPlay controls />
        </FullScreen>
      </>
   );
  }