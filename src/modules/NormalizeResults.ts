import INormalizedResults from "../types/INormalizedResults"
import averageResults from "../utils/avgResults"
import getDevision from "../utils/getDevision"
import IResults from "../types/IResults";

class NormalizeResults{
    
    public iterateResults(fork: IResults): INormalizedResults{
        const {testResults, keys, pids} = fork
        const normalized = []
        
        for(let i = 0; i<= testResults.length - 1; i++){
          const normalizedResults: INormalizedResults = this.getNormalizedResults(testResults[i], keys[i], pids[i])
          normalized.push(normalizedResults)
        }

        return this.addAvgAndDevToResults(normalized)
    }

    private addAvgAndDevToResults(res): INormalizedResults{
        const {cpu, memory, time} = averageResults(res)
        const {devTime, devCpu, devMemory} = getDevision(res)

        return res.map(result => {
           result.avgTime = time
           result.avgCpu = cpu
           result.avgMemory = memory
           result.devTime = devTime
           result.devCpu = devCpu
           result.devMemory  = devMemory
           return result
        })
    }

    private getNormalizedResults(runResults, variantName, pid): INormalizedResults{
        const {time, cpu, memory} = averageResults(runResults)

        return {
            time,
            cpu,
            memory,
            variantName,
            pid,
            avgTime: 0,
            avgCpu: 0,
            avgMemory: 0
        }
    }
}

export default NormalizeResults;