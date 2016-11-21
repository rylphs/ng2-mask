import { GroupParser } from './group-parser';
/*
1) Mascaras simples, numérico somente, tamanho fixo
	mask: ['999-999']
*/
describe("Test group parsing", function() {
  it("should contains the correct group of tokens", function() {
    let gpParser = new GroupParser("999-999");
    expect((<any>gpParser).firstToken).not.toBe(null);
    expect((<any>gpParser).firstToken).not.toBe(undefined);
    expect((<any>gpParser).firstToken.exp).toEqual(jasmine.any(RegExp));
    expect((<any>gpParser).firstToken.next.exp).toEqual(jasmine.any(RegExp));
    expect((<any>gpParser).firstToken.next.next.next.exp).toEqual(jasmine.any(String));
    expect((<any>gpParser).firstToken.next.next.next.next.exp).toEqual(jasmine.any(RegExp));
  });

  it("should parse correctly", function() {
    let gpParser = new GroupParser("999-999");
    expect(gpParser.parse('9').accept).toBe(true);
    expect(gpParser.parse('9').accept).toBe(true);
    expect(gpParser.parse('9').accept).toBe(true);
    expect(gpParser.parse('-').accept).toBe(true);
    expect(gpParser.parse('A').accept).toBe(false);
  });

  it("should place placeholders correctly", function() {
    let gpParser = new GroupParser("999-999");
    expect(gpParser.parse('9').result).toBe('9');
    expect(gpParser.parse('9').result).toBe('99');
    expect(gpParser.parse('9').result).toBe('999');
    expect(gpParser.parse('-').result).toBe('999');
    expect(gpParser.parse('9').result).toBe('999-9');
  });
});
