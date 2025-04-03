import { StaticImageData } from "next/image"

type SquareColors = {
    /** Color of the canvas background */
    background: string,
    /** Color of the foreground (squares) */
    foreground: string
}

export type SquareProgressOptions = {
    /** Size (in pixels) that each square will have */
    size: number,
    /** Width (in squares) that the canvas will have */
    width: number,
    /** Height (in squares) that the canvas will have */
    height: number,
    /**
     * If set to `false` will generate random square positions relative to a value  
     * If set to `true` will show unique square positions on every page refresh
     */
    squareRandomize: boolean,
    /** Colors options */
    colors: SquareColors,
    /** Source of the image to be created from squares. (Overwrites colors options) */
    image?: string | StaticImageData
}