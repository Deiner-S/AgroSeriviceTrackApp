export default interface CheckList{
    id?: number
    checklist_fk:number
    serviceOrder_fk:number
    status:string
    img?: Uint8Array | null

}