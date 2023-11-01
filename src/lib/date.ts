const differenceInDays = (date1: Date, date2: Date) => {
  return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
};

export {differenceInDays};
