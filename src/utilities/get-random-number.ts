function getRandomNumber(min: number, max: number): number {
  const ret = Math.floor(Math.random() * (max - min) + min);
  return ret;
}

export default getRandomNumber;
