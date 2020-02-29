import filterInvalidLines from './filterInvalidLines';

describe('filterInvalidLines', () => {
  it('should return lines with same maximum number of cells filled', () => {
    const csvFile = [
      [
        'Consultar saldos e movimentos � ordem - 12-12-2019\r',
      ], [
        '\r',
      ], [
        'Conta ', '0753018158200 - EUR - Caixajovem \r',
      ], [
        'Data de in�cio ', '01-09-2019\r',
      ], [
        'Data de fim ', '30-11-2019\r',
      ], [
        '\r',
      ], [
        'Data mov. ', 'Data valor ', 'Descri��o ', 'D�bito ', 'Cr�dito ', 'Saldo contabil�stico ', 'Saldo dispon�vel ', 'Categoria ', '\r',
      ], [
        '29-11-2019', '29-11-2019', 'COMPRA CRP VISEU ', '700,00', '', '3.462,03', '3.462,03', 'COMPRAS ', '\r',
      ], [
        '29-11-2019', '29-11-2019', 'COMPRA CRP VISEU ', '811,86', '', '4.162,03', '4.162,03', 'COMPRAS ', '\r',
      ], [
        '27-11-2019', '27-11-2019', 'COMPRA CHURR O CANTIN ', '10,05', '', '4.973,89', '4.973,89', 'COMPRAS ', '\r',
      ], [
        '26-11-2019', '26-11-2019', 'TRANSF CREDITO SEPA ', '0,83', '', '4.983,94', '4.983,94', 'Diversos ', '\r',
      ], [
        '26-11-2019', '26-11-2019', 'Habitacao ', '10.000,00', '', '4.984,77', '4.983,94', 'Diversos ', '\r',
      ], [
        '25-11-2019', '25-11-2019', 'TRF CXDOL ', '', '10.000,00', '14.984,77', '14.984,77', 'Diversos ', '\r',
      ], [
        '25-11-2019', '25-11-2019', 'TRF CXDOL ', '10.000,00', '', '4.984,77', '4.984,77', 'Diversos ', '\r',
      ], [
        '25-11-2019', '25-11-2019', 'Habitacao ', '10.000,00', '', '14.984,77', '14.984,77', 'Diversos ', '\r',
      ], [
        ' ', ' ', ' ', ' ', 'Saldo contabil�stico ', '4.997,09 EUR ', ' ', ' ', '\r',
      ], [
        '',
      ],
    ];

    const actual = filterInvalidLines(csvFile);
    const expected = [[
      'Data mov. ', 'Data valor ', 'Descri��o ', 'D�bito ', 'Cr�dito ', 'Saldo contabil�stico ', 'Saldo dispon�vel ', 'Categoria ', '\r',
    ], [
      '29-11-2019', '29-11-2019', 'COMPRA CRP VISEU ', '700,00', '', '3.462,03', '3.462,03', 'COMPRAS ', '\r',
    ], [
      '29-11-2019', '29-11-2019', 'COMPRA CRP VISEU ', '811,86', '', '4.162,03', '4.162,03', 'COMPRAS ', '\r',
    ], [
      '27-11-2019', '27-11-2019', 'COMPRA CHURR O CANTIN ', '10,05', '', '4.973,89', '4.973,89', 'COMPRAS ', '\r',
    ], [
      '26-11-2019', '26-11-2019', 'TRANSF CREDITO SEPA ', '0,83', '', '4.983,94', '4.983,94', 'Diversos ', '\r',
    ], [
      '26-11-2019', '26-11-2019', 'Habitacao ', '10.000,00', '', '4.984,77', '4.983,94', 'Diversos ', '\r',
    ], [
      '25-11-2019', '25-11-2019', 'TRF CXDOL ', '', '10.000,00', '14.984,77', '14.984,77', 'Diversos ', '\r',
    ], [
      '25-11-2019', '25-11-2019', 'TRF CXDOL ', '10.000,00', '', '4.984,77', '4.984,77', 'Diversos ', '\r',
    ], [
      '25-11-2019', '25-11-2019', 'Habitacao ', '10.000,00', '', '14.984,77', '14.984,77', 'Diversos ', '\r',
    ]];

    expect(actual).toEqual(expected);
  });
});
