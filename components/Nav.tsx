import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";

const Nav = () => {
  const user = useUser();
  const client = useSupabaseClient();
  return (
    <Navbar className="max-w-6xl m-auto content-around">
      <Navbar.Brand href="/">
        <img
          src="/logo.png"
          className="mr-3 h-12 sm:h-12 inline"
          alt="SongWrite.app Logo"
        />
        <span id="title" className="text-3xl font-bold underline">
          SongWrite.app
        </span>
      </Navbar.Brand>
      {!user && (
        <Link href="/login" className="flex md:order-2">
          Sign In
        </Link>
      )}
      {user && (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                placeholderInitials={user.user_metadata?.name?.slice(0, 1)}
                img={user?.user_metadata.avatar_url}
                rounded={true}
                bordered={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.user_metadata.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            {/* <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item> */}
            {/* <Dropdown.Divider /> */}
            <Dropdown.Item onClick={() => client.auth.signOut()}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
    </Navbar>
  );
};

export default Nav;
