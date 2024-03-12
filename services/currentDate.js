const setCurrentDate = () => {
  const currendDate = new Date().toISOString().split("T")[0];
  return currendDate;
};
export default setCurrentDate;
