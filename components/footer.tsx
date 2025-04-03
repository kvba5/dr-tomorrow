import Link from "next/link";

export default function Footer() {
    return <footer className="text-neutral-600">
        <span>
            The page is not affiliated with <Link href="https://deltarune.com/" title="Deltarune">Deltarune</Link>/<Link href="https://undertale.com/" title="Undertale">Undertale</Link> creators in any way.<br />
            All assets in here were used in a good will and don&apos;t try to immitate any other property.
        </span>
    </footer>
}