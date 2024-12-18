use crate::db::connection::AndDb;
use crate::models::device_schema::{DevicesTable, EventsTable};
use crate::structures::default::DefaultResponse;
use rocket::serde::json::Json;
use rocket::{get, serde, Route};
use rocket_db_pools::{sqlx, Connection};
use sqlx::Row;
use std::time::Duration;

#[derive(serde::Serialize)]
#[serde(untagged)]
pub enum DeviceResponse {
    Devices(Vec<DevicesTable>),
    Default(DefaultResponse),
}

#[derive(serde::Serialize)]
#[serde(untagged)]
pub enum EventsResponse {
    Events(Vec<EventsTable>),
    Default(DefaultResponse),
}

#[get("/device")]
async fn get_devices(mut db: Connection<AndDb>) -> Option<Json<DeviceResponse>> {
    let rows = sqlx::query(
        "SELECT id, name, 
                EXTRACT(EPOCH FROM created_at)::BIGINT AS unix_created_at, 
                EXTRACT(EPOCH FROM updated_at)::BIGINT AS unix_updated_at
            FROM \"device\".\"Devices\"",
    )
    .fetch_all(&mut **db)
    .await;

    match rows {
        Ok(rows) => {
            let devices: Vec<DevicesTable> = rows
                .iter()
                .map(|r| DevicesTable {
                    id: r.try_get("id").unwrap_or_default(),
                    name: r.try_get("name").unwrap_or_default(),
                    created_at: r.try_get("unix_created_at").unwrap_or_default(),
                    updated_at: r.try_get("unix_updated_at").unwrap_or_default(),
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

#[get("/device/events?<limit>")]
async fn get_events(mut db: Connection<AndDb>, limit: i32) -> Option<Json<EventsResponse>> {
    let rows = sqlx::query(
        "SELECT device_id, EXTRACT(EPOCH FROM \"timestamp\")::BIGINT AS unix_timestamp, status, description, severity
            FROM device.\"Events\"
            WHERE \"timestamp\" >= (CURRENT_TIMESTAMP - INTERVAL '7 days')
            ORDER BY \"timestamp\" DESC
            LIMIT $1;",
    )
    .bind(limit)
    .fetch_all(&mut **db)
    .await;

    match rows {
        Ok(rows) => {
            let events: Vec<EventsTable> = rows
                .iter()
                .map(|r| EventsTable {
                    id: 0,
                    device_id: r.try_get("device_id").unwrap_or_default(),
                    status: r.try_get("status").unwrap_or_default(),
                    description: r.try_get("description").unwrap_or_default(),
                    severity: r.try_get("severity").unwrap_or_default(),
                    timestamp: r.try_get("unix_timestamp").unwrap_or_default(),
                })
                .collect();
            Some(Json(EventsResponse::Events(events)))
        }
        Err(e) => {
            let message = format!("Failed to fetch events: {}", e);
            let status = "failure".to_string();
            let default_response = DefaultResponse { message, status };
            Some(Json(EventsResponse::Default(default_response)))
        }
    }
}

pub fn get_routes() -> Vec<Route> {
    routes![get_devices, get_events]
}
