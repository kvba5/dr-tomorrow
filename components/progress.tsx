"use client"

import type { Vec2 } from "@/helpers/types"

import resultImage from "@/public/squareResult.webp"

import SquareProgress from "@/helpers/square/square"
import { useEffect, useRef, useState } from "react"

const START_VALUE = new Date(2025, 3, 2).getTime()
const END_VALUE = new Date(2025, 5, 5).getTime()


export default function Progress() {
    const [percentage, setPercentage] = useState<string>("0")
    const ref = useRef<HTMLCanvasElement>(null)
    
    useEffect(() => {
        if (!ref.current) return;

        const square = new SquareProgress(ref.current, START_VALUE, END_VALUE + 1, {
            image: resultImage,
            size: 20,
            height: 20,
            width: 70
        })

        const updateSquare = () => square.value(Date.now())
        const squareUpdateInter = setInterval(updateSquare, 1000);
        const filledAmountInter = setInterval(() => setPercentage(((Date.now() - START_VALUE) / (END_VALUE - START_VALUE) * 100).toFixed(6)), 100)
        updateSquare()

        return () => {
            clearInterval(squareUpdateInter)
            clearInterval(filledAmountInter)
        }
    }, [ref])
    
    return <div>
        <span className="block mb-3">Currently filled: <span className="text-utyellow">{percentage}%</span></span>
        <canvas width={20 * 70} height={20 * 20} onContextMenu={e => e.preventDefault()} className="border-4 border-white w-full" ref={ref} />
    </div>
}