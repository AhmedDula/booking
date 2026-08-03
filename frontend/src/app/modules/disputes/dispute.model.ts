export interface Dispute {
  _id: string;
  booking: string;
  user: string;
  reason: string;
  description: string;
  evidence: string[];
  status: "pending" | "resolved" | "rejected";
  resolutionNotes: string;
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}