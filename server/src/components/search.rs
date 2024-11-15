use rocket::{response::status::NotFound, serde::json::{json, Json, Value}};
use rusty_ytdl::search::{SearchOptions, SearchResult , YouTube};
use rusty_ytdl::search::SearchType::Video;
use crate::{Query, VideoResult};
// use std::collections::HashMap;
// use std::env;
// use reqwest::header::{HeaderMap, HeaderValue};


pub async fn search_music(search: Json<Query>) -> Result<Json<Value>, NotFound<Json<Value>>>{

    let youtube = YouTube::new().unwrap();

    let search_options = SearchOptions {
        limit: 3,
        search_type: Video,
        safe_search: false,
    };

    let res = match youtube.search(search.query.clone(), Some(&search_options)).await {
        Ok(res) => res,
        Err(e) => {
            let response = json!({
                "message": e.to_string()
            });

            return Err(NotFound(Json(response)))
        }
    };

    if res.len() == 0 {
        let response = json!({
            "message": "No results found"
        });

        return Err(NotFound(Json(response)))
    }

    let mut video: Vec<VideoResult> = Vec::new();

    for i in res.iter(){
        match i {
            SearchResult::Video(i) => {
                let temp_video = VideoResult {
                    id: i.id.clone(),
                    title: i.title.clone(),
                    thumbnail: i.thumbnails[0].url.clone(),
                    duration: i.duration.clone(),
                    channel: i.channel.name.clone(),
                };
                
                video.push(temp_video);
            }
            SearchResult::Playlist(_playlist) => todo!(),
            SearchResult::Channel(_channel) => todo!(),
        }
    }
    
    let response = json!({
        "message": "Success",
        "results": video
    });

    Ok(Json(response))
}

// pub async fn test() -> Result<Json<Value>, NotFound<Json<Value>>>{
//     let video_url = "https://www.youtube.com/watch?v=FZ8BxMU3BYc";
//     let video = Video::new(video_url).unwrap();

//     let video_info = video.get_info().await.unwrap();

//     let formats = video_info.formats;
//     let mut url = String::new();
//     for i in formats.iter(){
//         if i.mime_type.mime.essence_str().starts_with("audio/webm") {
//             url = i.url.clone();
//             break;
//         }
//     }

//     let response = json!({
//         "message": "Success",
//         "url": url
//     });

//     Ok(Json(response))
// }