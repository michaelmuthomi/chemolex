export default function formatDate(providedDate: any) {
    const date = new Date(providedDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate
}