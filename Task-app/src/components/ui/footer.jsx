import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="py-6 px-4 bg-background text-muted-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          Built by{" "}
          <a href={siteConfig.links.twitter} className="underline">
            {siteConfig.name}
          </a>
          . Source on{" "}
          <a href={siteConfig.links.github} className="underline">
            GitHub
          </a>
          .
        </p>
        {/* Add extra columns, social icons, newsletter, etc. as needed */}
      </div>
    </footer>
  )
}
