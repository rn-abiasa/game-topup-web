-- =============================================
-- Supabase Setup Script for Game Top-up Web
-- Paste this into the Supabase SQL Editor
-- =============================================

-- 1. Create tables
CREATE TABLE IF NOT EXISTS public.games (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  publisher text NOT NULL,
  notes text,
  image_url text NOT NULL,
  banner_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id uuid REFERENCES public.games(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  price integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_code text UNIQUE NOT NULL,
  game_id uuid REFERENCES public.games(id) ON DELETE SET NULL,
  item_id uuid REFERENCES public.items(id) ON DELETE SET NULL,
  game_name text NOT NULL,
  item_name text NOT NULL,
  price integer NOT NULL,
  user_id_game text NOT NULL,
  server_id text,
  contact_wa text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'done', 'failed')),
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security on our tables
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for games table
CREATE POLICY "Public can read games"
  ON public.games FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert games"
  ON public.games FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update games"
  ON public.games FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete games"
  ON public.games FOR DELETE USING (auth.role() = 'authenticated');

-- 4. RLS Policies for items table
CREATE POLICY "Public can read items"
  ON public.items FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert items"
  ON public.items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update items"
  ON public.items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete items"
  ON public.items FOR DELETE USING (auth.role() = 'authenticated');

-- 5. RLS Policies for orders table
-- Anyone can create an order and read by order_code
CREATE POLICY "Anyone can create an order"
  ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read orders by order_code"
  ON public.orders FOR SELECT USING (true);
-- Only authenticated admin can update status
CREATE POLICY "Authenticated users can update orders"
  ON public.orders FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete orders"
  ON public.orders FOR DELETE USING (auth.role() = 'authenticated');

-- 6. Create Storage Bucket for game images
INSERT INTO storage.buckets (id, name, public)
VALUES ('game_images', 'game_images', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage Policies for game_images bucket
CREATE POLICY "Public can view game images"
  ON storage.objects FOR SELECT USING (bucket_id = 'game_images');
CREATE POLICY "Authenticated users can upload game images"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'game_images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update game images"
  ON storage.objects FOR UPDATE USING (bucket_id = 'game_images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete game images"
  ON storage.objects FOR DELETE USING (bucket_id = 'game_images' AND auth.role() = 'authenticated');
