import React, { useRef } from "react";
import { FileUploadProps } from "../../types/components/fileUploadProps";
import fuStyles from "@/styles/FileUpload.module.scss";

const FileUpload: React.FC<FileUploadProps> = ({
   setFileData,
  accept,
  children,
}) => {
  const ref = useRef<HTMLInputElement>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if ( e.target.files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Result = reader.result as string;
        setFileData({ file: e.target.files[0], base64: base64Result });
      };

      reader.readAsDataURL(e.target.files[0]);
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
