

export interface AdviseHint {
    px: string;
    pxValue: number;
    replaceText: string;
}


export default class Process {
    constructor(private config: any) {}
    private regPx: RegExp = /([-]?[\d.]+)p(x)?/;
    private regPxAll: RegExp = /([-]?[\d.]+)px/g;

    convert(text: string): Array<AdviseHint> {
        let match = text.match(this.regPx);
        if(!match) { return []; }
        let ret = [];
        ret.push(this.px2vw(match[1]));
        ret.push(this.px2vh(match[1]));
        ret.push(this.px2rem(match[1]));
        ret = ret.concat(this.px2custom(match[1]));
        return ret;
    }

    convertAll(text: string): string {
        if(!text) { return text; }
        return text.replace(this.regPxAll, (word: string) => {
            const res = this.px2vw(word);
            if(res) { return res.replaceText; }
            return word;
        });
    }

    private px2vw(text: string) {
        const pxValue = parseFloat(text);
        let vw: string = +(pxValue / this.config.width * 100).toFixed(this.config.toFixedNum) + 'vw';
        return {
            px: text,
            pxValue: pxValue,
            replaceText: vw
        };
    }

    private px2vh(text: string) {
        const pxValue = parseFloat(text);
        let vh: string = +(pxValue / this.config.height * 100).toFixed(this.config.toFixedNum) + 'vh';
        return {
            px: text,
            pxValue: pxValue,
            replaceText: vh
        };
    }

    private px2rem(text: string) {
        const pxValue = parseFloat(text);
        let vh: string = +(pxValue * 10 / this.config.width).toFixed(this.config.toFixedNum) + 'rem';
        return {
            px: text,
            pxValue: pxValue,
            replaceText: vh
        };
    }

    private px2custom(text: string) {
        const pxValue = parseFloat(text);
        let [rate, unit] = this.config.customXX.split('%');
        rate = parseFloat(rate);
        unit = unit || '';
        if(isNaN(rate)) { return []; }
        let vh: string = +(pxValue * rate).toFixed(this.config.toFixedNum) + unit;
        return [{
            px: text,
            pxValue: pxValue,
            replaceText: vh
        }];
    }
}