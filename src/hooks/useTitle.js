import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function useTitle(title) {
    const setTitle= useOutletContext();

    useEffect(() => {
        setTitle(title)
    }, [title, setTitle])
}