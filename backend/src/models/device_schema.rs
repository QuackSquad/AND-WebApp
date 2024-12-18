#[derive(serde::Serialize)]
pub struct DevicesTable {
    pub id: i64,
    pub name: String,
    pub created_at: i64,
    pub updated_at: i64,
}

#[derive(serde::Serialize)]
pub struct EventsTable {
    pub id: i64,
    pub device_id: i64,
    pub status: String,
    pub description: String,
    pub severity: i16,
    pub timestamp: i64,
}
