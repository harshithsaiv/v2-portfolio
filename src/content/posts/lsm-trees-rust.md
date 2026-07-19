---
slug: lsm-trees-rust
title: LSM-Trees from First Principles in Safe Rust
date: Mar 2026
category: exploration
tags: [Rust, Storage Engines, Databases, Systems]
readTime: 18 min
status: project
link: https://github.com/harshithsaiv/lsm-tree
---

Why does RocksDB use an LSM-tree instead of a B-tree? Writes to B-trees cause random I/O; LSM-trees convert random writes into sequential I/O. This exploration documents building a MemTable → SSTable → Compaction pipeline in safe Rust, and why bloom filters are non-negotiable for point lookups.
