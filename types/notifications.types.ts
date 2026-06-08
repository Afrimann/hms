import { ApiResponse } from "./auth.type";

export type Paginated<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};

type NotifiableType = "staff" | "patient";

export type Notification = {
    id: number;
    type: string;
    notifiable_type: NotifiableType;
    notifiable_id: number;
    data: {
        title: string;
        message: string;
        [key: string]: unknown;
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
};

export type GetNotificationCountResponse = ApiResponse<{ count: number }>;
export type GetNotificationsResponse = ApiResponse<Paginated<Notification>>;
export type MarkNotificationReadResponse = ApiResponse<null>;
export type MarkAllNotificationsReadResponse = ApiResponse<null>;

export type UnreadNotificationResponse = ApiResponse<Notification[]>;