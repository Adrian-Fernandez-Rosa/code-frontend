import * as React from "react";
import ReactDOM from "react-dom";
import { Dropzone, FileItem, ExtFile } from "@dropzone-ui/react";

export const FileUploader = () => {
  const [files, setFiles] = React.useState<ExtFile[]>([]);
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
  };
  return (
    <Dropzone onChange={updateFiles} value={files}>
      {files.map((file) => (
        <FileItem {...file} preview />
      ))}
    </Dropzone>
  );
};