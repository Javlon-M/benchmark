import IDevisions from '../types/IDevisions'
import averageResults from './avgResults'
import INormalizedResults from "../types/INormalizedResults";

export default function devision(res: INormalizedResults[]): IDevisions {
        const length = res.length
        const avgs = averageResults(res)
        const pows = powMetrics(res, avgs)
        const sqrt = sqrtMetrics(length, pows)
        
        return sqrt
}

function powMetrics(res, avgs){
    return res.reduce((total, initial)=>{
        total.powTime += Math.pow(initial.time - avgs.time, 2)
        total.powCpu += Math.pow(initial.cpu - avgs.cpu, 2)
        total.powMemory += Math.pow(initial.memory - avgs.memory, 2)

        return total
    }, {powTime: 0, powCpu: 0, powMemory: 0})
}

function sqrtMetrics(length: number, pows): IDevisions{
    const std: IDevisions = {devTime: 0, devCpu: 0, devMemory: 0}

    std.devTime = Math.sqrt(pows.powTime / length)
    std.devCpu = Math.sqrt(pows.powCpu / length)
    std.devMemory = Math.sqrt(pows.powMemory / length)

    return std
}