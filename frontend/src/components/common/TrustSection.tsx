import { ShieldCheck, Lock, Landmark, CheckCircle } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5E0EA]">
      <div className="rounded-[28px] bg-[#F8F4FF] border border-[#DCC9F5] p-8 sm:p-12 shadow-1fi-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-white border border-[#DCC9F5] text-[#6D28D9] shadow-xs">
              <Landmark className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-[17px] font-bold text-[#050505]">SEBI Regulated Custody</h4>
              <p className="text-[13px] text-[#444444] mt-1 leading-relaxed">
                Your mutual funds remain safely in your name with respective AMCs and depository participants.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-white border border-[#DCC9F5] text-[#6D28D9] shadow-xs">
              <Lock className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-[17px] font-bold text-[#050505]">256-Bit Bank Grade Security</h4>
              <p className="text-[13px] text-[#444444] mt-1 leading-relaxed">
                Direct integration with official registrar APIs (CAMS & KFintech) via encrypted channels.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-white border border-[#DCC9F5] text-[#6D28D9] shadow-xs">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-[17px] font-bold text-[#050505]">RBI-Licensed NBFC Partners</h4>
              <p className="text-[13px] text-[#444444] mt-1 leading-relaxed">
                All credit facilities are disbursed through transparent, regulated institutional partners.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#DCC9F5]/70 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#777777]">
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#20D66B]" /> HDFC Mutual Fund</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#20D66B]" /> ICICI Prudential</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#20D66B]" /> Nippon India</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#20D66B]" /> Parag Parikh Flexi Cap</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#20D66B]" /> CAMS & KFintech Integrated</span>
        </div>
      </div>
    </section>
  );
}
