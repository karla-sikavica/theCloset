import "../css/HomeButton.css";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const HomeButton = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className="homeButton">
      {children}
    </button>
  );
};

export default HomeButton;
