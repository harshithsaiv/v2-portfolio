---
slug: cuda-kernel-fusion
title: CUDA Kernel Fusion for Transformer Inference
date: Jan 2026
category: exploration
tags: [CUDA, GPU, Inference, Optimization]
readTime: 22 min
status: notes
link:
---

Exploring fused attention kernels (FlashAttention-style) and why kernel fusion matters. Each kernel launch has overhead: memory bandwidth is the bottleneck, not FLOPS. By fusing softmax + attention + dropout into one pass, you cut memory round-trips from 4 to 1. My benchmarks on A100 showed 2.3× speedup on the attention block.
