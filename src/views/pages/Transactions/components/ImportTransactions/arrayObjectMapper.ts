export default (data: string[][], headersMapper: object[]): object[] => {
  const lines = data;

  const result = [];

  let headers: string[] = lines[0];

  if (headers) {
    headers = headers.map((header: any) => {
      const mappedHeader: any = headersMapper.find((h: any) => h.label === header);
      return mappedHeader ? mappedHeader.key : header;
    });
  }

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i];

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = typeof currentline[j] === 'string' ? currentline[j].replace(/"/g, '') : currentline[j];
    }

    result.push(obj);
  }

  return result;
};
