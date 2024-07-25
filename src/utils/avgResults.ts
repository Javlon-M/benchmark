function sumResults(res){
    const totalResults = res.reduce((total, initial) => {
        total.time += initial.time;
        total.cpu += initial.cpu;
        total.memory += initial.memory;
 
        return total
     },
     {
        time: 0, 
        cpu: 0, 
        memory: 0
    })

    return totalResults
 }

function averageResults(res){
    const {time, cpu, memory} = sumResults(res)
    const length = res.length

    return {
     time: time / length,
     cpu: cpu / length,
     memory: memory / length,
    }
}

export default averageResults