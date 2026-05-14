export interface StaffNode {
  id: string;
  firstName: string | null;
  lastName: string | null;
  nickname: string;
  staffCode: number;
}

export interface StaffListResponse {
  staffList: StaffNode[];
}
