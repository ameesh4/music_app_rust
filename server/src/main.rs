use mysql::{OptsBuilder, Pool};
use dotenv::dotenv;
use musicapp::router::{signin, signup, test_handler};
use std::env;
use std::sync::Arc;
use rocket::http::Method;
use rocket_cors::{Cors, CorsOptions, AllOrSome::All};
#[macro_use] extern crate rocket;


#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![signin, signup, test_handler])
        .manage(Arc::new(setup_db_pool()))
        .attach(cors_setup())
}


fn cors_setup() -> Cors {
    CorsOptions {
        allow_credentials: true,
        expose_headers: [].into(),

        allowed_origins: All,
        allowed_methods: vec![Method::Get, Method::Post, Method::Put, Method::Delete].into_iter().map(From::from).collect(),
        allowed_headers: All,
        max_age: Some(3600),
        send_wildcard: false,
        fairing_route_base: "/".to_string(),
        fairing_route_rank: 0,
    }.to_cors().expect("Error while building cors")
}


fn setup_db_pool() -> Pool {
    dotenv().ok();
    let user = env::var("DATABASE_USER").expect("User is required");
    let password = env::var("DATABASE_PASSWORD").expect("Password is required");
    let host = env::var("DATABASE_HOST").expect("Host is required");
    let port: u16= env::var("DATABASE_PORT").expect("Port is required").parse().unwrap();
    let database = env::var("DATABASE_NAME").expect("Database is required");

    let opts = OptsBuilder::new()
        .ip_or_hostname(Some(host))
        .tcp_port(port)
        .user(Some(user))
        .pass(Some(password))
        .db_name(Some(database));

    Pool::new(opts).unwrap()
}

