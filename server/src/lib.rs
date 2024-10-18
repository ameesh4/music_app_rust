extern crate mysql;
extern crate dotenv;

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct User {
    pub name: String,
    pub age: u8,
    pub email: String,
    pub password: String,
}

pub mod components;


