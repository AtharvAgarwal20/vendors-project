export const filterServerActionFormData = (data: FormData) => {
  let formData = Array.from(data);
  let filteredData = formData.filter((item) => {
    return !item[0].startsWith("$");
  });
  return Object.fromEntries(filteredData);
};
