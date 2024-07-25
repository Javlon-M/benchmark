import IMetric from "./IMetrics"

export default interface IFork{
    results: IMetric[],
    pid: number,
}