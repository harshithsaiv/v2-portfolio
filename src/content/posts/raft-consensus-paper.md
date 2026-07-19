---
slug: raft-consensus-paper
title: In Search of an Understandable Consensus Algorithm (Raft)
date: Apr 2026
category: paper
tags: [Distributed Systems, Consensus, Rust]
readTime: 12 min
status: notes
link:
---

Raft was designed to be more understandable than Paxos. After implementing RAFT-WAL in Rust I wanted to deeply understand the guarantees. Key insight: leader election with randomized timeouts is elegant. The simplicity comes from making only one server responsible for state changes at any time.
