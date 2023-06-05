import useTicketPurchasingStore from '@/stores/ticketPurchasing';
import { SelectArea } from '@/types/activityTypes';
import useSeatAreas from "./useSeatAreas";

interface Result {
  area: SelectArea;
  seatImgUrl: string;
}

const useSelectedAreas = (eventId?: string) => {
  const selectAreaId = useTicketPurchasingStore.use.selectAreaId();
  const selectSubAreaId = useTicketPurchasingStore.use.selectSubAreaId();
  const { seatAreas } = useSeatAreas(eventId);

  let result: Result;
  if(seatAreas){
    const {seats, seatImgUrl} = seatAreas;
    const targetArea = seats.find(({id} :{id:string})=> id === selectAreaId);
    if(targetArea){
      const { subAreas, ...areaInfo } = targetArea;
      if(subAreas){
        const targetSubArea = subAreas.find(({id}:{id:string}) => id === selectSubAreaId);
        if(targetSubArea){
          result = {
            area: {...areaInfo, subArea: targetSubArea},
            seatImgUrl
          };
          return result;
        }
      }
    }
  }
}

export default useSelectedAreas;
