import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How does mutual fund-backed EMI work?",
    a: "Instead of putting down cash or taking a high-interest credit card EMI, you mark a digital lien on your existing mutual fund units. These units act as collateral. They continue to sit in your demat/folio account and earn market returns and dividends.",
  },
  {
    q: "Do I have to sell or liquidate my mutual funds?",
    a: "No, absolutely not! That is the core advantage of FundPay. Your units are never redeemed or sold. You do not trigger any capital gains tax event. When you finish paying your EMIs, the digital lien is automatically removed.",
  },
  {
    q: "What happens if the market drops during my repayment tenure?",
    a: "FundPay maintains a healthy loan-to-value (LTV) margin (typically 50% for equity funds and 80% for debt funds). Short-term market fluctuations do not affect your purchase or monthly EMI as long as your regular monthly installments are paid on time.",
  },
  {
    q: "How is 0% effective interest possible?",
    a: "0% effective interest is achieved through two mechanisms: first, brand merchant subventions (cash discounts and cashback). Second, because your pledged mutual fund portfolio typically compounds at 12%–16% CAGR, the returns earned during your tenure offset the nominal loan cost.",
  },
  {
    q: "Can I prepay or foreclose my plan early?",
    a: "Yes! There are zero foreclosure fees and zero prepayment penalties. You can settle the remaining balance at any time, and the lien on your mutual funds will be released within 24 hours.",
  },
  {
    q: "How is the monthly installment debited?",
    a: "During paperless digital checkout, you set up an e-NACH / UPI Autopay mandate linked to your bank account. Your monthly EMI is debited automatically on your chosen date each month.",
  },
  {
    q: "Will this affect my CIBIL or credit score?",
    a: "Because this facility is secured against your verified mutual fund portfolio, eligibility approval does not require a hard credit inquiry. Timely repayments will also be reported to credit bureaus, actually helping boost your credit profile!",
  },
];

export function FaqSection() {
  return (
    <section id="faqs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#E7E5E4]">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#16A34A] bg-[#ECFDF3] px-3 py-1 rounded-full">
          Frequently Asked Questions
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171717] mt-3">
          Everything You Need to Know
        </h2>
        <p className="text-sm text-[#6B6B6B] mt-3">
          Clear, transparent answers to help you buy smart without pausing your wealth.
        </p>
      </div>

      <Accordion defaultValue={["item-0"]} className="w-full space-y-3">
        {FAQS.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-2xl border border-[#E7E5E4] bg-white px-6 py-1 transition-all hover:border-[#8A8A8A]"
          >
            <AccordionTrigger className="text-left text-sm font-bold text-[#171717] hover:no-underline py-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed pb-4 pt-1">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
