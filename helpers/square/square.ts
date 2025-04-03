import type { SquareProgressOptions } from "./types";
import type { Vec2 } from "@/helpers/types";

import Rand from "rand-seed";


export const DEFAULTS: SquareProgressOptions = {
    size: 10,
    height: 20,
    width: 20,
    squareRandomize: false,
    colors: {
        background: "black",
        foreground: "red"
    }
};

export default class SquareProgress {
    el: HTMLCanvasElement;
    get ctx() { return this.el.getContext("2d")! }

    private imgError: boolean = false;
    private readonly img: HTMLImageElement = new Image()
    private get imgScaleX() { return this.img.width / this.width }
    private get imgScaleY() { return this.img.height / this.height }

    private get shouldDrawImage() { return typeof this.options.image !== "undefined" }
    private options: SquareProgressOptions;
    get height() { return this.options.size * this.options.height }
    get width() { return this.options.size * this.options.width }
    get maxSquares() { return this.options.width * this.options.height }
    get squaresDrawn() { return this.maxSquares - this.freeSquares.length }
    private freeSquares: Vec2[] = []

    rng!: Rand;
    initialValue: number
    maxValue: number
    currentValue: number

    constructor(el: HTMLCanvasElement, initialValue: number, targetValue: number, options?: Partial<SquareProgressOptions>) {
        this.el = el;
        this.options = {
            ...DEFAULTS,
            ...options
        };

        if (this.options.image) {
            this.img.onerror = () => this.imgError = true;
            this.img.src = typeof this.options.image === "string" ? this.options.image : this.options.image.src;
        }

        this.initialValue = this.currentValue = initialValue;
        this.maxValue = targetValue;
        this.reinitRng()
        this.reinitFreePositions()
        this.prepareCanvas()
    }

    private reinitRng() {
        this.rng = new Rand(
            !this.options.squareRandomize ?
                this.maxValue.toString() :
                undefined
            )
    }

    private reinitFreePositions() {
        this.freeSquares = []

        for (let x = 0; x < this.width; x += this.options.size) {
            for (let y = 0; y < this.height; y += this.options.size) this.freeSquares.push([x, y])
        }

        for (let i = this.freeSquares.length - 1; i > 0; i--) {
            const j = Math.floor(this.rng.next() * (i + 1));
            [this.freeSquares[i], this.freeSquares[j]] = [this.freeSquares[j], this.freeSquares[i]];
        }
    }

    private clearCanvas() {
        if (this.shouldDrawImage) this.ctx.clearRect(0, 0, this.width, this.height)
        else {
            this.ctx.fillStyle = this.options.colors.background
            this.ctx.fillRect(0, 0, this.width, this.height)
        }
    }

    private prepareCanvas() {
        this.el.height = this.height
        this.el.width = this.width
        this.ctx.imageSmoothingEnabled = false;
        this.clearCanvas()
    }

    private getFreeSquare() {
        if (this.freeSquares.length === 0) throw new Error("No free squares left")
        return this.freeSquares.pop()!
    }

    private drawSquare([x, y]: Vec2) {
        if (!this.shouldDrawImage || this.imgError) {
            this.ctx.fillStyle = this.options.colors.foreground;
            this.ctx.fillRect(x, y, this.options.size, this.options.size)
        }
        else {
            this.ctx.drawImage(
                this.img,
                x * this.imgScaleX, y * this.imgScaleY, this.options.size * this.imgScaleX, this.options.size * this.imgScaleY,
                x, y, this.options.size, this.options.size
            )
        }
    }

    private waitingForDraw = false;
    private async onValueChange(oldValue: number, newValue: number) {
        if (oldValue === newValue || this.waitingForDraw) return;
        while(this.shouldDrawImage && !this.imgError && !this.img.complete) {
            this.waitingForDraw = true;
            await new Promise(r => setTimeout(r, 500))
        }
        this.waitingForDraw = false;

        let squaresToDraw = Math.round(((newValue - this.initialValue) / (this.maxValue - this.initialValue)) * (this.maxSquares - 0) + 0)
        
        if (squaresToDraw === this.squaresDrawn) return;
        if (squaresToDraw < this.squaresDrawn) {
            this.reinitRng()
            this.reinitFreePositions()
            this.clearCanvas()
        }
        else squaresToDraw -= this.squaresDrawn

        Array.from(
            { length: squaresToDraw },
            this.getFreeSquare.bind(this)
        ).forEach(this.drawSquare.bind(this))

    }

    /** Sets current value of progress (can't be above max). Returns current progress value or undefined if value is incorrect */
    value(newValue: number) {
        const oldValue = this.currentValue;
        this.currentValue = Math.min(Math.max(newValue, this.initialValue), this.maxValue)

        this.onValueChange(oldValue, this.currentValue)
        return this.currentValue
    }
}