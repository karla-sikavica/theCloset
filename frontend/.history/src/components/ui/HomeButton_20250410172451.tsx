interface Props {
  children: React.ReactNode;
}

function HomeButton({ childern }: Props) {
  return <button>{childern}</button>;
}

export default HomeButton;
