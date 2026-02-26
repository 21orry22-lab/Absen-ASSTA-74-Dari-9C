import { useDailyQuote } from '@/hooks/useDailyQuote';
import { RefreshCw, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function DailyQuote() {
  const { quote, isLoaded, refreshQuote } = useDailyQuote();

  if (!isLoaded || !quote) {
    return (
      <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 animate-pulse">
        <div className="h-20 bg-amber-200/30 rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-200/50 shadow-gold"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400 rounded-full blur-2xl" />
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pattern-islamic" />

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Quote className="w-4 h-4 text-amber-900" />
            </div>
            <span className="text-sm font-medium text-amber-700">Motivasi Harian</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshQuote}
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-100/50"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            <span className="text-xs">Perbarui</span>
          </Button>
        </div>

        {/* Quote Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quote.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <blockquote className="text-lg sm:text-xl font-medium text-amber-900 leading-relaxed mb-4 font-serif">
              "{quote.text}"
            </blockquote>
            <div className="flex items-center gap-2 text-sm text-amber-700/70">
              <span className="font-medium">{quote.author}</span>
              <span className="text-amber-400">•</span>
              <span className="text-xs bg-amber-100 px-2 py-0.5 rounded-full">{quote.source}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-amber-200/30 text-6xl font-serif leading-none">
          ❝
        </div>
        <div className="absolute bottom-4 left-4 text-amber-200/30 text-6xl font-serif leading-none rotate-180">
          ❝
        </div>
      </div>
    </motion.div>
  );
}
