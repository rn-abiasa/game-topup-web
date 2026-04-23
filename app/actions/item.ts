"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createItem(formData: FormData) {
  const supabase = await createClient();
  const game_id = formData.get("game_id") as string;
  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string);
  
  const { error } = await supabase.from("items").insert({
    game_id,
    name,
    price,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/items");
  redirect("/admin/items");
}

export async function updateItem(id: string, formData: FormData) {
  const supabase = await createClient();
  const game_id = formData.get("game_id") as string;
  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string);
  
  const { error } = await supabase.from("items").update({
    game_id,
    name,
    price,
  }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/items");
  redirect("/admin/items");
}

export async function deleteItem(id: string) {
  const supabase = await createClient();
  await supabase.from("items").delete().eq("id", id);
  revalidatePath("/admin/items");
}

export async function bulkCreateItems(game_id: string, items: { name: string, price: number }[]) {
  const supabase = await createClient();
  
  const itemsToInsert = items.map(item => ({
    game_id,
    name: item.name,
    price: item.price,
  }));

  const { error } = await supabase.from("items").insert(itemsToInsert);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/items");
  return { success: true };
}

export async function getItems() {
  const supabase = await createClient();
  // We use a join to get the game name
  const { data } = await supabase
    .from("items")
    .select("*, games(name)")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getItemsByGame(gameId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("game_id", gameId)
    .order("price", { ascending: true });
  return data || [];
}
