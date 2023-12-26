import { CustomInterviewQuestion } from '../entities/question.entity';
import {
  CompletSaveQuestion,
  SaveQuestionInfo,
} from '../interface/question.interface';

export interface CustomInterviewQuestionRepository {
  saveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
  ): Promise<CompletSaveQuestion>;
}
