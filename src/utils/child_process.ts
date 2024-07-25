import Metric from '../modules/BenchMetrics';
import importTests from "./importTests";
import IFork from '../types/IFork';
import IMessage from '../types/IMessage';
import IMetric from '../types/IMetrics';

class Child{
    public run(): void{
        process.on('message', async (message: IMessage) => {
            if(message.type === 'success'){
                try {
                    const result = await this.testing(message)
        
                    message.data.result = result
                    message.type = 'end'
                    process.send(message)
        
               } catch (error) {
                    message.type = 'error'
                    process.send(message) 
                }
            }
        })

        process.send({type: 'onReceive', data: {argms: {}, result: {}}})
    }

    private async testing(message): Promise<IFork>{
        const {argms} = message.data
        const tests = await importTests(argms.path)
        const metric = new Metric(argms)
        const results: IMetric[] = metric.run(tests[argms.key])
        const forked: IFork = {results, pid: process.pid}
            
        return forked
    }
}

const child = new Child()
child.run()