const input1: string[][] = [
    ['>', '-', '-', '-', 'A', '-', '-', '-', '+'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['s', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
    [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
    [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+']
];
const input2: string[][] = [
    ['>', '-', '-', '-', 'A', '-', '@', '-', '+'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['+', '-', 'U', '-', '+', ' ', ' ', ' ', 'C'],
    ['|', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
    ['s', ' ', ' ', ' ', 'C', '-', '-', '-', '+']
];

// O(n) solution

function isLetterOrPlus(character: string): boolean {
    return /^[a-zA-Z+]$/.test(character);
}
function findPath(arr: string[][]): { path: string, letters: string } {
    const numRows = arr.length;
    const numCols = arr[0].length;

    let path = '';
    let letters = '';

    let currentRow = 0;
    let currentCol = 0;
    let currentDirection: string | null = null; 

    // find the starting point
    // treat the matrix as a 1D array
    for (let i = 0; i < numRows * numCols; i++) {
        const row = Math.floor(i / numCols);
        const col = i % numCols;
        if (arr[row][col] === '>') {
            currentRow = row;
            currentCol = col;
            currentDirection = 'right';
            break;
        }
    }

    while (true) {
        const currentChar = arr[currentRow][currentCol];
        let leftNeighbor = arr[currentRow][currentCol-1] ?? ' ';
        let rightNeighbor = arr[currentRow][currentCol+1] ?? ' ';
        let topNeighbor = arr[currentRow-1]?.[currentCol] ?? ' ';
        let bottomNeighbor = arr[currentRow+1]?.[currentCol] ?? ' ';

        // stop the loop when we reach s
        if(currentChar === 's') {
            path += 's';
            break;
        }
        if(currentChar.match(/[A-Z]/))
            letters += currentChar;

        // in the provided example char '>' is replaced by '@' in the output
        if(currentChar == '>')
            path += '@';
        else if(currentChar != ' ')
            path += currentChar;
        
        let possibleTurn = isLetterOrPlus(currentChar)
        let definiteTurn = possibleTurn && (!(topNeighbor == ' ' && bottomNeighbor == ' ')
                                         || !(leftNeighbor == ' ' && rightNeighbor == ' '))

        if (definiteTurn) {
            // change direction upon a turn
            if(currentDirection == 'right' || currentDirection == 'left'){
                if(topNeighbor != ' ')
                    currentDirection = 'up'
                if(bottomNeighbor != ' ')
                    currentDirection = 'down'
            } 
            else if(currentDirection == 'up' || currentDirection == 'down'){
                if(leftNeighbor != ' ')
                    currentDirection = 'left'
                if(rightNeighbor != ' ')
                    currentDirection = 'right'
            }

        }
        if(currentDirection == 'right')
            currentCol = currentCol + 1
        if(currentDirection == 'down')
            currentRow = currentRow + 1
        if(currentDirection == 'left')
            currentCol = currentCol - 1
        if(currentDirection == 'up')
            currentRow = currentRow - 1
    }
    return {path, letters}
}

let { path, letters } = findPath(input2);
console.log(path);
console.log(letters);
