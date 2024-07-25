import IArguments from "../types/IArguments";
import IParser from "../types/IParser";
import validateArgs from "../utils/validateArgs";

export default class Parser implements IParser{
    public getArguments(argv: string[]): IArguments {
        const argmsArr: string[] = argv.splice(2)
        const argms = {} as IArguments
        const keys = []

        argmsArr.forEach((arg)=>{
            const [key, val] = arg.split('=')

            keys.push(key)
            
            switch(key){
                case 'p':
                    argms.path = this.getPath(val);
                    break
    
                case 'r':
                    argms.runs = this.getRuns(val)
                    break
    
                case 'i':
                    argms.iterations = this.getIterations(val)
                    break
                    
                default: 
                    console.error('Argv error')
            }
        })

        if(validateArgs(keys)){
            return argms
        }
    };

    private getPath(val: string): string {
        return val
    }

    private getIterations(val: string): number{
        return parseInt(val, 10)
    }

    private getRuns(val: string): number{
        return parseInt(val, 10)
    }
}