use jsonwebtoken::{encode, Header, EncodingKey};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    sub: String,
    exp: usize,
}

pub fn create_token(email: &str) -> Result<String, jsonwebtoken::errors::Error> {
    dotenv::dotenv().ok();

    let claims = Claims {
        sub: email.to_owned(),
        exp: 10000000000,
    };

    let secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    
    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
}
