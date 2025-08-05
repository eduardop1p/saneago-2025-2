export default function formateDateAAAAMM(str: string) {
  const ano = str.slice(0, 4);
  const mes = str.slice(4, 6);
  return `${mes}/${ano}`;
}
