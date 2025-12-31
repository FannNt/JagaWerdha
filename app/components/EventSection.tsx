"use client";
import * as motion from "framer-motion/client";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

const events = [
  {
    title: "Senam Pagi Bersama",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    category: "Olahraga",
    date: "Senin, 67 Januari",
    location: "Taman Kota"
  },
  {
    title: "Diskusi Gizi Lansia",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
    category: "Seminar",
    date: "Senin, 69 Januari",
    location: "Gedung Pusat"
  }
];

export default function EventSection() {
    return (
        <section className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">        
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-20"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="h-px w-8 bg-light-brown/30" />
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-sage">Agenda Komunitas</span>
                        <div className="h-px w-8 bg-light-brown/30" />
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-dark-slate mb-8 tracking-tight">
                        Ikuti <span className="font-serif italic text-sage">Event</span> Kami
                    </h2>
                    
                    <p className="text-base md:text-lg text-dark-slate/60 font-light max-w-2xl mx-auto">
                        Jalin silaturahmi melalui berbagai agenda kegiatan yang dirancang 
                        khusus agar tetap aman dan produktif bagi orang tua.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full mb-16 px-2 sm:px-0">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[300px] md:h-[350px] rounded-[32px] overflow-hidden border border-sage/10 shadow-lg shadow-sage/5 cursor-pointer"
                        >
                            <img 
                                src={event.image} 
                                alt={event.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/90 via-dark-slate/30 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-8 text-left translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="inline-block px-4 py-1.5 bg-sage/30 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4 border border-white/10">
                                    {event.category}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 group-hover:text-sage transition-colors leading-tight">
                                    {event.title}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-sage" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-sage" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-shiny px-10 py-4 bg-sage text-white text-md font-bold rounded-xl shadow-2xl shadow-sage/20 flex items-center gap-3 transition-all"
                >
                    Lihat Semua Agenda
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
            </div>
        </section>
    );
}
