// import { promises } from "fs";
const promises = require("fs/promises");
// import * as path from "path";
const path = require("path");

// type Arr = { year: number, mount: string, day: string }[]

const testPath = path.resolve('test.json')
promises.readFile(testPath)
    .then(file => JSON.parse(file.toString()))
    // .then((arr: Arr) => arr)
    .then(arr => arr.map(d => {
        const newDate = new Date()
        newDate.setMonth(
            parseInt(d.mount),
            parseInt(d.day),
        )
        return newDate
    }))
    .then(ds => {
        // const dates: { reg: Date, act: Date, }[] = []
        const dates = []
        const evens = ds.filter((_, i) => !(i % 2))
        const odds = ds.filter((_, i) => !!(i % 2))
        const maxI = Math.min(evens.length, odds.length,)

        for (let i = 0; i < maxI; i++) {
            if (evens[i].getTime() < odds[i].getTime()) {
                dates.push({
                    reg: evens[i],
                    act: odds[i],
                })
            } else {
                dates.push({
                    reg: odds[i],
                    act: evens[i],
                })
            }
        }
        return dates
    })
    .then(dates => dates.map(date => ({
        reg: date.reg.getTime(),
        act: date.act.getTime(),
    })))
    .then(dates => {
        const json = JSON.stringify(dates, undefined, 4)
        return promises.writeFile(path.resolve('dates.json'), json)
    })
    .catch(e => console.error(e))

