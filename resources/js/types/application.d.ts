export interface SurveyPaginated {
    current_page: number;
    data: Survey[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface Survey {
    id: number;
    local_housing_contact_id: number;
    address: string;
    file_location: string;
    status: SurveyStatus;
    created_at: Date;
    updated_at: Date;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export type SurveyStatus =
    | "needs_uploader_action"
    | "pre_review"
    | "in_review"
    | "approved"
    | "rejected";

export interface Comment {
    id: number;
    user_id: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
    user: User;
}

export interface User {
    id: number;
    name: string;
}
