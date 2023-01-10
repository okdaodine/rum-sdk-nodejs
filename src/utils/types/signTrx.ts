import { IActivity } from '../../chain/types/activity';

export interface ISignTrxPayload {
  groupId: string;
  data: IActivity;
  version?: string;
  timestamp?: number
  aesKey: string;
  privateKey?: string;
  publicKey?: string
  sign?: (hash: string) => string | Promise<string>
}