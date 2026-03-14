---
title: "I'm Faster With AI Code Tools. The Studies Say I Shouldn't Be."
description: "The METR study found developers are 19% slower with AI tools. My experience says the opposite. Here's what separates productive AI-assisted developers from those who actually slow down."
category: 'AI'
pubDate: 2026-03-12
featuredTill: 2026-04-12
heroImage: '@/assets/Media/AI/ai-coding-productivity-reality.png'
tags:
  - ai
  - productivity
  - development
  - coding
  - tools
---

I am using extensively AI since a year now both, professionally and for my personal projects. I started interacting with the chat interfaces, copying and pasting code back and forth and, today, I am running multi-agent plans for large scaled refactors and architectural updates or complex features.

The amount of features that I am capable to release now has increased drastically. It is very hard to measure but you can feel that your speeds delivering value is way higher. What before would have taken me two weeks six months ago now is being delivered in a single day. The code is cleaner, the edge cases are covered, and I caught architectural issues before they hit production or spread further. **I'm genuinely moving faster**.

Then I read the [METR study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).

![METR study results showing developers with AI tools took 19% longer to complete tasks while believing they were 20% faster](../../../../assets/Media/AI/forecasted-vs-observed.png)

In July 2025, researchers ran a rigorous randomized controlled trial with 16 experienced open-source developers. The kind of engineers who maintain repositories with 22,000+ stars. They were given 246 real GitHub issues. Half got AI tools like Cursor Pro with Claude 3.5 Sonnet. Half worked without AI.

The result? **Developers with AI tools took 19% longer to complete tasks.**

The kicker: they believed they were 20% faster.

I'm either an outlier, delusional, or the studies are measuring the wrong thing. I think it's the third one, and understanding why matters if you're trying to figure out whether AI coding tools actually make you better or just make you feel better.

## The Gap Between Studies and Reality

Here's what makes the METR findings so unsettling. This wasn't a sloppy survey. The methodology was airtight:

- 16 experienced developers, not bootcamp graduates or hobbyists
- 246 real GitHub issues across bug fixes, features, and refactors
- Average task duration: two hours
- Compensation: $150/hour (enough to ensure serious effort)
- Randomized assignment to AI-allowed vs. AI-prohibited conditions

These developers expected AI would accelerate their work by 24%. After experiencing the slowdown, they still believed AI had sped them up by 20%. The perception gap is massive.

So what's happening?

The study doesn't say you shouldn't use AI. It says something more specific and more interesting: **experienced developers working in familiar codebases slow down when they add AI tools to their workflow.**

That qualifier matters. Because when I'm productive with AI, I'm rarely working in a familiar codebase on a well-understood problem. I'm prototyping something new, exploring an unfamiliar domain, or scaffolding architecture I'll refine later. The context is completely different.

## When AI Coding Tools Make You Slower

Let me be clear: AI absolutely can make you slower. I've watched it happen to myself and others. Here's when:

**When you're debugging your own recent code.** You already have the mental model. You know what you meant to do. Reading and verifying AI-generated fixes takes longer than just fixing it yourself. The cognitive overhead of explaining the problem to an AI, evaluating the proposed solution, and verifying it doesn't introduce new issues often exceeds the cost of just patching the bug.

**When you're working in a well-understood domain with established patterns.** If you've written authentication middleware five times before, the sixth time is mechanical. You don't need AI to generate it. You need your fingers to type what your brain already knows. Adding an AI intermediary just adds latency. Additionally, many developers just want to get the job done and don't spend then right amount of time preparing the prompt or collecting the right context for the AI to be effective.

**When the AI generates plausible but subtly wrong code.** This is the killer. The model produces something that looks right, passes basic tests, and will absolutely fail in production under edge cases you didn't think to specify. Catching these requires intense scrutiny. You're not just reading code. You're reading code while constantly asking "what did the model misunderstand about my intent?"

The METR study likely captured all three scenarios. Experienced developers working in familiar repos on typical maintenance issues probably don't benefit from AI. They benefit from expertise and muscle memory.

**When supervision cost exceeds production cost.** Here's the thing nobody warns you about: AI generates code faster than you can properly review it. If you're running multiple AI agents concurrently, the cognitive load of maintaining quality across parallel workstreams is genuinely draining. I wrote about this in depth in ["AI Is Not a Tool. It Is Work."](/blog/ai/ai-cognitive-load/) Your System 2 (deliberate, analytical thinking) fatigues. Your System 1 (fast, intuitive pattern-matching) takes over. System 1 is terrible at catching confident-sounding errors. Quality erodes quietly.

## When AI Makes You Faster

Here's where my experience diverges from the study results. I'm faster with AI. The code I ship is really good, well tested, following the architecture I want, and with rapid iteration cycles.

So, how do I achieve this?

> Shifting the mindset from _"AI is a tool that should make me faster at the same tasks"_ to _"AI is work. AI is a collaborator that expands the range of tasks I can tackle and the quality bar I can sustain"_

AI isn't just a code generator. It is a thinking partner. It helps me explore solutions I wouldn't have thought of, catch edge cases I would have missed, and scaffold complex features faster than I could write them from scratch. Now, as any brilliant collaborator, it needs **context**. It needs **guidance**. 

Think about it. Imagine you join a new team and your first task is to implement a feature in a codebase you've never seen before and they ask you to do it without clarifications, without explaining what is the change about, what is the product or the feature about. Nothing. Just change this line of code to "solve the problem" and, if it does not work, you are the one to be blamed. Frustrating, right? That's how most people are using AI. They just throw the problem at it and expect a perfect solution. But AI doesn't understand your product, your users, or your architecture. It only understands the prompt you give it. If you don't provide the right context and guidance, you're setting it up to fail.

When I'm building something new or working in an unfamiliar codebase, AI helps me bootstrap understanding and iterate quickly. When I'm refactoring or adding features to a well-known codebase, I use AI to generate boilerplate or explore alternative implementations, but I don't rely on it for the core logic.

## Why The Studies Miss The Point

The METR study measured task completion time in familiar codebases. That's valid. It's also narrow. Additionally, it was conducted from a Tool perspective, not a Work perspective. It asked: "Does adding AI tools make developers faster at the same tasks?" The answer was no if you just don't change your Ways of Working (WoW).

> I'm not arguing the study is wrong. I'm arguing it's measuring the wrong thing if you want to understand whether AI (not AI tools) make developers more effective.

Faster task completion on known problems isn't the game. The game is: can you solve harder problems, explore more options, catch more errors, and ship higher-quality systems than you could before?

For me, the answer is yes. But only because I've learned when to use AI and when to ignore it.

## The Skill Nobody Teaches: Knowing When to Use AI

Here's the uncomfortable truth: most developers are using AI wrong. They're using it the way they were taught to use `Stack Overflow`: when stuck, paste in the problem, accept the answer, move on.

That works for `Stack Overflow` because the answers have been upvoted by thousands of people and tested in production for years. It doesn't work for AI because the answer is generated on the spot, may be subtly wrong, and has zero validation beyond your own review.

The skill that separates productive AI users from those who slow down is knowing when the tool's strengths align with the task's demands.

**You prepare specs and context over random code generation.** Before asking AI to generate code, I spend time preparing the prompt. I gather relevant documentation, write a clear spec (also using AI), and provide examples. This upfront investment pays off in higher-quality output.

**AI can run many agents in parallel, but they need a plan first.** I don't just ask for code. I ask for a plan from a given `Idea`. I break down the problem into subproblems and assign agents to each. This way, I can manage the cognitive load and ensure each agent has a clear purpose.

**AI can document reverse engineer your code into a `memory bank` that it can refer to later.** I use AI agents run in batches to create a living documentation of the codebase as I work. Not what the developer expects to have or wishes to have, but WHAT the code ACTUALLY IS. This helps me and the AI maintain context across sessions and reduces the risk of hallucinations.

**I prioritize AI friendly code structures over human-friendly quality attributes**. I understood that the **real value** is not in Code itself. It is in the to articulate the problem, the solution, and the rationale. I generate code that I can easily replace and rewite. I focus more on other quality attributes like performance, security, reliability, and AI maintainability. I don't care if the code is elegant or follows best coding style practices if it doesn't solve the problem effectively. Don't get me wrong. I want the code to be readable and maintainable, but, if AI will be able to boost my productivity by 10x but the side effect is that I may have some class with few to no-comments and methods with more than 20 lines of code, so be it. I can always refactor it later and make it more elegant. The point is to get the value out there faster and then iterate on it.

## The Real Productivity Gain Isn't `just` Speed

Here's what I've realized after a year of serious AI-assisted development: the productivity gain isn't `just` that I ship individual features faster. It's that I ship better features, explore more options, and catch more mistakes before they become incidents.

For example, every code I generate now is accompanied by its `memory bank` documentation. This means that I can ask the AI to explain the code, critique it, or generate tests against it with a much richer context than I could provide in a prompt. This leads to higher-quality code and faster iteration cycles.

See below some of the practices that I have developed to get the most out of AI:

- **I deeply prioritize that it is fully documented** with detailed specifications. This make that the AI generation is highly replicable and maintainable.

- **Every specification I write, provides strong context about the business value, personas, constraints, expectations, acceptance criteria, and edge cases.** While I am creating those specs I can ask the AI to generate a new scenarios that I carefully review.

- **I document my planned architecture and guiding principles.** This way, I can ask the AI to generate code that follows those principles and architecture. I can also ask the AI to critique the code against those principles and architecture, which helps me catch any deviations or inconsistencies.

- **I use AI to generate a coding plan before writing any code.** This way, I can ask the AI to explore different approaches, identify potential pitfalls, and suggest optimizations. I also edit what the AI is expecting to generate doing an early code review of what is meant to be generated. Since I wrote the specifications and the acceptance criteria, I prepare the plan to make sure that it is using Behavior Driven Development (BDD) and Test Driven Development (TDD) practices. This way, I can ask the AI to generate tests first, which helps me clarify my requirements and catch any misunderstandings before writing the implementation code.

- **Generate the testing and code and iterate on it.** I don't expect the first generation to be perfect. I use it as a starting point and then iterate on it, asking the AI to refine the code, add more tests, or explore alternative implementations. This way, I can leverage the AI's ability to generate multiple iterations quickly and efficiently. I define clear quality bars for each iteration and enforce them rigorously. If the AI output doesn't meet the quality bar, I don't ship it. I ask the AI to explain why it generated that code and what it misunderstood about my intent.

> In a nutshell, the real productivity comes from acting as a orchestrator of AI agents. A LEADER, a Product Manager, a Software Architect, ... not a typist.

AI coding tools are not making me faster at the tasks I was already good at. They're expanding the surface area of problems I can tackle and the quality bar I can sustain. That's a fundamentally different kind of productivity.

Now, my delivery is accompanied by a `memory bank` documentation that is always versioned together with the code that captures the rationale, the design decisions, the edge cases, and the testing strategy. This means that I can iterate on the code with much richer context and catch issues before they become incidents. The speed gain is real, but it's just one part of a much bigger picture of how AI is transforming software development. 

And very importantly, I can validate the re-execution with new models and see how the code evolves.  

---

*Research for this article was conducted in March 2026. Key sources: [METR study on AI developer productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) (July 2025), Anthropic's partnership with Mozilla on Firefox security analysis (March 2026), and my own lived experience building software with Claude Code, Cursor, and GitHub Copilot over the past year.*
