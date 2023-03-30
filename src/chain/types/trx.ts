import { IActivity } from './activity';

export interface ITrx {
  TrxId: string;
  GroupId: string;
  Data: string;
  TimeStamp: string;
  Version: string;
  SenderPubkey: string;
  SenderSign: string;
  Expired?: string;
  ResendCount?: string;
  Type?: string;
  StorageType?: string;
}

export interface ICreateActivityPayload {
  groupId: string;
  data: IActivity;
  trxId?: string;
  version?: string;
  timestamp?: number
  aesKey?: string;
  agePublicKeys?: string[];
  privateKey?: string;
  publicKey?: string
  sign?: (hash: string) => string | Promise<string>
}
