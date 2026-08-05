export interface DisputeResponse {
  success: boolean;
  message: string;
  data: IDispute;
}

export interface IDispute {
  _id: string;
  booking: string;
  user: string;
  reason: string;
  description: string;
  evidence: string[];
  status: DisputeStatus;
  resolutionNotes: string;
  resolvedBy: string | null;
  resolvedAt: string | null;
}

export type DisputeStatus =
  | 'pending'
  | 'under_review'
  | 'resolved'
  | 'rejected';