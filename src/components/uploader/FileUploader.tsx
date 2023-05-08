import * as React from "react";
import ReactDOM from "react-dom";
import { Dropzone, FileItem, ExtFile, FullScreen  } from "@dropzone-ui/react";

export const FileUploader = () => {
  const [files, setFiles] = React.useState<ExtFile[]>([]);
  const [imageSrc, setImageSrc] = React.useState<any>(undefined);

  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
  };

  const handleSee = (imageSource: any) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files: ExtFile[]) => {
    console.log("list cleaned", files);
  };

  const removeFile = (id: string | number | undefined) => {
    if(id){
      setFiles(files.filter((x) => x.id !== id));
    }
  };



  return (
    <>
    <Dropzone 
    style={{ minWidth: "505px"}}
    label="Drag'n drop files here or click to browse"
    onChange={updateFiles}
     value={files}
     maxFiles={5}
     maxFileSize={2998000}
    // onSubmit={"https://my-awsome-server/upload-my-file"}
   //  url="https://my-awsome-server/upload-my-file"
   //fakeUpload
     >
      {files.map((file: ExtFile) => (
        <FileItem 
        {...file} 
        preview 
        key={file.id} 
        info
        onDelete={() => removeFile(file.id)}
        localization={"ES-es"}
        resultOnTooltip
        
        />
      ))}

<FullScreen
        open= { imageSrc !== undefined}
        onClose={(e: any) => handleSee(undefined)}
        
      />

    </Dropzone>
    </>
  );
};