import "../styles/globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>SongWrite.app - A powerful tool for Songwriters 🎶</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta
          name="description"
          content="Songwriting app for the web 🎶. Transpose and share your lyrics and chords with just one click."
        />
      </head>
      <body>
        {children}
        <wc-toast />
      </body>
    </html>
  );
}
