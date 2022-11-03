import { SupabaseClient } from "@supabase/supabase-js";

export const getUsernameId = async (
  supabase: SupabaseClient,
  paramsUsername: string
) => {
  const normalizedUsername = paramsUsername.toLowerCase().trim();

  return await supabase
    .from("profiles")
    .select("id")
    .filter("username", "eq", normalizedUsername);
};

export const getSongByKey = async (
  supabase: SupabaseClient,
  { userId, songName }: { userId: string; songName: string }
) => {
  // TODO: use slugs instead of song name
  const normalizedSongName = songName.toLowerCase().trim();

  return await supabase
    .from("lyrics")
    .select("title, content")
    .filter("owner", "eq", userId)
    .filter("title", "eq", normalizedSongName);
};
