import {readFile} from '../../utils.js'

const inputData = readFile('test.txt')

const root = {
    name: '/',
    children: [],
    size: 0,
}
inputData.shift()


let ls = false
let current = root
const folders = new Set()
for (const line of inputData) {
    if (line === '$ ls') {
        ls = true
        continue
    }
    if (line.startsWith('$ cd')) {
        ls = false
        let [, newPath] = line.split('$ cd ')
        if (newPath === '..') {
            current = current.parent
        } else {
            current = current.children.find(child => child.name === newPath)
            folders.add(current)
        }
    }
    if (ls === true) {
        const [typeOrSize, name] = line.split(' ')
        if (typeOrSize === 'dir') {
            current.children.push({
                name,
                children: [],
                parent: current,
                size: 0,
            })
        } else {
            current.size += +typeOrSize
            let parent = current.parent
            while (parent) {
                parent.size += +typeOrSize
                parent = parent.parent
            }
            current.children.push({
                name: name,
                size: +typeOrSize,
                parent: current,
            })
        }
    }
}

let result = 0
folders.forEach(value => {
    if (value.size <= 100000) {
        result += value.size
    }
})

console.log('First:', result)

const TOTAL_SPACE = 70000000
const TOTAL_SPACE_TO_FREE = 30000000

const unusedSpace = TOTAL_SPACE - root.size


let folderToDeleteSize = TOTAL_SPACE

folders.forEach(value => {
    if (unusedSpace + value.size >= TOTAL_SPACE_TO_FREE) {
        if (folderToDeleteSize > value.size) {
            folderToDeleteSize = value.size
        }
    }
})


console.log('Second:', folderToDeleteSize)
