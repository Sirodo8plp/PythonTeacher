export interface ISection {
  id: number;
  chapterID: number;
  title?: string | null;
  text: string | null;
  command?: string | null;
  example?: any;
}
