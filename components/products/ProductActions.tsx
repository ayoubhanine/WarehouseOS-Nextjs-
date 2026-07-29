"use client";

import Link from "next/link";

interface Props {
  id: string;
  onArchive: (id: string) => void;
}

export default function ProductActions({
  id,
  onArchive,
}: Props) {
  return (
    <div className="flex gap-2">

      <Link
        href={`/products/${id}`}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Voir
      </Link>

      <Link
        href={`/products/${id}/edit`}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Modifier
      </Link>

      <button
        onClick={() => onArchive(id)}
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Archiver
      </button>

    </div>
  );
}