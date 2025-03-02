export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (!cleaned.startsWith("55")) {
    return phone;
  }

  const phoneWithoutCountry = cleaned.slice(2);


  if (phoneWithoutCountry.length === 11) {
    return `+55 (${phoneWithoutCountry.slice(0, 2)}) ${phoneWithoutCountry.slice(2, 7)}-${phoneWithoutCountry.slice(7)}`;
  }


  else if (phoneWithoutCountry.length === 10) {
    return `+55 (${phoneWithoutCountry.slice(0, 2)}) ${phoneWithoutCountry.slice(2, 6)}-${phoneWithoutCountry.slice(6)}`;
  }

  return phone;
}
