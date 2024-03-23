import { useState, useEffect } from "react";

const useDateDiffInDays = (date1: string): number | null => {
  const [diffInDays, setDiffInDays] = useState<number | null>(null);

  useEffect(() => {
    const calculateDateDiffInDays = () => {
      const dt1 = new Date(date1);
      const dt2 = new Date();
      const diffInMilliseconds = Math.abs(dt2.getTime() - dt1.getTime());
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      return diffInDays;
    };

    setDiffInDays(calculateDateDiffInDays());
  }, [date1]);

  return diffInDays;
};

export default useDateDiffInDays;
