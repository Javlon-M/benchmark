import Args from "../types/IArguments";
import IMetric from "../types/IMetrics"

class Metric {
   private args: Args;

   constructor(args: Args){
      this.args = args
   }

   private setInitialMetrics(): IMetric{
      const time = Number(process.hrtime.bigint())
      const memory = process.memoryUsage().heapUsed 
      const cpu = process.cpuUsage().user

     return {
         time, 
         memory, 
         cpu
      }
   }
  
   private setFinalMetrics(): IMetric{
      const time = Number(process.hrtime.bigint())
      const memory = process.memoryUsage().heapUsed
      const cpu = process.cpuUsage().user

      return {
         time, 
         memory, 
         cpu
      }
   }
  
   private getDifferenceMetrics(initialMetrics: IMetric, finalMetrics: IMetric): IMetric{
    const time = Math.abs(finalMetrics.time - initialMetrics.time) / 10**6
    const memory = (Math.abs(finalMetrics.memory - initialMetrics.memory) / 1024) / 1024
    const cpu = (Math.abs(finalMetrics.cpu - initialMetrics.cpu) / 1024) / 1024

    return {time, cpu, memory}
   }

   public run(test: Function): IMetric[]{
      const results: IMetric[] = []
      for(let i = 1; i <= this.args.runs; i++){
         const resInteration: IMetric = this.iterateTestFunc(test)
         results.push(resInteration)
      }

      return results
   }

   private iterateTestFunc(test: Function): IMetric{
      const initialMetrics:IMetric = this.setInitialMetrics()

      for(let i = 1; i <= this.args.iterations; i++){
            test()
      }

      const finalMetrics:IMetric = this.setFinalMetrics()

      return this.getDifferenceMetrics(initialMetrics, finalMetrics)
   }

}

export default Metric