import StatOrderDto from './StatOrderDto';

class StatDto {
    public time: number;
    public payload: StatOrderDto[] | null;

    constructor(time: number = 1, payload: StatOrderDto[] | null = null) {
        this.time = time;
        this.payload = payload;
    }
}

export default StatDto;
