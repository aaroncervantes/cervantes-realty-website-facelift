import { MapPin } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";

const reviews = [
  {
    text: "He negotiated $130k OVER asking price with their strategy and I had to cover NO closing costs. Insane.",
    author: "Leo A.",
    time: "1 month ago",
  },
  {
    text: "Responded within minutes, day or night. Truly client-first experience.",
    author: "Araceli T.",
    time: "6 mos ago",
  },
  {
    text: "Sold our home in 6 days above asking. Aaron knows exactly what buyers want.",
    author: "Michael S.",
    time: "8 mos ago",
  },
];

const dreamTeam = [
  "Lender",
  "Inspector",
  "Trans. Coord.",
  "Escrow",
  "Buyer's Agent",
  "Contractor",
];

export function CompetitiveEdge() {
  return (
    <section className="py-12 md:py-16 bg-[#f7f5f2] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1000px]">
        <div className="text-center mb-10">
          <p className="text-[#c9a84c] font-semibold text-[10px] uppercase tracking-widest mb-2">
            Your Competitive Edge
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-[#1a1a1a] mb-3 tracking-tight">
            Here's What Puts
            <br />
            Our Clients Ahead.
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm font-serif italic">
            Experience, local knowledge, a clear process, and the right
            connections — every advantage working for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          <div className="flex flex-col gap-3">
            <div className="bg-[#1a1a1a] text-white rounded-2xl p-4 flex flex-col items-center justify-center text-center h-28 shadow-sm">
              <h3 className="text-4xl font-bold mb-1">
                <AnimatedNumber end={7} suffix="+" />
              </h3>
              <p className="text-[9px] tracking-widest text-[#c9a84c] uppercase font-semibold">
                Families Served - Year one
              </p>
            </div>
            <div className="bg-white rounded-2xl p-3 flex flex-col gap-1.5 shadow-sm border border-gray-100 h-28 justify-center">
              <div className="py-1 px-2 rounded-xl rounded-tl-sm self-start text-[8px] shadow-sm max-w-[85%] text-card-foreground bg-gray-100">
                Aaron — did we get the house?
              </div>
              <div className="text-[#1a1a1a] py-1 px-2 rounded-xl rounded-tr-sm self-end text-[8px] shadow-sm max-w-[85%] bg-[#007aff] text-border">
                WE GOT IT. 🎉 Offer accepted — closing in 21 days.
              </div>
              <div className="py-1 px-2 rounded-xl rounded-tl-sm self-start text-[8px] shadow-sm max-w-[85%] text-card-foreground bg-gray-100">
                I'm literally shaking right now 😭
              </div>
            </div>
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex-1 flex flex-col justify-center">
              <h4 className="font-bold text-[#1a1a1a] text-[10px] mb-2 text-center">
                Built-In Dream Team
              </h4>
              <div className="flex justify-between items-end px-0.5">
                {dreamTeam.map((role, i) => (
                  <div key={role} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-3 h-4 rounded-full ${
                        i === 0
                          ? "bg-[#4267b2]"
                          : i === 1
                            ? "bg-green-500"
                            : i === 2
                              ? "bg-purple-500"
                              : i === 3
                                ? "bg-teal-500"
                                : i === 4
                                  ? "bg-[#c9a84c]"
                                  : "bg-orange-500"
                      }`}
                    />
                    <span className="text-[6px] text-gray-500 text-center leading-tight font-medium max-w-[28px]">
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-[#4267b2]"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-bold text-[#1a1a1a] text-[10px]">Google</div>
                <div className="text-[9px] text-gray-500 font-medium">
                  Reviews
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="font-bold text-[#1a1a1a] text-[10px]">5.0</span>
                <div className="flex text-[#c9a84c] text-[8px]">★★★★★</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 relative z-10">
              {reviews.map((review) => (
                <div
                  key={review.author}
                  className="bg-[#fcfbf9] rounded-xl p-3 text-[10px] border border-gray-100 shadow-sm"
                >
                  <div className="text-[#c9a84c] text-[8px] mb-1.5 tracking-widest">
                    ★★★★★
                  </div>
                  <p className="italic text-gray-600 mb-2 leading-relaxed font-serif">
                    "{review.text}"
                  </p>
                  <div className="text-[9px]">
                    <span className="font-bold text-[#1a1a1a]">
                      {review.author}
                    </span>{" "}
                    <span className="text-gray-400 font-medium">
                      • {review.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden relative h-full min-h-[300px] shadow-sm">
            <img
              src="https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg"
              alt="Aaron Cervantes"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-serif font-medium text-lg mb-0.5">
                Aaron Cervantes
              </h3>
              <p className="text-[10px] text-[#c9a84c] uppercase tracking-widest font-semibold">
                Founder - Realtor
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-0.5 inline-block">
                    <AnimatedNumber end={3} suffix=".2k" />
                  </div>
                  <div className="text-[8px] tracking-widest bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent uppercase font-bold">
                    Followers - accross platforms
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                    <img
                      src="https://vibe.filesafe.space/1781750305487395093/attachments/bdcd5cd0-3bb2-4348-b853-264cfdc31428.jpg"
                      className="w-full h-full object-cover"
                      alt="Video thumbnail"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-300">
                    <img
                      src="https://vibe.filesafe.space/1781750305487395093/attachments/d9db571f-476b-481a-be0b-0bda41b21fa8.png"
                      className="w-full h-full object-cover"
                      alt="Socal's New Homes"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-gray-500 font-medium">
                Real estate content on Instagram, Tiktok, Facebook and others.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex-1 flex flex-col justify-center">
                  <div className="text-gray-400 uppercase tracking-widest mb-1.5 text-[6px] font-bold">
                    Multiple Offers
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-white py-0.5 px-1.5 rounded-md rounded-tr-sm self-end text-[6px] shadow-sm bg-[#007aff]">
                      Aaron how's the listing doing? 👀
                    </div>
                    <div className="bg-gray-100 text-[#1a1a1a] py-0.5 px-1.5 rounded-md rounded-tl-sm self-start text-[6px] shadow-sm font-medium">
                      7 offers in 48 hrs 🔥
                    </div>
                    <div className="text-white py-0.5 px-1.5 rounded-md rounded-tr-sm self-end text-[6px] shadow-sm bg-[#007aff]">
                      NO WAY 😱🙌
                    </div>
                    <div className="bg-[#fcfbf9] border border-gray-200 text-[#1a1a1a] py-0.5 px-1.5 rounded-md self-center text-center w-full mt-0.5 text-[6px] font-bold shadow-sm">
                      Best offer: $130K over asking 🏆
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center flex-1">
                  <div className="text-[10px] font-bold mb-0.5 text-[#1a1a1a]">
                    Digital-First
                  </div>
                  <div className="text-[8px] text-gray-500 mb-2 font-medium">
                    Sign docs from anywhere
                  </div>
                  <img
                    src="https://vibe.filesafe.space/1781750305487395093/attachments/f6e1ce09-764f-43a0-b16c-ce425c9f80d0.png"
                    alt="DocuSign"
                    className="h-16 w-auto object-contain mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-[#1a2b4c] text-white rounded-2xl p-3 shadow-sm flex-1 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-6 -mt-6 blur-xl" />
                  <div className="text-[6px] text-[#c9a84c] uppercase tracking-widest mb-1.5 flex items-center gap-1 font-bold relative z-10">
                    <span className="w-1 h-1 rounded-full bg-red-500 border border-white/20 shadow-sm" />
                    Bilingüe
                  </div>
                  <p className="italic font-serif text-[9px] mb-1 leading-snug relative z-10">
                    "Aaron nos trató como familia."
                  </p>
                  <p className="text-[6px] text-white/60 mb-1.5 relative z-10">
                    — He treated us like family.
                  </p>
                  <div className="mt-auto text-[6px] text-white/40 uppercase tracking-widest font-bold relative z-10">
                    Español • English
                  </div>
                </div>
                <div className="bg-gray-200 rounded-2xl overflow-hidden relative flex-1 shadow-sm border border-gray-100 min-h-[100px]">
                  <img
                    src="https://vibe.filesafe.space/1781750305487395093/assets/a2d6dc34-9014-475f-b651-82ec87e0074b.jpg"
                    alt="Map"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-[#4267b2]/10 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
                    <MapPin className="w-3 h-3 text-[#c9a84c]" />
                    <span className="text-[10px] font-bold tracking-wide drop-shadow-md">
                      Service Areas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
