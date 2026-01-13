/**
 * Calculates daily points based on the day of the season
 * 
 * Rules:
 * - Day 1 of season: 2 points
 * - Day 2 of season: 3 points
 * - Day 3+: 100% of day before previous + 60% of previous day
 */

export function getSeasonStartDate(date: Date): Date {
  const month = date.getMonth(); // 0-11
  const year = date.getFullYear();
  
  // Spring: March 1 (month 2)
  // Summer: June 1 (month 5)
  // Autumn: September 1 (month 8)
  // Winter: December 1 (month 11)
  
  if (month >= 2 && month < 5) {
    // Spring: March 1
    return new Date(year, 2, 1);
  } else if (month >= 5 && month < 8) {
    // Summer: June 1
    return new Date(year, 5, 1);
  } else if (month >= 8 && month < 11) {
    // Autumn: September 1
    return new Date(year, 8, 1);
  } else {
    // Winter: December 1 (or previous year if in Jan/Feb)
    if (month < 2) {
      return new Date(year - 1, 11, 1);
    } else {
      return new Date(year, 11, 1);
    }
  }
}

export function getDayOfSeason(date: Date): number {
  const seasonStart = getSeasonStartDate(date);
  const diffTime = date.getTime() - seasonStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Day 1 is the first day
}

export function calculateDailyPoints(date: Date): number {
  const dayOfSeason = getDayOfSeason(date);
  
  if (dayOfSeason === 1) {
    return 2;
  } else if (dayOfSeason === 2) {
    return 3;
  } else {
    // Day 3+: 100% of day before previous + 60% of previous day
    // We need to calculate points for previous days
    const points: number[] = [2, 3]; // Day 1 and Day 2
    
    for (let day = 3; day <= dayOfSeason; day++) {
      const dayBeforePrevious = points[day - 3]; // day - 2 index
      const previousDay = points[day - 2]; // day - 1 index
      const newPoints = dayBeforePrevious + (previousDay * 0.6);
      points.push(Math.round(newPoints));
    }
    
    return points[dayOfSeason - 1];
  }
}

export function formatPoints(points: number): string {
  if (points >= 1000) {
    const kPoints = Math.round(points / 1000);
    return `${kPoints}K`;
  }
  return points.toString();
}
