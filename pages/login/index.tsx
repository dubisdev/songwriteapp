import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

const Home = () => {
  const supabase = useSupabaseClient();

  return (
    <div className="flex justify-center px-4">
      <div className="max-w-2xl mt-20 w-full">
        <Auth
          magicLink
          providers={["google"]}
          redirectTo="/"
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#6831ff",
                  brandAccent: "#4d1ad7",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  // @ts-ignore
  const client = createServerSupabaseClient({ req, res });
  const {
    data: { user },
  } = await client.auth.getUser();

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return { props: {} };
}
