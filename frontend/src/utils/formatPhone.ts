export function formatPhone(phone: string): string {

    const cleaned = phone.replace(/\D/g, "");
  

    if (cleaned.length > 11) {
      
      phone = cleaned.slice(-11); 
    }
  
    
    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (phone.length === 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
  
    return phone; 
  }
  