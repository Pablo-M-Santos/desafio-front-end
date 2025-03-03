export function formatPhone(phone: string): string {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, "");

  // Se o número não começar com "55", retorna o telefone original
  if (!cleaned.startsWith("55")) {
    return phone;
  }
  // Remove o código do país
  const phoneWithoutCountry = cleaned.slice(2);

  // Formata o telefone 
  if (phoneWithoutCountry.length === 11) {
    return `+55 (${phoneWithoutCountry.slice(0, 2)}) ${phoneWithoutCountry.slice(2, 7)}-${phoneWithoutCountry.slice(7)}`;
  }

  return phone;
}
