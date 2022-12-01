import {readFile, hex2bin} from '../../utils.js'
import util from 'util'

util.inspect.defaultOptions.depth = null

const inputData = readFile('day16/test.txt')

let row = hex2bin(inputData.pop())
let versionSum = 0

const parsePackets = (row, subPackets = -1) => {
    const packets = []
    let packetsFound = 0
    let initialRowLength = row.length

    while (row.length > 0 && (subPackets === -1 || packetsFound < subPackets)) {
        if (/^0+$/.test(row)) {
            break
        }

        let packet = {}
        packet.version = parseInt(row.substring(0, 3), 2)
        versionSum += packet.version
        packet.type = parseInt(row.substring(3, 6), 2)
        packetsFound++

        row = row.slice(6)
        //  literal value
        if (packet.type === 4) {
            packet.literalValue = ''
            while (row[0] === '1') {
                packet.literalValue += row.substring(1, 5)
                row = row.slice(5)
            }
            packet.literalValue += row.substring(1, 5)
            packet.literalValue = parseInt(packet.literalValue, 2)
            row = row.slice(5)
        } else {
            const lengthType = row[0]
            row = row.slice(1)
            // operator
            if (lengthType === '0') {
                const totalLengthInBits = parseInt(row.substring(0, 15), 2)
                row = row.slice(15)
                packet.subPackets = parsePackets(row.substring(0, totalLengthInBits))
                row = row.slice(totalLengthInBits)
            } else if (lengthType === '1') {
                const packetsCount = parseInt(row.substring(0, 11), 2)
                row = row.slice(11)
                packet.subPackets = parsePackets(row, packetsCount)
                row = row.slice(packet.subPackets.bitsParsed)

                delete packet.subPackets.bitsParsed
            }
        }
        switch (packet.type) {
            case 0:
                packet.literalValue = packet.subPackets.reduce((prev, cur) => cur.literalValue + prev, 0)
                break
            case 1:
                packet.literalValue = packet.subPackets.reduce((prev, cur) => cur.literalValue * prev, 1)
                break
            case 2:
                packet.literalValue = Math.min(...packet.subPackets.map(packet => packet.literalValue))
                break
            case 3:
                packet.literalValue = Math.max(...packet.subPackets.map(packet => packet.literalValue))
                break
            case 5:
                packet.literalValue = packet.subPackets[0].literalValue > packet.subPackets[1].literalValue ? 1 : 0
                break
            case 6:
                packet.literalValue = packet.subPackets[0].literalValue < packet.subPackets[1].literalValue ? 1 : 0
                break
            case 7:
                packet.literalValue = packet.subPackets[0].literalValue === packet.subPackets[1].literalValue ? 1 : 0
                break
        }
        packets.push(packet)
    }
    packets.bitsParsed = initialRowLength - row.length

    return packets
}

const packets = parsePackets(row)

console.log({versionSum, packets})
