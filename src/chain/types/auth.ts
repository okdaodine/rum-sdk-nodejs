export interface IAnnounceOptions {
  groupId: string
  privateKey: string
  encryptPubKey: string
  type?: AnnounceType
  action?: ActionType
}

export interface IAnnounceResult {
  group_id: string
  sign_pubkey: string
  encrypt_pubkey: string
  type: string
  action: string
  sign: string
  trx_id: string
}

export enum AnnounceType {
  AS_USER = 0,
  AS_PRODUCER = 1,
  AS_USER_ENCRYPT = 2,
}

export enum ApproveType {
  ANNOUNCED = 0,
  APPROVED = 1,
  REJECTED = 2,
}

export enum ActionType {
  ADD = 0,
  REMOVE = 1,
}