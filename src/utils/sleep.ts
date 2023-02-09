/**
 * waite time => 초 마이크로초 x
 */
export default async (waitTime: number) => {
  await new Promise((prev) => setTimeout(prev, waitTime * 1000));
};
