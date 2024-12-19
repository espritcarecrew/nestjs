import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly apiKey = 'AIzaSyBz1o2pDEayG6UnYhhCZA7IT2H3NB-gdHw';
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  constructor(private readonly httpService: HttpService) {}

  async generateContent(data: any): Promise<any> {
    this.logger.log('Received data for API call:', data);

    // Check if the question is pregnancy-related
    if (!this.isPregnancyRelated(data.prompt)) {
      this.logger.warn('Unrelated question detected. Returning fallback response.');
      return {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "cannot answer that question \n",
                },
              ],
              role: "model",
            },
            finishReason: "STOP",
            avgLogprobs: -0.00038474539972164416,
          },
        ],
        usageMetadata: {
          promptTokenCount: 1,
          candidatesTokenCount: 11,
          totalTokenCount: 12,
        },
        modelVersion: "gemini-1.5-flash-latest",
      };
    }

    // Prepare the request payload
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

  /**
   * Determines if the prompt is pregnancy-related.
   * Returns true if it is, false otherwise.
   */
  private isPregnancyRelated(prompt: string): boolean {
    const pregnancyKeywords = [
      'pregnancy',
      'pregnant',
      'baby',
      'childbirth',
      'labor',
      'postpartum',
      'maternity',
      'prenatal',
      'conception',
      'newborn',
    ];

    const lowercasePrompt = prompt.toLowerCase();
    return pregnancyKeywords.some((keyword) => lowercasePrompt.includes(keyword));
  }
}
