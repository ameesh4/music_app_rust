pub mod components;
use rocket::serde::Deserialize;
pub mod router;

#[derive(Deserialize)]
pub struct User {
    pub name: String,
    pub age: u8,
    pub email: String,
    pub password: String,
}