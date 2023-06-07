import useSWR from 'swr';

export interface Event {
  id: string;
  startTime: string;
  endTime: string;
  sellStartTime: string;
  sellEndTime: string;
}

export interface Activity {
  id: string;
  name: string;
  coverImageUrl: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  content: string;
  notice: string;
  seatMapUrl: string;
  selectSeatImageUrl: string;
  events: Event[];
}

const useActivity = (id?: string) => {
  const { data, ...props } = useSWR<Activity>(id && `activities/${id}`);
  return { activity: data, ...props };
};

export default useActivity;
