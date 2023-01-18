import { IActivity } from './activity';

export interface ITrx {
  TrxId: string;
  Type: string;
  GroupId: string;
  Data: string;
  TimeStamp: string;
  Version: string;
  Expired: string;
  ResendCount: string;
  Nonce: string;
  SenderPubkey: string;
  SenderSign: string;
  StorageType: string;
}

export interface ICreateActivityPayload {
  groupId: string;
  data: IActivity;
  version?: string;
  timestamp?: number
  aesKey?: string;
  agePublicKeys?: string[];
  privateKey?: string;
  publicKey?: string
  sign?: (hash: string) => string | Promise<string>
}
