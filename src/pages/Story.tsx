import { Link, useParams } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getStory } from "@/data/stories";
import { buyTypeform } from "@/lib/typeform";
import { usePageTitle } from "@/hooks/use-page-title";

const Story = () => {
  const { slug } = useParams();
  const story = slug ? getStory(slug) : undefined;
  usePageTitle(story ? story.title : "Case study");

  if (!story) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-sm text-gray-500">
        Story not found.{" "}
        <Link to="/homes" className="underline ml-2">
          Browse homes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-[#1a1a1a]">
      <SiteHeader />
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-2">
            Case study · {story.area}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-3">{story.title}</h1>
          <p className="text-gray-600 font-serif italic text-lg mb-2">
            {story.subtitle}
          </p>
          <p className="text-sm text-gray-500 mb-10">
            {story.price} · {story.result}
          </p>
          <div className="aspect-[16/10] overflow-hidden mb-12">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
            {story.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <a
            href={buyTypeform("story")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1a1a1a] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-[#c9a84c]"
          >
            Get a home like this
          </a>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
};

export default Story;
