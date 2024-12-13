#[macro_use]
extern crate rocket;
use rocket::serde::json::Json;
use rocket_cors::{AllowedOrigins, Cors, CorsOptions};
use rocket_db_pools::{sqlx, Connection, Database};
use serde::Serialize;
use sqlx::Row;

// Database structure
#[derive(Database)]
#[database("and")]
struct AndDb(sqlx::PgPool);

// Response structure
#[derive(Serialize)]
struct Response {
    message: String,
    status: String,
}

// User structure matching the database table
#[derive(serde::Serialize)]
struct UserTable {
    id: i64,
    username: String,
}

#[get("/")]
async fn index(_db: Connection<AndDb>) -> &'static str {
    "Successfully connected to PostgreSQL database 'AND'!"
}

#[get("/<name>")]
fn hello(name: &str) -> Json<Response> {
    Json(Response {
        message: name.to_string(),
        status: "success".to_string(),
    })
}

#[get("/<id>")]
async fn read_user(mut db: Connection<AndDb>, id: i64) -> Option<Json<UserTable>> {
    let row = sqlx::query("SELECT username FROM public.\"User\" WHERE id = $1")
        .bind(id)
        .fetch_one(&mut **db)
        .await;

    match row {
        Ok(r) => {
            let username: String = r.try_get("username").unwrap_or_default();
            Some(Json(UserTable { id, username }))
        }
        Err(e) => {
            let username = format!("Failed to fetch log with ID {}: {}", id, e);
            // Err(
            //     Status::NotFound,
            //     Json(Response {
            //         message: error_message,
            //         status: "error".to_string(),
            //     }),
            // )
            Some(Json(UserTable { id, username }))
        }
    }
}

#[get("/username/<id>?<set>")]
async fn set_username(mut db: Connection<AndDb>, id: i64, set: &str) -> Option<Json<Response>> {
    let result = sqlx::query("UPDATE public.\"User\" SET username = $1 WHERE id = $2")
        .bind(set)
        .bind(id)
        .execute(&mut **db)
        .await;

    match result {
        Ok(_) => Some(Json(Response {
            message: "Username set successfully".to_string(),
            status: "success".to_string(),
        })),
        Err(e) => {
            let message = format!("Failed to fetch log with ID {}: {}", id, e);
            Some(Json(Response {
                message: message,
                status: "failed".to_string(),
            }))
        }
    }
}

// CORS configuration
fn create_cors() -> Cors {
    CorsOptions {
        allowed_origins: AllowedOrigins::all(), // Allow all origins (can be restricted to a list of allowed origins)
        allowed_methods: vec!["Get".parse().unwrap(), "POST".parse().unwrap()]
            .into_iter()
            .collect(),
        allowed_headers: rocket_cors::AllowedHeaders::all(),
        ..Default::default()
    }
    .to_cors()
    .expect("CORS configuration failed")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(create_cors())
        .attach(AndDb::init())
        .mount("/", routes![index])
        .mount("/hello", routes![hello])
        .mount("/user", routes![read_user, set_username])
}
