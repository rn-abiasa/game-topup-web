"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function generateOrderCode(): string {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${ymd}-${random}`;
}

export async function createOrder(data: {
  game_id: string;
  item_id: string;
  game_name: string;
  item_name: string;
  price: number;
  user_id_game: string;
  server_id?: string;
  contact_wa: string;
}) {
  const supabase = await createClient();
  const order_code = generateOrderCode();

  const { error } = await supabase.from("orders").insert({
    order_code,
    ...data,
    status: "pending",
  });

  if (error) throw new Error(error.message);

  return order_code;
}

export async function getOrderByCode(order_code: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("order_code", order_code)
    .single();
  return data;
}

export async function getAllOrders() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function updateOrderStatus(id: string, status: string, notes?: string) {
  const supabase = await createClient();
  await supabase.from("orders").update({ status, notes }).eq("id", id);
  revalidatePath("/admin/orders");
}

export async function getDashboardStats() {
  const supabase = await createClient();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [gamesCount, itemsCount, ordersCount, revenueResult, recentOrders] = await Promise.all([
    supabase.from("games").select("*", { count: "exact", head: true }),
    supabase.from("items").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("price").eq("status", "done").gte("created_at", startOfMonth),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const totalRevenue = revenueResult.data?.reduce((sum, o) => sum + (o.price || 0), 0) || 0;

  return {
    gamesCount: gamesCount.count || 0,
    itemsCount: itemsCount.count || 0,
    ordersCount: ordersCount.count || 0,
    totalRevenue,
    recentOrders: recentOrders.data || [],
  };
}
