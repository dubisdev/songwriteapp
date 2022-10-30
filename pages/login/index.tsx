import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const themeVariables = {
  default: {
    colors: {
      brand: "#6831ff",
      brandAccent: "#4d1ad7",
    },
  },
};

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
            variables: themeVariables,
          }}
        />
      </div>
    </div>
  );
};

export default Home;
