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

export const getUserLyrics = async (
  supabase: SupabaseClient,
  userId: string
) => {
  return await supabase
    .from("lyrics")
    .select("title, slug")
    .filter("owner", "eq", userId);
};

export const getSongByKey = async (
  supabase: SupabaseClient,
  { userId, slug }: { userId: string; slug: string }
) =>
  await supabase
    .from("lyrics")
    .select("title, content")
    .filter("owner", "eq", userId)
    .filter("slug", "eq", slug);
