export interface RefAccountType {
  id: string;
  description: string;
}

export interface RefAccountTypesResponse {
  refAccountTypes: RefAccountType[];
}

export interface RefBank {
  id: string;
  description: string;
}

export interface RefBanksResponse {
  refBanks: RefBank[];
}

export interface RefCategoryType {
  id: string;
  description: string;
}

export interface RefCategoryTypesResponse {
  refCategoryTypes: RefCategoryType[];
}

export interface RefCategory {
  id: string;
  description: string;
  refCategoryType: RefCategoryType;
}

export interface RefCategoriesResponse {
  refCategories: RefCategory[];
}

export interface RefTransactionType {
  id: string;
  description: string;
}

export interface RefTransactionTypesResponse {
  refTransactionTypes: RefTransactionType[];
}

export interface RefTypesState
  extends RefAccountTypesResponse,
    RefBanksResponse,
    RefCategoryTypesResponse,
    RefCategoriesResponse,
    RefTransactionTypesResponse {
  error: string;
}

export interface RefTypesAction extends RefTypesState {
  type: string;
}

export const DefaultRefTypesState: RefTypesState = {
  error: '',
  refAccountTypes: [],
  refBanks: [],
  refCategoryTypes: [],
  refCategories: [],
  refTransactionTypes: [],
};
