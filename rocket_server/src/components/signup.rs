use std::sync::Arc;

use bcrypt::DEFAULT_COST;
use mysql::{Pool, params};
use rocket::{response::status::{self, NotFound}, serde::json::{json, Json}};
use rocket_dyn_templates::tera::Value;
use mysql::prelude::*;
use crate::User;


pub async fn signup_handler(db_pool: Arc<Pool>, Json(mut user): Json<User>) -> Result<Json<Value>, NotFound<Json<Value>>> {
    if user.email.is_empty() || user.password.is_empty() || user.name.is_empty() || user.age == 0 {
        let response = json!({
            "message": "Please Fill all fields"
        });

        return Err(status::NotFound(Json(response)))
    }

    let mut conn = db_pool.get_conn().unwrap();

    match hash_password(&user.password){
        Ok(hashed_password)=> user.password = hashed_password,
        Err(_)=>{
            let response = json!({
                "message": "Error hashing password"
            });

            return Err(status::NotFound(Json(response)))
        }
    }

    let query = r"INSERT INTO user (name, age, email, password) VALUES (:name, :age, :email, :password)";
    if let Err(e) = conn.exec_drop(
        query,
        params! {
            "name" => &user.name,
            "age" => user.age,
            "email" => &user.email,
            "password" => &user.password,
        }
    ) {
        if "duplicate entry" == e.to_string() {
            let response = json!({
                "message": "User already exists"
            });

            return Err(status::NotFound(Json(response)))
        }else{
            let response = json!({
                "message": format!("Could not create user: {}", e)
            });

            return Err(status::NotFound(Json(response)))
        }
    };

    Ok(Json(json!({
        "message": "User created successfully"
    })))
}

fn hash_password(password: &str) -> Result<String, bcrypt::BcryptError>{
    bcrypt::hash(password, DEFAULT_COST)
}