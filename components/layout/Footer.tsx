export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <p>
          © {new Date().getFullYear()} WarehouseOS
        </p>
      </div>
    </footer>
  );
}