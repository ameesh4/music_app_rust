use std::sync::Arc;
use super::components::{signup::signup_handler, signin::signin_handler, search::search_music};
use mysql::Pool;
use rocket::{get, post, response::status::NotFound, serde::json::{Json, Value}, State};
use crate::{components::search::test, Signin, User};


#[post("/api/signup", data="<user>")]
pub async fn signin(user: Json<User>, db_pool: &State<Arc<Pool>>) -> Result<Json<Value>, NotFound<Json<Value>>> {
    match signup_handler(Arc::clone(db_pool), user).await {
        Ok(response)=> Ok(response),
        Err(e) => Err(e)
    }
}


#[post("/api/signin", data="<signin>")]
pub async fn signup(signin: Json<Signin>, db_pool: &State<Arc<Pool>>) -> Result<Json<Value>, NotFound<Json<Value>>> {
    match signin_handler(Arc::clone(db_pool), signin).await {
        Ok(response)=> Ok(response),
        Err(e) => Err(e)
    }
}

#[post("/api/search", data="<query>")]
pub async fn search(query: Json<String>) -> Result<Json<Value> , NotFound<Json<Value>>> {
    match search_music(&query).await {
        Ok(response)=> Ok(response),
        Err(e) => Err(e)
    }
}


#[get("/api/test")]
pub async fn test_handler() -> Result<Json<Value>, NotFound<Json<Value>>> {
    match test().await {
        Ok(response) => Ok(response),
        Err(e) => Err(e)
    }
}


