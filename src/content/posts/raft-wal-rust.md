---
slug: raft-wal-rust
title: Building a Write-Ahead Log with Raft Consensus in Rust
date: Apr 2026
category: exploration
tags: [Rust, Distributed Systems, WAL, Raft]
readTime: 20 min
status: project
link: https://github.com/harshithsaiv/RAFT-WAL
---

Engineering notes from building RAFT-WAL. The hardest part wasn't the consensus protocol, it was getting the WAL flush semantics right. You need fsync on the leader before responding to the client, which dominates latency. I benchmarked group commit strategies to amortize this cost.
