export const getTimeSinceCreation = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));
    return `${diffInDays} days ago`;
  };