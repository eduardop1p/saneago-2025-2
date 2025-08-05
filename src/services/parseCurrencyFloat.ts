/* eslint-disable no-useless-escape */
export default function parseCurrencyFloat(value: string) {
  // Remove o símbolo de moeda (R$) e os espaços
  const valueNoSymbol = value.replace('R$', '').trim();
  // Remove os pontos (separadores de milhar)
  const valueNoPoints = valueNoSymbol.replace(/\,/g, '');
  // const valueNoPoints = valueNoSymbol.replace(/\./g, '');

  // Substitui a vírgula por ponto (separador decimal)
  // const valueWithPoint = valueNoPoints.replace(',', '.');

  // Converte a string para um número flutuante
  // const valueFloat = parseFloat(valueWithPoint);
  const valueFloat = parseFloat(valueNoPoints);

  return valueFloat ? valueFloat : 0;
}
