import Table from 'cli-table'

export default function tableDrawer(results): string{
    const head = ['pid', 'variant_name', 'time', 'avgTime', 'stdTime' , 'cpu', 'avgCpu', 'stdCpu', 'ram', 'avgRam', 'stdRam']
    const table = new Table({head})
    
    results.forEach(result =>{
        const {time, cpu, memory, variantName, avgTime, avgCpu, avgMemory, pid,  devTime,  devCpu,  devMemory} = result
        table.push(
            [
                pid,
                variantName,
                `${time.toFixed(3)} ms`,
                `${avgTime.toFixed(3)} ms`,
                `${devTime.toFixed(3)}`,
                `${cpu.toFixed(3)} ms`,
                `${avgCpu.toFixed(3)} ms`,
                `${devCpu.toFixed(3)}`,
                `${memory.toFixed(3)} mb`,
                `${avgMemory.toFixed(3)} mb`,
                `${devMemory.toFixed(3)}`,
            ]
        )
    })

    return table.toString()
}