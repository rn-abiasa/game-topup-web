"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGame(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const publisher = formData.get("publisher") as string;
  const notes = formData.get("notes") as string;
  const image = formData.get("image") as File;
  
  const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  let image_url = "";
  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('game_images')
      .upload(`logos/${fileName}`, image);
      
    if (uploadError) throw new Error("Gagal mengupload gambar");
    
    const { data: publicUrlData } = supabase.storage
      .from('game_images')
      .getPublicUrl(`logos/${fileName}`);
      
    image_url = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from("games").insert({
    name,
    slug,
    description,
    publisher,
    notes,
    image_url,
    banner_url: image_url, // For simplicity, use the same image as banner
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/games");
  revalidatePath("/");
  redirect("/admin/games");
}

export async function updateGame(id: string, formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const publisher = formData.get("publisher") as string;
  const notes = formData.get("notes") as string;
  const image = formData.get("image") as File | null;
  const oldImageUrl = formData.get("old_image_url") as string;
  
  const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  let image_url = oldImageUrl;

  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('game_images')
      .upload(`logos/${fileName}`, image);
      
    if (uploadError) throw new Error("Gagal mengupload gambar");
    
    const { data: publicUrlData } = supabase.storage
      .from('game_images')
      .getPublicUrl(`logos/${fileName}`);
      
    image_url = publicUrlData.publicUrl;
  }

  const { error } = await supabase.from("games").update({
    name,
    slug,
    description,
    publisher,
    notes,
    image_url,
    banner_url: image_url,
  }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/games");
  revalidatePath("/");
  redirect("/admin/games");
}

export async function deleteGame(id: string) {
  const supabase = await createClient();
  await supabase.from("games").delete().eq("id", id);
  revalidatePath("/admin/games");
  revalidatePath("/");
}

export async function getGames() {
  const supabase = await createClient();
  const { data } = await supabase.from("games").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function getGameBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("games").select("*").eq("slug", slug).single();
  return data;
}
