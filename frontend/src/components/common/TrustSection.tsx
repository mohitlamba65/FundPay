import { ShieldCheck, Lock, Landmark, CheckCircle } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E7E5E4]">
      <div className="rounded-3xl bg-[#FAFAF8] border border-[#E7E5E4] p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-[#E7E5E4] text-[#16A34A] shadow-2xs">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#171717]">SEBI Regulated Custody</h4>
              <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                Your mutual funds remain safely with your respective AMCs and depository participants.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-[#E7E5E4] text-[#16A34A] shadow-2xs">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#171717]">256-Bit Bank Grade Security</h4>
              <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                Direct integration with official registrar APIs (CAMS & KFintech) via encrypted channels.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-[#E7E5E4] text-[#16A34A] shadow-2xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#171717]">RBI-Licensed NBFC Partners</h4>
              <p className="text-xs text-[#6B6B6B] mt-1 leading-relaxed">
                All credit facilities are disbursed through transparent, regulated institutional partners.
              </p>
            </div>
          </div>
        </div>

        {/* Partner Logos Strip (Neutral placeholders) */}
        <div className="mt-12 pt-8 border-t border-[#E7E5E4]/80 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#8A8A8A]">
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#16A34A]" /> HDFC Mutual Fund</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#16A34A]" /> ICICI Prudential</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#16A34A]" /> Nippon India</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#16A34A]" /> Parag Parikh Flexi Cap</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#16A34A]" /> CAMS & KFintech Integrated</span>
        </div>
      </div>
    </section>
  );
}
