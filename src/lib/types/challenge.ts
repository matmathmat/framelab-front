export interface Challenge {
    id: number;
    titleTheme: string;
    descriptionTheme: string;
    photoUrl: string;
    startDate: string;
    endDate: string;
    isArchived: number;
}

export interface ChallengeInfo {
    id: number;
    titleTheme: string;
    descriptionTheme: string;
    startDate: string;
    endDate: string;
    isArchived: boolean;
    isOngoing: boolean;
};