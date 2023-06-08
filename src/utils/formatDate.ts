// Shom time instead of date if the date is of today
const formatDate = (createdAt: string, monthType: "short" | "long") => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const isToday = now.toDateString() === createdAtDate.toDateString();
    const createdAtFormatted = isToday
        ? createdAtDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
          })
        : createdAtDate.toLocaleDateString("en-US", {
              month: monthType,
              day: "numeric",
          });
    return createdAtFormatted;
};
export default formatDate;
