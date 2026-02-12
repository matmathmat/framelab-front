<script>
  // Import images
  import heroMain from '$lib/assets/images/landingpage/herosection/cardmain.png';
  import heroFloat1 from '$lib/assets/images/landingpage/herosection/card1.png';
  import heroFloat2 from '$lib/assets/images/landingpage/herosection/card2.png';
  import imgPassion from '$lib/assets/images/landingpage/storysection/card1.png';
  import imgTech from '$lib/assets/images/landingpage/storysection/card2.png';
  import imgCommunity from '$lib/assets/images/landingpage/storysection/card3.png';
  import imgPolaroidRaw from '$lib/assets/images/landingpage/challengesection/card1.png';
  import imgPolaroidEdit from '$lib/assets/images/landingpage/challengesection/card2.png';   
</script>

<main class="pt-16">
  
  <!-- Section Hero -->
  <section class="max-w-7xl mx-auto px-8 mb-12 flex items-center gap-12 mt-12">
    <div class="flex-1">
      <span class="inline-block bg-custom-pink text-black text-xs font-extrabold uppercase border-2 border-black shadow-neo-sm px-2 py-1 mb-4">
        CREATEUR D'INSPIRATION
      </span>
      <h1 class="font-sora font-extrabold text-6xl leading-tight uppercase tracking-tight mb-6">
        Capturez la <br>
        <span class="italic inline-block px-1 bg-gradient-to-b from-transparent from-60% to-custom-pink to-60%">
          Vraie Beauté.
        </span>
      </h1>
      <p class="text-xl font-medium leading-relaxed mb-10 border-l-4 border-black pl-4">
        Rejoignez le collectif FrameLab. Sublimez vos clichés<br>et révélez votre signature artistique.
      </p>

      <div class="flex gap-6">
        <a href="#join" 
           class="inline-block bg-black text-white font-sora font-bold uppercase px-8 py-4 border-[3px] border-black shadow-neo-md transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_rgba(0,0,0,0.3)]">
          Découvrir
        </a>
        <a href="#challenges" 
           class="inline-block bg-white text-black font-sora font-bold uppercase px-8 py-4 border-[3px] border-black shadow-neo-md transition-all duration-200 hover:bg-custom-pink hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#000]">
          Le Challenge
        </a>
      </div>
    </div>

    <div class="flex-1 h-[500px] relative flex items-center justify-center mt-10">
      <div class="relative w-full h-full">
        <img src={heroMain} 
             class="absolute w-[65%] left-[15%] top-[15%] z-10 border-4 border-[rgb(112,176,250)] shadow-neo object-cover -rotate-2" 
             alt="Main Visual">
        <img src={heroFloat1} 
             class="absolute w-[40%] top-[55%] left-0 z-20 border-4 border-[rgb(255,62,78)] shadow-neo object-cover rotate-[5deg]" 
             alt="Detail 1">
        <img src={heroFloat2} 
             class="absolute w-[35%] top-[5%] right-[5%] z-0 border-4 border-[rgb(142,252,69)] shadow-neo object-cover rotate-[8deg]" 
             alt="Detail 2">
      </div>
    </div>
  </section>

  <!-- Section Qui sommes nous -->
  <section class="max-w-7xl mx-auto px-8 mb-24 mt-12 grid grid-cols-3 gap-8">
    <!-- La passion -->
    <div class="border-[3px] border-black bg-white flex flex-col shadow-neo transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-hover overflow-hidden">
      <div class="h-[200px] border-b-[3px] border-black">
        <img src={imgPassion} 
             alt="Passion" 
             class="w-full h-full object-cover grayscale transition-all duration-300 hover:grayscale-0">
      </div>
      <div class="p-6">
        <span class="inline-block bg-custom-pink text-black text-xs font-extrabold uppercase border-2 border-black shadow-neo-sm px-2 py-1 mb-4">
          NOTRE ADN
        </span>
        <h3 class="font-sora font-extrabold text-2xl uppercase tracking-tight mb-2">La Passion</h3>
        <p class="leading-relaxed font-medium mt-2">
          La photographie est une expérience. Nous offrons le meilleur du matériel et des événements exclusifs.
        </p>
      </div>
    </div>

    <!-- La technique -->
    <div class="border-[3px] border-black bg-white flex flex-col shadow-neo transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-hover overflow-hidden">
      <div class="h-[200px] border-b-[3px] border-black">
        <img src={imgTech} 
             alt="Technique" 
             class="w-full h-full object-cover grayscale transition-all duration-300 hover:grayscale-0">
      </div>
      <div class="p-6">
        <span class="inline-block bg-custom-pink text-black text-xs font-extrabold uppercase border-2 border-black shadow-neo-sm px-2 py-1 mb-4">
          COMPÉTITION
        </span>
        <h3 class="font-sora font-extrabold text-2xl uppercase tracking-tight mb-2">La Technique</h3>
        <p class="leading-relaxed font-medium mt-2">
          Challenge photo hebdomadaire : un thème, une photo brute imposée. Vos retouches mises en lumière.
        </p>
      </div>
    </div>

    <!-- La communauté -->
    <div class="border-[3px] border-black bg-white flex flex-col shadow-neo transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-hover overflow-hidden">
      <div class="h-[200px] border-b-[3px] border-black">
        <img src={imgCommunity} 
             alt="Communauté" 
             class="w-full h-full object-cover grayscale transition-all duration-300 hover:grayscale-0">
      </div>
      <div class="p-6">
        <span class="inline-block bg-custom-pink text-black text-xs font-extrabold uppercase border-2 border-black shadow-neo-sm px-2 py-1 mb-4">
          RÉSEAU
        </span>
        <h3 class="font-sora font-extrabold text-2xl uppercase tracking-tight mb-2">La Communauté</h3>
        <p class="leading-relaxed font-medium mt-2">
          Un espace où la technique rencontre l'esthétique. Chaque photographe trouve sa place ici.
        </p>
      </div>
    </div>
  </section>

  <!-- Section engagement -->
  <section class="max-w-7xl mx-auto px-8 mb-24 grid grid-cols-2 gap-8">   
    <!-- Challenge hebdomadaire -->
    <div class="p-10 bg-neo-lilac border-[3px] border-black shadow-neo flex items-center gap-4 overflow-visible">
      <div class="flex-1 z-10">
        <span class="inline-block bg-custom-pink text-black text-xs font-extrabold uppercase border-2 border-black shadow-neo-sm px-2 py-1 mb-4">
          CHALLENGE HEBDOMADAIRE
        </span>
        <h3 class="font-sora font-extrabold text-3xl uppercase tracking-tight mb-6">Le défi</h3>
        
        <div class="my-6 bg-white border-[3px] border-black p-6 shadow-neo-lg">
          <div class="font-bold mb-3 text-sm">1. Téléchargez l'app FrameLab</div>
          <div class="font-bold mb-3 text-sm">2. Récupérez le fichier RAW</div>
          <div class="font-bold text-sm">3. Postez votre EDIT</div>
        </div>
        
        <a href="/" 
           class="inline-block bg-black text-white font-sora font-bold uppercase px-6 py-3 text-sm border-[3px] border-black shadow-neo-md transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_rgba(0,0,0,0.3)]">
          Participer
        </a>
      </div>
      
      <div class="flex-1 relative h-[300px] flex items-center justify-center">
        <!-- RAW IMAGE -->
        <div class="absolute w-[160px] bg-white border-[3px] border-black p-2.5 pb-6 shadow-neo-md -rotate-[10deg] translate-x-[-20px] translate-y-2.5 z-0 transition-transform duration-300 hover:z-50 hover:scale-105">
          <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gray-300 text-black text-xs font-extrabold uppercase border-2 border-black shadow-neo-sm px-2.5 py-0.5 z-20">
            RAW
          </span>
          <img src={imgPolaroidRaw} alt="Photo brute" class="w-full h-auto block border border-black">
        </div>

        <!-- EDIT IMAGE -->
        <div class="absolute w-[160px] bg-white border-[3px] border-black p-2.5 pb-6 shadow-neo-md rotate-[8deg] translate-x-5 -translate-y-2.5 z-10 transition-transform duration-300 hover:z-50 hover:scale-105">
          <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-neo-green text-black text-xs font-extrabold uppercase border-2 border-black shadow-neo-sm px-2.5 py-0.5 z-20">
            EDIT
          </span>
          <img src={imgPolaroidEdit} alt="Photo éditée" class="w-full h-auto block border border-black">
        </div>
      </div>
    </div>

    <!-- Hall of frames -->
    <div class="p-10 bg-electric-yellow border-[3px] border-black shadow-neo">
      <div class="mb-6">
        <span class="inline-block bg-custom-pink text-black text-xs font-extrabold uppercase border-2 border-black shadow-neo-sm px-2 py-1 mb-4">
          HALL OF FRAMES
        </span>
        <h3 class="font-sora font-extrabold text-3xl uppercase tracking-tight text-black">Les Champions</h3>
      </div>

      <div class="flex flex-col gap-4">
        <!-- #1 Gold -->
        <div class="flex items-center bg-white border-[3px] border-black p-4 shadow-neo-md">
          <span class="w-[30px] h-[30px] bg-gold border-2 border-black text-black flex items-center justify-center font-extrabold mr-4">
            1
          </span> 
          <div class="flex-1 flex justify-between items-center">
            <span class="font-bold text-lg border-b-4 border-gold">@Sarah_Vision</span>
            <span class="text-sm font-semibold text-gray-600">980 pts</span>
          </div>
        </div>

        <!-- #2 Silver -->
        <div class="flex items-center bg-white border-[3px] border-black p-4 shadow-neo-md">
          <span class="w-[30px] h-[30px] bg-silver border-2 border-black text-black flex items-center justify-center font-extrabold mr-4">
            2
          </span> 
          <div class="flex-1 flex justify-between items-center">
            <span class="font-bold text-lg border-b-4 border-silver">@Julie_Art</span>
            <span class="text-sm font-semibold text-gray-600">850 pts</span>
          </div>
        </div>

        <!-- #3 Bronze -->
        <div class="flex items-center bg-white border-[3px] border-black p-4 shadow-neo-md">
          <span class="w-[30px] h-[30px] bg-bronze border-2 border-black text-black flex items-center justify-center font-extrabold mr-4">
            3
          </span> 
          <div class="flex-1 flex justify-between items-center">
            <span class="font-bold text-lg border-b-4 border-bronze">@Marc_Edit</span>
            <span class="text-sm font-semibold text-gray-600">720 pts</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section Boutique -->
  <section class="relative py-24 px-8 flex items-center justify-center overflow-hidden bg-neo-green border-t-[3px] border-black">
    <div class="absolute top-0 left-0 w-full h-full bg-cover opacity-15 z-0"></div>
    
    <div class="relative z-10 bg-neo-green p-16 px-24 border-[3px] border-black shadow-neo-xl text-center max-w-[600px] w-full">
      <h2 class="font-sora font-extrabold text-4xl uppercase tracking-tight mb-4">La Boutique</h2>
      <p class="mb-8 text-xl font-medium">Découvre nos Appareils, accessoires et tirages d'art.</p>

      <a href="https://google.com" 
         class="inline-block bg-white text-black font-sora font-bold uppercase px-8 py-4 border-[3px] border-black shadow-neo-lg transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5">
        Visiter la boutique
      </a>
    </div>
  </section>

  <!-- Section Contact -->
  <section class="py-24 bg-[#121212] text-white" id="contact">
    <div class="max-w-7xl mx-auto px-8 flex justify-between items-center">
      <h2 class="font-sora font-extrabold text-8xl leading-none uppercase tracking-tight text-white">
        Let's Talk.
      </h2>
      <div>
        <p class="text-2xl mb-8 text-cream font-medium">Une question ou une collab ?</p>
        <a href="mailto:hello@framelab.com" 
           class="inline-block bg-black text-white font-sora font-bold uppercase px-8 py-4 border-[3px] border-white shadow-[4px_4px_0_rgba(255,255,255,0.3)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_rgba(255,255,255,0.3)]">
          Envoyer un message
        </a>
      </div>
    </div>
  </section>

</main>