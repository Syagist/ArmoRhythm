export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'init-state'}><div>init-state</div></body>
    </html>
  );
}
