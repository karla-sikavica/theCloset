interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

function HomeButton({ children, onClick }: Props) {
  return <button>{childern}</button>;
}

export default HomeButton;
