#! /usr/bin/env node

function iterationFor(){
    for(let i = 0; i <= 100; i++){
        const obj = Object.create({name: 'TOm'})
    }
}

function errorThrower(){
    throw new Error('asd')
}

function createArray(){
    const newArray = new Array(20)
}

module.exports = {
    iterationFor,
    errorThrower,
    createArray
}