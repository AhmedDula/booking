import { DisputeStatus } from "../../core/constants/dispute-status";
export interface Dispute {
  _id: string;
  booking: string;
  user: string;
  reason: string;
  description: string;
  evidence: string[];
  status: DisputeStatus["PENDING"] | DisputeStatus["RESOLVED"] | DisputeStatus["REJECTED"];
  resolutionNotes: string;
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIResponse<T> {
  data: T;
  message: string;
}