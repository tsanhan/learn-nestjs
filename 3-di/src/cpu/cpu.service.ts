import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    
    constructor(private powerService: PowerService) {
    }

    compute(a: number, b: number) {
        console.log('dropping 10 watts of power from power service');
        this.powerService.supplyPower(10);
        return a + b;
    }
}
