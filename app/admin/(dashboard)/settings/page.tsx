"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { KeyRound, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Pengaturan Akun</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola keamanan akun admin Anda.</p>
      </div>

      <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Ubah Password</h2>
            <p className="text-xs text-muted-foreground">Gunakan password yang kuat dan belum pernah dipakai.</p>
          </div>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-success/10 border border-success/30 rounded-md text-success text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Password berhasil diubah!
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-destructive/15 border border-destructive/30 rounded-md text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">Password Baru</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Min. 8 karakter"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Ulangi password baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Menyimpan..." : "Simpan Password Baru"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
