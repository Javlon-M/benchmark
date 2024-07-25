import IArguments from "./IArguments"
import IFork from "./IFork"

export default interface IMessage{
    type: string,
    data: {
        argms: IArguments,
        result: IFork
    }
}