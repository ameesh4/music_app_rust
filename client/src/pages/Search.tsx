import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SearchProps, SearchRequest, SearchResponse } from "@/model";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CirclePlay, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useSound } from "@/hooks/useSound";

export default function SearchHandler() {
    const [searchResults, setSearchResults] = useState<SearchProps[]>([]);
    const { playUrl, play, pause } = useSound();
    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(()=> {
    //         try{
    //             const query: SearchRequest = {
    //                 query: ""
    //             }
    //             if (search.length > 0){
    //                 query.query = search;
    //             }
    //             console.log("requesting data")
    //             axios.post("http://localhost:8000/api/search", query)
    //             .then((res)=>{
    //                 const data: SearchResponse = res.data;
    //                 setSearchResults(data.results);
    //             }).catch((err)=>{
    //                 console.log(err);
    //             })
    //         }
    //         catch(err){
    //             console.log(err);
    //         }
    //     }, 1000)

    //     return () => clearTimeout(delayDebounceFn)
    // }, [search])

    const handleSearch = () => {
        try{
            const query = (document.getElementById("search") as HTMLInputElement).value;
            const queryData: SearchRequest = {
                query: query
            }
            if (query.length > 0){
                axios.post("http://localhost:8000/api/search", queryData)
                .then((res)=>{
                    const data: SearchResponse = res.data;
                    setSearchResults(data.results);
                }).catch((err)=>{
                    toast ({
                        title: "Error",
                        description: err.response.data.message,
                        variant: "destructive"
                    })
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handlePlay = (id: String) => {
        axios.post("http://localhost:8000/api/stream", id, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res)=>{
            const data = res.data;
            playUrl(data.url);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="flex justify-center">
            <div className="w-3/5">
                <div className="flex">
                    <Input id="search" className="w-full rounded-md mt-8 border-2 border-r-0 border-gray-300" onBlur={()=>handleSearch()} />
                    <button className="mt-8 px-2 border-slate-500 bg-gray-300">
                        <Search color="#FFFFFF"/>
                    </button>
                </div>
                <ScrollArea className="w-full rounded-md shadow-xl">
                    <ul>
                        {
                            searchResults.map((result, index)=>{
                                return (
                                    <li key={index}>
                                        <div className="flex p-2 border-b-2 border-gray-300">
                                            <div className="flex relative w-1/5 items-center justify-center" onClick={()=>handlePlay(result.id)}>
                                                <div className="absolute w-1/5 bg-none w-full h-full hover:bg-gray-950/50 flex items-center justify-center">
                                                    <CirclePlay className="absolute" color="#FFFFFF"/>
                                                </div>
                                                <img src={result.thumbnail} alt="thumbnail" className="w-full rounded-md" />
                                            </div>
                                            <div className="w-4/5 p-2">
                                                <h1 className="text-2xl">{result.title}</h1>
                                                <h2>{result.channel}</h2>
                                                <h3>{result.duration}</h3>
                                            </div>
                                        </div>
                                    </li>           
                                )
                            })
                        }
                    </ul>
                </ScrollArea>
            </div>
        </div>
    )
}