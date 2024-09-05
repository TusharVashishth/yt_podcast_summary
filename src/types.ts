type CoinsType = {
  coins: number;
};

type UserSummaries = {
  id: string;
  url: string;
  response?: string | null;
  title?: string | null;
  created_at: Date;
};

type ChatType = {
  id: string;
  url: string;
  response?: string | null;
  user_id: number;
  created_at: Date;
  title: string;
};

type AddUrlErrorType = {
  url?: string;
  user_id?: string;
};


