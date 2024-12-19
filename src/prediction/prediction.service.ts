import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PredictionDocument } from './prediction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // Gestion des observables pour l'appel HTTP
import { AxiosResponse } from 'axios';

@Injectable()
export class PredictionService {
  private readonly fastApiUrl = 'http://127.0.0.1:8000/predict'; // URL de FastAPI

  constructor(
    private readonly httpService: HttpService,
    @InjectModel('Prediction') private predictionModel: Model<PredictionDocument>,
  ) {}

  // Envoyer les données à FastAPI et sauvegarder la réponse dans MongoDB
  async makePrediction(data: any): Promise<PredictionDocument> {
    try {
      // Étape 1 : Formatage des données pour correspondre aux clés attendues par FastAPI
      const formattedData = {
        Age: data.age,
        SystolicBP: data.systolicBP,
        DiastolicBP: data.diastolicBP,
        BS: data.bs,
        BodyTemp: data.bodyTemp,
        HeartRate: data.heartRate,
      };
      console.log('Données formatées pour FastAPI :', formattedData);

      // Étape 2 : Appel à l'API FastAPI
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(this.fastApiUrl, formattedData),
      );

      console.log('Réponse de FastAPI :', response.data);
      const riskLevel = response.data.RiskLevel;

      // Étape 3 : Sauvegarde dans MongoDB
      const prediction = new this.predictionModel({
        ...data, // Inclut les données d'entrée
        riskLevel, // Ajout de la prédiction reçue
        createdAt: new Date(),
      });

      const savedPrediction = await prediction.save();
      console.log('Prédiction sauvegardée dans MongoDB :', savedPrediction);

      return savedPrediction;
    } catch (error) {
      console.error('Erreur lors de la prédiction :', error.response?.data || error.message);

      // Gestion des erreurs pour une meilleure lisibilité
      throw new HttpException(
        `Erreur lors de la prédiction : ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
