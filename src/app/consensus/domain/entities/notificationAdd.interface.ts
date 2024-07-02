export interface NotificationAdd {
    type: string;
    id: number;
    topic_name: string;
    user_id: string;
    group_id: string;
    added_at: Date;
    notification_message: string;
  }

export interface NotificationGroup {
  id: number;
  user_id: string;
  group_id: string;
  notification_type: string;
  message: string;
  created_at: Date;
}