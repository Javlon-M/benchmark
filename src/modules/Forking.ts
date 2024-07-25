import IArguments from '../types/IArguments'
import importTests from "../utils/importTests";
import { fork } from 'child_process'
import IResults from '../types/IResults';
import IFork from '../types/IFork'
import IMessage from '../types/IMessage';

export default class Forking{
    private argms: IArguments;
    private allResults: IResults;

    constructor(argms: IArguments){
      this.argms = argms

      this.allResults = {
        testResults: [],
        pids: [],
        keys: [],
      }
    }

    public async getStarted(): Promise<IResults>{
        return await this.getAllResults()
    }

    private async getAllResults(): Promise<IResults>{
        const tests = await importTests(this.argms.path)

        for(let key in tests){
            try {
                const {results, pid}:IFork = await this.forking(key)

                this.allResults.keys.push(key)
                this.allResults.testResults.push(results)
                this.allResults.pids.push(pid)
            } catch (error) {
                console.error(error);
            }
        }

        return this.allResults
    }

    private async forking(key: string): Promise<IFork>{
        const child = fork(__dirname + '/../utils/child_process.js')

        return new Promise((resolve, reject)=>{
            child.on('message', (message: IMessage)=>{
                switch(message.type){
                    case 'onReceive':
                       this.argms.key = key
                       message.data.argms = this.argms
                       message.type = 'success'
                       child.send(message)
                       break

                    case 'error':
                        child.kill('SIGKILL')
                        reject('Handled an error with test function named ' + message.data.argms.key)
                        break

                    case 'end':
                        child.kill('SIGHUP')
                        resolve(message.data.result)
                        break 
                }
            })
        })
    }
}