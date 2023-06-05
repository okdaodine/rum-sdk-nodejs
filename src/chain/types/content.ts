import { IActivity } from './activity';

export interface IEncryptedContent {
  Data: string
  Expired: number
  GroupId: string
  SenderPubkey: string
  SenderSign: string
  TimeStamp: string
  TrxId: string
  Version: string
}

export interface IDecryptedContent {
  Data: IActivity
  Expired: number
  GroupId: string
  SenderPubkey: string
  SenderSign: string
  TimeStamp: string
  TrxId: string
  Version: string
}

export interface IListContentsOptions {
  groupId: string;
  count?: number;
  startTrx?: string
  reverse?: boolean
}
