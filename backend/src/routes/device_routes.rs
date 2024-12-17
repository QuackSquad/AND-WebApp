use crate::db::connection::AndDb;
use crate::models::device_schema::DevicesTable;
use crate::structures::default::DefaultResponse;
use rocket::serde::json::Json;
use rocket::{get, serde, Route};
use rocket_db_pools::{sqlx, Connection};
use sqlx::Row;
use std::time::Duration;

#[derive(serde::Serialize)]
#[serde(untagged)] // Sørger for, at JSON-outputtet ikke indeholder enum-tags
pub enum DeviceResponse {
    Devices(Vec<DevicesTable>),
    Default(DefaultResponse),
}

#[get("/device")]
async fn get_devices(mut db: Connection<AndDb>) -> Option<Json<DeviceResponse>> {
    let rows = sqlx::query("SELECT * FROM \"device\".\"Devices\"")
        .fetch_all(&mut **db)
        .await;

    match rows {
        Ok(rows) => {
            let devices: Vec<DevicesTable> = rows
                .iter()
                .map(|r| DevicesTable {
                    id: r.try_get("id").unwrap_or_default(),
                    name: r.try_get("name").unwrap_or_default(),
                    created_at: r.try_get("created_at").unwrap_or_default(),
                    updated_at: r.try_get("updated_at").unwrap_or_default(),
                })
                .collect();

            tokio::time::sleep(Duration::from_secs(2)).await; // DELETE THIS LINE
            Some(Json(DeviceResponse::Devices(devices)))
        }
        Err(e) => {
            let message = format!("Failed to fetch devices: {}", e);
            let status = "failure".to_string();
            let default_response = DefaultResponse { message, status };
            Some(Json(DeviceResponse::Default(default_response)))
        }
    }
}

pub fn get_routes() -> Vec<Route> {
    routes![get_devices]
}
