class RandomGenerator {
    private characters: string;

    constructor(characters: string) {
        this.characters = characters;
    }

    generate(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * this.characters.length);
            result += this.characters[randomIndex];
        }
        return result;
    }

    randomDate(): Date {
        return new Date(Math.random() * (new Date()).getTime());
    }
}

export default RandomGenerator;
