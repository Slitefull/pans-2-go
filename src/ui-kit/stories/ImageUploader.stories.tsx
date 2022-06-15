import React, { useCallback, useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { FilesDropzoneUploader } from "../components/files-dropzone-uploader/files-dropzone-uploader.component";
import { action } from "@storybook/addon-actions";


export default {
  title: "Computools UI Kit/Files Dropzone Uploader",
  component: FilesDropzoneUploader,
} as Meta;

interface FileWithPreview {
  preview: string;
}

export const UploadImages = () => {
  const [files, setFiles] = useState<FileWithPreview[]>();

  const onDrop = useCallback((files: File[]) => {
    action("Dropped files")(files);
    setFiles(() =>
      files.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);

  return (
    <div>
      <FilesDropzoneUploader options={{ accept: "image/*", onDrop }}/>
      {files?.map((file) => (
        <img src={file.preview}/>
      ))}
    </div>
  );
};
