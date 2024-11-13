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

#[derive(Deserialize)]
pub struct Signin {
    pub email: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct Music {
    pub name: String,
    pub artist: String,
    pub genre: String,
    pub year: u16,
    pub id: u32,
}