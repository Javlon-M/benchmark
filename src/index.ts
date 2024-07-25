#!/usr/bin/env node
import process from "process";
import drawTable from './utils/drawTable'
import Forking from './modules/Forking'
import NormalizeResults from "./modules/NormalizeResults";
import Parser from "./modules/Parser";

(async function(){
    try {
    const parser = new Parser()

    const argms = parser.getArguments(process.argv)

    const forking = new Forking(argms)

    const fork = await forking.getStarted()

    const normalizeResults = new NormalizeResults()

    const finalResults = normalizeResults.iterateResults(fork)

    const drawedTable = drawTable(finalResults)

    console.log(drawedTable);


    } catch (error) {
        console.error(error);
        process.exit(1)
    }
})()