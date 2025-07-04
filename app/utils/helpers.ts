export const filterServerActionFormData = (data: FormData) => {
  const formData = Array.from(data);
  const filteredData = formData.filter((item) => {
    return !item[0].startsWith("$");
  });
  return Object.fromEntries(filteredData);
};
