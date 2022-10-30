import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const user = useUser();
  const client = useSupabaseClient();
  return (
    <Navbar fluid={false} rounded={true}>
      <Navbar.Brand href="https://songwrite.app">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          width="30"
          height="30"
          className="mr-3 h-6 sm:h-9"
          alt="SongWrite.app Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
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
                img={user?.user_metadata.avatar_url}
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.user_metadata.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => client.auth.signOut()}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      )}
      {/* <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
        <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
};

export default Nav;
