export interface DevicesTableProps {
    id: number;
    name: string;
    created_at: number;
    updated_at: number;
};

export interface EventsTableProps {
    id: number;
    device_id: number;
    status: string;
    description: string;
    severity: number;
    timestamp: number;
};