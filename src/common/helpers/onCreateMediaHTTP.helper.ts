interface onCreateImageHTTPPayload {
  file?: File;
  files?: Array<File>;
  onCreateMediaHandler: ([{file_name, content}]: Array<OnCreateMediaHandlerPayload>) => void;
}

interface OnCreateMediaHandlerPayload {
  file_name: string;
  content: string;
}

export const onCreateImageHTTP = (
  {
    file,
    files,
    onCreateMediaHandler,
  }: onCreateImageHTTPPayload
): void => {
  const readMultiFiles = (files: Array<File>): void => {
    let filesArray: Array<{ file_name: string, content: string }> = [];

    for (let fileEl of files) {
      const [, fileFormat] = fileEl.type.split("/");
      const reader: FileReader = new FileReader();

      reader.readAsDataURL(fileEl);
      reader.onload = () => {
        const result = reader.result as string;
        const replacedResult = result.replaceAll(
          `data:image/${fileFormat};base64,`,
          ""
        );
        filesArray = [...filesArray, {
          file_name: fileEl!.name,
          content: replacedResult,
        }]

        if (filesArray.length >= 2) onCreateMediaHandler(filesArray);
      }
    }
  }

  if (file) {
    const [, fileFormat] = file.type.split("/");
    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      const replacedResult = result.replaceAll(
        `data:image/${fileFormat};base64,`,
        ""
      );

      onCreateMediaHandler([
        {
          file_name: file!.name,
          content: replacedResult,
        },
      ]);
    };

    reader.readAsDataURL(file);
  }

  if (files) {
    readMultiFiles(files);
  }
}
