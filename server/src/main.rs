use axum::{
    extract::{
        Extension,
        // Json,
    },
    routing::{
        get,
        post,
    },
    Router,
};
use dotenv::dotenv;
use std::env;
use std::sync::Arc;
use mysql::{
    // prelude::*,
    Pool,
    OptsBuilder,
};
use musicapp::components::signup::signup_handler;

#[tokio::main]
async fn main(){
    dotenv().ok();

    let user = env::var("DATABASE_USER").expect("DB_USER is not set");
    let password = env::var("DATABASE_PASS").expect("DB_PASSWORD is not set");
    let host = env::var("DATABASE_HOST").expect("DB_HOST is not set");
    let port: u16 = env::var("DATABASE_PORT").expect("DB_PORT is not set").parse().unwrap();
    let database = env::var("DATABASE_NAME").expect("DB_NAME is not set"); 
    
    let opts = OptsBuilder::new()
        .ip_or_hostname(Some(host))
        .tcp_port(port)
        .user(Some(user))
        .pass(Some(password))
        .db_name(Some(database));

    let pool = Pool::new(opts).unwrap();

    let shared_pool = Arc::new(pool);

    let app = Router::new()
    .route("/", get(|| async { "Hellom World"}))
    .route("/api/signup", post(signup_handler))
    .layer(Extension(shared_pool));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}