import CheckListItem from "@/models/CheckListItem";
import WorkOrder from "@/models/WorkOrder";
import CheckListItemRepository from "@/repository/CheckListItemRepository";
import WorkOrderRepository from "@/repository/WorkOrderRepository";


export async function syncPendingOrders() {
    const workOrders = await httpRequest<WorkOrder[]>({
        method: 'GET',
        endpoint: "/work_order_api",
        BASE_URL: "https://ringless-equivalently-alijah.ngrok-free.dev/gerenciador"
        })

    const workOrderRepository = await WorkOrderRepository.build()
     for(const workOrder of workOrders){
        const response = await workOrderRepository.getById(workOrder.operation_code)
        if(!response){
            workOrderRepository.save(workOrder)
            console.log(workOrder)
        }        
     }
}

export async function syncCheckListItems(){
    const checklist_item_list = await httpRequest<CheckListItem[]>({
        method: 'GET',
        endpoint: "/dowload_checklist_items_api",
        BASE_URL: "https://ringless-equivalently-alijah.ngrok-free.dev/gerenciador"
        })
    const checkListItemRepository = await CheckListItemRepository.build();
    await checkListItemRepository.deletAll()

    for(const item of checklist_item_list){
        console.log(item)
        await checkListItemRepository.save(item)        
    }
    
    console.log("Conteúdo:", checklist_item_list)
}


// definindo valores possíveis para 
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

//Empacotador da requisição
interface RequestOptions {
  method: HttpMethod;
  endpoint: string;
  body?: unknown;
  headers?: Record<string, string>;
  BASE_URL: String
}

export async function httpRequest<T>({method,endpoint,body,headers = {},BASE_URL}: RequestOptions): Promise <T>{

    const response = await fetch(`${BASE_URL}${endpoint}`, {      
        method,
        headers: {'Content-Type': 'application/json',...headers},
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorBody || response.statusText}`);
    }

    return response.json() as Promise<T>;
}

    

export async function syncAllOrdersNotFinished() {
    
}

export async function syncfilledOrders() {}

