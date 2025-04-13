interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const HomeButton = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className="homeButton">
      {children}
    </button>
  );
};

export default HomeButton;
