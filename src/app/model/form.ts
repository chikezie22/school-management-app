export interface Form {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  matNo: string;
  category: {
    sex: string;
  };
  faculty: string;
  department: string;
  programme: string;
  level: string;
  waec: string;
  createdAt: Date;
}
