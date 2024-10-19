use axum::{
    extract::{
        Extension,
        Json,
    },
    response::IntoResponse,
    http::StatusCode,
};
use serde_json::json;
use mysql::{
    params,
    prelude::*,
    Pool,
};
use crate::User;
use std::sync::Arc;
use bcrypt::{hash, DEFAULT_COST};


pub async fn signup_handler(Extension(pool): Extension<Arc<Pool>> ,Json(mut user): Json<User>) -> impl IntoResponse {
    if user.name.is_empty() || user.email.is_empty() || user.password.is_empty() {
        let response = json!({
            "message": "Name, email and password are required"
        });

        return (StatusCode::BAD_REQUEST, Json(response));
    }

    let mut conn = pool.get_conn().unwrap();
    let insert_user_query = r"INSERT INTO user (name, age, email, password) VALUES (:name, :age, :email, :password)";

    match hash_password(&user.password){
        Ok(hashed_password) => user.password = hashed_password,
        Err(_) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({
            "Error": "Error hashing"
        })))
    }

    if let Err(e) = conn.exec_drop(
        insert_user_query,
        params! {
            "name" => &user.name,
            "age" => user.age,
            "email" => &user.email,
            "password" => user.password,
        }
    ) {
        let response = json!({
            "message": format!("Could not create user: {}", e)
        });

        return (StatusCode::INTERNAL_SERVER_ERROR, Json(response));
    };
    
    let response = json!({
        "message": "User Created Successfully"
    });

    (StatusCode::OK, Json(response))
}

fn hash_password(password: &str) -> Result<String, bcrypt::BcryptError> {
    hash(password, DEFAULT_COST)
}