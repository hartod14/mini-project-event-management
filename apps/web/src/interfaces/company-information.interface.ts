export interface ICompanyInformationInterface {
  id: string;
  about_us: string;
  address: string;
  email: string;
  phone: string;
  social_media: {
    name: string;
    link: string;
  }[];
  created_at: string;
  updated_at: string;
}
export interface ICompanyInformationUpdateInterface {
  about_us: string;
  address: string;
  email: string;
  phone: string;
  social_media: {
    name: string;
    link: string;
  }[];
}
