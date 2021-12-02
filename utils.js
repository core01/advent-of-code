import fs from 'fs';

export const readFile = () => {
    return fs.readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean);
}

