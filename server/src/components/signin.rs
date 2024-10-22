use std::sync::Arc;
use super::jwt_token::create_token;
use crate::Signin;
use mysql::{prelude::Queryable, Pool};
use rocket::{response::status::{self, NotFound}, serde::json::{json, Json, Value}};

pub async fn signin_handler(db_pool: Arc<Pool>, Json(signin): Json<Signin>) -> Result<Json<Value>, NotFound<Json<Value>>>{
    let mut conn = db_pool.get_conn().unwrap();
    let find_query = r"SELECT * FROM user WHERE email = ?";

    let result: Option<(u8, String, String, u16, String)> = conn.exec_first(find_query, (&signin.email, )).unwrap(); 

    let result = match result {
        Some(result) => result,
        None => {
            let response = json!({
                "message": "User Not Found"
            });

            return Err(status::NotFound(Json(response)))
        }
    };

    match verify_password(&signin.password, &result.4){
        Ok(true) => {
            match create_token(&signin.email) {
                Ok(token)=> {
                    let response = json!({
                        "message": "User Found",
                        "token": token
                    });
                    Ok(Json(response))
                }
                Err(e)=>{
                    let response = json!({
                        "message": format!("Error creating token: {}", e)
                    });

                    Err(status::NotFound(Json(response)))
                }
            }
        },
        Ok(false) => {
            let response = json!({
                "message": "Invalid password"
            });

            Err(status::NotFound(Json(response)))
        },
        Err(e) => {
            let response = json!({
                "message": format!("Error verifying password: {}", e)
            });

            Err(status::NotFound(Json(response)))
        }
    }
}

fn verify_password(password: &str, hash: &str) -> Result<bool, bcrypt::BcryptError> {
    bcrypt::verify(password, hash)
}