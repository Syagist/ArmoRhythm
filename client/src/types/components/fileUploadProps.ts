export interface FileUploadProps {
  setFileData: (UploadedFileProps) => void;
  accept: string;
  children: any;
}

export interface UploadedFileDataType {
  file: File | null;
  base64: string;
}
