export interface RecommendedTopic {
    id: number;
    topic_name: string;
    group: number | null;
}
  
export interface TopicAddedUser {
    id: number;
    topic: RecommendedTopic;
    group: number;
    user: number;
    added_at: string;
}

