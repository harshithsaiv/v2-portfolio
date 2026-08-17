import React from 'react';
import { Link } from 'react-router-dom';

const SectionHeading = ({ children, id }) => (
  <h2 id={id} className="text-2xl font-bold text-white mb-6 scroll-mt-24">
    {children}
  </h2>
);

const Callout = ({ title, children, tone = 'secondary' }) => {
  const toneClasses =
    tone === 'secondary'
      ? 'border-secondary/30 bg-secondary/5'
      : 'border-yellow-400/30 bg-yellow-400/5';
  const titleClasses = tone === 'secondary' ? 'text-secondary' : 'text-yellow-300';

  return (
    <div className={`border rounded-lg p-5 ${toneClasses}`}>
      {title && <p className={`font-medium mb-2 ${titleClasses}`}>{title}</p>}
      <div className="text-text-secondary text-sm leading-relaxed">{children}</div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex flex-col items-center text-center bg-gray-800/40 rounded-lg py-4 px-2">
    <span className="text-white text-xl md:text-2xl font-bold">{value}</span>
    <span className="text-text-secondary text-xs uppercase tracking-wide mt-1">{label}</span>
  </div>
);

const GutiskaLlama = () => {
  return (
    <div className="flex justify-center min-h-screen py-12">
      <div className="max-w-3xl w-full animate-fade-in px-4 lg:px-0">
        <nav className="mb-12 flex flex-wrap gap-4">
          <Link to="/" className="text-secondary hover:text-white transition-colors text-sm">
            ← Back home
          </Link>
          <Link to="/knowledge-base" className="text-secondary hover:text-white transition-colors text-sm">
            Knowledge Base
          </Link>
          <Link to="/now" className="text-secondary hover:text-white transition-colors text-sm">
            Now
          </Link>
          <Link to="/blog" className="text-secondary hover:text-white transition-colors text-sm font-medium">
            Blog
          </Link>
        </nav>

        {/* Hero */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/30">
              🚧 Work in progress
            </span>
            <span className="text-xs text-gray-400">
              {new Date('2026-08-16').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Gutiska-LLaMA: Teaching an Open LLM to Speak a Dead Language
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            𐍂𐌰𐌸𐌾𐍉𐌽 𐌲𐌿𐍄𐌹𐍃𐌺𐍉𐌽 — "to reckon in Gothic." A write-up of an ongoing attempt to adapt an open-source LLM
            to Gothic, the earliest attested Germanic language, extinct for roughly a thousand years.
          </p>
          <div className="h-px bg-gray-800 w-16 mt-6"></div>
        </header>

        <div className="mb-12 rounded-xl overflow-hidden bg-gray-900">
          <img
            src="/Gothic_image.png"
            alt="Gothic script and manuscript imagery"
            className="w-full max-h-[420px] object-cover"
          />
          <p className="text-xs text-gray-500 px-4 py-2 bg-black/30">
            The Gothic alphabet, devised by Bishop Wulfila in the 4th century CE to translate the Bible — the source
            of nearly everything we know about the language today.
          </p>
        </div>

        <article className="space-y-16 text-base text-text-secondary leading-relaxed">
          {/* Intro */}
          <section className="space-y-4">
            <p>
              I've been reading{' '}
              <a
                href="https://www.tensoic.com/blog/kannada-llama/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white underline"
              >
                Tensoic's Kannada-LLaMA write-up
              </a>{' '}
              on and off for a while — continually pre-training Llama on ~600M Kannada tokens, expanding the
              tokenizer's vocabulary from 32K to 49,420 to actually fit the script efficiently, then LoRA
              fine-tuning for chat. It's a clean template for "how do I get a frontier open model to speak my
              language" when that language is under-served but still <em>alive</em> — 44 million native speakers,
              news sites, Wikipedia, social media, decades of digitized text.
            </p>
            <p>
              I wanted to try the same idea under the opposite constraints. Instead of a low-resource living
              language, I'm going after a language with{' '}
              <strong className="text-white">zero living native speakers</strong> and a total surviving corpus that
              would fit on a few hundred printed pages: <strong className="text-white">Gothic</strong>, the
              language of the Goths, attested almost entirely through one 4th-century Bible translation.
            </p>
            <p>
              This post is less "here are our benchmark numbers" and more a running notebook — the plan, the data
              problem (which is the whole problem), and what's actually feasible with a corpus that's roughly
              five orders of magnitude smaller than what Kannada-LLaMA had to work with.
            </p>
          </section>

          {/* Why Gothic */}
          <section className="space-y-4">
            <SectionHeading id="why-gothic">Why Gothic, of all languages</SectionHeading>
            <p>
              Gothic is the oldest Germanic language we have any substantial written record of — centuries older
              than Old English or Old Norse. It was spoken by the Goths across Eastern and Southern Europe and
              largely died out by the 8th or 9th century, surviving longest as a fringe dialect on the Crimean
              peninsula (Crimean Gothic is attested in a handful of 16th-century word-lists and nothing more).
            </p>
            <p>
              Almost everything we know about it comes from Bishop Wulfila's 4th-century translation of the Bible
              from Greek — written in an alphabet he devised himself, derived from Greek, Latin, and Runic letters.
              That translation survives mostly through the <em>Codex Argenteus</em>, the "Silver Bible," plus a
              handful of palimpsests and fragments.
            </p>
            <Callout title="The honest motivation">
              This isn't really about producing a chatbot anyone will use — there's no Gothic-speaking audience to
              serve. It's a constraints problem: what does language modeling look like at the absolute floor of
              available data, and can the tooling built for living low-resource languages (tokenizer expansion,
              LoRA continual pre-training, cross-lingual transfer) be repurposed for computational historical
              linguistics — helping classicists and linguists work with dead languages instead of helping speakers
              use a living one.
            </Callout>
          </section>

          {/* The corpus problem */}
          <section className="space-y-6">
            <SectionHeading id="corpus">The corpus problem</SectionHeading>
            <p>
              Kannada-LLaMA's pre-training set was ~600 million tokens pulled from CulturaX. The entire surviving
              corpus of Gothic — every attested word, across every manuscript, fragment, and inscription ever
              found — is generally estimated at somewhere around{' '}
              <strong className="text-white">70,000–80,000 running words</strong>. That's the whole dataset. There
              is no "more Gothic text" to scrape.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Kannada tokens" value="~600M" />
              <Stat label="Gothic words (total)" value="~75K" />
              <Stat label="Native speakers" value="0" />
              <Stat label="Primary source" value="1 codex" />
            </div>

            <p>That corpus breaks down roughly like this:</p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>
                <span className="text-white">Codex Argenteus</span> — the bulk of it, roughly half of the four
                Gospels, held at Uppsala University.
              </li>
              <li>
                <span className="text-white">Codices Ambrosiani & Codex Carolinus</span> — palimpsest fragments
                covering parts of the Pauline epistles, a fragment of Nehemiah, and the only non-Biblical text of
                any length we have: the <em>Skeireins</em>, a commentary on the Gospel of John.
              </li>
              <li>
                <span className="text-white">Minor fragments</span> — the Gothic calendar, a handful of legal
                deeds and inscriptions (the Bologna fragment, Naples deeds, a few runic-adjacent finds).
              </li>
            </ul>
            <p>
              Two things fall out of this immediately. First, byte-level BPE trained directly on Gothic text will
              badly under-fit — there isn't enough signal to learn good subword statistics for a script this rare.
              Second, unsupervised continual pre-training the way Kannada-LLaMA did it just doesn't have enough
              mass to shift a 7B-parameter model's distribution in any meaningful way. The approach has to lean on
              structure the corpus doesn't have in bulk: parallel text and grammar.
            </p>
          </section>

          {/* Tokenizer */}
          <section className="space-y-4">
            <SectionHeading id="tokenizer">Tokenizer: script coverage before anything else</SectionHeading>
            <p>
              Gothic script occupies its own Unicode block (U+10330–U+1034F). Llama's base tokenizer has never
              seen it, so every Gothic character gets shredded into multi-byte UTF-8 fallback tokens — the same
              problem Kannada text had against the base 32K vocabulary, just worse, since there's no byte-pair
              frequency data at scale to learn merges from.
            </p>
            <div className="bg-black/40 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-secondary">
{`text:        𐍆𐌰𐌳𐌰𐍂 𐌿𐌽𐍃𐌰𐍂, 𐌸𐌿 𐌹𐌽 𐌷𐌹𐌼𐌹𐌽𐌰𐌼
                 ("Our Father, who art in heaven" — Matthew 6:9)

base llama:  <0xF0><0x90><0x8D><0x86> <0xF0>...  (byte fallback, ~4-5 tokens per glyph)
target:      𐍆𐌰𐌳𐌰𐍂 | 𐌿𐌽𐍃𐌰𐍂 | , | 𐌸𐌿 | 𐌹𐌽 | 𐌷𐌹𐌼𐌹𐌽 | 𐌰𐌼   (character/small-morpheme merges)`}
                </code>
              </pre>
            </div>
            <p>
              Given the corpus size, I'm training the extension vocabulary on a mix of the raw Gothic text{' '}
              <em>and</em> a Latin-transliterated version (there's a standard scholarly transliteration scheme),
              which roughly doubles the effective training signal for the tokenizer without inventing data, and
              keeps a fallback path if the base model turns out to generalize better over Latin characters than
              over raw Unicode Gothic glyphs it has truly never encountered.
            </p>
          </section>

          {/* Approach */}
          <section className="space-y-6">
            <SectionHeading id="approach">The plan: lean on parallel structure, not scale</SectionHeading>
            <p>
              Since Wulfila's Bible is a translation, nearly the entire Gothic corpus has a Greek original sitting
              right next to it, verse for verse. That's the one real advantage this project has over a from-scratch
              low-resource setup: instead of relying purely on unsupervised continual pre-training, the plan is
              structured in three layers.
            </p>
            <ol className="list-decimal list-inside space-y-3 pl-1">
              <li>
                <span className="text-white font-medium">Tokenizer + embedding warm start</span> — extend the
                vocabulary as above, initialize new token embeddings from subword decomposition rather than
                randomly, similar in spirit to how Kannada-LLaMA warm-started its expanded embedding matrix.
              </li>
              <li>
                <span className="text-white font-medium">LoRA continual pre-training on parallel + monolingual
                text</span> — train on the full Gothic corpus alongside its Greek source text, so the model can
                lean on cross-lingual alignment instead of trying to learn Gothic morphology from 75K words of
                monolingual signal alone. Low rank, small learning rate, heavy regularization — the goal is
                nudging representations, not reshaping them.
              </li>
              <li>
                <span className="text-white font-medium">Grammar-derived synthetic augmentation</span> — Gothic is
                a fully described, highly inflected language (strong/weak verb classes, four cases, dual number).
                Wright's <em>Grammar of the Gothic Language</em> (1910, public domain) documents the paradigms in
                full. Generating synthetic, grammatically-valid sentence templates from those paradigms is a way
                to manufacture additional — if less naturalistic — training signal without touching the fixed
                pool of attested text.
              </li>
            </ol>
            <Callout title="Why LoRA and not full fine-tuning" tone="warning">
              With a base corpus this small, full fine-tuning would overfit almost immediately and risks
              catastrophic forgetting of everything the base model already knows about language in general — which
              is exactly the knowledge a dead, low-data language needs to lean on. LoRA adapters keep the base
              weights frozen and bound how much the model's behavior can shift, the same reasoning Kannada-LLaMA
              used, just with a much smaller effective learning budget here.
            </Callout>
          </section>

          {/* Fine-tuning plan */}
          <section className="space-y-4">
            <SectionHeading id="finetuning">Instruction data: translation and morphology, not chat</SectionHeading>
            <p>
              There's no reason to fine-tune this toward being a Gothic conversational assistant — nobody needs to
              chat in Gothic. The more useful target audience is students and researchers working with the
              language, so the instruction set currently being built out focuses on:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>Gothic → English and English → Gothic translation pairs, sourced from the parallel Bible text</li>
              <li>Morphological analysis — given a Gothic word form, identify case/number/tense/mood</li>
              <li>Grammar Q&A distilled from Wright's grammar and Streitberg's edition apparatus</li>
              <li>Guided generation of grammatically valid (if not attested) Gothic sentences</li>
            </ul>
            <p>
              Training config-wise this looks close to a standard Axolotl LoRA SFT run — the interesting decisions
              are all upstream, in what the dataset even contains.
            </p>
          </section>

          {/* Status / examples */}
          <section className="space-y-4">
            <SectionHeading id="status">Where this actually stands right now</SectionHeading>
            <p>
              To be upfront: this is early. Tokenizer extension and corpus assembly (digitizing and cleaning the
              Codex Argenteus and Ambrosiani transcriptions, aligning them verse-by-verse against Greek) are the
              current focus. LoRA pre-training runs and real generation samples aren't ready to publish yet — I'd
              rather post honest partial numbers here as they land than fabricate placeholder benchmarks.
            </p>
            <Callout title="Follow along">
              The plan is to open-source the corpus alignment tooling, the extended tokenizer, and eventually the
              adapters themselves, the same way Tensoic released Kannada-LLaMA. I'll update this post — and this
              blog — as each stage lands.
            </Callout>
          </section>

          {/* Conclusion */}
          <section className="space-y-4">
            <SectionHeading id="conclusion">Closing thought</SectionHeading>
            <p>
              Kannada-LLaMA is about giving an under-served but thriving language a real seat at the table with
              frontier open models. This project is a different bet: that the same toolkit — tokenizer surgery,
              LoRA continual pre-training, cross-lingual transfer — can be pointed at the opposite end of the
              resource spectrum, where the "corpus" is fixed, finite, and was last added to over a thousand years
              ago. If it works even partially, it's a small case study in what LLM adaptation can do for
              historical linguistics and language preservation more broadly, not just for languages with speakers
              left to serve.
            </p>
          </section>

          <section className="pt-8 border-t border-gray-800">
            <p className="text-sm">
              Inspired by{' '}
              <a
                href="https://www.tensoic.com/blog/kannada-llama/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white underline"
              >
                Tensoic's Kannada-LLaMA
              </a>
              . All credit for the original approach goes to their team.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default GutiskaLlama;
