const GoogleButton = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition ${className}`}
    >
      {children}
    </button>
  );
};
