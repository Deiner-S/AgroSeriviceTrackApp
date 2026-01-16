import WorkOrder from "@/models/WorkOrder";
import WorkOrderRepository from "@/repository/WorkOrderRepository";
import { receivePendingOrders } from "@/services/synchronizerService";
import { useEffect, useState } from "react";




export default function useOrderController(){
    const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
    
      useEffect(() => {
       
        async function loadWorkOrders() {
          await receivePendingOrders();
          const workOrderRepository = await WorkOrderRepository.build();
          const data: WorkOrder[] = await workOrderRepository.getAll();
          const filteredData = data.filter(item => item.status === "1");
          setWorkOrders(filteredData);
        }
        loadWorkOrders();
      }, []);
    
    return {
        workOrders
    }
}