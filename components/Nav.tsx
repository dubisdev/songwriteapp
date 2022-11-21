import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex w-full py-4 px-8 m-auto justify-between mb-2">
      <Link href="/">
        <a className="inline-flex items-center">
          <img
            src="/logo.png"
            className="mr-3 h-12 sm:h-12 inline"
            alt="SongWrite.app Logo"
          />
          <h1 id="title" className="inline text-3xl font-bold underline">
            SongWrite.app
          </h1>
        </a>
      </Link>
    </nav>
  );
};

export default Nav;
