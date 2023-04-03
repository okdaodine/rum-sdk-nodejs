import { IActivity } from '../../chain/types/activity';

export interface ISignTrxPayload {
  groupId: string;
  data: IActivity;
  trxId?: string;
  version?: string;
  aesKey: string;
  agePublicKeys?: string[];
  privateKey?: string;
  publicKey?: string;
  sign?: (hash: string) => string | Promise<string>
}

export interface ISignedTrx {
  trx_id: string;
  group_id: string;
  data: string;
  timestamp: string;
  version: string;
  sender_pubkey: string;
  sender_sign: string;
}