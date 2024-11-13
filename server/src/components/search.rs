use rocket::{response::status::NotFound, serde::json::{json, Json, Value}};
use rusty_ytdl::{ search::{ YouTube, SearchResult}, Video };
// use std::collections::HashMap;
// use std::env;
// use reqwest::header::{HeaderMap, HeaderValue};


pub async fn search_music(search: &str) -> Result<Json<Value>, NotFound<Json<Value>>>{

    let youtube = YouTube::new().unwrap();

    let res = youtube.search(search, None).await.unwrap();

    if res.len() == 0 {
        let response = json!({
            "message": "No results found"
        });

        return Err(NotFound(Json(response)))
    }

    let i: u8 = 0;
    while i < 5 {
        
    }

    let response = json!({
        "message": "Success",
        "data": res
    });


    Ok(Json(response))
}

pub async fn test() -> Result<Json<Value>, NotFound<Json<Value>>>{
    let video_url = "https://www.youtube.com/watch?v=FZ8BxMU3BYc";
    let video = Video::new(video_url).unwrap();

    let video_info = video.get_info().await.unwrap();

    let formats = video_info.formats;
    let mut url = String::new();
    for i in formats.iter(){
        if i.mime_type.mime.essence_str().starts_with("audio/webm") {
            url = i.url.clone();
            break;
        }
    }

    let response = json!({
        "message": "Success",
        "url": url
    });

    Ok(Json(response))
}