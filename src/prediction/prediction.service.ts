
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PredictionService {
  private readonly apiUrl = 'http://127.0.0.1:8000/predict'; // URL de votre serveur FastAPI

  async predictHealthRisk(data: any): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, data);
      return response.data;
    } catch (error) {
      console.error('Error making prediction request:', error);
      throw new Error('Failed to make prediction');
    }
  }
}
