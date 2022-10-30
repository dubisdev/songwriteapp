import "../styles/globals.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>SongWrite.app</title>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width"></meta>
        <meta
          name="description"
          content="A simple songwriting app for the web 🎶"
        />
        <meta name="keywords" content="songwriting, song, write, chords" />
      </head>
      <body>
        {children}
        <wc-toast />
      </body>
    </html>
  );
}
