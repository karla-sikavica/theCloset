const ColorPieChart = () => {
  const user = useCurrentUser();
  const userId = user?.id;
  const items = useFetchItems(userId);
  return <div>ColorPieChart</div>;
};

export default ColorPieChart;
