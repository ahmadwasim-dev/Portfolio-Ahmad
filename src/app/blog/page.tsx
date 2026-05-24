import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-8 sm:space-y-12">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Blog & Articles
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Thoughts, tutorials, and insights on mobile development, full-stack technologies, and software engineering.
          </p>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        {posts
          .sort((a, b) => {
            if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block cursor-pointer">
                <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)] hover:border-indigo-500/30">
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      <span>{formatDate(post.metadata.publishedAt)}</span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {post.metadata.title}
                      </h2>
                      {post.metadata.summary && (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2">
                          {post.metadata.summary}
                        </p>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </article>
              </Link>
            </BlurFade>
          ))}
      </div>
    </div>
  );
}
