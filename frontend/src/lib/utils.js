// Versão simplificada sem dependências externas
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}