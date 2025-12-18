export default interface WorkOrder {
  operation_code: string;
  client: string;
  symptoms: string;
  chassi?: string;
  orimento?: string;
  model?: string;
  date_in?: string;
  date_out?: string;
  status?: string;
  service?: string;
  insert_date?: string;
}