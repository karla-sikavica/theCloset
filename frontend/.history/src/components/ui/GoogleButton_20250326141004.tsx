const GoogleButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={`google-button`}>
      {children}
    </button>
  );
};

export default GoogleButton;
