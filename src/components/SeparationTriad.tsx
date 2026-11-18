import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Landmark, Building2, ArrowLeftRight } from 'lucide-react';

interface BranchNode {
  id: 'legislative' | 'executive' | 'judicial';
  name: string;
  organ: string;
  role: string;
  checksOnOthers: string[];
  cooperation: string;
  accentClass: string;
  icon: typeof Landmark;
}

const BRANCHES: BranchNode[] = [
  {
    id: 'legislative',
    name: 'Qonun chiqaruvchi hokimiyat',
    organ: 'Parlament (Oliy Majlis)',
    role: 'Umumxalq vakillik organi sifatida qonunlar qabul qiladi, davlat byudjetini tasdiqlaydi va strategik yo‘nalishlarni belgilaydi.',
    checksOnOthers: [
      'Ijro hokimiyati ustidan parlament nazorati va hisobot eshitish',
      'Prezident vetosini malakali ko‘pchilik (2/3) ovoz bilan yengib o‘tish',
      'Byudjetni tasdiqlash orqali moliyaviy nazorat (“Hamyon qudrati”)',
      'Oliy sudyalarni saylash/tasdiqlash va impichment jarayoni',
    ],
    cooperation:
      'Hukumat va Oliy sud kiritgan qonun loyihalarini ko‘rib chiqadi hamda mamlakat taraqqiyoti uchun huquqiy asos yaratadi.',
    accentClass: 'text-sky-600 dark:text-sky-300',
    icon: Landmark,
  },
  {
    id: 'executive',
    name: 'Ijro etuvchi hokimiyat',
    organ: 'Prezident va Hukumat (Vazirlar Mahkamasi)',
    role: 'Qabul qilingan qonunlarni amalda ijro etadi, iqtisodiyot, ijtimoiy soha, xavfsizlik va tashqi siyosatni boshqaradi.',
    checksOnOthers: [
      'Qabul qilingan qonunlarga kechiktiruvchi VETO qo‘yish huquqi',
      'Qonunchilik tashabbusi bilan parlamentga loyihalar kiritish',
      'Ayrim tizimlarda parlamentni muddatidan oldin tarqatish tashabbusi',
      'Sud qarorlarining majburiy ijrosini davlat apparati orqali ta’minlash',
    ],
    cooperation:
      'Parlamentga yillik byudjet loyihasi va islohot dasturlarini taqdim etadi, ijro intizomi bo‘yicha hisobot beradi.',
    accentClass: 'text-indigo-600 dark:text-indigo-300',
    icon: Building2,
  },
  {
    id: 'judicial',
    name: 'Sud hokimiyati',
    organ: 'Konstitutsiyaviy sud va Oliy sudlar tizimi',
    role: 'Qonunlar va qarorlarning Konstitutsiyaga muvofiqligini tekshiradi, nizolarni xolis hal qilib odil sudlovni amalga oshiradi.',
    checksOnOthers: [
      'Konstitutsiyaga zid qonunlar va hukumat qarorlarini haqiqiy emas deb topish',
      'Ijro organlarining noqonuniy hujjatlarini ma’muriy sud orqali bekor qilish',
      'Qonunlarga rasmiy sharh berish va inson huquqlarini himoya qilish',
      'Impichment jarayonida huquqiy xulosa va konstitutsiyaviy baho berish',
    ],
    cooperation:
      'Sud amaliyotidagi muammolar asosida qonunlarni takomillashtirish yuzasidan parlamentga takliflar kiritadi.',
    accentClass: 'text-teal-600 dark:text-teal-300',
    icon: Scale,
  },
];

export function SeparationTriad() {
  const [selectedId, setSelectedId] = useState<BranchNode['id']>('legislative');
  const activeBranch = BRANCHES.find((b) => b.id === selectedId) ?? BRANCHES[0];
  const ActiveIcon = activeBranch.icon;

  return (
    <section
      aria-labelledby="triad-heading"
      className="space-y-5"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-1">
        <div>
          <p className="text-xs font-medium text-sky-600 dark:text-sky-300 mb-1">
            Interaktiv sxema · Tiyib turish va hamkorlik
          </p>
          <h2
            id="triad-heading"
            className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            Uchta hokimiyat tarmog‘i qanday muvozanat saqlaydi?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md">
          Har bir tarmoqni bosing va uning boshqa tarmoqlarni tiyib turish hamda hamkorlik qilish mexanizmlarini ko‘ring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Interactive Triad Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          {BRANCHES.map((branch, idx) => {
            const Icon = branch.icon;
            const isSelected = branch.id === selectedId;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => setSelectedId(branch.id)}
                aria-pressed={isSelected}
                className={`text-left rounded-2xl p-4 sm:p-5 transition-all duration-200 flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? 'liquid-glass border-sky-400/60 dark:border-sky-300/45 shadow-lg shadow-sky-900/15 scale-[1.01]'
                    : 'liquid-glass-subtle hover:bg-white/65 dark:hover:bg-white/10'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-slate-900/5 dark:bg-white/10 ${branch.accentClass}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono">0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{branch.organ}</span>
                  </div>
                  <div className="font-display text-base font-semibold text-slate-900 dark:text-white mt-0.5">
                    {branch.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Animated Detail Stage */}
        <div className="lg:col-span-7 liquid-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBranch.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/20 ${activeBranch.accentClass}`}
                >
                  <ActiveIcon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {activeBranch.organ}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {activeBranch.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
                {activeBranch.role}
              </p>

              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tiyib turish va nazorat dastaklari</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeBranch.checksOnOthers.map((item, i) => (
                    <li
                      key={i}
                      className="rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-snug bg-white/55 dark:bg-white/5 border border-slate-900/5 dark:border-white/10 text-slate-800 dark:text-slate-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-900/10 dark:border-white/10 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">
                  O‘zaro hamkorlik:{' '}
                </span>
                {activeBranch.cooperation}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
