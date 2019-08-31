export default (csv: string, headersMapper: object[]): any => {

  let delimiter = ',';
  const commaCounter = (csv.match(/,/g) || []).length;
  const semiCollonCounter = (csv.match(/;/g) || []).length;

  if (semiCollonCounter > commaCounter) {
    delimiter = ';';
  }


  var lines = csv.split("\n");

  var result = [];

  let headers = lines[0].split(delimiter).map(str => str ? str.replace(/"/g, "") : "");

  if (headers) {
    headers =
      headers.map(header => {
        const mappedHeader: any = headersMapper.find((h: any) => h.label === header);
        return mappedHeader ? mappedHeader.key : header;
      });
  }

  for (var i = 1; i < lines.length; i++) {

    var obj: any = {};
    var currentline = lines[i].split(delimiter);

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] ? currentline[j].replace(/"/g, "") : "";
    }

    result.push(obj);

  }

  //return result; //JavaScript object
  return result; //JSON
}
