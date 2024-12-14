

export const getRealTimeDateFormat = (item) => {
    const now = new Date();
    const publishDate = new Date(item.publish);
    const differenceInMilliseconds = now - publishDate;
  
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximate number of months
  
    if (seconds < 60) {
      return "Just now";
    } else if (minutes === 1) {
      return "1 min ago";
    } else if (minutes < 60) {
      return `${minutes} mins ago`;
    } else if (hours === 1) {
      return "1 hour ago";
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days === 1) {
      return "Yesterday";
    } else if (days <= 6) {
      return `${days} days ago`;
    } else if (weeks === 1) {
      return "1 week ago";
    } else if (weeks <= 2) {
      return `${weeks} weeks ago`;
    } else if (months === 1) {
      return "1 month ago";
    } else if (months <= 2) {
      return `${months} months ago`;
    } else { 
      const formattedDate = publishDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric' 
      });
      return formattedDate; 
    }
};