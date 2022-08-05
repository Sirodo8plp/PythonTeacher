import { IExercise } from './IExercise';

export interface IChapter {
  id: number;
  title: string;
  previousChapter: number;
  nextChapter: number;
  exercises: IExercise[];
}
