#[macro_use]
extern crate rocket;
use rocket::serde::json::Json;
use rocket_cors::{AllowedOrigins, Cors, CorsOptions};
use serde::Serialize;

#[derive(Serialize)]
struct Response {
    message: String,
    status: String,
}

#[get("/")]
fn index() -> &'static str {
    "Hello World"
}

#[get("/<name>")]
fn hello(name: &str) -> Json<Response> {
    Json(Response {
        message: name.to_string(),
        status: "success".to_string(),
    })
}

fn create_cors() -> Cors {
    CorsOptions {
        allowed_origins: AllowedOrigins::all(), // Allow all origins (can be restricted to a list of allowed origins)
        allowed_methods: vec!["Get".parse().unwrap()].into_iter().collect(),
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
        .mount("/", routes![index])
        .mount("/hello", routes![hello])
}
