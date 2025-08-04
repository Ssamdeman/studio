export interface LegoPart {
  id: string;
  name: string;
  quantity: number;
  imageUrl: string;
  aiHint: string;
}

export interface BuildStep {
  step: number;
  title: string;
  imageUrl: string;
  aiHint: string;
  instructions: string;
  parts: LegoPart[];
}

export interface CodeStep {
  step: number;
  title: string;
  code: string;
  explanation: string;
}
