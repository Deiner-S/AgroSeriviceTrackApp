import Repository from "./repository";
import Order from "@/models/Order";
export default class OrderRepository implements Repository<Order,number>{
    
    save(entity: Order): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    update(entity: Order): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }

}