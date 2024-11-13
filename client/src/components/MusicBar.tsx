import { Slider } from '@/components/ui/slider';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

export default function MusicBar() {
    
    const playPause = (e: string) =>{
        let play = document.getElementById('play') as HTMLButtonElement;
        let pause = document.getElementById('pause') as HTMLButtonElement;
        if(e === 'play'){
            play.classList.add('hidden')
            pause.classList.remove('hidden')
        }else{
            play.classList.remove('hidden')
            pause.classList.add('hidden')
        }
    }

    return (
        <div className="flex font-montserrat max-w-screen border-b-2 border-gray-200 justify-center">
            <div className='flex py-4 h-full w-3/5'>
                <div className="flex items-center mr-16">
                    <button  className="h-6 w-6 mx-3"><SkipBack /></button>
                    <button onClick={()=>playPause("pause")} id='pause' className="h-6 w-6 mx-3 hidden"><Pause /></button>
                    <button onClick={()=>playPause("play")} id='play' className="h-6 w-6 mx-3"><Play /></button>
                    <button className="h-6 w-6 mx-3"><SkipForward /></button>
                </div>
                <div className='flex h-full w-full border-2 bg-gray-100 rounded rounded-lg items-center'>
                    <div className='h-20 w-20 border-2'></div>
                    <div className='mx-2 mt-1 w-full text-center'>
                        <p className='text-2xl tracking-wide'>Title</p>
                        <div className='animate-marquee mb-1'>
                            <span className='italic text-sm'>Artist</span>
                        </div>
                        <Slider defaultValue={[0]} max={100} />
                    </div>
                </div>
            </div>
        </div>
    )
}