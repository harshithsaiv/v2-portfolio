---
slug: xast-paper
title: 'XAST: GPU-Accelerated Smart Contract Vulnerability Detection via AST-Based Transformers'
date: Mar 2026
category: paper
tags: [GPU, Security, Transformers, CUDA]
readTime: 15 min
status: published
link: https://www.computer.org/csdl/proceedings-article/tps-isa/2025/969100a352/2eytftkhp5e
---

My own published paper (IEEE TPS-ISA 2025). Writing this note as a reflection on what I'd do differently — the AST representation choice, the CUDA kernel design tradeoffs, and what explainability means in a security context. The 40% inference speedup came from fusing attention + softmax kernels.
