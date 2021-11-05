// randomSample.ts

// Function to generate a random number between min and max
function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to shuffle an array
function shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
console.log('Original array:', numbers);

const shuffledNumbers = shuffleArray(numbers);
console.log('Shuffled array:', shuffledNumbers);

const randomNum = getRandomNumber(1, 100);
console.log('Random number between 1 and 100:', randomNum);

