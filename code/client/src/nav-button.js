export function NavButton({ label, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="pl-5 inline-flex w-20 hover:bg-orange-600 bg-orange-300 text-orange-900 hover:text-white text-xs p-1 rounded mr-4"
    >
      {label}
    </button>
  );
}
