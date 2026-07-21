"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterData } from "@/services/auth.service";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register(formData);

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Nom complet"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Adresse email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Inscription..." : "S'inscrire"}
      </button>
    </form>
  );
}