import { getHighlights, getProfile } from "@/lib/db";
import BubbleBackground from "@/components/BubbleBackground";

const HighlightText = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <span key={index} className="bg-gradient-to-t from-[#7dd3fc]/80 to-transparent bg-[length:100%_45%] bg-bottom bg-no-repeat px-4 rounded-sm inline-block">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default async function Home() {
  const profile = await getProfile();
  const highlights = await getHighlights();

  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-bloom to-powder-blue px-24 py-48 text-warm-ink font-primary-font">
      {/* Background Clouds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[5%] w-[400px] opacity-60 animate-drift-slow drop-shadow-xl" style={{ animationDelay: '0s' }}>
          <path fill="url(#cloudGrad1)" d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1325 20.1754 10.1915 17.8569 10.0125C17.433 6.61205 14.5363 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2335 4.0114 11.4643 4.03357 11.6917C2.28581 12.3912 1 14.0954 1 16.1429C1 18.8253 3.17466 21 5.85714 21H17.5V19Z" />
          <defs>
            <linearGradient id="cloudGrad1" x1="12" y1="4" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.9" />
              <stop offset="1" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[35%] w-[500px] opacity-40 animate-drift-medium drop-shadow-lg" style={{ animationDelay: '-15s' }}>
          <path fill="url(#cloudGrad2)" d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1325 20.1754 10.1915 17.8569 10.0125C17.433 6.61205 14.5363 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2335 4.0114 11.4643 4.03357 11.6917C2.28581 12.3912 1 14.0954 1 16.1429C1 18.8253 3.17466 21 5.85714 21H17.5V19Z" />
          <defs>
            <linearGradient id="cloudGrad2" x1="12" y1="4" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.8" />
              <stop offset="1" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[65%] w-[350px] opacity-50 animate-drift-slow drop-shadow-2xl" style={{ animationDelay: '-30s' }}>
          <path fill="url(#cloudGrad3)" d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1325 20.1754 10.1915 17.8569 10.0125C17.433 6.61205 14.5363 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2335 4.0114 11.4643 4.03357 11.6917C2.28581 12.3912 1 14.0954 1 16.1429C1 18.8253 3.17466 21 5.85714 21H17.5V19Z" />
          <defs>
            <linearGradient id="cloudGrad3" x1="12" y1="4" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.9" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <BubbleBackground />

      {/* 자기소개 전체 화면: 학생들이 이름, 소속, 설명을 바꿔보는 첫 실습 영역 */}
      <section className="relative z-10 mx-auto max-w-4xl bg-white/40 backdrop-blur-xl p-48 rounded-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.05),_inset_0_4px_16px_rgba(255,255,255,0.8)] border border-white/60">
        <div className="grid gap-48 md:grid-cols-[280px_1fr] md:items-center">
          {/* 프로필 사진 영역: public/images/ohtani.jpeg 파일을 화면에 보여줌 */}
          <img
            src={profile.image_path}
            alt={`${profile.name} 프로필 사진`}
            className="w-full object-cover rounded-[32px] shadow-[0_4px_16px_rgba(0,0,0,0.1),_inset_0_2px_8px_rgba(255,255,255,0.5)] border border-white/50"
            style={{ height: "280px" }}
          />

          <div>
            <p className="inline-block bg-white/60 backdrop-blur-md px-12 py-4 text-caption font-button-font font-bold text-true-black uppercase tracking-widest rounded-full leading-caption shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] border border-white/80">PNU student profile</p>
            <h1 className="mt-24 text-display font-display-sans font-bold text-true-black leading-display drop-shadow-sm"><HighlightText text={profile.name} /></h1>
            <p className="mt-16 text-body-lg text-warm-ink opacity-80 font-tertiary-sans leading-body-lg"><HighlightText text={profile.tagline} /></p>
          </div>
        </div>

        {/* 기본 정보 카드: 바이브 코딩으로 가장 바꾸기 쉬운 데이터 영역 */}
        <div className="mt-48 grid gap-24 sm:grid-cols-2">
          <div className="bg-white/40 backdrop-blur-lg p-24 rounded-[32px] shadow-[0_4px_12px_rgba(0,0,0,0.02),_inset_0_2px_12px_rgba(255,255,255,0.9)] border border-white/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/50 active:scale-95 active:shadow-[inset_0_12px_24px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(255,255,255,0.2)] active:bg-white/20 select-none">
            <p className="text-caption font-tertiary-font font-medium text-warm-ink opacity-70 uppercase tracking-widest leading-caption">이름</p>
            <p className="mt-8 text-heading-sm font-heading-font font-bold text-warm-ink leading-heading-sm"><HighlightText text={profile.name} /></p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg p-24 rounded-[32px] shadow-[0_4px_12px_rgba(0,0,0,0.02),_inset_0_2px_12px_rgba(255,255,255,0.9)] border border-white/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/50 active:scale-95 active:shadow-[inset_0_12px_24px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(255,255,255,0.2)] active:bg-white/20 select-none">
            <p className="text-caption font-tertiary-font font-medium text-warm-ink opacity-70 uppercase tracking-widest leading-caption">소속</p>
            <p className="mt-8 text-heading-sm font-heading-font font-bold text-warm-ink leading-heading-sm"><HighlightText text={profile.team} /></p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg p-24 rounded-[32px] shadow-[0_4px_12px_rgba(0,0,0,0.02),_inset_0_2px_12px_rgba(255,255,255,0.9)] border border-white/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/50 active:scale-95 active:shadow-[inset_0_12px_24px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(255,255,255,0.2)] active:bg-white/20 select-none">
            <p className="text-caption font-tertiary-font font-medium text-warm-ink opacity-70 uppercase tracking-widest leading-caption">직업</p>
            <p className="mt-8 text-heading-sm font-heading-font font-bold text-warm-ink leading-heading-sm"><HighlightText text={profile.position} /></p>
          </div>
          <div className="bg-white/40 backdrop-blur-lg p-24 rounded-[32px] shadow-[0_4px_12px_rgba(0,0,0,0.02),_inset_0_2px_12px_rgba(255,255,255,0.9)] border border-white/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:bg-white/50 active:scale-95 active:shadow-[inset_0_12px_24px_rgba(0,0,0,0.1),_inset_0_2px_4px_rgba(255,255,255,0.2)] active:bg-white/20 select-none">
            <p className="text-caption font-tertiary-font font-medium text-warm-ink opacity-70 uppercase tracking-widest leading-caption">학번</p>
            <p className="mt-8 text-heading-sm font-heading-font font-bold text-warm-ink leading-heading-sm"><HighlightText text={profile.uniform_number} /></p>
          </div>
        </div>

        {/* 소개 문장 영역: 학생들이 문구와 스타일을 바꾸는 연습용 섹션 */}
        <div className="mt-48 bg-white/50 backdrop-blur-xl p-32 rounded-[32px] shadow-[0_4px_16px_rgba(0,0,0,0.03),_inset_0_4px_16px_rgba(255,255,255,1)] border border-white/60 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:bg-white/60 active:scale-95 active:shadow-[inset_0_12px_24px_rgba(0,0,0,0.08),_inset_0_2px_4px_rgba(255,255,255,0.3)] active:bg-white/30 select-none">
          <h2 className="text-heading-lg font-primary-sans-custom-serif-influenced-grotesque font-bold text-true-black leading-heading-lg">자기소개</h2>
          <p className="mt-24 text-body-lg text-warm-ink font-tertiary-sans leading-body-lg">
            <HighlightText text={profile.introduction} />
          </p>
        </div>

        {/* 좋아하는 것 목록: 항목 추가/삭제 실습에 쓰기 좋은 영역 */}
        <div className="mt-48">
          <h2 className="text-heading-lg font-primary-sans-custom-serif-influenced-grotesque font-bold text-true-black leading-heading-lg drop-shadow-sm">특징</h2>
          <div className="mt-24 grid gap-16 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="bg-white/50 backdrop-blur-md px-24 py-16 text-center text-body font-button-font font-bold text-warm-ink rounded-full leading-body shadow-[0_2px_8px_rgba(0,0,0,0.05),_inset_0_2px_8px_rgba(255,255,255,0.9)] border border-white/70 hover:scale-105 active:scale-90 active:shadow-[inset_0_8px_16px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.2)] active:bg-white/30 transition-all duration-200 cursor-pointer select-none">
                {highlight.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
