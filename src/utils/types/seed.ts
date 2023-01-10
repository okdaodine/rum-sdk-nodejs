export interface ISeed {
  genesis_block: {
    BlockId: string;
    GroupId: string;
    PrevBlockId: string;
    PreviousHash: null,
    TimeStamp: number,
    ProducerPubKey: string;
    Trxs: null,
    Signature: string;
  },
  group_name: string;
  consensus_type: string;
  encryption_type: string;
  cipher_key: string;
  group_id: string;
  owner_pubkey: string;
  signature: string;
  app_key: string;
  urls: string[]
}