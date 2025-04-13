interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const HomeButton({ children, onClick }: Props) => {
  return (<button onClick={onClick}>{childern}</button>);
};

export default HomeButton;
