<script>
  import { onMount }   from 'svelte';
  import { select }    from 'd3-selection';
  import { scaleTime } from 'd3-scale';
  import 'd3-transition';

  const MIN_W    = 700;
  const LABEL_W  = 84;
  const MR       = 28;
  const ROW_H    = 44;
  const HEADER   = 34;
  const BOT      = 20;

  const VENDORS = [
    {
      name: 'Anthropic',
      color: '#a78bfa',
      milestones: [
        { date: new Date(2024, 2,  1),  label: 'Claude 3',      note: 'First to match GPT-4 on several benchmarks' },
        { date: new Date(2024, 5, 20),  label: 'Claude 3.5',    note: 'Best coder at half the flagship cost' },
        { date: new Date(2024, 9, 22),  label: 'Claude 3.5 v2', note: 'Computer Use: first model to control a desktop' },
        { date: new Date(2025, 1,  1),  label: 'Claude 3.7',    note: 'Hybrid reasoning with adjustable thinking budget' },
        { date: new Date(2025, 4,  1),  label: 'Claude 4',      note: 'New frontier generation — Opus 4 + Sonnet 4' },
        { date: new Date(2025, 10, 1),  label: 'Claude 4.6',    note: 'Opus 4.6 + Sonnet 4.6 — current flagship models' },
      ],
    },
    {
      name: 'OpenAI',
      color: '#34d399',
      milestones: [
        { date: new Date(2024, 4, 13),  label: 'GPT-4o',      note: 'Native audio, vision, and text in one model' },
        { date: new Date(2024, 6, 18),  label: 'GPT-4o mini', note: '60%+ cheaper than GPT-3.5; new default for ChatGPT' },
        { date: new Date(2024, 8, 12),  label: 'o1',          note: '83% on math olympiad via chain-of-thought' },
        { date: new Date(2025, 0, 31),  label: 'o3-mini',     note: 'First reasoning model free to all ChatGPT users' },
        { date: new Date(2025, 3, 16),  label: 'o3',          note: '91.6% on AIME 2024 — near-frontier reasoning' },
        { date: new Date(2025, 7,  7),  label: 'GPT-5',       note: 'Unified reasoning + generation; step toward AGI' },
      ],
    },
    {
      name: 'Google',
      color: '#60a5fa',
      milestones: [
        { date: new Date(2024, 1, 15),  label: 'Gemini 1.5 Pro',   note: 'First production model with a 1M token context window' },
        { date: new Date(2024, 4, 14),  label: 'Gemini 1.5 Flash', note: 'Fast, cheap multimodal; became default production choice' },
        { date: new Date(2024, 11, 11), label: 'Gemini 2.0 Flash', note: 'Native image gen, real-time streaming, integrated agents' },
        { date: new Date(2025, 2,  1),  label: 'Gemini 2.5',       note: 'Strong reasoning + coding, improved 1M context' },
        { date: new Date(2025, 10, 1),  label: 'Gemini 3',         note: '100% AIME 2025 with Deep Think mode' },
      ],
    },
    {
      name: 'Meta',
      color: '#fb923c',
      milestones: [
        { date: new Date(2024, 3,  1),  label: 'Llama 3',   note: 'Open-weights model beating 2× larger rivals' },
        { date: new Date(2024, 8,  1),  label: 'Llama 3.2', note: 'First Llama with vision; edge-optimised 1B–3B variants' },
        { date: new Date(2024, 11, 1),  label: 'Llama 3.3', note: '70B outperforms the older 405B variant' },
        { date: new Date(2025, 3,  5),  label: 'Llama 4',   note: 'Open-weight MoE with 10M token context window' },
      ],
    },
    {
      name: 'DeepSeek',
      color: '#f87171',
      milestones: [
        { date: new Date(2024, 4,  6),  label: 'V2', note: 'MoE efficiency breakthrough; 6× faster generation' },
        { date: new Date(2024, 11, 25), label: 'V3', note: 'Frontier quality trained for ~$5.5M total' },
        { date: new Date(2025, 0,  20), label: 'R1', note: 'Open-source reasoning at parity with o1' },
      ],
    },
    {
      name: 'xAI',
      color: '#e879f9',
      milestones: [
        { date: new Date(2024, 7,  1),  label: 'Grok 2', note: 'First competitive vision + web model outside the big 3' },
        { date: new Date(2025, 1, 17),  label: 'Grok 3', note: 'Reached #1 on Chatbot Arena; 10× compute over prior Grok' },
      ],
    },
    {
      name: 'Mistral',
      color: '#fbbf24',
      milestones: [
        { date: new Date(2024, 1, 26),  label: 'Mistral Large',   note: 'First European frontier model near GPT-4 quality' },
        { date: new Date(2024, 6, 24),  label: 'Mistral Large 2', note: '123B open-weight; matched Claude 3 Opus and GPT-4o' },
      ],
    },
  ];

  /** @type {SVGSVGElement} */
  let svgEl;
  /** @type {HTMLDivElement} */
  let wrapEl;

  function getColors() {
    const dark = document.documentElement.classList.contains('dark');
    return {
      text:    dark ? '#f0ece3' : '#1c1c2e',
      muted:   dark ? '#a0a0b8' : '#6b7280',
      track:   dark ? 'rgba(42,207,98,0.22)' : '#e2e8f0',
      rowAlt:  dark ? 'rgba(42,207,98,0.04)'  : 'rgba(0,0,0,0.025)',
      grid:    dark ? 'rgba(42,207,98,0.10)'  : 'rgba(0,0,0,0.06)',
      today:   dark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.20)',
      bg:      dark ? '#0C0C14' : '#FAFAF8',
      dark,
    };
  }

  /** Build the tooltip HTML string for a given milestone */
  function tipHtml(vendor, m, dark) {
    const mutedColor = dark ? '#a0a0b8' : '#6b7280';
    const arrowBg    = dark ? 'rgba(18,18,28,0.95)' : 'rgba(252,252,250,0.97)';
    const dateStr    = m.date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="width:7px;height:7px;border-radius:50%;background:${vendor.color};flex-shrink:0;display:inline-block;"></span>
        <span style="font-size:10px;font-weight:700;font-family:Syne,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:${vendor.color};">${vendor.name}</span>
        <span style="font-size:11px;font-weight:700;font-family:Syne,sans-serif;margin-left:2px;">${m.label}</span>
      </div>
      <div style="font-size:9px;font-family:'JetBrains Mono',monospace;letter-spacing:.06em;margin-bottom:5px;color:${mutedColor};">${dateStr}</div>
      <div style="font-size:10.5px;line-height:1.45;font-family:Syne,sans-serif;opacity:.85;">${m.note}</div>
      <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:0;height:0;
        border-left:6px solid transparent;border-right:6px solid transparent;
        border-top:6px solid ${arrowBg};"></div>
    `;
  }

  function draw(tipEl) {
    if (!svgEl || !wrapEl) return;

    const W  = Math.max(wrapEl.offsetWidth, MIN_W);
    const N  = VENDORS.length;
    const H  = HEADER + N * ROW_H + BOT;
    const c  = getColors();
    const iw = W - LABEL_W - MR;

    select(svgEl).selectAll('*').remove();

    const svg = select(svgEl)
      .attr('width', W)
      .attr('height', H)
      .attr('viewBox', `0 0 ${W} ${H}`);

    const scale = scaleTime()
      .domain([new Date(2024, 0, 1), new Date(2026, 2, 1)])
      .range([0, iw]);

    const chart = svg.append('g').attr('transform', `translate(${LABEL_W},0)`);

    // ── X-axis ticks (every 6 months) ──
    const ticks = [
      { d: new Date(2024, 0, 1), l: 'Jan 2024' },
      { d: new Date(2024, 6, 1), l: 'Jul 2024' },
      { d: new Date(2025, 0, 1), l: 'Jan 2025' },
      { d: new Date(2025, 6, 1), l: 'Jul 2025' },
      { d: new Date(2026, 0, 1), l: 'Jan 2026' },
    ];

    ticks.forEach(({ d, l }) => {
      const x = scale(d);
      chart.append('line')
        .attr('x1', x).attr('x2', x)
        .attr('y1', HEADER - 4).attr('y2', HEADER + N * ROW_H)
        .attr('stroke', c.grid).attr('stroke-width', 1);
      chart.append('text')
        .attr('x', x).attr('y', HEADER - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8.5')
        .attr('font-family', '"JetBrains Mono", ui-monospace, monospace')
        .attr('letter-spacing', '0.05em')
        .attr('fill', c.muted).text(l);
    });

    // ── "Today" marker ──
    const todayX = scale(new Date(2026, 1, 23));
    chart.append('line')
      .attr('x1', todayX).attr('x2', todayX)
      .attr('y1', HEADER - 4).attr('y2', HEADER + N * ROW_H)
      .attr('stroke', c.today).attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3');
    chart.append('text')
      .attr('x', todayX + 4).attr('y', HEADER - 10)
      .attr('font-size', '8')
      .attr('font-family', '"JetBrains Mono", ui-monospace, monospace')
      .attr('fill', c.muted).text('today');

    // ── Vendor rows ──
    VENDORS.forEach((vendor, vi) => {
      const rowY  = HEADER + vi * ROW_H;
      const lineY = rowY + ROW_H / 2;

      if (vi % 2 === 1) {
        chart.append('rect')
          .attr('x', 0).attr('y', rowY)
          .attr('width', iw).attr('height', ROW_H)
          .attr('fill', c.rowAlt);
      }

      svg.append('text')
        .attr('x', LABEL_W - 10).attr('y', lineY)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '10').attr('font-weight', '700')
        .attr('font-family', 'Syne, ui-sans-serif, sans-serif')
        .attr('fill', vendor.color).text(vendor.name);

      chart.append('line')
        .attr('x1', 0).attr('x2', iw)
        .attr('y1', lineY).attr('y2', lineY)
        .attr('stroke', c.track).attr('stroke-width', 1);

      // ── Milestones ──
      vendor.milestones.forEach((m, mi) => {
        const cx    = scale(m.date);
        const above = mi % 2 === 0;
        const mg    = chart.append('g').style('cursor', 'pointer');

        const dot = mg.append('circle')
          .attr('cx', cx).attr('cy', lineY)
          .attr('r', 4.5)
          .attr('fill', vendor.color)
          .attr('stroke', c.bg)
          .attr('stroke-width', 2.5);

        mg.append('text')
          .attr('x', cx)
          .attr('y', above ? lineY - 9 : lineY + 17)
          .attr('text-anchor', 'middle')
          .attr('font-size', '9').attr('font-weight', '600')
          .attr('font-family', 'Syne, ui-sans-serif, sans-serif')
          .attr('fill', vendor.color).attr('opacity', '0.92')
          .text(m.label);

        // Invisible hit area — also drives tooltip
        mg.append('circle')
          .attr('cx', cx).attr('cy', lineY)
          .attr('r', 14)
          .attr('fill', 'transparent')
          .on('mouseenter', (event) => {
            dot.transition().duration(150).attr('r', 7);
            const dark = document.documentElement.classList.contains('dark');
            tipEl.innerHTML = tipHtml(vendor, m, dark);
            tipEl.style.background    = dark ? 'rgba(18,18,28,0.95)' : 'rgba(252,252,250,0.97)';
            tipEl.style.color         = dark ? '#f0ece3' : '#1c1c2e';
            tipEl.style.border        = `1px solid ${vendor.color}44`;
            tipEl.style.left          = `${event.clientX}px`;
            tipEl.style.top           = `${event.clientY}px`;
            tipEl.style.display       = 'block';
          })
          .on('mousemove', (event) => {
            tipEl.style.left = `${event.clientX}px`;
            tipEl.style.top  = `${event.clientY}px`;
          })
          .on('mouseleave', () => {
            dot.transition().duration(150).attr('r', 4.5);
            tipEl.style.display = 'none';
          });
      });
    });
  }

  onMount(() => {
    // Append tooltip directly to <body> to escape any CSS transform stacking context
    const tipEl = document.createElement('div');
    Object.assign(tipEl.style, {
      position:       'fixed',
      pointerEvents:  'none',
      zIndex:         '9999',
      display:        'none',
      minWidth:       '180px',
      maxWidth:       '240px',
      padding:        '8px 11px 9px',
      borderRadius:   '7px',
      backdropFilter: 'blur(10px)',
      boxShadow:      '0 4px 24px rgba(0,0,0,0.18)',
      transform:      'translate(-50%, calc(-100% - 12px))',
    });
    document.body.appendChild(tipEl);

    draw(tipEl);

    let raf;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        tipEl.style.display = 'none';
        draw(tipEl);
      });
    };
    window.addEventListener('resize', onResize);

    const mo = new MutationObserver(() => {
      tipEl.style.display = 'none';
      draw(tipEl);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('resize', onResize);
      mo.disconnect();
      tipEl.remove();
    };
  });
</script>

<div bind:this={wrapEl} style="overflow-x:auto;">
  <svg
    bind:this={svgEl}
    role="img"
    aria-label="AI model releases by vendor, 2024 to early 2026"
    style="display:block;"
  ></svg>
</div>
