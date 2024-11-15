pub mod components;
use rocket::serde::Deserialize;
use serde::Serialize;
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
pub struct Query {
    pub query: String,
}

#[derive(Deserialize, Serialize)]
pub struct VideoResult {
    pub id: String,
    pub title: String,
    pub thumbnail: String,
    pub duration: u64,
    pub channel: String,
}