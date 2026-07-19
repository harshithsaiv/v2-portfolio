---
slug: programming-massively-parallel-processors
title: Programming Massively Parallel Processors — Kirk & Hwu
date: Mar 2026
category: book
tags: [CUDA, GPU, Parallel Computing]
readTime: 20 min
progress: 45
status: reading
link: https://www.elsevier.com/books/programming-massively-parallel-processors/kirk/978-0-12-811986-0
---

The canonical GPU programming book. Chapter 6 on memory coalescing changed how I write CUDA kernels — uncoalesced global memory access can cost 10× throughput. The tiling pattern for matrix multiplication is a mental model I reach for constantly when writing custom kernels.
