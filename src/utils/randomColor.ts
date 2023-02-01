export default () => {
  const colors = [
    10181046, 1752220, 3447003, 15548997, 12370112, 3426654, 16777215, 5793266,
    2303786, 2895667, 15418782, 15548997, 6323595, 5533306, 3553599,
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
