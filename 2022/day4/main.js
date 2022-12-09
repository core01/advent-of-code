import {readFile} from '../../utils.js'

const inputData = readFile('test.txt')

let fullyIncluded = 0
let notFullyIncluded = 0
inputData.forEach((pairs) => {
    const [fp, sp] = pairs.split(',')
    let [fpFn, fpSn] = fp.split('-')
    let [spFn, spSn] = sp.split('-')

    fpFn = +fpFn
    fpSn = +fpSn
    spFn = +spFn
    spSn = +spSn

    if (
        (fpFn <= spFn && fpSn >= spSn) ||
        (fpFn >= spFn && fpSn <= spSn) ||
        (spFn <= fpFn && spSn >= fpSn) ||
        (spFn >= fpFn && spSn <= fpSn)
    ) {
        fullyIncluded += 1
    }

    if (
        (fpFn <= spFn && fpSn >= spSn) ||
        (fpFn >= spFn && fpSn <= spSn) ||
        (spFn <= fpFn && spSn >= fpSn) ||
        (spFn >= fpFn && spSn <= fpSn) ||
        (fpFn >= spFn && fpSn >= spFn && fpSn <= spFn) ||
        (fpFn === spSn) || (fpSn === spFn) ||
        (fpFn <= spSn && fpSn >= spFn)
    ) {
        notFullyIncluded++
    }
})

console.log({first: fullyIncluded, second: notFullyIncluded})
