export interface FeedUser {
  name: string;
  avatar?: string;
}

export interface FeedComment {
  content: string;
  user: FeedUser;
}

export interface FeedPost {
  idPost: number;
  user: FeedUser;
  content: string;
  title?: string;
  triggerWarning?: string;
  date: Date;
  supportNumber: number;
  comments: FeedComment[];
}
