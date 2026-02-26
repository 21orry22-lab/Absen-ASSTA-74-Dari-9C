import { useState, useEffect, useCallback } from 'react';
import type { DailyQuote } from '@/types';

const QUOTE_KEY = 'sipintar_daily_quote';
const LAST_UPDATE_KEY = 'sipintar_last_quote_update';

const islamicQuotes = [
  {
    text: "Sesungguhnya Allah menyukai orang-orang yang bertawakal.",
    author: "QS. Ali Imran: 159",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang bersungguh-sungguh, maka baginya ada jalan.",
    author: "HR. Bukhari",
    source: "Hadits"
  },
  {
    text: "Waktu adalah pedang. Memotongmu jika kamu tidak memanfaatkannya.",
    author: "HR. Muslim",
    source: "Hadits"
  },
  {
    text: "Barang siapa yang menempuh jalan mencari ilmu, Allah akan memudahkan baginya jalan ke surga.",
    author: "HR. Muslim",
    source: "Hadits"
  },
  {
    text: "Orang yang paling sempurna imannya adalah yang paling baik akhlaknya.",
    author: "HR. Tirmidzi",
    source: "Hadits"
  },
  {
    text: "Tidak ada penyakit yang Allah turunkan kecuali diturunkan pula obatnya.",
    author: "HR. Bukhari",
    source: "Hadits"
  },
  {
    text: "Barang siapa yang berbuat kebaikan seberat zarah, niscaya dia akan melihat balasannya.",
    author: "QS. Az-Zalzalah: 7-8",
    source: "Al-Qur'an"
  },
  {
    text: "Dan barang siapa yang bertakwa kepada Allah, niscaya Allah menjadikan baginya kemudahan dalam urusannya.",
    author: "QS. At-Talaq: 4",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang memudahkan urusan orang lain, Allah akan memudahkan urusannya di dunia dan akhirat.",
    author: "HR. Muslim",
    source: "Hadits"
  },
  {
    text: "Kebajikan tidaklah dihapuskan oleh keburukan. Balaslah keburukan dengan kebajikan.",
    author: "QS. Fussilat: 34",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.",
    author: "HR. Bukhari & Muslim",
    source: "Hadits"
  },
  {
    text: "Sesungguhnya bersama kesulitan ada kemudahan.",
    author: "QS. Al-Insyirah: 6",
    source: "Al-Qur'an"
  },
  {
    text: "Dan mintalah pertolongan kepada Allah dengan sabar dan shalat.",
    author: "QS. Al-Baqarah: 45",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang tidak bersyukur kepada manusia, tidak bersyukur kepada Allah.",
    author: "HR. Tirmidzi",
    source: "Hadits"
  },
  {
    text: "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia.",
    author: "HR. Ahmad",
    source: "Hadits"
  },
  {
    text: "Barang siapa yang berbuat jahat seberat zarah, niscaya dia akan melihat balasannya.",
    author: "QS. Az-Zalzalah: 8",
    source: "Al-Qur'an"
  },
  {
    text: "Dan Allah tidak akan menyia-nyiakan pahala orang-orang yang berbuat kebaikan.",
    author: "QS. At-Taubah: 120",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang menunjukkan kepada kebaikan, maka baginya pahala seperti pahala orang yang mengerjakannya.",
    author: "HR. Muslim",
    source: "Hadits"
  },
  {
    text: "Sesungguhnya shalat itu mencegah dari perbuatan keji dan mungkar.",
    author: "QS. Al-Ankabut: 45",
    source: "Al-Qur'an"
  },
  {
    text: "Dan bertawakallah kepada Allah jika kamu beriman.",
    author: "QS. Al-Maidah: 23",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang berbuat baik bagi dirinya, dan barang siapa yang berbuat jahat, maka (kejahatan) itu bagi dirinya.",
    author: "QS. Fussilat: 46",
    source: "Al-Qur'an"
  },
  {
    text: "Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sehingga mereka mengubah keadaan yang ada pada diri mereka sendiri.",
    author: "QS. Ar-Ra'd: 11",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang bertakwa kepada Allah, Allah akan memberinya jalan keluar.",
    author: "QS. At-Talaq: 2",
    source: "Al-Qur'an"
  },
  {
    text: "Dan ridha Allah ada pada ridha orang tua, dan kemurkaan Allah ada pada kemurkaan orang tua.",
    author: "HR. Tirmidzi",
    source: "Hadits"
  },
  {
    text: "Barang siapa yang menjaga shalatnya, maka shalat itu akan menjadi cahaya baginya di hari kiamat.",
    author: "HR. Ahmad",
    source: "Hadits"
  },
  {
    text: "Dan sesungguhnya akhirat itu lebih baik bagimu daripada yang permulaan.",
    author: "QS. Ad-Duha: 4",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang membangunkan saudaranya dari tidurnya, maka Allah akan memberinya pahala shalat malam.",
    author: "HR. Thabrani",
    source: "Hadits"
  },
  {
    text: "Dan berlomba-lombalah kamu dalam berbuat kebaikan.",
    author: "QS. Al-Baqarah: 148",
    source: "Al-Qur'an"
  },
  {
    text: "Barang siapa yang memudahkan urusan orang lain, Allah akan memudahkan urusannya.",
    author: "HR. Bukhari",
    source: "Hadits"
  },
  {
    text: "Sesungguhnya Allah bersama orang-orang yang sabar.",
    author: "QS. Al-Baqarah: 153",
    source: "Al-Qur'an"
  }
];

function getRandomQuote(): Omit<DailyQuote, 'lastUpdated'> {
  const randomIndex = Math.floor(Math.random() * islamicQuotes.length);
  return islamicQuotes[randomIndex];
}

function shouldUpdateQuote(): boolean {
  const lastUpdate = localStorage.getItem(LAST_UPDATE_KEY);
  if (!lastUpdate) return true;

  const lastUpdateDate = new Date(lastUpdate);
  const now = new Date();
  
  // Check if it's past 7 AM and last update was before 7 AM today
  const sevenAMToday = new Date(now);
  sevenAMToday.setHours(7, 0, 0, 0);
  
  return now >= sevenAMToday && lastUpdateDate < sevenAMToday;
}

export function useDailyQuote() {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateQuote = useCallback(() => {
    const newQuote = {
      ...getRandomQuote(),
      lastUpdated: new Date().toISOString(),
    };
    setQuote(newQuote);
    localStorage.setItem(QUOTE_KEY, JSON.stringify(newQuote));
    localStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString());
  }, []);

  useEffect(() => {
    const savedQuote = localStorage.getItem(QUOTE_KEY);
    
    if (shouldUpdateQuote()) {
      updateQuote();
    } else if (savedQuote) {
      setQuote(JSON.parse(savedQuote));
    } else {
      updateQuote();
    }
    setIsLoaded(true);
  }, [updateQuote]);

  // Check every minute if it's time to update
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      if (shouldUpdateQuote()) {
        updateQuote();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isLoaded, updateQuote]);

  const refreshQuote = useCallback(() => {
    updateQuote();
  }, [updateQuote]);

  return {
    quote,
    isLoaded,
    refreshQuote,
  };
}
