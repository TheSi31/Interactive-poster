export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  details: string;
}

export interface WomanData {
  id: string;
  name: string;
  years: string;
  shortDesc: string;
  photoUrl: string;
  biography: string;
  militaryActivity: string;
  awards: string;
  postwarLife: string;
  extraPhotos: string[];
}

export interface ActivityData {
  id: string;
  title: string;
  photoUrl: string;
}