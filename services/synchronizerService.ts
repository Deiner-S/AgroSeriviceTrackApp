import NetInfo from '@react-native-community/netinfo';
import CheckListItem from "@/models/CheckListItem";
import WorkOrder from "@/models/WorkOrder";
import CheckListItemRepository from "@/repository/CheckListItemRepository";
import WorkOrderRepository from "@/repository/WorkOrderRepository";
import CheckListRepository from '@/repository/CheckListRepository';


// tasks
// - polish exception handling
// - evaluate dividing the file into more specialized files
// - Add a retry system to requests.


export async function receivePendingOrders() {
    if(await hasWebAccess()){
        const workOrders = await httpRequest<WorkOrder[]>({
            method: 'GET',
            endpoint: "/send_work_orders_api",
            BASE_URL: "https://ringless-equivalently-alijah.ngrok-free.dev/gerenciador"
            })
        if(!workOrders){
            console.log("throw Error")
        }
        const workOrderRepository = await WorkOrderRepository.build()
        for(const workOrder of workOrders){
            const response = await workOrderRepository.getById(workOrder.operation_code)
            if(!response){
                workOrderRepository.save(workOrder)
                console.log(workOrder)
            }        
        }
    }
}

export async function receiveCheckListItems(){
    if(await hasWebAccess()){
        const checklistItemList = await httpRequest<CheckListItem[]>({
            method: 'GET',
            endpoint: "/send_checklist_items_api",
            BASE_URL: "https://ringless-equivalently-alijah.ngrok-free.dev/gerenciador"
            })
        if(!checklistItemList){
            console.log("throw Error")
        }
        
        const checkListItemRepository = await CheckListItemRepository.build();
        await checkListItemRepository.deletAll()

        for(const item of checklistItemList){
            console.log(item)
            await checkListItemRepository.save(item)        
        }
        
        console.log("Conteúdo:", checklistItemList)
    }
    
}

export async function sendOrdersChanges() {
    if(await hasWebAccess()){    
        const workOrderRepository = await WorkOrderRepository.build()
        const workOrders = await workOrderRepository.getAll()
        const workOrdersFiltered = workOrders.filter(item => item.statusSync !== 1)

        const response = await httpRequest<WorkOrder[]>({
            method: 'POST',
            endpoint: "/receive_work_orders_api",
            BASE_URL: "https://ringless-equivalently-alijah.ngrok-free.dev/gerenciador",
            body: workOrdersFiltered
        })

        if(response){
            for(const workOrder of workOrdersFiltered){
                workOrder.statusSync = 1
                workOrderRepository.update(workOrder)
            }
        }else{
            console.log("throw Error")
        }

        
    }
}

export async function sendCheckListsFilleds(){
    if(await hasWebAccess()){ 
        const checkListRepository = await CheckListRepository.build()
        const checkLists = await checkListRepository.getAll()
        const checkListsFiltered = checkLists.filter(item => item.statusSync !== 1)



    }
}

async function hasWebAccess(): Promise<boolean> {
  const state = await NetInfo.fetch();

  return Boolean(
    state.isConnected && state.isInternetReachable
  );
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

async function httpRequest<T>({method,endpoint,body,headers = {},BASE_URL}: RequestOptions): Promise <T>{

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

    


