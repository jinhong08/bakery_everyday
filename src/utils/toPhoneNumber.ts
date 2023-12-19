export const toPhoneNumber = (phone: string = ''): string => {
  if (phone.length < 10) return '';

  return `${phone.slice(0, phone.length - 8)}-${phone.slice(
    phone.length - 8,
    phone.length - 4
  )}-${phone.slice(phone.length - 4, phone.length)}`;
};
