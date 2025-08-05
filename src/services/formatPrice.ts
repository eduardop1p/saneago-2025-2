export default function formatPrice(value: number) {
  value = +value.toString().replaceAll('-', '');
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
