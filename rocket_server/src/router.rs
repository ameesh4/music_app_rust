use std::sync::Arc;
use super::components::signup::signup_handler;
use mysql::Pool;
use rocket::{post, response::status::NotFound, serde::json::{Json, Value}, State};
use crate::User;


#[post("/api/signup", data="<user>")]
pub async fn signin(user: Json<User>, db_pool: &State<Arc<Pool>>) -> Result<Json<Value>, NotFound<Json<Value>>> {
    match signup_handler(Arc::clone(db_pool), user).await {
        Ok(response)=> Ok(response),
        Err(e) => Err(e)
    }
}
