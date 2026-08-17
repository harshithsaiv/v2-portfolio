---
slug: gutiska-llama
title: Gutiska-LLaMA: Teaching an Open LLM to Speak a Dead Language
date: Aug 2026
category: exploration
tags: [LLMs, NLP, Historical Linguistics, Open Source]
readTime: 9 min
status: wip
link: https://www.tensoic.com/blog/kannada-llama/
---

![The Gothic alphabet and manuscript imagery](/Gothic_image.png)

𐍂𐌰𐌸𐌾𐍉𐌽 𐌲𐌿𐍄𐌹𐍃𐌺𐍉𐌽 — "to reckon in Gothic." I've been reading [Tensoic's Kannada-LLaMA write-up](https://www.tensoic.com/blog/kannada-llama/) on and off for a while: continually pre-training Llama on ~600M Kannada tokens, expanding the tokenizer's vocabulary from 32K to 49,420 to actually fit the script efficiently, then LoRA fine-tuning for chat. It's a clean template for "how do I get a frontier open model to speak my language" when that language is under-served but still *alive* — 44 million native speakers, news sites, Wikipedia, decades of digitized text.

I wanted to try the same idea under the opposite constraints. Instead of a low-resource living language, I'm going after a language with **zero living native speakers** and a total surviving corpus that would fit on a few hundred printed pages: **Gothic**, the language of the Goths, attested almost entirely through one 4th-century Bible translation.

## Why Gothic

Gothic is the oldest Germanic language we have any substantial written record of — centuries older than Old English or Old Norse. It largely died out by the 8th or 9th century, surviving longest as a fringe dialect on the Crimean peninsula (attested only in a handful of 16th-century word-lists). Almost everything we know comes from Bishop Wulfila's translation of the Bible from Greek, written in an alphabet he devised himself, surviving mostly through the *Codex Argenteus* ("Silver Bible") plus a few palimpsests.

This isn't really about producing a chatbot anyone will use — there's no Gothic-speaking audience to serve. It's a constraints problem: what does language modeling look like at the absolute floor of available data, and can tooling built for living low-resource languages (tokenizer expansion, LoRA continual pre-training, cross-lingual transfer) be repurposed for computational historical linguistics instead.

## The corpus problem

Kannada-LLaMA's pre-training set was ~600 million tokens from CulturaX. The entire surviving corpus of Gothic — every attested word, across every manuscript and fragment ever found — is generally estimated at **~70,000–80,000 running words, total**. There is no "more Gothic text" to scrape. It breaks down roughly as: the *Codex Argenteus* (the bulk, ~half of the four Gospels), the *Codices Ambrosiani* and *Codex Carolinus* (palimpsest fragments of the Pauline epistles, a fragment of Nehemiah, and the *Skeireins* — the only non-Biblical text of any length), and a handful of minor fragments (a calendar, a few legal deeds).

Two things follow immediately. First, byte-level BPE trained directly on Gothic text will badly under-fit — there isn't enough signal to learn good subword statistics for a script this rare. Second, unsupervised continual pre-training the way Kannada-LLaMA did it doesn't have enough mass to shift a 7B-parameter model's distribution in any meaningful way. The approach has to lean on structure the corpus doesn't have in bulk: parallel text and grammar.

## Tokenizer: script coverage first

Gothic script occupies its own Unicode block (U+10330–U+1034F). Llama's base tokenizer has never seen it, so every Gothic character gets shredded into multi-byte UTF-8 fallback tokens — the same problem Kannada text had against the base 32K vocabulary, just worse, since there's no byte-pair frequency data at scale to learn merges from.

```
text:        𐍆𐌰𐌳𐌰𐍂 𐌿𐌽𐍃𐌰𐍂, 𐌸𐌿 𐌹𐌽 𐌷𐌹𐌼𐌹𐌽𐌰𐌼
             ("Our Father, who art in heaven" — Matthew 6:9)

base llama:  <0xF0><0x90><0x8D><0x86> <0xF0>...  (byte fallback, ~4-5 tokens/glyph)
target:      𐍆𐌰𐌳𐌰𐍂 | 𐌿𐌽𐍃𐌰𐍂 | , | 𐌸𐌿 | 𐌹𐌽 | 𐌷𐌹𐌼𐌹𐌽 | 𐌰𐌼
```

Given the corpus size, I'm training the extension vocabulary on a mix of the raw Gothic text *and* a Latin-transliterated version (there's a standard scholarly transliteration scheme), which roughly doubles the effective training signal for the tokenizer without inventing data.

## The plan: lean on parallel structure, not scale

Since Wulfila's Bible is a translation, nearly the entire Gothic corpus has a Greek original sitting right next to it, verse for verse. That's the one real advantage this project has over a from-scratch low-resource setup. The plan has three layers:

1. **Tokenizer + embedding warm start** — extend the vocabulary as above, initialize new token embeddings from subword decomposition rather than randomly, similar in spirit to how Kannada-LLaMA warm-started its embedding matrix.
2. **LoRA continual pre-training on parallel + monolingual text** — train on the Gothic corpus alongside its Greek source, so the model leans on cross-lingual alignment instead of trying to learn Gothic morphology from 75K words of monolingual signal alone. Low rank, small learning rate, heavy regularization — nudging representations, not reshaping them.
3. **Grammar-derived synthetic augmentation** — Gothic is a fully described, highly inflected language (strong/weak verb classes, four cases, dual number). Wright's *Grammar of the Gothic Language* (1910, public domain) documents the paradigms in full. Generating synthetic, grammatically-valid sentence templates from those paradigms manufactures additional — if less naturalistic — training signal without touching the fixed pool of attested text.

With a corpus this small, full fine-tuning would overfit almost immediately and risks catastrophic forgetting of everything the base model already knows about language in general — which is exactly the knowledge a dead, low-data language needs to lean on. LoRA keeps the base weights frozen and bounds how much behavior can shift, same reasoning as Kannada-LLaMA, just with a much smaller effective learning budget here.

## Instruction data: translation and morphology, not chat

There's no reason to fine-tune this toward being a Gothic conversational assistant — nobody needs to chat in Gothic. The more useful target is students and researchers working with the language, so the instruction set focuses on: Gothic → English and English → Gothic translation pairs sourced from the parallel Bible text, morphological analysis (given a word form, identify case/number/tense/mood), grammar Q&A distilled from Wright's grammar, and guided generation of grammatically valid (if not attested) Gothic sentences.

## Where this stands

Early. Tokenizer extension and corpus assembly (digitizing and cleaning the Codex Argenteus and Ambrosiani transcriptions, aligning them verse-by-verse against Greek) are the current focus. LoRA pre-training runs and real generation samples aren't ready — I'd rather post honest partial results here as they land than fabricate placeholder benchmarks. Plan is to open-source the corpus alignment tooling, the extended tokenizer, and eventually the adapters, the same way Tensoic released Kannada-LLaMA. All credit for the original approach goes to their team.
