export interface FileUploadProps {
  setFile: (UploadedFileProps) => void;
  accept: string;
  children: any;
}

export interface UploadedFileProps {
  file: File | null;
  base64: string;
}
