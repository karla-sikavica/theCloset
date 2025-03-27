import "./css/GoogleButton.module.css";

interface Props {
  children: any;
  onClick: any;
}

const GoogleButton = ({ onClick, children }: Props) => {
  return (
    <button onClick={onClick} className={`google-button`}>
      {children}
    </button>
  );
};

export default GoogleButton;
