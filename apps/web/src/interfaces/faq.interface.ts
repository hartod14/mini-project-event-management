export interface ICreateFaqInterface {
  is_active: string;
  question: string;
  answer: string;
}
export interface IFaqInterface {
  id: number;
  question: string
  answer: string
  is_active: string
  created_at: string
  updated_at: string
}
