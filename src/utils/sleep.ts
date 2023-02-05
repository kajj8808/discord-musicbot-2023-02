export default (waitTime) => {
  new Promise((prev) => setTimeout(prev, waitTime * 1000));
};
