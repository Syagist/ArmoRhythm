import {Button} from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'init-state'}><div><Button>Material</Button></div></body>
    </html>
  );
}
