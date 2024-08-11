export interface User {
  id: string;
  emailOrPhone: string;
  password: string;
  organizationName?: string;  // Optional property
}
