const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(',', '');
};

export default formatDate;

