export const parseFilters = (input: string) => {
  const filters: any = {};

  const regex = /(\w+)([:<>]=?)([\w.-]+)/g;
  let match;
  while ((match = regex.exec(input)) !== null) {
    const [_, key, operator, value] = match;
    switch (key.toLowerCase()) {
      case "category":
        filters.category = value;
        break;
      case "title":
        filters.title = value;
        break;
      case "date":
        filters.startDate = value;
        filters.endDate = value;
        break;
      case "amount":
        if (operator === ">" || operator === ">=") filters.minAmount = Number(value);
        else if (operator === "<" || operator === "<=") filters.maxAmount = Number(value);
        else filters.minAmount = Number(value);
        break;
      default:
        break;
    }
  }

  if (Object.keys(filters).length === 0 && input.trim()) {
    if (!isNaN(Number(input))) {
      filters.minAmount = Number(input);
    } else if (/\d{4}-\d{2}-\d{2}/.test(input)) {
      filters.startDate = input;
      filters.endDate = input;
    } else {
      filters.search = input;
    }
  }

  return filters;
};
