import React, { useRef } from "react";
import { FileUploadProps } from "../../types/components/fileUploadProps";
import fuStyles from "@/styles/FileUpload.module.scss";

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Result = reader.result as string;
        setFile({ file: selectedFile, base64: base64Result });
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div
      onClick={() => ref.current.click()}
      className={fuStyles.upload_picture_box}
    >
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default FileUpload;
