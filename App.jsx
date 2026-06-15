<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>SCANORY | Premium Pizza Masterclass</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Raleway:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap" rel="stylesheet">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Elms Sans"', 'Inter', 'sans-serif'],
                        heading: ['Raleway', 'sans-serif'],
                    },
                    colors: {
                        scanory: {
                            bg: '#12100E',
                            section: '#1E1A17',
                            primary: '#C68A47',
                            secondary: '#A0682B',
                        }
                    }
                }
            }
        }
    </script>

    <style>
        @font-face { font-family: 'Elms Sans'; src: local('Elms Sans'), sans-serif; }
        
        body { background-color: #12100E; color: #F4F0EA; -webkit-tap-highlight-color: transparent; }
        h1, h2, h3, h4, .font-heading { font-family: 'Raleway', sans-serif; }
        
        /* Smooth expanson for the grid */
        #grid-container {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
        }
        #grid-container.unlocked {
            max-height: 5000px; /* Arbitrary large number to allow full expansion */
            opacity: 1;
        }

        /* Modal transitions */
        .modal-overlay {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }
        .modal-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .modal-content {
            transform: translateY(20px) scale(0.98);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-overlay.active .modal-content {
            transform: translateY(0) scale(1);
        }

        /* 3D Flip Card */
        .flip-card-inner {
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
            transform: rotateY(180deg);
        }
        .flip-front, .flip-back {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
        .flip-back {
            transform: rotateY(180deg);
        }

        /* Continuous Animations */
        @keyframes subtle-pulse {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }
        .animate-subtle-pulse { animation: subtle-pulse 3s infinite ease-in-out; }


        @keyframes scroll-cue-bounce {
            0%, 100% { transform: translateY(0); opacity: .62; }
            50% { transform: translateY(8px); opacity: 1; }
        }
        #scroll-cue {
            opacity: 0;
            transform: translateY(-6px);
            pointer-events: none;
            transition: opacity .35s ease, transform .35s ease;
        }
        #scroll-cue.visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
        #scroll-cue .scroll-cue-icon {
            animation: scroll-cue-bounce 1.35s infinite ease-in-out;
        }

        @keyframes pizza-hover {
            0%, 100% { transform: rotate(0deg) scale(1); }
            33% { transform: rotate(-4deg) scale(1.035); }
            66% { transform: rotate(6deg) scale(1.035); }
        }
        .pizza-active { animation: pizza-hover 0.6s ease-out forwards; }

        @keyframes scanory-oregano-fall {
            0% { opacity: 0; transform: translate3d(0, -18px, 0) rotate(0deg) scale(0.9); }
            15% { opacity: 0.82; transform: translate3d(var(--drift-a), calc(var(--fall) * 0.18), 0) rotate(calc(var(--rot) * 0.22)) scale(1); }
            48% { opacity: 0.78; transform: translate3d(var(--drift-b), calc(var(--fall) * 0.48), 0) rotate(calc(var(--rot) * 0.56)) scale(0.96); }
            78% { opacity: 0.45; transform: translate3d(var(--drift-c), calc(var(--fall) * 0.78), 0) rotate(calc(var(--rot) * 0.82)) scale(1.02); }
            100% { opacity: 0; transform: translate3d(calc(var(--drift-a) * 0.25), var(--fall), 0) rotate(var(--rot)) scale(0.85); }
        }
        
        /* Custom Scrollbar for Modal */
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(198,138,71,0.3); border-radius: 10px; }
    </style>
</head>
<body class="selection:bg-amber-300 selection:text-stone-950">

    <div class="relative isolate min-h-screen overflow-x-hidden text-[#fff7ea]">
        <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(180deg,#120b06_0%,#160d07_42%,#100906_100%)]"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,164,65,.13),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(120,64,24,.10),transparent_34%)]"></div>
            <div class="absolute inset-0 opacity-[0.022] [background-image:linear-gradient(45deg,#fff_1px,transparent_1px),linear-gradient(-45deg,#fff_1px,transparent_1px)] [background-size:34px_34px]"></div>
        </div>

        <div id="particle-container" class="pointer-events-none fixed inset-0 z-50 overflow-hidden [contain:layout_paint]"></div>

        <main class="relative mx-auto w-full max-w-[980px] px-4 py-4 sm:px-8 sm:py-8">
            
            <section class="relative min-h-[calc(100svh-2rem)] overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.055] px-5 py-7 shadow-xl shadow-black/30 sm:min-h-[560px] sm:rounded-[2rem] sm:p-10 sm:shadow-2xl sm:shadow-black/35 sm:backdrop-blur-xl">
                <div class="absolute -right-20 -top-20 hidden h-56 w-56 rounded-full bg-amber-500/10 blur-3xl sm:block"></div>
                <div class="absolute -bottom-20 left-4 hidden h-56 w-56 rounded-full bg-amber-900/10 blur-3xl sm:block"></div>

                <div class="relative flex min-h-[calc(100svh-5.5rem)] flex-col items-center justify-center text-center sm:min-h-[480px]">
                    <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f0c06a] via-[#b8732a] to-[#6b3f1d] text-3xl shadow-xl shadow-black/30">🍕</div>
                    <p class="mb-3 text-[11px] font-black uppercase tracking-[0.42em] text-amber-300">Scanory Kitchen</p>
                    <h1 class="font-heading mx-auto max-w-3xl text-5xl font-black leading-[.88] tracking-[-0.07em] sm:text-7xl">Your wall art just became a recipe book.</h1>
                    <p class="mx-auto mt-5 max-w-lg text-sm leading-7 text-amber-50/66 sm:text-base">20 masterclass recipes unlocked from one single visual scan.</p>
                    
                    <button id="unlock-btn" class="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d9a441] px-6 py-3.5 text-sm font-black text-stone-950 shadow-xl shadow-black/25 active:scale-95 transition-transform">
                        <svg id="lock-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span id="unlock-text">Unlock recipes</span>
                    </button>

                    <button id="scroll-cue" aria-label="Scroll to recipes" class="mt-6 inline-flex flex-col items-center gap-2 text-amber-200/80 active:scale-95 transition-transform">
                        <span class="text-[10px] font-black uppercase tracking-[0.32em]">Scroll</span>
                        <span class="scroll-cue-icon flex h-11 w-11 items-center justify-center rounded-full border border-amber-200/20 bg-white/[0.06] shadow-lg shadow-black/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 5v14"></path>
                                <path d="m19 12-7 7-7-7"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </section>

            <div id="grid-container">
                <section class="relative mt-5 overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/22 p-5 shadow-xl shadow-black/20 sm:mt-7 sm:rounded-[2rem] sm:p-8 sm:shadow-2xl sm:shadow-black/25 sm:backdrop-blur-xl">
                    <div class="absolute -right-14 top-8 hidden h-44 w-44 rounded-full bg-amber-500/10 blur-3xl sm:block"></div>
                    <div class="absolute -left-16 bottom-0 hidden h-44 w-44 rounded-full bg-orange-900/10 blur-3xl sm:block"></div>

                    <div class="relative">
                        <p class="text-[11px] font-black uppercase tracking-[0.38em] text-amber-300">Tap to taste</p>
                        <h2 class="font-heading mt-3 max-w-xl text-4xl font-black leading-[.92] tracking-[-0.055em] sm:text-5xl">Choose tonight’s pizza</h2>
                    </div>

                    <div id="pizza-grid" class="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        </div>
                </section>

                <section class="relative mt-5 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-5 sm:mt-7 sm:rounded-[2rem] sm:p-8 sm:backdrop-blur-xl">
                    <div class="grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
                        
                        <div class="rounded-[1.55rem] bg-[#20130b] p-5 ring-1 ring-white/10 sm:rounded-[1.8rem] sm:p-6">
                            <p class="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">Kitchen note</p>
                            <h2 class="font-heading mt-3 text-4xl font-black leading-[.95] tracking-[-0.055em]">Before you bake</h2>
                            <div class="mt-5 space-y-3 text-sm leading-6 text-amber-50/70">
                                <p>Heat the oven as high as possible.</p>
                                <p>Use less sauce than you think.</p>
                                <p>Fresh toppings go after baking.</p>
                            </div>
                            <button id="secret-btn" class="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-5 py-3 text-sm font-black text-amber-100 active:scale-[.98] transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
                                Touch for chef secret
                            </button>
                        </div>

                        <div id="dough-card" class="flip-card group relative min-h-[560px] overflow-hidden rounded-[1.55rem] border border-white/10 bg-transparent p-0 text-left min-[420px]:min-h-[530px] sm:min-h-[360px] sm:rounded-[1.8rem] cursor-pointer" style="perspective: 1200px;">
                            <div class="flip-card-inner relative h-full min-h-[560px] w-full min-[420px]:min-h-[530px] sm:min-h-[360px] bg-gradient-to-br from-[#2a180d] via-[#1b1009] to-[#101a12] rounded-[1.55rem] sm:rounded-[1.8rem] ring-1 ring-white/5">
                                
                                <div class="flip-front absolute inset-0 p-5 sm:p-6">
                                    <div class="absolute -right-16 -top-16 hidden h-48 w-48 rounded-full bg-amber-500/12 blur-3xl sm:block"></div>
                                    <div class="absolute -bottom-14 -left-14 hidden h-48 w-48 rounded-full bg-amber-900/10 blur-3xl sm:block"></div>

                                    <div class="relative grid h-full min-h-[510px] place-items-center text-center min-[420px]:min-h-[480px] sm:min-h-[310px]">
                                        <div>
                                            <div class="animate-subtle-pulse mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#d9a441] via-[#8b5a2b] to-[#4a2b15] text-4xl shadow-xl shadow-black/25 sm:shadow-2xl sm:shadow-black/30">🥖</div>
                                            <p class="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">Perfect pizza dough</p>
                                            <h3 class="font-heading mx-auto mt-3 max-w-md text-3xl font-black leading-[.94] tracking-[-0.055em] sm:text-4xl">One dough for every pizza.</h3>
                                            
                                            <div class="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2 text-center text-xs font-bold text-amber-50/75">
                                                <div class="rounded-2xl bg-white/[0.07] px-3 py-3"><span class="block text-lg text-amber-200">500 g</span>Flour</div>
                                                <div class="rounded-2xl bg-white/[0.07] px-3 py-3"><span class="block text-lg text-amber-200">325 ml</span>Water</div>
                                                <div class="rounded-2xl bg-white/[0.07] px-3 py-3"><span class="block text-lg text-amber-200">24h</span>Ferment</div>
                                            </div>
                                            <p class="mx-auto mt-5 max-w-xs text-sm font-bold leading-6 text-amber-50/62">Tap to flip the card and reveal the full dough formula.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flip-back absolute inset-0 overflow-y-auto overscroll-contain p-5 sm:p-6 custom-scroll">
                                    <div class="absolute -right-16 -top-16 hidden h-48 w-48 rounded-full bg-amber-500/12 blur-3xl sm:block"></div>
                                    <div class="relative">
                                        <p class="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">Dough formula</p>
                                        <h3 class="font-heading mt-3 text-3xl font-black leading-[.94] tracking-[-0.055em] sm:text-4xl">The base recipe</h3>

                                        <div class="mt-5 grid gap-4 sm:grid-cols-2">
                                            <div class="rounded-3xl bg-black/20 p-4 ring-1 ring-white/10">
                                                <h4 class="font-heading mb-3 text-sm font-black uppercase tracking-[0.16em] text-amber-300">Ingredients</h4>
                                                <ul class="space-y-2 text-sm leading-6 text-amber-50/76">
                                                    <li>500 g tipo 00 or bread flour</li>
                                                    <li>325 ml lukewarm water</li>
                                                    <li>10 g sea salt</li>
                                                    <li>2 g dry yeast or 6 g fresh yeast</li>
                                                    <li>1 tbsp olive oil, optional</li>
                                                </ul>
                                            </div>
                                            <div class="rounded-3xl bg-black/20 p-4 ring-1 ring-white/10">
                                                <h4 class="font-heading mb-3 text-sm font-black uppercase tracking-[0.16em] text-amber-300">Method</h4>
                                                <ol class="space-y-2 text-sm leading-6 text-amber-50/76">
                                                    <li>1. Mix flour and water.</li>
                                                    <li>2. Rest for 20 minutes.</li>
                                                    <li>3. Add yeast, salt and oil.</li>
                                                    <li>4. Knead until smooth.</li>
                                                    <li>5. Cold ferment 24–48h.</li>
                                                    <li>6. Bring to room temperature.</li>
                                                </ol>
                                            </div>
                                        </div>
                                        <div class="mt-4 rounded-3xl bg-[#d9a441] p-4 text-sm font-black leading-6 text-stone-950">
                                            Stretch by hand. Do not use a rolling pin — it pushes out the air that makes the crust light.
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </main>

        <div id="recipe-modal" class="modal-overlay fixed inset-0 z-40 flex items-end bg-black/72 p-3 sm:items-center sm:justify-center sm:p-6" onclick="closeRecipeModal()">
            <div id="recipe-content" class="modal-content relative max-h-[92svh] w-full max-w-3xl overscroll-contain overflow-y-auto rounded-[1.8rem] transform-gpu border border-white/10 p-5 shadow-xl shadow-black sm:rounded-[2rem] sm:p-7 sm:shadow-2xl custom-scroll" onclick="event.stopPropagation()">
                <div id="modal-gradient-top" class="absolute inset-x-0 top-0 h-1.5"></div>
                
                <button onclick="closeRecipeModal()" class="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white active:scale-95 sm:backdrop-blur transition-transform hover:bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                <div class="grid gap-5 md:grid-cols-[.78fr_1.22fr]">
                    <div class="flex flex-col items-center justify-center rounded-[1.45rem] bg-black/18 p-4 ring-1 ring-white/10 sm:rounded-[1.6rem]">
                        <div id="modal-pizza-illustration"></div>
                        <div class="mt-2 flex flex-wrap justify-center gap-2">
                            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span id="modal-time"></span></span>
                            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg><span id="modal-heat"></span></span>
                            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>1 pizza</span>
                        </div>
                    </div>

                    <div>
                        <p class="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">Recipe unlocked</p>
                        <h2 id="modal-title" class="font-heading mt-2 text-4xl font-black leading-[.92] tracking-[-0.06em] sm:text-5xl"></h2>
                        <p id="modal-line" class="mt-3 text-sm leading-6 text-amber-50/70"></p>

                        <div class="mt-6 grid gap-5 sm:grid-cols-2">
                            <div>
                                <h4 class="font-heading mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-amber-300">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg> Ingredients
                                </h4>
                                <ul id="modal-ingredients" class="space-y-2"></ul>
                            </div>
                            <div>
                                <h4 class="font-heading mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-amber-300">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" x2="18" y1="17" y2="17"/></svg> Preparation
                                </h4>
                                <ol id="modal-steps" class="space-y-3"></ol>
                            </div>
                        </div>

                        <div id="modal-chef-gradient" class="mt-6 rounded-3xl p-[1px]">
                            <div class="rounded-3xl bg-black/45 p-4">
                                <p class="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Chef tip
                                </p>
                                <p id="modal-chef" class="text-sm leading-6 text-amber-50/82"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="secret-modal" class="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:backdrop-blur-md" onclick="closeSecretModal()">
            <div class="modal-content w-full max-w-sm rounded-[1.8rem] border border-amber-200/20 bg-gradient-to-br from-[#d9a441] to-[#8b5a2b] p-6 text-stone-950 shadow-xl shadow-black/35 sm:shadow-2xl sm:shadow-black/40" onclick="event.stopPropagation()">
                <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-950 text-3xl">🔥</div>
                <p class="text-xs font-black uppercase tracking-[0.28em] text-stone-800/70">Chef secret</p>
                <h3 class="font-heading mt-2 text-3xl font-black leading-[.95] tracking-[-0.05em]">Room temperature dough changes everything.</h3>
                <p class="mt-4 text-sm font-bold leading-6 text-stone-900/80">Let the dough rest before stretching. Cold dough tears, shrinks, and makes the crust dense.</p>
            </div>
        </div>

    </div>

    <script>
        // --- DATA ---
        const pizzas = [
            { id: 1, name: "Margherita Napoletana", label: "Classic Italian", line: "Tomato, mozzarella, basil — nothing more, nothing less.", time: "12 min", heat: "Mild", palette: "from-amber-300/70 via-orange-400/35 to-emerald-500/18", bg: "from-[#2a160d] via-[#1a100b] to-[#0f1a12]", sauce: "#d9482f", cheese: "#fff2c7", herb: "#15803d", topping: "#f9fafb", accent: "text-amber-100", ingredients: ["250 g pizza dough", "San Marzano tomato sauce", "Fior di latte or fresh mozzarella", "Fresh basil", "Extra virgin olive oil", "Sea salt"], steps: ["Stretch the dough and leave a soft raised edge.", "Spread a light layer of tomato sauce.", "Add torn mozzarella pieces.", "Bake hot until the crust is blistered.", "Finish with basil and olive oil."], chef: "The premium look comes from restraint. Keep it clean and let the ingredients breathe." },
            { id: 2, name: "Pepperoni Hot Honey", label: "Sweet Heat", line: "Crispy pepperoni, melted cheese and warm spicy honey.", time: "14 min", heat: "Spicy", palette: "from-orange-400/70 via-amber-300/32 to-red-500/22", bg: "from-[#2b170b] via-[#1b1009] to-[#1c0b07]", sauce: "#c2410c", cheese: "#ffe9a3", herb: "#84cc16", topping: "#991b1b", accent: "text-orange-100", ingredients: ["250 g pizza dough", "Tomato sauce", "Mozzarella", "Pepperoni", "Hot honey", "Chili flakes", "Oregano"], steps: ["Spread tomato sauce thinly.", "Add mozzarella and pepperoni.", "Bake until pepperoni curls and crisps.", "Drizzle hot honey after baking.", "Finish with oregano and chili flakes."], chef: "Hot honey goes on after the oven. That keeps the flavor glossy, warm and sharp." },
            { id: 3, name: "Quattro Formaggi", label: "Cheese Lover", line: "Four cheeses melting into one rich, creamy bite.", time: "13 min", heat: "Mild", palette: "from-yellow-200/60 via-amber-400/30 to-yellow-900/20", bg: "from-[#2a1a0b] via-[#1b1209] to-[#130d08]", sauce: "#fcd34d", cheese: "#fff7d6", herb: "#a16207", topping: "#d8b4fe", accent: "text-yellow-100", ingredients: ["250 g pizza dough", "Mozzarella", "Gorgonzola", "Parmigiano Reggiano", "Fontina or Taleggio", "Olive oil", "Black pepper"], steps: ["Use a very light white base.", "Add mozzarella first.", "Scatter gorgonzola, fontina and parmigiano.", "Bake hot and fast.", "Finish with black pepper and olive oil."], chef: "Use gorgonzola like perfume, not like sauce. A little makes the whole pizza feel expensive." },
            { id: 4, name: "Prosciutto & Rucola", label: "Premium Fresh", line: "Fresh rucola, delicate prosciutto and parmesan shavings.", time: "12 min", heat: "Fresh", palette: "from-amber-300/55 via-emerald-500/28 to-[#8b5a2b]/18", bg: "from-[#1f1a0d] via-[#17120b] to-[#0f1c14]", sauce: "#dc2626", cheese: "#fff7ed", herb: "#16a34a", topping: "#fecaca", accent: "text-emerald-100", ingredients: ["250 g pizza dough", "Tomato sauce", "Mozzarella", "Prosciutto", "Rucola", "Parmigiano shavings", "Olive oil"], steps: ["Bake the base with sauce and mozzarella.", "Remove when the crust is golden.", "Add prosciutto after baking.", "Top with rucola and parmigiano.", "Finish with olive oil."], chef: "The fresh ingredients must stay fresh. Put them on after the oven, never before." },
            { id: 5, name: "Truffle Mushroom Bianca", label: "Gourmet", line: "Earthy mushrooms, white base and a final touch of truffle oil.", time: "15 min", heat: "Aromatic", palette: "from-stone-700/50 via-amber-200/30 to-stone-300/20", bg: "from-[#24180f] via-[#17110b] to-[#0f0d0a]", sauce: "#e7e5e4", cheese: "#fff7ed", herb: "#57534e", topping: "#292524", accent: "text-stone-100", ingredients: ["250 g pizza dough", "Ricotta or white cream base", "Mozzarella", "Thinly sliced or pre-roasted mushrooms", "Parmigiano", "Thyme", "Truffle oil"], steps: ["Spread a thin white base.", "Add mozzarella and thinly sliced or pre-roasted mushrooms.", "Bake until the edge crisps and the mushrooms stay concentrated, not watery.", "Add parmigiano while hot.", "Finish with thyme and truffle oil."], chef: "Truffle oil goes last. Heat kills the aroma you paid for." },
            { id: 6, name: "Capricciosa Moderna", label: "European Elite", line: "Rich ham, earthy mushrooms, and glossy black olives arranged with precision.", time: "13 min", heat: "Mild", palette: "from-rose-400/50 via-amber-500/25 to-stone-600/20", bg: "from-[#241212] via-[#190e0e] to-[#0f0f12]", sauce: "#cc3333", cheese: "#fffdd0", herb: "#1e3f20", topping: "#f4a261", accent: "text-rose-100", ingredients: ["250 g pizza dough", "Traditional pelat", "Fior di latte", "Gourmet cooked ham", "Fresh sliced button mushrooms", "Kalamata olives", "Wild oregano"], steps: ["Apply sauce and cheese evenly.", "Layer the ham ribbons and flat-cut mushrooms.", "Bake until the edges display a deep golden honeycomb.", "Garnish with fresh olives and a pinch of oregano."], chef: "Slice the mushrooms ultra-thin. Heavy, wet mushrooms release water and ruin your crispy base texture." },
            { id: 7, name: "Diavola Infernal", label: "Fiery Crimson", line: "Spicy Calabrian salami tearing through melted mozzarella and chili oils.", time: "12 min", heat: "Very Hot", palette: "from-red-600/60 via-orange-500/30 to-zinc-900/40", bg: "from-[#330b0b] via-[#1c0707] to-[#0d0404]", sauce: "#b31a1a", cheese: "#fff5cc", herb: "#1b4314", topping: "#7a0c0c", accent: "text-red-200", ingredients: ["250 g pizza dough", "Spicy tomato coulis", "High-moisture mozzarella", "Soppressata or Ventricina salame", "Fresh red chili slices", "Nduja infused oil"], steps: ["Base with spicy tomato sauce and torn cheese.", "Layer with thin slices of artisanal hot salami.", "Scatter fresh chili wheels across the surface.", "Flash bake at maximum heat, finish with red oil."], chef: "If using Nduja, drop it on in tiny pea-sized pearls. It melts completely and paints the cheese with pure smoky spice." },
            { id: 8, name: "Vegetariana Verde", label: "Garden Feast", line: "Charred bell peppers, tender zucchini, and sweet caramelized red onion.", time: "14 min", heat: "Mild", palette: "from-emerald-400/60 via-yellow-400/25 to-teal-600/15", bg: "from-[#0e1f13] via-[#0b140e] to-[#090b0a]", sauce: "#e64a19", cheese: "#fffae6", herb: "#2e7d32", topping: "#fb8c00", accent: "text-emerald-100", ingredients: ["250 g pizza dough", "Herb pelat base", "Low-moisture mozzarella", "Grilled zucchini ribbons", "Roasted sweet peppers", "Red onion slivers", "Sweet corn", "Cherry tomatoes"], steps: ["Lightly sauce and cheese the dough structure.", "Artistically arrange pre-grilled or roasted vegetables.", "Bake until the vegetable edges gain a delicate smoky char.", "Squeeze a drop of lemon juice over the top immediately after baking."], chef: "Raw vegetables sweat heavily in a home oven. Always roast or grill your peppers and zucchini beforehand to concentrate their sugars." },
            { id: 9, name: "Marinara Antica", label: "The Purest Legacy", line: "An ancient Neapolitan masterpiece focused entirely on garlic, oil, and tomato.", time: "11 min", heat: "Aromatic", palette: "from-red-500/70 via-amber-600/35 to-stone-800/20", bg: "from-[#2b0c08] via-[#1c0906] to-[#120807]", sauce: "#c82333", cheese: "transparent", herb: "#145a32", topping: "#f4d03f", accent: "text-amber-200", ingredients: ["250 g pizza dough", "Premium San Marzano whole tomatoes", "Garlic cloves (sliced paper-thin)", "Dried mountain oregano", "Finest extra virgin olive oil"], steps: ["Crush San Marzano tomatoes by hand onto the dough.", "Distribute garlic slices perfectly so they don't bunch up.", "Dust heavily with high-grade wild oregano.", "Drizzle olive oil in a spiral motion and bake intensely."], chef: "No cheese means the sauce is exposed. Use the highest quality canned Italian plum tomatoes you can source." },
            { id: 10, name: "Calzone Napoletano", label: "Crescent Moon", line: "A golden, puffed pocket hiding a steaming center of ricotta and savory ham.", time: "15 min", heat: "Mild", palette: "from-amber-400/60 via-orange-300/30 to-amber-900/20", bg: "from-[#291b0d] via-[#1a1109] to-[#120e0a]", sauce: "#de4326", cheese: "#ffffff", herb: "#27ae60", topping: "#f1948a", accent: "text-amber-100", ingredients: ["250 g pizza dough", "Fresh ricotta cheese", "Mozzarella cubes", "Prosciutto cotto (cooked ham)", "Spoonful of tomato sauce for top"], steps: ["Roll out the circle, spread ricotta and fillings on one hemisphere.", "Fold over and press the edges with a rope-like crimp to seal.", "Ladle a tiny smudge of sauce on top to prevent the pocket from bursting.", "Bake until it resembles a giant puffed, blistered cloud."], chef: "Ensure your ricotta is drained dry through a cheesecloth overnight, or the inside steam will turn the interior soggy." },
            { id: 11, name: "Aloha Paradiso", label: "Salty & Sweet", line: "Sweet caramelized pineapple cubes balancing against premium cured ham strips.", time: "13 min", heat: "Mild", palette: "from-yellow-400/60 via-rose-400/30 to-orange-500/15", bg: "from-[#261d0f] via-[#1a140b] to-[#120d08]", sauce: "#e03e1b", cheese: "#fff9db", herb: "#218f21", topping: "#ffd54f", accent: "text-yellow-100", ingredients: ["250 g pizza dough", "San Marzano sauce", "Mozzarella", "Artisanal smoked ham", "Fresh pineapple (never canned)", "Jalapeno wheels (optional)"], steps: ["Sauce and blanket with premium cheese.", "Distribute strips of savory smoked ham.", "Scatter fresh, dry pineapple cubes evenly.", "Bake until pineapple edges turn golden brown and sweet."], chef: "Canned pineapple is loaded with excess syrup. Use fresh pineapple, slice it, and sear it in a hot dry pan before putting it on the pizza." },
            { id: 12, name: "Siciliana Umami", label: "Mediterranean Fire", line: "Salted capers, black olives, and briny anchovies forming an unforgettable profile.", time: "12 min", heat: "Savory", palette: "from-violet-400/40 via-red-500/30 to-stone-900/30", bg: "from-[#1a111e] via-[#120c15] to-[#0d090f]", sauce: "#bd2130", cheese: "#fffbe6", herb: "#196f3d", topping: "#2c3e50", accent: "text-purple-200", ingredients: ["250 g pizza dough", "Tomato sauce base", "Mozzarella", "Premium salted anchovy fillets", "Siciliana black olives", "Brined capers", "Pinch of chili flakes"], steps: ["Spread tomato and light cheese layers.", "Dot with capers and halved olives.", "Lay anchovy fillets across the top.", "Bake fast, allowing the anchovy oils to melt beautifully into the sauce."], chef: "Anchovies are deeply salty. Do not add salt to your sauce for this specific recipe, or you'll overpower the dish." },
            { id: 13, name: "Tonno e Cipolla Rossa", label: "Coastal Harvest", line: "Flaky white tuna paired with sweet, crisp rings of Tropea red onion.", time: "13 min", heat: "Savory", palette: "from-blue-400/40 via-fuchsia-400/25 to-stone-800/20", bg: "from-[#111a24] via-[#0d131a] to-[#090d12]", sauce: "#d32f2f", cheese: "#fffee0", herb: "#117a65", topping: "#c39bd3", accent: "text-blue-200", ingredients: ["250 g pizza dough", "Tangy tomato coulis", "Mozzarella cheese", "High-grade tuna steak in olive oil", "Tropea red onions sliced super thin"], steps: ["Sauce the base, cover with shredded mozzarella.", "Flake the drained tuna over the cheese layer.", "Cover with delicate red onion rings.", "Bake until onions soften and develop sweet, crispy tips."], chef: "Drain your tuna well and mix it with a tiny touch of olive oil and black pepper before flaking it onto the cheese." },
            { id: 14, name: "Frutti di Mare Costiera", label: "Seafood Luxury", line: "Marinated calamari, sweet shrimp, and mussels kissed by garlic and fresh parsley.", time: "14 min", heat: "Fresh", palette: "from-cyan-400/50 via-teal-500/30 to-amber-700/15", bg: "from-[#0a1c1c] via-[#081414] to-[#060c0c]", sauce: "#cb3224", cheese: "#fffdf0", herb: "#16a085", topping: "#e74c3c", accent: "text-cyan-100", ingredients: ["250 g pizza dough", "Light tomato oil base", "Mozzarella", "Cleaned small shrimp", "Squid rings", "Mussels", "Garlic butter splash", "Fresh chopped flat-leaf parsley"], steps: ["Flash sear seafood in garlic butter for 60 seconds first.", "Sauce and lightly cheese the pizza structure.", "Scatter seafood across the canvas, bake rapidly.", "Garnish with fresh parsley and a micro-drizzle of lemon."], chef: "Never put raw, wet frozen seafood mix on a pizza. It will turn into a mini lake. Defrost, dry thoroughly, and quick-sear it first." },
            { id: 15, name: "Mexicana Picante", label: "Border Crosser", line: "Spiced minced beef, sweet corn, black beans, and sharp pickled jalapenos.", time: "14 min", heat: "Spicy", palette: "from-amber-500/60 via-red-600/30 to-yellow-600/20", bg: "from-[#291605] via-[#1a0e03] to-[#0f0902]", sauce: "#c0392b", cheese: "#fcc232", herb: "#27ae60", topping: "#d35400", accent: "text-orange-200", ingredients: ["250 g pizza dough", "Fiery tomato sauce", "Cheddar-Mozzarella blend", "Seasoned taco beef", "Sweet corn", "Black beans", "Jalapeno slices"], steps: ["Layer the hot sauce and mixed cheese blend.", "Scatter seasoned cooked ground beef, corn, and beans.", "Top with pickled jalapenos.", "Bake until cheese bubbles intensely and turns amber."], chef: "Use a mix of Cheddar and Mozzarella. Cheddar provides a sharp, rich flavor note that compliments the spiced beef profile beautifully." },
            { id: 16, name: "Smoky BBQ Chicken", label: "The Smokehouse", line: "Tender shredded chicken breast drenched in deep, woody barbecue glaze.", time: "13 min", heat: "Rich", palette: "from-amber-600/60 via-orange-600/25 to-stone-900/40", bg: "from-[#241305] via-[#170c03] to-[#0f0802]", sauce: "#5c1d06", cheese: "#fff4cc", herb: "#1e4620", topping: "#f5b041", accent: "text-amber-200", ingredients: ["250 g pizza dough", "Artisanal hickory BBQ sauce", "Mozzarella & Smoked Gouda", "Pulled chicken breast", "Red onion rings", "Fresh cilantro"], steps: ["Replace normal tomato sauce with a thin layer of BBQ sauce.", "Add cheeses, followed by chicken and red onion rings.", "Bake until the edges display a deep mahogany caramelization.", "Top with fresh cilantro leaves."], chef: "Mix a tablespoon of olive oil into your BBQ sauce base. It slows down the sugar burning process inside a hot oven." },
            { id: 17, name: "Carbonara Suprema", label: "Roman Midnight", line: "Velvety egg cream base, crispy cured pancetta, and mountains of Pecorino.", time: "13 min", heat: "Rich", palette: "from-yellow-300/50 via-amber-400/25 to-stone-800/30", bg: "from-[#221c10] via-[#17130a] to-[#0f0c06]", sauce: "#fef9e7", cheese: "#fffce3", herb: "#784212", topping: "#eb984e", accent: "text-yellow-200", ingredients: ["250 g pizza dough", "Egg yolk, Pecorino and black pepper cream", "Fior di latte", "Crispy guanciale or pancetta cubes", "Freshly cracked black pepper", "Pecorino Romano"], steps: ["Create a light white base with cheese.", "Scatter lardons of cured pork across the surface.", "Bake until cheese is molten and pork fat renders completely.", "Out of the oven, swirl on the egg and Pecorino cream, then finish with black pepper."], chef: "Never bake the egg yolk mix directly at 400°C or it will scramble. Whisk it with Pecorino and black pepper, then swirl it onto the hot pizza immediately after it exits the oven." },
            { id: 18, name: "Bianca Ruzmarin", label: "Minimalist Dream", line: "An understated luxury of whipped ricotta, garlic oil, and fresh pine needles of rosemary.", time: "11 min", heat: "Aromatic", palette: "from-stone-300/50 via-emerald-400/20 to-stone-700/20", bg: "from-[#171916] via-[#10120f] to-[#0a0b0a]", sauce: "#f4f6f7", cheese: "#ffffff", herb: "#239b56", topping: "#eaecee", accent: "text-stone-300", ingredients: ["250 g pizza dough", "Extra virgin olive oil", "Garlic water brush", "Fresh mozzarella", "Whipped whole milk ricotta", "Fresh rosemary sprigs", "Flaky sea salt"], steps: ["Brush dough skin lightly with garlic oil.", "Scatter mozzarella tearing and add dollops of whipped ricotta.", "Sprinkle fresh rosemary leaves across the white landscape.", "Bake until golden, finish with structural sea salt flakes."], chef: "Soak your fresh rosemary in olive oil for 5 minutes before throwing it onto the pizza. This stops the hot oven environment from turning them black and bitter." },
            { id: 19, name: "Quattro Stagioni", label: "The Alchemy Wheel", line: "Four distinct quadrants celebrating ham, artichokes, mushrooms, and olives.", time: "14 min", heat: "Mild", palette: "from-orange-400/40 via-teal-400/25 to-rose-400/20", bg: "from-[#1c1612] via-[#130f0c] to-[#0c0a08]", sauce: "#d32f2f", cheese: "#fffdf2", herb: "#196f3d", topping: "#e59866", accent: "text-orange-100", ingredients: ["250 g pizza dough", "Classic tomato pelat", "Mozzarella", "Quadrant 1: Cooked ham", "Quadrant 2: Sliced mushrooms", "Quadrant 3: Marinated artichoke hearts", "Quadrant 4: Black olives"], steps: ["Apply sauce and cheese across the whole surface area.", "Visually divide the circle into 4 quarters.", "Place one ingredient exclusively inside each zone.", "Bake carefully until all quadrants reach symmetrical harmony."], chef: "Squeeze the marinated artichokes completely dry in a paper towel before chopping them up, or they will leak moisture into their quarter." },
            { id: 20, name: "Napoletana Eccellente", label: "Ancient Harbor", line: "A deep dive into old Neapolitan heritage using capers and pungent garlic oils.", time: "12 min", heat: "Savory", palette: "from-red-600/55 via-amber-500/25 to-slate-900/30", bg: "from-[#220f0a] via-[#160a06] to-[#0d0604]", sauce: "#c0392b", cheese: "#fffdea", herb: "#145a32", topping: "#566573", accent: "text-red-100", ingredients: ["250 g pizza dough", "San Marzano sauce", "Mozzarella", "Salted capers", "Garlic minced", "Oregano leaf", "Olive oil splash"], steps: ["Spread premium sauce, sprinkle garlic flakes.", "Add mozzarella cubes and scatter capers.", "Dust with oregano lines.", "Bake at intense volcanic heat until edge bubbles display beautiful dark micro-spots."], chef: "Wash your capers under running water to remove the harsh storage brine, then pat them completely dry before dropping them on the sauce." }
        ];

        // --- STATE & UTILS ---
        let isUnlocked = false;
        let selectedPizzaId = null;
        let isMobile = window.matchMedia("(max-width: 640px)").matches;
        
        window.addEventListener('resize', () => {
            isMobile = window.matchMedia("(max-width: 640px)").matches;
        });

        // --- RENDER SVG ILLUSTRATION ---
        function generatePizzaSVG(pizza, sizeClass) {
            const t = [
                { x: 34, y: 31, r: 8, c: pizza.topping }, { x: 61, y: 26, r: 6, c: pizza.herb },
                { x: 49, y: 50, r: 9, c: pizza.cheese },  { x: 27, y: 61, r: 6, c: pizza.herb },
                { x: 68, y: 64, r: 9, c: pizza.topping }, { x: 43, y: 72, r: 5, c: pizza.sauce },
                { x: 72, y: 43, r: 5, c: pizza.herb }
            ];
            
            let circles = t.map(item => `<circle cx="${item.x}" cy="${item.y}" r="${item.r}" fill="${item.c}" opacity="0.95" stroke="rgba(255,255,255,0.22)" stroke-width="1.4" />`).join('');

            return `
                <div class="relative ${sizeClass} mx-auto transform-gpu transition-transform duration-300" id="pizza-img-${pizza.id}">
                    <div class="absolute inset-3 rounded-full bg-gradient-to-br ${pizza.palette} opacity-[0.12] blur-lg sm:opacity-[0.22] sm:blur-2xl"></div>
                    <div class="absolute inset-[8%] rounded-full bg-[#7c3f16] shadow-[0_16px_26px_rgba(0,0,0,.32)] sm:shadow-[0_24px_44px_rgba(0,0,0,.42)]"></div>
                    <div class="absolute inset-[13%] rounded-full bg-gradient-to-br from-[#f5c46f] via-[#d88925] to-[#7c3f16]"></div>
                    <div class="absolute inset-[21%] rounded-full" style="background: radial-gradient(circle at 30% 24%, ${pizza.cheese} 0 10%, transparent 11%), radial-gradient(circle at 66% 60%, ${pizza.cheese} 0 8%, transparent 9%), ${pizza.sauce}"></div>
                    <svg class="absolute inset-[14%] h-[72%] w-[72%] overflow-visible" viewBox="0 0 100 100">
                        ${circles}
                        <path d="M18 48 C34 38, 43 60, 57 48 S76 50, 82 38" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </div>
            `;
        }

        // --- INIT GRID ---
        function initGrid() {
            const grid = document.getElementById('pizza-grid');
            let html = '';
            
            pizzas.forEach(pizza => {
                html += `
                    <button id="pizza-btn-${pizza.id}" onclick="openPizza(${pizza.id})" class="group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-3 text-left shadow-lg shadow-black/15 transition-all duration-300 active:scale-[0.985] sm:rounded-[1.7rem] sm:p-4 sm:shadow-xl sm:shadow-black/20 sm:hover:bg-white/[0.09]">
                        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${pizza.palette}"></div>
                        <div class="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${pizza.palette} opacity-[0.09] blur-lg sm:opacity-[0.16] sm:blur-xl"></div>
                        ${generatePizzaSVG(pizza, "h-24 w-24 min-[420px]:h-28 min-[420px]:w-28")}
                        <h3 class="font-heading mt-2 truncate text-[14px] font-black leading-4 tracking-[-0.04em] sm:text-lg sm:leading-5">${pizza.name}</h3>
                        <p class="mt-2 text-[11px] font-bold sm:text-xs ${pizza.accent}">${pizza.label}</p>
                    </button>
                `;
            });
            grid.innerHTML = html;
        }

        // --- INTERACTIONS ---
        document.getElementById('unlock-btn').addEventListener('click', () => {
            isUnlocked = !isUnlocked;
            const container = document.getElementById('grid-container');
            const icon = document.getElementById('lock-icon');
            const text = document.getElementById('unlock-text');

            const scrollCue = document.getElementById('scroll-cue');

            if (isUnlocked) {
                container.classList.add('unlocked');
                text.innerText = "Lock collection";
                icon.innerHTML = '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>';
                scrollCue.classList.add('visible');
            } else {
                container.classList.remove('unlocked');
                text.innerText = "Unlock recipes";
                icon.innerHTML = '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>';
                scrollCue.classList.remove('visible');
            }
        });

        document.getElementById('scroll-cue').addEventListener('click', () => {
            const container = document.getElementById('grid-container');
            const top = container.getBoundingClientRect().top + window.scrollY - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        });


        // --- OREGANO PARTICLES ---
        let burstCount = 0;
        function triggerFallingOregano() {
            burstCount++;
            const container = document.getElementById('particle-container');
            const leafCount = isMobile ? 6 : 10;
            
            for (let i = 0; i < leafCount; i++) {
                const direction = i % 2 === 0 ? 1 : -1;
                const drift = 18 + (i % 4) * 8;
                
                const left = 8 + ((i * 53) % 84);
                const delay = (i % 4) * 0.04;
                const duration = isMobile ? 1.05 + (i % 3) * 0.08 : 1.25 + (i % 4) * 0.1;
                const fall = isMobile ? 410 + (i % 3) * 26 : 520 + (i % 4) * 32;
                const driftA = direction * drift;
                const driftB = direction * -drift * 0.55;
                const driftC = direction * drift * 0.35;
                const rotate = direction * (230 + (i % 4) * 35);
                const size = 4 + (i % 3);

                const span = document.createElement('span');
                span.className = "absolute top-0 rounded-[60%] bg-emerald-300/70 shadow-sm shadow-emerald-950/30";
                
                span.style.left = `${left}%`;
                span.style.width = `${size * 1.8}px`;
                span.style.height = `${size}px`;
                span.style.borderRadius = "65% 35% 65% 35%";
                span.style.animationName = "scanory-oregano-fall";
                span.style.animationDuration = `${duration}s`;
                span.style.animationDelay = `${delay}s`;
                span.style.animationTimingFunction = "cubic-bezier(0.2, 0.8, 0.2, 1)";
                span.style.animationFillMode = "both";
                span.style.willChange = "transform, opacity";
                
                span.style.setProperty('--fall', `${fall}px`);
                span.style.setProperty('--drift-a', `${driftA}px`);
                span.style.setProperty('--drift-b', `${driftB}px`);
                span.style.setProperty('--drift-c', `${driftC}px`);
                span.style.setProperty('--rot', `${rotate}deg`);

                container.appendChild(span);
                
                // Cleanup after animation ends
                setTimeout(() => span.remove(), (duration + delay + 0.1) * 1000);
            }
        }

        // --- RECIPE MODAL ---
        function openPizza(id) {
            const pizza = pizzas.find(p => p.id === id);
            if (!pizza) return;
            
            selectedPizzaId = id;
            document.body.style.overflow = "hidden";
            triggerFallingOregano();

            // Highlight button
            document.querySelectorAll('[id^="pizza-btn-"]').forEach(btn => {
                btn.className = "group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-3 text-left shadow-lg shadow-black/15 transition-all duration-300 active:scale-[0.985] sm:rounded-[1.7rem] sm:p-4 sm:shadow-xl sm:shadow-black/20 sm:hover:bg-white/[0.09]";
            });
            const activeBtn = document.getElementById(`pizza-btn-${id}`);
            activeBtn.classList.remove('border-white/10', 'bg-white/[0.055]');
            activeBtn.classList.add('border-amber-300/55', 'bg-[#2a1a0b]/55');

            // Populate Modal
            const modal = document.getElementById('recipe-modal');
            const content = document.getElementById('recipe-content');
            
            // Clean up previous classes to reset state
            content.className = `modal-content relative max-h-[92svh] w-full max-w-3xl overscroll-contain overflow-y-auto rounded-[1.8rem] transform-gpu border border-white/10 p-5 shadow-xl shadow-black sm:rounded-[2rem] sm:p-7 sm:shadow-2xl custom-scroll bg-gradient-to-br ${pizza.bg}`;
            document.getElementById('modal-gradient-top').className = `absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${pizza.palette}`;
            
            document.getElementById('modal-pizza-illustration').innerHTML = generatePizzaSVG(pizza, "h-56 w-56 sm:h-72 sm:w-72");
            document.getElementById('modal-time').innerText = pizza.time;
            document.getElementById('modal-heat').innerText = pizza.heat;
            document.getElementById('modal-title').innerText = pizza.name;
            document.getElementById('modal-line').innerText = pizza.line;
            
            document.getElementById('modal-ingredients').innerHTML = pizza.ingredients.map(item => `<li class="flex gap-3 text-sm leading-6 text-amber-50/76"><span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300"></span>${item}</li>`).join('');
            document.getElementById('modal-steps').innerHTML = pizza.steps.map((step, index) => `<li class="flex gap-3 text-sm leading-6 text-amber-50/76"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-300 text-xs font-black text-stone-950">${index + 1}</span>${step}</li>`).join('');
            
            document.getElementById('modal-chef-gradient').className = `mt-6 rounded-3xl p-[1px] bg-gradient-to-r ${pizza.palette}`;
            document.getElementById('modal-chef').innerText = pizza.chef;

            // Trigger animations
            modal.classList.add('active');
            if(!isMobile) {
                const img = modal.querySelector(`#pizza-img-${pizza.id}`);
                if(img) {
                    img.classList.remove('pizza-active');
                    void img.offsetWidth; // trigger reflow
                    img.classList.add('pizza-active');
                }
            }
        }

        function closeRecipeModal() {
            document.getElementById('recipe-modal').classList.remove('active');
            selectedPizzaId = null;
            document.body.style.overflow = "";
        }

        // --- SECRET MODAL ---
        document.getElementById('secret-btn').addEventListener('click', () => {
            document.body.style.overflow = "hidden";
            document.getElementById('secret-modal').classList.add('active');
        });

        function closeSecretModal() {
            document.getElementById('secret-modal').classList.remove('active');
            if(!selectedPizzaId) document.body.style.overflow = "";
        }

        // --- DOUGH FLIP CARD ---
        document.getElementById('dough-card').addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        // Initialize grid on load
        window.addEventListener('DOMContentLoaded', initGrid);

    </script>
</body>
</html>
