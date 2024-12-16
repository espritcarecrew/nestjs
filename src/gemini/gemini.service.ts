import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly apiKey = 'AIzaSyBKs8Yrr1IVA2mPRuvr042cG4_09dyhssg';
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(private readonly httpService: HttpService) {}

  async generateContent(data: any): Promise<any> {
    this.logger.log('Received data for API call:', data);

    // Update the payload to match the expected format
    const requestData = {
      contents: [
        {
          parts: [
            {
              text: data.prompt, // Add the user prompt here
            },
          ],
        },
      ],
    };

    try {
      this.logger.log('Payload Sent to API:', JSON.stringify(requestData, null, 2));

      const response = await firstValueFrom(
        this.httpService.post(`${this.apiUrl}?key=${this.apiKey}`, requestData),
      );

      this.logger.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      this.logger.error('API Error:', JSON.stringify(error.response?.data || error.message, null, 2));
      throw new HttpException(
        error.response?.data || 'Failed to generate content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
