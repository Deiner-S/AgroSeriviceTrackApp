export default interface Repository<T, K> {
    
    save(entity: T): Promise<boolean>;
    
    getById(id: K): Promise<T | null>;
    
    update(entity: T): Promise<boolean>;
    
    delete(id: K): Promise<boolean>;
    
    getAll(): Promise<T[]>;
}