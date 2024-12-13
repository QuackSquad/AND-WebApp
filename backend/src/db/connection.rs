use rocket::{fairing::AdHoc, Rocket};
use rocket_db_pools::{sqlx, Database};

#[derive(Database)]
#[database("and_db")]
pub struct AndDb(sqlx::PgPool);

pub fn init_db() -> rocket::fairing::AdHoc {
    AdHoc::on_ignite("Database", |rocket| async { rocket.attach(AndDb::init()) })
}
