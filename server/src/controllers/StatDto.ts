import StatProductDto from './StatProductDto';

class StatDto {
    public time: number;
    public payload: StatProductDto[] | null;

    constructor(time: number = 1, payload: StatProductDto[] | null = null) {
        this.time = time;
        this.payload = payload;
    }
}

export default StatDto;
