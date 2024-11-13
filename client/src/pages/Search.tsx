import { Input } from "@/components/ui/input";

export default function Search() {

    const handleChange = (e: any) => {
        
    }

    return (
        <div className="flex justify-center">
            <Input id="search" className="w-3/5 rounded-md mt-8" onChange={(e)=>handleChange(e)}></Input>
        </div>
    )
}