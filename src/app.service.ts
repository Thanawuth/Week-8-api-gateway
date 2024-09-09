import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sum1(numbers: number[]) {
    try {
      const response = await axios.post('http://localhost:3001/math/sum', {
        numbers,
      });
      return response.data;
    } catch (error) {
      console.log('Error calling the micro service', error);
      throw error;
    }
  }

  sum2(numbers: number[]) {
    const patterns = { cmd: 'sum' };

    return this.client.send<number>(patterns, numbers);
  }
}
