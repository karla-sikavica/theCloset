import "../css/HomeButton.css";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const HomeButton = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className="homeButton"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};

export default HomeButton;
