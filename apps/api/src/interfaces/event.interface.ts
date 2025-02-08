interface Event {
  id: number;
  name: string;
  hostName: string;
  address: string;
  description?: string;
  termCondition?: string;
  startDate: Date;
  endDate: Date;
  status: EventStatus;
  image: string;
  mapImage?: string;
  eventCategoryId: number;
  cityId?: number;
}

enum EventStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}
