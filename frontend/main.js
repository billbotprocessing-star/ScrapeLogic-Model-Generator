/**
 * ScrapeLogic Core Frontend Logic
 * Orchestrates the transition from URL input to AI-generated artifacts
 */

// Initialize Lucide Icons on load
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

async function handleAnalyze() {
  const urlInput = document.getElementById("urlInput");
  const url = urlInput.value.trim();

  // Simple URL Validation
  if (!url || !url.startsWith('http')) {
    return alert("Please enter a valid URL (starting with http:// or https://) to begin analysis.");
  }

  // UI Element Selection
  const processing = document.getElementById("processing");
  const resultsSection = document.getElementById("resultsSection");
  const transformationPreview = document.getElementById("transformationPreview");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const btnText = document.getElementById("btnText");

  // Phase 1: Enter Loading State
  processing.classList.remove("hidden");
  resultsSection.classList.add("hidden");
  transformationPreview.classList.add("hidden");
  analyzeBtn.disabled = true;
  btnText.innerText = "Analyzing...";

  try {
    // Phase 2: Webhook Trigger (n8n Logic Engine)
    const response = await fetch("https://billbotprocessing.app.n8n.cloud/webhook/analyze-site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        url: url,
        timestamp: new Date().toISOString(),
        engine: "GPT-5.2-Creation-Logic"
      })
    });

    if (!response.ok) throw new Error("Connection failed — check n8n endpoint.");

    const data = await response.json();

    // Helper: Safely render lists from arrays
    const renderList = (items, templateFn) => 
      (items && Array.isArray(items) && items.length > 0) 
        ? items.map(templateFn).join('') 
        : '<p class="text-slate-500 italic">No data returned for this segment.</p>';

    // Phase 3: Dynamic Artifact Generation
    resultsSection.innerHTML = `
      <div class="flex flex-col items-center mb-12">
        <div class="h-1 w-20 bg-emerald-500 rounded-full mb-4"></div>
        <h2 class="text-3xl md:text-4xl font-bold text-center">Strategic Artifacts for ${new URL(url).hostname}</h2>
      </div>
      
      <div class="grid gap-8">
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-2xl transition hover:border-emerald-500/30">
          <div class="flex items-center gap-3 mb-6">
            <i data-lucide="target" class="w-6 h-6 text-emerald-400"></i>
            <h3 class="font-bold text-xl uppercase tracking-wider">${data.positioning?.title || 'Core Positioning'}</h3>
          </div>
          <p class="text-slate-300 leading-relaxed text-lg">${data.positioning?.content || 'Analysis pending...'}</p>
        </div>

        <div class="bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-2xl transition hover:border-emerald-500/30">
          <div class="flex items-center gap-3 mb-6">
            <i data-lucide="trending-up" class="w-6 h-6 text-emerald-400"></i>
            <h3 class="font-bold text-xl uppercase tracking-wider">Monetization Matrix</h3>
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            ${renderList(data.monetization?.angles, angle => `
              <div class="p-5 bg-slate-900/40 rounded-lg border border-slate-800 hover:bg-slate-900/60 transition">
                <span class="text-[10px] font-black text-emerald-400 uppercase tracking-widest">${angle.model}</span>
                <p class="text-sm text-slate-300 mt-3 mb-4">${angle.value}</p>
                <div class="flex items-center justify-between pt-3 border-t border-slate-800/50">
                  <span class="text-[10px] text-slate-500 uppercase">Viability</span>
                  <span class="text-xs font-mono text-emerald-500">${angle.viability}/10</span>
                </div>
              </div>
            `)}
          </div>
        </div>

        <div class="bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-2xl">
          <div class="flex items-center gap-3 mb-6">
            <i data-lucide="search" class="w-6 h-6 text-emerald-400"></i>
            <h3 class="font-bold text-xl uppercase tracking-wider">Under-Monetized Gaps</h3>
          </div>
          <ul class="space-y-4">
            ${renderList(data.gaps?.opportunities, gap => `
              <li class="group flex items-start gap-3 text-slate-400 hover:text-slate-200 transition">
                <span>${gap}</span>
              </li>
            `)}
          </ul>
        </div>

        <div class="bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-2xl">
          <div class="flex items-center gap-3 mb-6">
            <i data-lucide="layers" class="w-6 h-6 text-emerald-400"></i>
            <h3 class="font-bold text-xl uppercase tracking-wider">Validated Offer Stack</h3>
          </div>
          <div class="space-y-6">
            ${renderList(data.offerStack?.tiers, tier => `
              <div class="relative pl-6 py-2 border-l-2 border-emerald-500/20 hover:border-emerald-500 transition">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h4 class="font-bold text-white text-lg">${tier.name}</h4>
                  <span class="text-emerald-400 font-mono font-bold">${tier.price}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span class="text-[10px] text-slate-500 uppercase font-bold">Deliverables</span>
                    <p class="text-sm text-slate-400">${tier.deliverables}</p>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-500 uppercase font-bold">Fulfillment Logic</span>
                    <p class="text-sm text-slate-400">${tier.fulfillment}</p>
                  </div>
                </div>
              </div>
            `)}
          </div>
        </div>

        <div class="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-8 shadow-2xl">
          <div class="flex items-center gap-3 mb-6">
            <i data-lucide="rocket" class="w-6 h-6 text-emerald-400"></i>
            <h3 class="font-bold text-xl uppercase tracking-wider">Launch Roadmap</h3>
          </div>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
               <h4 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Recommended Tool Stack</h4>
               <div class="flex flex-wrap gap-2">
                  ${renderList(data.speedToMarket?.toolStack, tool => `
                    <span class="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-300 font-mono">${tool}</span>
                  `)}
               </div>
            </div>
            <div class="space-y-4">
               <h4 class="text-sm font-bold text-slate-500 uppercase tracking-widest">Acquisition Script</h4>
               <div class="p-4 bg-slate-950/80 rounded border border-slate-800 italic text-sm text-slate-300 leading-relaxed relative">
                 <i data-lucide="quote-left" class="w-4 h-4 text-emerald-900 absolute top-2 left-2"></i>
                 "${data.speedToMarket?.firstCustomer || 'Script generation failed.'}"
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <button onclick="window.print()" class="text-slate-500 hover:text-emerald-400 text-xs transition flex items-center gap-2 mx-auto">
          <i data-lucide="download" class="w-3 h-3"></i> Export Strategy as PDF
        </button>
      </div>
    `;

    // Phase 4: Finalize UI
    resultsSection.classList.remove("hidden");
    lucide.createIcons(); // Re-initialize icons for new DOM elements
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (error) {
    console.error("ScrapeLogic Pipeline Error:", error);
    alert("Pipeline Error: Ensure your n8n instance is active and the URL is accessible.");
    transformationPreview.classList.remove("hidden");
  } finally {
    processing.classList.add("hidden");
    analyzeBtn.disabled = false;
    btnText.innerText = "Generate Plan";
  }
}
