export default function validateArgs(keys){
    if(!keys.includes('i')){
        throw new Error('Please give i = iterations count')
    }
    if(!keys.includes('r')){
        throw new Error('Please give r = runs count')
    }
    if(!keys.includes('p')){
        throw new Error('Please give p = path test file')
    }

    return true
}
