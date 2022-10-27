type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <h1 className="p-4 mb-5 text-3xl font-bold underline text-center">
        <span id="title">SongWrite.app</span>
      </h1>
      {children}
    </>
  );
};

export default Layout;
