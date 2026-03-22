// I've decided to collect all the necessery types here since this is a small project

export type APIEvent={
    season: number,
    status: "played" | "scheduled" | string,
    timeVenueUTC: string,
    dateVenue: string,
    stadium: string | null,
    homeTeam: Team | null,
    awayTeam: Team | null,
    result: Result | null,
    stage: Stage | null,
    group: unknown,
    originCompetitionId: string;
    originCompetitionName: string;
}

export type Team={
    name: string,
    officalName: string,
    slug: string,
    abbreviation: string,
    teamCountryCode: string,
    stagePosition:number | null
}

export type Result={
    homeGoals: number;
    awayGoals: number;
    winner: string | null;
    message: string | null;
    goals: number[] | null,
    yellowCards: number[] | null,
    secondYellowCards: number[] | null,
    directRedCards:number[] | null,
}

export type Stage={
    id: string;
    name: string;
    ordering: number;
}

export type ApiResponse = {
    data:APIEvent[];
};