use rocket::{response::status::NotFound, serde::json::{ Json, Value, json}};
use rusty_ytdl::Video;


pub async fn stream_url(id: &str) -> Result<Json<Value>, NotFound<Json<Value>>>{
    let video = Video::new(id).unwrap();

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