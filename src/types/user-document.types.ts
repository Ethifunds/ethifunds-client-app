export const DocumentTypes = ["id", "proof_of_address"] as const;

export type DocumentType = (typeof DocumentTypes)[number];

export type DocumentStatus = "pending" | "successful" | "failed";

export type UserDocument = {
  id: number;
  user_id: number;
  document_type: DocumentType;
  document_url: string;
  file_name: string;
  id_type: string;
  status: DocumentStatus;
  remark: string | null;
  created_at: string;
  updated_at: string;
};
