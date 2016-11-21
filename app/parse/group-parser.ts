import { Placeholders } from './placeholders';

type parseResult = {
    accept: boolean;
    result: string;
}

type Token = {
    exp: string | RegExp;
    next: Token;
}

function isStatic(exp: RegExp | string): exp is string {
    return typeof exp === 'string';
}
/**
 * GroupParser
 */
export class GroupParser {
    private minRepetition: number;
    private maxRepetition: "FOREVER" | number;
    private parsed: string = "";
    private currentToken: Token;
    private firstToken: Token;

    constructor(mask: string) {
        let maskArr = mask.split("");
        let previousToken: Token = null;
        for (let i in maskArr) {
            let tokenStr = maskArr[i];
            let token: Token = {
                exp: Placeholders[tokenStr] ? Placeholders[tokenStr] : tokenStr,
                next: null
            };
            previousToken ? previousToken = (previousToken.next = token) : this.firstToken = (previousToken = token);
        }
        this.currentToken = this.firstToken;
    }

    private nextToken() {

            return this.currentToken.next ? (this.currentToken = this.currentToken.next) : null;
    }

    placeStaticTokens(input: string): string {
         let result: string = "";
         let token: Token = this.firstToken;
         let position: number = 0;
         while (token.next !== this.currentToken){
             if (isStatic(token.exp)) {
                 input = input.substring(0, position) + token.exp + input.substring(position);
             }
             else {
                // result += input.substr(position, token.count);
             }
             token = token.next;
             position++;
         }
        return input;
    }

    parse(input: string): parseResult {
        let accept = false;
        let result: string;
        let token = this.currentToken;
        if (isStatic(token.exp)) {
            if (input === token.exp) {
                accept = true;
                this.nextToken();
            }
            else {
                this.nextToken();
                return this.parse(input);
            }
        }
        else {
            this.parsed += (accept = token.exp.test(input)) ? input : "";
            this.nextToken();
        }

        result = this.placeStaticTokens(this.parsed);
        return {
            accept: accept, result: result
        };
    }
}