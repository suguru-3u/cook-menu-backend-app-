export type reqFood = { name: string; count: number };

export type cookMenuRequest = {
    name: string;
    genre?: number;
    weight?: number;
    ingredients?: reqFood[];
    seasonings?: reqFood[];
    url?: string;
    memo?: string;
};

export type updateCookMenuRequest = cookMenuRequest & { id: number };

export type dynamoIndexManageTable = {
    name: string;
    tableCount: number;
};

export type cookMenuList = {
    id: number;
    name: string;
    genre?: number;
    weight?: number;
    ingredients?: reqFood[];
    seasonings?: reqFood[];
    url?: string;
    memo?: string;
    deleteFlg: boolean;
};
