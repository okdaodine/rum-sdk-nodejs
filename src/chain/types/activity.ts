export interface IObject {
  type: string
  content?: string
  summary?: string
  id?: string
  name?: string
  image?: IObject | IObject[]
  inreplyto?: IObject
  attributedTo?: IObject | IObject[]
  mediaType?: string
  describes?: IObject
  published?: string
  startTime?: string
  endTime?: string
  updated?: string
  tag?: IObject
  to?: IObject
  bto?: IObject
  cc?: IObject
  bcc?: IObject
  duration?: string
}

export interface IActivity extends IObject {
  actor?: IObject;
  object?: IObject | IActivity;
  target?: IObject | IActivity;
  result?: IObject;
  origin?: IObject;
}
