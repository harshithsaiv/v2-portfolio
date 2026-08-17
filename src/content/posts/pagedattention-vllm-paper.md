---
slug: pagedattention-vllm-paper
title: Efficient Memory Management for Large Language Model Serving with PagedAttention
date: Feb 2026
category: paper
tags: [LLMs, Inference, vLLM, Memory]
readTime: 10 min
status: notes
link:
---

The vLLM paper. PagedAttention treats the KV cache like virtual memory in an OS: blocks allocated on demand, no fragmentation. This is why vLLM achieves near-zero waste in KV cache memory vs. static allocation. Critical reading for anyone doing LLM inference optimization.
