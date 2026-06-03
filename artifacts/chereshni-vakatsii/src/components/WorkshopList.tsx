import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workshops, WorkshopItem } from "../data";
import { MapPin, Users, UserPlus, ShieldAlert, Search, X } from "lucide-react";
import { Input } from "./ui/input";

function PosterModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative max-w-2xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={src}
            alt="Постер"
            className="w-full h-auto object-contain max-h-[90vh]"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function WorkshopCard({ item, index }: { item: WorkshopItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);

  const posterSrc = item.posterImage
    ? `/experts/${encodeURIComponent(item.posterImage)}`
    : null;

  return (
    <>
      {posterOpen && posterSrc && (
        <PosterModal src={posterSrc} onClose={() => setPosterOpen(false)} />
      )}

      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: (index % 5) * 0.05 }}
        onClick={() => setExpanded(!expanded)}
        className="bg-card border border-border/50 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />

        <div className="flex flex-wrap gap-2 mb-3">
          {item.category && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
              {item.category}
            </span>
          )}
        </div>

        <h4 className="text-lg md:text-xl font-medium text-primary mb-4 leading-tight group-hover:text-secondary transition-colors">
          {item.title}
        </h4>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-2 pb-2 text-sm border-t border-border/50 mt-4">
                <div className="flex items-start gap-2.5 text-muted-foreground">
                  <Users className="w-4 h-4 mt-0.5 text-secondary/70 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-medium text-foreground block text-xs uppercase tracking-wider mb-1">
                      Експерт(и)
                    </span>
                    {posterSrc ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPosterOpen(true);
                        }}
                        className="text-left text-secondary hover:text-primary underline underline-offset-2 transition-colors flex items-center gap-2 group/poster"
                      >
                        <img
                          src={posterSrc}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover shadow-sm group-hover/poster:scale-105 transition-transform flex-shrink-0"
                        />
                        <span>{item.expert}</span>
                      </button>
                    ) : (
                      <span>{item.expert}</span>
                    )}
                  </div>
                </div>

                {item.assistant && (
                  <div className="flex items-start gap-2.5 text-muted-foreground">
                    <UserPlus className="w-4 h-4 mt-0.5 text-secondary/70 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-foreground block text-xs uppercase tracking-wider mb-0.5">
                        Асистент(и)
                      </span>
                      {item.assistant}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mt-2">
                  {item.room && (
                    <div className="flex items-start gap-2.5 text-muted-foreground bg-muted/30 p-2 rounded-lg">
                      <MapPin className="w-4 h-4 mt-0.5 text-secondary/70 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground block text-[10px] uppercase tracking-wider">
                          Кабінет
                        </span>
                        {item.room}
                      </div>
                    </div>
                  )}

                  {item.shelter && (
                    <div className="flex items-start gap-2.5 text-muted-foreground bg-muted/30 p-2 rounded-lg">
                      <ShieldAlert className="w-4 h-4 mt-0.5 text-secondary/70 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground block text-[10px] uppercase tracking-wider">
                          Укриття
                        </span>
                        {item.shelter}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between text-xs font-medium text-muted-foreground border-t border-border/30 pt-4">
          {posterSrc ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPosterOpen(true);
              }}
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors group/btn"
            >
              <img
                src={posterSrc}
                alt=""
                className="w-7 h-7 rounded-md object-cover shadow-sm group-hover/btn:scale-105 transition-transform"
              />
              <span>
                {item.expert.split(",")[0]}
                {item.expert.includes(",") ? " та інші" : ""}
              </span>
            </button>
          ) : (
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {item.expert.split(",")[0]}
              {item.expert.includes(",") ? " та інші" : ""}
            </span>
          )}
          <span className="text-secondary group-hover:translate-x-1 transition-transform">
            {expanded ? "Згорнути" : "Детальніше →"}
          </span>
        </div>
      </motion.div>
    </>
  );
}

export function WorkshopList() {
  const [search, setSearch] = useState("");
  const [activeSession, setActiveSession] = useState<1 | 2>(1);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter((w) => {
      const matchesSession = w.session === activeSession;
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        w.title.toLowerCase().includes(term) ||
        w.expert.toLowerCase().includes(term) ||
        (w.category && w.category.toLowerCase().includes(term));

      return matchesSession && matchesSearch;
    });
  }, [search, activeSession]);

  return (
    <section id="workshops" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
              Майстерки
            </h2>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              Оберіть сесію та знайдіть цікаві теми
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук за темою чи спікером..."
              className="pl-9 bg-card border-secondary/20 focus-visible:ring-secondary/30"
            />
          </div>
        </div>

        <div className="flex p-1 bg-muted/50 rounded-xl mb-10 w-fit">
          <button
            onClick={() => setActiveSession(1)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeSession === 1
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Сесія 1{" "}
            <span className="opacity-60 font-normal ml-1">(10:30–11:40)</span>
          </button>
          <button
            onClick={() => setActiveSession(2)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeSession === 2
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Сесія 2{" "}
            <span className="opacity-60 font-normal ml-1">(14:00–15:10)</span>
          </button>
        </div>
      </motion.div>

      <div className="mb-6 font-medium text-lg text-secondary">
        {activeSession === 1
          ? '"Тут народжуються ідеї"'
          : '"Черешневі історії: з турботою про себе"'}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredWorkshops.map((item, index) => (
            <WorkshopCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredWorkshops.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          <div className="text-4xl mb-4 opacity-50">🍒</div>
          <p>За вашим запитом нічого не знайдено.</p>
          <button
            onClick={() => setSearch("")}
            className="text-secondary mt-2 underline underline-offset-4 hover:opacity-80"
          >
            Скинути пошук
          </button>
        </div>
      )}
    </section>
  );
}
