export default interface CheckList{
    id?: number
    checklist_fk:number
    serviceOrder_fk:number
    status:string
    statusSync?: number
    img?: Uint8Array | null

}