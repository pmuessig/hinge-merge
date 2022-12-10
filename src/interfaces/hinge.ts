export interface hinge_match{
  chats:chat[];
  match:match[];
  we_met:we_met[];
}

export interface chat {
  body:string;
  timestamp:Date;
  type:string;
}

interface match{
  timestamp:Date;
  type:string;
}

interface we_met{
  timestamp:Date;
  did_meet_subject: string;
  was_my_type:boolean;
  type:string;
}