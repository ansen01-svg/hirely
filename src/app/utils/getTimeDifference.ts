// calculate when job was posted
export function getTimeDifference(dateString: string): string {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = currentDate.getTime() - targetDate.getTime();

  // Convert the difference to hours
  const hoursDifference = differenceInMs / (1000 * 60 * 60);

  if (hoursDifference < 24) {
    // If the difference is less than 24 hours, return it in hours
    if (hoursDifference === 1) {
      return `${Math.floor(hoursDifference)} hour ago`;
    } else {
      return `${Math.floor(hoursDifference)} hours ago`;
    }
  } else if (hoursDifference === 24) {
    const daysDifference = hoursDifference / 24;
    return `${Math.floor(daysDifference)} day ago`;
  } else {
    // If the difference is 24 hours or more, return it in days
    const daysDifference = hoursDifference / 24;
    return `${Math.floor(daysDifference)} days ago`;
  }
}
