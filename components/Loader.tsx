import {InfinitySpin} from 'react-loader-spinner'

export function Loader() {
    return (
        <InfinitySpin
            height={150}
            width={150}
            color="#C4A2FF"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}