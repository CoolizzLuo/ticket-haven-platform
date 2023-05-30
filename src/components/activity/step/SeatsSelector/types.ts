export interface Event {
  startAt: string;
  location: string;
}

export interface SubArea {
  id: string;
  name: string;
  color: string;
  remainingSeats: number;
}

export interface Area {
  id?: string;
  price: number;
  name: string;
  subAreas: SubArea[];
}
