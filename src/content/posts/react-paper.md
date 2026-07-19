---
slug: react-paper
title: 'ReAct: Synergizing Reasoning and Acting in Language Models'
date: Mar 2026
category: paper
tags: [LLMs, Agentic AI, LangGraph]
readTime: 8 min
status: notes
link:
---

The paper that underpins how I think about agentic pipelines at Optispan. ReAct interleaves reasoning traces with actions — the key is that the model can observe tool outputs and update its reasoning. LangGraph's state machine model maps directly to this: nodes are actions, edges are reasoning transitions.
