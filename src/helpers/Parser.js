
class Parser {
  constructor() {}

  parseJSON(response, callback) {
    const responseParsed = JSON.parse(response);
    if(!!callback) callback(responseParsed);
    return responseParsed;
  }
}


export default Parser;
