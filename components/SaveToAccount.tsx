import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FC } from "react";
import { useStore } from "../utils/state";

const SaveToAccount: FC = () => {
  const client = useSupabaseClient();
  const user = useUser();
  const [songContent, songName] = useStore((s) => [s.text, s.songName]);

  if (!user) return null;

  const handleClick = async () => {
    await client.from("lyrics").insert({
      owner: user.id,
      content: songContent,
      title: songName,
    });

    const { toast } = await import("wc-toast");
    toast("Added to DB", { icon: { type: "success" } });
  };

  return (
    <button
      className="bg-green-400 hover:bg-green-600 text-white font-bold rounded py-1 px-2"
      onClick={handleClick}
    >
      Save To Account
    </button>
  );
};

export default SaveToAccount;
